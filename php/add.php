<?php
//Connexion à la base
require_once("connect.php");

$errorCode = true;
try {
    $addSql = $conn->prepare("INSERT INTO `taches_nom` (`nom`, `status`) VALUE (:nom, :status)");
    $addSql->bindParam(":nom", $_POST["nom"], PDO::PARAM_STR);
    $addSql->bindParam(":status", $_POST["status"], PDO::PARAM_INT);
    $addSql->execute();
} catch (PDOException $e) {
    $errorCode = $e->getCode();
}

$lastIDSql = $conn->prepare("SELECT LAST_INSERT_ID()");
$lastIDSql->execute();
$ID = $lastIDSql->fetch(PDO::FETCH_COLUMN);

$countSql = $conn->prepare("SELECT count(idtaches) FROM `taches_nom` WHERE status = 1");
$countSql->execute();
$count = $countSql->fetch(PDO::FETCH_COLUMN);

echo json_encode(["responseDB" => $errorCode, "count" => $count, "id" => $ID]);
