#!/usr/local/bin/node --harmony

// stream -> collect

var fs = require('fs');
var co = require('co');
var ugrid = require('../..');

var s1 = fs.createReadStream('./f', {encoding: 'utf8'});

co(function *() {
	var uc = yield ugrid.context();
	console.assert(uc.worker.length > 0);

	uc.stream(s1, {N: 4}).collect(function(err, res) {
		console.assert(res.length == 4);
	});

	uc.jobs[0].stream.on('end', function () {
		console.log("BYE");
		uc.end();
	});
}).catch(ugrid.onError);
