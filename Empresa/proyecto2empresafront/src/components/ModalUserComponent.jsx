import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import UserService from '../services/UserService';

export const ModalUserComponent = ({ isOpen, abrirCerrarModal, usuarioEmpresa, handleChange, usuarios, actualizarUsuarios }) => {
    const userService = new UserService();
    const [generarContrasenna, setGenerarContrasenna] = useState(false);

    useEffect(() => {
        if (usuarioEmpresa.fechaCreacion === '0000-00-00') {
            handleChange({ target: { name: 'fechaCreacion', value: '' } });
        }
    }, [usuarioEmpresa]);

    const actualizarUsuario = async () => {
        const usuarioParaActualizar = {
            ...usuarioEmpresa,
            fechaCreacion: usuarioEmpresa.fechaCreacion === '' ? '0000-00-00' : usuarioEmpresa.fechaCreacion
        };

        if (validarCampos()) {
            setGenerarContrasenna(false);

            userService.actualizarUsuarioEmpresa(usuarioParaActualizar)
            .then(() => {
                const usuariosActualizados = usuarios.map(usuarioMap => {
                    if (usuarioMap.nombreUsuario === usuarioEmpresa.nombreUsuario) {
                        return { ...usuarioMap, ...usuarioEmpresa };
                    }
                    return usuarioMap;
                });
                actualizarUsuarios(usuariosActualizados);
                abrirCerrarModal();
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
        setGenerarContrasenna(true);
        handleChange({ target: { name: 'contrasenna', value: password } });
    };

    const validarCampos = () => {
        const validarNombreEmpresaDireccion = /^.{0,200}$/;
        const validarCedulaFisica = /^\d{2}-\d{4}-\d{4}$/;
        const validarCedulaJuridica = /^\d{2}-\d{3}-\d{6}$/;
        const validarCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validarContrasenna = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        const validarTelefono = /^\d{4}-\d{4}$/;

        if (!validarNombreEmpresaDireccion.test(usuarioEmpresa.nombreEmpresa)) {
            alert('Nombre de la empresa debe tener hasta 200 caracteres.');
            return false;
        }
        if (!validarContrasenna.test(usuarioEmpresa.contrasenna)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.');
            return false;
        }
        if (!validarNombreEmpresaDireccion.test(usuarioEmpresa.direccion)) {
            alert('Dirección debe tener hasta 200 caracteres.');
            return false;
        }
        if (!(validarCedulaFisica.test(usuarioEmpresa.cedulaFisicaOJuridica) || validarCedulaJuridica.test(usuarioEmpresa.cedulaFisicaOJuridica))) {
            alert('Cédula debe cumplir con el formato adecuado.');
            return false;
        }
        if (!validarCorreo.test(usuarioEmpresa.correo)) {
            alert('Correo electrónico no tiene un formato válido.');
            return false;
        }
        if (!validarTelefono.test(usuarioEmpresa.telefono)) {
            alert('Teléfono debe cumplir con el formato 0000-0000.');
            return false;
        }
        return true;
    };

    const cerrarModalYReiniciarContrasenna = () => {
        abrirCerrarModal();
        setGenerarContrasenna(false);
    }

    return (
        <Modal isOpen={isOpen} toggle={cerrarModalYReiniciarContrasenna}>
            <ModalHeader className="custom-modal-header" toggle={cerrarModalYReiniciarContrasenna}>Editar Usuario</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <div className='mb-3'><strong>Nombre de Usuario:</strong> {usuarioEmpresa?.nombreUsuario}</div>
                    <div className="form-group">
                        <div className="input-group">
                            <div className="input-group-append d-flex flex-column align-items-start ml-3">
                                <label className="mb-0">Contraseña:</label>
                                <label className={`mb-0 ${generarContrasenna ? 'text-success' : 'text-secondary'}`}>
                                    {generarContrasenna ? 'Contraseña reiniciada' : 'Contraseña sin Modificar'}
                                </label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-secondary mb-3" onClick={generateRandomPassword}>Reiniciar Contraseña</button>
                    </div>
                    <label>Nombre de la Empresa:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="nombreEmpresa"
                        value={usuarioEmpresa?.nombreEmpresa}
                        onChange={handleChange}
                         placeholder='Nombre Empresa...'
                    />
                    <label>Dirección:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="direccion"
                        value={usuarioEmpresa?.direccion}
                        onChange={handleChange}
                        placeholder='Dirección...'
                    />
                    <label>Cédula Física o Jurídica:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="cedulaFisicaOJuridica"
                        value={usuarioEmpresa?.cedulaFisicaOJuridica}
                        onChange={handleChange}
                        placeholder='00-0000-0000'
                    />
                    <label>Fecha de Creación:</label>
                    <input
                        type="date"
                        className="form-control mb-3"
                        name="fechaCreacion"
                        value={usuarioEmpresa?.fechaCreacion || ''}
                        onChange={handleChange}
                    />
                    <label>Correo:</label>
                    <input
                        type="email"
                        className="form-control mb-3"
                        name="correo"
                        value={usuarioEmpresa?.correo}
                        onChange={handleChange}
                        placeholder='example@gmail.com'
                    />
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="telefono"
                        value={usuarioEmpresa?.telefono}
                        onChange={handleChange}
                         placeholder='0000-0000'
                    />
                    <label>Primera Vez:</label>
                    <select
                        className="form-control mb-3"
                        name="primeraVez"
                        value={usuarioEmpresa?.primeraVez}
                        onChange={handleChange}
                    >
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                    <label>Activo:</label>
                    <select
                        className="form-control mb-3"
                        name="activo"
                        value={usuarioEmpresa?.activo}
                        onChange={handleChange}
                    >
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={actualizarUsuario}>Guardar</Button>
                <Button color="danger" onClick={cerrarModalYReiniciarContrasenna}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalUserComponent;
