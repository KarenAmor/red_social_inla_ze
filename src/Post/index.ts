import { Router, Request, Response } from 'express';
import { PostController } from './Post/PostController';
import { PostService } from './Post/PostService';
import PostsSchema from '../schemas/postsSchema';
import authenticateUser from '../Middleware/AuthMiddleware'; // Importa la función authenticateUser

const router: Router = Router();

// Rutas sin autenticación
router.get('/post', async (req: Request, res: Response) => {
    const service = new PostService(PostsSchema);
    const controller = new PostController(service);
    return await controller.getAll(req, res);
});

router.post('/post', async (req: Request, res: Response) => {
    const service = new PostService(PostsSchema);
    const controller = new PostController(service);
    return await controller.create(req, res);
});

router.get('/post/:id', async (req: Request, res: Response) => {
    const service = new PostService(PostsSchema);
    const controller = new PostController(service);
    return await controller.getById(req, res);
});

router.get('/post/:userId', async (req: Request, res: Response) => {
    const service = new PostService(PostsSchema);
    const controller = new PostController(service);
    return await controller.getByUserId(req, res);
});

// Rutas con autenticación
router.put('/post/:id', authenticateUser, async (req: Request, res: Response) => {
    const service = new PostService(PostsSchema);
    const controller = new PostController(service);
    return await controller.update(req, res);
});

router.delete('/post/:id', authenticateUser, async (req: Request, res: Response) => {
    const service = new PostService(PostsSchema);
    const controller = new PostController(service);
    return await controller.delete(req, res);
});

router.post('/posts/:id/like',  async (req: Request, res: Response) => {
    const service = new PostService(PostsSchema);
    const controller = new PostController(service);
    return await controller.likePost(req, res);
});

export default router;