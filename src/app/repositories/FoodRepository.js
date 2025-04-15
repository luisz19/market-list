import {query} from "../database/connection.js"

class FoodRepository {

    //caso mude o DB, é necessário refatorar
    async create(food) {
        const sql = 'INSERT INTO food SET ?;'
        const result = await query(sql, food, 'Não foi possível cadastrar')

        return this.findById(result.insertId) //aqui utiliza async await pq tem que esperar o resultado para depois fazer a query
        
    }

    findAll() {
        const sql = 'SELECT * FROM food;'
        return query(sql, 'Não foi possível buscar') //nao utiliza async await pq a Promise omite 
    }

    findById(id) {
        const sql = 'SELECT * FROM food WHERE id = ?;'
        return query(sql, id, 'Não foi possível buscar o item')
    }

    async update(food, id) {
        const sql = 'UPDATE food SET ? WHERE id = ?;'
        await query(sql, [food, id], 'Não foi possível atualizar')

        const result = await this.findById(id)

        return result
    }

    async delete(id) {
        const sql = 'DELETE FROM food WHERE id = ?;'
        await query(sql, id, 'Não foi possível apagar')

        const result = await this.findById(id)

        return result
    }
}

export default new FoodRepository()