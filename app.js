"use strict";

var production = (process.env.NODE_ENV=='production' ? true : false);
var express = require('express');
var http = require('http');
var nunjucks = require('nunjucks');
var route = require('./route');

var app = express();

route(app);

nunjucks.configure('view/templates', 
	{
		autoescape	: true,
		express		: app
	}
);

if(production){
	var server = http.createServer(app).listen(80, function(err) {
		if(err) return cb(err);

		// www-data uid => 33
		var uid = 33;

		if(uid){
			 process.setuid(uid);
		}else{
			console.log('Can\'t remove root privileges!!!...');
		}
		console.log('Server\'s running on UID : ' + process.getuid());
	});
}else{
	var server = http.createServer(app).listen(3001, function(err) {
		/*console.log('Server\'s running on UID : ' + process.getuid() + ' in dev');*/
	});
}