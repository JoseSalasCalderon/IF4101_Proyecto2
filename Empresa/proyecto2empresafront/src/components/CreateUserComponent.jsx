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

    const crearUsuario = (e) => {
        e.preventDefault();
        if (usuarioNuevo.contrasenna !== "") {
            usuarioSerivce.crearUsuarioEmpresa(usuarioNuevo)
            .then(response => {
                if (response) {
                    alert("El usuario "+usuarioNuevo.nombreEmpresa+" ha sido creado.!");
                    volverAtras();
                }else{
                    alert("El usuario no se pudo crear");
                }
            })
            .catch(error=>{
                console.log(error);
            })
        }else {
            alert("Debe generar una contrasenna");
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
                            />
                        </div>
                        <button type="submit" className="btn btn-primary mb-3">Crear Usuario</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
