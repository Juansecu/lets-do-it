import { bootstrapApplication } from '@angular/platform-browser';
import {
  PreloadAllModules,
  provideRouter,
  RouteReuseStrategy,
  //withDebugTracing,
  withPreloading
} from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import {JeepSqlite} from "jeep-sqlite/dist/components/jeep-sqlite";

import {bootstrapFirebase} from "./config/firebase";

import sqliteParams from "./databases/sqlite-params";

import { routes } from './app/app.routes';

import { AppComponent } from './app/app.component';

import {initializeDataSources} from "./databases/datasources/initialize-data-sources";

const startApp = async () => {
  if (sqliteParams.platform === "web") {
    customElements.define("jeep-sqlite", JeepSqlite);

    const jeepElement: HTMLElement = document.createElement("jeep-sqlite");

    document.body.appendChild(jeepElement);

    await customElements.whenDefined("jeep-sqlite");
    await sqliteParams.connection.initWebStore();
  }

  await initializeDataSources();

  await bootstrapFirebase();

  await bootstrap();
};

async function bootstrap(): Promise<void> {
  bootstrapApplication(AppComponent, {
    providers: [
      { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      provideIonicAngular(),
      provideRouter(
        routes,
        //withDebugTracing(),
        withPreloading(PreloadAllModules)
      ),
    ],
  });
}

startApp().catch(err => console.error(err));
