const express = require('express');
const app = express();

app.get('/', (req, res) => {
    // res.send('Hello World!');
    res.sendStatus(400);
});

app.listen(3000)