import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateDatabase1646061086161 implements MigrationInterface {
    name = 'CreateDatabase1646061086161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("review_id" SERIAL NOT NULL, "content" character varying, "grade" integer NOT NULL, "reviewerUserId" integer, "restaurantRestaurantId" integer, CONSTRAINT "PK_0106a233019ba9f4ee80aca2958" PRIMARY KEY ("review_id"))`);
        await queryRunner.query(`CREATE TABLE "restaurant" ("restaurant_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "address" character varying NOT NULL, "imgUrl" integer, "ownerUserId" integer, CONSTRAINT "REL_b0858c04ae6b73fc12cdd55e84" UNIQUE ("ownerUserId"), CONSTRAINT "PK_2ff37383b35fc0eb287bc534191" PRIMARY KEY ("restaurant_id"))`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_32d294ff46129d3bc76f74c1574" FOREIGN KEY ("reviewerUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_68b54d7a337dd8044c1132bfa47" FOREIGN KEY ("restaurantRestaurantId") REFERENCES "restaurant"("restaurant_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_b0858c04ae6b73fc12cdd55e84a" FOREIGN KEY ("ownerUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_b0858c04ae6b73fc12cdd55e84a"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_68b54d7a337dd8044c1132bfa47"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_32d294ff46129d3bc76f74c1574"`);
        await queryRunner.query(`DROP TABLE "restaurant"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
