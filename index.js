#!/usr/bin/env node

const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
var colors 			 = require('colors'), name, stack;
function _array_info(length) {
	return ("Array(" + length + ") ").grey;
} 
const port = 1234;
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.listen(port, () => {
	_name = ((new Date()).toLocaleTimeString()).grey + " INFO: ".grey;
	console.log(_name + ('React Logger started').blue + '\n\t')
});
app.get('/', (req,res) => {
	res.send("Hello world");
});
app.post('/console/:id', (req, res) => {
	let id = req.params.id, body =  req.body;
	stack = ((body.stack) + " ").grey;
	let current_time = ((new Date()).toLocaleTimeString()).grey;
	switch(id) {
		case "log":
			_name = current_time + " LOG: ".grey;
			if(body.string == '1') {
				console.log(_name + stack + body.data + '\n\t')
			} else {
				console.log(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "error":
			_name = current_time + " ERR: ".grey;
			if(body.string == '1') {
				console.log(_name + stack + (body.data).red + '\n\t')
			} else {
				console.log(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "info":
			_name = current_time + " INFO: ".grey;
			if(body.string == '1') {
				console.info(_name + stack + (body.data).blue + '\n\t')
			} else {
				console.info(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "warn":
			_name = current_time + " WARN: ".grey;
			if(body.string == '1') {
				console.warn(_name + stack + (body.data).yellow + '\n\t')
			} else {
				console.warn(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "logr":
			_name = current_time + " LOGR: ".green;
			if(body.string == '1') {
				console.log(_name + stack + (body.data).green + '\n\t')
			} else {
				console.log(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		default:
			console.log(body)
		break;
	}
	res.send("Hello world");
});