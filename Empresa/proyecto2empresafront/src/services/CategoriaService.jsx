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

    async crearCategoria(categoria) {
        try {
          const formData = new FormData();
          formData.append('nombreCategoria', categoria.nombreCategoria);
          formData.append('METHOD', 'POST');
    
          const responseCreate = await axios.post(`${this.urlCategoria}crearCategoria`, formData);
          return responseCreate.data;
        } catch (error) {
          console.error('Error creating category:', error);
          throw error;
        }
      }// crearCategoria

}

export default CategoriaService;