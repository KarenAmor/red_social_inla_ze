import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { UserService } from './UserService';
import IUser from 'interfaces/IUser';

export class UserController {
	constructor(private readonly userService: UserService) {}

	async create(request: Request, response: Response): Promise<Response> {
		console.log('request', request.body);
		const user: IUser = request.body;
		console.log('user', user);

		try {
			const createUser = await this.userService.create(user);
			return response.status(StatusCodes.CREATED).json(createUser);
			// TODO: Type error
		} catch (err: any) {
			return response.status(500).json({ err: err.message });
		}
	}
}
