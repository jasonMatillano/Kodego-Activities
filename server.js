// Import Necessary Modules
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

// Create an HTTP Server
const port = 3000;

const server = http.createServer((req, res) => {
    // Parse the URL to get the pathname
    const { pathname } = url.parse(req.url);
  
    if (req.method === 'POST' && pathname === '/products') {
      // Handle POST requests to /products endpoint
      
      // Create an empty array to hold products (if not already defined)
      let products = [];
  
      // Read the existing products from products.json (if the file exists)
      fs.readFile('products.json', 'utf8', (err, data) => {
        if (!err) {
          try {
            products = JSON.parse(data);
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
  
        // Parse incoming data (product details) from the request body
        let requestBody = '';
        req.on('data', (chunk) => {
          requestBody += chunk.toString();
        });
  
        req.on('end', () => {
          const newProduct = JSON.parse(requestBody);
  
          // Add the new product to the products array
          products.push(newProduct);
  
          // Save the updated products array to products.json
          fs.writeFile('products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
            if (err) {
              console.error('Error writing to products.json:', err);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
              // Return the created product with a 201 status code
              res.writeHead(201, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(newProduct));
            }
          });
        });
      });
    } else {
      // Handle other routes and methods here
      // ...
    }
  });

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
