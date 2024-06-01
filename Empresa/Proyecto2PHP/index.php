<?php
header('Access-Control-Allow-Origin: *');

// Obtener el controlador y la acción de la URL
$controllerName = $_GET['controller'] ?? 'Usuario'; // Por defecto, usar el controlador Framework
$action = $_GET['action'] ?? 'listarUsuarios'; // Por defecto, usar el método listarFrameworks

// Incluir el archivo del controlador
require_once 'Controller/' . $controllerName . 'Controller.php';

// Instanciar el controlador
$controllerClassName = $controllerName . 'Controller';
$controller = new $controllerClassName();

// Llamar al método correspondiente
if (method_exists($controller, $action)) {
    $controller->$action();
} else {
    // Manejar el caso en que la acción no existe
    http_response_code(404);
    echo "404 - Página no encontrada";
}

?>