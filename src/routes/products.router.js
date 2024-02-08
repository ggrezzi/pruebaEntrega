import { Router } from "express";
import productosController from "../controllers/productosController.js";
export const router=Router()

router.get('/',productosController.getProducts)

router.get('/:pid',productosController.getProductById)

router.post('/', productosController.createProduct)

router.put('/:pid',productosController.updateProduct)

router.delete('/:pid', productosController.deleteProduct)
