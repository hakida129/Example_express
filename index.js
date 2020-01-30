const express = require('express');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

var users = [
    {id : 1, name :'long'},
    {id : 2, name :'thang'}
];

app.get('/',function(req, res){
    res.render('index',{
        name : 'hakida'
    });
});
app.get('/user',function(req, res){
    res.render('users/index',{
        users: users
    });
});

app.get('/user/search',function(req,res){
    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers
    })
});

app.listen(port, function(){
    console.log(`Example app listerning on port ${port}`);
});