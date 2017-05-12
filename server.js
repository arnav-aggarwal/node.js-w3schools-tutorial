const http = require('http');
const fs = require('fs');
const url = require('url');
const formidable = require('formidable');

const server = http.createServer((req, res) => {
  if(req.url === '/fileupload') {
    const form = new formidable.IncomingForm();
    form.parse(req, (err, fields, files) => {
      const { path: filePath, name: fileName } = files.filetoupload;
      fs.rename(filePath, `${__dirname}/${fileName}`, err => {
        if(err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else if(req.url === '/') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  } else {
    const file = '.' + url.parse(req.url).pathname;
    fs.readFile('assets/' + file, (err, data) => {
      if(err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end('404 not found');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});

server.listen(8081, () => console.log('Listening on 8081'));

// https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
