import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import PromocionService from '../services/PromocionService';

export const PromocionesComponent = () => {
    const [promociones, setPromociones] = useState([]);
    const [promocionSeleccionada, setPromocionSeleccionada] = useState({
        idPromocion: 0,
        idCupon: 0,
        descuento: 0.0,
        fechaInicio: "",
        fechaFinalizacion: "",
        activa: 0
    });
    const { state } = useLocation();
    const cupon = state?.cupon;
    const promocionServce = new PromocionService();
    const navigate = useNavigate();

    useEffect(() => {
        promocionServce.obtenerPromocionesPorCupon(cupon.idCupon)
            .then(response => {
                setPromociones(response);
            })
            .catch(error => {
                console.log(error);
            })
    }, []);

    const volverAtras = () => {
        navigate(-1);
    };

    const editarPromocion = (promocion) => {
        setPromocionSeleccionada(promocion);
        // Abre un modal para editar la promoción, o navega a una página de edición
    };

    const verDetallesPromocion = (promocion) => {
        // Lógica para ver los detalles de la promoción
    };

    return (
        <div className="main container mt-4">
            <div className="d-flex align-items-center mb-4 pt-3">
                <button className="btn btn-link" onClick={volverAtras} style={{ textDecoration: 'none', color: 'black' }}>
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="mb-0 ml-3">Promociones del cupón: {cupon.codigo}</h2>
            </div>
            <div className="table-responsive">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                            <th className='text-center'>IdPromoción</th>
                            <th className='text-center'>IdCupón</th>
                            <th className='text-center'>Descuento</th>
                            <th className='text-center'>FechaInicio</th>
                            <th className='text-center'>FechaFinalización</th>
                            <th className='text-center'>Activa</th>
                            <th className='text-center'>Editar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {promociones.map((promocion) => (
                            <tr className='table-light' key={promocion.idPromocion}>
                                <td className='text-center'>{promocion.idPromocion}</td>
                                <td className='text-center'>{promocion.idCupon}</td>
                                <td className='text-center'>{promocion.descuento}</td>
                                <td className='text-center'>{promocion.fechaInicio}</td>
                                <td className='text-center'>{promocion.fechaFinalizacion}</td>
                                <td className='text-center'>{promocion.activa ? 'Sí' : 'No'}</td>
                                <td className='text-center'>
                                    <button className="text-center btn btn-primary btn-sm mr-2" onClick={() => editarPromocion(promocion)}>Editar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="navButton btn btn-success btn-sm mb-3">Crear Nueva Promoción +</button>
            </div>
        </div>
    )
}
