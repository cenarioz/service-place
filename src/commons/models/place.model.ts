import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from './address.model';
import { Feature } from './feature.model';
import { Host } from './host.model';
import { PlaceDetails } from './place-details.mode';
import { PlaceFeature } from './place-feature.model';
import { PlaceImage } from './place-image.model';
import { PlaceRule } from './place-rule.model';
import { Rule } from './rule.model';

@ObjectType()
@Table({ tableName: 'place' })
export class Place extends Model<Place> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Host)
  @Column({ field: 'host_id' })
  hostId?: number;

  @Field((type) => Host, { nullable: true })
  @BelongsTo(() => Host)
  host?: Host;

  @Field()
  @Column
  rating: number;

  @Field()
  @Column
  title: string;

  @ForeignKey(() => Address)

  @Column
  address_id: number;

  @Field()
  @BelongsTo(() => Address)
  address?: Address;

  @Field()
  @Column
  description: string;

  @Field()
  @Column
  value: number;

  @Field()
  @Column
  value_type: string;

  @Field()
  @Column
  minimum: number;

  @Field()
  @Column
  type: string;

  @ForeignKey(() => PlaceDetails)

  @Column
  place_details_id: number;

  @Field((type) => PlaceDetails, { nullable: true })
  @HasOne(() => PlaceDetails)
  details: PlaceDetails;

  @Field((type) => [Feature], { nullable: true })
  @HasMany(() => PlaceFeature)
  features: PlaceFeature[];

  @Field((type) => [Rule], { nullable: true })
  @HasMany(() => PlaceRule)
  rules: PlaceRule;

  @Field((type) => [PlaceImage], { nullable: true })
  @HasMany(() => PlaceImage)
  images: PlaceImage;
}
