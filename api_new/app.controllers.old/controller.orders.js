const express = require('express');
const app = express(); // Change app to express

app.use(express.json());

const fs = require('fs');
const cors = require('cors'); // Require the 'cors' middleware

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in request bodies
app.use(express.json());

// Function to read orders from the JSON file
function readordersFromFile() {
  try {
    const data = fs.readFileSync('./app.models/orders.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading ./app.models/orders.json:', error);
    return [];
  }
}

let orders = readordersFromFile();

// GET all orders
app.get('/orders', (req, res) => {
  // Read orders from the JSON file
  orders = readordersFromFile();

  // Return the orders as a JSON response
  res.status(200).json(orders);
});

// GET a specific cart by ID
app.get('/orders/:id', (req, res) => {
  const cartId = parseInt(req.params.id, 10);

  // Read orders from the JSON file
  orders = readordersFromFile();

  // Find the cart with the specified ID
  const cart = orders.find((p) => p.id === cartId);

  if (cart) {
    // If the cart is found, return it as a JSON response
    res.status(200).json(cart);
  } else {
    // If the cart is not found, return a 404 error response
    res.status(404).json({ error: 'cart not found' });
  }
});

// POST - Create a new cart
app.post('/orders', (req, res) => {
  const newcart = req.body;

  // Read orders from the JSON file
  orders = readordersFromFile();

  // Calculate the next available cart ID
  const nextcartId = orders.length > 0 ? orders[orders.length - 1].id + 1 : 1;

  newcart.id = nextcartId;

  // Add the new cart to the orders array
  orders.push(newcart);

  // Save the updated orders array to ./app.models/orders.json
  fs.writeFile('./app.models/orders.json', JSON.stringify(orders, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to ./app.models/orders.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Return the created cart with a 201 status code
      res.status(201).json(newcart);
    }
  });
});


// PUT - Update an existing cart by ID
app.put('/orders/:id', (req, res) => {
    const cartId = parseInt(req.params.id, 10);
    const updatedcart = req.body;
  
    // Read orders from the JSON file
    orders = readordersFromFile();
  
    // Find the cart with the specified ID
    const existingcartIndex = orders.findIndex((p) => p.id === cartId);
  
    if (existingcartIndex !== -1) {
      // Update the cart details in the orders array
      orders[existingcartIndex] = { id: cartId, ...updatedcart };
  
      // Save the updated orders array to ./app.models/orders.json
      fs.writeFile('./app.models/orders.json', JSON.stringify(orders, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to ./app.models/orders.json:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Return the updated cart with a 200 status code
          res.status(200).json({ id: cartId, ...updatedcart });
        }
      });
    } else {
      // If the cart is not found, return a 404 error response
      res.status(404).json({ error: 'cart not found' });
    }
});


// DELETE - Remove an existing cart by ID
app.delete('/orders/:id', (req, res) => {
    const cartId = parseInt(req.params.id, 10);
  
    // Read orders from the JSON file
    orders = readordersFromFile();
  
    // Find the cart with the specified ID
    const deletedcartIndex = orders.findIndex((p) => p.id === cartId);
  
    if (deletedcartIndex !== -1) {
      // Remove the cart from the orders array
      const deletedcart = orders.splice(deletedcartIndex, 1)[0];
  
      // Save the updated orders array to ./app.models/orders.json
      fs.writeFile('./app.models/orders.json', JSON.stringify(orders, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to ./app.models/orders.json:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Return the deleted cart with a 200 status code
          res.status(204).json(deletedcart);
        }
      });
    } else {
      // If the cart is not found, return a 404 error response
      res.status(404).json({ error: 'cart not found' });
    }
});

module.exports = app; 