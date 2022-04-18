import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GeoLocationMiddleware } from './utils/utils.middleware';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
  });
  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);
  // Overall logger
  app.useLogger(nestWinston);
  app.useGlobalPipes(new ValidationPipe());
  //  Exception blocking write log
  app.setGlobalPrefix('api');
  app.use(GeoLocationMiddleware);
  const config = new DocumentBuilder()
    .setTitle('Global Ecommerce API')
    .setDescription('Global Ecommerce API endpoints')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'Jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000);
}
bootstrap();
