import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { UtilsModule } from './utils/utils.module';
import { userPreferencesMiddleware } from './utils/utils.middleware';
import config from './config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [config],
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    PrismaModule,
    ProductsModule,
    UtilsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(userPreferencesMiddleware).forRoutes('products');
  }
}
