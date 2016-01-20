var fs = require('fs');

var babelrc = fs.readFileSync('./.babelrc');

var config;

try {
	config = JSON.parse(babelrc);
} catch(err) {
	console.log("error parsing your .babelrc")
	console.log(err)
}

require('babel-core/register')(config)