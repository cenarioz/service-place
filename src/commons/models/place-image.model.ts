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
@Table({ tableName: 'place_image' })
export class PlaceImage extends Model<PlaceImage> {
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
  path: string;
}
