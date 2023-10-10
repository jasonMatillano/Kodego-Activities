const express = require('express'); // add () in the end to initialize express
const app = express();
const PORT = 8080;

app.use(express.json()); // middle ware used to parse json

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/tshirt', (req, res) => {
    res.status(200).send({
        tshirt: 'bench',
        size: 'XL'
    })
});

app.post('/tshirt/:id', (req, res) => {
    
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        res.status(418).send({
            message: 'No logo provided'    
        })
    }

    res.send({ 
        message: `T-shirt ${id} with logo ${logo}` 
    })

})
