CREATE TABLE user (
    id AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Criação da tabela de listas
CREATE TABLE list (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE,
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

-- Criação da tabela associativa entre itens e listas
CREATE TABLE item_list (
    item_id INTEGER NOT NULL,
    list_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (item_id, list_id),
    FOREIGN KEY (item_id) REFERENCES item(id),
    FOREIGN KEY (list_id) REFERENCES list(id) ON DELETE CASCADE
);

-- Criar a nova tabela de compartilhamento
CREATE TABLE list_sharing (
    id SERIAL NOT NULL,
    shared_by_user_id INTEGER NOT NULL,
    shared_with_user_id INTEGER NOT NULL,
    list_id INTEGER NOT NULL,
    permission ENUM('owner', 'editor', 'visitor') NOT NULL DEFAULT 'visitor',
    token VARCHAR(255) UNIQUE NOT NULL,
    PRIMARY KEY (shared_by_user_id, shared_with_user_id, list_id),
    FOREIGN KEY (shared_by_user_id) REFERENCES user(id),
    FOREIGN KEY (shared_with_user_id) REFERENCES user(id),
    FOREIGN KEY (list_id) REFERENCES list(id) ON DELETE CASCADE
);


-- Opcional: Adicionar trigger ou lógica no ListController para incluir o criador automaticamente
-- Exemplo de trigger (ajuste conforme seu banco):
/*
DELIMITER //
CREATE TRIGGER after_list_insert
AFTER INSERT ON list
FOR EACH ROW
BEGIN
    INSERT INTO list_sharing (shared_by_user_id, shared_with_user_id, list_id, permission)
    VALUES (NEW.creator_id, NEW.creator_id, NEW.id, 'owner');
END//
DELIMITER ;
*/