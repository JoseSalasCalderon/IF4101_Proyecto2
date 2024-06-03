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
        
    }

    public function actualizarPromocion() {
       
    }

    public function deshabilitarPromocion() {
       
    }
}

?>
