module.exports = (postRepository, errors) => {
    const BaseService = require('./base');

    Object.setPrototypeOf(PostService.prototype, BaseService.prototype);

    function PostService(postRepository, errors) {
        BaseService.call(this, postRepository, errors);

        let self = this;

        self.create = create;
        self.update = update;
        self.upvote = upvote;
        self.downvote = downvote;

        function create(data) {
            return new Promise((resolve, reject) => {
                let post = {
                    title: data.title,
                    content: data.content,
                    date: data.date,
                    draft: data.draft,
                    userId: data.userId,
                    rating: 0
                };

                self.baseCreate(post)
                    .then(resolve).catch(reject);
            });
        }

        function update(data) {
            return new Promise((resolve, reject) => {
                let post = {
                    title: data.title,
                    content: data.content,
                    date: data.date,
                    draft: data.draft
                };

                self.baseUpdate(data.id, post)
                    .then(resolve).catch(reject);
            });
        }

        function upvote(id) {
            return new Promise((resolve, reject) => {
                postRepository.findById(id)
                    .then((post) => {
                        return post.increment({ rating: 1 })
                    })
                    .then(() => resolve({ success: true }))
                    .catch(reject);
            });
        }

        function downvote(id) {
            return new Promise((resolve, reject) => {
                postRepository.findById(id)
                    .then((post) => {
                        return post.decrement({ rating: 1 })
                    })
                    .then(() => resolve({ success: true }))
                    .catch(reject);
            });
        }
    }

    return new PostService(postRepository, errors);
};