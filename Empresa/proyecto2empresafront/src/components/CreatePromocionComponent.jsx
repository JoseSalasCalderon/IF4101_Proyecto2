import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PromocionService from '../services/PromocionService';

export const CreatePromocionComponent = ({ usuarioSesion }) => {
    const promocionService = new PromocionService();
    const navigate = useNavigate();
    const { state } = useLocation();
    const cupon = state?.cupon;

    const [promocionNueva, setPromocionNueva] = useState({
        idCupon: cupon.idCupon,
        descuento: 0.0,
        fechaInicio: "",
        fechaFinalizacion: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPromocionNueva(prevState => ({ ...prevState, [name]: value }));
    };

    const volverAtras = () => {
        navigate(-1);
    };

    const crearPromocion = (e) => {
        e.preventDefault();
        promocionService.crearPromocion(promocionNueva)
            .then(response => {
                if (response) {
                    alert(`La promoción ha sido creada!`);
                    volverAtras();
                } else {
                    alert('La promoción no se pudo crear');
                }
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="main container mt-4">
            <div className="d-flex align-items-center mb-4 pt-3">
                <button className="btn btn-link" onClick={volverAtras} style={{ textDecoration: 'none', color: 'black' }}>
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="mb-0 ml-3">Crear Promoción</h2>
            </div>
            <div className="formCreatePromocion">
                <div className="formContainer">
                    <h3>Nueva Promoción</h3>
                    <form onSubmit={crearPromocion}>
                        <div className="form-group mt-2">
                            <label>ID del Cupón:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="idCupon"
                                value={promocionNueva.idCupon}
                                onChange={handleChange}
                                required
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label>Descuento:</label>
                            <input
                                type="number"
                                className="form-control"
                                name="descuento"
                                value={promocionNueva.descuento}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha de Inicio:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="fechaInicio"
                                value={promocionNueva.fechaInicio}
                                onChange={handleChange}
                                min={cupon.fechaInicio}
                                max={cupon.fechaFinalizacion}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha de Finalización:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="fechaFinalizacion"
                                value={promocionNueva.fechaFinalizacion}
                                onChange={handleChange}
                                min={promocionNueva.fechaInicio}
                                max={cupon.fechaFinalizacion} 
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Crear Promoción</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePromocionComponent;
