const md5 = require('md5');

// node
// > md5 = require('md5')
// [Function]
// > md5('123456')
// 'e10adc3949ba59abbe56e057f20f883e'

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

    const hashedPassword = md5(password);

    if(user.password !== hashedPassword){
        res.render('auth/login',{
            errors: [
                'Wrong password.'
            ],
            values: req.body
        });
        return;
    };

    res.cookie('userId', user.id,{
        signed: true
    });
    res.redirect('/users');
    
};