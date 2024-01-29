import { CartsMongoDAO as DAO} from "../DAO/models/cartsMongoDAO.js";

class CartsService{
    constructor(dao){
        this.dao = new dao()
    }

    async getCarts(){
        return await this.dao.get()
    }
    async getCartById(pid){
        return await this.dao.get({_id:pid})
    }
    async createCart(title, type, price, thumbnail, code, stock){

        return await this.dao.create({title, type, price, thumbnail, code, stock})
    }
}


export const cartsService = new CartsService(DAO)