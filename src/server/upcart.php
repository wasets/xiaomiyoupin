<?php
header("Content-Type: text/json; charset=UTF-8");

/* 1、连接数据库 */
include_once "./connectDB.php";

$user_id = $_REQUEST["user_id"];
$type = $_REQUEST["type"];


if($type == "update")
{
  $sign = $_REQUEST["flag"];
  $good_id = $_REQUEST["good_id"];

  if($sign == "add"){
    $plusSql = "UPDATE cart SET num= num+ 1 WHERE good_id=$good_id AND user_id=$user_id";
    mysqli_query($db,$plusSql);
  }elseif($sign == "rem"){
    $reduceSql = "UPDATE cart SET num= num- 1 WHERE good_id=$good_id AND user_id=$user_id";
   
    mysqli_query($db,$reduceSql);
  }
  echo json_encode(array("status"=>"success"), true);
}
elseif($type == "del")
{
  $good_id = $_REQUEST["good_id"];
  $delSql = "DELETE FROM `cart` WHERE good_id = $good_id AND user_id=$user_id";
  mysqli_query($db, $delSql);
  echo json_encode(array("status" => "success"), true);
}

?>