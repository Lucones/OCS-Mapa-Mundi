<?php


if ($_FILES["file"]["type"] != "csv"){
	echo("Invalid file type. Allowed only .mp4, video format!");
	return;
}

if (!is_uploaded_file($_FILES['file']['tmp_name'])) {
	echo "Problems to upload file.";
	return;
}


// Creating the directory for the file and creating the name of the file
$names= fopen("uploads/counter.txt", "r");
$number = fgets($names);
$text= ($number+1)."\n";
$names= fopen("uploads/counter.txt", "w");
fwrite($names, $text);
fclose($names);
$number = str_replace("\n", "", $number);
$path = "./uploads/".$number."/";
mkdir($path, 0777);

$ext = explode ("/", $_FILES['file']['type']);
$video_name = sha1_file($_FILES['file']['tmp_name']).".".$ext[1];
$target = $path.$video_name;


// Moving the file to the directory created
if (!move_uploaded_file($_FILES['file']['tmp_name'], $target)) {
	echo ("Failed to move uploaded file.");
}else {

	$srcfile="./uploads/read.html";
	$dstfile= "./uploads/".$number."/read.html";
	copy($srcfile, $dstfile);
	
	$arquivo = $dstfile;
	$fp = fopen($arquivo, 'r');
	
	if($fp){
		$conteudo = fread($fp, filesize($arquivo));
		$conteudo = str_replace("src= -","src='".$video_name."'" ,$conteudo);
		$fp = fopen($arquivo, 'w');
		fwrite($fp, $conteudo);
		fclose($fp);
		$dir = "uploads/".$number."/read.html";
		$file_json= "uploads/".$number."/string.json";
		$json_file= fopen($file_json, 'a+');
		//echo($dir);
	}
	
	$srcfile="./reading.php";
	$dstfile= "./uploads/".$number."/reading.php";
	copy($srcfile, $dstfile);
	

	$srcfile="./uploads/index.html";
	$dstfile= "./uploads/".$number."/index.html";
	copy($srcfile, $dstfile);
	
	$arquivo = $dstfile;
	$fp = fopen($arquivo, 'r');
	
	if($fp){
		$conteudo = fread($fp, filesize($arquivo));
		$conteudo = str_replace("src= -","src='".$video_name."'" ,$conteudo);
		$fp = fopen($arquivo, 'w');
		fwrite($fp, $conteudo);
		fclose($fp);
		$dir = "uploads/".$number."/index.html";
		$file_json= "uploads/".$number."/string.json";
		$json_file= fopen($file_json, 'a+');
		echo($dir);
	}	
}

?>
