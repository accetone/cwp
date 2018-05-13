const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('public'));

app.get('/api/users', (req, res) => {
	res.json([{id:1}, {id:2}]);
});

app.get('/*', (req, res) => {
	res.sendFile(
		path.join(__dirname, 'public/index.html')
	);
});

app.listen(4000, function () {
  console.log('Running');
});