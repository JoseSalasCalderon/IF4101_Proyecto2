import React from 'react'
import { Link } from 'react-router-dom';

export const NavAdmin = ({ usuarioSesion, logoutApp }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/homeAdmin">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/crearUsuario">Crear Usuario Empresa</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categorias">Categorías</Link>
          </li>
        </ul>
        <div className='d-flex ml-auto align-items-center'>
          <h5 className='nav-item mr-3 mb-0'>Usuario: {usuarioSesion.nombreUsuario}</h5>
          <button className="nav-item navButton btn btn-danger my-2 my-sm-0" onClick={logoutApp}>Cerrar Sesión</button>
        </div>
      </div>
    </nav>
  )
}
