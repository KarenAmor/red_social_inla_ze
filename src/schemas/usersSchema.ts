import { Schema, model } from 'mongoose';
import IUser from 'interfaces/IUser';

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
	fullName: { type: String, required: true },
	age: { type: Number, required: true},
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true},
	posts: { type: String, required: false}, 
	createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, required: false, default: Date.now },
	delete: {type: Boolean, required: false, default: false},
    deletedAt: { type: Date, required: false, default: null }
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;