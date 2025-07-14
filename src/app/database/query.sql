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

ALTER TABLE user_list DROP FOREIGN KEY user_list_ibfk_2;
ALTER TABLE item_list DROP FOREIGN KEY item_list_ibfk_2;

-- Recrie as constraints com ON DELETE CASCADE
ALTER TABLE user_list 
ADD CONSTRAINT user_list_ibfk_2 
FOREIGN KEY (list_id) REFERENCES list(id) ON DELETE CASCADE;

ALTER TABLE item_list 
ADD CONSTRAINT item_list_ibfk_2 
FOREIGN KEY (list_id) REFERENCES list(id) ON DELETE CASCADE;

-- Remover a tabela existente user_list
DROP TABLE IF EXISTS user_list;

-- Criar a nova tabela de compartilhamento
CREATE TABLE list_sharing (
    shared_by_user_id INTEGER NOT NULL,
    shared_with_user_id INTEGER NOT NULL,
    list_id INTEGER NOT NULL,
    permission VARCHAR(20) NOT NULL,
    PRIMARY KEY (shared_by_user_id, shared_with_user_id, list_id),
    FOREIGN KEY (shared_by_user_id) REFERENCES user(id),
    FOREIGN KEY (shared_with_user_id) REFERENCES user(id),
    FOREIGN KEY (list_id) REFERENCES list(id) ON DELETE CASCADE
);

ALTER TABLE list_sharing 
MODIFY COLUMN permission ENUM('owner', 'editor', 'visitor') DEFAULT 'visitor' NOT NULL;

ALTER TABLE list_sharing
ADD COLUMN token VARCHAR(255) UNIQUE NOT NULL;

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