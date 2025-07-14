class ShareListRepository {
    async create(shareList) {
        const sql = 'INSERT INTO share_list SET ?;'
        const result = await query(sql, shareList, 'Não foi possível cadastrar lista compartilhada')

        return this.findById(result.insertId)
    }

    findAll() {
        const sql = 'SELECT * FROM share_list;'
        return query(sql, 'Não foi possível buscar listas compartilhadas')
    }

    findById(id) {
        const sql = 'SELECT * FROM share_list WHERE id = ?;'
        return query(sql, id, 'Não foi possível buscar a lista compartilhada')
    }

    async update(shareList, id) {
        const sql = 'UPDATE share_list SET ? WHERE id = ?;'
        const result = await query(sql, [shareList, id], 'Não foi possível atualizar a lista compartilhada')

        return this.findById(result.insertId)
    }

    async delete(id) {
        const sql = 'DELETE FROM share_list WHERE id = ?'
        return query(sql, id, 'Não foi possível deletar lista compartilhada')
    }
}