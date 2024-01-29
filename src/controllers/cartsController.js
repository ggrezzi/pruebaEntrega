import { cartsService } from "../../services/carts.service.js"


async function getCart(req,res){

    try {
        let cart=await cartsService.getCart()
    
        return res.status(200).json({
            cart
        })
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
      
    }
}

async function getCartById(req,res){

    try {
        let cart=await cartsService.getCartById(req.params.id)
    
        return res.status(200).json({
            cart
        })
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
      
    }
}






async function postCart(req, res){
    let {nombre, email}=req.body
    if(!nombre || !email) return res.status(400).json({error:"Complete todos los datos"})

    
    try {
        // validar usuario existente...
        let usuarios=await usuariosService.getUsers()
        let existe=usuarios.find(u=>u.email===email)
        if(existe) return res.status(400).json({error:`Usuario con email ${email} existente en BD`})

        let usuarioNuevo=await usuariosService.createUser(nombre, email)
        return res.status(201).json({usuarioNuevo})
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }


}

export default {getUsers, postUser, getUserById, getUserByEmail}