DROP TABLE IF EXISTS 
    balance, 
    users,
    profiles, 
    product_categories, 
    suppliers, 
    products, 
    delivery_orders, 
    transactions,
    projects,
    balance_transactions;

DROP TYPE IF EXISTS user_roles;

CREATE TYPE user_roles AS ENUM ('QS', 'Procurement', 'Project');

CREATE TABLE profiles (
    id UUID NOT NULL REFERENCES auth.users,
    first_name TEXT,
    last_name TEXT,
    role user_roles NOT NULL,
    PRIMARY KEY(id)
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
    photo_paths TEXT[] NOT NULL DEFAULT '{}',
    category_id INTEGER REFERENCES product_categories(id),
    supplier_id INTEGER NOT NULL REFERENCES suppliers(id),
    initial_quantity INTEGER NOT NULL DEFAULT 0,
    current_quantity INTEGER NOT NULL DEFAULT 0,
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
    logger_id UUID NOT NULL REFERENCES profiles(id),
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

CREATE TABLE projects(
    id SERIAL NOT NULL PRIMARY KEY,
    name TEXT NOT NULL,
    initial_balance NUMERIC NOT NULL DEFAULT 0,
    current_balance NUMERIC NOT NULL DEFAULT 0
);

CREATE OR REPLACE FUNCTION set_current_balance()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.current_balance IS NULL THEN
        NEW.current_balance := NEW.initial_balance;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_current_balance
    BEFORE INSERT ON projects
    FOR EACH ROW
    EXECUTE FUNCTION set_current_balance();


CREATE TABLE balance_transactions(
    projectID INTEGER NOT NULL REFERENCES projects(id),
    id SERIAL NOT NULL PRIMARY KEY,
    balance_changed NUMERIC NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    logger_id UUID NOT NULL REFERENCES profiles(id)
);