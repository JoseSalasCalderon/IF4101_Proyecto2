import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import CuponService from '../services/CuponService';

export const CreateCuponComponent = ({ usuarioSesion }) => {
    const cuponService = new CuponService();
    const navigate = useNavigate();
    const { state } = useLocation();
    const empresa  = state?.empresa;
    const categorias = state?.categorias;
    const [cuponNuevo, setCuponNuevo] = useState({
        idCategoria: 1,
        nombreUsuario: usuarioSesion.isAdmin ? empresa.nombreUsuario: usuarioSesion.nombreUsuario,
        codigo: "",
        nombre: "",
        precio: 0.0,
        descuento: 0.0,
        ubicacion: "",
        imagenRepresentativa: "",
        fechaCreacion: "",
        fechaInicio: "",
        fechaFinalizacion: "",
        activo: 1
    });
    const [imagenCuponSeleccionada, setImagenCuponSeleccionada] = useState(null);

    const obtenerFechaActual = () => {
        const fechaHoy = new Date();
        const dia = String(fechaHoy.getDate()).padStart(2, '0');
        const mes = String(fechaHoy.getMonth() + 1).padStart(2, '0');
        const anno = fechaHoy.getFullYear();
        return `${dia}/${mes}/${anno}`;
    };

    useEffect(() => {
        setCuponNuevo(prevState => ({...prevState, fechaCreacion: obtenerFechaActual()}))
        if (usuarioSesion.isAdmin) {
            setCuponNuevo(prevState => ({ ...prevState, nombreUsuario: empresa.nombreUsuario }));
        } else {
            setCuponNuevo(prevState => ({ ...prevState, nombreUsuario: usuarioSesion.nombreUsuario }));
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCuponNuevo(prevState => ({ ...prevState, [name]: value }));
    };

    const volverAtras = () => {
        navigate(-1);
    };

    const seleccionarImagenCupon = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                handleChange({ target: { name: 'imagenRepresentativa', value: reader.result } });
                setImagenCuponSeleccionada(file); // Guardar el archivo original para la subida
            };
            reader.onerror = error => {
                console.error('Error reading file:', error);
            };
        }
    };

    const crearCupon = (e) => {
        e.preventDefault();
        if (imagenCuponSeleccionada) {
            cuponService.crearCupon(imagenCuponSeleccionada, cuponNuevo)
            .then(response => {
                if (response) {
                    alert(`El cupón ${cuponNuevo.nombre} ha sido creado!`);
                    volverAtras();
                } else {
                    alert('El cupón no se pudo crear');
                }
            })
            .catch(error => {
                console.log(error);
            });
        }else {
            alert("Debe ingresar una imagen");
        }
    };

    return (
        <div className="main container mt-4">
            <div className="d-flex align-items-center mb-4 pt-3">
                <button className="btn btn-link" onClick={volverAtras} style={{ textDecoration: 'none', color: 'black' }}>
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="mb-0 ml-3">Crear Cupón</h2>
            </div>
            <div className="formCreateCupon">
                <div className="formContainer">
                    <h3>Nuevo Cupón</h3>
                    <form onSubmit={crearCupon}>
                        <div className="form-group mt-2">
                            <label>Categoría:</label>
                            <select
                                className="form-control"
                                name="idCategoria"
                                value={cuponNuevo.idCategoria}
                                onChange={handleChange}
                                required
                            >
                                {categorias.map(categoria => (
                                    <option key={categoria.idCategoria} value={categoria.idCategoria}>
                                        {categoria.nombreCategoria}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group mt-2">
                            <label>Código:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="codigo"
                                value={cuponNuevo.codigo}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombre"
                                value={cuponNuevo.nombre}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Precio:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="precio"
                                value={cuponNuevo.precio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Descuento:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="descuento"
                                value={cuponNuevo.descuento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Ubicación:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="ubicacion"
                                value={cuponNuevo.ubicacion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha de Creación:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="fechaCreacion"
                                value={cuponNuevo.fechaCreacion}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha de Inicio:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="fechaInicio"
                                value={cuponNuevo.fechaInicio}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha de Finalización:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="fechaFinalizacion"
                                value={cuponNuevo.fechaFinalizacion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Imagen Representativa:</label>
                            <input
                                type="file"
                                className="form-control mb-3"
                                name="imagenRepresentativa"
                                onChange={seleccionarImagenCupon}
                            />
                            {cuponNuevo.imagenRepresentativa && (
                                <div className="mt-2">
                                    <img
                                        src={cuponNuevo.imagenRepresentativa}
                                        alt="Imagen"
                                        style={{ width: '100px', height: '100px' }}
                                    />
                                </div>
                            )}
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Crear Cupón</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCuponComponent;