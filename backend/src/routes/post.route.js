import { Router } from 'express' ;
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/post.controller.js';

const postRouter = Router();

postRouter.route('/').post(createPost);
postRouter.route('/').get(getPosts);
postRouter.route('/:id').get(getPostById);
postRouter.route('/:id').put(updatePost);
postRouter.route('/:id').delete(deletePost);

export default postRouter;