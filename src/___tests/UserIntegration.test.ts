import { describe, expect, test } from '@jest/globals';
import supertest from 'supertest';
import { app } from "../index";

describe('Integration User', () => {
    describe('get /teste', () => {
        describe('not Bearer token provided', () => {
            it('should return 401',
                async () => {
                    await supertest(app.server)
                        .get('/teste')
                        .expect(401);
                })
        })
    })
})