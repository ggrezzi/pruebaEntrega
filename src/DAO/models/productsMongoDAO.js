import { productsModelo } from "./products.modelo.js";
import mongoose from "mongoose";
import { config } from "../../config/config.js";

    try {
        await mongoose.connect(config.MONGO_URL,{dbName:config.DB_NAME})
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }


export class ProductosMongoDAO{
    constructor(){

    }
    async get(filtro={}){
        if (filtro["_id"]){
            if (!mongoose.Types.ObjectId.isValid(filtro["_id"])){
                throw new Error('Id de producto invalida')
            }
        }
        return await productsModelo.find(filtro)
    }

    async create (product){
        return await productsModelo.create(product)
    }
}

