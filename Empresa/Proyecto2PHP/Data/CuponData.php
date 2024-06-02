<?php
require_once 'Context.php';
require_once 'Entities/Cupon.php';

class CuponData {
    private $context;

    public function __construct() {
        $this->pdo = Context::getConnection();
    }

    public function listarCuponesPorEmpresa($nombreUsuario) {
       $query = "SELECT 
                    c.idCupon
                    , c.idCategoria
                    , c.nombreUsuario
                    , c.codigo
                    , c.nombre
                    , c.precio
                    , c.descuento
                    , c.ubicacion
                    , c.imagenRepresentativa
                    , c.fechaCreacion
                    , c.fechaInicio
                    , c.fechaFinalizacion
                    , c.activo
                FROM Cupon c
                JOIN Usuario u ON c.nombreUsuario = u.nombreUsuario
                WHERE u.nombreUsuario = :nombreUsuario";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->bindParam(':nombreUsuario', $nombreUsuario, PDO::PARAM_STR);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
        $cupones = [];
        while ($cuponData = $sentencia->fetch()) {
            $cupon = new Cupon(
              $cuponData['idCupon'],
              $cuponData['idCategoria'],
              $cuponData['nombreUsuario'],
              $cuponData['codigo'],
              $cuponData['nombre'],
              $cuponData['precio'],
              $cuponData['descuento'],
              $cuponData['ubicacion'],
              $cuponData['imagenRepresentativa'],
              $cuponData['fechaCreacion'],
              $cuponData['fechaInicio'],
              $cuponData['fechaFinalizacion'],
              $cuponData['activo']
            );
            $cupones[] = $cupon;
          }
        return $cupones;
    }

    public function crearCupon(Cupon $cupon) {
        
    }

    public function actualizarCupon($idCupon, Cupon $cupon) {
       
    }

    public function deshabilitarCupon($idCupon) {
       
    }

    public function listarCupones() {
        $query = "SELECT 
                    c.idCupon
                    , c.idCategoria
                    , c.nombreUsuario
                    , c.codigo
                    , c.nombre
                    , c.precio
                    , c.descuento
                    , c.ubicacion
                    , c.imagenRepresentativa
                    , c.fechaCreacion
                    , c.fechaInicio
                    , c.fechaFinalizacion
                    , c.activo
                FROM Cupon c
                WHERE c.activo = 1";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
        $cupones = [];
        while ($cuponData = $sentencia->fetch()) {
            $cupon = new Cupon(
              $cuponData['idCupon'],
              $cuponData['idCategoria'],
              $cuponData['nombreUsuario'],
              $cuponData['codigo'],
              $cuponData['nombre'],
              $cuponData['precio'],
              $cuponData['descuento'],
              $cuponData['ubicacion'],
              $cuponData['imagenRepresentativa'],
              $cuponData['fechaCreacion'],
              $cuponData['fechaInicio'],
              $cuponData['fechaFinalizacion'],
              $cuponData['activo']
            );
            $cupones[] = $cupon;
          }
        return $cupones;
    }
    
}// Class

?>