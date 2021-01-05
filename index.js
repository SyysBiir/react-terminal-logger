#!/usr/bin/env node

const express        = require('express');
const bodyParser     = require('body-parser');
const app            = express();
const fs			 = require('fs');
var colors 			 = require('colors');
var logs_dir 		 = './react-logger-logs', port = 1234;
function _array_info(length) {
	return ("Array(" + length + ") ").grey;
} 
process.argv.forEach(function (val, index, array) {
	if(index === 2) {
		if(val.indexOf("--p=") === -1) {
			console.log("Invalid command line argument: " + val)
			process.exit()
		}
		port = val.replace("--p=","")
		port = +port
	}
})
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
	console.log(_name + ('React Logger started on '+port).blue + '\n\t');
	if (!fs.existsSync(logs_dir)){
		fs.mkdirSync(logs_dir);
	}
});
app.get('/', (req,res) => {
	res.send("Your logs are displayed in the terminal");
});
app.post('/console/:id', (req, res) => {
	let id = req.params.id, 
	body =  req.body,
	save_logs = (body.save_logs == "1") ? true : false,
	date_obj = new Date(),
	stack = (body.only_msg == "1") ? "" : ((body.stack) + " ").grey, 
	log_name = " LOG: ";

	let current_time = (date_obj.toLocaleTimeString()).grey;
	
	switch(id) {
		case "log":
			log_name = " LOG: ";
			_name = (body.only_msg == "1") ? "" : (current_time + log_name.grey);
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
			_name = (body.only_msg == "1") ? "" : (current_time + log_name.grey);
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
			_name = (body.only_msg == "1") ? "" : (current_time + log_name.grey);
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
			_name = (body.only_msg == "1") ? "" : (current_time + log_name.grey);
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
			_name = (body.only_msg == "1") ? "" : (current_time + log_name.green);
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
		let date = ("0" + date_obj.getDate()).slice(-2),
		month = ("0" + (date_obj.getMonth() + 1)).slice(-2),
		year = date_obj.getFullYear(),
		stack = ((body.stack) + " ").grey;
		let current_date = year + "-" + month + "-" + date + " ";
		var logFile = fs.createWriteStream(logs_dir + '/logger.all.log', { flags: 'a' }),
		logFileLogs = fs.createWriteStream(logs_dir + '/logger.log.log', { flags: 'a' }),
		logFileErrs = fs.createWriteStream(logs_dir + '/logger.err.log', { flags: 'a' }),
		logFileWarns = fs.createWriteStream(logs_dir + '/logger.warn.log', { flags: 'a' }),
		logFileInfos = fs.createWriteStream(logs_dir + '/logger.info.log', { flags: 'a' }),
		logFileLogrs = fs.createWriteStream(logs_dir + '/logger.logr.log', { flags: 'a' });
		switch(id) {
			case "log":
				if(body.string == '1') {
					logFileLogs.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + stack + body.data + '\n')
				} else {
					logFileLogs.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + _array_info(body.data.length) + stack)
					logFileLogs.write(body.data)
					logFileLogs.write('\n')
				}
			break;

			case "error":
				if(body.string == '1') {
					logFileErrs.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + stack + body.data + '\n')
				} else {
					logFileErrs.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + _array_info(body.data.length) + stack)
					logFileErrs.write(body.data)
					logFileErrs.write('\n')
				}
			break;

			case "info":
				if(body.string == '1') {
					logFileInfos.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + stack + body.data + '\n')
				} else {
					logFileInfos.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + _array_info(body.data.length) + stack)
					logFileInfos.write(body.data)
					logFileInfos.write('\n')
				}
			break;

			case "warn":
				if(body.string == '1') {
					logFileWarns.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + stack + body.data + '\n')
				} else {
					logFileWarns.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + _array_info(body.data.length) + stack)
					logFileWarns.write(body.data)
					logFileWarns.write('\n')
				}
			break;

			case "logr":
				if(body.string == '1') {
					logFileLogrs.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + stack + body.data + '\n')
				} else {
					logFileLogrs.write(current_date + ((new Date()).toLocaleTimeString()) + log_name + _array_info(body.data.length) + stack)
					logFileLogrs.write(body.data)
					logFileLogrs.write('\n')
				}
			break;
		}
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