import { query } from "../database/connection.js";

class UserRepository {

    async create(user) {
        const sql = 'INSERT INTO user SET ?;'
        const result = await query(sql, user, 'Não foi possível cadastrar usuário')

        return this.findById(result.insertId)
    }

    findAll() {
        const sql = 'SELECT * FROM user'
        return query(sql, 'Não foi possível buscar')
    }

    findById(id) {
        const sql = 'SELECT * FROM user WHERE id = ?'
        return query(sql, id, 'Não foi possível buscar o usuário')
    }

    async existsById(id) {
        const sql = 'SELECT 1 FROM user WHERE id = ? LIMIT 1;'
        const result = await query(sql, id, 'Erro ao verificar se usuário existe')
        return result.length > 0
    }

    async findByEmail(email) {
        const sql = 'SELECT * FROM user WHERE email = ?;';
        const result = await query(sql, email, 'Erro ao buscar usuário');
        return result[0];
    }

    async update(user, id) {
        const sql = 'UPDATE user SET ? WHERE id = ?'
        const result = query(sql, [user, id], 'Não foi possível atualizar o usuário')

        return this.findById(result.insertId)

    }

    async delete(id){
        const sql = 'DELETE FROM user WHERE id = ?'
        return query(sql, id, 'Não foi possível criar o usuário')
    }

}

export default new UserRepository()