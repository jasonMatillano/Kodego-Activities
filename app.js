const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    // Set the content type to JSON for all responses
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
    } else {
        // Handle non-GET requests with a 405 (Method Not Allowed) response
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
