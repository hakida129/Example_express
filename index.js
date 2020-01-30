const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

var users = [
    {id : 1, name :'long'},
    {id : 2, name :'thang'}
];

app.get('/',function(req, res){
    res.render('index',{
        name : 'hakida'
    });
});
app.get('/users',function(req, res){
    res.render('users/index',{
        users: users
    });
});

app.get('/users/search',function(req,res){
    var q = req.query.q;
    var matchedUsers = users.filter(function(user){
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        users: matchedUsers
    })
});

app.get('/users/create', function (req,res) {
    res.render('users/create');
  });

app.post('/users/create', function (req,res) {  
    users.push(req.body);
    res.redirect('/users');
});


app.listen(port, function(){
    console.log(`Example app listerning on port ${port}`);
});