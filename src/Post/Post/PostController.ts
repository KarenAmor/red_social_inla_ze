import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { PostService } from './PostService';
import IPost from 'interfaces/IPost';

export class PostController {
	constructor(private readonly postService: PostService) {}

	async getAll(request: Request, response: Response): Promise<Response> {
        try {
            const page: number = parseInt(request.query.page as string) || 1;
            const pageSize: number = parseInt(request.query.pageSize as string) || 10;

            console.log('Page:', page);
            console.log('PageSize:', pageSize);

            const posts = await this.postService.findAllWithAuthorName(page, pageSize);

            console.log('Posts:', posts);
			const responseData = {
				Page: page,
				PageSize: pageSize,
				Posts: posts
			};

            return response.status(StatusCodes.OK).json(responseData);
        } catch (err: any) {
            console.error('Error:', err);
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
        }
    }

    async getById(request: Request, response: Response): Promise<Response> {
        const postId = request.params.id;

        try {
            const post = await this.postService.findById(postId);
            if (!post) {
                return response.status(StatusCodes.NOT_FOUND).json({ message: 'Post no encontrado.' });
            }
            return response.status(StatusCodes.OK).json(post);
        } catch (err: any) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
        }
    }

	async getByUserId(request: Request, response: Response): Promise<Response> {
		const userId = request.params.userId;
		console.log("soy el id", userId);

		try {
			const posts = await this.postService.findByUserId(userId);
			return response.status(StatusCodes.OK).json(posts);
		} catch (err: any) {
			return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
		}
	}

    async create(request: Request, response: Response): Promise<Response> {
		console.log('request', request.body);
		const post: IPost = request.body;
		console.log('user', post);

		try {
			const createUser = await this.postService.create(post);
			return response.status(StatusCodes.CREATED).json(createUser);
			// TODO: Type error
		} catch (err: any) {
			return response.status(500).json({ err: err.message });
		}
	}
    async update(request: Request, response: Response): Promise<Response> {
		const postId = request.params.id;
		const postData: IPost = request.body;

		try {
			const updatedUser = await this.postService.update(postId, postData);
			return response.status(StatusCodes.OK).json(updatedUser);
		} catch (err: any) {
			return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
		}
	}
    async delete(request: Request, response: Response): Promise<Response> {
		const postId = request.params.id;

		try {
			await this.postService.delete(postId);
			return response.status(StatusCodes.OK).json({ message: 'Post eliminado satisfactoriamente.' });
		} catch (err: any) {
			return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
		}
	}

	async likePost(request: Request, response: Response): Promise<Response> {
		const postId = request.params.id;
	
		try {
			const updatedPost = await this.postService.likePost(postId);
			return response.status(StatusCodes.OK).json(updatedPost);
		} catch (err: any) {
			return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: err.message });
		}
	}
	
}