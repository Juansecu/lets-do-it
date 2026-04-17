import {
  Component, effect,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal
} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {
  IonButton,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonText
} from "@ionic/angular/standalone";
import {addIcons} from "ionicons";
import {alertCircleOutline} from "ionicons/icons";

import {CategoryEntity} from "../../entities";

import {Categories} from "../../services/categories";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  standalone: true,
  imports: [FormsModule, IonItem, IonLabel, IonInput, IonText, IonIcon, IonButton],
})
export class CategoryFormComponent {
  private readonly _CATEGORIES_SERVICE: Categories = inject(Categories);
  private readonly _ROUTER: Router = inject(Router);

  category: InputSignal<CategoryEntity | null> = input<CategoryEntity | null>(null);
  shouldCreateNewCategory: InputSignal<boolean> = input(true);

  categoryName: WritableSignal<string> = signal('');

  errorMessage: string | null = null;

  constructor() {
    addIcons({ alertCircleOutline });

    // React to category signal changes
    effect(() => {
      const cat = this.category();
      if (cat) {
        this.categoryName.set(cat.name);
      }
    });
  }

  async onSaveCategory() {
    if (!this.categoryName().trim()) return;

    this.errorMessage = null;

    try {
      if (this.shouldCreateNewCategory())
        await this._CATEGORIES_SERVICE.createCategory(this.categoryName().trim());
      else {
        const category: CategoryEntity | null = this.category();

        if (category) {
           category.name = this.categoryName().trim();
           await this._CATEGORIES_SERVICE.updateCategory(category);
        }
      }

      this.categoryName.set('');

      this._ROUTER.navigate(['/categories']);
    } catch (error) {
      console.error('Error creating/updating category:', error);
      this.errorMessage = `Hubo un error al ${this.shouldCreateNewCategory() ? 'crear' : 'modificar'} la categoría. Por favor, inténtalo de nuevo.`;
    }
  }
}
