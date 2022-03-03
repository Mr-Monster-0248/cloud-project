INSERT INTO "user" (user_id, username, password, token) VALUES (1, 'Ruben', 'ab4f63f9ac65152575886860dde480a1', 'c8cd21dd-e114-4cdc-919c-01e84a83112f');
INSERT INTO "user" (user_id, username, password, token) VALUES (2, 'Thibault', 'd8578edf8458ce06fbc5bb76a58c5ca4', '900eccd4-2eb7-4a49-9511-899ba4f076c1');
INSERT INTO "user" (user_id, username, password, token) VALUES (3, 'Daniil', '530ea1472e71035353d32d341ecf6343', '41afb5b9-cd49-4b54-958b-655092a6f3ec');

INSERT INTO restaurant (restaurant_id, "ownerUserId", name, description, address) VALUES (1, 3, 'Bielorusian food', 'The best villejuif restaurant', '31 avenue de la republique, Villejuif');

INSERT INTO review ("restaurantRestaurantId", "reviewerUserId", content, grade) VALUES (1, 1, 'Was ok... ish', 2);
INSERT INTO review ("restaurantRestaurantId", "reviewerUserId", content, grade) VALUES (1, 2, 'Just amazing', 5);