import ItemRepository from '../repositories/ItemRepository.js'


class ItemController {

    async index(req, res) { 
        const row = await ItemRepository.findAll()
        res.json(row)
         
    } 

    async show(req, res) {
        const id = req.params.id
        const row = await ItemRepository.findById(id)

        res.json(row)
    }
    
    async store(req, res) {
        console.log("Body recebido:", req.body);
        const item = req.body
        const row = await ItemRepository.create(item)
        res.json(row)
    }

    async update(req, res) {
        console.log("Body recebido:", req.body);
        const id = req.params.id
        const item = req.body
        
        const row = await ItemRepository.update(item, id)
        res.json(row)
    }

    async delete(req, res) {
        const id = req.params.id
        
        const row = await ItemRepository.delete(id)
        res.json(row)
    }

}

export default new ItemController()
