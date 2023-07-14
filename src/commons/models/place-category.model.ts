import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsTo, Column, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { Category } from "./category.model";
import { Place } from "./place.model";

@ObjectType()
@Table({ tableName: 'place_category' })
export class PlaceCategory extends Model<PlaceCategory> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @BelongsTo(() => Place)
  place!: Place;

  @ForeignKey(() => Place)
  @PrimaryKey
  @Column
  place_id!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @ForeignKey(() => Category)
  @PrimaryKey
  @Column
  category_id!: number;
}
