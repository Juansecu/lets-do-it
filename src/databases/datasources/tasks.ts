import {DataSource, DataSourceOptions} from "typeorm";

import {IDataSourceConfig} from "../typings/datasource";

import sqliteParams from "../sqlite-params";

import * as categoriesEntities from '../../app/categories/entities';
import * as tasksEntities from '../../app/tasks/entities';

import * as categoriesMigrations from '../../app/categories/migrations';
import * as tasksMigrations from '../../app/tasks/migrations';

const dataSourceOptions: DataSourceOptions = {
  database: 'lets-do-it-tasks',
  driver: sqliteParams.connection,
  type: 'capacitor',
  mode: 'no-encryption',
  entities: [
    categoriesEntities.CategoryEntity,
    tasksEntities.TaskEntity
  ],
  migrations: [
    ...Object.values(categoriesMigrations),
    ...Object.values(tasksMigrations)
  ],
  migrationsRun: true,
  synchronize: false // Setting to true for development to auto-create tables
};
const tasksDataSource: DataSource = new DataSource(dataSourceOptions);
const dataSourceConfig: IDataSourceConfig = {
  database: dataSourceOptions.database,
  dataSource: tasksDataSource
};

export default dataSourceConfig;
