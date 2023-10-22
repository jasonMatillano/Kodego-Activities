// Import Necessary Modules
const http = require('http');
const url = require('url');
const fs = require('fs');

// Create an HTTP Server at port 3000
const port = 3030;

const server = http.createServer((req, res) => {
    // Parse the URL to get the pathname
    const { pathname } = url.parse(req.url);

    if (req.method === 'GET') {
        if (pathname === '/products') {
            // Handle GET requests to /products endpoint
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
        } else {
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
            } else {
                // Handle other GET routes here
                // ...
            }
        }
    } else if (req.method === 'POST' && pathname === '/products') {
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
    } else if (req.method === 'PUT') {
        // Parse the URL to get the pathname and product ID
        const { pathname } = url.parse(req.url);
        const match = pathname.match(/^\/products\/(\d+)$/);
    
        if (match) {
            // Handle PUT requests to /products/{id} endpoint
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
                    const existingProductIndex = products.findIndex((p) => p.id === productId);
    
                    if (existingProductIndex !== -1) {
                        // Parse incoming data (updated product details) from the request body
                        let requestBody = '';
                        req.on('data', (chunk) => {
                            requestBody += chunk.toString();
                        });
    
                        req.on('end', () => {
                            const updatedProduct = JSON.parse(requestBody);
    
                            // Update the product details in the products array
                            products[existingProductIndex] = updatedProduct;
    
                            // Save the updated products array to products.json
                            fs.writeFile('products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
                                if (err) {
                                    console.error('Error writing to products.json:', err);
                                    res.writeHead(500, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify({ error: 'Internal Server Error' }));
                                } else {
                                    // Return the updated product with a 200 status code
                                    res.writeHead(200, { 'Content-Type': 'application/json' });
                                    res.end(JSON.stringify(updatedProduct));
                                }
                            });
                        });
                    } else {
                        // Return a 404 status code if the product is not found
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Product not found' }));
                    }
                }
            });
        }
    } else if (req.method === 'DELETE') {
        // Parse the URL to get the pathname and product ID
        const { pathname } = url.parse(req.url);
        const match = pathname.match(/^\/products\/(\d+)$/);
    
        if (match) {
            // Handle DELETE requests to /products/{id} endpoint
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
                    const deletedProductIndex = products.findIndex((p) => p.id === productId);
    
                    if (deletedProductIndex !== -1) {
                        // Remove the product from the products array
                        const deletedProduct = products.splice(deletedProductIndex, 1)[0];
    
                        // Save the updated products array to products.json
                        fs.writeFile('products.json', JSON.stringify(products, null, 2), 'utf8', (err) => {
                            if (err) {
                                console.error('Error writing to products.json:', err);
                                res.writeHead(500, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify({ error: 'Internal Server Error' }));
                            } else {
                                // Return the deleted product with a 200 status code
                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                res.end(JSON.stringify(deletedProduct));
                            }
                        });
                    } else {
                        // Return a 404 status code if the product is not found
                        res.writeHead(404, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({ error: 'Product not found' }));
                    }
                }
            });
        }
    }        
    else {
        // Handle other routes and methods here
        // ...
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});

// Code Functionality:
// 1. GET: You can retrieve a list of all products at /products and retrieve a specific product by its ID at /products/{id}.
// 2. POST: You can create a new product by sending a POST request to /products.
// 3. PUT: You can update an existing product by sending a PUT request to /products/{id}.
// 4. DELETE: You can delete an existing product by sending a DELETE request to /products/{id}.