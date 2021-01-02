#!/usr/bin/env node

const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const fs			 = require('fs');
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
	stack = ((body.stack) + " ").grey, log_name = " LOG: ";
	let save_logs = (body.save_logs == "1") ? true : false;
	let date_obj = new Date();
	let current_time = (date_obj.toLocaleTimeString()).grey;
	switch(id) {
		case "log":
			log_name = " LOG: ";
			_name = current_time + log_name.grey;
			if(body.string == '1') {
				console.log(_name + stack + body.data + '\n\t')
			} else {
				console.log(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "error":
			log_name = " ERR: ";
			_name = current_time + log_name.grey;
			if(body.string == '1') {
				console.log(_name + stack + (body.data).red + '\n\t')
			} else {
				console.log(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "info":
			log_name = " INFO: ";
			_name = current_time + log_name.grey;
			if(body.string == '1') {
				console.info(_name + stack + (body.data).blue + '\n\t')
			} else {
				console.info(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "warn":
			log_name = " WARN: ";
			_name = current_time + log_name.grey;
			if(body.string == '1') {
				console.warn(_name + stack + (body.data).yellow + '\n\t')
			} else {
				console.warn(_name + _array_info(body.data.length) + stack)
				console.log(body.data)
				console.log('\n\t')
			}
		break;
		case "logr":
			log_name = " LOGR: ";
			_name = current_time + log_name.green;
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
	if(save_logs) {
		let date = ("0" + date_obj.getDate()).slice(-2);
		let month = ("0" + (date_obj.getMonth() + 1)).slice(-2);
		let year = date_obj.getFullYear();
		let current_date = year + "-" + month + "-" + date + " ";
		var logFile = fs.createWriteStream('./logger.debug.log', { flags: 'a' });
		if(body.string == '1') {
			logFile.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + stack + body.data + '\n')
		} else {
			logFile.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + _array_info(body.data.length) + stack)
			logFile.write(body.data)
			logFile.write('\n')
		}
	}
	res.send("Hello world");
});