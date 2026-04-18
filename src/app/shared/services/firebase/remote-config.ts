import { Injectable } from '@angular/core';
import {getValue} from 'firebase/remote-config';

import remoteConfig from '../../../../config/firebase/remote-config';

@Injectable({
  providedIn: 'root',
})
export class RemoteConfig {
  getValue(key: string) {
    return getValue(remoteConfig, key);
  }
}
