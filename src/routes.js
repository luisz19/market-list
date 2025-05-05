import { Router } from "express";
import ItemController from './app/controllers/ItemController.js'
import UserController from "./app/controllers/UserController.js";

const router = Router()

//ROTAS
router.get('/item', ItemController.index)
router.get('/item/:id', ItemController.show)
router.post('/item', ItemController.store)
router.delete('/item/:id', ItemController.delete)
router.put('/item/:id', ItemController.update)

router.get('/users', UserController.index)
router.get('/user/:id', UserController.show)
router.post('/register', UserController.store)
router.delete('/user/:id', UserController.delete)
router.put('/user/:id', UserController.update)

export default router