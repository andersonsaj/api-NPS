import request from 'supertest';
import { createConnection } from 'typeorm';
import app from '../app';

describe('Surverys', () => {
  beforeAll(async () => {
    const connection = await createConnection();
    await connection.runMigrations();
  });

  it('Should be able to create a new survery', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Title Example',
      description: 'Description Example',
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('Should be able to get all surverys', async () => {
    await request(app).post('/surveys').send({
      title: 'Title Example2',
      description: 'Description Example2',
    });
    const response = await request(app).get('/surveys');

    expect(response.body.length).toBe(2);
  });
});
