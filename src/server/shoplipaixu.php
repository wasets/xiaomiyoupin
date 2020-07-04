<?php
/**该文件来对商品来排序  */
/* 1、连接数据库 */
include_once "./connectDB.php";

$page = $_REQUEST["page"];  /* 0 1 2 3  */
$sort = $_REQUEST["sort"];

$limit = $page * 12;

if($sort == "default"){
  $sql = "SELECT * FROM shoplist1 Order BY good_id LIMIT $limit,12";
}elseif($sort == "price_asc"){
  $sql = "SELECT * FROM shoplist1 Order BY price ASC LIMIT $limit,12";
} elseif ($sort == "price_desc") {
  $sql = "SELECT * FROM shoplist1 Order BY price DESC LIMIT $limit,12";
}

$result = mysqli_query($db,$sql);
$data = mysqli_fetch_all($result,MYSQLI_ASSOC);

/* 3、把数据转换为JSON数据返回 */
echo json_encode($data,true);
?>