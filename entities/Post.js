export default class Post {
    static id = 1;

    constructor(title, body) {
        this.title = title;
        this.body = body;
        this.id = Post.id;
        Post.id += 1;
    }
};
