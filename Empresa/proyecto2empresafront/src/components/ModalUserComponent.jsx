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

    const cerrarModalYReiniciarContrasenna = () => {
        abrirCerrarModal();
        setGenerarContrasenna(false);
    }

    return (
        <Modal isOpen={isOpen} toggle={cerrarModalYReiniciarContrasenna}>
            <ModalHeader toggle={cerrarModalYReiniciarContrasenna}>Editar Usuario</ModalHeader>
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
                    />
                    <label>Dirección:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="direccion"
                        value={usuarioEmpresa?.direccion}
                        onChange={handleChange}
                    />
                    <label>Cédula Física o Jurídica:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="cedulaFisicaOJuridica"
                        value={usuarioEmpresa?.cedulaFisicaOJuridica}
                        onChange={handleChange}
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
                    />
                    <label>Teléfono:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="telefono"
                        value={usuarioEmpresa?.telefono}
                        onChange={handleChange}
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
