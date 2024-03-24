import { Router, Request, Response } from 'express';

import { UserController } from './UserControl/UserController';
import { UserService } from './UserControl/UserService';
import UserSchema from '../schemas/usersSchema';
const router: Router = Router();


router.get('/users', async (req: Request, res: Response) => {
	const service = new UserService(UserSchema);
	const controller = new UserController(service);
	return await controller.getAll(req, res);
});

router.get('/users/:id', async (req: Request, res: Response) => {
	const service = new UserService(UserSchema);
	const controller = new UserController(service);
	return await controller.getById(req, res);
});

router.put('/users/:id', async (req: Request, res: Response) => {
	const service = new UserService(UserSchema);
	const controller = new UserController(service);
	return await controller.update(req, res);
});

router.delete('/users/:id', async (req: Request, res: Response) => {
	const service = new UserService(UserSchema);
	const controller = new UserController(service);
	return await controller.delete(req, res);
});

export default router;