<?php
require_once 'Business/UsuarioBusiness.php';
require_once 'Entities/Usuario.php';

class UsuarioController {
    private $usuarioBusiness;

    public function __construct() {
        $this->usuarioBusiness = new UsuarioBusiness();
    }

    public function listarUsuariosEmpresa() {
        $resultado = $this->usuarioBusiness->listarUsuariosEmpresa();
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

    public function buscarUsuarioEmpresa() {
        if (isset($_GET['nombreUsuario'])) {
            $resultado = $this->usuarioBusiness->buscarUsuarioEmpresa($_GET['nombreUsuario']);
            echo json_encode($resultado);
        }
    }

    public function crearUsuarioEmpresa() {
        if($_POST['METHOD']=='POST'){
            $nombreUsuario = $_POST['nombreUsuario'];
            $contrasenna = $_POST['contrasenna'];
            $nombreEmpresa = $_POST['nombreEmpresa'];
            $direccion = $_POST['direccion'];
            $cedulaFisicaOJuridica = $_POST['cedulaFisicaOJuridica'];
            $fechaCreacion = $_POST['fechaCreacion'];
            $correo = $_POST['correo'];
            $telefono = $_POST['telefono'];
            $primeraVez = $_POST['primeraVez'];
            $activo = $_POST['activo'];

            // Crear el objeto Usuario
            $usuario = new Usuario($nombreUsuario, $contrasenna, $nombreEmpresa, $direccion, $cedulaFisicaOJuridica, $fechaCreacion, $correo, $telefono, $primeraVez, $activo);
            $resultado = $this->usuarioBusiness->crearUsuarioEmpresa($usuario);
            echo json_encode($resultado);
            http_response_code(200);
            //header("HTTP/1.1 200 OK");
            exit();
        }
    }
}

// $controller = new UsuarioController();
// $controller->handleRequest();
?>
