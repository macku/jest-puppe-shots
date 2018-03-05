async function createElementScreenshot(page, selector = 'body > [data-reactroot]') {
  const element = await page.$(selector);

  return element.screenshot();
}

module.exports = {
  createElementScreenshot,
};
