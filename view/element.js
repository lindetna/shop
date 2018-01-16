'use strict';

var View = require('./');

function Element_View(req, res){
	this.req = req;
	this.res = res;
	this.parent = new View(req, res);
}

Element_View.prototype.show = function show(params){
/*************************************************************
	this.res.setHeader('Content-Type', 'application/json');
	this.res.send(JSON.stringify(params));
**************************************************************/
	this.parent.show({ elements: params });
}

Element_View.prototype.showAdd = function showAdd(insertId){
	this.parent.show({ id: insertId });
}

Element_View.prototype.showUpdate = function showUpdate(updatedId){
	this.parent.show({ id: updatedId });
}

Element_View.prototype.showDelete = function showDelete(deletedId){
	this.parent.show({ id: deletedId });
}

Element_View.prototype.showError = function showError(e){
	console.log('Element_View.showError: ' + JSON.stringify(e) + ', ' + e);
	this.parent.showError(e);
}

module.exports = Element_View;
