import { Router } from "express";
import { productsModelo } from "../DAO/models/products.modelo.js";
import productosController from "../controllers/productosController.js";
export const router=Router()

router.get('/',productosController.getProducts)
router.get('/:pid',productosController.getProductById)


router.post('/', productosController.createProduct)



router.put('/:pid', async(req,res)=>{


    let  pid = req.params.pid.replace("pid=", "");
    let update=req.body 
    console.log(update)
    try{
        let resultado = await productsModelo.updateOne({_id:pid},update)
        return res.status(200).json({resultado})
    } catch(error){
        return res.status(500).json({
            error:"Error al actualizar el proucto", detalle:error.message
        })
    }

});

router.delete('/:pid', async(req,res)=>{
    //borro el producto cuyo id es pid
    let  pid = req.params.pid.replace("pid=", "");

    let resultado = await productsModelo.deleteOne({_id:pid})
    try{
        let resultado = await productsModelo.deleteOne({_id:pid})
        return res.status(200).json({resultado})
    } catch(error){
        return res.status(500).json({
            error:"Error al eliminar el proucto", detalle:error.message
        })
    }


});


