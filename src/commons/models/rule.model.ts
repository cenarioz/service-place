import { Field, ObjectType } from '@nestjs/graphql';
import {
  BelongsToMany,
  Column,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { PlaceRule } from './place-rule.model';
import { Place } from './place.model';
@ObjectType()
@Table({ tableName: 'rule' })
export class Rule extends Model<Rule> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @Column
  name: string;

  @BelongsToMany(() => Place, {
    through: { model: () => PlaceRule },
  })
  places!: Place[];

  @HasMany(() => PlaceRule, {
    onDelete: 'CASCADE',
  })
  placeRules!: PlaceRule[];
}
