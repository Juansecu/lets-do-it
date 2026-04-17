import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteConnection } from '@capacitor-community/sqlite';

const platform: string = Capacitor.getPlatform();
const sqliteConnection: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
const sqliteParams = {
  connection: sqliteConnection,
  plugin: CapacitorSQLite,
  platform: platform
}

export default sqliteParams;
