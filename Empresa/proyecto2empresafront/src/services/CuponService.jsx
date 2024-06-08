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
        try {
            // Subir la imagen a Cloudinary
            if (imagenNuevaCupon) {
                const responseUploadImage = await this.uploadImageService.uploadToCloudinary(imagenNuevaCupon);
                if (responseUploadImage) {
                    // Crear FormData y agregar todos los campos del cupon
                    const formData = new FormData();
                    formData.append('idCategoria', cupon.idCategoria);
                    formData.append('nombreUsuario', cupon.nombreUsuario);
                    formData.append('codigo', cupon.codigo);
                    formData.append('nombre', cupon.nombre);
                    formData.append('precio', cupon.precio);
                    formData.append('descuento', cupon.descuento);
                    formData.append('ubicacion', cupon.ubicacion);
                    formData.append('imagenRepresentativa', responseUploadImage.url);
                    formData.append('fechaCreacion', cupon.fechaCreacion);
                    formData.append('fechaInicio', cupon.fechaInicio);
                    formData.append('fechaFinalizacion', cupon.fechaFinalizacion);
                    formData.append('activo', cupon.activo);
                    formData.append("METHOD", "PUT");

                    // Enviar la solicitud de actualización
                    const responseUpdate = await axios.post(`${this.urlCupon}actualizarCupon`, formData, {params: {idCupon: cupon.idCupon}});
        
                    if (responseUpdate) {
                        return responseUploadImage.url;
                    } else {
                        throw new Error('Error actualizando el cupón');
                    }
                } else {
                    throw new Error('No se pudo actualizar la imagen');
                }
            } else {
                // Como la imagen es null, significa que el usario no la desea actualizarla
                const formData = new FormData();
                    formData.append('idCategoria', cupon.idCategoria);
                    formData.append('nombreUsuario', cupon.nombreUsuario);
                    formData.append('codigo', cupon.codigo);
                    formData.append('nombre', cupon.nombre);
                    formData.append('precio', cupon.precio);
                    formData.append('descuento', cupon.descuento);
                    formData.append('ubicacion', cupon.ubicacion);
                    formData.append('imagenRepresentativa', cupon.imagenRepresentativa);
                    formData.append('fechaCreacion', cupon.fechaCreacion);
                    formData.append('fechaInicio', cupon.fechaInicio);
                    formData.append('fechaFinalizacion', cupon.fechaFinalizacion);
                    formData.append('activo', cupon.activo);
                    formData.append("METHOD", "PUT");

                // Enviar la solicitud de actualización
                const responseUpdate = await axios.post(`${this.urlCupon}actualizarCupon`, formData, {params: {idCupon: cupon.idCupon}});
    
                if (responseUpdate) {
                    return cupon.imagenRepresentativa;
                } else {
                    throw new Error('Error actualizando el cupón');
                }
            }
            
        } catch (error) {
            console.error(error);
            return null;
        }// try-catch
    }// actualizarCupon
}

export default CuponService;