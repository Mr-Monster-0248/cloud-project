import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCheck1646062595858 implements MigrationInterface {
    name = 'AddCheck1646062595858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "CHK_8808baf77c9283877852fa11d2" CHECK (grade BETWEEN 0 AND 5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "CHK_8808baf77c9283877852fa11d2"`);
    }

}
