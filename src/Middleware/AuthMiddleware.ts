import { Request, Response, NextFunction } from 'express';
import UserModel from '../schemas/usersSchema'; 

const authenticateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.body.userId; 

        // Verificar si userId está presente en req.body
        if (!userId) {
            return res.status(401).json({ message: 'No autorizado: se requiere userId en el cuerpo de la solicitud' });
        }
        
        const user = await UserModel.findById(userId); 

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        req.user = user;
        next(); 
    } catch (error) {
        console.error('Error de autenticación:', error);
        return res.status(500).json({ message: 'Error de autenticación' });
    }
};

export default authenticateUser;