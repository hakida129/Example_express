const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

// Set some defaults (required if your JSON file is empty)
db.defaults({ users: [] })
  .write()

const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.get('/',function(req, res){
    res.render('index',{
        name : 'hakida'
    });
});
app.get('/users',function(req, res){
    res.render('users/index',{
        users: db.get('users').value()
    });
});

app.get('/users/search',function(req,res){
    var q = req.query.q;
    var matchedUsers = db.get('users').filter(function(user){
        return user.name.indexOf(q) !== -1;
    });
    res.render('users/index',{
        //users: matchedUsers
        users: db.get('users').find({ matchedUsers }).value()
    })
});

app.get('/users/create', function (req,res) {
    res.render('users/create');
  });

app.post('/users/create', function (req,res) {  
    db.get('users').push(req.body).write();
    res.redirect('/users');
});


app.listen(port, function(){
    console.log(`Example app listerning on port ${port}`);
});