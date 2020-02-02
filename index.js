const express = require('express');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

const userRouter = require('./routers/users.router');
const authRouter = require('./routers/auth.router');

const authMiddleware = require('./middlewares/auth.middlewares');

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('wercghjy45fghdf3ssd'));

app.use('/users',authMiddleware.requireAuth, userRouter);
app.use('/auth', authRouter);

app.get('/',function(req, res){
    res.render('index',{
        name : 'hakida'
    });
});

app.listen(port, function(){
    console.log(`Example app listerning on port ${port}`);
});