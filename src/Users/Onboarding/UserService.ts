import { Document } from 'mongoose';
import UserSchema from '../../schemas/usersSchema';
import IUser from '../../interfaces/IUser';

export class UserService {
	constructor(private readonly userRepository: typeof UserSchema) {}

	async create(user: IUser): Promise<Document> {
		const userObj: IUser = await UserSchema.create(user);
		return userObj;
	}

	/*
	async getUsers(): Promise<Users[]> {
		return await this.userRepository.find();
	}
    */
}
