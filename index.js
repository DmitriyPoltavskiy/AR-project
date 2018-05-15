// var express = require('express');
// var app = express();
// var path = require("path");

// app.get('/', function (req, res) {
// //   res.send('Hello World!');
//   res.sendFile(path.join(__dirname+'/index.html'));
// });

// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });

// var express = require('express');
// var fs = require('fs');
// var path = require("path");

// var privateKey = fs.readFileSync('sslcert/server.key');
// var certificate = fs.readFileSync('sslcert/server.crt');

// var credentials = {key: privateKey, cert: certificate};

// var app = express.createServer(credentials);


// app.listen(8000);

var fs = require('fs');
// var http = require('http');
var path = require("path");
var https = require('https');
var privateKey  = fs.readFileSync('fake-keys/privatekey.pem', 'utf8');
var certificate = fs.readFileSync('fake-keys/certificate.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// your express configuration here

// var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

// res.download()
app.get('/', function(req,res) {
    // res.send('hello');
    res.sendFile(path.join(__dirname +'/index.html'));
});

app.get('/video.mp4', function(req,res) {
    // res.send('hello');
    res.sendFile(path.join(__dirname +'/video.mp4'));
});

app.get('/pattern-marker.patt', function(req,res) {
    // res.send('hello');
    res.sendFile(path.join(__dirname +'/pattern-marker.patt'));
});

// httpServer.listen(8080);
httpsServer.listen(8000, () => {
    console.log('Example app listening on port https://localhost:8000')
});