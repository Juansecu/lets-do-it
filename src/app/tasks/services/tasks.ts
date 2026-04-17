import {inject, Injectable, signal, WritableSignal} from '@angular/core';
import {Repository} from "typeorm";

import sqliteParams from "../../../databases/sqlite-params";

import tasksDataSourceConfig from "../../../databases/datasources/tasks";

import {TaskEntity} from "../entities";
import {CategoryEntity} from "../../categories/entities";

import {Categories} from "../../categories/services/categories";

@Injectable({
  providedIn: 'root',
})
export class Tasks {
  private readonly _CATEGORIES_SERVICE: Categories = inject(Categories);

  private readonly _PAGE: WritableSignal<number> = signal(1);

  private get _tasksRepository(): Repository<TaskEntity> {
    return tasksDataSourceConfig.dataSource.getRepository(TaskEntity);
  }

  async createTask(name: string, categoryIds: number[], description?: string): Promise<TaskEntity> {
    let categories: CategoryEntity[] = [];

    const task = new TaskEntity();

    task.name = name;

    if (description) task.description = description;

    categories = await this._CATEGORIES_SERVICE.getCategoriesByIds(categoryIds);

    if (categories.length > 0) task.categories = categories;

    const savedTask = await this._tasksRepository.save(task);

    if (sqliteParams.platform === 'web') {
      await sqliteParams.connection.saveToStore(tasksDataSourceConfig.database);
    }

    return savedTask;
  }

  async getTasks(page = 1, take = 10): Promise<TaskEntity[]> {
    this._PAGE.set(page);

    return await this._tasksRepository.find({
      skip: (this._PAGE() - 1) * take,
      take: take,
      relations: ['categories']
    });
  }

  async getTaskById(taskId: number): Promise<TaskEntity | null> {
    return await this._tasksRepository.findOne({
      where: { taskId },
      relations: ['categories']
    });
  }
}
