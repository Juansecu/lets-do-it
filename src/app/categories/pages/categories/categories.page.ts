import {Component, inject} from '@angular/core';
import {CommonModule} from "@angular/common";
import { RouterLink } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonList,
  IonItem,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonNote,
  IonCardHeader,
  IonCardTitle,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {add, pencil, trash, folderOutline, alertCircleOutline} from "ionicons/icons";

import {CategoryEntity} from "../../entities";

import {Categories} from "../../services/categories";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonButtons, IonHeader, IonIcon, IonLabel, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonNote, IonInfiniteScroll, IonInfiniteScrollContent, RouterLink, CommonModule]
})
export default class CategoriesPage {
  private readonly _CATEGORIES_SERVICE: Categories = inject(Categories);

  categories: CategoryEntity[] = [];
  errorMessage: string | null = null;
  currentPage: number = 1;
  canLoadMore: boolean = true;

  constructor() {
    addIcons({ add, pencil, trash, folderOutline, alertCircleOutline })
  }

  ionViewDidEnter() {
    this.resetAndLoad();
  }

  async deleteCategory(category: CategoryEntity): Promise<void> {
    try {
      await this._CATEGORIES_SERVICE.deleteCategory(category);
      this.categories = this.categories.filter(c => c.categoryId !== category.categoryId);
    } catch (error) {
      console.error(`Error deleting category: ${error}`);
      this.errorMessage = 'Hubo un error al eliminar la categoría.';
    }
  }

  resetAndLoad() {
    this.categories = [];
    this.currentPage = 1;
    this.canLoadMore = true;
    this.loadCategories(20);
  }

  async loadCategories(take = 10, event?: InfiniteScrollCustomEvent) {
    this.errorMessage = null;
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
      this.errorMessage = 'Hubo un error al cargar las categorías. Por favor, inténtalo de nuevo.';

      if (event) await event.target.complete();
    }
  }

  onIonInfinite(event: any) {
    this.loadCategories(10, event as InfiniteScrollCustomEvent);
  }
}
