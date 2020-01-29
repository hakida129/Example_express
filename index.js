const express = require('express');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/',function(req, res){
    res.render('index',{
        name : 'hakida'
    });
});
app.get('/user',function(req, res){
    res.render('users/index',{
        users: [
            {id : 1, name :'long'},
            {id : 2, name :'thang'}
        ]
    });
});

app.listen(port, function(){
    console.log(`Example app listerning on port ${port}`);
});