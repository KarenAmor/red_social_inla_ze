import { Document } from 'mongoose';
interface IUser extends Document {
	name: string;
	email: string;
}
export default IUser;
