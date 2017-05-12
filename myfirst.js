const http = require('http');
const fs = require('fs');
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
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
});

server.listen(8081, () => console.log('Listening on 8081'));

// https://www.w3schools.com/nodejs/nodejs_uploadfiles.asp
