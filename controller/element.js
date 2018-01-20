'use strict';

var bodyParser = require('body-parser');
var Model = require('../model/element');
var View = require('../view/element');

function Element_Controller(req, res){
	this.req = req;
	this.res = res;
	this.model = new Model();
	this.view = new View(req, res);
}

Element_Controller.prototype._get = function _get(){
    try{
        if( ! this.req.query){
            throw new Error('Element_Controller._get :: Invalid query in get request!...');
        }
        var _this = this;
        var query = this.req.query;
        var model_promise;
        var model_params = {};

        if(query.id){
            model_params.id = query.id;
        }
        if(query.order){
            model_params.order = query.order;
        }
        model_promise = _this.model.find(model_params);

        model_promise.then(function(result){
            _this.view.show(result);
        },function(err){
            _this.view.showError('Element_Controller._get promise err: ' + err);
        }).catch(function(err){
            _this.view.showError('Element_Controller._get promise catch: ' + err);
        });
    }catch(e){
        this.view.showError('Element_Controller._get catch: ' + e);
    }	
}

Element_Controller.prototype._post = function _post(){
    try{
        var model_promise;
        var model_params;
        var _this = this;
        model_params = this.getPostQuery();
        if(model_params.action === 'add'){
            model_promise = this.model.add(model_params);
        }else if(model_params.action === 'update'){
            model_promise = this.model.update(model_params);
        }else if(model_params.action === 'delete'){
            model_promise = this.model.del(model_params);
        } else if(model_params.action === 'shop') {
            model_promise = this.model.shop(model_params);
        }

        model_promise.then(function(result){
            if(model_params.action === 'add'){
                _this.view.showAdd(result);
            }else if(model_params.action === 'update'){
                _this.view.showUpdate(result);
            }else if(model_params.action === 'delete'){
                _this.view.showDelete(result);
            }
        },function(err){
            _this.view.showError('Element_Controller._post promise err: ' + err);
        }).catch(function(err){
            _this.view.showError('Element_Controller._post promise catch: ' + err);
        });
    }catch(e){
        this.view.showError('Element_Controller._post catch: ' + e);
    }
}

Element_Controller.prototype.getPostQuery = function getPostQuery(){
	var params = {};
	if( ! this.req.body){
		throw new Error('Element_Controller._post :: Invalid body in post request!...');
	}else{
		var query = this.req.body;
		var names, i;

		if(query.action){
			if(query.action === 'add'){
				params.action = 'add';
				names = this.getAddNames();
			}else if(query.action === 'update'){
				params.action = 'update';
				names = this.getUpdateNames();
			}else if(query.action === 'delete'){
				params.action = 'delete';
				names = this.getDeleteNames();
			}else if(query.action === 'shop'){
                params.action = 'shop';
                names = { elements: {required: true} };
			}else{
				throw new Error('Element_Controller._post :: Invalid post request action!...');
			}

			for(i in names){
				if(typeof query[i] !== 'undefined'){
					params[i] = query[i];
				}else{
					if(names[i].required){
						throw new Error('Element_Controller._post :: Missing parameter ' + i + '!..');
					}
				}
			}
		}else{
			throw new Error('Element_Controller._post :: Invalid post request action!!!...');
		}
	}
	return params;
}

Element_Controller.prototype.getAddNames = function getAddNames(){
	return {
		reference: 	{required: true},
        stock: 		{required: true},
        price: 		{required: true},
		packof: 	{required: true},
	};
}

Element_Controller.prototype.getUpdateNames = function getUpdateNames(){
	return {
		reference: 	{required: true},
        stock: 		{required: true},
        price: 		{required: true},
        packof: 	{required: true},
        id:         {required: true},
    };
}

Element_Controller.prototype.getDeleteNames = function getDeleteNames(){
	return {
		id:		 		{required: true},
	};
}

module.exports = Element_Controller;
