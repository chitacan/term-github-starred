var request = require('request');
var fs      = require('fs');

var URL = 'https://api.github.com/users/{id}/starred';

function parseBody (body, cb) {
	var json = JSON.parse(body);
	var result = []; 
	json.forEach(function(el, idx) {
		item = {};
		item.id   = el.id;
		item.name = el.name;
		item.url  = el.html_url;
		item.desc = el.description;
		result.push(item);
	});
	cb(null, result);
};

function cache(data, cb) {
	fs.writeFile('cached.json', data, function(err) {
		if (err) return cb(err);

		parseBody(data, cb);
	});
};

function getStarred (opt, cb) {
	// check last cached time
	var requestUrl = URL.replace('{id}', opt.id);
	request(requestUrl, function(err, res, body) {
		if (err) return cb(err);

		cache(body, cb);
	});
	// var localCache = fs.readFileSync('cached.json');
	// parseBody(localCache, cb);
};

var get = function(opt, cb) {
	getStarred(opt, cb);
};

module.exports.get = get;
