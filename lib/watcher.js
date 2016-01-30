var fsmonitor = require('fsmonitor');
var fs = require('fs');
var spawn = require('child_process').spawn;

var scrProc;

function initScrProc(path) {
	if (scrProc !== undefined) scrProc.kill('SIGKILL');
	
	scrProc = spawn('sh', [path + '/.autodoe.sh']);
	
	scrProc.stdout.on('data', function(data) {
		console.log(data.toString());
	});
	
	scrProc.stderr.on('data', function(data) {
		console.log(data.toString());
	});
}

module.exports.watch = function(path) {
	if (path == null) path = process.cwd();
	
	if (!fs.existsSync(path + '/.autodoe.sh')) {
		console.log('autodoe: Can\'t find .autodoe.sh');
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
