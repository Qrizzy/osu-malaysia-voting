
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { ChoiceEntity } from '../choice/choice.entity';
import { VoteCollectionEntity } from './vote-collection.entity';

@Table({ tableName: 'vote' })
export class VoteEntity extends Model {
  @Column
  ranking: number;

  @ForeignKey(() => VoteCollectionEntity)
  @Column
  voteCollectionId: number;

  @BelongsTo(() => VoteCollectionEntity, { onDelete: 'CASCADE' })
  voteCollection: VoteCollectionEntity;

  @ForeignKey(() => ChoiceEntity)
  @Column
  choiceId: number;

  @BelongsTo(() => ChoiceEntity)
  choice: ChoiceEntity;
}
