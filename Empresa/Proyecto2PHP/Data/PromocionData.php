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
            $promocionData['activa']
            );
            $promociones[] = $promocion;
        }

        return $promociones;
    }

    public function crearPromocion(Promocion $promocion) {
        $query = "INSERT INTO promocion (idCupon, descuento, fechaInicio, fechaFinalizacion, activa)
        VALUES (:idCupon, :descuento, :fechaInicio, :fechaFinalizacion, :activa)";
            $sentencia = $this->pdo->prepare($query);
            $sentencia->bindParam(':idCupon', $promocion->idCupon);
            $sentencia->bindParam(':descuento', $promocion->descuento);
            $sentencia->bindParam(':fechaInicio', $promocion->fechaInicio);
            $sentencia->bindParam(':fechaFinalizacion', $promocion->fechaFinalizacion);
            $sentencia->bindParam(':activa', $promocion->activa, PDO::PARAM_BOOL);
            $resultado = $sentencia->execute();
        return $resultado;
    }

    public function actualizarPromocion($idPromocion, Promocion $promocion) {
        $query = "UPDATE promocion 
                  SET idCupon = :idCupon,
                      descuento = :descuento,
                      fechaInicio = :fechaInicio,
                      fechaFinalizacion = :fechaFinalizacion,
                      activa = :activa
                  WHERE idPromocion = :idPromocion";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->bindParam(':idCupon', $promocion->idCupon);
        $sentencia->bindParam(':descuento', $promocion->descuento);
        $sentencia->bindParam(':fechaInicio', $promocion->fechaInicio);
        $sentencia->bindParam(':fechaFinalizacion', $promocion->fechaFinalizacion);
        $sentencia->bindParam(':activa', $promocion->activa, PDO::PARAM_BOOL);
        $sentencia->bindParam(':idPromocion', $idPromocion);
        $resultado = $sentencia->execute();
        return $resultado;
    }

    public function deshabilitarPromocion($idPromocion) {
        $query = "UPDATE promocion SET activa = 0 WHERE idPromocion = :idPromocion";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->bindParam(':idPromocion', $idPromocion, PDO::PARAM_INT);
        $resultado = $sentencia->execute();
        return $resultado;
    }

    
}// Class

?>