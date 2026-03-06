<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once '../config/database.php';
include_once '../models/Aluno.php';

$aluno = new Aluno($conn);

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = $_GET['id'];
    if ($aluno->getAlunoById($id)) {
        echo json_encode(array(
            "encontrado" => true,
            "nome" => $aluno->nome
        ));
    } else {
        echo json_encode(array(
            "encontrado" => false
        ));
    }
} else {
    echo json_encode(array("encontrado" => false));
}
?>
