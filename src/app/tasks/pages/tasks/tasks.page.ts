import {Component, inject, OnInit, ViewChild} from '@angular/core';
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
  IonCardTitle,
  IonChip,
  IonModal,
  IonRadioGroup,
  IonRadio,
  IonNote,
  IonCheckbox,
  IonGrid,
  IonRow,
  IonCol
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {add, pencil, trashOutline, listOutline, alertCircleOutline, closeCircleOutline, checkmarkCircleOutline, filterOutline} from "ionicons/icons";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

import {TaskEntity} from "../../entities";
import {CategoryEntity} from "../../../categories/entities";

import {Tasks} from "../../services/tasks";
import {Categories} from "../../../categories/services/categories";
import {RemoteConfig} from "../../../shared/services/firebase/remote-config";

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
    IonModal,
    IonRadioGroup,
    IonRadio,
    IonCheckbox,
    IonGrid,
    IonRow,
    IonCol,
    RouterLink,
    CommonModule,
    IonChip,
    FormsModule,
    IonNote
  ],
})
export default class TasksPage implements OnInit {
  @ViewChild('filterModal') filterModal!: IonModal;

  private readonly _CATEGORIES_SERVICE = inject(Categories);
  private readonly _REMOTE_CONFIG_SERVICE = inject(RemoteConfig);
  private readonly _TASKS_SERVICE = inject(Tasks);

  tasks: TaskEntity[] = [];
  categories: CategoryEntity[] = [];
  errorMessage: string | null = null;
  selectedCategoryId: number | null = null;
  visualizationType = 'list';

  // Pagination for Tasks
  currentPage: number = 1;
  canLoadMore: boolean = true;

  // Pagination for Filter Categories
  categoriesCurrentPage: number = 1;
  categoriesCanLoadMore: boolean = true;

  constructor() {
    addIcons({ add, pencil, trashOutline, listOutline, alertCircleOutline, closeCircleOutline, checkmarkCircleOutline, filterOutline });
  }

  ngOnInit(): void {
    this.visualizationType = this._REMOTE_CONFIG_SERVICE.getValue('visualizationType').asString();
  }

  ionViewDidEnter() {
    this.resetCategoriesAndLoad();
    this.resetAndLoad();
  }

  resetCategoriesAndLoad() {
    this.categories = [];
    this.categoriesCurrentPage = 1;
    this.categoriesCanLoadMore = true;
    this.loadFilterCategories(20);
  }

  async loadFilterCategories(take = 10, event?: InfiniteScrollCustomEvent) {
    try {
      const newCategories = await this._CATEGORIES_SERVICE.getCategories(this.categoriesCurrentPage, take);

      if (newCategories.length < 10) {
        this.categoriesCanLoadMore = false;
      }

      this.categories = [...this.categories, ...newCategories];
      this.categoriesCurrentPage++;

      if (event) event.target.complete();
    } catch (error) {
      console.error('Error loading filter categories:', error);
      if (event) event.target.complete();
    }
  }

  onCategoriesInfinite(event: any) {
    this.loadFilterCategories(10, event as InfiniteScrollCustomEvent);
  }

  resetAndLoad() {
    this.tasks = [];
    this.currentPage = 1;
    this.canLoadMore = true;
    this.loadTasks(20);
  }

  async deleteTask(task: TaskEntity): Promise<void> {
    try {
      await this._TASKS_SERVICE.deleteTask(task);
      this.tasks = this.tasks.filter(t => t.taskId !== task.taskId);
    } catch (error) {
      console.error(`Error deleting task: ${error}`);
      this.errorMessage = 'Hubo un error al eliminar la tarea.';
    }
  }

  async loadTasks(take = 10, event?: InfiniteScrollCustomEvent) {
    this.errorMessage = null;
    try {
      const newTasks = await this._TASKS_SERVICE.getTasks(
        this.currentPage,
        take,
        this.selectedCategoryId || undefined
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

  onFilterChange() {
    this.resetAndLoad();
    this.filterModal.dismiss();
  }

  get selectedCategoryName(): string {
    if (!this.selectedCategoryId) return 'Todas las tareas';
    const cat = this.categories.find(c => c.categoryId === this.selectedCategoryId);
    return cat ? cat.name : 'Todas las tareas';
  }
}
