import axios from 'axios';

class LoginService {

  constructor() {
    this.urlAdmin = 'http://localhost/Proyecto2PHP/?controller=Administrador&action=loginUsuarioAdministrador';
    this.urlUser = 'http://api.example.com';
  }

  async login(nombreUsuario, contrasenna) {
    try {
      const response = await axios.get(`${this.urlAdmin}&nombreUsuario=${nombreUsuario}&contrasenna=${contrasenna}`);
      // Guardamos variable nueva porquen es any
      response.data.isAdmin = true;
      // Se usa session
      sessionStorage.setItem('usuarioSesion', JSON.stringify(response.data))
      
      // LUEGO HACER VALIDACION DEL OTRO LOGIN

      return response.data;
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
