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

    async getAll(){
        return await usuariosModelo.find()
    }

    async get(filtro={}){
        if (!filtro._id =="" ){
        filtro._id = filtro._id.replace("uid=", "")
        if (filtro["_id"]){
            if (!mongoose.Types.ObjectId.isValid(filtro["_id"])){
                throw new Error('Id de usario invalida')
            }
        }}

        else if  (!filtro.email =="" ){
            if (filtro["email"]){
                if (!mongoose.Types.ObjectId.isValid(filtro["email"])){
                    throw new Error('email invalido')
                }
            }}

        return await usuariosModelo.find(filtro)
    }

    async create(user){
        return await usuariosModelo.create(user)
    }
    async update(user){
        
        return await usuariosModelo.updateOne({_id:user._id},user)
    }
    async delete(){
        return await usuariosModelo.deleteOne(user)
    }
}