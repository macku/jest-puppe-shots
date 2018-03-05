 jest-puppe-shots-preset
========================

[![NPM version](https://badge.fury.io/js/jest-puppe-shots-preset.svg)](https://www.npmjs.com/package/jest-puppe-shots-preset)
[![node](https://img.shields.io/node/v/jest-puppe-shots-preset.svg)](https://www.npmjs.com/package/jest-puppe-shots-preset)
[![Build Status](https://travis-ci.org/macku/jest-puppe-shots.svg?branch=master)](https://travis-ci.org/macku/jest-puppe-shots)
[![dependencies Status](https://david-dm.org/macku/jest-puppe-shots/status.svg?path=packages/jest-puppe-shots-preset)](https://david-dm.org/macku/jest-puppe-shots?path=packages/jest-puppe-shots-preset)
[![devDependencies Status](https://david-dm.org/macku/jest-puppe-shots/dev-status.svg?path=packages/jest-puppe-shots-preset)](https://david-dm.org/macku/jest-puppe-shots?path=packages/jest-puppe-shots-preset&type=dev)
[![peerDependencies Status](https://david-dm.org/macku/jest-puppe-shots/peer-status.svg?path=packages/jest-puppe-shots-preset)](https://david-dm.org/macku/jest-puppe-shots?path=packages/jest-puppe-shots-preset&type=peer)

A [Jest](https://facebook.github.io/jest/) plugin for creating screenshots of [React](https://reactjs.org/) components with a little help of [Puppeteer](https://github.com/GoogleChrome/puppeteer)

How it works?
=============
This is the [Jest preset](https://facebook.github.io/jest/docs/en/configuration.html#preset-string) for the [`jest-puppe-shots`](https://www.npmjs.com/package/jest-puppe-shots) package.

Check the [README](https://https://github.com/macku/jest-puppe-shots/blob/master/README.md) to get more information how to use the plugin.

Installation
============

You can install the plugin using [**NPM**](https://www.npmjs.com):

```bash
npm install jest-puppe-shots-preset --save-dev
```

or by [**Yarn**](https://yarnpkg.com/):

```bash
yarn add jest-puppe-shots-preset --dev
```

Jest Configuration
==================
Before starting using the `jest-puppe-shots-preset` you will need to change your Jest configuration file.

Open the `jest.config.json` file in your project and add additional entry:

```json
{
  "preset": "jest-puppe-shots-preset"
}
```

If you are are using the `jest.config.js` file, then instead adjust your configuration like this:

```js
module.exports = {
  // You config goes here

  preset: 'jest-puppe-shots-preset'
}
```
