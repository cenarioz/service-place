import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Feature } from "./feature.model";
import { Place } from "./place.model";
@ObjectType()
@Table({ tableName: 'place_feature' })
export class PlaceFeature extends Model<PlaceFeature> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Place)
  @Field()
  @Column
  place_id: number;

  @BelongsTo(() => Place)
  place?: Place

  @ForeignKey(() => Feature)
  @Field()
  @Column
  feature_id: number;

  @BelongsTo(() => Feature)
  features: Feature[];
}