<?php
require_once 'Context.php';
require_once 'Entities/Usuario.php';

class UsuarioData {
    private $context;

    public function __construct() {
        $this->pdo = Context::getConnection();
    }

    public function listarUsuarios() {
        $query = "SELECT * FROM usuario";
        $sentencia = $this->pdo->query($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $usuarios = [];
        while ($usuarioData = $sentencia->fetch()) {
            $usuario =  new Usuario(
                $usuarioData['nombreUsuario'],
                $usuarioData['contrasenna'],
                $usuarioData['nombreEmpresa'],
                $usuarioData['direccion'],
                $usuarioData['cedulaFisicaOJuridica'],
                $usuarioData['fechaCreacion'],
                $usuarioData['correo'],
                $usuarioData['telefono'],
                $usuarioData['primeraVez'],
                $usuarioData['activo']
            );
            $usuarios[] = $usuario;
        }
        return $usuarios;
    }

    public function buscarUsuario($nombreUsuario) {
        if ($nombreUsuario !== null) {
            $query = "SELECT * FROM usuario WHERE nombreUsuario = :nombreUsuario";
            $sentencia = $this->pdo->prepare($query);
            $sentencia->bindParam(':nombreUsuario', $nombreUsuario, PDO::PARAM_STR);
            $sentencia->setFetchMode(PDO::FETCH_ASSOC);
            $sentencia->execute();
            $usuarioData = $sentencia->fetch();
            if ($usuarioData) {
                return  new Usuario(
                    $usuarioData['nombreUsuario'],
                    $usuarioData['contrasenna'],
                    $usuarioData['nombreEmpresa'],
                    $usuarioData['direccion'],
                    $usuarioData['cedulaFisicaOJuridica'],
                    $usuarioData['fechaCreacion'],
                    $usuarioData['correo'],
                    $usuarioData['telefono'],
                    $usuarioData['primeraVez'],
                    $usuarioData['activo']
                );
            }
        }
    }
    
}


?>