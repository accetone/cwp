const CrudController = require('./crud');

class PostsController extends CrudController {
    constructor(postsService, cahceService) {
        super(postsService);

        this.cacheService = cahceService;

        this.readAll = this.readAll.bind(this);
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);

        this.routes['/'] = [{ method: 'get', cb: this.readAll }];
        this.routes['/upvote'] = [{ method: 'post', cb: this.upvote }];
        this.routes['/downvote'] = [{ method: 'post', cb: this.downvote }];

        this.registerRoutes();
    }

    async readAll(req, res) {
        const posts = await this.service.readChunk(req.params);

        this.cacheService.set(req, posts);

        res.json(posts);
    }

    async upvote(req, res) {
        await this.service.upvote(req.body.id);

        res.json({ success: true });
    }

    async downvote(req, res) {
        await this.service.downvote(req.body.id);

        res.json({ success: true });
    }
}

module.exports = (postsService, cacheService) => {
    const controller = new PostsController(
        postsService,
        cacheService
    );

    return controller.router;
};
