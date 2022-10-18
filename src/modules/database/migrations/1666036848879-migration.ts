import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1666036848879 implements MigrationInterface {
    name = 'migration1666036848879'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_9909fbece7e54d00c3fee1dfa2" ON "products" ("price", "brandId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_9909fbece7e54d00c3fee1dfa2"`);
    }

}
