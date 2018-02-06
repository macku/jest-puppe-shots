# jest-puppe-shots
A Jest plugin for rendering React components and matching their screenshots in Visual Regression tests

## TBD
Code comming soon

## Example usage

```js
const { mount } = require('jest-puppe-shots');

// 1. Sync API
test('should render <Foo> component', async () => {
  const wrapper = await mount(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );
  
   expect(wrapper).toMatchScreenshot();
});
```

### Viewport

```js
const { mount } = require('jest-puppe-shots');

test('should render <MyComponent> component', () => {
  const wrapper = mount(
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );
  
   expect(wrapper).toMatchScreenshot({ // Pass viewport size
     width: 800,
     height: 600
   });
});
```

### Enzyme-like API

```js
const { mount } = require('jest-puppe-shots');

test('should render <Boo> component', async () => {
  const wrapper = await mount(
    <FooComponent>
      <BooComponent></BooComponent>
    </FooComponent>
  );
  
   const children = await wrapper.find('.custom-class');
   await children.simulate('click');
  
   expect(children).toMatchScreenshot();
});
```
