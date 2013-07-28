var request = require('request');
var fs      = require('fs');

// curl -i "https://api.github.com/users/{userid}/starred"
var URL = 'https://api.github.com/users/{id}/starred';
var REQ_RATE = 30 * 60 * 1000;

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

function saveConfig(opt) {
	var data = JSON.stringify(opt);
	fs.writeFileSync('config.json', data);
};

function checkRate(opt) {
	opt.lastRequestTime = opt.lastRequestTime || 0;
	return Date.now() - opt.lastRequestTime > REQ_RATE;
};

function getStarred(opt, cb) {
	if (checkRate(opt)) {
		var requestUrl = URL.replace('{id}', opt.id);
		request(requestUrl, function(err, res, body) {
			if (err) return cb(err);
			if (res.statusCode == 404) return cb("User not found.");

			opt.lastRequestTime = Date.now();
			saveConfig(opt);
			cache(body, cb);
		});
	} else {
		var localCache = fs.readFileSync('cached.json');
		parseBody(localCache, cb);
	}
};

var get = function(opt, cb) {
	getStarred(opt, cb);
};

module.exports.get = get;
