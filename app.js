const http = require('http');

const port = 3000;

const server = http.createServer((req, res) => {
    // Set the content type to plain text for all responses
    res.setHeader('Content-Type', 'text/plain');

    // Check if the request method is GET
    if (req.method === 'GET') {
        // Handle different routes based on the request URL
        if (req.url === '/') {
            res.writeHead(200);
            res.end('Welcome to the Home Page!\n');
        } else if (req.url === '/about') {
            res.writeHead(200);
            res.end('This is the About Page!\n');
        } else if (req.url === '/contact') {
            res.writeHead(200);
            res.end('Contact us at contact@example.com\n');
        } else {
            // Handle routes that are not found with a 404 response
            res.writeHead(404);
            res.end('Page not found\n');
        }
    } else {
        // Handle non-GET requests with a 405 (Method Not Allowed) response
        res.writeHead(405);
        res.end('Method not allowed\n');
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
