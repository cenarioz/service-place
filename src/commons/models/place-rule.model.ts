import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Place } from "./place.model";
import { Rule } from "./rule.model";

@Table({ tableName: 'place_rule' })
export class PlaceRule extends Model<PlaceRule> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Place)
  @Column
  place_id: number;

  @BelongsTo(() => Place)
  place?: Place
  
  @ForeignKey(() => Rule)
  @Column
  rule_id: number;

  @BelongsTo(() => Rule)
  rules?: Rule
}
