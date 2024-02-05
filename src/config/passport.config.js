import passport from "passport";
import local from 'passport-local';
import passportJWT from 'passport-jwt';
import bcrypt from 'bcrypt';
import { config } from "./config.js";
import { usuariosModelo } from "../DAO/models/usuarios.model.js";



const buscarToken=(req)=>{
    let token = null
    if (req.cookies.sessionCookie){
        token = req.cookies.sessionCookie
    }
    return token
}

export const initPassport = ()=>{
    passport.use('registro', new local.Strategy(
       {passReqToCallback:true,usernameField:'email'},
       async(req, username, password, done) =>{
            try{
                let {nombre, email} = req.body
                if (!nombre || !email || !password) {
                    return done(null,false, {message:'Complete nombre, email y password'})
                }
                let existe = await usuariosModelo.findOne({email})
                if (existe) return done(null, false, {message:`Usuario ${username} ya existe`})
                let usuario = await usuariosModelo.create({
                    nombre, email, password:bcrypt.hashSync(password, bcrypt.genSaltSync(10))})
                return done(null, usuario)
            } catch(error){
                return done(error)
            }
        }
    ))

    passport.use('login', new local.Strategy(
        {usernameField:'email'},
        async(username, password, done) =>{
             try{
                 let user = await usuariosModelo.findOne({email:username})
                 if (!user) return done(null, false, {message:`Usuario ${username} no existe`})
                 if (!bcrypt.compareSync(password,user.password)) return done(null, false, {message:`Credenciales Invalidas`})
                 return done(null, user)
             } catch(error){
                 return done(error)
             }
         }
     ))

     passport.use ('jwt', new passportJWT.Strategy(
        {
            jwtFromRequest: new passportJWT.ExtractJwt.fromExtractors([buscarToken]),
            secretOrKey:config.SECRET
        },
        (contenidoToken, done)=>{
            try {
                return done (false,contenidoToken.usuario)
            }catch(error){
                return done (error)
            }
        }
     ))



    
}