const express = require('express')
const db = require('../db');
const shortid = require('shortid');

const router = express.Router()

router.get('/',function(req, res){
    res.render('users/index',{
        users: db.get('users').value()
    });
});

router.get('/search',function(req,res){
    const q = req.query.q;
    const matchedUsers = db.get('users').filter(function(user){
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        //users: matchedUsers
        users: db.get('users').find({ matchedUsers }).value()
    })
});

router.get('/create', function (req,res) {
    res.render('users/create');
});

router.get('/:id',function(req, res){
    const id = req.params.id;
    const user = db.get('users').find({id: id}).value();

    res.render('users/view',{
       user: user 
    });

});

router.post('/create', function (req,res) {  
    req.body.id = shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

module.exports = router;
