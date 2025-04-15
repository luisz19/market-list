import FoodRepository from '../repositories/FoodRepository.js'


class FoodController {

    async index(req, res) { 
        const row = await FoodRepository.findAll()
        res.json(row)
         
    } 

    async show(req, res) {
        const id = req.params.id
        const row = await FoodRepository.findById(id)

        res.json(row)
    }
    
    async store(req, res) {
        console.log("Body recebido:", req.body);
        const food = req.body
        const row = await FoodRepository.create(food)
        res.json(row)
    }

    async update(req, res) {
        console.log("Body recebido:", req.body);
        const id = req.params.id
        const food = req.body
        
        const row = await FoodRepository.update(food, id)
        res.json(row)
    }

    async delete(req, res) {
        const id = req.params.id
        
        const row = await FoodRepository.delete(id)
        res.json(row)
    }

}

export default new FoodController()
