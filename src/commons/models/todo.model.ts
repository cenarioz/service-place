import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: 'todo',
  schema: 'cenarioz',
})
export class Todo extends Model {
  @Column({
    type: 'integer',
    autoIncrement: true,
    primaryKey: true,
  })
  id?: number

  @Column
  title: string
}