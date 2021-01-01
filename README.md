# React terminal logger
[![npm](https://img.shields.io/npm/v/github-buttons)](https://www.npmjs.com/package/react-terminal-logger)
> Simple console logger for react and react-native

## Getting Started
To install the module, run the following in the command line:
```bash
npm i react-terminal-logger --save
```
Use within your application with the following line of JavaScript:
```js
const ReactLogger = require('react-terminal-logger/console-logge');
```
or
```js
import ReactLogger from 'react-terminal-logger/console-logger'
```
Example:
```js
ReactLogger.start();
```
You can specify what information to show in the terminal:
```js
ReactLogger.start(["log", "error", "info", "warn"]);
```
To start the logger, you need to run the command in your project directory:
```bash
npx react-terminal-logger
```
