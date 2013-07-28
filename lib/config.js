var config;
try {
	config = require('fs').readFileSync('config.json');
} catch (e) {
	console.log(e);
}
module.exports = config;
