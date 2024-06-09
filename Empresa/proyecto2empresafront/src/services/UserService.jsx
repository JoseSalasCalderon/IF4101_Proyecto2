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

    async actualizarUsuarioEmpresa (usuario) {
        try {

            const formData = new FormData();
            formData.append('contrasenna', usuario.contrasenna);
            formData.append('nombreEmpresa', usuario.nombreEmpresa);
            formData.append('direccion', usuario.direccion);
            formData.append('cedulaFisicaOJuridica', usuario.cedulaFisicaOJuridica);
            formData.append('fechaCreacion', usuario.fechaCreacion);
            formData.append('correo', usuario.correo);
            formData.append('telefono', usuario.telefono);
            formData.append('primeraVez', usuario.primeraVez);
            formData.append('activo', usuario.activo);
            formData.append('METHOD', 'PUT');

            const responseUptadeUser = await axios.post(`${this.urlUser}actualizarUsuarioEmpresa`, formData, {params: {nombreUsuario: usuario.nombreUsuario}});
            console.log(responseUptadeUser.data);
            return responseUptadeUser.data;
        } catch (error) {
            console.error('Error during update user:', error);
            throw error;
        }
    }// actualizarUsuarioEmpresa

    async cambiarContrasennaUsuarioEmpresa(nombreUsuario, contrasennaNueva) {
        try {
    
          const formData = new FormData();
          formData.append('contrasenna', contrasennaNueva);
          formData.append('METHOD', 'PUT');
    
          const responseResetPassword = await axios.post(`${this.urlUser}actualizarContrasennaUsuarioEmpresa`, formData, {params: {nombreUsuario: nombreUsuario}});
          return responseResetPassword.data;
        } catch (error) {
            console.error('Error during reset password:', error);
            throw error;
        }
    }// cambiarContrasennaUsuarioEmpresa

}// class

export default UserService;