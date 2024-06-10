<?php
require_once 'Business/AdministradorBusiness.php';
require_once 'Entities/Administrador.php';

class AdministradorController {
    private $administradorBusiness;

    public function __construct() {
        $this->administradorBusiness = new AdministradorBusiness();
    }

    public function loginUsuarioAdministrador() {
        if ($_POST['METHOD']=='POST') {
            $resultado = $this->administradorBusiness->loginUsuarioAdministrador($_POST['nombreUsuario'], $_POST['contrasenna']);
            echo json_encode($resultado);
        }else {
            echo json_encode(null);
        }
    }
}
?>
