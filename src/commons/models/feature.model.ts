import { Field, ObjectType } from '@nestjs/graphql';
import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { PlaceFeature } from './place-feature.model';
@ObjectType()
@Table({ tableName: 'feature' })
export class Feature extends Model<Feature> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @Column
  name: string;

  @BelongsToMany(() => Feature, {
    through: { model: () => PlaceFeature },
  })
  places!: Feature[];

  @HasMany(() => PlaceFeature, {
    onDelete: "CASCADE",
  })
  placeFeatures!: PlaceFeature[];
}
