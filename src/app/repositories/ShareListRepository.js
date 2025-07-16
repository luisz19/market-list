import { query } from "../database/connection"

class ShareListRepository {
    async create(shareList) {
        const { shared_by_user_id, shared_with_user_id, list_id, permission, token } = shareData;

        const sql = 'INSERT INTO list_sharing SET ?;'
        const result = await query(sql, shareList, 'Não foi possível criar lista compartilhada')

        return this.findById(result.insertId)
    }
    //corrigir inconsistências

    findAll() {
        const sql = 'SELECT * FROM list_sharing;'
        return query(sql, 'Não foi possível buscar listas compartilhadas')
    }

    findById(id) {
        const sql = 'SELECT * FROM list_sharing WHERE id = ?;'
        return query(sql, id, 'Não foi possível buscar a lista compartilhada')
    }

    async getSharedList(listToken, listId) {
        const sql = "SELECT list.id AS list_id, list.name AS list_name, list.market_name, list.price_total, list.date, list_sharing.permission, list_sharing.token FROM list_sharing INNER JOIN list ON list_sharing.list_id = list.id WHERE list_sharing.token = ? AND list.id = ?"

        const result = await query(sql, [listToken, listId], 'Não foi possível buscar lista compartilhada pelo token')

        console.log('Resultado da busca por lista compartilhada:', result)

        return result
    }
    //ver como fazer para pegar por URL

    async update(shareList, id) {
        const sql = 'UPDATE list_sharing SET ? WHERE id = ?;'
        const result = await query(sql, [shareList, id], 'Não foi possível atualizar a lista compartilhada')

        return this.findById(result.insertId)
    }

    async delete(id) {
        const sql = 'DELETE FROM list_sharing WHERE id = ?'
        return query(sql, id, 'Não foi possível deletar lista compartilhada')
    }
}