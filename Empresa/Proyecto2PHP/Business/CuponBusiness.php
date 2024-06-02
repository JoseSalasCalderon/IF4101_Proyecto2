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
        
    }

    public function actualizarCupon($idCupon, Cupon $cupon) {
       
    }

    public function deshabilitarCupon($idCupon) {
       
    }

    public function listarCupones() {
       $cupones = [];
       $cupones = $this->cuponData->listarCupones();
       return $cupones;
    }
}
?>