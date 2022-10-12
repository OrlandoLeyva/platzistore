import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1665519261174 implements MigrationInterface {
  name = 'added-fields-to-products-1665519261174';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "updatedAt"`);
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "createdAt"`);
  }
}
