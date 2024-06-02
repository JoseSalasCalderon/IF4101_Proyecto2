<?php
require_once 'Business/CuponBusiness.php';
require_once 'Entities/Cupon.php';

class CuponController {
    private $cuponBusiness;

    public function __construct() {
        $this->cuponBusiness = new CuponBusiness();
    }

    public function listarCuponesPorEmpresa() {
        if (isset($_GET['nombreEmpresa'])) {
            $resultado = $this->cuponBusiness->listarCuponesPorEmpresa($_GET['nombreEmpresa']);
            if ($resultado) {
                echo json_encode($resultado);
                http_response_code(200);
                exit();
            }else { 
                echo json_encode("No hay cupones");
                http_response_code(404);
                exit();
            }
        }
        
        
    }

    public function crearCupon() {
        
    }

    public function actualizarCupon() {
    
    }

    public function deshabilitarCupon() {
    
    }

    public function listarCupones() {
        
    }
}

?>
