<?php
	// Write in JSON FILE
	$stringTag = $_POST["stringTag"];
	$dir1 = $_POST["dir"];
	$dstfile= str_replace("index.html", "string.json", $dir1);
	$fp = fopen($dstfile, 'w');
	fwrite($fp,$stringTag );
	fclose($fp);

?>
