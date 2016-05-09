<?php



for ($i = 1; $i <= 10; $i++) {
   $myfile = fopen("iframe". $i .".html", "w") or die("Unable to open file!");
	$txt = "


<!DOCTYPE html>
<!--
  Copyright 2011 Google Inc. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the \"License\");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an \"AS IS\" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
<html>
  <head>
    <meta name=\"viewport\" content=\"initial-scale=1.0, user-scalable=no\">
    <link rel=\"stylesheet\" href=\"css/prototype.css\">
  <meta http-equiv=\"Cache-Control\" content=\"no-store\" />
  <meta charset=\"utf-8\"/>
    <title>Economy Maps</title>
  </head>
  <body onload=\"myFunction()\">

<style type=\"text/css\">
      #map-canvas {
        height: 805px;
        width: 1585px;
      }
    </style>
    <script type=\"text/javascript\"
        src=\"https://maps.google.com/maps/api/js?\"></script>

    <script type=\"text/javascript\">

    var citymap = {

ilhasVirgensBritanicas: {
  center: {lat: 18.4183637, lng: -64.7255156},
   population: 603502 
 },
ilhasVirgensAmericanas: {
  center: {lat: 18.3435916, lng: -64.9372034},
   population: 603502
 },
anguilla: {
  center: {lat: 18.2234209, lng: -63.1266736},
  population: 603502
 },
saocristovaonevis: {
  center: {lat: 17.2564738, lng: -62.8420484},
   population: 603502
 },
guadalupe: {
  center: {lat: 16.173697, lng: -61.6859504},
   population: 603502 
 },
dominica: {
  center: {lat: 15.4240447, lng: -61.500197},
   population: 603502 
},
martinica: {
  center: {lat: 14.633972, lng: -61.1599073},
 population: 603502
  },
santaLucia: {
  center: {lat: 13.9098181, lng: -61.1164656},
   population: 603502 
 },
barbados: {
  center: {lat: 13.1902902, lng: -59.605604},
   population: 603502 
 },
saoVicenteeGrandinas: {
  center: {lat: 13.2529755, lng: -61.2672029},
   population: 603502 
},
granada: {
  center: {lat: 12.1101276, lng: -61.7635904} ,
  population: 603502 
}

};
      var colors = ['#00025a','#4f62d8','#abc6d4', '#e6e6fa'];


      var map;

      function initialize() {
        var myOptions = {
          zoom: 2,
          center: new google.maps.LatLng(10, 0),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map(document.getElementById('map-canvas'),
            myOptions);

        // Initialize JSONP request
        var script = document.createElement('script');
        var url = ['https://www.googleapis.com/fusiontables/v1/query?'];
        url.push('sql=');
        var query = 'SELECT name, kml_4326 FROM ' +
            '1foc3xO9DyfSIF6ofvN0kp2bxSfSeKog5FbdWdQ';
        var encodedQuery = encodeURIComponent(query);
        url.push(encodedQuery);
        url.push('&callback=drawMap');
        url.push('&key=AIzaSyAm9yWCV7JPCTHCJut8whOjARd7pwROFDQ');
        script.src = url.join('');
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(script);
      }

      function drawMap(data) {
        var rows = data['rows'];
        var nomes=\"\";
        for (var i in rows) {
          if (rows[i][0] != 'Antarctica') {
            var newCoordinates = [];
            var geometries = rows[i][1]['geometries'];
            var names = rows[i][0];
            nomes= nomes + \" \" +rows[i][0] + \" \";
            if (geometries) {
              for (var j in geometries) {
                newCoordinates.push(constructNewCoordinates(geometries[j]));
              }
            } else {
              newCoordinates = constructNewCoordinates(rows[i][1]['geometry']);
            }
            var randomnumber = Math.floor(Math.random() * 4);
            var country = new google.maps.Polygon({
              paths: newCoordinates,
              strokeColor: colors[randomnumber],
              strokeOpacity: 0,
              strokeWeight: 1,
              fillColor: colors[randomnumber],
              fillOpacity: 0.8
            });
            google.maps.event.addListener(country, 'mouseover', function() {
              this.setOptions({fillOpacity: 0.9});
            });
            google.maps.event.addListener(country, 'mouseout', function() {
              this.setOptions({fillOpacity: 0.8});
            });

            country.setMap(map);
          }
        }
      for (var city in citymap) {
    // Add the circle for this city to the map.
    var cityCircle = new google.maps.Circle({
      strokeColor: '#E00B52',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#E00B52',
      fillOpacity: 0.25,
      map: map,
      center: citymap[city].center,
      radius: Math.sqrt(citymap[city].population) * 50
    });
  }

      }

      function constructNewCoordinates(polygon) {
        var newCoordinates = [];
        var coordinates = polygon['coordinates'][0];
        for (var i in coordinates) {
          newCoordinates.push(
              new google.maps.LatLng(coordinates[i][1], coordinates[i][0]));
        }
        return newCoordinates;
      }

      google.maps.event.addDomListener(window, 'load', initialize);


    function Mudarestado(el) {
    var display = document.getElementById(el).style.display;
    if(display == \"none\")
        document.getElementById(el).style.display = 'block';
    else
        document.getElementById(el).style.display = 'none';
}
    </script>


<div class=\"divs_content\">

    <div id=\"div1\">

     <!-- <div id=\"logo\"><img src=\"images/logo3.png\"/></div> -->


      <button id = \"dois\" class=\"button\" type=\"button\" onclick=\"Mudarestado('minhaDiv')\"> # Configurações 
          <div id=\"minhaDiv\" class= \"buttonText\" >  Em breve mais informações. </div></button>

      <button id = \"tres\"class=\"button\" type=\"button\" onclick=\"Mudarestado('minhaDiv2')\">  ! Sobre         
       <div id=\"minhaDiv2\" class= \"buttonText\" >  Este é um projeto da disciplina Oficina de Criação de Software da universidade Federal de São joão del-Rei. O intuito deste aplicativo é atingir o maior número de pessoas que deseja realizar visualização de dados através de mapas-mundi. Você tem um arquivo CSV e quer transformá-lo em um mapa colorido? Veio ao lugar certo! Aproveite! </div></button>

      <button id = \"tres\"class=\"button\" type=\"button\" onclick=\"Mudarestado('minhaDiv3')\"> ? Ajuda    
            <div id=\"minhaDiv3\" class= \"buttonText\" > Em breve mais informações. </div></button>

      <div class=\"fileUpload btn btn-primary\">
         <span>... Upload</span>
        <input type=\"file\" class=\"upload\" />

      </div>

      <div id=\"quatro\">

        <div id=\"quatrosub1\" class=\"sub\">
                 Escolha um esquema de cores: <br><br>
      </div>
        <div id=\"quatrosub1\" class=\"sub\">
                <button id = \"dois\" class=\"buttoncolor1 quatrosub\" type=\"button\" onclick=\"\">  
          <div id=\"minhaDiv\" class= \"buttonText\" >  </div></button>
        </div>
        <div id=\"cincosub2\" class=\"sub\">
                          <button id = \"dois\" class=\"buttoncolor1 cincosub\" type=\"button\" onclick=\"\"> 
          <div id=\"minhaDiv\" class= \"buttonText\" >  </div></button> 
        </div>

        <div id=\"seissub3\" class=\"sub\">
                          <button id = \"dois\" class=\"buttoncolor1 seissub\" type=\"button\" onclick=\"\">  
          <div id=\"minhaDiv\" class= \"buttonText\" >  </div></button> 
          <br><br>
        </div>

        <div  class=\"sub2\">
          <br>
                 Escolha um percentil: <br><br>
        </div>

        <div class = \"sub\">
          <input type=\"text\"size=\"30\" name=\"percentil\">
        </div>
      </div>




    
  </div>
  <div class = \"middle\">

    <!--<div id=\"map-canvas\"></div> -->
    <iframe src=\"iframe.html\" style=\"border:none;height:800px; width:1570px\"></iframe>
    <div style= \"float:center; width: 2000px;\">
            <div  class=\"sub\">
                          <button id = \"\" class=\"buttoncolor1 setesub\" type=\"button\" onclick=\"\"> 
          <div  class= \"buttonText\" >  << Anterior </div></button> 
        </div>

        <div  class=\"sub\">
                          <button id = \"\" class=\"buttoncolor1 setesub\" type=\"button\" onclick=\"\">  
          <div  class= \"buttonText\" > Próximo >> </div></button> 
          <br><br>
        </div>
    </div>
  </div>



</body>
</html>





	";
	fwrite($myfile, $txt);
	fclose($myfile);
}
?>