import { Schema, model, Types } from 'mongoose';
import IUser from 'interfaces/IUser';

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
	fullName: { type: String, required: true },
	age: { type: Number, required: true},
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true},
	posts: [{ type: Types.ObjectId, ref: 'Post' }],
	createdAt: { type: Date, default: Date.now }, 
    updatedAt: { type: Date, required: false, default: Date.now },
	deleted: {type: Boolean, required: false, default: false},
    deletedAt: { type: Date, required: false, default: null }
});

// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export default User;