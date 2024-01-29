import { usuariosModelo } from "./usuarios.model.js";
import mongoose from "mongoose";
import { config } from "../../config/config.js";

    try {
        await mongoose.connect(config.MONGO_URL,{dbName:config.DB_NAME})
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }



export class UsuariosMongoDAO{
    constructor(){

    }

    async get(filtro={}){
        if (filtro["_id"]){
            if (!mongoose.Types.ObjectId.isValid(filtro["_id"])){
                throw new Error('Id de usario invalida')
            }
        }
        return await usuariosModelo.find(filtro)

    }

    async create(user){
        return await usuariosModelo.create(user)
    }
    async update(){

    }

    async delete(){
        
    }
}