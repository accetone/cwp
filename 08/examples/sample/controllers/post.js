module.exports = (postService, cacheService, promiseHandler) => {
    const BaseController = require('./base');

    Object.setPrototypeOf(PostController.prototype, BaseController.prototype);

    function PostController(postService, promiseHandler) {
        BaseController.call(this, postService, promiseHandler);

        this.routes['/'] = [{ method: 'post', cb: readAll }];
        this.routes['/upvote'] = [{ method: 'post', cb: upvote }];
        this.routes['/downvote'] = [{ method: 'post', cb: downvote }];

        this.registerRoutes();

        return this.router;

        function readAll(req, res) {
            postService.readChunk(req.params)
                .then((posts) => {
                    cacheService.set(req, posts);
                    res.json(posts);
                })
                .catch((err) => res.error(err));
        }

        function upvote(req, res) {
            promiseHandler(res,
                postService.upvote(req.body.id)
            );
        }

        function downvote(req, res) {
            promiseHandler(res,
                postService.downvote(req.body.id)
            );
        }
    }

    return new PostController(postService, promiseHandler);
};