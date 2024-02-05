import dotenv from 'dotenv'
import __dirname from '../utils.js'

dotenv.config({override:true, path:'./src/.env'})

export const config = {
    PORT:process.env.PORT,
    SECRET:process.env.SECRET_KEY,
    MONGO_URL:process.env.MONGO_URL,
    DB_NAME:process.env.DB_NAME
}