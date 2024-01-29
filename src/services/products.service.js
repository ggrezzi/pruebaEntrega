import { ProductosMongoDAO as DAO} from "../DAO/models/productsMongoDAO.js";

class ProductsService{
    constructor(dao){
        this.dao = new dao()
    }

    async getProducts(){
        return await this.dao.get()
    }
    async getProductById(pid){
        return await this.dao.get({_id:pid})
    }
    async createProducts(title, type, price, thumbnail, code, stock){

        return await this.dao.create({title, type, price, thumbnail, code, stock})
    }
}


export const productsService = new ProductsService(DAO)