import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { Address } from './address.model';
import { Host } from './host.model';
import { PlaceDetails } from './place-details.mode';
import { PlaceFeature } from './place-feature.model';
import { PlaceImage } from './place-image.model';
import { PlaceRule } from './place-rule.model';

@Table({ tableName: 'place' })
export class Place extends Model<Place> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Host)
  @Column({ field: 'host_id' })
  hostId?: number

  @BelongsTo(() => Host)
  host?: Host

  @Column
  rating: number;

  @Column
  title: string;

  @ForeignKey(() => Address)
  @Column
  address_id: number;

  @BelongsTo(() => Address)
  address?: Address

  @Column
  description: string;

  @Column
  value: number;

  @Column
  value_type: string;

  @Column
  minimum: number;

  @Column
  type: string;

  @ForeignKey(() => PlaceDetails)
  @Column
  place_details_id: number;

  @BelongsTo(() => PlaceDetails)
  details: PlaceDetails;

  @HasMany(() => PlaceFeature)
  place_feature: PlaceFeature[]

  @HasMany(() => PlaceRule)
  place_rule: PlaceRule

  @HasMany(() => PlaceImage)
  images: PlaceImage
}
