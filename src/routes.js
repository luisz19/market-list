import { Router } from "express";
import ItemController from './app/controllers/ItemController.js'
import UserController from "./app/controllers/UserController.js";
import ListController from "./app/controllers/ListController.js";
import ShareListController from "./app/controllers/ShareListController.js";

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
router.post('/login', UserController.login)

router.get('/lists', ListController.index)
router.get('/list/:id', ListController.show)
router.post('/lists', ListController.store)
router.delete('/list/:id', ListController.delete)
router.put('/list/:id', ListController.update)

router.post('/list/:id/sharing', ShareListController.store)
router.get('/shared-lists', ShareListController.index)
router.get('/shared-list/token/:token', ShareListController.show)
router.put('/shared-list/:id', ShareListController.update)
router.delete('/shared-list/:id', ShareListController.delete)

export default router