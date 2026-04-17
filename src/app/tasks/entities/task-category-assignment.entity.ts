import {Entity, PrimaryColumn} from "typeorm";

@Entity('Task_category_assignments')
export class TaskCategoryAssignmentEntity {
  @PrimaryColumn('int', {
    name: 'Task_id',
    unsigned: true,
    nullable: false
  })
  taskId!: number;
  @PrimaryColumn('int', {
    name: 'Category_id',
    unsigned: true,
    nullable: false
  })
  categoryId!: number;
}
