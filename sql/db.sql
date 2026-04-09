DROP TABLE IF EXISTS 
    users, 
    product_categories, 
    suppliers, 
    products, 
    delivery_orders, 
    transactions;

DROP TYPE IF EXISTS user_roles;

CREATE TYPE user_roles AS ENUM ('QS', 'Procurement', 'Project');

CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    username VARCHAR(10) NOT NULL,
    password TEXT NOT NULL,
    role user_roles NOT NULL
);

CREATE TABLE product_categories(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE suppliers(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL
);

CREATE TABLE products (
    product_id TEXT NOT NULL UNIQUE,
    master_id TEXT NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    photo_paths TEXT[] NOT NULL DEFAULT '{""}',
    category_id INTEGER REFERENCES product_categories(id),
    supplier_id INTEGER NOT NULL REFERENCES suppliers(id),
    initial_quantity INTEGER NOT NULL DEFAULT 0,
    current_quantity INTEGER NOT NULL DEFAULT NULL,
    disabled BOOLEAN NOT NULL DEFAULT false
);

CREATE OR REPLACE FUNCTION set_current_quantity()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.current_quantity IS NULL THEN
        NEW.current_quantity := NEW.initial_quantity;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_current_quantity
    BEFORE INSERT ON products
    FOR EACH ROW
    EXECUTE FUNCTION set_current_quantity();

CREATE TABLE delivery_orders(
    id SERIAL NOT NULL PRIMARY KEY,
    order_id TEXT NOT NULL,
    order_date DATE NOT NULL,
    supplier_id INTEGER NOT NULL REFERENCES suppliers(id),
    UNIQUE(order_id, supplier_id)
);

CREATE TABLE transactions(
    id SERIAL NOT NULL PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    logger_id INTEGER NOT NULL REFERENCES users(id),
    product_id TEXT NOT NULL REFERENCES products(master_id),
    quantity_changed INTEGER NOT NULL,
    delivery_id INTEGER REFERENCES delivery_orders(id),
    UNIQUE(product_id, delivery_id),
    CONSTRAINT valid_transaction CHECK (
      (quantity_changed > 0 AND delivery_id IS NOT NULL) 
      OR
      (quantity_changed < 0 AND delivery_id IS NULL)
      )
);