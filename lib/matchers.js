const fs = require('fs');
const path = require('path');
const { mkdirpSync } = require('fs-extra');
const kebabCase = require('lodash.kebabCase');

const { PNG } = require('pngjs');
const pixelmatch = require('pixelmatch');

const SCREENSHOT_DIR = '__screenshots__';
const SCREENSHOT_EXT = 'png';

const defaultOptions = {
  failureThreshold: 1
};

global.expect.extend({
  async toMatchScreenshot(receivedScreenshotBlob, options) {
    const { testPath, currentTestName, isNot } = this;

    if (isNot) {
      throw new Error('Jest: `.not` cannot be used with `.toMatchImageSnapshot()`.');
    }

    let pass = false;

    // Screenshot path
    const screenshotDir = path.resolve(path.dirname(testPath), SCREENSHOT_DIR);
    const screenshotFilename = `${path.basename(testPath)}-${kebabCase(currentTestName)}.${SCREENSHOT_EXT}`;
    const screenshotPath = path.join(screenshotDir, screenshotFilename);

    // const savedScreenshotExists = fs.statSync(path).exist;
    if (true) { // TODO: if file exists
      // TODO: Get current screenshot
      const baseScreenshotBlob = fs.readFileSync(screenshotPath);

      const baseScreenshotPng = PNG.sync.read(baseScreenshotBlob);
      const receivedScreenshotPng = PNG.sync.read(receivedScreenshotBlob);
      const { width, height } = baseScreenshotPng;

      // Get diff
      const diffPng = new PNG(width, height);

      const pixelMatchOptions = {
        threshold: 0.01
      };

      const totalDiffPixelCount = pixelmatch(
        baseScreenshotPng.data,
        receivedScreenshotPng.data,
        diffPng.data,
        width,
        height /*, // TODO: Check me
        pixelMatchOptions
        */
      );

      const imagePixelsNum = width * height;
      const diifPixelsRatio = totalDiffPixelCount / imagePixelsNum;

      // Check results
      const matcherOptions = Object.assign({}, defaultOptions, options);

      pass = (diifPixelsRatio < matcherOptions.failureThreshold);
    }  else {
      // Save current screenshot
      pass = true;

        mkdirpSync(screenshotDir);

      fs.writeFileSync(screenshotPath, receivedScreenshotBlob);
    }

    return {
      message: 'screenshot saved',
      pass
    };
  }
});
