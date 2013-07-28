#!/usr/bin/env node

var opt;
var args = process.argv.slice(2);

try {
	opt = JSON.parse(require('fs').readFileSync('config.json'));
} catch(e) {
	opt = {};
}

if (!opt.id && !args.length) {
	console.log('(no user specified. `starred -h` for usage');
	process.exit(1);
}

while(args.length > 0) {
	var arg = args.shift();
	switch(arg) {
		case '-h':
		case '--help':
			printHelp();
			break;
		default:
			if (opt.id && opt.id !== arg)
				opt.lastRequestTime = 0;
			opt.id = arg;
			break;
	}
}

function printHelp() {
	console.log('');
	console.log('   Usage: starred [userid]');
	console.log('');
	console.log('   Options:');
	console.log('');
	console.log('     -h, --help    print this help');
	console.log('');
	process.exit(0);
}

require('./../lib/index.js').init(opt);
