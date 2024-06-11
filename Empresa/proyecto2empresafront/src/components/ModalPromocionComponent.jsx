import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import PromocionService from '../services/PromocionService';

export const ModalPromocionComponent = ({ isOpen, abrirCerrarModal, promocion, handleChange, promociones, actualizarPromociones, cupon }) => {
    const promocionService = new PromocionService();

    const actualizarPromocion = async () => {
        promocionService.actualizarPromocion(promocion)
        .then(() => {
            const promocionesActualizadas = promociones.map(promocionMap => {
                if (promocionMap.idPromocion === promocion.idPromocion) {
                    return { ...promocionMap, ...promocion };
                }
                promocionMap.activa = 0;
                return promocionMap;
            });
            actualizarPromociones(promocionesActualizadas);
            abrirCerrarModal();
        })
        .catch(error => {
            console.log(error);
        });
    };

    return (
        <Modal isOpen={isOpen} toggle={abrirCerrarModal}>
            <ModalHeader className="custom-modal-header" toggle={abrirCerrarModal}>Editar Promoción</ModalHeader>
            <ModalBody>
                <div className="form-group">
                    <div className='mb-3'><strong>ID Promoción:</strong> {promocion?.idPromocion}</div>
                    <label>ID Cupón:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="idCupon"
                        value={promocion?.idCupon}
                        readOnly
                    />
                    <label>Descuento:</label>
                    <input
                        type="text"
                        className="form-control mb-3"
                        name="descuento"
                        value={promocion?.descuento}
                        onChange={handleChange}
                    />
                    <label>Fecha de Inicio:</label>
                    <input
                        type="date"
                        className="form-control mb-3"
                        name="fechaInicio"
                        value={promocion?.fechaInicio}
                        onChange={handleChange}
                        min={cupon.fechaInicio}
                        max={cupon.fechaFinalizacion}
                    />
                    <label>Fecha de Finalización:</label>
                    <input
                        type="date"
                        className="form-control mb-3"
                        name="fechaFinalizacion"
                        value={promocion?.fechaFinalizacion}
                        onChange={handleChange}
                        min={promocion.fechaInicio}
                        max={cupon.fechaFinalizacion}
                    />
                    <label>Activa:</label>
                    <select
                        className="form-control mb-3"
                        name="activa"
                        value={promocion?.activa}
                        onChange={handleChange}
                    >
                        <option value="1">Sí</option>
                        <option value="0">No</option>
                    </select>
                </div>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={actualizarPromocion}>Guardar</Button>
                <Button color="danger" onClick={abrirCerrarModal}>Cancelar</Button>
            </ModalFooter>
        </Modal>
    );
};

export default ModalPromocionComponent;