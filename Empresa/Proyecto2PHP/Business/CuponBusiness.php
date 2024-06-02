<?php
require_once 'Data/CuponData.php';

class CuponBusiness {
    private $cuponData;

    public function __construct() {
        $this->cuponData = new CuponData();
    }

    public function listarCuponesPorEmpresa($nombreEmpresa) {
       $cupones = [];
       $cupones = $this->cuponData->listarCuponesPorEmpresa($nombreEmpresa);
       return $cupones;
    }

    public function crearCupon(Cupon $cupon) {
        
    }

    public function actualizarCupon($idCupon, Cupon $cupon) {
       
    }

    public function deshabilitarCupon($idCupon) {
       
    }

    public function listarCupones() {
        
    }
}
?>