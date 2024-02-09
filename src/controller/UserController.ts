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
            response.status(500).json({ error: 'Create user failure' });
        }
    }

    async login(request: Request, response: Response): Promise<void> {
        try {
            const { username, password } = request.body as userInterface;
            const loged = await UserService.login(username, password);

            response.status(200).json(loged);
        } catch (error) {
            if (error.message === 'Wrong username or password') {
                response.status(401).send({ error: error.message });
            }
            response.status(500).send({ error: 'Login failure:' + error.message });
        }
    }

    async validateToken(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const token = request.header('Authorization').replace("Bearer ", "");
            if (!token) {
                throw new Error('Invalid token');
            }
            if (await UserService.verifyToken(token)) {
                next();
            }
        } catch (error) {
            if (error.message === 'Invalid token') {
                response.status(401).send({ error: error.message });
            }
            response.status(500).send({ error: 'Token failure:' + error.message });
        }
    }

}

export default new UserController();