var List = require('term-list')
  , list = new List({ marker: '\033[36m> \033[0m', markerLength: 2})
	, exec = require('child_process').exec
	, repos = {};

// show help

// handle keypress
list.on('keypress', function(key, item) {
	if (typeof key === 'undefined') return;

	switch (key.name) {
		case 'j':
			list.down();
			break;
		case 'k':
			list.up();
			break;
		case 'l':
		case 'o':
		case 'return':
			console.log('item selected');
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

require('./starred.js').repos(function(err, items) {
	if (err) return console.error(err);

	items.forEach(function(el, idx) {
		list.add(idx, el.name);
	});
	list.start();
});
