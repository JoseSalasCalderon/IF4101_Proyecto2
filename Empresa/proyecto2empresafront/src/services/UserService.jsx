import axios from 'axios';

class UserService {

    constructor() {
        this.urlUser = 'http://localhost/Proyecto2PHP/?controller=Usuario&action=';
    }

    async obtenerUsuariosEmpresa () {
        try {
            const responseUsers = await axios.get(`${this.urlUser}listarUsuariosEmpresa`);
            return responseUsers.data;
        } catch (error) {
            console.error('Error during obtain users:', error);
            throw error;
        }
    }// obtenerUsuariosEmpresa


}// class

export default UserService;