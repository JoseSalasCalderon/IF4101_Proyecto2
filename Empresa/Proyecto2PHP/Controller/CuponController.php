<?php
require_once 'Business/CuponBusiness.php';
require_once 'Entities/Cupon.php';

class CuponController {
    private $cuponBusiness;

    public function __construct() {
        $this->cuponBusiness = new CuponBusiness();
    }

    public function listarCuponesPorEmpresa() {
        if (isset($_GET['nombreUsuario'])) {
            $resultado = $this->cuponBusiness->listarCuponesPorEmpresa($_GET['nombreUsuario']);
            if ($resultado) {
                echo json_encode($resultado);
                http_response_code(200);
                exit();
            }else { 
                // No encuentra en esa empresa
                echo json_encode(null);
                http_response_code(404);
                exit();
            }
        }else {
            // No viene la variable nombreEmpresa
            echo json_encode(null);
            http_response_code(404);
            exit();
        }
        
        
    }

    public function crearCupon() {
        if ($_POST['METHOD'] == 'POST') {
            $idCategoria = $_POST['idCategoria'];
            $nombreUsuario = $_POST['nombreUsuario'];
            $codigo = $_POST['codigo'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $descuento = $_POST['descuento'];
            $ubicacion = $_POST['ubicacion'];
            $imagenRepresentativa = $_POST['imagenRepresentativa'];
            $fechaCreacion = $_POST['fechaCreacion'];
            $fechaInicio = $_POST['fechaInicio'];
            $fechaFinalizacion = $_POST['fechaFinalizacion'];
            $activo = true;

            $cupon = new Cupon(null, $idCategoria, $nombreUsuario, $codigo, $nombre, $precio, $descuento, $ubicacion, $imagenRepresentativa, $fechaCreacion, $fechaInicio, $fechaFinalizacion, $activo);
            $resultado = $this->cuponBusiness->crearCupon($cupon);
            echo json_encode($resultado);
            http_response_code(201);
            exit();
        }
    }

    public function actualizarCupon() {
        if ($_POST['METHOD'] == 'PUT') {
            unset($_POST['METHOD']);
            $idCupon = $_POST['idCupon'];
            $idCategoria = $_POST['idCategoria'];
            $nombreUsuario = $_POST['nombreUsuario'];
            $codigo = $_POST['codigo'];
            $nombre = $_POST['nombre'];
            $precio = $_POST['precio'];
            $descuento = $_POST['descuento'];
            $ubicacion = $_POST['ubicacion'];
            $imagenRepresentativa = $_POST['imagenRepresentativa'];
            $fechaCreacion = $_POST['fechaCreacion'];
            $fechaInicio = $_POST['fechaInicio'];
            $fechaFinalizacion = $_POST['fechaFinalizacion'];
            $activo = $_POST['activo'];

            $cupon = new Cupon($idCupon, $idCategoria, $nombreUsuario, $codigo, $nombre, $precio, $descuento, $ubicacion, $imagenRepresentativa, $fechaCreacion, $fechaInicio, $fechaFinalizacion, $activo);
            $resultado = $this->cuponBusiness->actualizarCupon($idCupon, $cupon);
            echo json_encode($resultado);
            http_response_code(200);
            exit();
        }
    }

    public function deshabilitarCupon() {
        if ($_POST['METHOD'] == 'DELETE') {
            $idCupon = $_POST['idCupon'];
            $resultado = $this->cuponBusiness->deshabilitarCupon($idCupon);
            echo json_encode($resultado);
            http_response_code(200);
            exit();
        }
    }

    public function listarCupones() {
        $resultado = $this->cuponBusiness->listarCupones();
        if ($resultado) {
            echo json_encode($resultado);
            http_response_code(200);
            exit();
        }else { 
            echo json_encode(null);
            http_response_code(404);
            exit();
        }
    }
}

?>
