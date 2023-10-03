const http = require('http');
const { parse } = require('querystring');
const fs = require('fs'); // Import the fs module

const port = 3000;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

    // Check if the request method is GET
    if (req.method === 'GET') {
        // Handle different routes based on the request URL
        if (req.url === '/') {
            const responseJSON = {
                message: 'Welcome to the Home Page!'
            };
            res.writeHead(200);
            res.end(JSON.stringify(responseJSON));
        } else if (req.url === '/about') {
            const responseJSON = {
                message: 'This is the About Page!'
            };
            res.writeHead(200);
            res.end(JSON.stringify(responseJSON));
        } else if (req.url === '/contact') {
            const responseJSON = {
                message: 'Contact us at contact@example.com'
            };
            res.writeHead(200);
            res.end(JSON.stringify(responseJSON));
        } else {
            // Handle routes that are not found with a 404 response
            const responseJSON = {
                message: 'Page not found'
            };
            res.writeHead(404);
            res.end(JSON.stringify(responseJSON));
        }
    } else if (req.method === 'POST') {
        if (req.url === '/submit') {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString();
            });

            req.on('end', () => {
                const postData = parse(body);

                // Save the POST data to data.json file
                fs.appendFile('data.json', JSON.stringify(postData) + '\n', err => {
                    if (err) {
                        console.error('Error writing to data.json:', err);
                        const responseJSON = {
                            message: 'Error saving data'
                        };
                        res.writeHead(500);
                        res.end(JSON.stringify(responseJSON));
                    } else {
                        const responseJSON = {
                            message: 'Received POST data and saved to data.json',
                            data: postData
                        };
                        res.writeHead(200);
                        res.end(JSON.stringify(responseJSON));
                    }
                });
            });
        } else {
            const responseJSON = {
                message: 'Route not found for POST request'
            };
            res.writeHead(404);
            res.end(JSON.stringify(responseJSON));
        }
    } else {
        const responseJSON = {
            message: 'Method not allowed'
        };
        res.writeHead(405);
        res.end(JSON.stringify(responseJSON));
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});