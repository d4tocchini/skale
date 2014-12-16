#!/usr/local/bin/node --harmony

var co = require('co');
var fs = require('fs');
var ugrid = require('../lib/ugrid-context.js')({host: 'localhost', port: 12346});
var ml = require('../lib/ugrid-ml.js');

co(function *() {
	yield ugrid.init();

	var N = 4;
	var D = 2;

	var res = yield ugrid.randomSVMData(N, D).collect();

	console.log(res);
	
	ugrid.end();
})();