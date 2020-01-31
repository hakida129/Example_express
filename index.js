const express = require('express');
const bodyParser = require('body-parser');

const userRouter = require('./routers/users.router');


const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRouter);

app.get('/',function(req, res){
    res.render('index',{
        name : 'hakida'
    });
});


app.listen(port, function(){
    console.log(`Example app listerning on port ${port}`);
});