const shortid = require('shortid');
const db = require('../db');

module.exports.index = function(req, res){
    res.render('users/index',{
        users: db.get('users').value()
    });
};

module.exports.search = function(req,res){
    const name = req.query.name;
    const matchedUsers = db.get('users').value().filter(function(user){
        return user.name.indexOf(name) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers
    });
};

module.exports.create = function (req,res) {
    res.render('users/create');
};

module.exports.get = function(req, res){
    const id = req.params.id;
    const user = db.get('users').find({id: id}).value();

    res.render('users/view',{
       user: user 
    });
};

module.exports.postCreate = function (req,res) {  
    req.body.id = shortid.generate();

    db.get('users').push(req.body).write();
    res.redirect('/users');
};
