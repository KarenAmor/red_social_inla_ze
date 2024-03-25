import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { LoginService } from './LoginService';

dotenv.config(); 

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'default_access_secret';

export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  async login(request: Request, response: Response): Promise<Response> {
		try {
			const { email, password } = request.body;

			if (!email || !password) {
				return response.status(StatusCodes.BAD_REQUEST).json({ message: 'Debe proporcionar un correo electrónico y una contraseña' });
			}

			const { user, accessToken } = await this.loginService.login(email, password);

			if (!user) {
				return response.status(StatusCodes.UNAUTHORIZED).json({ message: 'Credenciales inválidas' });
			}

			const welcomeMessage = `¡Bienvenido, ${user.fullName}! Has iniciado sesión correctamente.`;

			return response.status(StatusCodes.OK).json({ token: accessToken, message: welcomeMessage });
		} catch (error) {
			console.error('Error en el inicio de sesión:', error);
			return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error en el servidor' });
		}
  }

  async logout(request: Request, response: Response): Promise<Response> {
    try {
      return response.status(StatusCodes.OK).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error en el servidor' });
    }
  }

  async refreshToken(request: Request, response: Response): Promise<Response> {
    try {
      const { refreshToken } = request.body;

      if (!refreshToken) {
        return response.status(StatusCodes.BAD_REQUEST).json({ message: 'Token de actualización no proporcionado' });
      }

      const accessToken = await this.loginService.generateRefreshToken(refreshToken);
      
      return response.status(StatusCodes.OK).json({ accessToken });
    } catch (error) {
      console.error('Error al refrescar token:', error);
      return response.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token de actualización inválido' });
    }
  }
}