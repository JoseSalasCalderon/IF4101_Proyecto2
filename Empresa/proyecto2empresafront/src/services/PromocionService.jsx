import axios from 'axios';

class PromocionService {

    constructor() {
        this.urlPromocion = 'http://localhost/Proyecto2PHP/?controller=Promocion&action=';
    }

    async obtenerPromocionesPorCupon (idCupon) {
        try {
            const responsePromociones = await axios.get(`${this.urlPromocion}listarPromocionesPorCupon&idCupon=${idCupon}`);
            return responsePromociones.data;
        } catch (error) {
            console.error('Error during obtain promotions:', error);
            throw error;
        }
    }// obtenerPromocionesPorCupon

    async actualizarPromocion(promocion) {
        try {
            // Crear FormData y agregar todos los campos de la promoción
            const formData = new FormData();
            formData.append('idPromocion', promocion.idPromocion);
            formData.append('idCupon', promocion.idCupon);
            formData.append('descuento', promocion.descuento);
            formData.append('fechaInicio', promocion.fechaInicio);
            formData.append('fechaFinalizacion', promocion.fechaFinalizacion);
            formData.append('activa', promocion.activa);
            formData.append('METHOD', 'PUT');

            // Enviar la solicitud de actualización
            const responseUpdate = await axios.post(`${this.urlPromocion}actualizarPromocion`, formData, {params: {idPromocion: promocion.idPromocion}});
            if (responseUpdate) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }// actualizarPromocion


}

export default PromocionService;