// Import Necessary Modules
const http = require('http');
const url = require('url');
const querystring = require('querystring');
const fs = require('fs');

// Create an HTTP Server at port 3000
const port = 3000;

const server = http.createServer((req, res) => {
    // Parse the URL to get the pathname
    const { pathname } = url.parse(req.url);
    if (req.method === 'GET') {
        // Parse the URL to get the pathname and product ID
        const { pathname } = url.parse(req.url);
        const match = pathname.match(/^\/products\/(\d+)$/);
    
        if (match) {
            // Handle GET requests to /products/{id} endpoint
            const productId = parseInt(match[1], 10);
    
            // Read the existing products from products.json (if the file exists)
            fs.readFile('products.json', 'utf8', (err, data) => {
                if (err) {
                    console.error('Error reading products.json:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                } else {
                    let products = [];
                    try {
                        products = JSON.parse(data);
                    } catch (error) {
                        console.error('Error parsing JSON:', error);
                    }
    
                    // Find the product with the matching ID
                    const product = products.find((p) => p.id === productId);
    
                    if (product) {
                        // Return the product details with a 200 status code
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify(product));
                    } else {
                        // Return a 404 status code if the product is not found
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Product not found' }));
                    }
                }
            });
        }
    } else
    if (req.method === 'GET' && pathname === '/products') {
        // Handle GET requests to /products endpoint
    
        // Read the existing products from products.json (if the file exists)
        fs.readFile('products.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading products.json:', err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal Server Error' }));
            } else {
                let products = [];
                try {
                    products = JSON.parse(data);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
    
                // Return the list of all products with a 200 status code
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(products));
            }
        });
    } else
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
