import {query} from "../database/connection.js"

class ItemRepository {

    //caso mude o DB, é necessário refatorar
    async create(item) {
        const sql = 'INSERT INTO item SET ?;'
        const result = await query(sql, item, 'Não foi possível cadastrar')

        return this.findById(result.insertId) //aqui utiliza async await pq tem que esperar o resultado para depois fazer a query
        
    }

    findAll() {
        const sql = 'SELECT * FROM item;'
        return query(sql, 'Não foi possível buscar') //nao utiliza async await pq a Promise omite 
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
}

export default new ItemRepository()