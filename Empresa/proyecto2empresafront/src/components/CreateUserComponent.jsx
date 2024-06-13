import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import UserService from '../services/UserService';

export const CreateUserComponent = () => {
    
    const usuarioSerivce = new UserService();
    const navigate = useNavigate();

    const [usuarioNuevo, setUsuarioNuevo] = useState({
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

    const volverAtras = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUsuarioNuevo(prevState => ({ ...prevState, [name]: value }));
    };

    const validarCampos = () => {
        const validarNombreEmpresaDireccion = /^.{1,200}$/;
        const validarCedulaFisica = /^\d{2}-\d{4}-\d{4}$/;
        const validarCedulaJuridica = /^\d{2}-\d{3}-\d{6}$/;
        const validarCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validarTelefono = /^\d{4}-\d{4}$/;
        const validarContrasenna = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

        if (!validarNombreEmpresaDireccion.test(usuarioNuevo.nombreEmpresa)) {
            alert('Nombre de la empresa debe tener hasta 200 caracteres.');
            return false;
        }

        if (!validarNombreEmpresaDireccion.test(usuarioNuevo.direccion)) {
            alert('Dirección debe tener hasta 200 caracteres.');
            return false;
        }
        if (!(validarCedulaFisica.test(usuarioNuevo.cedulaFisicaOJuridica) || validarCedulaJuridica.test(usuarioNuevo.cedulaFisicaOJuridica))) {
            alert('Cédula debe cumplir con el formato adecuado.');
            return false;
        }
        if (!validarCorreo.test(usuarioNuevo.correo)) {
            alert('Correo electrónico no tiene un formato válido.');
            return false;
        }
        if (!validarTelefono.test(usuarioNuevo.telefono)) {
            alert('Teléfono debe cumplir con el formato 0000-0000.');
            return false;
        }

        if (!validarContrasenna.test(usuarioNuevo.contrasenna)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.');
            return false;
        }
        return true;
    };

    const crearUsuario = (e) => {
        e.preventDefault();
        if (validarCampos()) {
            usuarioSerivce.crearUsuarioEmpresa(usuarioNuevo)
            .then(response => {
                if (response) {
                    alert("El usuario " + usuarioNuevo.nombreEmpresa + " ha sido creado.!");
                    volverAtras();
                } else {
                    alert("El usuario no se pudo crear");
                }
            })
            .catch(error => {
                console.log(error);
            });
        }
    };

    const generateRandomPassword = () => {
        const getRandomChar = (chars) => chars[Math.floor(Math.random() * chars.length)];

        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specials = '!@#$%^&*';

        let password = '';
        password += getRandomChar(uppercase);
        password += getRandomChar(lowercase);
        password += getRandomChar(numbers);
        password += getRandomChar(specials);

        const allChars = uppercase + lowercase + numbers + specials;
        while (password.length < 8) {
            password += getRandomChar(allChars);
        }

        password = password.split('').sort(() => 0.5 - Math.random()).join('');

        handleChange({ target: { name: 'contrasenna', value: password } });
    };

    return (
        <div className="main container mt-4">
            <div className="d-flex align-items-center mb-4 pt-3">
                <button className="btn btn-link" onClick={volverAtras} style={{ textDecoration: 'none', color: 'black' }}>
                    <FaArrowLeft size={20} />
                </button>
                <h2 className="mb-0 ml-3">Crear Usuario</h2>
            </div>
            <div className="formCreateUser">
                <div className="formContainer">
                    <h3>Nuevo Usuario</h3>
                    <form onSubmit={crearUsuario}>
                        <div className="form-group mt-2">
                            <label>Nombre de Usuario:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombreUsuario"
                                value={usuarioNuevo.nombreUsuario}
                                onChange={handleChange}
                                placeholder='Nombre Usuario...'
                                required
                            />
                        </div>
                        <div className="form-group">
                            <div className="input-group">
                                <div className="input-group-append d-flex flex-column align-items-start ml-3">
                                    <label className="mb-0">Contraseña:</label>
                                    <label className={`mb-0 ${usuarioNuevo.contrasenna ? 'text-success' : 'text-danger'}`}>
                                        {usuarioNuevo.contrasenna ? 'Contraseña generada' : 'No hay contraseña generada'}
                                    </label>
                                </div>
                            </div>
                            <button type="button" className="btn btn-secondary" onClick={generateRandomPassword}>Generar Contraseña</button>
                        </div>
                        <div className="form-group">
                            <label>Nombre de la Empresa:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nombreEmpresa"
                                value={usuarioNuevo.nombreEmpresa}
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
                                value={usuarioNuevo.direccion}
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
                                value={usuarioNuevo.cedulaFisicaOJuridica}
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
                                value={usuarioNuevo.fechaCreacion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Correo:</label>
                            <input
                                type="email"
                                className="form-control"
                                name="correo"
                                value={usuarioNuevo.correo}
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
                                value={usuarioNuevo.telefono}
                                onChange={handleChange}
                                placeholder='0000-0000'
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Crear Usuario</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
