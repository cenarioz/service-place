import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Place } from "./place.model";

@Table({ tableName: 'place_details' })
export class PlaceDetails extends Model<PlaceDetails> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Place)
  @Column
  place_id: number;
  
  @BelongsTo(() => Place)
  place?: Place

  @Column
  size: string;

  @Column
  height: number;

  @Column
  width: number;

  @Column
  length: number;

  @Column
  parking_spots: number;

  @Column
  elevator: boolean;

  @Column
  freight_elevator: boolean;

  @Column
  stairs: boolean;

  @Column
  street_level: boolean;

  @Column
  wheelchair: boolean;

  @Column
  air_conditioning: boolean;

  @Column
  wifi: boolean;
}


