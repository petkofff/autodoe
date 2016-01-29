var fsmonitor = require('fsmonitor');
var fs = require('fs');
var spawn = require('child_process').spawn;

var scrProc;

function initScrProc(path) {
	scrProc = spawn('sh', [path + '/.autodoe.sh']);
	
	scrProc.stdout.on('data', function(data) {
		console.log(data.toString());
	});
}

module.exports.watch = function(path) {
	if (path == null) path = process.cwd();
	
	initScrProc(path);
	
	fsmonitor.watch(path, null, function() {
		console.log('autodoe: Files changed, Building...');
		initScrProc(path);
	})
}
