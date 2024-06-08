import axios from 'axios';

class PromocionService {

    constructor() {
        this.urlCupon = 'http://localhost/Proyecto2PHP/?controller=Promocion&action=';
    }

    async obtenerPromocionesPorCupon (idCupon) {
        try {
            const responsePromociones = await axios.get(`${this.urlCupon}listarPromocionesPorCupon&idCupon=${idCupon}`);
            return responsePromociones.data;
        } catch (error) {
            console.error('Error during obtain promotions:', error);
            throw error;
        }
    }// obtenerPromocionesPorCupon


}

export default PromocionService;