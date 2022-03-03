"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDatabase1646172743261 = void 0;
const tslib_1 = require("tslib");
class CreateDatabase1646172743261 {
    constructor() {
        this.name = 'CreateDatabase1646172743261';
    }
    up(queryRunner) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "user" ("user_id" SERIAL NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "token" character varying NOT NULL, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_a854e557b1b14814750c7c7b0c9" UNIQUE ("token"), CONSTRAINT "PK_758b8ce7c18b9d347461b30228d" PRIMARY KEY ("user_id"))`);
            yield queryRunner.query(`CREATE TABLE "restaurant" ("restaurant_id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying, "address" character varying NOT NULL, "imgUrl" character varying, "ownerUserId" integer, CONSTRAINT "REL_b0858c04ae6b73fc12cdd55e84" UNIQUE ("ownerUserId"), CONSTRAINT "PK_2ff37383b35fc0eb287bc534191" PRIMARY KEY ("restaurant_id"))`);
            yield queryRunner.query(`CREATE TABLE "review" ("review_id" SERIAL NOT NULL, "content" character varying, "grade" integer NOT NULL, "reviewerUserId" integer, "restaurantRestaurantId" integer, CONSTRAINT "CHK_8808baf77c9283877852fa11d2" CHECK (grade BETWEEN 0 AND 5), CONSTRAINT "PK_0106a233019ba9f4ee80aca2958" PRIMARY KEY ("review_id"))`);
            yield queryRunner.query(`ALTER TABLE "restaurant" ADD CONSTRAINT "FK_b0858c04ae6b73fc12cdd55e84a" FOREIGN KEY ("ownerUserId") REFERENCES "user"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_32d294ff46129d3bc76f74c1574" FOREIGN KEY ("reviewerUserId") REFERENCES "user"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_68b54d7a337dd8044c1132bfa47" FOREIGN KEY ("restaurantRestaurantId") REFERENCES "restaurant"("restaurant_id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_68b54d7a337dd8044c1132bfa47"`);
            yield queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_32d294ff46129d3bc76f74c1574"`);
            yield queryRunner.query(`ALTER TABLE "restaurant" DROP CONSTRAINT "FK_b0858c04ae6b73fc12cdd55e84a"`);
            yield queryRunner.query(`DROP TABLE "review"`);
            yield queryRunner.query(`DROP TABLE "restaurant"`);
            yield queryRunner.query(`DROP TABLE "user"`);
        });
    }
}
exports.CreateDatabase1646172743261 = CreateDatabase1646172743261;
