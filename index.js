
var fs = require('fs');
var path = require("path");
var https = require('https');

var privateKey  = fs.readFileSync('fake-keys/privatekey.pem', 'utf8');
var certificate = fs.readFileSync('fake-keys/certificate.pem', 'utf8');
var credentials = { key: privateKey, cert: certificate };

var express = require('express');
var app = express();

var httpsServer = https.createServer(credentials, app);

app.get('/', function(req,res) {
    res.sendFile(path.join(__dirname +'/index.html'));
});

app.use(express.static(__dirname + '/'));

httpsServer.listen(8000, () => {
    console.log('Example app listening on port https://localhost:8000')
});