import {MigrationInterface, QueryRunner} from "typeorm";

export class AddAddressUnique1647191066851 implements MigrationInterface {
    name = 'AddAddressUnique1647191066851'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "UQ_9bf1c0e73dde0f6d1c3ff4f89a5" UNIQUE ("address")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "UQ_9bf1c0e73dde0f6d1c3ff4f89a5"`);
    }

}
