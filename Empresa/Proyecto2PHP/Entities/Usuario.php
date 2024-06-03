<?php
class Usuario {
    public $nombreUsuario;
    public $contrasenna;
    public $nombreEmpresa;
    public $direccion;
    public $cedulaFisicaOJuridica;
    public $fechaCreacion;
    public $correo;
    public $telefono;
    public $primeraVez;
    public $activo;
    
    public function __construct($nombreUsuario, $contrasenna, $nombreEmpresa, $direccion, $cedulaFisicaOJuridica, $fechaCreacion, $correo, $telefono, $primeraVez, $activo) {
        $this->nombreUsuario = $nombreUsuario;
        $this->contrasenna = $contrasenna;
        $this->nombreEmpresa = $nombreEmpresa;
        $this->direccion = $direccion;
        $this->cedulaFisicaOJuridica = $cedulaFisicaOJuridica;
        $this->fechaCreacion = $fechaCreacion;
        $this->correo = $correo;
        $this->telefono = $telefono;
        $this->primeraVez = $primeraVez;
        $this->activo = $activo;
    }
}
?>