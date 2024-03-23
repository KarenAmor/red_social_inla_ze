import { Router, Request, Response } from 'express';

import { UserController } from './Onboarding/UserController';
import { UserService } from './Onboarding/UserService';
import UserSchema from '../schemas/usersSchema';
const router: Router = Router();

router.post('/create', async (req: Request, res: Response) => {
	const service = new UserService(UserSchema);
	const controller = new UserController(service);
	return await controller.create(req, res);
});

export default router;
