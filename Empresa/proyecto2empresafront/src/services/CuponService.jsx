import axios from 'axios';
import UploadImagesService from './UploadImagesService';

class CuponService {
    
    uploadImageService = new UploadImagesService();

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

    async actualizarCupon (imagenNuevaCupon, cupon) {
        const responseUploadImage = await this.uploadImageService.uploadToCloudinary(imagenNuevaCupon);
        if (responseUploadImage) {
            
            console.log("Puedo actualiraz: "+responseUploadImage.url);
        }else{
            console.log("No se pudo actualizar la imagen");
        }
    }
}

export default CuponService;