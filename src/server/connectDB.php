<?php
/*该文件来负责连接数据库的表 */
header("Content-type:text/html;charset=utf8");
$db = mysqli_connect("localhost", "root", "", "KEHU");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
}
?>