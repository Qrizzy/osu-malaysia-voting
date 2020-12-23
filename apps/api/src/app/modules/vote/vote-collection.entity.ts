import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { UserEntity } from '../user/user.entity';
import { VoteEntity } from './vote.entity';

@Table({ tableName: 'vote_collection' })
export class VoteCollectionEntity extends Model {
  @ForeignKey(() => UserEntity)
  @Column
  userId: number;

  @Column
  year: number;

  @BelongsTo(() => UserEntity)
  user: UserEntity;

  @HasMany(() => VoteEntity)
  voteList: VoteEntity[];
}
