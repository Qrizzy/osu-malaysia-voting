import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './database.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProjectConfigModule } from './config.module';
import { ChoiceModule } from './modules/choice/choice.module';
import { VoteModule } from './modules/vote/vote.module';

@Module({
  imports: [
    ProjectConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend')
    }),
    DatabaseModule,
    UserModule,
    ChoiceModule,
    VoteModule,
    AuthModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
