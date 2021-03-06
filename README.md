# React terminal logger
[![npm](https://img.shields.io/npm/v/github-buttons)](https://www.npmjs.com/package/react-terminal-logger)
> Simple console logger for vue, react and react-native

## New Features!
 - Saving logs to a file (optional)
 - Short alias for console.log
 
## Getting Started
To install the module, run the following in the command line:
```bash
npm i react-terminal-logger --save
```
Use within your application with the following line of JavaScript:
```js
const ReactLogger = require('react-terminal-logger/console-logger');
```
or
```js
import ReactLogger from 'react-terminal-logger/console-logger'
```
Run this command in your project's index file:
```js
ReactLogger.start(); //Quick start with standard configuration
```
To run the logger in the terminal, you need to run the command in your project directory:
```bash
npx react-terminal-logger
```
You can specify the port on which the logger will run:
```bash
npx react-terminal-logger --p=1234
```
## Configuration
You can specify what information to show in the terminal:
```js
ReactLogger.start(
    ["log", "error", "info", "warn", "logr"], //You can specify what information to show in the terminal
    true, //Save logs to a file. Your logs will be saved in directory react-logger-logs. Default: false
    true, //Show only message in terminal. Ignores the value of stacktrace_hide. Default: false
    1234, //Port on which the logger is running. Default: 1234
    true //Hide stacktrace. Default: false
);
```
or 
```js
ReactLogger.config({
    visible : ["log", "error", "info", "warn", "logr"], //You can specify what information to show in the terminal
    save_logs: true, //Save logs to a file. Your logs will be saved in directory react-logger-logs. Default: false
    only_msg : true, //Show only message in terminal. Ignores the value of stacktrace_hide. Default: false
    port: 1234, //Port on which the logger is running. Default: 1234
    stacktrace_hide: true //Hide stacktrace. Default: false
});
ReactLogger.start();
```
In addition to the standard **console.log**, **console.info**, **console.error**, **console.warn** added a quick command for logging:
```js
logr("your log"); //window.logr("your log")
logr("your log", 1, [{"a1": 1}]); //window.logr("your log", 1, [{"a1": 1}])
```
You can use this command anywhere, it is enough to include our module in the index file.
