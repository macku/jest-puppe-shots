const { renderToString } = require('react-dom/server');

const { wrapReactHtmlOutput } = require('./common');

const name = 'REACT_SERVER';

async function renderComponent(Component) {
  const html = renderToString(Component);
  const jsContent = wrapReactHtmlOutput(html);

  return {
    js: jsContent,
    css: null,
  };
}

module.exports = {
  name,
  renderComponent,
};
