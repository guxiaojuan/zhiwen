<?php
   require('config.php');
   $_pass=sha1($_POST['login_pass']);
   $query=mysql_query("SELECT user,pass FROM zhiwen WHERE user='{$_POST['login_user']}' AND pass='{$_pass}' ")or die('SQL错误');
   //echo "{$_pass}";

   if(mysql_fetch_array($query))
      echo 'true';
   else
      echo 'false';
	 
   mysql_close();
?>