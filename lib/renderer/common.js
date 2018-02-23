const wrapReactHtmlOutput = html => `document.body.innerHTML = \`${html}\``;

module.exports = {
  wrapReactHtmlOutput,
};
