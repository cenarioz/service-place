import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'feature' })
export class Feature extends Model<Feature> {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;
}
