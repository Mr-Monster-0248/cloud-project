import {MigrationInterface, QueryRunner} from "typeorm";

export class PopulateDatabase1646061448860 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "user" (user_id, username, password) VALUES (1, 'Ruben', 'ab4f63f9ac65152575886860dde480a1')`);
        await queryRunner.query(`INSERT INTO "user" (user_id, username, password) VALUES (2, 'Thibault', 'd8578edf8458ce06fbc5bb76a58c5ca4')`);
        await queryRunner.query(`INSERT INTO "user" (user_id, username, password) VALUES (3, 'Daniil', '530ea1472e71035353d32d341ecf6343')`);

        await queryRunner.query(`INSERT INTO restaurant (restaurant_id, "ownerUserId", name, description, address) VALUES (1, 3, 'Bielorusian food', 'The best villejuif restaurant', '31 avenue de la republique, Villejuif')`);

        await queryRunner.query(`INSERT INTO review ("restaurantRestaurantId", "reviewerUserId", content, grade) VALUES (1, 1, 'Was ok... ish', 2)`);
        await queryRunner.query(`INSERT INTO review ("restaurantRestaurantId", "reviewerUserId", content, grade) VALUES (1, 2, 'Just amazing', 5)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM review WHERE review_id = 1`);
        await queryRunner.query(`DELETE FROM review WHERE review_id = 2`);

        await queryRunner.query(`DELETE FROM restaurant WHERE restaurant_id = 1`);

        await queryRunner.query(`DELETE FROM "user" WHERE user_id = 1`);
        await queryRunner.query(`DELETE FROM "user" WHERE user_id = 2`);
        await queryRunner.query(`DELETE FROM "user" WHERE user_id = 3`);
    }

}
