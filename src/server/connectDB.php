<?php
header("Content-type:text/html;charset=utf8");
$db = mysqli_connect("localhost", "root", "", "KEHU");

if (!$db) {
  die('连接错误: ' . mysqli_error($db));
}
?>