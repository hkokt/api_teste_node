import { Router } from "express";
import UserController from '../controller/UserController';

const router: Router = Router();

const endpoints = {
    USER: "/users"
}

router.post(`${endpoints.USER}/register`, UserController.register);
router.post(`${endpoints.USER}/login`, () => { }, UserController.login);

export default router;