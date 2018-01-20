'use strict';
var Route = require('../route');
var View = require('../view');
var bodyParser = require('body-parser');
var View = require('../view/');
var Model = require('../model/');
var sha256 = require('js-sha256').sha256;

function Controller(req, res){
	this.req = req;
	this.res = res;
	this.view = new View(req, res);
	this.model = new Model(req, res);
	// this.auth = new Auth(req, res);
};

Controller.prototype.index = function index(){
	// login form don't need a valid session
	this.view.index();
};

Controller.prototype.accueil = function accueil(){
	this.view.accueil();
};

Controller.prototype.login = function login(){
	var _this = this;
	var promise = this.model.getUserInfo();
	promise.then((result) => {
		console.log('sha:', sha256(_this.req.body.password));
        if(sha256(_this.req.body.password) == result.password && _this.req.body.connexion_type && _this.req.body.connexion_type === 'start') {
			_this.res.redirect(Route.ROOT_ACCUEIL_URL + '/?valid=success');
        } else {
			_this.view.login('Mdp incorrect');			
        }
    }, err => {
		_this.view.login(err);
    }).catch(err => {
		_this.view.login(err);
	});
};

module.exports = Controller;
