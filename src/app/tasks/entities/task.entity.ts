import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import {CategoryEntity} from "../../categories/entities";

@Entity('Tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'Task_id',
    unsigned: true
  })
  taskId!: number;
  @Column('varchar', {
    name: 'Name',
    length: 50,
    nullable: false
  })
  name!: string;
  @Column('text', {
    name: 'Description',
    nullable: true
  })
  description!: string;

  @JoinTable({
    name: 'Task_category_assignments',
    joinColumn: {
      name: 'Task_id',
      referencedColumnName: 'taskId'
    }
  })
  @ManyToMany(() => CategoryEntity, category => category.tasks)
  categories!: CategoryEntity[];
}
