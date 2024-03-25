import { Document } from 'mongoose';
import UserSchema from '../../schemas/usersSchema';
import IUser from '../../interfaces/IUser';

export class UserService {
	constructor(private readonly userRepository: typeof UserSchema) {}

	async findAll(page: number, pageSize: number): Promise<Document[]> {
        const skip = (page - 1) * pageSize;
        const users: Document[] = await this.userRepository.find().skip(skip).limit(pageSize);
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