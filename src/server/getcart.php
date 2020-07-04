<?php
header("Content-Type: text/json; charset=UTF-8");
/***该文件负责执行多个数据库表来查询获得商品 */
/* 1、连接数据库 */
include_once "./connectDB.php";

$user_id = $_REQUEST["user_id"];

/* 多表查询 */
$sql = "SELECT cart.*,shoplist1.title,shoplist1.img,shoplist1.shopName,shoplist1.price FROM cart , shoplist1 WHERE cart.good_id = shoplist1.good_id AND user_id=$user_id";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);
echo json_encode($data,true);

?>