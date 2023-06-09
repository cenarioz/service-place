import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Place } from "./place.model";

@ObjectType()
@Table({ tableName: 'place_details' })
export class PlaceDetails extends Model<PlaceDetails> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Place)
  @Field()
  @Column
  place_id: number;
  
  @BelongsTo(() => Place)
  place?: Place

  @Field()
  @Column
  size: string;

  @Field()
  @Column
  height: number;

  @Field()
  @Column
  width: number;

  @Field()
  @Column
  length: number;

  @Field()
  @Column
  parking_spots: number;

  @Field()
  @Column
  elevator: boolean;

  @Field()
  @Column
  freight_elevator: boolean;

  @Field()
  @Column
  stairs: boolean;

  @Field()
  @Column
  street_level: boolean;

  @Field()
  @Column
  wheelchair: boolean;

  @Field()
  @Column
  air_conditioning: boolean;

  @Field()
  @Column
  wifi: boolean;
}


