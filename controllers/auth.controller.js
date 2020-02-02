const db = require('../db');

module.exports.login = function(req,res){
    res.render('auth/login');
};

module.exports.postLogin = function(req, res){
    const email = req.body.email;
    const password = req.body.password;

    const user = db.get('users').find({email: email}).value();

    if(!user){
        res.render('auth/login',{
            errors: [
                'User does not exits.'
            ],
            values: req.body
        });
        return;
    };
    if(user.password !== password){
        res.render('auth/login',{
            errors: [
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    };

    res.redirect('/users');
    
};