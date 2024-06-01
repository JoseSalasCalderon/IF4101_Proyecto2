<?php
require_once 'Business/UsuarioBusiness.php';
require_once 'Entities/Usuario.php';

class UsuarioController {
    private $usuarioBusiness;

    public function __construct() {
        $this->usuarioBusiness = new UsuarioBusiness();
    }

    public function listarUsuarios() {
        $resultado = $this->usuarioBusiness->listarUsuarios();
        if ($resultado) {
            echo json_encode($resultado);
            http_response_code(200);
            exit();
        }else { 
            echo json_encode("No hay usuarios");
            http_response_code(404);
            exit();
        }
    }

    public function buscarUsuario() {
        if (isset($_GET['nombreUsuario'])) {
            $resultado = $this->usuarioBusiness->buscarUsuario($_GET['nombreUsuario']);
            echo json_encode($resultado);
        }
    }
}

// $controller = new UsuarioController();
// $controller->handleRequest();
?>
