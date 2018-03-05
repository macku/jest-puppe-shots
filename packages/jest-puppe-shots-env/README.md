 jest-puppe-shots-env
=====================

[![NPM version](https://badge.fury.io/js/jest-puppe-shots-env.svg)](https://www.npmjs.com/package/jest-puppe-shots-env)
[![node](https://img.shields.io/node/v/jest-puppe-shots-env.svg)](https://www.npmjs.com/package/jest-puppe-shots-env)
[![Build Status](https://travis-ci.org/macku/jest-puppe-shots.svg?branch=master)](https://travis-ci.org/macku/jest-puppe-shots)
[![dependencies Status](https://david-dm.org/macku/jest-puppe-shots/status.svg?path=packages/jest-puppe-shots-env)](https://david-dm.org/macku/jest-puppe-shots?path=packages/jest-puppe-shots-env)
[![devDependencies Status](https://david-dm.org/macku/jest-puppe-shots/dev-status.svg?path=packages/jest-puppe-shots-env)](https://david-dm.org/macku/jest-puppe-shots?path=packages/jest-puppe-shots-env&type=dev)
[![peerDependencies Status](https://david-dm.org/macku/jest-puppe-shots/peer-status.svg?path=packages/jest-puppe-shots-env)](https://david-dm.org/macku/jest-puppe-shots?path=packages/jest-puppe-shots-env&type=peer)

A [Jest](https://facebook.github.io/jest/) plugin for creating screenshots of [React](https://reactjs.org/) components with a little help of [Puppeteer](https://github.com/GoogleChrome/puppeteer)

How it works?
=============
This is the custom Jest [Test Environment](https://facebook.github.io/jest/docs/en/configuration.html#testenvironment-string),
[Global Teardown](https://facebook.github.io/jest/docs/en/configuration.html#globalteardown-string) and
[Global Setup](https://facebook.github.io/jest/docs/en/configuration.html#globalsetup-string) hooks for the
[`jest-puppe-shots`](https://www.npmjs.com/package/jest-puppe-shots) package.

Check the [README](https://https://github.com/macku/jest-puppe-shots/blob/master/README.md) to get more information how to use the plugin.

Installation
============

You can install the plugin using [**NPM**](https://www.npmjs.com):

```bash
npm install jest-puppe-shots-env --save-dev
```

or by [**Yarn**](https://yarnpkg.com/):

```bash
yarn add jest-puppe-shots-env --dev
```

Jest Configuration
==================
Before starting using the `jest-puppe-shots-env` you will need to change your Jest configuration file.

Open the **jest.config.json** file and add additional entries:

```json
{
  "testEnvironment": "jest-puppe-shots-env/lib/node-environment.js",
  "globalSetup": "jest-puppe-shots-env/lib/global-setup.js",
  "globalTeardown": "jest-puppe-shots-env/lib/global-teardown.js"
}
```

Those hooks are responsible for launching the **Puppeteer** in the background while the **Jest** runner is starting.
