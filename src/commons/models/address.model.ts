import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'address' })
export class Address extends Model<Address> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  street: string;

  @Column
  number: string;

  @Column
  neighborhood: string;

  @Column
  city: string;

  @Column
  state: string;

  @Column
  country: string;

  @Column
  complement: string;

  @Column
  zip_code: string;
}