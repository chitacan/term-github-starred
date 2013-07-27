var List = require('term-list')
  , list = new List({ marker: '\033[33m> \033[0m', markerLength: 2})
	, exec = require('child_process').exec
	, repos  = {}
  , config = require('config.js');

if (!confit) return;

var size = process.stdout.getWindowSize();

// add 3 blank line to bottom(tmux status line etc..)
var pageHeight = size[1] - 3;

console.log(size);

// show help

// handle keypress
list.on('keypress', function(key, item) {
	if (typeof key === 'undefined') return;

	switch (key.name) {
		case 'r':
			// refresh
			break;
		case 'j':
			list.down();
			break;
		case 'k':
			list.up();
			break;
		case 'l':
		case 'o':
		case 'return':
			list.stop();
			exec('open "' + repos[item].url +'"');
			setTimeout(function() {
				list.start();
			}, 2000);
			break;
		case 'h':
		case 'space':
			console.log('show repo info');
			break;
		case 'q':
		case 'escape':
			list.stop();
			process.exit();
			break;
	}
});

console.log('get your starred repos...');

require('./starred.js').getRepos(function(err, items) {
	if (err) return console.error(err);

	items.forEach(function(el, idx) {
		if (idx > pageHeight) return;
		repos[el.id] = el;
		list.add(el.id, el.name);
	});
	list.start();
});
