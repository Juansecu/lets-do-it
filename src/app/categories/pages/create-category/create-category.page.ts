import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonText
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {addIcons} from "ionicons";
import {alertCircleOutline} from "ionicons/icons";

import {CategoriesService} from "../../services/categories.service";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.page.html',
  styleUrls: ['./create-category.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonText, CommonModule, FormsModule]
})
export default class CreateCategoryPage {
  private readonly _CATEGORIES_SERVICE: CategoriesService = inject(CategoriesService);
  private readonly _ROUTER: Router = inject(Router);

  categoryName: string = '';
  errorMessage: string | null = null;

  constructor() {
    addIcons({ alertCircleOutline });
  }

  async onCreateCategory() {
    if (!this.categoryName.trim()) return;

    this.errorMessage = null;

    try {
      await this._CATEGORIES_SERVICE.createCategory(this.categoryName);
      this.categoryName = '';
      this._ROUTER.navigate(['/categories']);
    } catch (error) {
      console.error('Error creating category:', error);
      this.errorMessage = 'Hubo un error al crear la categoría. Por favor, inténtalo de nuevo.';
    }
  }
}
