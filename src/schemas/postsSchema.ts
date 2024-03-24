import { Schema, model, Types } from 'mongoose';
import IPost from 'interfaces/IPost';

// 2. Create a Schema corresponding to the document interface.
const postSchema = new Schema<IPost>({
	title: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null }
});

// 3. Create a Model.
const Post = model<IPost>('Post', postSchema);

export default Post;