const CrudService = require('./crud');

class PostsService extends CrudService {
    async create(data) {
        let post = {
            title: data.title,
            content: data.content,
            date: data.date,
            draft: data.draft,
            userId: data.userId,
            rating: 0
        };

        return super.create(post);
    }

    async update(data) {
        let post = {
            title: data.title,
            content: data.content,
            date: data.date,
            draft: data.draft
        };

        return super.update(data.id, post);
    }

    async upvote(id) {
        const post = await this.repository.findById(id);

        if (!post) {
            throw this.errors.notFound;
        }

        return post.increment({ rating: 1 });
    }

    async downvote(id) {
        const post = await this.repository.findById(id);

        if (!post) {
            throw this.errors.notFound;
        }

        return post.increment({ rating: -1 });
    }

}

module.exports = PostsService;