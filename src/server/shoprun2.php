<?php
/** 该文件是首页的秒杀商品任务*/
header("Content-Type: text/json; charset=UTF-8");
//1连接数据库
include_once "./connectDB.php";
//2.查询获取数据库中的数据
$sql ="SELECT * FROM shoprun2";

$result = mysqli_query($db,$sql);

$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

//3.把数据转换为JSON数据返回
echo json_encode($data,true);

?>