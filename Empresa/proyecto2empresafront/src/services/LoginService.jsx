import axios from 'axios';

class LoginService {

  constructor() {
    this.urlAdmin = 'http://localhost/Proyecto2PHP/?controller=Administrador&action=loginUsuarioAdministrador';
    this.urlUser = 'http://localhost/Proyecto2PHP/?controller=Usuario&action=loginUsuarioEmpresa';
  }

  async login(nombreUsuario, contrasenna) {
    try {
      // Se verifica si es un usario administrador
      const responseAdmin = await axios.get(`${this.urlAdmin}&nombreUsuario=${nombreUsuario}&contrasenna=${contrasenna}`);
      // Guardamos variable nueva porquen es any
      if (responseAdmin.data) {
        responseAdmin.data.isAdmin = true;
        sessionStorage.setItem('usuarioSesion', JSON.stringify(responseAdmin.data));
        return responseAdmin.data;
      } else {
        // De lo contrario, se verifica si es un usario de empresa
        const responseUser = await axios.get(`${this.urlUser}&nombreUsuario=${nombreUsuario}&contrasenna=${contrasenna}`);
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
        
        // Validar que no existe un usario registrado
        
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
