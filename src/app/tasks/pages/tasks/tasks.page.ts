import {Component, inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonChip
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {add, trash, listOutline, alertCircleOutline, closeCircleOutline, checkmarkCircleOutline} from "ionicons/icons";
import {CommonModule} from "@angular/common";

import {Tasks} from "../../services/tasks";
import {TaskEntity} from "../../entities";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.page.html',
  styleUrls: ['./tasks.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonLabel,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonItemSliding,
    IonItemOptions,
    IonItemOption,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonBadge,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    RouterLink,
    CommonModule,
    IonChip
  ],
})
export default class TasksPage {
  private readonly _TASKS_SERVICE = inject(Tasks);

  tasks: TaskEntity[] = [];
  errorMessage: string | null = null;

  // Pagination
  currentPage: number = 1;
  canLoadMore: boolean = true;

  constructor() {
    addIcons({ add, trash, listOutline, alertCircleOutline, closeCircleOutline, checkmarkCircleOutline });
  }

  ionViewDidEnter() {
    this.resetAndLoad();
  }

  resetAndLoad() {
    this.tasks = [];
    this.currentPage = 1;
    this.canLoadMore = true;
    this.loadTasks(20);
  }

  async loadTasks(take = 10, event?: InfiniteScrollCustomEvent) {
    this.errorMessage = null;
    try {
      const newTasks = await this._TASKS_SERVICE.getTasks(
        this.currentPage,
        take
      );

      if (newTasks.length < 10) {
        this.canLoadMore = false;
      }

      this.tasks = [...this.tasks, ...newTasks];
      this.currentPage++;

      if (event) event.target.complete();
    } catch (error) {
      console.error('Error loading tasks:', error);
      this.errorMessage = 'Hubo un error al cargar las tareas. Por favor, inténtalo de nuevo.';
      if (event) event.target.complete();
    }
  }

  onIonInfinite(event: any) {
    this.loadTasks(10, event as InfiniteScrollCustomEvent);
  }

  async toggleTaskCompletion(task: TaskEntity) {
    this.errorMessage = null;
    try {
      await this._TASKS_SERVICE.toggleTaskCompletion(task);
    } catch (error) {
      console.error(`Error toggling task completion: ${error}`);
      this.errorMessage = 'Hubo un error al actualizar el estado de la tarea.';
    }
  }
}
