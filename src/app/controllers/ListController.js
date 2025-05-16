import { query } from "../database/connection.js";
import ListReposirtory from "../repositories/ListReposirtory.js";
import UserRepository from "../repositories/UserRepository.js";

class ListController {

    
    async index(req, res) {
        const row = await ListReposirtory.findAll()
        res.status(200).json(row)
    }

    async show(req, res) {
        const id = req.params.id
        const row = await ListReposirtory.findById(id)

        res.status(200).json(row)
    }

    async store(req, res) {
        const { name, market_name, creator_id, total_price, role_user = 'owner' } = req.body;
    
        try {
            const userExists = await UserRepository.existsById(creator_id)
            if(!userExists) {
                return res.status(404).json({ message: 'Usuário criador não encontrado' });
            }
            const listData = { name, market_name, total_price, creator_id };

            const newList = await ListReposirtory.create(listData);

            const listId =  newList[0].id;

            await ListReposirtory.addUserToList(creator_id, listId, role_user);

            return res.status(201).json({ message: 'Lista criada com sucesso', list: newList });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao criar lista' });
        }
    }
    

    async update(req, res) {
        const id = req.params.id
        const list = req.body
        const row = await ListReposirtory.update(list, id)

        res.status(200).json(row)
    }

    async delete(req, res) {
        const id = req.params.id
        const row = await ListReposirtory.delete(id)

        res.status(200).json(row)
    }

}

export default new ListController()