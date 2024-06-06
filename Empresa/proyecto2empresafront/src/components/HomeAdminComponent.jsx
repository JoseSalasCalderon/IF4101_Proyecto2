import React, { useState, useEffect }  from 'react'
import UserService from '../services/UserService';
import { useNavigate } from 'react-router-dom';

export const HomeAdminComponent = ({ usuarioSesion }) => {
  const [empresas, setEmpresas]=useState([]);
  const userService = new UserService();
  const navigate = useNavigate();

  useEffect(()=>{
      userService.obtenerUsuariosEmpresa()
      .then(response => {
        setEmpresas(response);
      })
      .catch(error=>{
        console.log(error);
      })
  }, []);

  const verUsuarioEmpresa = (empresa) => {
    navigate(`/empresa`, {state: { empresa: empresa }});
  };

  const verCuponesEmpresa = (empresa) => {
    navigate(`/cupones`, {state: { empresa: empresa }});
  };

  const crearUsuarioEmpresa = () => {
    navigate(`/crearUsuario`);
  };

  return (
    <div className="main container mt-4">
      <h2 className="mb-4 pt-3">Empresas Registradas</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-dark">
          <thead>
            <tr>
              <th className='text-center'>Nombre Usuario</th>
              <th className='text-center'>Contraseña</th>
              <th className='text-center'>Empresa</th>
              <th className='text-center'>Dirección</th>
              <th className='text-center'>Cédula Física/Jurídica</th>
              <th className='text-center'>Fecha Creación</th>
              <th className='text-center'>Correo</th>
              <th className='text-center'>Teléfono</th>
              <th className='text-center'>Primera Vez</th>
              <th className='text-center'>Activo</th>
              <th className='text-center'>Editar</th>
              <th className='text-center'>Ver Cupones</th>
            </tr>
          </thead>
          <tbody>
            {empresas.map((empresa) => (
              <tr className='table-light' key={empresa.nombreUsuario}>
                <td className='text-center'>{empresa.nombreUsuario}</td>
                <td className='text-center'>{empresa.contrasenna}</td>
                <td className='text-center'>{empresa.nombreEmpresa}</td>
                <td className='text-center'>{empresa.direccion}</td>
                <td className='text-center'>{empresa.cedulaFisicaOJuridica}</td>
                <td className='text-center'>{empresa.fechaCreacion}</td>
                <td className='text-center'>{empresa.correo}</td>
                <td className='text-center'>{empresa.telefono}</td>
                <td className='text-center'>{empresa.primeraVez ? 'Sí' : 'No'}</td>
                <td className='text-center'>{empresa.activo ? 'Sí' : 'No'}</td>
                <td className='text-center'>
                  <button className="text-center btn btn-primary btn-sm mr-2">Editar</button>
                </td>
                <td className='text-center'>
                  <button className="text-center btn btn-info btn-sm" onClick={() => verCuponesEmpresa(empresa)}>Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="navButton btn btn-success btn-sm mb-3" onClick={crearUsuarioEmpresa}>Crear Nuevo Usuario +</button>
      </div>
    </div>
  )
}
