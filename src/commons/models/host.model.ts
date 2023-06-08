import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Place } from "./place.model";
import { User } from "./user.model";

@Table({ tableName: 'host' })
export class Host extends Model<Host> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @BelongsTo(() => User)
  user?: User

  @Column
  rating: number;

  @Column
  response_rating: number;

  @Column
  time_rating: number;

  @HasMany(() => Place)
  place: Place
}
