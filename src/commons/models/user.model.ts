import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from './address.model';
@ObjectType()
@Table({ tableName: 'user' })
export class User extends Model<User> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @Column({ allowNull: false })
  email: string;

  @Field()
  @Column({ allowNull: false })
  password: string;

  @Field()
  @Column({ allowNull: false })
  name: string;

  @ForeignKey(() => Address)
  @Field()
  @Column
  address_id: number;

  @Field()
  @BelongsTo(() => Address)
  address: Address;

  @Field()
  @Column
  cpf: string;

  @Field()
  @Column
  photo: string;

  @Field()
  @Column({ allowNull: false })
  phone: string;
}
