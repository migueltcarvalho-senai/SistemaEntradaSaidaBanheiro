<?php
include_once 'config/database.php';

try {
    echo "--- Schema of fila_banheiro ---\n";
    $stmt = $conn->query("DESCRIBE fila_banheiro");
    print_r($stmt->fetchAll(PDO::FETCH_ASSOC));

    echo "\n--- Schema of registros_saida ---\n";
    $stmt = $conn->query("DESCRIBE registros_saida");
    print_r($stmt->fetchAll(PDO::FETCH_ASSOC));

} catch (PDOException $e) {
    echo "DB Error: " . $e->getMessage();
}
?>
