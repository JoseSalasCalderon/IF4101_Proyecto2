<?php
require_once 'Data/AdministradorData.php';

class AdministradorBusiness {
    private $administradorData;

    public function __construct() {
        $this->administradorData = new AdministradorData();
    }

    public function loginUsuarioAdministrador($nombreUsuario, $contrasenna) {
        $administrador = $this->administradorData->loginUsuarioAdministrador($nombreUsuario, $contrasenna);
        return $administrador;
    }
}
?>