import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { METHODS } from 'http';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://localhost',
      'http://amp-csr-fe',
      'https://amp-csr-fe',
      'https://torenrob.dev',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
