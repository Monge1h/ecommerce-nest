import {
  Module,
  NestModule,
  MiddlewareConsumer,
  CacheModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';
const format = winston.format;

import { PrismaModule } from './prisma/prisma.module';
import { ProductsModule } from './products/products.module';
import { UtilsModule } from './utils/utils.module';
import { userPreferencesMiddleware } from './utils/utils.middleware';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import config from './config';
import * as Joi from 'joi';

// eslint-disable-next-line prefer-const
let logs_transports: any = [
  new winston.transports.Console({
    level: 'info',
  }),
];
if (process.env.LOGS_GCP == '1') {
  logs_transports.push(
    new LoggingWinston({
      projectId: 'logs-347600',
      keyFilename: './gcp.json',
      level: 'info',
    }),
  );
}

@Module({
  imports: [
    WinstonModule.forRoot({
      exitOnError: false,
      format: format.combine(
        format.colorize(),
        format.timestamp({
          format: 'HH:mm:ss YY/MM/DD',
        }),
        format.label({
          label: 'LOG',
        }),

        format.splat(),
        format.printf((info) => {
          return `${info.timestamp} ${info.level}: [${info.label}]${info.message}`;
        }),
      ),
      transports: logs_transports,
    }),
    CacheModule.register({
      isGlobal: true,
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    }),
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
    UsersModule,
    AuthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(userPreferencesMiddleware).forRoutes('products');
  }
}
