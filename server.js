const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
    // Ignore requests for favicon.ico
    if (req.url === '/favicon.ico') {
        res.writeHead(204); // No content response
        res.end();
        return;
    }

    // Set the content type based on the file extension
    const ext = path.extname(req.url);
    let contentType = 'text/html';

    if (ext === '.css') {
        contentType = 'text/css';
    } else if (ext === '.js') {
        contentType = 'text/javascript';
    }

    res.setHeader('Content-Type', contentType);

    // Handle the default route by serving index.html
    if (req.url === '/' || req.url === '/index.html') {
        const filePath = path.join(__dirname, 'index.html');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(500);
                res.end('Internal Server Error');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    } else {
        // Serve other files based on the requested URL
        const filePath = path.join(__dirname, req.url);
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                res.writeHead(404);
                res.end('Not Found');
            } else {
                res.writeHead(200);
                res.end(data);
            }
        });
    }
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/`);
});
