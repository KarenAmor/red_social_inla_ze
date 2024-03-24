import { Document } from 'mongoose';
import PostSchema from '../../schemas/postsSchema';
import IPost from '../../interfaces/IPost';

export class PostService {
	constructor(private readonly userRepository: typeof PostSchema) {}

	async findAll(): Promise<Document[]> {
		const post: Document[] = await PostSchema.find();
		return post;
	}

	async findById(postId: string): Promise<Document | null> {
        const post = await PostSchema.findById(postId);
        return post;
    }

    async create(post: IPost): Promise<Document> {
		const postObj: IPost = await PostSchema.create(post);
		return postObj;
	}

    async update(postId: string, postData: IPost): Promise<Document | null> {
		const updatedPost = await PostSchema.findByIdAndUpdate(postId, postData, { new: true });
		return updatedPost;
	}

    async delete(postId: string): Promise<void> {
		await PostSchema.findByIdAndUpdate(postId, { deleted: true });
	}
}