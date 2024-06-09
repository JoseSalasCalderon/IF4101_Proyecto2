import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
// import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import './App.css';
import LoginService from './services/LoginService';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { redirect } from 'react-router-dom';
import { LoginComponent } from './components/LoginComponent';
import { HomeAdminComponent } from './components/HomeAdminComponent';
import { HomeUserComponent } from './components/HomeUserComponent';
import { NavAdmin } from './components/NavAdmin';
import { NavUser } from './components/NavUser';
import { CuponesComponent } from './components/CuponesComponent';
import { FooterComponent } from './components/FooterComponent';
import { CreateUserComponent } from './components/CreateUserComponent';
import { PromocionesComponent } from './components/PromocionesComponent';
import CreateCuponComponent from './components/CreateCuponComponent';
import CreatePromocionComponent from './components/CreatePromocionComponent';
import { ResetPasswordComponent } from './components/ResetPasswordComponent';
import UpdateUserComponent from './components/UpdateUserComponent';
import { CategoriasComponent } from './components/CategoriasComponent';

function App() {
  const [usuarioSesion, setUsuarioSesion] = useState(null);
  const loginService = new LoginService();
  
  useEffect(() =>{
    loginService.obtenerUsuarioEnSesion()
      .then(response => setUsuarioSesion(response))
      .catch((error) => console.error('No se puede encontrar un usario en sesión:', error));
  });

  const login = (usuario) => {
    setUsuarioSesion(usuario);
  }

  const logout= () => {
    loginService.logout();
    setUsuarioSesion(null);
  }

  const mostrarNavYFooter = usuarioSesion && (usuarioSesion.isAdmin || usuarioSesion.primeraVez === 0);

  return (
    <Router>
      {mostrarNavYFooter && (
        usuarioSesion.isAdmin ? 
          <NavAdmin usuarioSesion={usuarioSesion} logoutApp={logout} /> : 
          <NavUser usuarioSesion={usuarioSesion} logoutApp={logout} />
      )}
      <Routes>
        <Route 
          path="/" 
          element={usuarioSesion ? (
            usuarioSesion.isAdmin ? (
              <Navigate to="/homeAdmin" replace />
            ) : (
              usuarioSesion.primeraVez === 0 ? (
                <Navigate to="/homeUser" replace />
              ):(
                <Navigate to="/cambiarContrasenna" replace />
              )
            )
          ) : (
            <Navigate to="/login" replace />
          )}
        />
        <Route 
          path="/login" 
          element={usuarioSesion ? (
            usuarioSesion.isAdmin ? (
              <Navigate to="/homeAdmin" replace />
            ) : (
              usuarioSesion.primeraVez === 0 ? (
                <Navigate to="/homeUser" replace />
              ):(
                <Navigate to="/cambiarContrasenna" replace />
              )
            )
          ) : (
            <LoginComponent loginApp={login} />
          )}
        />
        <Route 
          path="/homeAdmin" 
          element={usuarioSesion ? (<HomeAdminComponent usuarioSesion={usuarioSesion} />) : (<Navigate to="/login" replace />)}
        />
        <Route 
          path="/homeUser" 
          element={usuarioSesion ? (<HomeUserComponent usuarioSesion={usuarioSesion} />) : (<Navigate to="/login" replace />)}
        />
        <Route 
          path="/cupones" 
          element={usuarioSesion ? (<CuponesComponent usuarioSesion={usuarioSesion} />) : (<Navigate to="/login" replace />)}
        />
        <Route
          path="/crearUsuario" 
          element={usuarioSesion ? (<CreateUserComponent usuarioSesion={usuarioSesion} />) : (<Navigate to="/login" replace />)}
        />
        <Route
          path="/promociones" 
          element={usuarioSesion ? (<PromocionesComponent usuarioSesion={usuarioSesion} />) : (<Navigate to="/login" replace />)}
        />
        <Route
          path="/crearCupon" 
          element={usuarioSesion ? (<CreateCuponComponent usuarioSesion={usuarioSesion} />) : (<Navigate to="/login" replace />)}
        />
        <Route
          path="/crearPromocion" 
          element={usuarioSesion ? (<CreatePromocionComponent usuarioSesion={usuarioSesion} />) : (<Navigate to="/login" replace />)}
        />
        <Route
          path="/cambiarContrasenna" 
          element={usuarioSesion ? (<ResetPasswordComponent usuarioSesion={usuarioSesion} logoutApp={logout} />) : (<Navigate to="/login" replace />)}
        />
        <Route
          path="/misDatos" 
          element={usuarioSesion ? (<UpdateUserComponent usuarioSesion={usuarioSesion} logoutApp={logout} />) : (<Navigate to="/login" replace />)}
        />
        <Route
          path="/categorias" 
          element={usuarioSesion ? (<CategoriasComponent usuarioSesion={usuarioSesion} logoutApp={logout} />) : (<Navigate to="/login" replace />)}
        />
      </Routes>
      {mostrarNavYFooter && <FooterComponent usuarioSesion={usuarioSesion} logoutApp={logout} />}
    </Router>
    
    
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
