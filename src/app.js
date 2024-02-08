import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { router as vistasRouter } from './routes/vistas.router.js';
import { router as sessionsRouter } from './routes/sessions.router.js';
import { router as productRouter} from './routes/products.router.js'
import { router as usersRouter} from './routes/usuarios.router.js'
import { initPassport } from './config/passport.config.js';
import passport from 'passport';
import { config } from './config/config.js';
import { middLog } from './utils.js';
import {router as cartRouter} from './routes/cart.router.js'
import swaggerUi from 'swagger-ui-express'
import swagger_jsdoc from 'swagger-jsdoc'

const options={
    definition:{
        openapi: '3.0.0',
        info:{title: 'API ecomm',
              version: '1.0.0',
              description:'Documentacion del proyecto de la entrega de ecomm'}
    },
    apis:["./docs/*.yaml"]    
}
const specs = swagger_jsdoc(options)
const PORT=config.PORT;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));
app.use('/products',productRouter)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs))

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use(cookieParser())

app.use(express.static(path.join(__dirname,'/public')));

app.use (middLog)
initPassport()
app.use(passport.initialize())

app.use('/', vistasRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/api/products', productRouter)
app.use('/api/users', usersRouter)
app.use('/api/carts', cartRouter)


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const conectar=async()=>{
    try {
        await mongoose.connect(config.MONGO_URL,{dbName:config.DB_NAME})
        console.log(`Conexión a DB establecida`)
    } catch (err) {
        console.log(`Error al conectarse con el servidor de BD: ${err}`)
    }
}

conectar();