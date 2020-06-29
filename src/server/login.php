<?php
// header("Content-type:text/html;charset=utf8");
$username = $_REQUEST["username"];
$password = $_REQUEST["password"];


/* 用户登录的时候逻辑： */
/* 先检查该用户是否存在，如果不存在那么应该返回错误提示:该用户名不存在 */
/* 如果用户存在，那么应该继续检查密码，如果密码不正确，应该返回错误提示：密码不正确 */
/* 如果密码正确，应该返回正确的提示：登录成功！！！ */
include_once "./connectDB.php";

$sql = "SELECT * FROM `user` WHERE username = '$username'";
echo $sql;
$r = mysqli_query($db, $sql);

$num = mysqli_num_rows($r); /* 该方法得到的是记录的条数:$r["num_rows"]  */
echo $num;
if($num == 1){
    
   echo $data = mysqli_fetch_all($r,MYSQLI_ASSOC);
//   $data = mysqli_fetch_all($r,MYSQLI_ASSOC)[0];
//   if($password  === $data["password"]){
//     echo '{"status":"success","msg":"登录成功!"}';
      /* ..登录成功.. */
     
//   }else{
//     echo '{"status":"error","msg":"密码不正确!"}';
//   }
// }else{
//   echo '{"status":"error","msg":"该用户名不存在!"}';
}


?>