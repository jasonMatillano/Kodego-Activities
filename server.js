const express = require('express');
const app = express();

app.set('view engine', 'ejs'); // Corrected typo

app.get('/', (req, res) => {
    console.log('here');  
    res.render('index',{ text : " <h2>Hello World2</h2>"});
});

const userRouter = require('./routers/users');

app.use('/users', userRouter);


app.listen(3000);
