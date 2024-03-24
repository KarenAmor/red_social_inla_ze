import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { RegisterService } from './RegisterService';
import IUser from 'interfaces/IUser';

export class RegisterController {
	constructor(private readonly registerService: RegisterService) {}

	async create(request: Request, response: Response): Promise<Response> {
		console.log('request', request.body);
		const user: IUser = request.body;
		console.log('user', user);

		try {
			const createUser = await this.registerService.create(user);
			return response.status(StatusCodes.CREATED).json(createUser);
			// TODO: Type error
		} catch (err: any) {
			return response.status(500).json({ err: err.message });
		}
	}
}