import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { UserService } from './UserService';
import IUser from 'interfaces/IUser';

export class UserController {
	constructor(private readonly userService: UserService) {}

	async getAll(request: Request, response: Response): Promise<Response> {
		try {
			const page: number = parseInt(request.query.page as string) || 1;
            const pageSize: number = parseInt(request.query.pageSize as string) || 10;

			const users = await this.userService.findAll(page, pageSize);

			const responseData = {
				Page: page,
				PageSize: pageSize,
				Users: users
			};

			return response.status(StatusCodes.OK).json(responseData);
		} catch (err: any) {
			return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
		}
	}

    async getById(request: Request, response: Response): Promise<Response> {
        const userId = request.params.id;

        try {
            const user = await this.userService.findById(userId);
            if (!user) {
                return response.status(StatusCodes.NOT_FOUND).json({ message: 'Cliente no encontrado.' });
            }
            return response.status(StatusCodes.OK).json(user);
        } catch (err: any) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
        }
    }

    async update(request: Request, response: Response): Promise<Response> {
		const userId = request.params.id;
		const userData: IUser = request.body;

		try {
			const updatedUser = await this.userService.update(userId, userData);
			return response.status(StatusCodes.OK).json(updatedUser);
		} catch (err: any) {
			return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
		}
	}
    async delete(request: Request, response: Response): Promise<Response> {
		const userId = request.params.id;

		try {
			await this.userService.delete(userId);
			return response.status(StatusCodes.OK).json({ message: 'Usuario eliminado satisfactoriamente.' });
		} catch (err: any) {
			return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
		}
	}
}