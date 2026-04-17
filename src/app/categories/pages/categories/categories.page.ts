import {Component, inject} from '@angular/core';
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
import {add, trash, folderOutline, alertCircleOutline} from "ionicons/icons";

import {CategoryEntity} from "../../entities";

import {CategoriesService} from "../../services/categories.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonButtons, IonHeader, IonIcon, IonLabel, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonNote, IonInfiniteScroll, IonInfiniteScrollContent, RouterLink, CommonModule]
})
export default class CategoriesPage {
  private readonly _CATEGORIES_SERVICE: CategoriesService = inject(CategoriesService);

  categories: CategoryEntity[] = [];
  errorMessage: string | null = null;
  currentPage: number = 1;
  canLoadMore: boolean = true;

  constructor() {
    addIcons({ add, trash, folderOutline, alertCircleOutline })
  }

  ionViewDidEnter() {
    this.resetAndLoad();
  }

  resetAndLoad() {
    this.categories = [];
    this.currentPage = 1;
    this.canLoadMore = true;
    this.loadCategories();
  }

  async loadCategories(event?: InfiniteScrollCustomEvent) {
    this.errorMessage = null;
    try {
      const newCategories = await this._CATEGORIES_SERVICE.getCategories(this.currentPage);

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
    this.loadCategories(event as InfiniteScrollCustomEvent);
  }
}
