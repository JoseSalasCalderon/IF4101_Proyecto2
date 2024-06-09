<?php
require_once 'Business/CategoriaBusiness.php';
require_once 'Entities/Categoria.php';

class CategoriaController {
    private $categoriaBusiness;

    public function __construct() {
        $this->categoriaBusiness = new CategoriaBusiness();
    }

    public function listarCategorias() {
        $resultado = $this->categoriaBusiness->listarCategorias();
        if ($resultado) {
            echo json_encode($resultado);
            http_response_code(200);
            exit();
        }else { 
            echo json_encode(null);
            http_response_code(404);
            exit();
        }  
    }

    public function crearCategoria() {
        if ($_POST['METHOD'] == 'POST') {
            $nombreCategoria = $_POST['nombreCategoria'];
            $categoria = new Categoria(null, $nombreCategoria);
            $resultado = $this->categoriaBusiness->crearcategoria($categoria);
            echo json_encode($resultado);
            http_response_code(201);
            exit();
        }
    }
}

?>