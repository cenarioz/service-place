import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Place } from './place.model';
import { User } from './user.model';
@ObjectType()
@Table({ tableName: 'host' })
export class Host extends Model<Host> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Field((type) => User, { nullable: true })
  @BelongsTo(() => User)
  user?: User;

  @Field()
  @Column
  rating: number;

  @Field()
  @Column
  response_rating: number;

  @Field()
  @Column
  time_rating: number;
  
  @Field((type) => [Place], { nullable: true })
  @HasMany(() => Place)
  place: Place;
}
