import bcrypt from 'bcrypt';
import { Document } from 'mongoose';
import UserSchema from '../../schemas/usersSchema';
import IUser from '../../interfaces/IUser';

export class RegisterService {
	constructor(private readonly userRepository: typeof UserSchema) {}

	async create(user: IUser): Promise<Document> {
		// Validar contraseña
		const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!passwordRegex.test(user.password)) {
			throw new Error('La contraseña debe contener al menos una mayúscula, una minúscula, un número, un símbolo y tener una longitud mínima de 8 caracteres');
		}

		// Encriptar la contraseña
		const hashedPassword = await bcrypt.hash(user.password, 10); // Se utiliza un factor de costo de 10

		// Actualizar la contraseña del usuario con la contraseña encriptada
		// @ts-ignore
		const userWithHashedPassword: IUser = {
			...user,
			password: hashedPassword
		};

		const userObj: IUser = await UserSchema.create(userWithHashedPassword);
		return userObj;
	}
}