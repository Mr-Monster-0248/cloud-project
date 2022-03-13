INSERT INTO "user" (username, password, token) VALUES ('Ruben', 'ab4f63f9ac65152575886860dde480a1', 'c8cd21dd-e114-4cdc-919c-01e84a83112f');
INSERT INTO "user" (username, password, token) VALUES ('Thibault', 'd8578edf8458ce06fbc5bb76a58c5ca4', '900eccd4-2eb7-4a49-9511-899ba4f076c1');
INSERT INTO "user" (username, password, token) VALUES ('Daniil', '530ea1472e71035353d32d341ecf6343', '41afb5b9-cd49-4b54-958b-655092a6f3ec');

INSERT INTO restaurant ("ownerUserId", name, description, address)
SELECT user_id, 'Bielorussian food', 'The best villejuif restaurant', '31 avenue de la republique, Villejuif'
FROM "user"
WHERE username = 'Daniil';

INSERT INTO review ("restaurantRestaurantId", "reviewerUserId", content, grade)
SELECT restaurant_id, user_id, 'Just amazing', 5
FROM "user", "restaurant"
WHERE username = 'Ruben' AND restaurant.name = 'Bielorussian food';

INSERT INTO review ("restaurantRestaurantId", "reviewerUserId", content, grade)
SELECT restaurant_id, user_id, 'Was ok... ish', 2
FROM "user", restaurant
WHERE username = 'Thibault' AND restaurant.name = 'Bielorussian food';
