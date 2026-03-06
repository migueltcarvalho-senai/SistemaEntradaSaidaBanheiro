<?php
include_once 'config/database.php';

try {
    $conn->exec("ALTER TABLE registros_saida MODIFY COLUMN status_alunos ENUM('EM_ANDAMENTO', 'CONCLUIDO') DEFAULT 'EM_ANDAMENTO'");
    // Delete any broken empty records so the system is clean
    $conn->exec("DELETE FROM registros_saida WHERE status_alunos = '' OR status_alunos IS NULL OR status_alunos = 'EM_ANDAMENTE'");
    echo "Database fixed successfully!";
} catch (PDOException $e) {
    echo "DB Error: " . $e->getMessage();
}
?>
