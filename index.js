const express = require('express');
const app = express();
const port = 3000;

app.get('/',function(request, response){
    response.send('<h1>Hello world</h1>');
});
app.get('/user',function(request, response){
    response.send('List user from class');
});

app.listen(port, function(){
    console.log(`Example app listerning on port ${port}`);
});