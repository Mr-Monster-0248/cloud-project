import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCascade1646162058190 implements MigrationInterface {
    name = 'AddCascade1646162058190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_32d294ff46129d3bc76f74c1574"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_68b54d7a337dd8044c1132bfa47"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "imgUrl"`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "imgUrl" character varying`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_32d294ff46129d3bc76f74c1574" FOREIGN KEY ("reviewerUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_68b54d7a337dd8044c1132bfa47" FOREIGN KEY ("restaurantRestaurantId") REFERENCES "restaurant"("restaurant_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_68b54d7a337dd8044c1132bfa47"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_32d294ff46129d3bc76f74c1574"`);
        await queryRunner.query(`ALTER TABLE "restaurant" DROP COLUMN "imgUrl"`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD "imgUrl" integer`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_68b54d7a337dd8044c1132bfa47" FOREIGN KEY ("restaurantRestaurantId") REFERENCES "restaurant"("restaurant_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_32d294ff46129d3bc76f74c1574" FOREIGN KEY ("reviewerUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
