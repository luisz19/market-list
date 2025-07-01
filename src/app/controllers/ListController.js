import { query } from "../database/connection.js";
import ListRepository from "../repositories/ListRepository.js";
import UserRepository from "../repositories/UserRepository.js";

class ListController {

    
    async index(req, res) {
        const row = await ListRepository.findAll()
        res.status(200).json(row)
    }

    async show(req, res) {
        const id = req.params.id
        const row = await ListRepository.findById(id)

        res.status(200).json(row)
    }

    async store(req, res) {
        const { name, market_name, creator_id, price_total, role_user = 'owner' } = req.body;
    
        try {
            const userExists = await UserRepository.existsById(creator_id)
            if(!userExists) {
                return res.status(404).json({ message: 'Usuário criador não encontrado' });
            }
            const listData = { name, market_name, price_total, creator_id };

            const newList = await ListRepository.create(listData);

            const listId =  newList[0].id;

            await ListRepository.addUserToList(creator_id, listId, role_user);

            return res.status(201).json({ message: 'Lista criada com sucesso', list: newList });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao criar lista' });
        }
    }
    

    async update(req, res) {
        const id = req.params.id
        const list = req.body
        const row = await ListRepository.update(list, id)

        res.status(200).json(row)
    }

    async delete(req, res) {
        const id = req.params.id
        const row = await ListRepository.delete(id)

        res.status(200).json(row)
    }

}

export default new ListController()