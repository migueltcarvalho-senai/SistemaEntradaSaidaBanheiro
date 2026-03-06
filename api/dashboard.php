<?php
header("Content-Type: application/json; charset=UTF-8");
require_once '../config/database.php';
require_once '../models/Registro.php';

$db = Database::getInstance();
$registro = new Registro($db);

$estatisticas = $registro->getEstatisticasHoje();
$ranking = $registro->getRankingHoje();

echo json_encode([
    "status" => "success",
    "estatisticas" => $estatisticas,
    "ranking" => $ranking
]);
?>
