<?php
	// Read JSON File
	$fp = fopen("string.json", 'r');
	$string = file_get_contents("string.json");
	echo($string);
	fclose($fp);
?>