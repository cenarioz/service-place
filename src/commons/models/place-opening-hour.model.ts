import { Field, ObjectType } from '@nestjs/graphql';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Place } from './place.model';

@ObjectType()
@Table({ tableName: 'place_opening_hour' })
export class PlaceOpeningHour extends Model<PlaceOpeningHour> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  opening_time: string;
  
  @Field()
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  closing_time: string;
  
  @Field()
  hours: number

  @Field()
  @Column({
    allowNull: false,
  })
  day_of_week: 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY';

  @Field()
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  active: boolean;

  @Field()
  @ForeignKey(() => Place)
  @Column
  place_id: number;

  @BelongsTo(() => Place)
  place: Place;
}
