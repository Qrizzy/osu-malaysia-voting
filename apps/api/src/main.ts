import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import * as helmet from 'helmet';
import * as redis from 'redis';
import * as connectRedis from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { json, urlencoded } from 'body-parser';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet({ contentSecurityPolicy: false }));
  const configService = app.get(ConfigService);

  // Setup redis
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient({
    host: configService.get<string>('REDIS_HOST'),
    port: configService.get<number>('REDIS_HOST'),
    password: configService.get<string>('REDIS_PASS')
  });

  // Provide session with redis
  app.use(
    session({
      secret: configService.get<string>('SESSION_KEY'),
      resave: false,
      saveUninitialized: false,
      cookie: { expires: new Date(2147483647000) },
      store: new RedisStore({
        client: redisClient,
        disableTTL: true,
        logErrors: true
      })
    })
  );

  // Initialize passport with session and body parser
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = configService.get<string>('PORT');
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}/`);
  });
}

bootstrap();
