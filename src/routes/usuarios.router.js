import { Router } from "express";
import usuariosController from "../controllers/usuariosController.js";
export const router=Router()

router.get('/',usuariosController.getUsers)

router.get('/:uid',usuariosController.getUserById)
router.get('/:email',usuariosController.getUserByEmail)

router.post('/', usuariosController.postUser)



