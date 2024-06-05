<?php
class Context {
    public static function getConnection() {
        $host = "localhost:3306";
        $user = "root";
        $password = "";
        $db = "proyecto2empresas";
        
        try {
            $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return $pdo;
        } catch (PDOException $e) {
            die("Error!: No se pudo conectar a la bd $db. Error: $e");
        }
    }
}
?>