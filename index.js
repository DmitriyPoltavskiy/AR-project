const fs = require('fs');
const https = require('https');

const key = fs.readFileSync('ssl-certificates/privatekey.pem', 'utf8');
const cert = fs.readFileSync('ssl-certificates/certificate.pem', 'utf8');
const credentials = { key, cert };

const express = require('express');
const app = express();

const httpsServer = https.createServer(credentials, app);

app.set('views', __dirname + '/');
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/'));

app.get('/:id', (req, res) => {
	let config = getConfig();

	data = config.find(element => element.url === req.params.id)
	if(!data) data = config[0]

	console.log(`\nGet page with id: ${req.params.id}, with config: ${prettyJsonStringify(data)}\n`);
	res.render('index', { data });
});

app.get('/', (req, res) => {
	let config = getConfig();

	data = config.find(element => element.url === '/')
	if(!data) data = config[0]

	console.log(`\nGet page with id: ${req.params.id}, with config: ${prettyJsonStringify(data)}\n`);
	res.render('index', { data });
});


httpsServer.listen(8000, () => {
	console.log('Server is up running: https://localhost:8000')
});

function getConfig() {
	let config = fs.readFileSync('config.json', 'utf8');
	if(!config) throw new Error('Config is empty');
	return JSON.parse(config);
}

function prettyJsonStringify(json) {
	if(typeof json != 'string') {
		json = JSON.stringify(json, undefined, 2);
	}
	json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
	return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
		let cls = 'number';
		if(/^"/.test(match)) {
			if(/:$/.test(match)) {
				cls = 'key';
			} else {
				cls = 'string';
			}
		} else if(/true|false/.test(match)) {
			cls = 'boolean';
		} else if(/null/.test(match)) {
			cls = 'null';
		}
		return match;
	});
}