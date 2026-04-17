import {Component, inject, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {Router} from "@angular/router";
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
  IonTitle,
  IonToolbar,
  IonText,
  IonIcon,
  IonModal,
  IonCheckbox,
  IonChip,
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonNote
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {alertCircleOutline, closeCircle} from "ionicons/icons";

import {CategoryEntity} from "../../../categories/entities";

import {Tasks} from "../../services/tasks";
import {Categories} from "../../../categories/services/categories";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.page.html',
  styleUrls: ['./create-task.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonButtons,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    IonButton,
    IonList,
    IonText,
    IonIcon,
    IonModal,
    IonCheckbox,
    IonChip,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CommonModule,
    FormsModule,
    IonNote
  ]
})
export default class CreateTaskPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  private readonly _CATEGORIES_SERVICE = inject(Categories);
  private readonly _ROUTER = inject(Router);
  private readonly _TASKS_SERVICE = inject(Tasks);

  task = {
    title: '',
    description: '',
    categoryIds: [] as number[]
  };

  categories: CategoryEntity[] = [];
  selectedCategories: CategoryEntity[] = [];
  errorMessage: string | null = null;

  // Pagination
  currentPage: number = 1;
  canLoadMore: boolean = true;

  constructor() {
    addIcons({ alertCircleOutline, closeCircle });
  }

  async ngOnInit() {
    await this.loadCategories(20);
  }

  async loadCategories(take = 10, event?: InfiniteScrollCustomEvent) {
    try {
      const newCategories = await this._CATEGORIES_SERVICE.getCategories(
        this.currentPage,
        take
      );

      if (newCategories.length < 10) {
        this.canLoadMore = false;
      }

      this.categories = [...this.categories, ...newCategories];
      this.currentPage++;

      if (event) await event.target.complete();
    } catch (error) {
      console.error('Error loading categories:', error);
      if (event) await event.target.complete();
    }
  }

  onIonInfinite(event: any) {
    this.loadCategories(10, event as InfiniteScrollCustomEvent);
  }

  isCategorySelected(categoryId: number): boolean {
    return this.task.categoryIds.includes(categoryId);
  }

  toggleCategory(category: CategoryEntity) {
    const index = this.task.categoryIds.indexOf(category.categoryId);

    if (index > -1) {
      this.task.categoryIds.splice(index, 1);
      this.selectedCategories = this.selectedCategories.filter(c => c.categoryId !== category.categoryId);
    } else {
      this.task.categoryIds.push(category.categoryId);
      this.selectedCategories.push(category);
    }
  }

  removeCategory(category: CategoryEntity) {
    this.task.categoryIds = this.task.categoryIds.filter(id => id !== category.categoryId);
    this.selectedCategories = this.selectedCategories.filter(c => c.categoryId !== category.categoryId);
  }

  closeModal() {
    this.modal.dismiss();
  }

  async onCreateTask() {
    if (!this.task.title.trim()) return;

    this.errorMessage = null;

    try {
      await this._TASKS_SERVICE.createTask(
        this.task.title,
        this.task.categoryIds,
        this.task.description
      );

      this.task.title = '';
      this.task.description = '';
      this.task.categoryIds = [];
      this.selectedCategories = [];

      await this._ROUTER.navigate(['/tasks']);
    } catch (error) {
      console.error('Error creating task:', error);
      this.errorMessage = 'Hubo un error al crear la tarea. Por favor, inténtalo de nuevo.';
    }
  }
}
