DROP TABLE IF EXISTS product_categories, products;

-- CREATE TYPE user_roles AS ENUM ('QS, Procurement, Project')

-- CREATE TABLE users (
--     id SERIAL NOT NULL PRIMARY KEY,
--     first_name TEXT NOT NULL,
--     last_name TEXT NOT NULL,
--     username VARCHAR(10) NOT NULL,
--     password TEXT NOT NULL,
--     role user_roles NOT NULL
-- )

CREATE TABLE product_categories(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

-- CREATE TABLE suppliers(
--     id SERIAL NOT NULL PRIMARY KEY,
--     name TEXT NOT NULL
-- )

CREATE TABLE products (
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    cost NUMERIC(10, 2) NOT NULL,
    photo_paths TEXT[] NOT NULL DEFAULT '{"./default_missing.jng"}',
    url TEXT,
    category_id INTEGER REFERENCES product_categories(ID),
    -- supplier_id INTEGER NOT NULL REFERENCES Supplier(ID)
    initial_quantity INTEGER NOT NULL DEFAULT 0
);

-- CREATE TABLE ProductLog(
--     id SERIAL NOT NULL PRIMARY KEY,
--     created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
--     creator_id SERIAL NOT NULL REFERENCES
--     product_id SERIAL NOT NULL,
--     quantity_changed SMALLINT NOT NULL
-- )
