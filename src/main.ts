import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import fastifyCsrf from '@fastify/csrf-protection';
import fastifyCookie from '@fastify/cookie';

import { AppModule } from './app.module';
import { TestMiddleware } from './test.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({logger: true})
  );
  
  await app.register(fastifyCookie, {
    secret: 'my-secret', // for cookies signature
  });

  await app.register(fastifyCsrf, {
    sessionPlugin: '@fastify/cookie',
    
  });

  await app.listen(3000);
}
bootstrap();