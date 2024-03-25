import { Document } from 'mongoose';
import UserSchema from '../../schemas/usersSchema';
import IUser from '../../interfaces/IUser';

export class UserService {
	constructor(private readonly userRepository: typeof UserSchema) {}

	async findAll(): Promise<Document[]> {
		const users: Document[] = await UserSchema.find();
		return users;
	}

	async findById(userId: string): Promise<Document | null> {
        const user = await UserSchema.findById(userId);
        return user;
    }

    async update(userId: string, userData: IUser): Promise<Document | null> {
		const updatedUser = await UserSchema.findByIdAndUpdate(userId, userData, { new: true });
		return updatedUser;
	}

    async delete(userId: string): Promise<void> {
		await UserSchema.findByIdAndUpdate(userId, { deleted: true, deletedAt: new Date() });
	}
}