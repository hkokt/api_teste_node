import { Response, Router, Request } from "express";
import UserController from '../controller/UserController';

const router: Router = Router();

const endpoints = {
    USER: "/users"
}

router.post(`${endpoints.USER}/register`, UserController.register);
router.post(`${endpoints.USER}/login`, UserController.login);
router.get('/teste',
    UserController.validateToken,
    (req: Request, res: Response) => {
        res.send('authenticated')
    })
export default router;