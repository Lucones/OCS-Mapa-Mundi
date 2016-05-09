<?php
// Nas versões do PHP anteriores a 4.1.0, $HTTP_POST_FILES deve ser utilizado ao invés
// de $_FILES.

$uploaddir = 'C:\xampp\htdocs\INPUT\\';
$uploadfile = $uploaddir . basename($_FILES['userfile']['name']);

echo '<pre>';
echo '<div style = \'height: 30px; width:100%; background-color:#6FDE73; color:#ffffff; padding-left: 35%;\'>';
if (move_uploaded_file($_FILES['userfile']['tmp_name'], $uploadfile)) {
    echo ">>>>>>>>>>>          Arquivo válido e enviado com sucesso!              <<<<<<<\n";
} else {
    echo "Possível ataque de upload de arquivo!\n";
}
echo '</div>';
/*echo 'Aqui está mais informações de debug:';
print_r($_FILES);
*/
print "</pre>";



$file = fopen($_FILES['userfile']['name'],"r");

#while(! feof($file))
#  {
#  print_r(fgetcsv($file,0,' '));
#  echo'<BR>';
#  }

/*
  $row = 1;

  $data = array();
 $fileWrite = fopen("test.prn","w");
 if (($handle = fopen($_FILES['userfile']['name'],"r")) !== FALSE) {
     while (($data = fgetcsv($handle, 1000, ";")) !== FALSE) {
         $num = count($data);
         #echo "<p> $num campso na linha $row: <br /></p>\n";
         $row++;
         for ($c=0; $c < $num; $c++) {            
         	fwrite($fileWrite, " ".$data[$c]."\n");				
         }
     }
 
	fclose($fileWrite);
    fclose ($handle);
 }
*/

$countLinesOfFile = 0;


$data2DArray = get2DArrayFromCsv($_FILES['userfile']['name'], ";");
$arrayFinal = array();

for($i=3;$i<44; $i++){
    for($j=0;$j<count($data2DArray) -1 ;$j++){
            $dataMap[$j] = $data2DArray[$j][$i];
            $countries[$j] = $data2DArray[$j][0];
            $j++;
    }
    $data = array_combine( $dataMap,  $countries);
    ksort($data);
   // print_r(array_chunk($data, 18, TRUE));

    /*
    foreach ($data as $k1 => $val) {
            echo  "    PAÍS >>> " . $val . " ===> " . $k1 . "<br>";
    }

    echo "<br><br><br>";

    */
}


    function get2DArrayFromCsv($file,$delimiter) { 
  $fileWrite = fopen("test.prn","w"); 
  $discount = -1000;  	  
        if (($handle = fopen($file, "r")) !== FALSE) { 
            $i = 0; 
            while (($lineArray = fgetcsv($handle, 4000, $delimiter)) !== FALSE) { 
                $countLinesOfFile = count($lineArray);
                for ($j=0; $j< $countLinesOfFile ; $j++) { 
                    $data2DArray[$i][$j] = $lineArray[$j]; 
                    if((is_numeric($data2DArray[$i][$j]) == FALSE) && $j<> 0 && $j<> 1 && $j<> 2){
                            $data2DArray[$i][$j] = $discount;
                            $discount = $discount-1;
                     }
                    fwrite($fileWrite, " ".$data2DArray[$i][$j]."\n\n\n\n\n");	
                } 
                $i++;
                fwrite($fileWrite, "\n\n"); 
            } 
            fclose($fileWrite);
            fclose($handle); 
        } 
        return $data2DArray; 
    } 

fclose($file);
include('C:\xampp\htdocs\OCS-Mapa-Mundi\economyexample\index.html');
?>