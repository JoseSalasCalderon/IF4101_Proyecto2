<?php
require_once 'Context.php';
require_once 'Entities/Promocion.php';

class PromocionData {
    private $context;

    public function __construct() {
        $this->pdo = Context::getConnection();
    }

    public function listarPromocionesPorCupon($idCupon) {
       $query = "SELECT 
                    idPromocion
                    , idCupon
                    , descuento
                    , fechaInicio
                    , fechaFinalizacion
                    , activa
                    , activaCupon
                FROM promocion
                WHERE idCupon = :idCupon";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->bindParam(':idCupon', $idCupon, PDO::PARAM_INT);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
        $promociones = [];
        while ($promocionData = $sentencia->fetch()) {
            $promocion = new Promocion(
            $promocionData['idPromocion'],
            $promocionData['idCupon'],
            $promocionData['descuento'],
            $promocionData['fechaInicio'],
            $promocionData['fechaFinalizacion'],
            $promocionData['activa'],
            $promocionData['activaCupon']
            );
            $promociones[] = $promocion;
        }

        return $promociones;
    }

    public function crearPromocion(Promocion $promocion) {
        
    }

    public function actualizarPromocion($idPromocion, Promocion $promocion) {
       
    }

    public function deshabilitarPromocion($idPromocion) {
       
    }

    
}// Class

?>