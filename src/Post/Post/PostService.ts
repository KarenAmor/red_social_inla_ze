import { Document } from 'mongoose';
import PostSchema from '../../schemas/postsSchema';
import UserSchema from '../../schemas/usersSchema'; 
import IPost from '../../interfaces/IPost';

export class PostService {
	constructor(private readonly postRepository: typeof PostSchema, private readonly userRepository?: any) {} // userRepository es ahora opcional
   
    async findAllWithAuthorName(page: number, pageSize: number): Promise<any[]> {
        const skip = (page - 1) * pageSize;
        const posts: Document[] = await PostSchema.find().skip(skip).limit(pageSize);

        const postsWithAuthorName: any[] = await Promise.all(posts.map(async (post: Document) => {
            const userId: any = post.get('userId');

            const user: Document | null = await UserSchema.findById(userId);
            if (user) {
                const postObject = post.toJSON(); 
                postObject.authorName = user.get('fullName');
                return postObject;
            } else {
                return post.toJSON(); 
            }
        }));

        return postsWithAuthorName;
    }

	async findById(postId: string): Promise<Document | null> {
        const post = await PostSchema.findById(postId);
        return post;
    }

	async findByUserId(userId: string): Promise<Document[]> {
		const posts: Document[] = await PostSchema.find({ userId: userId });
		return posts;
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
		await PostSchema.findByIdAndUpdate(postId, { deleted: true, deletedAt: new Date() });
	}

    async likePost(postId: string): Promise<Document | null> {
        const post = await PostSchema.findById(postId);
    
        if (!post) {
            throw new Error('Post no encontrado');
        }
    
        post.likes += 1;
        const updatedPost = await post.save();
    
        return updatedPost;
    }
    
}