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

    async crearUsuarioEmpresa (nuevoUsuario) {
        try {

            const formData = new FormData();
            formData.append('nombreUsuario', nuevoUsuario.nombreUsuario);
            formData.append('contrasenna', nuevoUsuario.contrasenna);
            formData.append('nombreEmpresa', nuevoUsuario.nombreEmpresa);
            formData.append('direccion', nuevoUsuario.direccion);
            formData.append('cedulaFisicaOJuridica', nuevoUsuario.cedulaFisicaOJuridica);
            formData.append('fechaCreacion', nuevoUsuario.fechaCreacion);
            formData.append('correo', nuevoUsuario.correo);
            formData.append('telefono', nuevoUsuario.telefono);
            formData.append('primeraVez', nuevoUsuario.primeraVez);
            formData.append('activo', nuevoUsuario.activo);
            formData.append('METHOD', 'POST');

            const responseCreateUser = await axios.post(`${this.urlUser}crearUsuarioEmpresa`, formData);
            console.log(responseCreateUser.data);
            return responseCreateUser.data;
        } catch (error) {
            console.error('Error during create user:', error);
            throw error;
        }
    }// crearUsuarioEmpresa

}// class

export default UserService;