<?php
require_once 'Data/UsuarioData.php';

class UsuarioBusiness {
    private $usuarioData;

    public function __construct() {
        $this->usuarioData = new UsuarioData();
    }

    public function listarUsuariosEmpresa() {
        $usuarios = [];
        $usuarios = $this->usuarioData->listarUsuariosEmpresa();
        return $usuarios;
    }

    public function buscarUsuarioEmpresa($nombreUsuario) {
        $usuario = $this->usuarioData->buscarUsuarioEmpresa($nombreUsuario);
        return $usuario;
    }

    public function crearUsuarioEmpresa(Usuario $usuario) {
        return $this->usuarioData->crearUsuarioEmpresa($usuario);
    }

    // Implementar métodos para insertar, actualizar y eliminar usuario
}
?>