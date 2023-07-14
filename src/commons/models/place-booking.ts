import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Place } from './place.model';
import { User } from './user.model';

@ObjectType()
@Table({ tableName: 'place_booking' })
export class PlaceBooking extends Model<PlaceBooking> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @Column({
    allowNull: false,
  })
  start_date: string;

  @Field()
  @Column({
    allowNull: false,
  })
  end_date: string;

  @Field()
  @ForeignKey(() => Place)
  @Column
  place_id: number;

  @BelongsTo(() => Place)
  place: Place;

  @Field()
  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user: Place;
  
  @Field()
  hours: number
}
