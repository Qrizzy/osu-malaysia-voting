import { forwardRef, Module } from '@nestjs/common';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { ChoiceModule } from '../choice/choice.module';
import { UserModule } from '../user/user.module';
import { VoteEntity } from './vote.entity';
import { VoteCollectionEntity } from './vote-collection.entity';

@Module({
  imports: [
    forwardRef(() => ChoiceModule),
    forwardRef(() => UserModule)
  ],
  providers: [
    {
      provide: 'VOTE_REPOSITORY',
      useValue: VoteEntity,
    },
    {
      provide: 'VOTE_COLLECTION_REPOSITORY',
      useValue: VoteCollectionEntity,
    },
    VoteService
  ],
  exports: [VoteService],
  controllers: [VoteController]
})
export class VoteModule {}
