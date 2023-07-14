import { Field, ObjectType } from "@nestjs/graphql";
import { BelongsToMany, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { PlaceAmenity } from "./place-amenity.model";
import { Place } from "./place.model";

@ObjectType()
@Table({ tableName: 'amenity' })
export class Amenity extends Model<Amenity> {
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
    through: { model: () => PlaceAmenity },
  })
  places!: Place[];

  @HasMany(() => PlaceAmenity, {
    onDelete: "CASCADE",
  })
  placeAmenities!: PlaceAmenity[];
}
