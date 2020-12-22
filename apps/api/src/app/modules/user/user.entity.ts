import { Table, Column, Model, PrimaryKey, Default } from 'sequelize-typescript';

@Table({ tableName: 'user' })
export class UserEntity extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  username: string;

  @Column
  avatarUrl: string;

  @Column
  country: string;

  @Column
  rank: number;

  @Default(false)
  @Column
  admin: boolean;
}
