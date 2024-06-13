import axios from 'axios';

class LoginService {

  constructor() {
    this.urlAdmin = 'http://localhost/Proyecto2PHP/?controller=Administrador&action=loginUsuarioAdministrador';
    this.urlUser = 'http://localhost/Proyecto2PHP/?controller=Usuario&action=loginUsuarioEmpresa';
  }

  async login(nombreUsuario, contrasenna) {
    try {
      // Se verifica si es un usario administrador
      const formData = new FormData();
      formData.append('nombreUsuario', nombreUsuario);
      formData.append('contrasenna', contrasenna);
      formData.append('METHOD', 'POST');
      const responseAdmin = await axios.post(`${this.urlAdmin}`, formData);
      // Guardamos variable nueva porque es any
      if (responseAdmin.data) {
        responseAdmin.data.isAdmin = true;
        sessionStorage.setItem('usuarioSesion', JSON.stringify(responseAdmin.data));
        return responseAdmin.data;
      } else {
        // De lo contrario, se verifica si es un usuario de empresa
        const responseUser = await axios.post(`${this.urlUser}`, formData);
        if (responseUser.data) {
          const user = {
            nombreUsuario: responseUser.data.nombreUsuario
            , nombreEmpresa: responseUser.data.nombreEmpresa
            , contrasenna: responseUser.data.contrasenna
            , primeraVez: responseUser.data.primeraVez
            , isAdmin: false
          };
          sessionStorage.setItem('usuarioSesion', JSON.stringify(user));
          return user;
        }
        
        
        console.log("No se encontraron datos de usuario.");
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  }

  logout() {
    sessionStorage.removeItem('usuarioSesion');
  }

  async obtenerUsuarioEnSesion() {
    const user = sessionStorage.getItem('usuarioSesion');
    return JSON.parse(user);
  }

}

export default LoginService;
