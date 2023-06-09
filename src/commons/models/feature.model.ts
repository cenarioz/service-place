import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';
@ObjectType()
@Table({ tableName: 'feature' })
export class Feature extends Model<Feature> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @Column
  name: string;
}
