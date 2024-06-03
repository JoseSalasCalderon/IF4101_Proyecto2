<?php
require_once 'Business/AdministradorBusiness.php';
require_once 'Entities/Administrador.php';

class AdministradorController {
    private $administradorBusiness;

    public function __construct() {
        $this->administradorBusiness = new AdministradorBusiness();
    }

    public function loginUsuarioAdministrador() {
        if (isset($_GET['nombreUsuario']) && isset($_GET['contrasenna'])) {
            $resultado = $this->administradorBusiness->loginUsuarioAdministrador($_GET['nombreUsuario'], $_GET['contrasenna']);
            echo json_encode($resultado);
        }else {
            echo json_encode(null);
        }
    }
}
?>
