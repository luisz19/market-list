import { Router } from "express";
import ItemController from './app/controllers/ItemController.js'

const router = Router()

//ROTAS
router.get('/item', ItemController.index)
router.get('/item/:id', ItemController.show)
router.post('/item', ItemController.store)
router.delete('/item/:id', ItemController.delete)
router.put('/item/:id', ItemController.update)

export default router