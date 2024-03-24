import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { PostService } from './PostService';
import IPost from 'interfaces/IPost';

export class PostController {
	constructor(private readonly postService: PostService) {}

	async getAll(request: Request, response: Response): Promise<Response> {
		try {
			const post = await this.postService.findAll();
			return response.status(StatusCodes.OK).json(post);
		} catch (err: any) {
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
}