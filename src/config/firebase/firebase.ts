import {initializeApp} from 'firebase/app';

import {environment} from "../../environments/environment";

const firebase = {
  apiKey: environment.firebaseApiKey,
  appId: environment.firebaseAppId,
  authDomain: environment.firebaseAuthDomain,
  messagingSenderId: environment.firebaseMessagingSenderId,
  projectId: environment.firebaseProjectId,
  storageBucket: environment.firebaseStorageBucket
};
const app = initializeApp(firebase);

export default app;
