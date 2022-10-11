import { MigrationInterface, QueryRunner } from "typeorm";

export class initialTables1665514698687 implements MigrationInterface {
    name = 'initialTables1665514698687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "owner" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "owner"`);
    }

}
