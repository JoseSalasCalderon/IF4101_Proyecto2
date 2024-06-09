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

    public function loginUsuarioEmpresa($nombreUsuario, $contrasenna) {
        if ($nombreUsuario !== null) {
            $query = "SELECT 
                        nombreUsuario
                        , contrasenna
                        , nombreEmpresa
                        , direccion
                        , cedulaFisicaOJuridica
                        , fechaCreacion
                        , correo
                        , telefono
                        , primeraVez
                        , activo
                    FROM usuario
                    WHERE nombreUsuario = :nombreUsuario 
                    AND contrasenna LIKE :contrasenna
                    AND activo = 1";
            $sentencia = $this->pdo->prepare($query);
            $sentencia->bindParam(':nombreUsuario', $nombreUsuario, PDO::PARAM_STR);
            $sentencia->bindParam(':contrasenna', $contrasenna, PDO::PARAM_STR);
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
            $sentencia->bindParam(':nombreUsuario', $usuario->nombreUsuario, PDO::PARAM_STR);
            $sentencia->bindParam(':contrasenna', $usuario->contrasenna, PDO::PARAM_STR);
            $sentencia->bindParam(':nombreEmpresa', $usuario->nombreEmpresa, PDO::PARAM_STR);
            $sentencia->bindParam(':direccion', $usuario->direccion, PDO::PARAM_STR);
            $sentencia->bindParam(':cedulaFisicaOJuridica', $usuario->cedulaFisicaOJuridica, PDO::PARAM_STR);
            $sentencia->bindParam(':fechaCreacion', $usuario->fechaCreacion, PDO::PARAM_STR);
            $sentencia->bindParam(':correo', $usuario->correo, PDO::PARAM_STR);
            $sentencia->bindParam(':telefono', $usuario->telefono, PDO::PARAM_STR);
            $sentencia->bindParam(':primeraVez', $usuario->primeraVez, PDO::PARAM_BOOL);
            $sentencia->bindParam(':activo', $usuario->activo, PDO::PARAM_BOOL);

            $sentencia->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }

    }

    public function actualizarUsuarioEmpresa($nombreUsuario, Usuario $usuario) {
        $query = "UPDATE usuario SET 
                    contrasenna = :contrasenna,
                    nombreEmpresa = :nombreEmpresa,
                    direccion = :direccion,
                    cedulaFisicaOJuridica = :cedulaFisicaOJuridica,
                    fechaCreacion = :fechaCreacion,
                    correo = :correo,
                    telefono = :telefono,
                    primeraVez = :primeraVez,
                    activo = :activo
                WHERE nombreUsuario = :nombreUsuario";
        
        try {
            $sentencia = $this->pdo->prepare($query);
            $sentencia->bindParam(':nombreUsuario', $nombreUsuario, PDO::PARAM_STR);
            $sentencia->bindParam(':contrasenna', $usuario->contrasenna, PDO::PARAM_STR);
            $sentencia->bindParam(':nombreEmpresa', $usuario->nombreEmpresa, PDO::PARAM_STR);
            $sentencia->bindParam(':direccion', $usuario->direccion, PDO::PARAM_STR);
            $sentencia->bindParam(':cedulaFisicaOJuridica', $usuario->cedulaFisicaOJuridica, PDO::PARAM_STR);
            $sentencia->bindParam(':fechaCreacion', $usuario->fechaCreacion, PDO::PARAM_STR);
            $sentencia->bindParam(':correo', $usuario->correo, PDO::PARAM_STR);
            $sentencia->bindParam(':telefono', $usuario->telefono, PDO::PARAM_STR);
            $sentencia->bindParam(':primeraVez', $usuario->primeraVez, PDO::PARAM_BOOL);
            $sentencia->bindParam(':activo', $usuario->activo, PDO::PARAM_BOOL);
            
            $sentencia->execute();
            return true;
        } catch (PDOException $e) {
            return false;
        }
    }

    public function actualizarContrasennaUsuarioEmpresa($nombreUsuario, $contrasenna) {
        $query = "UPDATE usuario SET 
                    contrasenna = :contrasenna,
                    primeraVez = 0
                WHERE nombreUsuario = :nombreUsuario";
        
        try {
            $sentencia = $this->pdo->prepare($query);
            $sentencia->bindParam(':nombreUsuario', $nombreUsuario, PDO::PARAM_STR);
            $sentencia->bindParam(':contrasenna', $contrasenna, PDO::PARAM_STR);

            $sentencia->execute();
            return true;
        } catch (PDOException $e) {
            return false; 
        }
    }
    
}// Class


?>