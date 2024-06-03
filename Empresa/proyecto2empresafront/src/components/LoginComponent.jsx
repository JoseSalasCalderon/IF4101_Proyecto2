import React, {useState} from 'react'
import LoginService from '../services/LoginService';

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
        <div>
        <h2>Login</h2>
        <input 
            type="text" 
            placeholder="Username" 
            value={nombreUsuario} 
            onChange={e => setNombreUsuario(e.target.value)} 
        />
        <input 
            type="password" 
            placeholder="Password" 
            value={contrasenna} 
            onChange={e => setContrasenna(e.target.value)} 
        />
        <button onClick={login}>Login</button>
        </div>
    )
}
