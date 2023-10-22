const express = require('express');
const fs = require('fs');

const app = express();
const port = 3030;

// Middleware to parse JSON in request bodies
app.use(express.json());

// Define a list of products (simulating a database)
let products = [];

// GET all products
app.get('/products', (req, res) => {
  res.json(products);
});

// GET a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const product = products.find((p) => p.id === productId);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// POST - Create a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;
  const nextProductId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  newProduct.id = nextProductId;
  products.push(newProduct);

  res.status(201).json(newProduct);
});

// PUT - Update a product by ID
app.put('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const updatedProduct = req.body;

  const existingProductIndex = products.findIndex((p) => p.id === productId);

  if (existingProductIndex !== -1) {
    products[existingProductIndex] = updatedProduct;
    res.json(updatedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});


// DELETE - Delete a product by ID
app.delete('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);
  const deletedProductIndex = products.findIndex((p) => p.id === productId);

  if (deletedProductIndex !== -1) {
    const deletedProduct = products.splice(deletedProductIndex, 1)[0];
    res.json(deletedProduct);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
