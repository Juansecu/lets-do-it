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

  async deleteTask(task: TaskEntity): Promise<void> {
    await this._tasksRepository.remove(task);

    if (sqliteParams.platform === 'web')
      await sqliteParams.connection.saveToStore(tasksDataSourceConfig.database);
  }

  async getTasks(page = 1, take = 10, categoryId?: number): Promise<TaskEntity[]> {
    this._PAGE.set(page);

    const queryOptions: any = {
      skip: (this._PAGE() - 1) * take,
      take: take,
      relations: ['categories'],
      order: { name: 'ASC' }
    };

    if (categoryId) {
      // Find tasks that have a category with the specified ID
      queryOptions.where = {
        categories: {
          categoryId: categoryId
        }
      };
    }

    return await this._tasksRepository.find(queryOptions);
  }

  async getTaskById(taskId: number): Promise<TaskEntity | null> {
    return await this._tasksRepository.findOne({
      where: { taskId },
      relations: ['categories']
    });
  }

  async toggleTaskCompletion(task: TaskEntity): Promise<void> {
    task.isCompleted = task.isCompleted === 0 ? 1 : 0;

    await this._tasksRepository.save(task);

    if (sqliteParams.platform === 'web')
      await sqliteParams.connection.saveToStore(tasksDataSourceConfig.database);
  }
}
