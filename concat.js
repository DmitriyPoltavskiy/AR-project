const fs = require('fs');
const mergeImg = require('merge-img');

concatImages(getConfig());

async function concatImages(config) {
	let i = 0;
	for (const item of config) {
		i++;
		await mergeImg([item.qrPath, item.markerImagePath])
		.then((img) => img.write(`out${i}.png`, () => console.log('done')));
	}
}

function getConfig() {
	let config = fs.readFileSync('config.json', 'utf8');
	if(!config) throw new Error('Config is empty');
	return JSON.parse(config);
}