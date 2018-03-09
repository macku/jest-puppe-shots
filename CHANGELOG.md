# Changelog

<a name="new-release"></a>
## [new release](https://github.com/macku/jest-puppe-shots/compare/v0.6.0...master) (not released)

### Bugs
 - Fix running multiple tests when running without `--runInBand` mode. Start own HTTP sever for each test context. 
 - Correct missing `await` keyword in Readme

<a name="0.6.0"></a>
## [0.6.0](https://github.com/macku/jest-puppe-shots/compare/v0.4.0...v0.6.0) (2018-03-05)

### Features

 - Monorepo! Split the `jest-puppe-shots` into 3 NPM packages:
   - `jest-puppe-shots-env` - Contains Jest environment, setup and teardown hooks  
   - `jest-puppe-shots-preset` - Contains Jest preset that can be used to quickly configure Jest   
   - `jest-puppe-shots` - The React renderers and matchers API    
   
 - Reduce manual Jest config and use a [Jest `"preset"`](https://facebook.github.io/jest/docs/en/configuration.html#preset-string) instead

### Upgrade guide

Remove old hooks from your project configuration and use a `"preset"` instead:

`jest.config.json`:
{
```diff
-  "testEnvironment": "jest-puppe-shots/lib/node-environment.js",
-  "globalSetup": "jest-puppe-shots/lib/global-setup.js",	
-  "globalTeardown": "jest-puppe-shots/lib/global-teardown.js"
+  "preset": "jest-puppe-shots-preset"
}
```

or

`jest.config.js`:
{
```diff
-  testEnvironment: 'jest-puppe-shots/lib/node-environment.js',
-  globalSetup: 'jest-puppe-shots/lib/global-setup.js',	
-  globalTeardown: "jest-puppe-shots/lib/global-teardown.js'
+  preset: 'jest-puppe-shots-preset'
}
```


<a name="0.4.0"></a>
## [0.4.0](https://github.com/macku/jest-puppe-shots/compare/v0.3.3...v0.4.0) (2018-02-23)

### Bugs
 - Fix typos in readme
 - #5 Fix problem with multiline result after rendering component to HTML
 
### Chores
 - Add strict version for Node and NPM engine
 - Setup Jest tests runner
 - Add basic unit tests for renderers
 - Setup Travis CI


<a name="0.3.3"></a>
## [0.3.3](https://github.com/macku/jest-puppe-shots/compare/v0.3.2...v0.3.3) (2018-02-19)

### Bugs
 - Freeze styled-components package to version 2+
 - Fix resetting styled components styles before collecting CSS 


<a name="0.3.2"></a>
## [0.3.2](https://github.com/macku/jest-puppe-shots/compare/v0.3.1...v0.3.2) (2018-02-19)

### Bugs
 - Fix typos in documentation
 
### Chores
 - Add Eslint and reformat source code


<a name="0.3.1"></a>
## [0.3.1](https://github.com/macku/jest-puppe-shots/commit/ac75cb3d81063b582a2c0c5e21c7068bdc358072) (2018-02-13)

### Features

 - First official release
