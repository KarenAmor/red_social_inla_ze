import { Schema, model } from 'mongoose';
import IUser from 'interfaces/IUser';

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
	name: { type: String, required: true },
	email: { type: String, required: true },
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;
