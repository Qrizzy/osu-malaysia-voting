import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({

        // General
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
        PORT: Joi.number().default(3333),

        // Database
        DB_USER: Joi.string().required(),
        DB_PASS: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),

        // Redis
        REDIS_HOST: Joi.string().required(),
        REDIS_PASS: Joi.string().required(),
        REDIS_PORT: Joi.number().default(6379),

        // Session
        SESSION_KEY: Joi.string().default('some-session-key-123'),

        // osu!
        OSU_CLIENT_ID: Joi.number().required(),
        OSU_CLIENT_SECRET: Joi.string().required(),
        OSU_CALLBACK_URL: Joi.string().required(),
        OSU_API_KEY: Joi.string()
      })
    })
  ]
})
export class ProjectConfigModule { }
