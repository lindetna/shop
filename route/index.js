"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: true });
var Element_Controller = require('../controller/element');

function Route(app) {
	app.use(express.static(__dirname + '/../public'));

	app.get(Route.ROOT_URL, function (req, res) {
		/**
			we need with "/" url to choice with domain name between axis site or site_client
		**/
		var domain = Route.getDomain(req.headers.host);

		if( domain === 'localhost' ){
			var Admin_Controller = require('../controller/');
			var admin_c = new Admin_Controller(req, res);
			admin_c.index();
		}
	});

	app.post(Route.ROOT_URL, urlEncodedParser, function (req, res) {
		var Controller = require('../controller/');
		var c = new Controller(req, res);
		c.login();
	});
	
	app.get(Route.ROOT_ACCUEIL_URL, function (req, res) {
		console.log('req.query.valid', req.query.valid);
		if(req.query.valid == "success") {
			res.render('admin/riotjs.html',
				{
				}
			);
		} else {
			res.redirect('/');
		}
		// res.render('admin/riotjs.html',
		// 	{
		// 	}
		// );
	});

	app.get('/api/element', function (req, res) {
		var element = new Element_Controller(req, res);
		element._get();
	});
	
	app.post('/api/element', urlEncodedParser, function (req, res) {
		var element = new Element_Controller(req, res);
		element._post();
	});

}

/*
 * get Domain is called each time somebody load the front page
 * return domain without top level domain extension (.com, .fr, etc ...) 
 * and without subdomain, like it we can manage several extensions and subdomains
 */
Route.getDomain = function getDomain(host){
	host = host ? host.trim() : '';
	var hostname = host.split(':',1)[0];

	var levelsDomain = hostname.split('.');
	var domain;

	if( levelsDomain.length > 1 ){
		domain = levelsDomain[levelsDomain.length - 2] + '.' + levelsDomain[levelsDomain.length - 1];
	}else{
		domain = levelsDomain[0];
	}
console.log('!!! domain: ' + domain);
	return domain;
}

Route.ROOT_URL = '/';
Route.ROOT_ACCUEIL_URL = '/accueil';


module.exports = Route;
