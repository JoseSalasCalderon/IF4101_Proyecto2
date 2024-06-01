<?php
require_once 'Data/UsuarioData.php';

class UsuarioBusiness {
    private $usuarioData;

    public function __construct() {
        $this->usuarioData = new UsuarioData();
    }

    public function listarUsuarios() {
        $usuarios = [];
        $usuarios = $this->usuarioData->listarUsuarios();
        return $usuarios;
    }

    public function buscarUsuario($nombreUsuario) {
        $usuario = $this->usuarioData->buscarUsuario($nombreUsuario);
        return $usuario;
    }

    

    // Implementar métodos para insertar, actualizar y eliminar usuario
}
?>