async function fetch_ (in_, val, stack) {
	return new Promise(resolve => {
		var data;
		if(typeof val == 'object') {
			data = {
				string: "0",
				data: val,
				stack: stack
			}
		} else {
			data = {
				string: '1',
				data: val.toString(),
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
	start: () => {
			console.disableYellowBox = true;
			window.console.log = (val) => {
				fetch_("log", val, new Error().stack.split('\n')[1].split('@')[0]);
			}
			window.console.error = (val) => {
				fetch_("error", val, new Error().stack.split('\n')[1].split('@')[0]);
			}
			window.console.info = (val) => {
				fetch_("info", val, new Error().stack.split('\n')[1].split('@')[0]);
			}
			window.console.warn = (val) => {
				fetch_("warn", val, new Error().stack.split('\n')[1].split('@')[0]);
			}
		}
}