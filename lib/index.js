
var List = require('term-list')
  , list = new List({ marker: '\033[33m> \033[0m', markerLength: 2})
	, exec = require('child_process').exec
	, repos  = {}
  , config = require('./../lib/config.js');

if (!config) return;

// add 3 blank line to bottom(tmux status line etc..)
var pageHeight = process.stdout.getWindowSize()[1] - 3;

function init(opt) {
	opt = opt || {};
	console.log('get your starred repos...');
	list.on('keypress', handleKeypress);
	require('./../lib/starred.js').getRepos(function(err, items) {
		if (err) return console.error(err);
	
		items.forEach(function(el, idx) {
			if (idx > pageHeight) return;
			repos[el.id] = el;
			list.add(el.id, el.name);
		});
		list.start();
	});
}


// handle keypress
function handleKeypress(key, item) {
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
}

module.exports.init = init;
