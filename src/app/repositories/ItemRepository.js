import {query} from "../database/connection.js"

class ItemRepository {

    async create(item) {
        const sql = 'INSERT INTO item SET ?;'
        const result = await query(sql, item, 'Não foi possível cadastrar')

        return this.findById(result.insertId) 
    }

    findAll() {
        const sql = 'SELECT * FROM item;'
        return query(sql, 'Não foi possível buscar') 
    }

    findById(id) {
        const sql = 'SELECT * FROM item WHERE id = ?;'
        return query(sql, id, 'Não foi possível buscar o item')
    }

    async update(item, id) {
        const sql = 'UPDATE item SET ? WHERE id = ?;'
        await query(sql, [item, id], 'Não foi possível atualizar')

        const result = await this.findById(id)

        return result
    }

    async delete(id) {
        const sql = 'DELETE FROM item WHERE id = ?;'
        await query(sql, id, 'Não foi possível apagar')

        const result = await this.findById(id)

        return result
    }
    
    async addItemToList(listId, itemId, quantity) {
        const sql = 'INSERT INTO item_list (list_id, item_id, quantity) VALUES (?, ?, ?);'
        return await query (sql, [listId, itemId, quantity], 'Erro ao associar item a Lista')
    }
}

export default new ItemRepository()