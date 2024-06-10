import React, { useState, useEffect } from 'react';
import CategoriaService from '../services/CategoriaService';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const CategoriasComponent = ({ usuarioSesion }) => {
  const [categorias, setCategorias] = useState([]);
  const [nombreCategoria, setNombreCategoria] = useState('');
  const categoriaService = new CategoriaService();
  const navigate = useNavigate();

  useEffect(() => {
    categoriaService.obtenerCategorias()
      .then(responseCategorias => {
        setCategorias(responseCategorias);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, [categorias]);

  const crearCategoria = (e) => {
    e.preventDefault();
    const nuevaCategoria = { nombreCategoria };

    categoriaService.crearCategoria(nuevaCategoria)
      .then(response => {
        if (response) {
          setCategorias([...categorias, { idCategoria: response.idCategoria, nombreCategoria }]);
          setNombreCategoria('');
        }
      })
      .catch(error => {
        console.error('Error creating category:', error);
      });
  };

  const volverAtras = () => {
    navigate(-1);
  };

  return (
    <div className="main container mt-4">
            <div className="d-flex align-items-center mb-4 pt-3">
                <button className="btn btn-link" onClick={volverAtras} style={{ textDecoration: 'none', color: 'black' }}>
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="mb-0 ml-3">Administrar Categorías</h2>
            </div>
            <div className="formCreateCategoria">
                <div className="formContainer">
                    <h3>Nueva Categoría</h3>
                    <form onSubmit={crearCategoria}>
                        <div className="form-group mt-2">
                            <label htmlFor="nombreCategoria">Nombre de la Categoría</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nombreCategoria"
                                name="nombreCategoria"
                                value={nombreCategoria}
                                onChange={e => setNombreCategoria(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Agregar Categoría</button>
                    </form>
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover table-dark">
                            <thead>
                                <tr>
                                    <th className='text-center'>IdCategoria</th>
                                    <th className='text-center'>NombreCategoria</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categorias.map((categoria) => (
                                    <tr className='table-light' key={categoria.idCategoria}>
                                        <td className='text-center'>{categoria.idCategoria}</td>
                                        <td className='text-center'>{categoria.nombreCategoria}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
            </div>
            
        </div>
  );
};
