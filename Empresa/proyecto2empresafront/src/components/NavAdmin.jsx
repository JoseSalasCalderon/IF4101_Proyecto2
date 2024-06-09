import React from 'react'
import { Link } from 'react-router-dom';

export const NavAdmin = ({ usuarioSesion, logoutApp }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      {/* <Link className="navbar-brand" to="/">TicketsFacil</Link> */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/homeAdmin">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/crearUsuario">Crear Usuario Empresa</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categorias">Categorias</Link>
          </li>
        </ul>
        <button className="navButton btn btn-danger my-2 my-sm-0" onClick={logoutApp}>Cerrar Sesión</button>
      </div>
    </nav>
  )
}
