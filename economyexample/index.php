

<!DOCTYPE html>
<!--
  Copyright 2011 Google Inc. All Rights Reserved.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
<html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <link rel="stylesheet" href="css/prototype.css">
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
	<meta http-equiv="Cache-Control" content="no-store" />
	<meta charset="utf-8"/>
    <title>Fusion Tables Layer Example: Mouseover Map Styles</title>
  </head>
  <body onload="myFunction()">

<style type="text/css">
      #map-canvas {
        height: 700px;
        width: 900px;
      }
    </style>
    <script type="text/javascript"
        src="https://maps.google.com/maps/api/js?"></script>

    <script type="text/javascript">
      var colors = ['#008080 ', '#00FFFF', ' #AFEEEE', '#66CDAA'];
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
        for (var i in rows) {
          if (rows[i][0] != 'Antarctica') {
            var newCoordinates = [];
            var geometries = rows[i][1]['geometries'];
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
    </script>


<div class="divs_content">

		<div id="div1">

			<div id="logo"><img src="images/logo.png"/></div>

			<button id = "um" onclick = 'biQuadlowPassEffect();' class="button" type="button" > Importar + 
      </button>
<input type="file" id="myFile"  class="button" multiple size="50" onchange="myFunction()">

<p id="demo"></p>
    <script>
function myFunction(){
    var x = document.getElementById("myFile");
    var txt = "";
    if ('files' in x) {
        if (x.files.length == 0) {
            txt = "Select one or more files.";
        } else {
            for (var i = 0; i < x.files.length; i++) {
                txt += "<br><strong>" + (i+1) + ". file</strong><br>";
                var file = x.files[i];
                if ('name' in file) {
                    txt += "name: " + file.name + "<br>";
                }
                if ('size' in file) {
                    txt += "size: " + file.size + " bytes <br>";
                }
            }
        }
    } 
    else {
        if (x.value == "") {
            txt += "Select one or more files.";
        } else {
            txt += "The files property is not supported by your browser!";
            txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
        }
    }
    document.getElementById("demo").innerHTML = txt;
}
</script>
			<button id = "dois" class="button" type="button" onclick = 'biQuadhighPassEffect();'> Configurações </button>

			<button id = "tres"class="button" type="button" onclick = 'biQuadlowShelfEffect();'> Sobre</button>

			<button id = "tres"class="button" type="button" onclick = 'biQuadhighShelfEffect();'>Ajuda</button>
		
	</div>
	<div class = "middle">

		<div id="map-canvas"></div>

	</div>
	

</body>
</html>
