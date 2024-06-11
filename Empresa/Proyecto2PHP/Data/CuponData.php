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
      $query = "INSERT INTO Cupon (idCategoria, nombreUsuario, codigo, nombre, precio, descuento, ubicacion, imagenRepresentativa, fechaCreacion, fechaInicio, fechaFinalizacion, activo)
      VALUES (:idCategoria, :nombreUsuario, :codigo, :nombre, :precio, :descuento, :ubicacion, :imagenRepresentativa, :fechaCreacion, :fechaInicio, :fechaFinalizacion, :activo)";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->bindParam(':idCategoria', $cupon->idCategoria);
        $sentencia->bindParam(':nombreUsuario', $cupon->nombreUsuario);
        $sentencia->bindParam(':codigo', $cupon->codigo);
        $sentencia->bindParam(':nombre', $cupon->nombre);
        $sentencia->bindParam(':precio', $cupon->precio);
        $sentencia->bindParam(':descuento', $cupon->descuento);
        $sentencia->bindParam(':ubicacion', $cupon->ubicacion);
        $sentencia->bindParam(':imagenRepresentativa', $cupon->imagenRepresentativa);
        $sentencia->bindParam(':fechaCreacion', $cupon->fechaCreacion);
        $sentencia->bindParam(':fechaInicio', $cupon->fechaInicio);
        $sentencia->bindParam(':fechaFinalizacion', $cupon->fechaFinalizacion);
        $sentencia->bindParam(':activo', $cupon->activo, PDO::PARAM_BOOL);
        $resultado = $sentencia->execute();
      return $resultado;
    }

    public function actualizarCupon($idCupon, Cupon $cupon) {
      $query = "UPDATE Cupon 
      SET idCategoria = :idCategoria,
          nombreUsuario = :nombreUsuario,
          codigo = :codigo,
          nombre = :nombre,
          precio = :precio,
          descuento = :descuento,
          ubicacion = :ubicacion,
          imagenRepresentativa = :imagenRepresentativa,
          fechaCreacion = :fechaCreacion,
          fechaInicio = :fechaInicio,
          fechaFinalizacion = :fechaFinalizacion,
          activo = :activo
      WHERE idCupon = :idCupon";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->bindParam(':idCategoria', $cupon->idCategoria);
        $sentencia->bindParam(':nombreUsuario', $cupon->nombreUsuario);
        $sentencia->bindParam(':codigo', $cupon->codigo);
        $sentencia->bindParam(':nombre', $cupon->nombre);
        $sentencia->bindParam(':precio', $cupon->precio);
        $sentencia->bindParam(':descuento', $cupon->descuento);
        $sentencia->bindParam(':ubicacion', $cupon->ubicacion);
        $sentencia->bindParam(':imagenRepresentativa', $cupon->imagenRepresentativa);
        $sentencia->bindParam(':fechaCreacion', $cupon->fechaCreacion);
        $sentencia->bindParam(':fechaInicio', $cupon->fechaInicio);
        $sentencia->bindParam(':fechaFinalizacion', $cupon->fechaFinalizacion);
        $sentencia->bindParam(':activo', $cupon->activo, PDO::PARAM_BOOL);
        $sentencia->bindParam(':idCupon', $idCupon);
        $resultado = $sentencia->execute();
      return $resultado;
    }

    public function deshabilitarCupon($idCupon) {
        $query = "UPDATE Cupon SET activo = 0 WHERE idCupon = :idCupon";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->bindParam(':idCupon', $idCupon);
        $resultado = $sentencia->execute();
      return $resultado;
    }

    public function listarCupones() {
        $query = "SELECT 
                    c.idCupon
                    , c.idCategoria
                    , ca.nombreCategoria
                    , c.nombreUsuario
                    , u.nombreEmpresa
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
                  JOIN usuario AS u
                    ON c.nombreUsuario = u.nombreUsuario
                      JOIN categoria AS ca
                        ON c.idCategoria = ca.idCategoria
                  WHERE c.activo = 1";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
       
        return $sentencia->fetchAll();
    }
    
}// Class

?>