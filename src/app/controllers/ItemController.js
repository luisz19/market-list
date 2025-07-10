import ItemRepository from '../repositories/ItemRepository.js'
import ListRepository from '../repositories/ListRepository.js'


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
    let listId = 5
    let quantityItem = 20
    
    const {name, category, price, list_id = listId, quantity = quantityItem} = req.body

    //os valores listId, quantity e list_id são hardcoded para teste

    // serão passados pelo body da requisição no frontend (guardar valor na variavel e passar no body)
    

    console.log("Body recebido:", req.body);

    try {
        const listExists = await ListRepository.findById(listId)
        console.log("Lista encontrada:", listExists); //item hardcoded para teste

        if(!listExists || listExists.length === 0) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }
        
        const itemData = {name, category, price}
        const newItem = await ItemRepository.create(itemData);
        console.log("Item criado:", newItem)

        let itemId;
        if (Array.isArray(newItem) && newItem.length > 0){
            itemId = newItem[0].id;
        } else if (newItem.id) {
            itemId = newItem.id;
        } else {
            throw new Error('ID do item não encontrado na resposta');
        }

        await ItemRepository.addItemToList(list_id, itemId, quantity);

        return res.status(201).json({ 
            message: 'Item criado e associado à lista com sucesso', 
            item: newItem 
        });

    } catch (error) {
        console.error("Erro ao criar item:", error);
        return res.status(500).json({ message: 'Erro ao criar item' });
    }
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
