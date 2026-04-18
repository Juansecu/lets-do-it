import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTaskCategoryAssignmentsTableMigration1776374269777 implements MigrationInterface {
  name = 'CreateTaskCategoryAssignmentsTableMigration1776374269777';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Task_category_assignments',
        columns: [
          {
            name: 'Task_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
            isNullable: false
          },
          {
            name: 'Category_id',
            type: 'int',
            isPrimary: true,
            unsigned: true,
            isNullable: false
          }
        ],
        foreignKeys: [
          {
            columnNames: ['Task_id'],
            referencedColumnNames: ['Task_id'],
            referencedTableName: 'Tasks',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          },
          {
            columnNames: ['Category_id'],
            referencedColumnNames: ['Category_id'],
            referencedTableName: 'Categories',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
  }
}
