CREATE TABLE user (
    id AUTO INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Criação da tabela de listas
CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    market_name VARCHAR(100),
    price_total DECIMAL(10,2),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    creator_id INTEGER NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES user(id)
);

-- Criação da tabela de itens
CREATE TABLE item (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10,2)
);

-- Criação da tabela associativa entre usuários e listas
CREATE TABLE user_list (
    user_id INTEGER NOT NULL,
    list_id INTEGER NOT NULL,
    role_user VARCHAR(20) NOT NULL,
    PRIMARY KEY (user_id, list_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (list_id) REFERENCES list(id)
);

-- Criação da tabela associativa entre itens e listas
CREATE TABLE item_list (
    item_id INTEGER NOT NULL,
    list_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (item_id, list_id),
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (list_id) REFERENCES list(id)
);