const express = require('express');
const app = express(); // Change app to express

app.use(express.json());

const fs = require('fs');
const cors = require('cors'); // Require the 'cors' middleware

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON in request bodies
app.use(express.json());

// Function to read shoppingCart from the JSON file
function readshoppingCartFromFile() {
  try {
    const data = fs.readFileSync('./app.models/shoppingCart.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading ./app.models/shoppingCart.json:', error);
    return [];
  }
}

let shoppingCart = readshoppingCartFromFile();

// GET all shoppingCart
app.get('/shoppingCart', (req, res) => {
  // Read shoppingCart from the JSON file
  shoppingCart = readshoppingCartFromFile();

  // Return the shoppingCart as a JSON response
  res.status(200).json(shoppingCart);
});

// GET a specific cart by ID
app.get('/shoppingCart/:id', (req, res) => {
  const cartId = parseInt(req.params.id, 10);

  // Read shoppingCart from the JSON file
  shoppingCart = readshoppingCartFromFile();

  // Find the cart with the specified ID
  const cart = shoppingCart.find((p) => p.id === cartId);

  if (cart) {
    // If the cart is found, return it as a JSON response
    res.status(200).json(cart);
  } else {
    // If the cart is not found, return a 404 error response
    res.status(404).json({ error: 'cart not found' });
  }
});

// POST - Create a new cart
app.post('/shoppingCart', (req, res) => {
  const newcart = req.body;

  // Read shoppingCart from the JSON file
  shoppingCart = readshoppingCartFromFile();

  // Calculate the next available cart ID
  const nextcartId = shoppingCart.length > 0 ? shoppingCart[shoppingCart.length - 1].id + 1 : 1;

  newcart.id = nextcartId;

  // Add the new cart to the shoppingCart array
  shoppingCart.push(newcart);

  // Save the updated shoppingCart array to ./app.models/shoppingCart.json
  fs.writeFile('./app.models/shoppingCart.json', JSON.stringify(shoppingCart, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to ./app.models/shoppingCart.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Return the created cart with a 201 status code
      res.status(201).json(newcart);
    }
  });
});


// PUT - Update an existing cart by ID
app.put('/shoppingCart/:id', (req, res) => {
    const cartId = parseInt(req.params.id, 10);
    const updatedcart = req.body;
  
    // Read shoppingCart from the JSON file
    shoppingCart = readshoppingCartFromFile();
  
    // Find the cart with the specified ID
    const existingcartIndex = shoppingCart.findIndex((p) => p.id === cartId);
  
    if (existingcartIndex !== -1) {
      // Update the cart details in the shoppingCart array
      shoppingCart[existingcartIndex] = { id: cartId, ...updatedcart };
  
      // Save the updated shoppingCart array to ./app.models/shoppingCart.json
      fs.writeFile('./app.models/shoppingCart.json', JSON.stringify(shoppingCart, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to ./app.models/shoppingCart.json:', err);
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
app.delete('/shoppingCart/:id', (req, res) => {
    const cartId = parseInt(req.params.id, 10);
  
    // Read shoppingCart from the JSON file
    shoppingCart = readshoppingCartFromFile();
  
    // Find the cart with the specified ID
    const deletedcartIndex = shoppingCart.findIndex((p) => p.id === cartId);
  
    if (deletedcartIndex !== -1) {
      // Remove the cart from the shoppingCart array
      const deletedcart = shoppingCart.splice(deletedcartIndex, 1)[0];
  
      // Save the updated shoppingCart array to ./app.models/shoppingCart.json
      fs.writeFile('./app.models/shoppingCart.json', JSON.stringify(shoppingCart, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to ./app.models/shoppingCart.json:', err);
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

// DELETE - Remove all items from the shopping cart
app.delete('/shoppingCart', (req, res) => {
  // Read shoppingCart from the JSON file
  shoppingCart = [];

  // Save the empty shoppingCart array to ./app.models/shoppingCart.json
  fs.writeFile('./app.models/shoppingCart.json', '[]', 'utf8', (err) => {
      if (err) {
          console.error('Error writing to ./app.models/shoppingCart.json:', err);
          res.status(500).json({ error: 'Internal Server Error' });
      } else {
          // Return a 204 status code indicating success
          res.status(204).json({ message: 'All items removed from the shopping cart' });
      }
  });
});


module.exports = app; 