<?php
class Cupon {
    public $idCupon;
    public $idCategoria;
    public $idUsuario;
    public $codigo;
    public $nombre;
    public $precio;
    public $descuento;
    public $ubicacion;
    public $imagenRepresentativa;
    public $fechaCreacion;
    public $fechaInicio;
    public $fechaFinalizacion;
    public $activo;

    public function __construct($idCupon, $idCategoria, $idUsuario, $codigo, $nombre, $precio, $descuento, $ubicacion, $imagenRepresentativa, $fechaCreacion, $fechaInicio, $fechaFinalizacion, $activo) {
        $this->idCupon = $idCupon;
        $this->idCategoria = $idCategoria;
        $this->idUsuario = $idUsuario;
        $this->codigo = $codigo;
        $this->nombre = $nombre;
        $this->precio = $precio;
        $this->descuento = $descuento;
        $this->ubicacion = $ubicacion;
        $this->imagenRepresentativa = $imagenRepresentativa;
        $this->fechaCreacion = $fechaCreacion;
        $this->fechaInicio = $fechaInicio;
        $this->fechaFinalizacion = $fechaFinalizacion;
        $this->activo = $activo;
    }
}
?>
