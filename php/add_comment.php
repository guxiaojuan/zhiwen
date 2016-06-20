<?php
	sleep(1);
	require('config.php');
	
	$query = "INSERT INTO comment (titleId, comment, user, date) 
	VALUES ('{$_POST['titleId']}', '{$_POST['comment']}', '{$_POST['user']}', NOW())";
	
	mysql_query($query) or die('新增失败！'.mysql_error());
	
	echo mysql_affected_rows();
	
	mysql_close();
?>