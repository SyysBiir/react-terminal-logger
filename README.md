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
Run this command in your project's index file:
```js
ReactLogger.start();
```
You can specify what information to show in the terminal:
```js
ReactLogger.start(["log", "error", "info", "warn", "logr"]);
```
Now all your logs will be displayed in the terminal. To start the logger, you need to run the command in your project directory:
```bash
npx react-terminal-logger
```
In addition to the standard console.log, console.info, console.error, console.warn added a quick command for logging:
```js
logr("your log");
```
You can use this command anywhere, it is enough to include our module in the index file.