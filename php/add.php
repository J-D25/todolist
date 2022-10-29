<?php
//Connexion à la base
require_once("connect.php");

$errorCode=true;
try{
$sql = $conn->prepare("INSERT INTO `taches_nom` (`nom`, `status`) VALUE (:nom, :status)");
$sql->bindParam(":nom", $_POST["nom"], PDO::PARAM_STR);
$sql->bindParam(":status", $_POST["status"], PDO::PARAM_INT);
$sql->execute();
} catch (PDOException $e) {
    $errorCode = $e->getCode();
}
echo json_encode(["responseDB"=>$errorCode]);