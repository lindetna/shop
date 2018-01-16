'use strict';

function View(req, res){
	this.req = req;
	this.res = res;
}

View.prototype.accueil = function accueil(){
	console.log('1: accueil');
	this.res.render('admin/riotjs.html', 
		{
		}
	);
};

View.prototype.login = function login(err){
	console.log('err', err);
	this.res.json({ error: err });
};

View.prototype.index = function index(){
	console.log('2: index');
	this.res.render('admin/login.html',
		{ 
		}
	);
};

View.prototype.show = function show(params){
/*************************************************************
	this.res.setHeader('Content-Type', 'application/json');
	this.res.send(JSON.stringify(params));
**************************************************************/
	this.res.json(params);
}

View.prototype.showError = function showError(e){
	console.log('View.showError: ' + JSON.stringify(e) );
	/*
		TODO: test for code, message, ...
	*/
	this.res.json({ error: e });
}

View.prototype.error = function error(message, url, http_code){
	/* *** PSEUDO CODE:****
	message => debbuging
	code => refer to a message in client view,
	url to redirect to another url/page
	http_code => http response code

	if code and message are stored in the same file ?

	(message)
	(message, code)
	(message, code, url)
	(message, code, url, http_code)
	(code, url)
	(code, url, http_code)
	***********************/
	var result = {};
	var redirect_url;
	if(message instanceof Error){
		result.message = message.message;
	}else if(typeof message == 'string'){
		result.message = message || 'Erreur inconnue';
	}else if(typeof message == 'number'){
		result.code = message;
	}
	
	if(url){
		if(http_code){
			this.res.redirect(http_code, url);
		}else{
			this.res.redirect(url);
		}
		return;
	}
	this.res.send(result);
};


module.exports = View;
