import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Feature } from "./feature.model";
import { Place } from "./place.model";
@ObjectType()
@Table({ tableName: 'place_feature' })
export class PlaceFeature extends Model<PlaceFeature> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @BelongsTo(() => Place)
  place!: Place;

  @ForeignKey(() => Place)
  @PrimaryKey
  @Column
  place_id!: number;

  @BelongsTo(() => Feature)
  feature!: Feature;

  @ForeignKey(() => Feature)
  @PrimaryKey
  @Column
  feature_id!: number;
}