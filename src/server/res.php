<?php
header("Content-type:text/html;charset=utf8");
include_once "./connectDB.php";

/* 核心逻辑： */
/* (1) 先拿到用户提交的参数 */
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];
$phone = $_REQUEST["phone"];

$sql = "SELECT * FROM `user` WHERE username = '$username'";

$r = mysqli_query($db, $sql);

$num= mysqli_num_rows($r); /* 该方法得到的是记录的条数:$r["num_rows"]  */

/* + 检查：检查当前的用户名在数据库中是否已经存在，如果存在那么就应该提示，否则就插入 */ 
if($num == 1){
  echo '{"status":"error","msg":"该用户已经存在，请重新填写注册的昵称!!"}';
  
}else{
  $sql = "INSERT INTO user " .
    "(id,username,password,user_date,phone)" .
    "VALUES " .
    "(NULL,'$username','$password','2020-06-28',$phone)";

  $retval = mysqli_query($db, $sql);

  if (!$retval) {
    die('无法插入数据: ' . mysqli_error($conn));
  }

  /* 注意：PHP代码中不能使用``符号 */
  echo '{"status":"success"}';
}

?>