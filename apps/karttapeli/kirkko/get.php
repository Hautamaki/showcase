<?php

include("database.php");

$sql = "SELECT * FROM sijainnit";
mysqli_set_charset($conn, "utf8");
$result = mysqli_query($conn, $sql);

$json = mysqli_fetch_all($result, MYSQLI_ASSOC);
echo json_encode($json);

?>
