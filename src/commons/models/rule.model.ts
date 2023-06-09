import { Field, ObjectType } from "@nestjs/graphql";
import { Column, Model, Table } from "sequelize-typescript";
@ObjectType()
@Table({ tableName: 'rule' })
export class Rule extends Model<Rule> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @Column
  name: string;
}