import {Injectable, signal, WritableSignal} from '@angular/core';
import { Repository } from 'typeorm';

import sqliteParams from "../../../databases/sqlite-params";

import tasksDataSourceConfig from '../../../databases/datasources/tasks';

import { CategoryEntity } from '../entities';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _PAGE: WritableSignal<number> = signal(1);

  private readonly _MAX_AMOUNT_OF_CATEGORIES = 10;

  private get _repository(): Repository<CategoryEntity> {
    return tasksDataSourceConfig.dataSource.getRepository(CategoryEntity);
  }

  async createCategory(name: string): Promise<CategoryEntity> {
    const category = new CategoryEntity();
    category.name = name;
    const savedCategory = await this._repository.save(category);

    if (sqliteParams.platform === 'web') {
      await sqliteParams.connection.saveToStore(tasksDataSourceConfig.database);
    }

    return savedCategory;
  }

  async getCategories(page = 1): Promise<CategoryEntity[]> {
    this._PAGE.set(page);

    return await this._repository.find({
      skip: (this._PAGE() - 1) * this._MAX_AMOUNT_OF_CATEGORIES,
      take: this._MAX_AMOUNT_OF_CATEGORIES
    });
  }
}
