<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Registro.php';

$registro = new Registro($conn);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['data']) && !empty($_GET['data'])) {
        $dataStr = $_GET['data']; // Esperado YYYY-MM-DD
        
        $lista = $registro->getRegistrosPorData($dataStr);

        echo json_encode(array(
            "registros" => $lista,
            "total" => count($lista)
        ));
    } else {
        echo json_encode(array("mensagem" => "Por favor, forneça o parâmetro 'data'.", "status" => "error"));
    }
}
?>
