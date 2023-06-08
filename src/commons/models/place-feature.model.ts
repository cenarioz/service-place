import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Feature } from "./feature.model";
import { Place } from "./place.model";

@Table({ tableName: 'place_feature' })
export class PlaceFeature extends Model<PlaceFeature> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Place)
  @Column
  place_id: number;

  @BelongsTo(() => Place)
  place?: Place

  @ForeignKey(() => Feature)
  @Column
  feature_id: number;

  @BelongsTo(() => Feature)
  features: Feature[];
}