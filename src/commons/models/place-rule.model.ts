import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Place } from "./place.model";
import { Rule } from "./rule.model";
@ObjectType()
@Table({ tableName: 'place_rule' })
export class PlaceRule extends Model<PlaceRule> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Place)
  @Field()
  @Column
  place_id: number;

  @BelongsTo(() => Place)
  place?: Place
  
  @ForeignKey(() => Rule)
  @Field()
  @Column
  rule_id: number;

  @BelongsTo(() => Rule)
  rules?: Rule
}
