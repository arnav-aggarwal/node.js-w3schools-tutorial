const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {
  fs.readFile('demofile1.html', (err, data) => {
    const filename = '.' + url.parse(req.url).pathname;
    fs.readFile(filename, (err, data) => {
      if(err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end('404 Not Found');
      }

      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end();
    });
  });
});

server.listen(8081, () => console.log('Listening on 8081'));
