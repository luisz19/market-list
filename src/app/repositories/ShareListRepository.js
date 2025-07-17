import { query } from "../database/connection.js";

class ShareListRepository {
    async create(shareList) {

        const sql = 'INSERT INTO list_sharing SET ?;'
        const result = await query(sql, shareList, 'Não foi possível criar lista compartilhada')
        console.log('Lista compartilhada criada com sucesso!')

        return result
    }

    findAll() {
        const sql = 'SELECT * FROM list_sharing;'
        return query(sql, 'Não foi possível buscar listas compartilhadas')
    }

    async findByToken(token) {
        const sql = `
            SELECT 
                ls.*, 
                l.name as list_name, 
                l.market_name, 
                l.price_total, 
                l.date,
                u.name as owner_name
            FROM list_sharing ls
            INNER JOIN list l ON ls.list_id = l.id
            INNER JOIN user u ON ls.shared_by_user_id = u.id
            WHERE ls.token = ?
        `;
        
        const result = await query(sql, [token], 'Não foi possível buscar lista pelo token');
        return result[0];
    }

    async findByPermission(listId, userId) {
        const sql = `
            SELECT * FROM list_sharing
            WHERE list_id = ? AND shared_with_user_id = ?
            ORDER BY shared_by_user_id DESC LIMIT 1
        `

        const result = await query(sql, [listId, userId], 'Não foi possível buscar lista compartilhada por permissão')

        return result[0]
    }

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

export default new ShareListRepository()