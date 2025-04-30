import mysql from 'mysql'

const PASSWORD = process.env.SQL_PASSWORD
const NAME = process.env.SQL_NAME_DATABASE
const PORT = process.env.SQL_PORT
const USER = process.env.SQL_USER
const HOST = process.env.SQL_HOST


const connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: USER,
    password: PASSWORD,
    database: NAME
})

/**
 * Executa um código SQL com ou sem valores
 * @param {string} sql instrução SQL a ser executada
 * @param {string=id | [item, id]} values a serem passado para o sql, pode ser valor ou nada
 * @param {string} mensageReject mensagem a ser exibida
 * @returns objeto da Promisse
 */

export const query = (sql, values='', mensageReject) => {
        return new Promise((resolve, reject) => {
            connection.query(sql, values, (err, result) => {
                if (err) {
                    console.error("Erro MySQL:", err)
                    return reject(mensageReject)
                }
                

                const row = JSON.parse(JSON.stringify(result))
                return resolve(row)
            })
        })
}

export default connection
