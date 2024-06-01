<?php
require_once 'Context.php';
require_once 'Entities/Usuario.php';

class UsuarioData {
    private $context;

    public function __construct() {
        $this->pdo = Context::getConnection();
    }

    public function listarUsuariosEmpresa() {
        $query = "SELECT * FROM usuario";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
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

    public function buscarUsuarioEmpresa($nombreUsuario) {
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

    public function crearUsuarioEmpresa(Usuario $usuario) {
        $query = "INSERT INTO Usuario (nombreUsuario, contrasenna, nombreEmpresa, direccion, cedulaFisicaOJuridica, fechaCreacion, correo, telefono, primeraVez, activo)
                  VALUES (:nombreUsuario, :contrasenna, :nombreEmpresa, :direccion, :cedulaFisicaOJuridica, :fechaCreacion, :correo, :telefono, :primeraVez, :activo)";

        try {
            $sentencia = $this->pdo->prepare($query);
            $sentencia->bindParam(':nombreUsuario', $usuario->nombreUsuario);
            $sentencia->bindParam(':contrasenna', $usuario->contrasenna);
            $sentencia->bindParam(':nombreEmpresa', $usuario->nombreEmpresa);
            $sentencia->bindParam(':direccion', $usuario->direccion);
            $sentencia->bindParam(':cedulaFisicaOJuridica', $usuario->cedulaFisicaOJuridica);
            $sentencia->bindParam(':fechaCreacion', $usuario->fechaCreacion);
            $sentencia->bindParam(':correo', $usuario->correo);
            $sentencia->bindParam(':telefono', $usuario->telefono);
            $sentencia->bindParam(':primeraVez', $usuario->primeraVez, PDO::PARAM_BOOL);
            $sentencia->bindParam(':activo', $usuario->activo, PDO::PARAM_BOOL);

            $sentencia->execute();
            return true;
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
            return false; // Devolver false en caso de error
        }

    }
    
}


?>