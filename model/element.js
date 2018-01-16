'use strict';

var DB = require('../db');


function Element_Model(){
	this.db = new DB();
}

Element_Model.prototype.find = function find(params){
	var db = this.db;
	var promise = new Promise(function(resolve, reject) {
		var values = [];
		var id = '';
		var order = ' ORDER BY `libelle` ASC';

		if(params.id){
			id = ' AND id=?';
			values.push(params.id);
		}

		var sql =
            'SELECT \
                `id`,\
                `reference`,\
                `price`,\
                `packof`,\
                `number_sold`,\
                `stock`\
            FROM `items`';
				// id +
				// order;

		db.connect();

		var query = db.query(
			sql,
			values,
			null,
			function(err, rows){
				db.close();
				if( ! err){
					if(rows){
						resolve(rows);
					}else{
						console.log('Element_Model.find reject (no rows): ' + JSON.stringify(err));
						reject(new Error('Element_Model.find no rows returned'));
					}
				}else{
					console.log('Element_Model.find err: ' + err);
					reject(err);
				}
			}
		);
	});

	return promise;
};

Element_Model.prototype.add = function add(params){

	var db = this.db;

	var promise = new Promise(function(resolve,reject){

		db.connect();

		var val = [
            params.reference,
            params.stock,
            params.price,
            params.packof,
        ]

		var query = db.query(
			'INSERT INTO `items` (\
					`reference`,\
					`stock`,\
					`price`,\
					`packof`\
				) VALUES (\
                    ?,?,?,?\
				)',
			val, 
			null, 
			function(err, rows){
				db.close();
				if( ! err){
					if(typeof rows.info != 'undefined'
					  && typeof rows.info.affectedRows != 'undefined'
					  && rows.info.affectedRows == '1'
					  && typeof rows.info.insertId != 'undefined'){
						resolve(rows.info.insertId);
					}else{
						reject(new Error('Element_Model.add Unable to insert in the DB!...'));
					}
				}else{
					reject(err);
				}
			}
		);
	});

	return promise;
};

Element_Model.prototype.update = function update(params){

	var db = this.db;

	var promise = new Promise(function(resolve,reject){
		
		db.connect();
        var val = [
            params.reference,
            params.stock,
            params.price,
            params.packof,
            params.id,
        ];

		var query = db.query(
			'UPDATE `items` SET \
				`reference`=?,\
				`stock`=?,\
				`price`=?,\
				`packof`=?\
			 WHERE id=? LIMIT 1',	
			val, 
			null, 
			function(err, rows){
				db.close();
				if( ! err){
					if(typeof rows.info != 'undefined'
					  && typeof rows.info.affectedRows != 'undefined'
					){
						resolve(params.id);
					}else{
						reject(new Error('Element_Model.update Unable to insert in the DB!....'));
					}
				}else{
					reject(err);
				}
			}
		);
	});

	return promise;
};


Element_Model.prototype.del = function del(params){
	var db = this.db;

	var promise = new Promise(function(resolve,reject){

		var where;
		var values = [];
		var l, i;

		if(typeof params.id === 'string' || typeof params.id === 'number'){
			where = '`id`=? LIMIT 1';
			values = [ params.id ];
        }
		
		db.connect();

		var query = db.query(
			'DELETE FROM `items`\
				WHERE ' + where
			, 
			values,
			null, 
			function(err, rows){
				db.close();
				if( ! err){
					if(typeof rows.info != 'undefined'
					  && typeof rows.info.affectedRows != 'undefined'
					  && rows.info.affectedRows == '1'
					){
						resolve(params.id);
					}else{
						reject(new Error('Element_Model.del Unable to delete from the DB!...'));
					}
				}else{
					reject(err);
				}
			}
		);
	});

	return promise;
};

module.exports = Element_Model;
