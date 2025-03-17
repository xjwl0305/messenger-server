import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/module/websocket.module';

describe('End To End Test', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/test-get (GET)', () => {
    return request(app.getHttpServer())
      .get('/websocket')
      .expect(200)
      .expect('health check!');
  });

  it('/sending-message (POST)', () => {
    return request(app.getHttpServer())
        .post('/websocket/sending-message')
        .send({
          "sender": "inseok",
          "content": "hihihi",
          "room_num": 2
        })
        .expect(201)
        .expect('sending success');
  });

  it('/set-last-read (POST)', () => {
    return request(app.getHttpServer())
        .post('/websocket/set-last-read')
        .send({
          "user_name": "inseok",
          "room_num": 2,
          "message_id": 3
        })
        .expect(201)
        .expect('health check!');
  });

  it('/read-message (GET)', () => {
    return request(app.getHttpServer())
        .get('/websocket/read-message')
        .send({
          "user_name": "inseok",
          "room_num": 2
        })
        .expect(200)
  });
});
