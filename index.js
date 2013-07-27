var List = require('term-list')
  , list = new List({ marker: '\033[36m> \033[0m', markerLength: 2})
	, exec = require('child_process').exec
	, star = {};

// show help

// handle keypress
list.on('keypress', function(key, item) {
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
		case 'escape'
			list.stop();
			process.exit();
			break;
	}
});
