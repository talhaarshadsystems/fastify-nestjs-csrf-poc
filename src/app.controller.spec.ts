import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import * as request from 'supertest';
import { AppService } from './app.service';
import { AppModule } from './app.module';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });
  describe('CSRF Protection', () => {
    it('should prevent unprotected POST request', async() => {
      const moduleFixture = await Test.createTestingModule({
        imports: [AppModule],
      }).compile();
  
      const app = moduleFixture.createNestApplication();
      await app.init();
  
      return request(app.getHttpServer())
        .post('/test-token')
        .expect(403); // Expects a Forbidden error
    });
  });
  
});
