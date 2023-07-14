import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Amenity } from "./amenity.model";
import { Place } from "./place.model";

@ObjectType()
@Table({ tableName: 'place_amenity' })
export class PlaceAmenity extends Model<PlaceAmenity> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @BelongsTo(() => Place)
  place!: Place;

  @ForeignKey(() => Place)
  @PrimaryKey
  @Column
  place_id!: number;

  @BelongsTo(() => Amenity)
  amenity!: Amenity;

  @ForeignKey(() => Amenity)
  @PrimaryKey
  @Column
  amenity_id!: number;
}