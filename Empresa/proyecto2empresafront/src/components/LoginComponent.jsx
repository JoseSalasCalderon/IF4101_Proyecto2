import React, {useState} from 'react'
import LoginService from '../services/LoginService';
import { BiUser } from 'react-icons/bi';

export const LoginComponent = ({ loginApp }) => {
    const [nombreUsuario, setNombreUsuario] = useState('');
    const [contrasenna, setContrasenna] = useState('');
    
    const login = async () => {
        try {
            const loginService = new LoginService();
            const usuarioObtenido = await loginService.login(nombreUsuario, contrasenna);
            loginApp(usuarioObtenido);
        } catch (error) {
            alert("Hi"+error);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="formularioInicioSesion card-body text-center">
                        <BiUser style={{ fontSize: '5rem', marginBottom: '1rem' }} /> {/* Usa el ícono de usuario */}
                            <h2 className="titulo card-title text-center mb-4">Inicio de Sesión</h2>
                            <div className="form-group mb-3">
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    id="username" 
                                    placeholder="Nombre de Usuario" 
                                    value={nombreUsuario} 
                                    onChange={e => setNombreUsuario(e.target.value)} 
                                />
                            </div>
                            <div className="form-group mb-3">
                                <input 
                                    type="password" 
                                    className="form-control" 
                                    id="password" 
                                    placeholder="Contrasenna" 
                                    value={contrasenna} 
                                    onChange={e => setContrasenna(e.target.value)} 
                                />
                            </div>
                            <div className="text-center">
                                <button 
                                    type="button" 
                                    className="btn btn-primary" 
                                    onClick={login}
                                >
                                    Iniciar Sesión
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
