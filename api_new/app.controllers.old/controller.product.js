const express = require('express');
const app = express(); // Change app to express

app.use(express.json());

const fs = require('fs');
const cors = require('cors'); // Require the 'cors' middleware

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in request bodies
app.use(express.json());

// Function to read products from the JSON file
function readproductsFromFile() {
  try {
    const data = fs.readFileSync('./app.models/products.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading ./app.models/products.json:', error);
    return [];
  }
}

let products = readproductsFromFile();

// GET all products
app.get('/products', (req, res) => {
  // Read products from the JSON file
  products = readproductsFromFile();

  // Return the products as a JSON response
  res.json(products);
});

// GET a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);

  // Read products from the JSON file
  products = readproductsFromFile();

  // Find the product with the specified ID
  const product = products.find((p) => p.id === productId);

  if (product) {
    // If the product is found, return it as a JSON response
    res.json(product);
  } else {
    // If the product is not found, return a 404 error response
    res.status(404).json({ error: 'product not found' });
  }
});

// POST - Create a new product
app.post('/products', (req, res) => {
  const newproduct = req.body;

  // Read products from the JSON file
  products = readproductsFromFile();

  // Calculate the next available product ID
  const nextproductId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  newproduct.id = nextproductId;

  // Add the new product to the products array
  products.push(newproduct);

  // Save the updated products array to ./app.models/products.json
  fs.writeFile('./app.models/products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to ./app.models/products.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Return the created product with a 201 status code
      res.status(201).json(newproduct);
    }
  });
});


// PUT - Update an existing product by ID
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const updatedproduct = req.body;
  
    // Read products from the JSON file
    products = readproductsFromFile();
  
    // Find the product with the specified ID
    const existingproductIndex = products.findIndex((p) => p.id === productId);
  
    if (existingproductIndex !== -1) {
      // Update the product details in the products array
      products[existingproductIndex] = { id: productId, ...updatedproduct };
  
      // Save the updated products array to ./app.models/products.json
      fs.writeFile('./app.models/products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to ./app.models/products.json:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Return the updated product with a 200 status code
          res.status(200).json({ id: productId, ...updatedproduct });
        }
      });
    } else {
      // If the product is not found, return a 404 error response
      res.status(404).json({ error: 'product not found' });
    }
});


// DELETE - Remove an existing product by ID
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
  
    // Read products from the JSON file
    products = readproductsFromFile();
  
    // Find the product with the specified ID
    const deletedproductIndex = products.findIndex((p) => p.id === productId);
  
    if (deletedproductIndex !== -1) {
      // Remove the product from the products array
      const deletedproduct = products.splice(deletedproductIndex, 1)[0];
  
      // Save the updated products array to ./app.models/products.json
      fs.writeFile('./app.models/products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to ./app.models/products.json:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Return the deleted product with a 200 status code
          res.status(200).json(deletedproduct);
        }
      });
    } else {
      // If the product is not found, return a 404 error response
      res.status(404).json({ error: 'product not found' });
    }
});

module.exports = app; 