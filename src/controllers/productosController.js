
import { productsModelo } from "../DAO/models/products.modelo.js";
import { productsService } from "../services/products.service.js";

async function getProducts (req,res){

    try {
        let   limite = parseInt(req.query.limit);
        if(!limite) limite=10
        let    pagina = req.query.page;
        let    sort = req.query.sort;
        let    type =  req.query.query;
        if (!sort) sort="asc"
        if (!type) type="";
        if(!pagina) pagina=1
        let products=[]
        if (type){
            products =await  productsModelo.paginate({category:type},{limit:limite,lean:true, page:pagina,sort:{price:sort}});
            res.setHeader('Content-Type','text/html');
            let { totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage } = products
            res.status(200).render('products',{
                products:products.docs,
                totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                limite
            });
        }
        else{
            products =await  productsModelo.paginate({},{limit:limite,lean:true, page:pagina,sort:{price:sort}});
            res.setHeader('Content-Type','text/html');
            let { totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage } = products

            res.status(200).render('products',{
                products:products.docs,
                totalPages,
                hasPrevPage,
                hasNextPage,
                prevPage,
                nextPage,
                limite
            }); 
        }
    } catch (error){
        return res.status(500).json({
            error:"Error inesperado",detalle:error.message
        })
    }
   
}

async function getProductById (req,res){
    let  pid = req.params.pid.replace("pid=", "");
    try{
        let product=await productsService.getProductById(pid)
        return res.status(200).json({product})
    } catch(error){
        return res.status(500).json({
            error:"Error al buscar el proucto", detalle:error.message
        })
    }
}



async function createProduct (req,res){

    let nuevoProducto = req.body
    try{
        let resultado = await productsService.createProducts(nuevoProducto)
        return res.status(400).json({resultado})
    }
    catch (error)
    {
        return res.status(500).json({
            error:"Error al crear el proucto", detalle:error.message
        })
    }
    
};

async function updateProduct (req,res){

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
};

async function deleteProduct (req,res){
    let  pid = req.params.pid.replace("pid=", "");
    let resultado = await productsModelo.deleteOne({_id:pid})
    try{
        let resultado = await productsModelo.deleteOne({_id:pid})
        if (resultado.deletedCount==0 ) {
            return res.status(500).json({
                error:"Error al eliminar el proucto", detalle:"Producto no encontrado"
            }) 
        }
        return res.status(200).json({resultado})
    } catch(error){
        return res.status(500).json({
            error:"Error al eliminar el proucto", detalle:error.message
        })
    }
};

export default {getProducts,getProductById,createProduct,updateProduct,deleteProduct}