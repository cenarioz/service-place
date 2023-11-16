import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Address } from './address.model';
import { Amenity } from './amenity.model';
import { Category } from './category.model';
import { Feature } from './feature.model';
import { Host } from './host.model';
import { PlaceAmenity } from './place-amenity.model';
import { PlaceBooking } from './place-booking';
import { PlaceCategory } from './place-category.model';
import { PlaceDetails } from './place-details.mode';
import { PlaceFeature } from './place-feature.model';
import { PlaceImage } from './place-image.model';
import { PlaceOpeningHour } from './place-opening-hour.model';
import { PlaceRule } from './place-rule.model';
import { Rule } from './rule.model';

@ObjectType()
@Table({ tableName: 'place' })
export class Place extends Model<Place> {
  @Field({ nullable: true })
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Host)
  @Column({ field: 'host_id' })
  hostId?: number;

  @Field(() => Host, { nullable: true })
  @BelongsTo(() => Host)
  host?: Host;

  @Field({ nullable: true })
  @Column
  rating: number;

  @Field({ nullable: true })
  @Column
  title: string;

  @ForeignKey(() => Address)
  @Column
  address_id: number;

  @Field({ nullable: true })
  @BelongsTo(() => Address)
  address?: Address;

  @Field({ nullable: true })
  @Column
  description: string;

  @Field({ nullable: true })
  @Column
  value: number;

  @Field({ nullable: true })
  @Column
  value_type: string;

  @Field({ nullable: true })
  @Column
  minimum: number;

  @Field({ nullable: true })
  @Column
  type: string;

  @ForeignKey(() => PlaceDetails)
  @Column
  place_details_id: number;

  @Field(() => PlaceDetails, { nullable: true })
  @BelongsTo(() => PlaceDetails)
  details?: PlaceDetails;

  @Field(() => [PlaceOpeningHour], { nullable: true })
  @HasMany(() => PlaceOpeningHour)
  opening_hours?: PlaceOpeningHour[];

  @Field(() => [PlaceImage], { nullable: true })
  @HasMany(() => PlaceImage)
  images?: PlaceImage;

  @Field(() => [PlaceBooking], { nullable: true })
  @HasMany(() => PlaceBooking)
  bookings?: PlaceBooking;

  @Field(() => [PlaceCategory]!, { nullable: true })
  @HasMany(() => PlaceCategory)
  placeCategories: PlaceCategory[];

  @Field(() => [Category], { nullable: true })
  @BelongsToMany(() => Category, {
    through: { model: () => PlaceCategory },
  })
  categories!: Category[];

  @Field(() => [PlaceAmenity]!, { nullable: true })
  @HasMany(() => PlaceAmenity)
  placeAmenities: PlaceAmenity[];

  @Field(() => [Amenity], { nullable: true })
  @BelongsToMany(() => Amenity, {
    through: { model: () => PlaceAmenity },
  })
  amenities!: Amenity[];

  @Field(() => [PlaceRule]!, { nullable: true })
  @HasMany(() => PlaceRule)
  placeRules: PlaceRule[];

  @Field(() => [Rule], { nullable: true })
  @BelongsToMany(() => Rule, {
    through: { model: () => PlaceRule },
  })
  rules!: Rule[];

  @Field(() => [PlaceFeature]!, { nullable: true })
  @HasMany(() => PlaceFeature)
  PlaceFeatures: PlaceFeature[];

  @Field(() => [Feature], { nullable: true })
  @BelongsToMany(() => Feature, {
    through: { model: () => PlaceFeature },
  })
  features!: Feature[];

  @Field({ nullable: true })
  distance: number;

  @Field({ nullable: true })
  count: number;
}

@ObjectType()
export class dynamicFilter {
  @Field({ nullable: true })
  minValue: number;
  @Field({ nullable: true })
  maxValue: number;
  @Field({ nullable: true })
  mediumValue: number;
  @Field({ nullable: true })
  numPlaces: number;
}
