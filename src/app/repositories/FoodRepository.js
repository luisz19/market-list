import {query} from "../database/connection.js"

class FoodRepository {

    //caso mude o DB, é necessário refatorar
    create(food) {
        const sql = 'INSERT INTO food SET ?;'
        return query(sql, food, 'Não foi possível cadastrar')
    }

    findAll() {
        const sql = 'SELECT * FROM food;'
        return query(sql, 'Não foi possível buscar')
    }

    findById(id) {
        const sql = 'SELECT * FROM food WHERE id = ?;'
        return query(sql, id, 'Não foi possível buscar o item')
    }

    update(food, id) {
        const sql = 'UPDATE food SET ? WHERE id = ?;'
        return query(sql, [food, id], 'Não foi possível atualizar')
    }

    delete(id) {
        const sql = 'DELETE FROM food WHERE id = ?;'
        return query(sql, id, 'Não foi possível apagar')
    }
}

export default new FoodRepository()