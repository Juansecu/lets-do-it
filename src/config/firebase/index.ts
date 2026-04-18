import {bootstrapRemoteConfig} from "./remote-config";

export async function bootstrapFirebase(): Promise<void> {
  await bootstrapRemoteConfig();
}
