import { HttpModule, Module } from '@nestjs/common';
import { ChoiceService } from './choice.service';
import { ChoiceController } from './choice.controller';
import { ChoiceEntity } from './choice.entity';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: 'CHOICE_REPOSITORY',
      useValue: ChoiceEntity,
    },
    ChoiceService
  ],
  exports: [ChoiceService],
  controllers: [ChoiceController]
})
export class ChoiceModule {}
