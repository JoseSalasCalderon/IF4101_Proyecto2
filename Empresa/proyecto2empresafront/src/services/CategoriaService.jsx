import axios from 'axios';

class CategoriaService {

    constructor() {
        this.urlCategoria = 'http://localhost/Proyecto2PHP/?controller=Categoria&action=';
    }

    async obtenerCategorias () {
        try {
            const responseCategorias = await axios.get(`${this.urlCategoria}listarCategorias`);
            return responseCategorias.data;
        } catch (error) {
            console.error('Error during obtain categories:', error);
            throw error;
        }
    }// obtenerCategorias

    async crearCategoria(promocion) {
        try {
            // Crear FormData y agregar todos los campos de la promoción
            const formData = new FormData();
            formData.append('idCupon', promocion.idCupon);
            formData.append('descuento', promocion.descuento);
            formData.append('fechaInicio', promocion.fechaInicio);
            formData.append('fechaFinalizacion', promocion.fechaFinalizacion);
            formData.append('METHOD', 'POST');

            // Enviar la solicitud de actualización
            const responseCreate = await axios.post(`${this.urlCategoria}crearPromocion`, formData);
            if (responseCreate) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }// crearCategoria

}

export default CategoriaService;