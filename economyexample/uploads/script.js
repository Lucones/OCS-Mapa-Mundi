// Auxiliary variables
var posicaoX = new Array;
var posicaoY = new Array;
var tempoTag = new Array;
var tagName;
var tagLink;

var tagList = new Array;
var counterTags = 0;

var spaceTest = 0;
var tagEnd = 0;
var link = "";
var tagSelected;
var optionSelected = 0;
var colorTag = "rgba(0,0,255, 1)";

var counter = 0;
var info = "";

// Constant
var NAME = 0;
var LINK = 1;
var POS_X = 2;
var POS_Y = 3;
var TIME = 4;
var WIDTH = 5;
var HEIGHT = 6;

var width = 50;
var height = 50;
var MAX = 400, MIN = 10, STEP = 10;

// Disable the "add video" button and able the "add tag" button
function activeTag () {
	var uploaded = document.getElementById("dialog3");
	uploaded.setAttribute("disabled", "disabled");
	uploaded.style.background = "#E5E5E5";
	uploaded.style.border = "1px solid #D6D6D6";
	uploaded.innerHTML = "Video uploaded";
	var addTag = document.getElementById("add_tag_disable");
	addTag.setAttribute ("id", "add_tag_aux");
	addTag.removeAttribute ("disabled");
	addTag.setAttribute ("onclick", "activeTag2()");
}

// Change the text and the color of the "add tag" button
function activeTag2 () {
	var addTag = document.getElementById("add_tag_aux");
	addTag.setAttribute ("id", "add_tag");
	addTag.innerHTML = "Click on the video";
	addTag.blur();
}

// Remove all elements of the auxiliary arrays
function cleanAll () {
	while (v1.posicaoX.length > 0) {
		v1.posicaoX.pop();
		v1.posicaoY.pop();
		v1.tempoTag.pop();
	}
}

// Remove the div "blockTag" that prevents the user to start to tag the video before click in "add tag" button
function removeBlockTag () {
	var blockTag = document.getElementById("blockTag");
	blockTag.style.display = "none";
	document.getElementById("dialog4").style.display = "none";
	tagName = document.getElementById("tagName").value;
	tagLink = document.getElementById("tagLink").value;
	document.getElementById("tagName").value = "";
	document.getElementById("tagLink").value = "";
	if (v1.counterTags > 0) {
		v1.tagEnd = 0;
		var api = v1.flowplayer();
		api.stop();
		v1.document.getElementById("tags").innerHTML = "";
		v1.document.getElementsByClassName("flowplayer")[0].style.zIndex = "1000";
		v1.document.getElementById("myCanvas").style.zIndex = "500";
		v1.document.getElementById("myCanvas").setAttribute("onclick", "canvas(); saveTags()");
		cleanAll();
		
		var x = v1.document.getElementById("tudo").offsetWidth;
		var y = v1.document.getElementById("tudo").offsetHeight;
		
		var canvas = v1.document.getElementById("myCanvas").getContext("2d");
		canvas.clearRect (0, 0, x, y);
	}
	document.getElementById("div3").innerHTML = "<div id='boxes2'><div id='dialog5' class='window'><a href='#' onclick='removeInstructions()' class='close'><img src='images/fechar.png' alt='HTML tutorial' width='25' height='25'> </a><br /><p> - Instructions: </p><p>1) First, click over the video to start it;</p><p>2) After, click over the video again to start the tagging action.</p><pre></pre></div>";
}

// Remove the div "boxes2" that shows some steps of how to tag
function removeInstructions() {
	document.getElementById("boxes2").style.display = "none";
}

// Change the size of the canvas to the same size of the div "tudo"
function changeSize () {
	var x = document.getElementById("tudo").offsetWidth;
	var y = document.getElementById("tudo").offsetHeight;
	document.getElementById("myCanvas").setAttribute("width", x);
	document.getElementById("myCanvas").setAttribute("height", y);
}

// Take the mouse position and put in the divs "x" and "y"
function mousePosition () {
	var e = window.event;
    document.getElementById ("x").value = e.clientX;
    document.getElementById ("y").value = e.clientY;
}

// Draw the path of the tags on the canvas
function canvas () {
	var p = document.getElementById("myCanvas").getContext("2d");
	var e = window.event;
	var x = e.clientX;
	var y = e.clientY;
	
	var width = document.getElementById("tudo").offsetWidth;
	var height = document.getElementById("tudo").offsetHeight;
	
	p.fillStyle = "3370d4";
	p.beginPath();
	p.arc(x,y,3,0,360);
	p.closePath();
	p.fill();
	
	if (tagEnd == 1) {
		document.getElementById("myCanvas").removeAttribute("onmousemove");
		p.clearRect (0, 0, width, height);
	}
	else {
		document.getElementById("myCanvas").setAttribute("onmousemove", "canvas()");
		document.getElementById("myCanvas").setAttribute("onclick", "addOption(); createTimeline()");
	}
}

// Save a new position of the tag every 100 milliseconds
function saveTags () {
	var api = flowplayer();
	var currentTime = api.ready ? api.video.time : 0;
	var x = document.getElementById("x").value;
	var y = document.getElementById("y").value;
	posicaoX.push (x);
	posicaoY.push (y);
	tempoTag.push (currentTime);
	if (tagEnd == 1) {
		//var tudo = "";
		//for (i = 0; i < posicaoX.length; i++) {
		//	tudo = tudo + posicaoX[i] + " / " + posicaoY[i] + " - " + tempoTag[i] + "\n";
		//}
		//alert (tudo);
	}
	else {
		setTimeout("saveTags()", 100);
	}
}

// Put the div canvas in front of the Flowplayer
function playToTag () {
	document.getElementsByClassName("flowplayer")[0].style.zIndex = "500";
	document.getElementById("myCanvas").style.zIndex = "1000";
}

// Create a timeline with all positions of the tag
function createTimeline () {
	var e = window.event;
	
	tagEnd = 1;
	document.getElementById("myCanvas").removeAttribute("onclick");
		
	var x = document.getElementById("tudo").offsetWidth;
	var y = document.getElementById("tudo").offsetHeight;
		
	var canvas = document.getElementById("myCanvas").getContext("2d");
	canvas.clearRect (0, 0, x, y);
	
	var size = tagList[optionSelected][POS_X].length;
	var i;
	var li;
	var content;
	document.getElementById("tags").innerHTML = "";
	for (i=0; i < size; i++) {
		li = document.createElement("li");
		li.setAttribute("id", i);
		li.setAttribute("class", "tag");
		li.setAttribute("onmouseover", "tagPosition("+ i + ", " + optionSelected +")");
		li.setAttribute("onclick", "confirmRemove("+ i + ", " + optionSelected +")");
		content = document.createTextNode(i);
		li.appendChild(content);
		document.getElementById("tags").appendChild(li);
		//document.getElementsByClassName("tag")[i].style.width = (Math.floor(x/size)-1) + "px";
	}
}

// Add a new element in the list of the tags (the right of the site)
function addOption () {
	addTagList();
	
	var list = parent.document.getElementById("list");
	var option = document.createElement("option");
	var optionName = document.createTextNode(tagList[counterTags][NAME]);
	option.appendChild(optionName);
	option.value = counterTags;
	option.setAttribute("onclick", "showTag(this.value)");
	list.appendChild(option);
	var add_tag = parent.document.getElementById("add_tag");
	add_tag.setAttribute("id", "add_tag_aux");
	add_tag.setAttribute("onlick", "activeTag2()");
	add_tag.innerHTML = "+ Add Tag";
	add_tag.removeAttribute("disabled");
	
	counterTags++;
}

// Join all informations (x, y and time) in the main array "tagList"
function addTagList () {
	var tag = new Array;
	var posx = posicaoX.toString();
	posx = posx.split(",");
	var posy = posicaoY.toString();
	posy = posy.split(",");
	var t = tempoTag.toString();
	t = t.split(",");
	tag.push(parent.tagName, parent.tagLink, posx, posy, t, width, height);
	tagList.push(tag);
}

// Show timeline regarding a tag selected in the list
function showTag(id) {
	v1.optionSelected = id;
	//alert (v1.tagList[v1.optionSelected][POS_X]);
	v1.createTimeline();
	
	var del = document.getElementById("delete");
	del.style.display = "initial";
	del.setAttribute("onclick", "deleteTag("+id+")");
	
	var editName = v1.document.getElementById("editName");
	var editLink = v1.document.getElementById("editLink");
	var editButton = v1.document.getElementById("editButton");
	editName.style.display = "initial";
	editLink.style.display = "initial";
	editButton.style.display = "initial";
	editButton.setAttribute("value", id);
	editName.value = v1.tagList[id][NAME];
	editLink.value = v1.tagList[id][LINK];
}

// Edit 'name' and 'link' of the tag
function editNameLink (id) {
	var editName = document.getElementById("editName");
	var editLink = document.getElementById("editLink");
	var editButton = document.getElementById("editButton");
	tagList[id][NAME] = editName.value;
	tagList[id][LINK] = editLink.value;
	editName.removeAttribute ("value");
	editLink.removeAttribute ("value");
	editName.style.display = "none";
	editLink.style.display = "none";
	editButton.style.display = "none";
	var op = parent.document.getElementById("list");
	var i;
	for (i=0; i < op.options.length; i++) {
		if (op.options[i].selected) {
			op.options[i].textContent = editName.value;
		}
	}
}

// Show the tag position in the video when the user hover the mouse over the timeline
function tagPosition (i, j) {
	var time = tagList[j][TIME][i];
	var api = flowplayer();
	api.toggle();
	api.seek(time);
	
	var x = document.getElementById("tudo").offsetWidth;
	var y = document.getElementById("tudo").offsetHeight;
	
	var canvas = document.getElementById("myCanvas").getContext("2d");
	canvas.clearRect (0, 0, x, y);
	
	canvas.beginPath();
	canvas.rect(tagList[j][POS_X][i]- (tagList[j][WIDTH])/2, tagList[j][POS_Y][i]- (tagList[j][HEIGHT])/2, tagList[j][WIDTH], tagList[j][HEIGHT]);
	canvas.strokeStyle = colorTag;
	canvas.stroke();
	tagSelected = i;
	document.getElementById("myCanvas").setAttribute("onmousedown", "editTag()");
}

// Call the functions "dragDrop" and "changeTag" when the user click inside of the tag in the video
function editTag () {
	var coord = [document.getElementById("x").value, document.getElementById("y").value];
	if (tagEnd == 1) {
		if (isInside (tagList[optionSelected][POS_X][tagSelected]-(tagList[optionSelected][WIDTH])/2, tagList[optionSelected][POS_Y][tagSelected]-(tagList[optionSelected][HEIGHT])/2, coord)) {
			document.getElementById("myCanvas").setAttribute("onmousemove", "dragDrop()");
			document.getElementById("myCanvas").setAttribute("onmousedown", "changeTag()");
		}
	}
}

// Change the position of the tag
function changeTag () {
	document.getElementById("myCanvas").removeAttribute("onmousedown");
	document.getElementById("myCanvas").removeAttribute("onmousemove");
	var coord = [document.getElementById("x").value, document.getElementById("y").value];
	tagList[optionSelected][POS_X][tagSelected] = coord[0];
	tagList[optionSelected][POS_Y][tagSelected] = coord[1];
}

// Add remove button when the user click over a position in the timeline
function confirmRemove (i) {
	document.getElementById("confirmRemove").innerHTML = "<input type='button' value='Remove' onclick='removeTag("+i+")'/>"
}

// Remove the tag position selected in the timeline when the user clicks in the remove button
function removeTag (i) {
	var j;
	for (j=i; j < posicaoX.length-1; j++) {
		tagList[optionSelected][POS_X][j] = tagList[optionSelected][POS_X][j+1];
		tagList[optionSelected][POS_Y][j] = tagList[optionSelected][POS_Y][j+1];
		tagList[optionSelected][TIME][j] = tagList[optionSelected][TIME][j+1];
	}
	tagList[optionSelected][POS_X].pop();
	tagList[optionSelected][POS_Y].pop();
	tagList[optionSelected][TIME].pop();
	
	var elem = document.getElementById(i);
	elem.parentNode.removeChild(elem);
	document.getElementById("confirmRemove").innerHTML = "";
}

// Allow the user to select the tag and change its position
function dragDrop () {
	var coord = [document.getElementById("x").value, document.getElementById("y").value];
	var x = document.getElementById("tudo").offsetWidth;
	var y = document.getElementById("tudo").offsetHeight;
	
	var canvas = document.getElementById("myCanvas").getContext("2d");
	canvas.clearRect (0, 0, x, y);
	
	canvas.beginPath();
	canvas.rect(coord[0]-(tagList[optionSelected][WIDTH])/2, coord[1]-(tagList[optionSelected][HEIGHT])/2, tagList[optionSelected][WIDTH], tagList[optionSelected][HEIGHT]);
	canvas.strokeStyle = colorTag;
	canvas.stroke();
}

// Verify if the mouse is inside of the tag to open the link to another page
function collision (x, y, link, coord) {
	if ( (coord[0] < x+50 && coord[0] > x) && (coord[1] < y+50 && coord[1] > y) ) {
		document.getElementById("myCanvas").onclick = function() {window.open(link);};
	}
}

// Verify if the mouse is inside of the tag
function isInside (x, y, coord) {
	if ( (coord[0] < x+tagList[optionSelected][WIDTH] && coord[0] > x) && (coord[1] < y+tagList[optionSelected][HEIGHT] && coord[1] > y) ) {
		return true;
	}
	else {
		return false;
	}
}

// Plot all tags together in the video
function plotTag () {
	var canvas = document.getElementById("myCanvas").getContext("2d");
	var size = tagList.length;
	var api = flowplayer();
	var tempo = api.video.time;
	var aux;
	var flag = 0;
	
	if (counter < size && tempo >= tagList[counter][TIME]) {
		if (counter > 0) {
			//canvas.clearRect (tagList[counter-1][POS_X] - (5+((tagList[counter][WIDTH])/2)), tagList[counter-1][POS_Y]-(5+((tagList[counter][HEIGHT])/2)), (10+(tagList[counter][WIDTH])), (10+(tagList[counter][HEIGHT])));
			for (aux = 0; aux <= counter; aux++) {
				if (tagList[counter][LINK] == tagList[aux][LINK]) {
					canvas.clearRect (tagList[aux][POS_X]-30, tagList[aux][POS_Y]-30, 60, 60);
				}
			}
			for (aux = counter; aux < tagList.length; aux++) {
				if (aux == tagList.length-1) {}
				else {
					if (tagList[counter][LINK] == tagList[aux+1][LINK]) {
						flag = 1;
						break;
					}
				}
			}
		}
		if (flag != 0) {
			canvas.clearRect (tagList[counter][POS_X]-30, tagList[counter][POS_Y]-30, 60, 60);

			canvas.beginPath();
			canvas.rect(tagList[counter][POS_X]-(tagList[counter][WIDTH])/2, tagList[counter][POS_Y]-(tagList[counter][HEIGHT])/2, tagList[counter][WIDTH], tagList[counter][HEIGHT]);
			canvas.strokeStyle = colorTag;
			canvas.stroke();

			var coord = [document.getElementById("x").value, document.getElementById("y").value];
			collision (tagList[counter][POS_X]-(tagList[counter][WIDTH])/2, tagList[counter][POS_Y]-(tagList[counter][HEIGHT])/2, tagList[counter][LINK], coord);
		}
		counter++;
	}
	setTimeout ("plotTag()", 10);
}

// Modify the size of the tag
function modifyTagSize(e) {
    // this would test for whichever key is 40 and the ctrl key at the same time
    if (e.shiftKey && e.keyCode == 37) {
    	if (tagList[optionSelected][WIDTH] > MIN) { tagList[optionSelected][WIDTH] -=STEP;}       
    }
    else if(e.shiftKey && e.keyCode == 38){
    	if (tagList[optionSelected][HEIGHT] < MAX) { tagList[optionSelected][HEIGHT] +=STEP;}
    }
    else if(e.shiftKey && e.keyCode == 39){
    	if (tagList[optionSelected][WIDTH] < MAX) { tagList[optionSelected][WIDTH] +=STEP;}
    }
    else if(e.shiftKey && e.keyCode == 40){
    	if (tagList[optionSelected][HEIGHT] > MIN) { tagList[optionSelected][HEIGHT] -=STEP;}
    }
    else{}
    
    var x = document.getElementById("tudo").offsetWidth;
	var y = document.getElementById("tudo").offsetHeight;
	
	var canvas = document.getElementById("myCanvas").getContext("2d");
	canvas.clearRect (0, 0, x, y);
	
	i= tagSelected;
	j = optionSelected;
	canvas.beginPath();
	canvas.rect(tagList[j][POS_X][i]- (tagList[j][WIDTH])/2, tagList[j][POS_Y][i]- (tagList[j][HEIGHT])/2, tagList[j][WIDTH], tagList[j][HEIGHT]);
	canvas.strokeStyle = colorTag;
	canvas.stroke();
}

// Generate the information with all tags sorted and put its in the hidden input "stringTag"
function finish() {
	var sort = v1.sortByTime();
	v1.document.getElementById("stringTag").value = sort;
}

// Read the tags in the JSON file
function readTag () {
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest ();
	}
	else {
		// code for IE6, IE5
		xmlhttp = new ActiveXObject ("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange =
	function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			var stringAux = xmlhttp.responseText;
			tagList = JSON.parse (stringAux);
		}
	}
	xmlhttp.open ("GET","reading.php",true);
	xmlhttp.send ();
}

// Play the video and call "plotTag" function
function playVideo () {
	var api = flowplayer();
	api.toggle();
	plotTag();
	document.getElementById("myCanvas").removeAttribute("onclick");
}

// Sort the tags by time
function sortByTime(){
	
	var tagListTime = new Array;
	
	var aux1, aux2;
	var cont = true;
	var index;
	var pid;
	var i;
	
	var P;
	var p= new Array;
	var pMax = new Array;
	
	//PREPARE PIVOTS
	var numberTags;
	numberTags = tagList.length;
	P = numberTags - 1;

	for(i=0;i<numberTags;i++){
		p.push(0);
	}
		
	for(i=0;i<numberTags;i++){
		var max = tagList[i][TIME].length;
		max = max-1;
		pMax.push(max);
	}	

	//SORT
	while(cont){
		aux1 = 1000000;
		aux2 = 1000000;
		cont = false;
		for(i=0; i<=P; i++){
			if(p[i] <= pMax[i]){
				cont = true;
				pid = p[i];
				aux2 = tagList[i][TIME][pid];
				
				if (aux2 <= aux1){
					aux1 = aux2;
					index = i;
				}
			}
		}
		pid = p[index];
		p[index] = p[index] + 1;
		var name = tagList[index][NAME];
		var link = tagList[index][LINK];
		var wid = tagList[index][WIDTH];
		var hei = tagList[index][HEIGHT];
		var X = tagList[index][POS_X][pid];
		var Y = tagList[index][POS_Y][pid];
		var Temp = [name,link,X,Y,aux1,wid,hei];
		tagListTime.push(Temp);
	}
	tagListTime.pop();
	
	var string = JSON.stringify(tagListTime);
		
	return string;
}

// Delete the selected tag when the user clicks over the "Delete tag" button
function deleteTag(id) {
	var test;
	v1.tagList.splice(id, 1);
	var op = document.getElementById("list");
	op.remove(op.selectedIndex);
	var i;
	for (i=0; i < op.options.length; i++) {
		op.options[i].value = i;
	}
	v1.counterTags--;
	document.getElementById("delete").style.display = "none";
}