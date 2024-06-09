<?php
require_once 'Context.php';
require_once 'Entities/Categoria.php';

class CategoriaData {
    private $context;

    public function __construct() {
        $this->pdo = Context::getConnection();
    }

    public function listarCategorias() {
       $query = "SELECT 
                    idCategoria, 
                    nombreCategoria 
                FROM categoria";
        $sentencia = $this->pdo->prepare($query);
        $sentencia->setFetchMode(PDO::FETCH_ASSOC);
        $sentencia->execute();
        $categorias = [];
        while ($categoriaData = $sentencia->fetch()) {
            $categoria = new Categoria(
            $categoriaData['idCategoria'],
            $categoriaData['nombreCategoria']
            );
            $categorias[] = $categoria;
        }

        return $categorias;
    }

    public function crearCategoria(Categoria $categoria) {
        $query = "INSERT INTO categoria (nombreCategoria)
                  VALUES (:nombreCategoria)";
            $sentencia = $this->pdo->prepare($query);
            $sentencia->bindParam(':nombreCategoria', $categoria->nombreCategoria);
            $resultado = $sentencia->execute();
        return $resultado;
    }

    
    
}// Class

?>