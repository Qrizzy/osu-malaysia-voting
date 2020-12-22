import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';

@Module({
  imports: [],
  providers: [
    {
      provide: 'USER_REPOSITORY',
      useValue: UserEntity,
    },
    UserService
  ],
  exports: [UserService],
  controllers: [UserController]
})
export class UserModule {}
