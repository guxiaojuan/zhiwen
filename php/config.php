<?php
//连接数据库
 $conn=mysql_connect("localhost","root");
 error_reporting(E_ALL&~E_NOTICE);
 
 if($conn==null){
     echo "数据库开启失败";
	 return;
 }
 mysql_query("SET NAMES 'utf8' ");//设置数据库编码，不然会产生乱码
 mysql_select_db("mydb");


?>