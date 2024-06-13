<?php
header('Access-Control-Allow-Origin: *');

$controllerName = $_GET['controller'] ?? 'Usuario'; 
$action = $_GET['action'] ?? 'listarUsuariosEmpresa'; 

require_once 'Controller/' . $controllerName . 'Controller.php';

$controllerClassName = $controllerName . 'Controller';
$controller = new $controllerClassName();

if (method_exists($controller, $action)) {
    $controller->$action();
} else {
    http_response_code(404);
    echo "404 - Página no encontrada";
}

?>