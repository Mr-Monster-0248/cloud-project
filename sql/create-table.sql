DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS reviews CASCADE;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE restaurants (
    restaurant_id SERIAL PRIMARY KEY,
    owner_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(300),
    address VARCHAR(150) NOT NULL,
    img_url VARCHAR(150),
    CONSTRAINT fk_owner
        FOREIGN KEY (owner_id)
            REFERENCES users(user_id)
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL,
    user_id INT NOT NULL,
    content VARCHAR(300),
    grade SMALLINT NOT NULL,
    CONSTRAINT fk_restaurant
        FOREIGN KEY (restaurant_id)
            REFERENCES restaurants(restaurant_id),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
            REFERENCES users(user_id),
    CHECK ( grade BETWEEN 0 AND 5)
)