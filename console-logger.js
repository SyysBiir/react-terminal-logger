var only_msg = false, save_logs = false, visible = [], port = 1234, stacktrace_hide = false;
async function fetch_ (in_, val, stack, save_logs) {
	return new Promise(resolve => {
		var data;
		if(val.length === 1) {
			if(typeof val[0] == 'object') {
				data = {
					only_msg: only_msg ? "1" : "0",
					stacktrace_hide: stacktrace_hide ? "1" : "0",
					string: "0",
					save_logs: save_logs ? "1" : "0",
					data: val[0],
					stack: stack
				}
			} else {
				data = {
					only_msg: only_msg ? "1" : "0",
					stacktrace_hide: stacktrace_hide ? "1" : "0",
					string: '1',
					save_logs: save_logs ? "1" : "0",
					data: val[0].toString(),
					stack: stack
				}
			}
		} else {
			let allVal = "";
			val.map((l)=>{
				if(typeof l == 'object') {
					allVal = allVal + " " + JSON.stringify(l);
				} else {
					allVal = allVal + " " + l.toString();
				}
			})
			data = {
				only_msg: only_msg ? "1" : "0",
				stacktrace_hide: stacktrace_hide ? "1" : "0",
				string: '1',
				save_logs: save_logs ? "1" : "0",
				data: allVal,
				stack: stack
			}
		}
		fetch('http://localhost:'+port+'/console/'+in_, {
	  		method: "POST",
		    headers: {
		        "Content-type": "application/json"
		    },
	  		body: JSON.stringify(data)
	  	})
	  	.then(res=>res.json())
	    .then(res=>{
	    	resolve(res)
	    }).catch(e=>{
	    })
	})
}
module.exports = {
	config: (opt) => {
		if(opt.visible) {
			visible = opt.visible;
		}
		if(opt.only_msg) {
			only_msg = opt.only_msg;
		}
		if(opt.save_logs) {
			save_logs = opt.save_logs;
		}
		if(opt.port) {
			port = opt.port;
		}
		if(opt.stacktrace_hide) {
			stacktrace_hide = opt.stacktrace_hide;
		}
	},
	start: (opt_ = ["log", "error", "info", "warn", "logr"], save_logs_ = false, only_msg_ = false, port_ = 1234, stacktrace_hide_ = false) => {
		let opt = opt_;
		if(save_logs_) {
			save_logs = true;
		}
		if(only_msg_) {
			only_msg = true;
		}
		if(port_ != 1234) {
			port = port_;
		}
		if(stacktrace_hide_) {
			stacktrace_hide = true;
		}
		if(visible.length > 0) {
			opt = visible;
		}
		if(process.env.NODE_ENV === 'development') {
			console.disableYellowBox = true;
			if(opt.indexOf("log") !== -1) {
				window.console.log = (...val) => {
					let var_ = [];
					val.map((l)=>{
						var_.push(l)
					})
					fetch_("log", var_, new Error().stack.split('\n')[1].split('@')[0], save_logs);
				}
			}
			if(opt.indexOf("error") !== -1) {
				window.console.error = (...val) => {
					let var_ = [];
					val.map((l)=>{
						var_.push(l)
					})
					fetch_("error", var_, new Error().stack.split('\n')[1].split('@')[0], save_logs);
				}
			}
			if(opt.indexOf("info") !== -1) {
				window.console.info = (...val) => {
					let var_ = [];
					val.map((l)=>{
						var_.push(l)
					})
					fetch_("info", var_, new Error().stack.split('\n')[1].split('@')[0], save_logs);
				}
			}
			if(opt.indexOf("warn") !== -1) {
				window.console.warn = (...val) => {
					let var_ = [];
					val.map((l)=>{
						var_.push(l)
					})
					fetch_("warn", var_, new Error().stack.split('\n')[1].split('@')[0], save_logs);
				}
			}
			if(opt.indexOf("logr") !== -1) {
				window.logr = (...val) => {
					let var_ = [];
					val.map((l)=>{
						var_.push(l)
					})
					fetch_("logr", var_, new Error().stack.split('\n')[1].split('@')[0], save_logs);
				}
			}
		} else {
			window.logr = (...val) => {
				console.log(...val)
			}
		}
	}
}