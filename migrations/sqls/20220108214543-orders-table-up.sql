create type order_status as enum('active', 'complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
     user_id INTEGER NOT NULL REFERENCES users(id),
     status order_status NOT NULL,
     total float NOT NULL
     );