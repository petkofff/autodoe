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

module.exports.watch = function(pathToScr, pathToFolder) {
	if (pathToScr == null) pathToScr = process.cwd() + '/.autodoe.sh';
	if (pathToFolder == null) pathToFolder = pathToScr.slice(0, pathToScr.lastIndexOf('/'));
	
	if (!fs.existsSync(pathToScr)) {
		var scrName = pathToScr.slice(pathToScr.lastIndexOf('/') + 1, pathToScr.length);
		console.log('autodoe: Can\'t find ' + scrName);
		process.exit(1);
	}
	
	console.log('autodoe: Monitoring filesystem...');
	
	initScrProc(pathToScr);
	
	fsmonitor.watch(pathToFolder, null, function() {
		console.log('autodoe: Files changed, Building...');
		initScrProc(pathToScr);
	});
	
	var stdin = process.openStdin();
	stdin.on('data', function() {
		console.log('autodoe: Forced Update...');
		initScrProc(pathToScr);
	});
}
