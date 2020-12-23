// require('dotenv-safe').config({ allowEmptyValues: true });
import { Module, Provider} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

// Entities
import { UserEntity } from './modules/user/user.entity';
import { ChoiceEntity } from './modules/choice/choice.entity';
import { VoteEntity } from './modules/vote/vote.entity';
import { VoteCollectionEntity } from './modules/vote/vote-collection.entity';

const databaseProviders: Provider[] = [{
  provide: 'SEQUELIZE',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const sequelize = new Sequelize({
      dialect: 'mariadb',
      host: configService.get<string>('DB_HOST'),
      port: 3306,
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASS'),
      database: configService.get<string>('DB_DATABASE'),
      timezone: 'Etc/GMT0',
      dialectOptions: {
        timezone: 'Etc/GMT0',
      },
      define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        timestamps: true
      },
      logging: false
    });

    sequelize.addModels([
      UserEntity,
      ChoiceEntity,
      VoteEntity,
      VoteCollectionEntity
    ]);

    await sequelize.sync({ alter: true });
    return sequelize;
  }
}];

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders]
})
export class DatabaseModule { }
