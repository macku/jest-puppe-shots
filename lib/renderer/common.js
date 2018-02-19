const wrapReactHtmlOutput = html => `document.body.innerHTML = '${html.replace("'", "\\'")}'`;

module.exports = {
  wrapReactHtmlOutput,
};
