import { Component } from '@angular/core';
import { IonApp } from '@ionic/angular/standalone';

import {TabsComponent} from "./shared/components/tabs/tabs.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, TabsComponent],
})
export class AppComponent {
  constructor() {}
}
