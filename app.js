const http = require('http');
const { parse } = require('querystring');
const fs = require('fs');

const port = 3000;

// Sample registration data (in-memory database)

const registeredUsers = [
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    // Add more registered users here
];

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

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
    } else 
    if (req.method === 'POST') {
        if (req.url === '/login') {
            let body = '';

            // Read data and convert to body string
            req.on('data', chunk => {
                body += chunk.toString();
            });


            req.on('end', () => {
                // Convert body to postData object
                const postData = JSON.parse(body);

                // Check if the submitted credentials match a registered user
                const user = registeredUsers.find(
                    u => u.username === postData.username && u.password === postData.password
                );

                if (user) {
                    const responseJSON = {
                        message: 'Login successful',
                        user: user
                    };
                    res.writeHead(200);
                    res.end(JSON.stringify(responseJSON));
                } else {
                    const responseJSON = {
                        message: 'Login failed. Invalid credentials.',
                    };
                    res.writeHead(401);
                    res.end(JSON.stringify(responseJSON));
                }
            });
        } else {
            // Handle other POST routes
            const responseJSON = {
                message: 'Route not found for POST request'
            };
            res.writeHead(404);
            res.end(JSON.stringify(responseJSON));
        }
    } else {
        // Handle non-GET and non-POST requests with a 405 (Method Not Allowed) response
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
