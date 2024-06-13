import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import UserService from '../services/UserService';

export const UpdateUserComponent = ({ usuarioSesion }) => {
    const userService = new UserService();
    const navigate = useNavigate();

    const [usuarioActual, setUsuarioActual] = useState({
        nombreUsuario: "",
        contrasenna: "",
        nombreEmpresa: "",
        direccion: "",
        cedulaFisicaOJuridica: "",
        fechaCreacion: "",
        correo: "",
        telefono: "",
        primeraVez: 1,
        activo: 1
    });

    useEffect(() => {
        userService.buscarUsuarioEmpresa(usuarioSesion.nombreUsuario)
            .then(response => {
                setUsuarioActual(response);
            })
            .catch(error => {
                console.error('Error al obtener la información del usuario:', error);
            });
    }, []);

    const volverAtras = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuarioActual(prevState => ({ ...prevState, [name]: value }));
    };

    const actualizarUsuario = (e) => {
        e.preventDefault();
        if (validarCampos()) {
            userService.actualizarUsuarioEmpresa(usuarioActual)
            .then(response => {
                if (response) {
                    alert("Su información ha sido actualizada con éxito!");
                    volverAtras();
                } else {
                    alert("No se pudo actualizar la información.");
                }
            })
            .catch(error => {
                console.error('Error al actualizar la información:', error);
            });
        }
    };

    const validarCampos = () => {
        const validarNombreEmpresaDireccion = /^.{1,200}$/;
        const validarCedulaFisica = /^\d{2}-\d{4}-\d{4}$/;
        const validarCedulaJuridica = /^\d{2}-\d{3}-\d{6}$/;
        const validarCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validarContrasenna = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        const validarTelefono = /^\d{4}-\d{4}$/;

        if (!validarNombreEmpresaDireccion.test(usuarioActual.nombreEmpresa)) {
            alert('Nombre de la empresa debe tener hasta 200 caracteres.');
            return false;
        }
        if (!validarContrasenna.test(usuarioActual.contrasenna)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.');
            return false;
        }
        if (!validarNombreEmpresaDireccion.test(usuarioActual.direccion)) {
            alert('Dirección debe tener hasta 200 caracteres.');
            return false;
        }
        if (!(validarCedulaFisica.test(usuarioActual.cedulaFisicaOJuridica) || validarCedulaJuridica.test(usuarioActual.cedulaFisicaOJuridica)) && usuarioActual.cedulaFisicaOJuridica !== '') {
            alert('Cédula debe cumplir con el formato adecuado.');
            return false;
        }
        if (!validarCorreo.test(usuarioActual.correo)  && usuarioActual.correo !== '') {
            alert('Correo electrónico no tiene un formato válido.');
            return false;
        }
        if (!validarTelefono.test(usuarioActual.telefono)  && usuarioActual.telefono !== '') {
            alert('Teléfono debe cumplir con el formato 0000-0000.');
            return false;
        }
        return true;
    };

    return (
        <div className="main container mt-4">
            <div className="d-flex align-items-center mb-4 pt-3">
                <button className="btn btn-link" onClick={volverAtras} style={{ textDecoration: 'none', color: 'black' }}>
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="mb-0 ml-3">Actualizar Usuario</h2>
            </div>
            <div className="formCreateUser">
                <div className="formContainer">
                    <h3>Información de Empresa</h3>
                    <form onSubmit={actualizarUsuario}>
                        <div className="form-group mt-2">
                            <label>Nombre de Usuario:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombreUsuario"
                                value={usuarioActual.nombreUsuario}
                                onChange={handleChange}
                                placeholder='Nombre Usuario...'
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label className="mb-0">Contraseña:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="contrasenna"
                                value={usuarioActual.contrasenna}
                                onChange={handleChange}
                                placeholder='Example123!'
                            />
                        </div>
                        <div className="form-group">
                            <label>Nombre de la Empresa:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombreEmpresa"
                                value={usuarioActual.nombreEmpresa}
                                onChange={handleChange}
                                placeholder='Nombre Empresa...'
                            />
                        </div>
                        <div className="form-group">
                            <label>Dirección:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="direccion"
                                value={usuarioActual.direccion}
                                onChange={handleChange}
                                 placeholder='Dirección...'
                            />
                        </div>
                        <div className="form-group">
                            <label>Cédula Física o Jurídica:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="cedulaFisicaOJuridica"
                                value={usuarioActual.cedulaFisicaOJuridica}
                                onChange={handleChange}
                                placeholder='00-0000-0000'
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha de Creación:</label>
                            <input
                                type="date"
                                className="form-control"
                                name="fechaCreacion"
                                value={usuarioActual.fechaCreacion}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Correo:</label>
                            <input
                                type="email"
                                className="form-control"
                                name="correo"
                                value={usuarioActual.correo}
                                onChange={handleChange}
                                placeholder='example@gmail.com'
                            />
                        </div>
                        <div className="form-group">
                            <label>Teléfono:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telefono"
                                value={usuarioActual.telefono}
                                onChange={handleChange}
                                placeholder='0000-0000'
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3" onClick={actualizarUsuario}>Actualizar Mis Datos</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateUserComponent;
