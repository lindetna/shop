"use strict";

var Client = require('mariasql');

function DB(){

	this.client;
	this.host = 'localhost';
	this.db_name = 'shop';
	this.user = 'shop';
	this.password = 'shopsql';
};

DB.prototype.connect = function connect(){

	if(this.client){
		this.client.end();
	}

	this.client = new Client();

	this.client.connect({
		host: this.host,
		user: this.user,
		password: this.password,
		db: this.db_name,
		multiStatements: true
	});
}

DB.prototype.query = function query(str, values, config, cb){

	return this.client.query(str, values, config, cb);
};

DB.prototype.close = function close(){
	if(this.client){
		this.client.end();
	}
};

module.exports = DB;
