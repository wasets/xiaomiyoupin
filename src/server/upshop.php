<?php
/*该文件是商品详情点击购物车的操作，来更新数据库
*/
header("Content-Type: text/json; charset=UTF-8");

/* 1、连接数据库 */
include_once "./connectDB.php";

$user_id = $_REQUEST["user_id"];
$good_id = $_REQUEST["good_id"];
$shop_num = $_REQUEST["shop_num"];
//2.执行添加操作
//先检查当前的商品在购物车中是否已经存在，如果不存在那么就要执行插入操作，否则就应该执行修改的操作 num+1
$sql = "SELECT * FROM cart WHERE good_id = $good_id AND user_id =$user_id";
$result =mysqli_query($db,$sql);
$num = mysqli_num_rows($result);


if($num ==0){
    $sql = "INSERT INTO cart " .
"(cart_id,good_id,user_id,num)" .
"VALUES " .
"(NULL,'$good_id','$user_id ','$shop_num')";
}elseif($num>0){
    $sql ="UPDATE cart SET num=num+$shop_num WHERE good_id=$good_id AND user_id=$user_id";
}

// $sql = "UPDATE cart SET num = num +1 WHERE good_id = $good_id AND user_id = $user_id";
$retval = mysqli_query($db,$sql);

if(!$retval){
    die('添加失败: ' . mysqli_error($conn));
}
echo "更新成功";





?>