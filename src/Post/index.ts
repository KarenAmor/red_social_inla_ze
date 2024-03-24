import { Router, Request, Response } from 'express';

import { PostController } from './Post/PostController';
import { PostService } from './Post/PostService';
import PostsSchema from '../schemas/postsSchema';
const router: Router = Router();


router.get('/post', async (req: Request, res: Response) => {
	const service = new PostService(PostsSchema);
	const controller = new PostController(service);
	return await controller.getAll(req, res);
});

router.post('/post', async (req: Request, res: Response) => {
	const service = new PostService(PostsSchema );
	const controller = new PostController(service);
	return await controller.create(req, res);
});

router.get('/post/:id', async (req: Request, res: Response) => {
	const service = new PostService(PostsSchema);
	const controller = new PostController(service);
	return await controller.getById(req, res);
});

router.put('/post/:id', async (req: Request, res: Response) => {
	const service = new PostService(PostsSchema);
	const controller = new PostController(service);
	return await controller.update(req, res);
});

router.delete('/post/:id', async (req: Request, res: Response) => {
	const service = new PostService(PostsSchema);
	const controller = new PostController(service);
	return await controller.delete(req, res);
});

export default router;