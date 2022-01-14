CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
     product_id integer NOT NULL REFERENCES products(id),
     quantity integer NOT NULL,
     order_id integer REFERENCES orders(id) 
     );