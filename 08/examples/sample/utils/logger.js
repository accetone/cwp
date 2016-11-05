module.exports = (req, res, next) => {
    res.locals.trace = {
        date: Date.now(),
        url: req.url,
        body: req.body,
        cookies: req.cookies
    };

    console.log(res.locals.trace.date);
    console.log(res.locals.trace.url);
    console.log(res.locals.trace.body);
    console.log();

    next();
};