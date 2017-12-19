const moment = require('moment');

module.exports = (req, res, next) => {
    res.locals.trace = {
        date: Date.now(),
        url: req.path,
        method: req.method,
        query: req.query,
        body: req.body,
        cookies: req.cookies
    };

    console.log(moment().format('HH:mm:ss'));
    console.log(`${req.method} ${req.path}`);
    console.log(JSON.stringify(req.query));
    console.log(JSON.stringify(req.body));
    console.log();

    next();
};