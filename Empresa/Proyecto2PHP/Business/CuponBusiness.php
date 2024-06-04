<?php
require_once 'Data/CuponData.php';

class CuponBusiness {
    private $cuponData;

    public function __construct() {
        $this->cuponData = new CuponData();
    }

    public function listarCuponesPorEmpresa($nombreUsuario) {
       $cupones = [];
       $cupones = $this->cuponData->listarCuponesPorEmpresa($nombreUsuario);
       return $cupones;
    }

    public function crearCupon(Cupon $cupon) {
        return $this->cuponData->crearCupon($cupon);
    }

    public function actualizarCupon($idCupon, Cupon $cupon) {
        return $this->cuponData->actualizarCupon($idCupon, $cupon);
    }

    public function deshabilitarCupon($idCupon) {
        return $this->cuponData->deshabilitarCupon($idCupon);
    }

    public function listarCupones() {
       $cupones = [];
       $cupones = $this->cuponData->listarCupones();
       return $cupones;
    }
}
?>