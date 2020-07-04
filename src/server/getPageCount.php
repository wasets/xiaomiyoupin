<?php

/* 1、连接数据库 */
include_once "./connectDB.php";

/* 2、获取页码数量 */
$size = 12;

/* 页码数量：商品的总数(123) / $size  */
$sql = "SELECT * FROM shoplist1";
$result = mysqli_query($db,$sql);

$total = mysqli_num_rows($result);

/* 计算页码数量 */
$num = ceil($total / $size);

echo $num;
?>