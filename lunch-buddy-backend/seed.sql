DROP DATABASE IF EXISTS lunch_buddy;
CREATE DATABASE lunch_buddy;

\c lunch_buddy;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    email VARCHAR NOT NULL UNIQUE
);

INSERT INTO users
    (email)
VALUES
    ('test@test.com'),
    ('test1@test1.com'),
    ('test2@test2.com')