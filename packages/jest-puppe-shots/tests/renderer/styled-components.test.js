const React = require('react');
const { parse } = require('css');
const { default: styled } = require('styled-components');

const { renderComponent } = require('../../lib/renderer/styled-components');

const FooComponent = styled.span`
  color: white;
  background: red;
`;

const extractStylesDeclarationForSelector = (result, selector) => {
  const { rules } = parse(result).stylesheet;
  const rule = rules.find(({ selectors }) => selectors && selectors.includes(selector));

  if (!rule) {
    return false;
  }

  const { declarations } = rule;

  return declarations
    .filter(({ type }) => type === 'declaration')
    .map(({ property, value }) => ({ property, value }));
};

const extractClassNameSelector = result => (
  `.${result.match(/class="([^"]+)"/).pop().split(' ').pop()
    .trim()}`
);

const htmlMatchRegExp = /<span\s+class="[^"]+"\s+[^>]+>Bar<\/span>/;

test(`it should render ${FooComponent.name} and return CSS styles`, async () => {
  // given
  const component = <FooComponent>Bar</FooComponent>;

  // when
  const { js: jsResult, css: cssResult } = await renderComponent(component);

  // then
  const classNameSelector = extractClassNameSelector(jsResult);
  const styles = extractStylesDeclarationForSelector(cssResult, classNameSelector);

  expect(styles).toEqual(expect.arrayContaining([
    expect.objectContaining({
      property: 'color',
      value: 'white',
    }),

    expect.objectContaining({
      property: 'background',
      value: 'red',
    }),
  ]));
});

test(`it should render ${FooComponent.name} and call "wrapReactHtmlOutput"`, async () => {
  // given
  const component = <FooComponent>Bar</FooComponent>;

  // when
  const { js: jsResult } = await renderComponent(component);

  // then
  const parts = jsResult.split(' = ');
  const jsInjection = parts[0].trim();
  const componentHtml = parts[1].substr(1, parts[1].length - 2);

  expect(jsInjection).toEqual('document.body.innerHTML');
  expect(htmlMatchRegExp.test(componentHtml)).toBe(true);
});
