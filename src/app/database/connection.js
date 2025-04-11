import mysql from 'mysql'

const connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'food-list'
})

/**
 * Executa um código SQL com ou sem valores
 * @param {string} sql instrução SQL a ser executada
 * @param {string=id | [food, id]} values a serem passado para o sql, pode ser valor ou nada
 * @param {string} mensageReject mensagem a ser exibida
 * @returns objeto da Promisse
 */

export const query = (sql, values='', mensageReject) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (err, result) => {
                if(err) return reject(mensageReject)

                const row = JSON.parse(JSON.stringify(result))
                return resolve(row)
            })
        })
}

export default connection
