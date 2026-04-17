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
  IonCardTitle
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
  imports: [IonContent, IonButton, IonButtons, IonHeader, IonIcon, IonLabel, IonList, IonItem, IonItemSliding, IonItemOptions, IonItemOption, IonTitle, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonNote, RouterLink, CommonModule]
})
export default class CategoriesPage {
  private readonly _CATEGORIES_SERVICE: CategoriesService = inject(CategoriesService);

  categories: CategoryEntity[] = [];
  errorMessage: string | null = null;

  constructor() {
    addIcons({ add, trash, folderOutline, alertCircleOutline })
  }

  ionViewDidEnter() {
    this.loadCategories();
  }

  async loadCategories() {
    this.errorMessage = null;
    try {
      this.categories = await this._CATEGORIES_SERVICE.getCategories();
    } catch (error) {
      console.error('Error loading categories:', error);
      this.errorMessage = 'Hubo un error al cargar las categorías. Por favor, inténtalo de nuevo.';
    }
  }
}
