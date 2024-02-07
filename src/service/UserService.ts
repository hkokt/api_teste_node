import pool from "./PgPool";
import User from "../model/User";

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

class UserService {
    public async findById(id: number): Promise<User[]> {
        try {
            const result = await pool.query({
                text: 'select id_user, username, token from "user" where id_user = $1;',
                values: [id]
            });
            return result as User[];
        } catch (err) {
            throw err;
        }
    }

    public async findByUsername(username: string): Promise<User[]> {
        try {
            const result = await pool.query({
                text: 'select id_user, username, token from "user" where username = $1;',
                values: [username]
            });
            return result as User[];
        } catch (err) {
            throw err;
        }
    }

    public async update(id: number, user: User) {
        try {
            await pool.query({
                text: 'update "user" set username = $1, token = $2 where id_user = $3 ',
                values: [user.username, user.token, id]
            });
            return user;
        } catch (err) {
            throw err;
        }
    }

    public async save(user: User): Promise<User> {
        try {
            await pool.query({
                text: 'insert into "user" (username, token) values ($1, $2);',
                values: [user.username, user.token]
            });
            return await this.findByUsername(user.username)[0];
        } catch (err) {
            throw err;
        }
    }

    public async delete(id: number): Promise<number> {
        try {
            await pool.query({
                text: 'delete from "user" where id = $1',
                values: [id]
            });
            return id;
        } catch (err) {
            throw err;
        }
    }

    public async register(username: string, password: string): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const token = jwt.sign({ username }, process.env.SECRET_JWT, { expiresIn: '1d' });

            const userToCreate: User = {
                username: username,
                token: token,
                hashedPassword: hashedPassword
            }

            return await this.save(userToCreate);
        } catch (err) {
            throw err;
        }
    }
}

export default new UserService();