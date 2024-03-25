import { Router, Request, Response } from 'express';

import { RegisterController } from './Onboarding/RegisterController';
import { RegisterService } from './Onboarding/RegisterService';
import { LoginController } from './Login/LoginController';
import { LoginService } from './Login/LoginService';
import UserSchema from '../schemas/usersSchema';
const router: Router = Router();

router.post('/register', async (req: Request, res: Response) => {
	const service = new RegisterService(UserSchema);
	const controller = new RegisterController(service);
	return await controller.create(req, res);
});

router.post('/login', async (req: Request, res: Response) => {
	const service = new LoginService(UserSchema);
	const controller = new LoginController(service);
	return await controller.login(req, res);
});

router.post('/logout', async (req: Request, res: Response) => {
	const service = new LoginService(UserSchema);
	const controller = new LoginController(service);
	return await controller.logout(req, res);
});

router.post('/refreshToken', async (req: Request, res: Response) => {
	const service = new LoginService(UserSchema);
	const controller = new LoginController(service);
	return await controller.refreshToken(req, res);
});
export default router;