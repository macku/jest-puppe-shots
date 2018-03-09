const fs = require('fs');
const path = require('path');

const { server, getServerUri } = require('jest-puppe-shots-env');

const { createRenderer, REACT_SERVER } = require('./renderer/renderer');
const { createElementScreenshot } = require('./make-screenshot');

const GLOBAL_RENDERER_KEY = '__JEST_PUPPE_SHOTS_RENDERER__';

const resolvePath = (pathToResolve) => {
  const resolvedPath = fs.realpathSync(pathToResolve);

  return resolvedPath;
};

class Page {
  static async openNewPage(browser = global.__BROWSER__) {
    return new Page(browser).openNewPage();
  }

  constructor(browser) {
    this.browser = browser;
  }

  async openNewPage() {
    this.page = await this.browser.newPage();

    await this.page.goto(getServerUri());

    return this;
  }

  async mount(Component) {
    const renderer = global[GLOBAL_RENDERER_KEY] || REACT_SERVER;
    const reactRenderer = createRenderer(renderer);

    const { css, js } = await reactRenderer(Component);

    if (css) {
      await this.page.addStyleTag({ content: css });
    }

    if (js) {
      await this.page.addScriptTag({ content: js });
    }

    return this;
  }

  async mountCssContext(rawPath, files = []) {
    const { __APP_SERVER__: appContext } = global;
    const staticPath = resolvePath(rawPath);
    const staticPathContext = path.basename(staticPath);
    const paths = files.map(filePath => path.join(staticPathContext, filePath));

    // Serve static files from context
    server.mountStaticPath(appContext, staticPathContext, staticPath);

    const addStyles = paths.map(url => this.page.addStyleTag({ url }));

    await Promise.all(addStyles);

    return this;
  }

  async loadExternalCss(...urls) {
    const addStyles = urls.map(url => this.page.addStyleTag({ url }));

    await Promise.all(addStyles);

    return this;
  }

  async loadExternalJs(...urls) {
    const addScripts = urls.map(url => this.page.addScriptTag({ url }));

    await Promise.all(addScripts);

    return this;
  }

  async takeScreenshot() {
    return createElementScreenshot(this.page);
  }
}

module.exports = Page;
