

import mongoose from "mongoose";

export const usuariosModelo=mongoose.model('usuarios', new mongoose.Schema({
    nombre: String,
    apellido:String,
    edad:Number,
    password: String,
    cart:String,
    email: {
        type: String, unique: true
    },
    role:{type:String, default:'usuario'},
    github:{}
},{
   timestamps:true 
}))


