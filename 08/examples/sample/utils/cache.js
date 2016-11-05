module.exports = (cacheService) => {
    return (req, res, next) => {
        let data = cacheService.get(req);

        if (data) res.json(data);
        else next();
    }
};