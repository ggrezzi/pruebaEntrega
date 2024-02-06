import { UsuariosMongoDAO as DAO} from "../DAO/models/usuariosMongoDAO.js";

class UsuariosService{
    constructor(dao){
        this.dao=new dao()
    }

    async getUsers(){
        return await this.dao.getAll()
    }

    async getUserById(uid){
        return await this.dao.get({_id:uid})
    }

    async getUserByEmail(email){
        return await this.dao.get({email})
    }

    async createUser(nombre, email){

        return await this.dao.create({nombre, email})

    }
}

export const usuariosService=new UsuariosService(DAO)