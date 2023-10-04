const http = require('http');
const { parse } = require('querystring');
const fs = require('fs');

const PORT = 3000; // Use uppercase for constants

const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/register') { // Fixed the conditions here
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const data = JSON.parse(body);
                const { firstName, lastName, userName, email, password } = data;
                if (!firstName || !lastName || !userName || !email || !password) {
                    res.writeHead(400, { 'Content-type': 'application/json' }); // Changed status code to 400 for Bad Request
                    res.end(JSON.stringify({ status: false, message: 'All fields are required' }));
                } else {
                    fs.readFile('data.json', 'utf8', (error, fileData) => {
                        if (error) {
                            console.error('Error reading file: ', error);
                            res.writeHead(500, { 'Content-type': 'application/json' }); // Changed status code to 500 for Internal Server Error
                            res.end(JSON.stringify({ status: false, message: 'Internal Server Error' }));
                            return;
                        }
                        const users = JSON.parse(fileData).users || [];
                        const user = { firstName, lastName, userName, email, password };
                        users.push(user);
                        fs.writeFile('data.json', JSON.stringify({ users }), 'utf8', (error) => {
                            if (error) {
                                console.error('Error writing file: ', error);
                                res.writeHead(500, { 'Content-type': 'application/json' });
                                res.end(JSON.stringify({ status: false, message: 'Internal Server Error' }));
                                return;
                            } else {
                                res.writeHead(200, { 'Content-type': 'application/json' });
                                res.end(JSON.stringify({ status: true, message: 'User registered successfully' }));
                            }
                        });
                    });
                }
            } catch (error) {
                console.error('Error parsing JSON: ', error);
                res.writeHead(400, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ status: false, message: 'Invalid Format' }));
            }
        });
    } else if (req.method === 'GET' && req.url === '/getAllUsers') { // Fixed the conditions here
        fs.readFile('data.json', 'utf8', (error, data) => {
            if (error) {
                console.error('Error reading file: ', error);
                res.writeHead(500, { 'Content-type': 'application/json' });
                res.end(JSON.stringify({ status: false, message: 'Internal Server Error' }));
                return;
            }

            const users = JSON.parse(data).users;
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(users));
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
