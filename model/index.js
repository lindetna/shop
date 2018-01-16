"use strict";

var DB = require('../db');

function Model(req, res) {
    this.db = new DB();
    this.req = req;
    this.res = res;
};

Model.prototype.getUserInfo = function getUserInfo() {
    var db = this.db;
    var _this = this;
    var promise = new Promise ( (resolve, reject) => {
		// recup les infos de l'utilisateur qui est entré dans le input ( faire bdd)
		console.log('this.req.body', this.req.body.identifiant);
		var sql = "SELECT * FROM utilisateur WHERE username=? LIMIT 1;";
        var val = [this.req.body.identifiant];
        
		db.connect(); 
		var query = db.query(
			sql,
			val,
			null,
			function(err, rows){
				db.close();
				if( ! err){
                    console.log('rows[0]:', rows[0]);
					if(typeof rows[0] != 'undefined'){
                        resolve(rows[0]);
                        console.log('resolve1')
					}else{
                        console.log('reject1')
						reject(new Error('no user found'));
					}
				}else{
					reject(err);
				}
			}
		);
		

    })

    return promise;
}

module.exports = Model;
