<?php
//Connexion à la base
require_once("connect.php");

if (isset($_POST["view"]) && ($_POST["view"]) > 0) {
    $listSql = $conn->prepare("SELECT idtaches AS id, nom, status FROM `taches_nom` WHERE status IN (:views)");
    $listSql->bindValue(":views", $_POST["view"]);
} else {
    $listSql = $conn->prepare("SELECT idtaches AS id, nom, status FROM `taches_nom`");
}
$listSql->execute();
$list = $listSql->fetchAll(PDO::FETCH_ASSOC);

$countSql = $conn->prepare("SELECT count(idtaches) FROM `taches_nom` WHERE status = 1");
$countSql->execute();
$count = $countSql->fetch(PDO::FETCH_COLUMN);

echo json_encode(["taches" => $list, "count" => $count]);
