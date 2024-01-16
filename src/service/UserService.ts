import PgPool from "./PgPool";
import User from "../model/User";

class UserService {

    async findById(id: number): Promise<User> {
        try {
            const result = await PgPool.query({
                text: 'select id_user, username, token where id_user = $1;',
                values: [id]
            });
            return result[0] as User;
        } catch (err) {
            throw err;
        }
    }

    async findByUsername(username: string): Promise<User> {
        try {
            const result = await PgPool.query({
                text: 'select id_user, username, token where username = $1;',
                values: [username]
            });
            return result[0] as User;
        } catch (err) {
            throw err;
        }
    }

    async filterByUsername(username: string): Promise<User[]> {
        try {
            const result = await PgPool.query({
                text: 'select id_user, username, token where username = $1;',
                values: [username]
            });
            return result as User[];
        } catch (err) {
            throw err;
        }
    }

    async update(id: number, user: User) {
        try {
            await PgPool.query({
                text: 'update user set username = $1, token = $2 where id_user = $3 ',
                values: [user.username, user.token, id]
            });
            return user;
        } catch (err) {
            throw err;
        }
    }

    async save(user: User): Promise<User> {
        try {
            await PgPool.query({
                text: 'insert into user (username, token) values ($1, $2);',
                values: [user.username, user.token]
            });
            return user;
        } catch (err) {
            throw err;
        }
    }

    async delete(id: number): Promise<number> {
        try {
            await PgPool.query({
                text: 'delete from user where id = $1',
                values: [id]
            });
            return id;
        } catch (err) {
            throw err;
        }
    }
}

export default new UserService();