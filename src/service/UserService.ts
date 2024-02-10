import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

import User from "../types/User";
import UserDto from "../dto/UserDto";

class UserService {

    public async register(username: string, password: string): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const token = jwt.sign({ username }, process.env.SECRET_JWT, { expiresIn: '1d' });

            const userToCreate: User = {
                username: username,
                token: token,
                hashed_password: hashedPassword
            }
            const user: User = await UserDto.save(userToCreate);

            return user;
        } catch (err) {
            throw err;
        }
    }

    public async login(username: string, password: string): Promise<User> {
        const invalidCredg: string = 'Wrong username or password';

        try {
            const user: User[] = await UserDto.findByUsername(username);

            if (user.length === 0) {
                throw new Error(invalidCredg);
            }

            const isPasswordValid = await bcrypt.compare(password, user[0].hashed_password);

            if (!isPasswordValid) {
                throw new Error(invalidCredg);
            }

            const token = jwt.sign({ username }, process.env.SECRET_JWT, { expiresIn: '1h' });
            user[0].token = token;

            const userNewToken = await UserDto.update(user[0].id_user, user[0]);

            return userNewToken;
        } catch (error) {
            if (error.message === invalidCredg) {
                throw new Error(invalidCredg);
            }
            throw new Error("Login internal failure.");
        }
    }

    public async verifyToken(token: string): Promise<Boolean> {
        try {
            if (!token) {
                throw new Error('Invalid token');
            }

            const decoded = jwt.verify(token, process.env.SECRET_JWT) as { username: string };
            const user = await UserDto.findByUsername(decoded.username);

            if (!user[0]) {
                throw new Error('Invalid user');
            }

            return true;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('Invalid token');
            }

            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Expired token');
            }

            throw new Error('Authentication failure');
        }
    }

}

export default new UserService();