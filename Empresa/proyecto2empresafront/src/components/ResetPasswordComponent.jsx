import React, { useState } from 'react'
import UserService from '../services/UserService';

export const ResetPasswordComponent = ({ usuarioSesion, logoutApp }) => {

    const [contrasennaNueva, setContrasennaNueva] = useState('');
    const [contrasennaNuevaConfirmation, setContrasennaNuevaConfirmation] = useState('');
    const userService = new UserService();

    const cambiarContrasenna = () => {
        if (validarCampos()) {
            if (contrasennaNueva === contrasennaNuevaConfirmation) {
                if (contrasennaNueva !== usuarioSesion.contrasenna) {
                    userService.cambiarContrasennaUsuarioEmpresa(usuarioSesion.nombreUsuario, contrasennaNueva)
                    .then(response => {
                        if (response) {
                            alert("La contraseña se ha cambiado con éxito!");
                            logoutApp();
                        }else {
                            alert("No se ha podido actualizar la contraseña");
                        }
                    })
                    .catch(error=>{
                        console.log(error);
                    });
                }else {
                    alert("La contraseña debe ser distinta a la actual");
                }
            }else {
                alert("Debe confiormar su contraseña");
            }
        }
    }

    const validarCampos = () => {
        const validarContrasenna = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

        if (!validarContrasenna.test(contrasennaNueva)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.');
            return false;
        }

        if (!validarContrasenna.test(contrasennaNuevaConfirmation)) {
            alert('La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial.');
            return false;
        }
        return true;
    };

    return (
       <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="formularioInicioSesion card-body text-center">
                            <h2 className="titulo card-title text-center mb-4">Cambiar Contraseña</h2>
                            <div className="form-group mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Nueva Contraseña" 
                                    value={contrasennaNueva} 
                                    onChange={e => setContrasennaNueva(e.target.value)} 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="passwordConfirm" 
                                    placeholder="Confirme su Contraseña" 
                                    value={contrasennaNuevaConfirmation} 
                                    onChange={e => setContrasennaNuevaConfirmation(e.target.value)} 
                                />
                                <label className={`mb-0 ${contrasennaNueva === contrasennaNuevaConfirmation ? 'text-success' : 'text-danger'}`}>
                                    {contrasennaNueva === contrasennaNuevaConfirmation ? 'Contraseñas iguales' : 'No son equivalentes'}
                                </label>
                            </div>
                            
                            <div className="text-center">
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={cambiarContrasenna}
                                >
                                    Cambiar Contraseña
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
