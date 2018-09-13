const http = require('http');
const send = require('./send');

const server = http.createServer(handler);

server.listen(2000, '127.0.0.1', () => {
    console.log('Running');
});

let news = [
    {
        id: 1,
        title: 'Иностранные студенты на практике в БГТУ',
        date: '03.08.16'
    },
    {
        id: 2,
        title: 'День знаний',
        date: '01.09.16'
    }
];

function handler(req, res) {
    if (req.url === '/') {
        welcome(req, res);
    }
    else if (req.url === '/news') {
        newsList(req, res);
    }
    else if (req.url.startsWith('/news?id=')) {
        newsItem(req, res);
    }
    else if (req.url.startsWith('/news/create')) {
        newsCreate(req, res);
    }
    else if (req.url.startsWith('/news/update')) {
        newsUpdate(req, res);
    }
    else if (req.url.startsWith('/news/delete')) {
        newsDelete(req, res);
    }
    else if (req.url === '/site.css') {
        send.css(req, res);
    }
    else {
        error404(req, res);
    }
}

function welcome(req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end('Welcome to our <b>Node.js</b> app');
}

function newsList(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    news.forEach((item) => {
        res.write(`[${item.date}] ${item.title}<br/>`);
    });

    res.end();
}

function newsItem(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');

    const id = req.url.replace('/news?id=', '');
    const item = news.filter(function (item) {
        return item.id == id;
    })[0];

    res.write(`[${item.date}] ${item.title}`);

    res.end();
}

function parseBody(req, cb) {
    var body = [];
    const params = {};

    req.on('data', function(chunk) {
        body.push(chunk);
    }).on('end', function() {
        // был массивом стал строкой
        body = Buffer.concat(body).toString();

        body = body.split('\r\n');

        body = body.filter((item) => {
            return !item.startsWith('------')
                && item !== '';
        });

        for (let i = 0; i < body.length; i += 2) {
            const key = body[i]
                .replace('Content-Disposition: form-data; name="', '')
                .replace('"', '');

            params[key] = body[i + 1];
        }

        cb(null, params);
    });
}

function newsCreate(req, res) {
    parseBody(req, (err, params) => {
        const item = {
            id: news.length + 1,
            title: params.title,
            date: params.date
        };

        news.push(item);

        res.end('created');
    });
}

function newsUpdate(req, res) {
    parseBody(req, (err, params) => {
        const item = news.filter((item) => {
            return item.id == params.id;
        })[0];

        item.date = params.date;
        item.title = params.title;

        res.end('updated');
    });
}

function newsDelete(req, res) {
    parseBody(req, (err, params) => {
        news = news.filter((item) => {
            return item.id != params.id;
        });

        res.end('deleted');
    });
}

function error404(req, res) {
    res.statusCode = 404;
    res.end('404: Page Not Found');
}


