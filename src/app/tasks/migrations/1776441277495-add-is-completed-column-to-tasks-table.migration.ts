import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIsCompletedColumnToTasksTableMigration1776441277495 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "Tasks"
      ADD COLUMN "Is_completed" INTEGER(1) NOT NULL CHECK ("Is_completed" IN (0, 1)) DEFAULT 0
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "Tasks"
      DROP COLUMN "Is_completed"
    `);
  }
}
