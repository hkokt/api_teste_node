import { Router } from "express";
import User from '../controller/User';
import PgPool from "../service/PgPool";

const user = new User();
const router: Router = Router();

const endpoints = {
    USER: "/users"
}

router.post(`${endpoints.USER}/login`, user.login);
router.post(`${endpoints.USER}/register`, user.register);

export default router;