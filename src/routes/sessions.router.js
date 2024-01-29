import {Router} from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken'
import { config } from '../config/config.js';
export const router=Router()

router.post('/registro',function(req, res, next) {

    passport.authenticate('registro', function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.redirect(`/registro?error=${info.message?info.message:info.toString()}`) }
      req.user=user
      return next()
    })(req, res, next);
},(req,res)=>{


    res.status(200).redirect(`/login?mensaje=Usuario ${req.user.nombre} registrado correctamente. USername: ${req.user.email}`)

})


router.post('/login', function(req, res, next) {
  passport.authenticate('login', function(err, user, info, status) {
    if (err) { return next(err) }
    if (!user) { return res.redirect(`/login?error=${info.message?info.message:info.toString()}`) }
      req.user=user
      return next()
  })(req, res, next);
} ,(req,res)=>{
  let token = jwt.sign({usuario:{
    nombre:req.user.nombre, email:req.user.email, role:req.user.role
  }},config.SECRET,{expiresIn:'1h'})

  res.cookie('sessionCookie',token,{httpOnly:true})
  res.status(200).redirect(`/perfil?mensaje=Usuario ${req.user.nombre} logueado correctamente. Rol: ${req.user.role}`)
})



