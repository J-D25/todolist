<?php
//Connexion à la base
require_once("connect.php");

$errorCode = true;
try {
    $updateSql = $conn->prepare("UPDATE `taches_nom` SET status = :status WHERE idtaches = :id");
    $updateSql->bindParam(":id", $_POST["id"], PDO::PARAM_INT);
    $updateSql->bindParam(":status", $_POST["status"], PDO::PARAM_INT);
    $updateSql->execute();
} catch (PDOException $e) {
    $errorCode = $e->getCode();
}

$countSql = $conn->prepare("SELECT count(idtaches) FROM `taches_nom` WHERE status = 1");
$countSql->execute();
$count = $countSql->fetch(PDO::FETCH_COLUMN);

echo json_encode(["responseDB" => $errorCode, "count" => $count]);
