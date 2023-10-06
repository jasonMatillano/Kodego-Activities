// Import Necessary Modules
const http = require('http');
const url = require('url');
const fs = require('fs');

// Create an HTTP Server at port 3000
const port = 3000;

const server = http.createServer((req, res) => {

    // Parse the URL to get the pathname
    const { pathname } = url.parse(req.url);

    if (req.method === 'DELETE') {
        // Handle DELETE requests to /products/{id} endpoint
        const match = pathname.match(/^\/products\/(\d+)$/);
        if (match) {
            const productId = parseInt(match[1], 10);

            // Rest of your DELETE request handling code...
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid URL' }));
        }
    } else if (req.method === 'GET') {
        // Handle GET requests
        const match = pathname.match(/^\/products\/(\d+)$/);
        if (match) {
            const productId = parseInt(match[1], 10);

            // Rest of your GET request handling code...
        } else if (pathname === '/products') {
            // Rest of your GET all products request handling code...
        }
    } else if (req.method === 'PUT') {
        // Handle PUT requests
        const match = pathname.match(/^\/products\/(\d+)$/);
        if (match) {
            const productId = parseInt(match[1], 10);

            // Rest of your PUT request handling code...
        }
    } else if (req.method === 'POST' && pathname === '/products') {
        // Handle POST requests to /products endpoint

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

                // Automatically assign an ID in ascending order
                const nextProductId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

                // Parse incoming data (product details) from the request body
                let requestBody = '';
                req.on('data', (chunk) => {
                    requestBody += chunk.toString();
                });

                req.on('end', () => {
                    const newProduct = JSON.parse(requestBody);

                    // Assign the next available ID to the new product
                    newProduct.id = nextProductId;

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
            }
        });
    } else {
        // Handle other routes and methods here
        // ...
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
