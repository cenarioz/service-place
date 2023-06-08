import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Address } from './address.model';

@Table({ tableName: 'user' })
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ allowNull: false })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column({ allowNull: false })
  name: string;

  @ForeignKey(() => Address)
  @Column
  address_id: number;

  @BelongsTo(() => Address)
  address: Address

  @Column
  cpf: string;

  @Column
  photo: string;

  @Column({ allowNull: false })
  phone: string;
}









