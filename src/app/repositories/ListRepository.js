import { query } from "../database/connection.js"

class ListRepository {
    async create (list) {
        const sql = 'INSERT INTO list SET ?;'
        const result = await query (sql, list, 'Não foi possível cadastrar lista')

        return this.findById(result.insertId)
    }

    findAll() {
        const sql = 'SELECT * FROM list;'
        return query(sql, 'Não foi possível buscar')
    }

    findById(id) {
        const sql = 'SELECT * FROM list WHERE id = ?;'
        return query(sql, id, 'Não foi possível buscar a lista')
    }

    async update (list, id) {
        const sql = 'UPDATE list SET ? WHERE id = ?;'
        const result = query(sql, [list, id], 'Não foi possível atualizar a lista')

        return this.findById(result.insertId)
    } 

    async delete(id) {
        const sql = 'DELETE FROM list WHERE id = ?'
        return query(sql, id, 'Não foi possível deletar lista')
    }

    async addUserToList(userId, listId, user_role = 'owner') {
        const sql = 'INSERT INTO user_list (user_id, list_id, role_user) VALUES (?, ?, ?);'
        return await query(sql, [userId, listId, user_role], 'Não foi possível associar lista ao usuário')
    }

    

}

export default new ListRepository()