const http = require('http');
const host = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/profile' && req.method === 'GET') {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json'); // Use 'application/json' for JSON response
        const data = {
            name: 'Jason',
            age: 30,
            address: 'Bacolod'
        };

        res.end(JSON.stringify(data));
    } else {
        res.statusCode = 400
        res.end(JSON.stringify({
            status: res.statusCode, 
            message: 'Bad Request'
        }));
    }

    if (req.url === '/products' && req.method === 'POST') {
        let body = '';
        

        response.statusCode = 200;
        const data = JSON.stringify({body: body});

    }
});

server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});
