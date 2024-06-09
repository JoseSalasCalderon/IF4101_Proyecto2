<?php
require_once 'Data/CategoriaData.php';

class CategoriaBusiness {
    private $categoriaData;

    public function __construct() {
        $this->categoriaData = new categoriaData();
    }

    public function listarCategorias() {
       $categorias = [];
       $categorias = $this->categoriaData->listarCategorias();
       return $categorias;
    }

    public function crearCategoria(Categoria $categoria) {
        return $this->categoriaData->crearCategoria($categoria);
    }
}
?>