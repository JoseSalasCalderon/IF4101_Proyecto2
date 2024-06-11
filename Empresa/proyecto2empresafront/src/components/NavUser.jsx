import React from 'react'
import { Link } from 'react-router-dom';

export const NavUser = ({ usuarioSesion, logoutApp }) => {
  return (
    <nav className="navbar navbar-expand-lg">
      <a className="navbar-brand" href="/homeUser">
        <img 
          src="https://res.cloudinary.com/dqpootcvr/image/upload/v1718083665/mg9ywwrik93uz5pqnmwj.webp" 
          alt="Logo" 
          className="navbar-logo"
        />
      </a> 
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/homeUser">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/misDatos">Mis Datos</Link>
          </li>
        </ul>
        <div className='d-flex ml-auto align-items-center'>
          <h6 className='nav-item mr-3 mb-0'>Usuario: {usuarioSesion.nombreUsuario}</h6>
          <button className="nav-item navButton btn btn-danger my-2 my-sm-0" onClick={logoutApp}>Cerrar Sesión</button>
        </div>      
      </div>
    </nav>
  )
}
