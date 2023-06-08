import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Place } from "./place.model";

@Table({ tableName: 'place_image' })
export class PlaceImage extends Model<PlaceImage> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Place)
  @Column
  place_id: number;

  @BelongsTo(() => Place)
  place?: Place
  
  @Column
  path: string;
}