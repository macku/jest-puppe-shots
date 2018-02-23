 jest-puppe-shots
=================

[![NPM version](https://badge.fury.io/js/jest-puppe-shots.svg)](https://www.npmjs.com/package/jest-puppe-shots)
[![node](https://img.shields.io/node/v/jest-puppe-shots.svg)](https://www.npmjs.com/package/jest-puppe-shots)
[![Build Status](https://travis-ci.org/macku/jest-puppe-shots.svg?branch=master)](https://travis-ci.org/macku/jest-puppe-shots)
[![dependencies Status](https://david-dm.org/macku/jest-puppe-shots/status.svg)](https://david-dm.org/macku/jest-puppe-shots)
[![devDependencies Status](https://david-dm.org/macku/jest-puppe-shots/dev-status.svg)](https://david-dm.org/macku/jest-puppe-shots?type=dev)
[![peerDependencies Status](https://david-dm.org/macku/jest-puppe-shots/peer-status.svg)](https://david-dm.org/macku/jest-puppe-shots?type=peer)

A [Jest](https://facebook.github.io/jest/) plugin for creating screenshots of [React](https://reactjs.org/) components with a little help of [Puppeteer](https://github.com/GoogleChrome/puppeteer)

How it works?
=============
A `jest-puppe-shots` is a **Jest** plugin that can help you create **Visual Regression** tests for your Rect components.
If you ever used [**Enzyme**](http://airbnb.io/enzyme/) or [**Snapshots**](https://facebook.github.io/jest/docs/en/snapshot-testing.html) you will love the `jest-puppe-shots`.

The Snapshot testing approach is really awesome but it has one downside: it cannot be used to make visual regression tests of your components.
Thanks to the [Puppeteer API](https://github.com/GoogleChrome/puppeteer) it's now possible to use **Chromium browser** in Jest and create **real screenshots** of your components!

Installation
============

You can install the plugin using [**NPM**](https://www.npmjs.com):

```bash
npm install jest-puppe-shots --save-dev
```

or by [**Yarn**](https://yarnpkg.com/):

```bash
yarn add jest-puppe-shots --dev
```

## Additional dependencies
You will have to install [`jest`](https://www.npmjs.com/package/jest) and [`react-dom`](https://www.npmjs.com/package/react-dom) if you don't have them yet:

```bash
npm install jest react-dom
```

## Async/Await
The `jest-puppe-shots` API is written on top of the **Puppeteer** which means the currently supported version of **Node is 7.6+**.
You will also have to setup your **Babel** configuration to use the [Async/Await from ES7](https://developers.google.com/web/fundamentals/primers/async-functions).

[Here you can find the tutorial](https://babeljs.io/docs/plugins/transform-async-to-generator/) how to setup your **Babel** settings to use it.

Jest Configuration
==================
Before starting using the `jest-puppe-shots` you will need to change your Jest configuration file.

Open the **jest.config.json** file and add additional entries:

```json
{
  "testEnvironment": "jest-puppe-shots/lib/node-environment.js",
  "globalSetup": "jest-puppe-shots/lib/global-setup.js",
  "globalTeardown": "jest-puppe-shots/lib/global-teardown.js"
}
```

Those hooks are responsible for launching the **Puppeteer** in the background while the **Jest** runner is starting.

Taking Screenshots
==================

After setting up the configuration you can start writing your first integration test that will take screenshots.
The `jest-puppe-shots` it utilizing a couple of concepts and tools under the hood:

 - It's using [**Puppeteer**](https://github.com/GoogleChrome/puppeteer) to start Chromium browser in the headless mode
 - It takes a Screenshot of the component and stores it as a  **Snapshot** inside your repository under the `__image_snapshots__` directory.
   If you are not familiar with the Jest Snapshots testing take a look at [Jest documentation page](https://facebook.github.io/jest/docs/en/snapshot-testing.html).
 - Uses the [`.toMatchImageSnapshot()`](https://www.npmjs.com/package/jest-image-snapshot) matcher to compare the base screenshot with the current version token during the test execution.

# Writing First Integration Test
Take a look at the example test code:

```js
const { openNewPage } = require('jest-puppe-shots'); // 1. Require the jest-puppe-shots module into your test
import { openNewPage } from 'jest-puppe-shots'; // or use the ES module import if you like

import MyComponent from './MyComponent'; // 2. Import your React component

let page;
beforeEach(async () => {
  page = await openNewPage(); // 3. Open new page for taking screenshots
});

test('should render <Foo> component', async () => {
  const component = await page.mount( // 4. Mount your component
    <MyComponent className="my-component">
      <strong>Hello World!</strong>
    </MyComponent>
  );

  const screenshot = page.takeScreenshot(component); // 5. Take a screenshot of your component

  expect(screenshot).toMatchImageSnapshot(); // 6. Assert image snapshots and you're done!
});
```

Running this code for the first time by Jest, will produce a **Base Screenshot** and store it inside the repository at `your-test-location/__image_snapshots__` directory.

To update the **Base Screenshot** run Jest with `--updateSnapshot` or `-u` params.

# Mounting additional CSS

If your components are based on additional CSS code from your code base like ex. `reset.css` you might like to mount the static content on the page:

```js
import path from 'path';
import { openNewPage } from 'jest-puppe-shots';

let page;
beforeEach(async () => {
  page = await openNewPage();
  await page.mountCssContext(path.resolve('../path/to/my-assets-dir', [
    'css/reset.css',
    'css/custom-styles.css'
  ]))
});
```

Mounting the CSS directory might also help you with loading static content files like **images** or **font**.

# Loading external CSS and JS files

You can also load and put an external CSS and JS files on your page:

```js
import { openNewPage } from 'jest-puppe-shots';

let page;
beforeEach(async () => {
  page = await openNewPage();
  await page.loadExternalCss(
    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
  );

  await page.loadExternalJs(
    'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
  );
});
```

Both `loadExternalCss` and `loadExternalJs` function can accept multiple arguments so you can pass as URLs as you want.


Roadmap
=======

 - [ ] Transform the `*.less` and `*.sass` files into **CSS**  code when importing component modules by Jest 
 - [ ] Better support for the [`Eznyme`](http://airbnb.io/enzyme) like API. You should be able to use ex. `get`, or `find` functions after
   mounting component
 - [ ] Making screenshots of component parts by ex. selecting DOM nodes
 - [ ] More built-in renderers and support for custom renderers (pass a function)
 - [ ] Debugging: allow to start test without the headless mode and see what browser is doing

FAQ
===

##  What version of Jest do I need to use?
You will have to install Jest 22+. The main reason of that is [version 22 introduced](https://github.com/facebook/jest/blob/master/CHANGELOG.md#features-9) the [`globalSetup` and `globalTeardown`](https://github.com/facebook/jest/pull/4716) options APIs.

## What Node version is supported?
Since both **Puppeteer** and `jest-puppe-shots` are heavily depending on the `async/await` API you will have to use **Node 7.6+** that [enabled the support for it](https://blog.readme.io/using-async-await-in-node-js-7-6-0/).

## I don't want to run Puppeteer each time I'm running my tests. It takes *ages* to start Jest and it's getting slow!

No problem! You don't need to launch Puppeteer for you regular Unit Tests. You will just have to adjust your environment a little bit. Take a look at the example:

1. Edit your `package.json` file and provide additional entries for running screenshot tests:

### Before
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### After
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:screenshots": "cross-env TAKE_SCREENSHOTS=true jest",
    "test:watch:screenshots": "cross-env TAKE_SCREENSHOTS=true jest --watch"
  }
}
```

We are using the [`cross-env`](https://www.npmjs.com/package/cross-env) package in order to set environment variables for all the operating systems.

2. Rename your `jest.config.json` to `jest.config.js` and adjust the source code to use `jest-puppe-shots` hooks only when we need it.

### Before
```json
{
  "testEnvironment": "jest-puppe-shots/lib/node-environment.js",
  "globalSetup": "jest-puppe-shots/lib/global-setup.js",
  "globalTeardown": "jest-puppe-shots/lib/global-teardown.js"
}
```

### After
```js
let config = {
  /* Your Jest config goes here */
};

if (process.env.TAKE_SCREENSHOTS) {
  config = Object.assign({
    testEnvironment: 'jest-puppe-shots/lib/node-environment.js',
    globalSetup: 'jest-puppe-shots/lib/global-setup.js',
    globalTeardown: 'jest-puppe-shots/lib/global-teardown.js'
  });
}

module.exports = config;
```

3. Right now you can run unit tests as usual by `npm run test` and you can launch integration tests by running `npm run test:screenshots`

## I'm using `styled-components` to provide my CSS code. Is it supported?
That's fine. Good news for you is that `jest-puppe-shots` is supporting [`styled-components`](https://www.styled-components.com/).
All you need to do is to inform runner that you would like to use a custom renderer.

Edit your Jest config file `jest.config.json` and add new `globals` entry to the configuration:

```json
{
  "globals": {
    "__JEST_PUPPE_RENDERER__": "STYLED_COMPONENTS"
  }
}
```

Currently, there are two supported renderers:

 - `REACT_SERVER` (default) - It's using the [`react-dom/server`](https://www.npmjs.com/package/react-dom) package to render component as string
 - `STYLED_COMPONENTS` - It's using the `ServerStyleSheet` from [`styled-components`](https://www.npmjs.com/package/styled-components) to intercept the produced CSS styles and inject them on the page
