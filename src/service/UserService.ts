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
                hashedPassword: hashedPassword
            }

            return await UserDto.save(userToCreate);
        } catch (err) {
            throw err;
        }
    }

    public async login(username: string, password: string): Promise<User> {
        try {
            const user: User = await UserDto.findByUsername(username)[0];
            const invalidCredg: string = 'Wrong username or password';

            const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);

            if (!user || !isPasswordValid) {
                throw new Error(invalidCredg);
            }

            const token = jwt.sign({ username }, process.env.SECRET_JWT, { expiresIn: '1h' });
            user.token = token;

            const userNewToken = await UserDto.update(user.id_user, user);

            return userNewToken;

        } catch (error) {
            throw new Error("Login internal failure.");
        }
    }

    public async verifyToken(token: string): Promise<User> {
        try {
            if (!token) {
                throw new Error('Invalid token');
            }

            const decoded = jwt.verify(token, process.env.SECRET_JWT) as { username: string };
            const user = await UserDto.findByUsername(decoded.username)[0];

            if (!user) {
                throw new Error('Invalid user');
            }

            return user;

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