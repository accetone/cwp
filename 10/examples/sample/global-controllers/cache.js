module.exports = (cacheService) => async (req, res, next) => {
    const cached = await cacheService.get(req);

    if (cached) {
        res.json(cached);
        return;
    }

    next();
};