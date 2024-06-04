import axios from 'axios';

class CuponService {
    constructor() {
        this.urlCupon = 'http://localhost/Proyecto2PHP/?controller=Cupon&action=';
    }

    async obtenerCuponesPorEmpresa (nombreEmpresa) {
        try {
            const responseCupones = await axios.get(`${this.urlCupon}listarCuponesPorEmpresa&nombreUsuario=${nombreEmpresa}`);
            return responseCupones.data;
        } catch (error) {
            console.error('Error during obtain cupons:', error);
            throw error;
        }
    }// obtenerCuponesPorEmpresa
}

export default CuponService;