CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    userName VARCHAR(100) UNIQUE NOT NULL,
     firstName VARCHAR(100) NOT NULL,
     lastName VARCHAR(100) NOT NULL,
     password VARCHAR(255) NOT NULL
     );