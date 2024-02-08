
import { cartsModelo } from "../DAO/models/carts.modelo.js"

async function getCart(req,res){
    
    try {
        let cart =await  cartsModelo.findById(id)
        res.status(200).json({data:cart})
    } catch (error) {
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }
}

async function deleteCart(req,res){
    let cId=req.params.cid.replace("cid=", "")
    try{
        let cart =await  cartsModelo.updateMany({_id:cId},{$pull:{products:{}}})
        res.status(200).json({data:cart})
    } catch(error){
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })
    }
    

}
async function deleteProd(req,res){
    let cId=req.params.cid.replace("cid=", "")
    let pId=req.params.pid.replace("pid=", "")
    try{
        let cart =await  cartsModelo.updateMany({_id:cId},{$pull:{products:{_id:pId}}})
        cart = await cartsModelo.findOne({_id:cId});
        res.status(200).json({data:cart})
    } catch(error){
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })  
    }
}
async function createCart(req,res){
    let pid=req.params.pid.replace("pid=", "")
    let newCart={
        products:[],
    }
    let id=req.params.pid.replace("pid=", "")
    try{
    let producto =await productsModelo.findById(pid)
    let tempProd = {id:pid,quantity:1}
    newCart.products.push(tempProd)
    let resultado = await cartsModelo.create(newCart)
    return res.status(400).json({resultado})
    } catch (error){
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })  
    }

}


async function addNewProd(req,res){
    let cId=req.params.cid.replace("cid=", "")
    let pId=req.params.pid.replace("pid=", "")
    try {
        let carrito = await cartsModelo.findOne({'_id':cId})
        let alreadyPresent = carrito.products.find(product=> product._id === pId)
        if (alreadyPresent){
            alreadyPresent.quantity ++
            let response = await cartsModelo.updateOne({_id:cId, 'products._id':pId},
            {$set:{'products.$.quantity':alreadyPresent.quantity}})
        }   
        else{
            carrito.products.push({quantity:1,_id:pId})
        }
        await carrito.save();
        carrito = await cartsModelo.findOne({_id:cId});
        return res.status(200).json({carrito})
    }
    catch (error){
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })  
    }

}


async function updateProdAmount(req,res){
    let quantity = req.body.quantity
    let cId=req.params.cid.replace("cid=", "")
    let pId=req.params.pid.replace("pid=", "")
    try {
        let carrito = await cartsModelo.updateOne({_id:cId, 'products._id':pId},
        {$set:{'products.$.quantity':quantity}})
        carrito = await cartsModelo.findOne({_id:cId});
        return res.status(200).json({carrito})
    } catch (error){
        return res.status(500).json({
            error:"Error inesperado", detalle:error.message
        })  
    }

}


export default {getCart, deleteCart, deleteProd,createCart,addNewProd,updateProdAmount}