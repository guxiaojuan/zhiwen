<?php
  sleep(3);
  require('config.php');
  
  //sha1函数用来加密
  $query="INSERT INTO zhiwen(user,pass,email,sex,birthday,date) VALUES('{$_POST['user']}',sha1('{$_POST['pass']}'),'{$_POST['email']}','{$_POST['sex']}','{$_POST['birthday']}',NOW())";
  
  mysql_query($query) or die('新增失败'.mysql_error());

  echo mysql_affected_rows();
  mysql_close();
  
?>