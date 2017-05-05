const http = require('http');

const server = http.createServer((req, res) => {
    //write head with status code & response headers
    res.writeHead(200, { 'Content-Type': 'text/html'});
    res.write(req.url);
    res.end();
});

server.listen(8081);
