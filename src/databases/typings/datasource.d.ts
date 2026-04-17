import {DataSource} from "typeorm";

export interface IDataSourceConfig {
  database: string;
  dataSource: DataSource;
}
