require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const userRouter = require('./routers/users.router');
const authRouter = require('./routers/auth.router');
const productRouter = require('./routers/product.router');

const authMiddleware = require('./middlewares/auth.middlewares');

const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('process.env.SESSION_SECRET'));

app.use('/users',authMiddleware.requireAuth, userRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);

app.get('/',function(req, res){
    res.render('index',{
        name : 'hakida'
    });
});

app.listen(port, function(){
    console.log(`Example app listerning on port ${port}`);
});