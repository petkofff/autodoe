var fsmonitor = require('fsmonitor');
var fs = require('fs');
var spawn = require('child_process').spawn;

var scrProc;

function initScrProc(path) {
	if (scrProc !== undefined) scrProc.kill('SIGKILL');
	
	scrProc = spawn('sh', [path]);
	
	scrProc.stdout.on('data', function(data) {
		console.log(data.toString());
	});
	
	scrProc.stderr.on('data', function(data) {
		console.log(data.toString());
	});
}

module.exports.watch = function(path) {
	if (path == null) path = process.cwd() + '/.autodoe.sh';
	
	if (!fs.existsSync(path)) {
		var scrName = path.slice(path.lastIndexOf('/') + 1, path.length);
		console.log('autodoe: Can\'t find ' + scrName);
		process.exit(1);
	}
	
	console.log('autodoe: Monitoring filesystem...');
	
	initScrProc(path);
	
	fsmonitor.watch(path, null, function() {
		console.log('autodoe: Files changed, Building...');
		initScrProc(path);
	});
	
	var stdin = process.openStdin();
	stdin.on('data', function() {
		console.log('autodoe: Forced Update...');
		initScrProc(path);
	});
}
