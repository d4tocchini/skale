#!/usr/bin/env node

var assert = require('assert');
var sc = new require('skale').Context();

function reducer(a, b) {a.push(b); return a;}
function combiner(a, b) {return a.concat(b);}

function dup(a) {return [a, a];}

sc.parallelize([1, 2, 3, 4]).flatMap(dup).aggregate(reducer, combiner, [], function(err, res) {
	res.sort();
	assert(JSON.stringify(res) === JSON.stringify([1, 1, 2, 2, 3, 3, 4, 4]));	
	console.log('Success !')
	console.log(res);
	sc.end();
})
