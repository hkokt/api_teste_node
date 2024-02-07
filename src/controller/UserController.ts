import { NextFunction, Request, Response } from 'express';
import UserService from '../service/UserService';

interface userInterface {
    username: string;
    password: string;
}

class UserController {

    async register(request: Request, response: Response): Promise<void> {
        try {
            const { username, password } = request.body as userInterface;
            const created = await UserService.register(username, password);
            response.status(201).json(created);
        } catch (error) {
            console.log(error);
            response.status(500).json({ error: 'Erro ao criar usuário.' });
        }
    }

    async login(request: Request, response: Response): Promise<void> {

    }

    async validateToken(req: Request, res: Response, next: NextFunction): Promise<void> {

    }

}

export default new UserController();