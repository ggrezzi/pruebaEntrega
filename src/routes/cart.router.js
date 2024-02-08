
import { Router } from "express";
import cartsController from "../controllers/cartsController.js";
export const router=Router()

router.get('/:cid',cartsController.getCart)
router.delete('/:cid',cartsController.deleteCart)
router.delete('/:cid/product/:pid',cartsController.deleteProd)

router.post('/:pid',cartsController.createCart)

router.post('/:cid/product/:pid',cartsController.addNewProd)

router.put('/:cid/product/:pid',cartsController.updateProdAmount)






