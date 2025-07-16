import ShareListRepository from '../repositories/ShareListRepository.js'
const crypto = require('crypto')

class ShareListController {
    async index(req, res) {
        const row = await ShareListRepository.findAll()
        res.status(200).json(row)
    }

    async show (req, res) {
        const id = req.params.id
        const row = await ShareListRepository.findById(id)
        res.status(200).json(row)
    }

    async store (req, res) {
        const tokenToSharing = crypto.randomBytes(16).toString('hex')

        console.log('Token gerado para compartilhamento:', tokenToSharing) 
        const { shared_by_user_id, shared_with_user_id, list_id, permission, token  } = req.body

        if (!shared_by_user_id || !shared_with_user_id || !list_id || !permission || !token) {
            return res.status(400).json({ message: 'Erro ao obter dados' })
        }

        const shareListData = { shared_by_user_id, shared_with_user_id, list_id, permission, token: tokenToSharing }
        const row = await ShareListRepository.create(shareListData)

        res.status(201).json(row)
    }

    async update(req, res) {
        const id = req.params.id
        const shareListData = req.body
        const row = await ShareListRepository.update(shareListData, id)

        res.status(200).json(row)
    }

    async delete(req, res) {
        const id = req.params.id
        const row = await ShareListRepository.delete(id)

        res.status(200).json(row)
    }
}

export default new ShareListController()