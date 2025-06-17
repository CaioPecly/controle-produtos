import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express'; // <- Importação do Express

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(express.json()); // <- ESSENCIAL para o @Body() funcionar corretamente

  await app.listen(3000);
}
bootstrap();
  