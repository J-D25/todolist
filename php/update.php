<?php
//Connexion à la base
require_once("connect.php");

$errorCode=true;
try{
$sql = $conn->prepare("UPDATE `taches_nom` SET status = :status WHERE idtaches = :id");
$sql->bindParam(":id", $_POST["id"], PDO::PARAM_INT);
$sql->bindParam(":status", $_POST["status"], PDO::PARAM_INT);
$sql->execute();
} catch (PDOException $e) {
    $errorCode = $e->getCode();
}
echo json_encode(["responseDB"=>$errorCode]);