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
app.listen(port, () => {
	_name = "INFO: ".grey;
	console.log(_name + ('Server is listening on '+port).green)
});
app.get('/', (req,res) => {
	res.send("Hello world");
});
app.post('/console/:id', (req, res) => {
	let id = req.params.id, body =  req.body;
	stack = ((body.stack) + " ").grey;
	switch(id) {
		case "log":
			_name = "LOG: ".grey;
			if(body.string == '1') {
				console.log(_name + stack + body.data + '\n\t')
			} else {
				console.log(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "error":
			_name = "ERR: ".grey;
			if(body.string == '1') {
				console.log(_name + stack + (body.data).red + '\n\t')
			} else {
				console.log(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "info":
			_name = "INFO: ".grey;
			if(body.string == '1') {
				console.info(_name + stack + (body.data).green + '\n\t')
			} else {
				console.info(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "warn":
			_name = "WARN: ".grey;
			if(body.string == '1') {
				console.warn(_name + stack + (body.data).yellow + '\n\t')
			} else {
				console.warn(_name + _array_info(body.data.length) + stack)
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