const http = require('http');
const fs = require('fs');
const url = require('url');
const formidable = require('formidable');

function uploadFile(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    const { path: filePath, name: fileName } = files.filetoupload;
    fs.rename(filePath, `${__dirname}/uploads/${fileName}`, err => {
      if(err) throw err;
      res.write('File uploaded and moved!');
      res.end();
    });
  });
}

const server = http.createServer((req, res) => {
  if(req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello!');
    return;
  }

  if(req.url === '/fileupload') {
    uploadFile(req, res);
    return;
  } 
  
  const fileName = '.' + url.parse(req.url).pathname;
  
  fs.readFile('assets/' + fileName, (err, data) => {
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.end('404 not found');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
});

server.listen(8081, () => console.log('Listening on 8081'));

// https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
