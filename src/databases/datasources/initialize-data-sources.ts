import {IDataSourceConfig} from "../typings/datasource";

import sqliteParams from "../sqlite-params";

import tasksDataSourceConfig from "./tasks";

export async function initializeDataSources(): Promise<void> {
  const dataSourceConfigs: IDataSourceConfig[] = [tasksDataSourceConfig];

  await sqliteParams.connection.checkConnectionsConsistency()
    .catch(error => {
      console.error(error);
      return {};
    });

  for (const dataSourceConfig of dataSourceConfigs) {
    await dataSourceConfig.dataSource.initialize();

    if (dataSourceConfig.dataSource.isInitialized)
      await dataSourceConfig.dataSource.runMigrations().catch(console.error);

    if (sqliteParams.platform === 'web')
      await sqliteParams.connection.saveToStore(dataSourceConfig.database);
  }
}
