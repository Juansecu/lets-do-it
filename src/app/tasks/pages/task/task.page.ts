import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonBadge,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonSkeletonText, IonButton, IonNote
} from '@ionic/angular/standalone';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {folderOutline, timeOutline, alertCircleOutline} from "ionicons/icons";

import {Tasks} from "../../services/tasks";
import {TaskEntity} from "../../entities";

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonBadge,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonSkeletonText,
    CommonModule,
    FormsModule,
    IonButton,
    RouterLink,
    IonNote
  ]
})
export default class TaskPage implements OnInit {
  private readonly _ACTIVATED_ROUTE = inject(ActivatedRoute);
  private readonly _TASKS_SERVICE = inject(Tasks);

  task: TaskEntity | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  constructor() {
    addIcons({ folderOutline, timeOutline, alertCircleOutline });
  }

  ngOnInit() {
    const taskId = this._ACTIVATED_ROUTE.snapshot.paramMap.get('taskId');

    if (taskId) {
      this.loadTask(Number.parseInt(taskId)).then().catch(console.error);
    } else {
      this.errorMessage = 'No se ha encontrado el ID de la tarea.';
      this.isLoading = false;
    }
  }

  async loadTask(taskId: number) {
    this.isLoading = true;
    this.errorMessage = null;
    try {
      this.task = await this._TASKS_SERVICE.getTaskById(taskId);
      if (!this.task) {
        this.errorMessage = 'La tarea solicitada no existe.';
      }
    } catch (error) {
      console.error('Error loading task:', error);
      this.errorMessage = 'Hubo un error al cargar los detalles de la tarea.';
    } finally {
      this.isLoading = false;
    }
  }
}
