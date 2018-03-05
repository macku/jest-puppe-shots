const { wrapReactHtmlOutput } = require('../../lib/renderer/common');

const getParts = (result) => {
  const parts = result.split(' = ');

  const jsInjection = parts[0].trim();
  const htmlResult = parts[1].substr(1, parts[1].length - 2);

  return {
    jsInjection,
    htmlResult,
  };
};

describe('single-line input', () => {
  // given
  const htmlInput = '<span>Foo</span>';

  test('it should wrap the given HTML with JS injection', () => {
    // when
    const result = wrapReactHtmlOutput(htmlInput);

    // then
    const { jsInjection, htmlResult } = getParts(result);

    expect(jsInjection).toEqual('document.body.innerHTML');
    expect(htmlResult).toEqual('<span>Foo</span>');
  });

  test('it should allow to eval the code', () => {
    const result = wrapReactHtmlOutput(htmlInput);

    // eslint-disable-next-line no-eval
    const evalCode = () => eval(result);

    // when
    expect(evalCode).not.toThrow();
  });
});

describe('multi-line input', () => {
  // given
  const htmlInput =
    `
    <div>
      <p>
        Foo
      </p>
      
      <p>
        Bar
      </p>
    </div>
  `;

  test('it should wrap the multiline HTML with JS injection', () => {
    // when
    const result = wrapReactHtmlOutput(htmlInput);

    // then
    const { jsInjection, htmlResult } = getParts(result);

    expect(jsInjection).toEqual('document.body.innerHTML');
    expect(htmlResult).toEqual(htmlInput);
  });

  test('it should allow to eval the multiline code', () => {
    const result = wrapReactHtmlOutput(htmlInput);

    // eslint-disable-next-line no-eval
    const evalCode = () => eval(result);

    // when
    expect(evalCode).not.toThrow();
  });
});
