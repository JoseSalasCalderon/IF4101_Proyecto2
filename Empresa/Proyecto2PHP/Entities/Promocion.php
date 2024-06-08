<?php
class Promocion {
    public $idPromocion;
    public $idCupon;
    public $descuento;
    public $fechaInicio;
    public $fechaFinalizacion;
    public $activa;

    public function __construct($idPromocion, $idCupon, $descuento, $fechaInicio, $fechaFinalizacion, $activa) {
        $this->idPromocion = $idPromocion;
        $this->idCupon = $idCupon;
        $this->descuento = $descuento;
        $this->fechaInicio = $fechaInicio;
        $this->fechaFinalizacion = $fechaFinalizacion;
        $this->activa = $activa;
    }
}
?>
