import { Document } from 'mongoose';
interface IUser extends Document {
	fullName: string;
	age: number;
	email: string;
	password: string;
	posts: string;
	createdAt: Date;
	updatedAt: Date;
	delete: boolean;
	deletedAt: Date;
	
}
export default IUser;