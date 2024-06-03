<?php
class Administrador {
    public $nombreUsuario;
    public $contrasenna;

    public function __construct($nombreUsuario, $contrasenna) {
        $this->nombreUsuario = $nombreUsuario;
        $this->contrasenna = $contrasenna;
    }
}
?>
