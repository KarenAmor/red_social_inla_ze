import UserSchema from '../../schemas/usersSchema';
import IUser from '../../interfaces/IUser';
import jwt from 'jsonwebtoken';
import { Document } from 'mongoose';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default_access_secret';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret';

export class LoginService {
	constructor(private readonly userRepository: typeof UserSchema) {}

	async login(email: string, password: string): Promise<{ user: IUser | null; accessToken: string | null }> {
		const user = await this.userRepository.findOne({ email });

		if (!user || user.password !== password) {
			return { user: null, accessToken: null };
		}

		const accessToken = jwt.sign({ userId: user._id }, ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
		return { user, accessToken };
	}
	
	async generateRefreshToken(userId: string): Promise<string | null> {
		const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET);
		return refreshToken;
	}
}