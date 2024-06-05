<?php
require_once 'Data/PromocionData.php';

class PromocionBusiness {
    private $promocionData;

    public function __construct() {
        $this->promocionData = new PromocionData();
    }

    public function listarPromocionesPorCupon($idCupon) {
       $promociones = [];
       $promociones = $this->promocionData->listarPromocionesPorCupon($idCupon);
       return $promociones;
    }

    public function crearPromocion(Promocion $promocion) {
        return $this->promocionData->crearPromocion($promocion);
    }

    public function actualizarPromocion($idPromocion, Promocion $promocion) {
        return $this->promocionData->actualizarPromocion($idPromocion, $promocion);
    }

    public function deshabilitarPromocion($idPromocion) {
        return $this->promocionData->deshabilitarPromocion($idPromocion);
    }
}
?>