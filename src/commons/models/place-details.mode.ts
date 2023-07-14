import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Model, Table } from 'sequelize-typescript';

@ObjectType()
@Table({ tableName: 'place_details' })
export class PlaceDetails extends Model<PlaceDetails> {
  @Field()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Field()
  @Column
  size: string;

  @Field()
  @Column
  height: number;

  @Field()
  @Column
  width: number;

  @Field()
  @Column
  length: number;

  @Field()
  @Column
  parking_spots: number;

  @Field()
  @Column
  elevator: boolean;

  @Field()
  @Column
  freight_elevator: boolean;

  @Field()
  @Column
  stairs: boolean;

  @Field()
  @Column
  street_level: boolean;

  @Field()
  @Column
  wheelchair: boolean;

  @Field()
  @Column
  air_conditioning: boolean;

  @Field()
  @Column
  wifi: boolean;

  @Field()
  @Column
  max_attendees: number;

  @Field({nullable: true})
  @Column
  price_pp_hourly_0?: number;
  @Field({nullable: true})
  @Column
  price_pp_hourly_1?: number;
  @Field({nullable: true})
  @Column
  price_pp_hourly_2?: number;
  @Field({nullable: true})
  @Column
  price_pp_hourly_3?: number;
  @Field({nullable: true})
  @Column
  price_pp_hourly_4?: number;
  @Field({nullable: true})
  @Column
  price_pp_hourly_5?: number;

  @Field({nullable: true})
  @Column
  event?: boolean;

  @Field({nullable: true})
  @Column
  meeting?: boolean;

  @Field({nullable: true})
  @Column
  production?: boolean;
}
