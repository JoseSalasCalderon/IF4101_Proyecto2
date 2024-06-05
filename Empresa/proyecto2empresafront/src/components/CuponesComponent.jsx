import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import CuponService from '../services/CuponService';
import { useNavigate } from 'react-router-dom';
import { ModalCuponComponent } from './ModalCuponComponent';

export const CuponesComponent = ({ usuarioSesion }) => {
  const [cupones, setCupones]=useState([]);
  const [modalActualizar, setModalActualizar] = useState(false);
  const [cuponSeleccionado, setCuponSeleccionado] = useState({
    idCupon: 0,
    idCategoria: 0,
    idUsuario: "",
    codigo: "",
    nombre: "",
    precio: 0.0,
    descuento: 0.0,
    ubicacion: "",
    imagenRepresentativa: "",
    fechaCreacion: "",
    fechaInicio: "",
    fechaFinalizacion: "",
    activo: 0
  });
  const { state } = useLocation();
  const empresa  = state?.empresa;
  const cuponService = new CuponService();
  const navigate = useNavigate();

  useEffect(()=>{
    cuponService.obtenerCuponesPorEmpresa(empresa.nombreUsuario)
    .then(response => {
      setCupones(response);
    })
    .catch(error=>{
      console.log(error);
    })
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuponSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const editarCupon = (cupon) => {
    // navigate(`/cupon/${cupon.idCupon}`, {state: { cupon: cupon }});
    //Controlar si el modal se abre o no
    setCuponSeleccionado(cupon);
    setModalActualizar(true);
  };

  const abrirCerrarModal = () => {
    setModalActualizar(!modalActualizar);
  };

  const verPromociones = (cupon) => {
    //navigate(`/cupones`, {state: { empresa: empresa }});
  };

  return (
    <div className="main container mt-4">
      <h2 className="mb-4 pt-3">Cupones de {empresa.nombreEmpresa}</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-dark">
          <thead>
            <tr>
              <th className='text-center'>IdCupon</th>
              <th className='text-center'>Codigo</th>
              <th className='text-center'>Nombre</th>
              <th className='text-center'>Precio</th>
              <th className='text-center'>Descuento</th>
              <th className='text-center'>Ubicacion</th>
              <th className='text-center'>Imagen</th>
              <th className='text-center'>FechaCreacion</th>
              <th className='text-center'>FechaInicio</th>
              <th className='text-center'>FechaFinalizacion</th>
              <th className='text-center'>Activo</th>
              <th className='text-center'>Editar</th>
              <th className='text-center'>Ver Promociones</th>
            </tr>
          </thead>
          <tbody>
            {cupones.map((cupon) => (
              <tr className='table-light' key={cupon.idCupon}>
                <td className='text-center'>{cupon.idCupon}</td>
                <td className='text-center'>{cupon.codigo}</td>
                <td className='text-center'>{cupon.nombre}</td>
                <td className='text-center'>{cupon.precio}</td>
                <td className='text-center'>{cupon.descuento}</td>
                <td className='text-center'>{cupon.ubicacion}</td>
                {/* <td className='text-center'><img src={cupon.imagenRepresentativa} alt="Imagen" style={{ width: '50px', height: '50px' }} /></td> */}
                <td className='text-center'><img src={cupon.imagenRepresentativa} alt="Imagen" style={{ width: '75px', height: '75px' }} /></td>
                <td className='text-center'>{cupon.fechaCreacion}</td>
                <td className='text-center'>{cupon.fechaInicio}</td>
                <td className='text-center'>{cupon.fechaFinalizacion}</td>
                <td className='text-center'>{cupon.activo ? 'Sí' : 'No'}</td>
                <td className='text-center'>
                  <button className="text-center btn btn-primary btn-sm mr-2" onClick={() => editarCupon(cupon)}>Editar</button>
                </td>
                <td className='text-center'>
                  <button className="text-center btn btn-info btn-sm" onClick={() => verPromociones(cupon)}>Ver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <button className="navButton btn btn-success btn-sm mb-3">Crear Nuevo Cupón +</button>
      </div>
      <ModalCuponComponent 
        usuarioSesion={usuarioSesion} 
        isOpen={modalActualizar} 
        abrirCerrarModal={abrirCerrarModal} 
        cupon={cuponSeleccionado} 
        handleChange={handleChange}
        cupones={cupones}
        actualizarCupones={setCupones}
      />
    </div>
  )
}
