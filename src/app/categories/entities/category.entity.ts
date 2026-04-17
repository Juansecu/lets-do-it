import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from "typeorm";

import {TaskEntity} from "../../tasks/entities";

@Entity('Categories')
export class CategoryEntity {
  @PrimaryGeneratedColumn('increment', {
    name: 'Category_id',
    unsigned: true
  })
  categoryId!: number;
  @Column('varchar', {
    name: 'Name',
    length: 50,
    nullable: false
  })
  name!: string;

  @JoinTable({
    name: 'Task_category_assignments',
    joinColumn: {
      name: 'Category_id',
      referencedColumnName: 'categoryId'
    }
  })
  @ManyToMany(() => TaskEntity, task => task.categories)
  tasks!: TaskEntity[];
}
