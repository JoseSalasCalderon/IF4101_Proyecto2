<?php
class Context {
    public static function getConnection() {
        $host = "localhost:3308";
        $user = "root";
        $password = "";
        $db = "proyecto2empresas";

        try {
            $pdo = new PDO("mysql:host=$host;dbname=$db", $user, $password);

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
            $pdo->setAttribute(PDO::ATTR_STRINGIFY_FETCHES, false);

            return $pdo;
        } catch (PDOException $e) {
            die("Error!: No se pudo conectar a la bd $db. Error: " . $e->getMessage());
        }
    }
}
?>