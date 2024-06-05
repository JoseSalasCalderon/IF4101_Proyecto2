<?php
require_once 'Business/PromocionBusiness.php';
require_once 'Entities/Promocion.php';

class PromocionController {
    private $promocionBusiness;

    public function __construct() {
        $this->promocionBusiness = new PromocionBusiness();
    }

    public function listarPromocionesPorCupon() {
        if (isset($_GET['idCupon'])) {
            $resultado = $this->promocionBusiness->listarPromocionesPorCupon($_GET['idCupon']);
            if ($resultado) {
                echo json_encode($resultado);
                http_response_code(200);
                exit();
            }else { 
                // No hay promociones en ese cupon
                echo json_encode(null);
                http_response_code(404);
                exit();
            }
        }else {
            // No viene la variable idCupon
            echo json_encode(null);
            http_response_code(404);
            exit();
        }
        
        
    }

    public function crearPromocion() {
        if ($_POST['METHOD'] == 'POST') {
            $idCupon = $_POST['idCupon'];
            $descuento = $_POST['descuento'];
            $fechaInicio = $_POST['fechaInicio'];
            $fechaFinalizacion = $_POST['fechaFinalizacion'];
            $activa = true;
            $activaCupon = $_POST['activaCupon'];

            $promocion = new Promocion(null, $idCupon, $descuento, $fechaInicio, $fechaFinalizacion, $activa, $activaCupon);
            $resultado = $this->promocionBusiness->crearPromocion($promocion);
            echo json_encode($resultado);
            http_response_code(201);
            exit();
        }
    }

    public function actualizarPromocion() {
        if ($_POST['METHOD'] == 'PUT') {
            unset($_POST['METHOD']);
            $idPromocion = $_POST['idPromocion'];
            $idCupon = $_POST['idCupon'];
            $descuento = $_POST['descuento'];
            $fechaInicio = $_POST['fechaInicio'];
            $fechaFinalizacion = $_POST['fechaFinalizacion'];
            $activa = $_POST['activa'];
            $activaCupon = $_POST['activaCupon'];

            $promocion = new Promocion($idPromocion, $idCupon, $descuento, $fechaInicio, $fechaFinalizacion, $activa, $activaCupon);
            $resultado = $this->promocionBusiness->actualizarPromocion($idPromocion, $promocion);
            echo json_encode($resultado);
            http_response_code(200);
            exit();
        }
    }

    public function deshabilitarPromocion() {
        if ($_POST['METHOD'] == 'DELETE') {
            $idPromocion = $_POST['idPromocion'];
            $resultado = $this->promocionBusiness->deshabilitarPromocion($idPromocion);
            echo json_encode($resultado);
            http_response_code(200);
            exit();
        }
    }
}

?>
