import {getRemoteConfig, fetchAndActivate} from "firebase/remote-config";

import app from "./firebase";

const remoteConfig = getRemoteConfig(app);

remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
remoteConfig.defaultConfig = {
  visualizationType: 'list'
};

export async function bootstrapRemoteConfig(): Promise<void> {
  try {
    await fetchAndActivate(remoteConfig);
  } catch (error) {
    console.error('Remote Config fetch failed:', error);
  }
}

export default remoteConfig;
