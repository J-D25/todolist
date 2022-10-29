<?php
//Connexion à la base
require_once("connect.php");

$sql = $conn->prepare("SELECT idtaches AS id, nom, status FROM `taches_nom`");
$sql->execute();
$res=$sql->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($res);