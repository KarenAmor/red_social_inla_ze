import UserSchema from '../../schemas/usersSchema';
import IUser from '../../interfaces/IUser';
import { Document } from 'mongoose';

export class LoginService {
	constructor(private readonly userRepository: typeof UserSchema) {}

	async login(email: string, password: string): Promise<IUser | null> {
		const user = await this.userRepository.findOne({ email });

		if (!user || user.password !== password) {
			return null;
		}

		return user;
	}
}