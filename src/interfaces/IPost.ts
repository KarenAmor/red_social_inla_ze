import mongoose, { Schema, Document } from 'mongoose';
interface IPost extends Document {
	title: string;
	content: string;
	likes: number;
    userId: mongoose.Types.ObjectId;
	createdAt: Date;
	updatedAt: Date;
	deleted: boolean;
	deletedAt: Date;
	
}
export default IPost;