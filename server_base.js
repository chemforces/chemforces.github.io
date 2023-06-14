

var path = require('path');
var express = require('express');
var http = require('http');
var fs = require('fs');
var app = express();

var dir = path.join(__dirname, 'public');
app.use(express.static(dir));

app.get('/', function(req, res) {
    const folderPath = './public/database/';
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error(err);
        res.statusCode = 500;
        res.end('Internal Server Error');
        return;
      }
      const imageFiles = files.filter(file => {
        const fileExtension = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(fileExtension);
      });
      const randomIndex = Math.floor(Math.random() * imageFiles.length);
      const randomImage = imageFiles[randomIndex];
      res.setHeader('Content-Type', 'text/html');
      res.write('<!DOCTYPE html>');
      res.write('<html>');
      res.write('<head>');
      res.write('<title>Random Image</title>');
      res.write('</head>');
      res.write('<body>');
      res.write(`<img src="http://localhost:3000/database/${randomImage}" alt="Random Image" style="display: block;margin-left: auto;margin-right: auto;">`);
      res.write('</body>');
      res.write('</html>');

      res.end();
	});
});




app.listen(3000, function () {
    console.log('Listening on http://localhost:3000/');
});


