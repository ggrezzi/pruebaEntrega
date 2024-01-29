import { Router } from "express";
import { productsModelo } from "../DAO/models/products.modelo.js";
import productosController from "../controllers/productosController.js";
export const router=Router()



router.get('/',productosController.getProducts)


router.get('/:pid',productosController.getProductById)



router.post('/', async (req,res)=>{
    //debo agregar un nuevo producto a la lista de productos.
    let nuevoProducto = req.body
    let resultado = await productsModelo.create(nuevoProducto)
    return res.status(400).json({resultado})

});

router.put('/:pid', async (req,res)=>{
    //modifico el producto cuyo id es pid
    let pid=(req.params.pid)
    let update=req.body 
    let resultado = await productsModelo.updateOne({_id:pid},update)
    if (resultado.acknowledged==true){return res.status(200).json({resultado})}
    else{
       return res.status(400).json({resultado})
    }

});

router.delete('/:pid', async(req,res)=>{
    //borro el producto cuyo id es pid
    let pid=req.params.pid

    let resultado = await productsModelo.deleteOne({_id:pid})
    if (resultado.acknowledged==true){return res.status(200).json({resultado})}
    else{
       return res.status(400).json({resultado})
    }
});


