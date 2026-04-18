import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTasksTableMigration1776371615832 implements MigrationInterface {
  name = 'CreateTasksTableMigration1776371615832';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'Tasks',
        columns: [
          {
            name: 'Task_id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'Name',
            type: 'varchar',
            length: '50',
            isNullable: false
          }
          ,
          {
            name: 'Description',
            type: 'text',
            isNullable: true
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('Tasks');
  }
}
