import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: 'rule' })
export class Rule extends Model<Rule> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;
}