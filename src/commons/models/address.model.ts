import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DataType,
  Model,
  Scopes,
  Sequelize,
  Table,
} from 'sequelize-typescript';

@Scopes(() => ({
  distance: (latitude, longitude, distance, unit = 'km') => {
    const constant = unit === 'km' ? 6371 : 3959;
    const haversine = `(
        ${constant} * acos(
            cos(radians(${latitude}))
            * cos(radians(latitude))
            * cos(radians(longitude) - radians(${longitude}))
            + sin(radians(${latitude})) * sin(radians(latitude))
        )
      )`;
    return {
      attributes: [[Sequelize.literal(haversine), 'distance']],
      having: Sequelize.literal(`distance <= ${distance}`),
    };
  },
}))
@ObjectType()
@Table({ tableName: 'address' })
export class Address extends Model<Address> {
  @Field({ nullable: true })
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field({ nullable: true })
  @Column
  street: string;

  @Field({ nullable: true })
  @Column
  number: string;

  @Field({ nullable: true })
  @Column
  neighborhood: string;

  @Field({ nullable: true })
  @Column
  city: string;

  @Field({ nullable: true })
  @Column
  state: string;

  @Field({ nullable: true })
  @Column
  country: string;

  @Field({ nullable: true })
  @Column
  complement: string;

  @Field({ nullable: true })
  @Column(DataType.FLOAT)
  latitude: number;

  @Field({ nullable: true })
  @Column(DataType.FLOAT)
  longitude: number;

  @Field({ nullable: true })
  @Column
  zip_code: string;
}
