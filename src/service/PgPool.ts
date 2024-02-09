import { Pool, QueryResult, PoolClient, QueryResultRow, ClientConfig } from 'pg';
import 'dotenv/config';

class PgPool {
    private pool: Pool;

    constructor() {

        const config: ClientConfig = {
            host: process.env.POSTGRES_HOST as string,
            port: Number(process.env.POSTGRES_PORT) as number,
            user: process.env.POSTGRES_USER as string,
            password: process.env.POSTGRES_PASSWORD as string,
            database: process.env.POSTGRES_DB as string
        }

        console.log('credenciais db:', {
            host: process.env.POSTGRES_HOST as string,
            port: Number(process.env.POSTGRES_PORT) as number,
            user: process.env.POSTGRES_USER as string,
            password: process.env.POSTGRES_PASSWORD as string,
            database: process.env.POSTGRES_DB as string
        });

        this.pool = new Pool(config);
    }


    private async executeInTransaction<T>(callback: (client: PoolClient) => Promise<T>): Promise<T> {
        const client: PoolClient = await this.pool.connect();
        try {
            await client.query('BEGIN');
            const result = await callback(client);
            await client.query('COMMIT');

            return result;
        } catch (err) {
            await client.query('ROLLBACK');
            throw err;
        } finally {
            client.release();
        }
    }

    public async query(queryObject: { text: string, values?: any[] }): Promise<QueryResultRow[]> {
        return this.executeInTransaction(async (client) => {
            const result: QueryResult<any> = await client.query(queryObject);
            return result.rows;
        });
    }
}

export default new PgPool();