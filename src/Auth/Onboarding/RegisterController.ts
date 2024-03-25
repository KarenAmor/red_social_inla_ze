import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { RegisterService } from './RegisterService';
import IUser from 'interfaces/IUser';
import sendMail from '/Users/kmorenom/Developer/red_social_inla_ze/src/Util/CorreoOnbording/SendEmail'

export class RegisterController {
	constructor(private readonly registerService: RegisterService) {}

	async create(request: Request, response: Response): Promise<Response> {
		console.log('request', request.body);
		const user: IUser = request.body;
		const templatePath = '../util/emailTemplate.html';
		console.log('user', user);
		await sendMail(templatePath, user.fullName, user.email)

		try {
			const createUser = await this.registerService.create(user);
			return response.status(StatusCodes.CREATED).json(createUser);
			// TODO: Type error
		} catch (err: any) {
			return response.status(500).json({ err: err.message });
		}
	}
}