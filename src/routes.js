import { Router } from "express";
import FoodController from './app/controllers/FoodController.js'

const router = Router()

//ROTAS
router.get('/food', FoodController.index)
router.get('/food/:id', FoodController.show)
router.post('/food', FoodController.store)
router.delete('/food/:id', FoodController.delete)
router.put('/food/:id', FoodController.update)

export default router