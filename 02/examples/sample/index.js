const http = require('http');
const fs = require('fs');

const server = http.createServer(handler);

server.listen(2000, '127.0.0.1', () => {
    console.log('Running');
});

let data = [
    {
        id: 1,
        title: 'A'
    },
    {
        id: 2,
        title: 'B'
    }
];

function handler(req, res) {
    if (req.url === '/') {
        fs.readFile('index.html', 'utf-8', (err, data) => {
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.end(data);
        });
    }
    else if (req.url === '/data') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(data));
    }
}