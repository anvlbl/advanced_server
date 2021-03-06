// @ts-check

import Express from 'express';
import bodyParser from 'body-parser';

import Post from './entities/Post.js';

export default () => {
  // @ts-ignore
  const app = new Express();
  app.set('view engine', 'pug');
  //app.use('/assets', Express.static(process.env.NODE_PATH.split(':')[0]));
  app.use(bodyParser.urlencoded({ extended: false }));

  const posts = [
    new Post('hello', 'how are you?'),
    new Post('nodejs', 'story about nodejs'),
  ];

  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/posts', (req, res) => {
    res.render('posts/index', { posts });
  })
  
  app.get('/posts/new', (req, res) => {
    res.render('posts/new', { form: {}, errors: {} });
  });
  
  app.get('/posts/:id', (req, res) => {
    const post = posts.find((p) => p.id.toString() === req.params.id);
    res.render('posts/show', { post });
  });
 
 
  app.post('/posts', (req, res) => {
    const { title, body } = req.body;
 
    const errors = {};
    if (!title) {
      errors.title = "Can't be blank";
    }
 
    if (!body) {
      errors.body = "Can't be blank";
    }
 
    if (Object.keys(errors).length === 0) {
      const post = new Post(title, body);
      posts.push(post);
      res.redirect(`/posts/${post.id}`);
      return;
    }
 
    res.status(422);
    res.render('posts/new', { form: req.body, errors });
  });

  return app;
};
