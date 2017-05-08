const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('demofile1.html', (err, data) => {
        //write head with status code & response headers
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.write(data);
        res.end();
    });
});

fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
  if (err) throw err;
  console.log('Saved!');
});

fs.open('mynewfile2.txt', 'w', function (err, file) {
  if (err) throw err;
  console.log('Saved!');
});

fs.unlink('mynewfile2.txt', function (err) {
  if (err) throw err;
  console.log('File deleted!');
});

server.listen(8081);
