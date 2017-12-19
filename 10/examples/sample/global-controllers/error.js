module.exports = (error, req, res, next) => {
    // TODO: log erorr + 'res.locals.trace'

    res.error(error);
};