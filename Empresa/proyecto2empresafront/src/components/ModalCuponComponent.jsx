import { error } from 'jquery';
import React, { useState } from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import CuponService from '../services/CuponService';

export const ModalCuponComponent = ({ isOpen, abrirCerrarModal, cupon, handleChange, cupones, actualizarCupones }) => {
    const [imagenCuponSeleccionada, setImagenCuponSeleccionada] = useState(null);
    const cuponService = new CuponService();

    const seleccionarImagenCupon = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                handleChange({ target: { name: 'imagenRepresentativa', value: reader.result } });
                setImagenCuponSeleccionada(file); // Guardar el archivo original para la subida
            };
            reader.onerror = error => {
                console.error('Error reading file:', error);
            };
        }
    };

    const actualizarCupon = async() => {
        cuponService.actualizarCupon(imagenCuponSeleccionada, cupon)
        .then(imagenActualizada => {
            console.log("CA: "+imagenActualizada);
            handleChange({ target: { name: 'imagenRepresentativa', value: imagenActualizada } });
            const cuponesNuevos = cupones.map(cuponMap => {
                if (cuponMap.idCupon === cupon.idCupon) {
                  return { ...cuponMap, ...cupon };
                }
                return cuponMap;
            });
            actualizarCupones(cuponesNuevos);
            abrirCerrarModal();
        })
        .catch(error=>{
            console.log(error);
        });
    }

    return (
        <Modal isOpen={isOpen} toggle={abrirCerrarModal}>
            <ModalHeader toggle={abrirCerrarModal}>Editar Cupón</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <div className='mb-3'><strong>ID:</strong> {cupon?.idCupon}</div>
                    <label>Código:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="codigo"
                        value={cupon?.codigo}
                        onChange={handleChange}
                    />
                    <label>Nombre:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="nombre"
                        value={cupon?.nombre}
                        onChange={handleChange}
                    />
                    <label>Precio:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="precio"
                        value={cupon?.precio}
                        onChange={handleChange}
                    />
                    <label>Descuento:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="descuento"
                        value={cupon?.descuento}
                        onChange={handleChange}
                    />
                    <label>Ubicación:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="ubicacion"
                        value={cupon?.ubicacion}
                        onChange={handleChange}
                    />
                    <label>Fecha de Creación:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="fechaCreacion"
                        value={cupon?.fechaCreacion}
                        readOnly
                    />
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        className="form-control mb-3"
                        name="fechaInicio"
                        value={cupon?.fechaInicio}
                        onChange={handleChange}
                    />
                    <label>Fecha de Finalización:</label>
                    <input
                        type="date"
                        className="form-control mb-3"
                        name="fechaFinalizacion"
                        value={cupon?.fechaFinalizacion}
                        onChange={handleChange}
                    />
                    <label>Activo:</label>
                    <select
                        className="form-control mb-3"
                        name="activo"
                        value={cupon?.activo}
                        onChange={handleChange}
                    >
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                    <label>Imagen Representativa:</label>
                    <input
                        type="file"
                        className="form-control mb-3"
                        name="imagenRepresentativa"
                        onChange={seleccionarImagenCupon}
                    />
                    {cupon?.imagenRepresentativa && (
                        <div className="mt-2">
                            <img
                                src={cupon.imagenRepresentativa}
                                alt="Imagen"
                                style={{ width: '100px', height: '100px' }}
                            />
                        </div>
                    )}
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={actualizarCupon}>Guardar</Button>
                <Button color="danger" onClick={abrirCerrarModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ModalCuponComponent;