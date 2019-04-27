DROP DATABASE IF EXISTS lunch_buddy;
CREATE DATABASE lunch_buddy;

\c lunch_buddy;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email_or_username VARCHAR NOT NULL UNIQUE
);

CREATE TABLE orders
(
    id SERIAL PRIMARY KEY,
    order_name VARCHAR NOT NULL,
    order_creator INT REFERENCES users(id),
    order_status VARCHAR NOT NULL
);

CREATE TABLE order_requests
(
    id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(id),
    user_id INT REFERENCES users(id),
    order_items JSON NULL,
    total INT NULL
);

INSERT INTO users
    (email_or_username)
VALUES
    ('test@test.com'),
    ('username1'),
    ('username2');
