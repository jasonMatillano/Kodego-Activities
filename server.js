const express = require('express');
const fs = require('fs');

const app = express();
const port = 3030;

// Middleware to parse JSON in request bodies
app.use(express.json());

// Function to read products from the JSON file
function readProductsFromFile() {
  try {
    const data = fs.readFileSync('products.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products.json:', error);
    return [];
  }
}

let products = readProductsFromFile();

// GET all products
app.get('/products', (req, res) => {
  // Read products from the JSON file
  products = readProductsFromFile();

  // Return the products as a JSON response
  res.json(products);
});

// GET a specific product by ID
app.get('/products/:id', (req, res) => {
  const productId = parseInt(req.params.id, 10);

  // Read products from the JSON file
  products = readProductsFromFile();

  // Find the product with the specified ID
  const product = products.find((p) => p.id === productId);

  if (product) {
    // If the product is found, return it as a JSON response
    res.json(product);
  } else {
    // If the product is not found, return a 404 error response
    res.status(404).json({ error: 'Product not found' });
  }
});

// POST - Create a new product
app.post('/products', (req, res) => {
  const newProduct = req.body;

  // Read products from the JSON file
  products = readProductsFromFile();

  // Calculate the next available product ID
  const nextProductId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

  newProduct.id = nextProductId;

  // Add the new product to the products array
  products.push(newProduct);

  // Save the updated products array to products.json
  fs.writeFile('products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
    if (err) {
      console.error('Error writing to products.json:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // Return the created product with a 201 status code
      res.status(201).json(newProduct);
    }
  });
});


// PUT - Update an existing product by ID
app.put('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const updatedProduct = req.body;
  
    // Read products from the JSON file
    products = readProductsFromFile();
  
    // Find the product with the specified ID
    const existingProductIndex = products.findIndex((p) => p.id === productId);
  
    if (existingProductIndex !== -1) {
      // Update the product details in the products array
      products[existingProductIndex] = { id: productId, ...updatedProduct };
  
      // Save the updated products array to products.json
      fs.writeFile('products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to products.json:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Return the updated product with a 200 status code
          res.status(200).json({ id: productId, ...updatedProduct });
        }
      });
    } else {
      // If the product is not found, return a 404 error response
      res.status(404).json({ error: 'Product not found' });
    }
  });


// DELETE - Remove an existing product by ID
app.delete('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id, 10);
  
    // Read products from the JSON file
    products = readProductsFromFile();
  
    // Find the product with the specified ID
    const deletedProductIndex = products.findIndex((p) => p.id === productId);
  
    if (deletedProductIndex !== -1) {
      // Remove the product from the products array
      const deletedProduct = products.splice(deletedProductIndex, 1)[0];
  
      // Save the updated products array to products.json
      fs.writeFile('products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to products.json:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          // Return the deleted product with a 200 status code
          res.status(200).json(deletedProduct);
        }
      });
    } else {
      // If the product is not found, return a 404 error response
      res.status(404).json({ error: 'Product not found' });
    }
  });


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
