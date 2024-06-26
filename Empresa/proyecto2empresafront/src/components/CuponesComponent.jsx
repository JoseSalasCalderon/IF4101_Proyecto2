import React, {useState, useEffect} from 'react'
import { useLocation } from 'react-router-dom';
import CuponService from '../services/CuponService';
import CategoriaService from '../services/CategoriaService';
import { useNavigate } from 'react-router-dom';
import { ModalCuponComponent } from './ModalCuponComponent';
import { FaArrowLeft } from 'react-icons/fa';

export const CuponesComponent = ({ usuarioSesion }) => {
  const [cupones, setCupones]=useState([]);
  const [categorias, setCategorias] = useState([]);
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
  const categoariaService = new CategoriaService();
  const navigate = useNavigate();

  useEffect(()=>{
    categoariaService.obtenerCategorias()
    .then(responseCategorias => {
        if (usuarioSesion.isAdmin) {
          cuponService.obtenerCuponesPorEmpresa(empresa.nombreUsuario)
          .then(responseCupones => {
            setCupones(responseCupones);
          })
          .catch(error=>{
            console.log(error);
          })
        }else{
          cuponService.obtenerCuponesPorEmpresa(usuarioSesion.nombreUsuario)
          .then(responseCupones => {
            setCupones(responseCupones);
          })
          .catch(error=>{
            console.log(error);
          })
        }
        setCategorias(responseCategorias);
    })
    .catch(error=>{
        console.log(error);
    });
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuponSeleccionado(prevState => ({
        ...prevState,
        [name]: name === 'activo' || name === 'idCategoria'? parseInt(value) : value,
    }));
  };

  const editarCupon = (cupon) => {
    //Controlar si el modal se abre o no
    setCuponSeleccionado(cupon);
    setModalActualizar(true);
  };

  const crearCupon = () => {
    navigate(`/crearCupon`, {state: { empresa: empresa, categorias: categorias }});
  };

  const abrirCerrarModal = () => {
    setModalActualizar(!modalActualizar);
  };

  const verPromociones = (cupon) => {
    navigate(`/promociones`, {state: { cupon: cupon }});
  };

  const volverAtras = () => {
    navigate(-1);
  };

  const obtenerNombreCategoria = (idCategoria) => {
    const categoria = categorias.find(cat => cat.idCategoria === idCategoria);
    return categoria ? categoria.nombreCategoria : 'Desconocida';
  };

  return (
    <div className="main container mt-4">
      <div className="d-flex align-items-center mb-4 pt-3">
        {usuarioSesion?.isAdmin && (
          <button className="btn btn-link" onClick={volverAtras} style={{ textDecoration: 'none', color: 'black' }}>
            <FaArrowLeft size={20} />
          </button>
        )}  
        {usuarioSesion?.isAdmin ? (
          <h2 className="mb-0 ml-3">Cupones de {empresa.nombreEmpresa}</h2>
        ): (
          <h2 className="mb-0 ml-3">Mis Cupones</h2>
        )}
      </div>
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-dark">
          <thead>
            <tr>
              <th className='text-center'>IdCupon</th>
              <th className='text-center'>Codigo</th>
              <th className='text-center'>Categoría</th>
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
                <td className='text-center'>{obtenerNombreCategoria(cupon.idCategoria)}</td>
                <td className='text-center'>{cupon.nombre}</td>
                <td className='text-center'>{cupon.precio}</td>
                <td className='text-center'>{cupon.descuento}</td>
                <td className='text-center'>{cupon.ubicacion}</td>
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
        <button className="navButton btn btn-success btn-sm mb-3" onClick={crearCupon}>Crear Nuevo Cupón +</button>
      </div>
      <ModalCuponComponent 
        usuarioSesion={usuarioSesion} 
        isOpen={modalActualizar} 
        abrirCerrarModal={abrirCerrarModal} 
        cupon={cuponSeleccionado} 
        handleChange={handleChange}
        cupones={cupones}
        categorias={categorias}
        actualizarCupones={setCupones}
      />
    </div>
  )
}
