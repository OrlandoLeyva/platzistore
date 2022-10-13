import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1665698270989 implements MigrationInterface {
  name = 'relationship-products-brands-1665698270989';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" ADD "brandId" integer`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df" FOREIGN KEY ("brandId") REFERENCES "brands"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ea86d0c514c4ecbb5694cbf57df"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "brandId"`);
  }
}
