async function fetch_ (in_, val, stack, save_logs) {
	return new Promise(resolve => {
		var data;
		if(val.length === 1) {
			if(typeof val[0] == 'object') {
				data = {
					string: "0",
					save_logs: save_logs ? "1" : "0",
					data: val[0],
					stack: stack
				}
			} else {
				data = {
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
				string: '1',
				save_logs: save_logs ? "1" : "0",
				data: allVal,
				stack: stack
			}
		}
		fetch('http://localhost:1234/console/'+in_, {
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
	start: (opt = ["log", "error", "info", "warn", "logr"], save_logs = false) => {
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