import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Place } from './place.model';
@ObjectType()
@Table({ tableName: 'place_availability_calendar' })
export class PlaceAvailabilityCalendar extends Model<PlaceAvailabilityCalendar> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => Place)
  @Field()
  @Column
  place_id: number;

  @BelongsTo(() => Place)
  place?: Place;

  @Field()
  @Column
  date: string;

  @Field()
  @Column
  booked: boolean;

  @Field()
  @Column
  disabled_by_open_hours: boolean;

  @Field()
  @Column
  has_bookings: boolean;

  @Field()
  @Column
  has_disabled: boolean;

  @Field()
  @Column
  has_requests: boolean;

  @Field()
  @Column
  unavailable: boolean;
}
