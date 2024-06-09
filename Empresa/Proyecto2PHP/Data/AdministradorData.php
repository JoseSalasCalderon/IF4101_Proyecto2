<?php
require_once 'Context.php';
require_once 'Entities/Administrador.php';

class AdministradorData {
    private $context;

    public function __construct() {
        $this->pdo = Context::getConnection();
    }

    public function loginUsuarioAdministrador($nombreUsuario, $contrasenna) {
        if ($nombreUsuario !== null) {
            $query = "SELECT 
                        nombreUsuario
                        , contrasenna 
                      FROM administrador 
                      WHERE nombreUsuario = :nombreUsuario 
                      AND contrasenna LIKE :contrasenna";
            $sentencia = $this->pdo->prepare($query);
            $sentencia->bindParam(':nombreUsuario', $nombreUsuario, PDO::PARAM_STR);
            $sentencia->bindParam(':contrasenna', $contrasenna, PDO::PARAM_STR);
            $sentencia->setFetchMode(PDO::FETCH_ASSOC);
            $sentencia->execute();
            $administradorData = $sentencia->fetch();
            if ($administradorData) {
                return  new Administrador(
                    $administradorData['nombreUsuario'],
                    $administradorData['contrasenna']
                );
            }
        }
    }
    
}// Class


?>