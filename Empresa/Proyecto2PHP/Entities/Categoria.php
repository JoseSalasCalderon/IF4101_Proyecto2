<?php
class Categoria {
    public $idCategoria;
    public $nombreCategoria;

    public function __construct($idCategoria, $nombreCategoria) {
        $this->idCategoria = $idCategoria;
        $this->nombreCategoria = $nombreCategoria;
    }
}
?>
