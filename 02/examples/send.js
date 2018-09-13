const fs = require('fs');

function sendCss(req, res) {
    fs.readFile('site.css', 'utf-8', (err, data) => {
        res.setHeader('Content-Type', 'text/css');
        res.end(data);
    });
}

module.exports = {
    css: sendCss
};