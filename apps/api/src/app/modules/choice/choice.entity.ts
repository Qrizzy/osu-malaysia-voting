import { Column, Default, Model, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'choice' })
export class ChoiceEntity extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  username: string;

  @Column
  rank: number;

  @Column
  countryRank: number;

  @Column
  country: string;

  @Default(0)
  @Column
  points: number;

  @Column
  joinedAt: Date;
}
