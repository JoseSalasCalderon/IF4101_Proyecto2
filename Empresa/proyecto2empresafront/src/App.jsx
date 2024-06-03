import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';
import './App.css';
import LoginService from './services/LoginService';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { redirect } from 'react-router-dom';
import { LoginComponent } from './components/LoginComponent';
import { HomeAdminComponent } from './components/HomeAdminComponent';
import { HomeUserComponent } from './components/HomeUserComponent';

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

  return (
    <Router>
      <Routes>
      <Route 
          path="/" 
          element={usuarioSesion ? (
            usuarioSesion.isAdmin ? (
              <Navigate to="/homeAdmin" replace />
            ) : (
              <Navigate to="/homeUser" replace />
            )
          ) : (
            <LoginComponent loginApp={login} />
          )}
        />
        <Route 
          path="/login" 
          element={usuarioSesion ? (
            usuarioSesion.isAdmin ? (
              <Navigate to="/homeAdmin" replace />
            ) : (
              <Navigate to="/homeUser" replace />
            )
          ) : (
            <LoginComponent loginApp={login} />
          )}
        />
        <Route 
          path="/homeAdmin" 
          element={usuarioSesion ? (<HomeAdminComponent usuarioSesion={usuarioSesion} logoutApp={login} />) : (<Navigate to="/login" replace />)}
        />
        <Route 
          path="/homeUser" 
          element={usuarioSesion ? (<HomeUserComponent usuarioSesion={usuarioSesion} logoutApp={login} />) : (<Navigate to="/login" replace />)}
        />
      </Routes>
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
