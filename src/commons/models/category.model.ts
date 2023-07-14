import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { PlaceCategory } from "./place-category.model";
import { Place } from "./place.model";

@ObjectType()
@Table({ tableName: 'category' })
export class Category extends Model<Category> {
  @Field()
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Field()
  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  name: string;


  @BelongsToMany(() => Place, {
    through: { model: () => PlaceCategory },
  })
  places!: Place[];

  @HasMany(() => PlaceCategory, {
    onDelete: "CASCADE",
  })
  placeCategories!: PlaceCategory[];
}
