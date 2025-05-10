import ListReposirtory from "../repositories/ListReposirtory.js";

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
        console.log(req.body)
        const list = req.body
        const row = await ListReposirtory.create(list)

        res.status(201).json(row)
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