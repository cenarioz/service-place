import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';
@ObjectType()
@Table({ tableName: 'address' })
export class Address extends Model<Address> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @Column
  street: string;

  @Field()
  @Column
  number: string;

  @Field()
  @Column
  neighborhood: string;

  @Field()
  @Column
  city: string;

  @Field()
  @Column
  state: string;

  @Field()
  @Column
  country: string;

  @Field()
  @Column
  complement: string;

  @Field()
  @Column
  zip_code: string;
}
