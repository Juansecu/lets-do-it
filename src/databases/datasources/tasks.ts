import {DataSource, DataSourceOptions} from "typeorm";

import {IDataSourceConfig} from "../typings/datasource";

import sqliteParams from "../sqlite-params";

import * as categoriesEntities from '../../app/categories/entities';
import * as tasksEntities from '../../app/tasks/entities';

import {CreateCategoriesTableMigration1776370409720} from '../../app/categories/migrations';
import {
  CreateTasksTableMigration1776371615832,
  CreateTaskCategoryAssignmentsTableMigration1776374269777,
  AddIsCompletedColumnToTasksTableMigration1776441277495
} from '../../app/tasks/migrations';

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
    CreateCategoriesTableMigration1776370409720,
    CreateTasksTableMigration1776371615832,
    CreateTaskCategoryAssignmentsTableMigration1776374269777,
    AddIsCompletedColumnToTasksTableMigration1776441277495
  ],
  migrationsRun: true,
  synchronize: false
};
const tasksDataSource: DataSource = new DataSource(dataSourceOptions);
const dataSourceConfig: IDataSourceConfig = {
  database: dataSourceOptions.database,
  dataSource: tasksDataSource
};

export default dataSourceConfig;
