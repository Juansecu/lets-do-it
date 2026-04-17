import { Component, OnInit } from '@angular/core';
import {IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {add} from "ionicons/icons";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  imports: [IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonTitle, IonToolbar],
})
export default class TasksPage implements OnInit {
  constructor() {
    addIcons({ add })
  }

  ngOnInit() {}
}
