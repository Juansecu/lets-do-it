import {Component, inject, OnInit, signal, WritableSignal} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader, IonIcon, IonText,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {addIcons} from "ionicons";
import {alertCircleOutline} from "ionicons/icons";

import {CategoryEntity} from "../../entities";

import {CategoryFormComponent} from "../../components/category-form/category-form.component";

import {Categories} from "../../services/categories";

@Component({
  selector: 'app-save-category',
  templateUrl: './save-category.page.html',
  styleUrls: ['./save-category.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    CategoryFormComponent,
    IonIcon,
    IonText
  ]
})
export default class SaveCategoryPage implements OnInit {
  private readonly _ACTIVATED_ROUTE: ActivatedRoute = inject(ActivatedRoute);
  private readonly _CATEGORIES_SERVICE: Categories = inject(Categories);
  private readonly _ROUTER: Router = inject(Router);

  category: WritableSignal<CategoryEntity | null> = signal(null);

  errorMessage: string | null = null;
  isCreatingNewCategory = false;

  constructor() {
    addIcons({ alertCircleOutline });
  }

  ngOnInit(): void {
    let categoryId = 0;

    this.isCreatingNewCategory = /create-category(\/?)$/.test(this._ROUTER.url);

    if (this.isCreatingNewCategory) return;

    categoryId = Number.parseInt(this._ACTIVATED_ROUTE.snapshot.params['categoryId']);

    this._CATEGORIES_SERVICE.getCategoryById(categoryId)
      .then(category => {
        this.category.set(category);
      })
      .catch(error => {
        console.error('Error loading category:', error);
        this.errorMessage = 'Hubo un error al cargar la categoría. Por favor, inténtalo de nuevo.';
      });
  }
}
