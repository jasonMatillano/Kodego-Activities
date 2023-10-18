const express = require('express');
const fs = require('fs'); // Require the File System module

const app = express();
const PORT = 8080;

app.use(express.json());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Define a GET route for retrieving t-shirt data
app.get('/tshirt', (req, res) => {
    // Respond with a sample t-shirt object
    res.status(200).send({
        tshirt: 'bench',
        size: 'XL'
    });
});

// Define a POST route for saving t-shirt data to data.json
app.post('/tshirt/:id', (req, res) => {
    const { id } = req.params;
    const { logo } = req.body;

    if (!logo) {
        // If no logo is provided, send an error response
        res.status(418).send({
            message: 'No logo provided'
        });
        return; // Exit the route handler
    }

    // Create an object with the provided data
    const tshirtData = {
        id: id,
        logo: logo
    };

    // Read the existing data from data.json (if any)
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            // If data.json doesn't exist or an error occurs, create an empty array
            const tshirtArray = [];
            tshirtArray.push(tshirtData);
            // Write the data to data.json
            fs.writeFile('data.json', JSON.stringify(tshirtArray, null, 2), (err) => {
                if (err) {
                    // Handle the error if writing to data.json fails
                    res.status(500).send({
                        message: 'Error writing to data.json'
                    });
                } else {
                    // Respond with a success message
                    res.status(200).send({
                        message: `T-shirt ${id} with logo ${logo} saved to data.json`
                    });
                }
            });
        } else {
            // Parse the existing JSON data
            const tshirtArray = JSON.parse(data);
            tshirtArray.push(tshirtData);
            // Write the updated data back to data.json
            fs.writeFile('data.json', JSON.stringify(tshirtArray, null, 2), (err) => {
                if (err) {
                    // Handle the error if writing to data.json fails
                    res.status(500).send({
                        message: 'Error writing to data.json'
                    });
                } else {
                    // Respond with a success message
                    res.status(200).send({
                        message: `T-shirt ${id} with logo ${logo} saved to data.json`
                    });
                }
            });
        }
    });
});

