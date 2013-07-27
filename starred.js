var request = require('request');

var URL = 'https://api.github.com/users/{id}/starred';

var call = function(username, cb) {
	// for test we'll use mock file.
	// var requestUrl = URL.replace('{id}', username);
	// request(requestUrl, function(err, res, body) {
	// 	if (err) return cb(err);
	// 	parseBody(body, cb);
	// });
	var testJson = require('fs').readFileSync('test.json');
	parseBody(testJson, cb);
};

var parseBody = function(body, cb) {
	var json = JSON.parse(body);
	console.log('hello??');
	var items = []; 
	json.forEach(function(el, idx) {
		item = {};
		item.name = el.name;
		item.url  = el.html_url;
		item.desc = el.description;
		items.push(item);
	});
	cb(null, items);
};

var repos = function(cb) {
	call('chitacan', cb);
};

module.exports.repos = repos;
