$(document).ready(function(){

/*------------------------------ Files upload and lightbox(windows)------------------------------------------------------------------------- */		
	$('#dialog3').click(function(e) {
		e.preventDefault();
		
		var id = '#dialog';
	
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		$('#mask').fadeIn(1000);	
		$('#mask').fadeTo("slow",0.1);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
			  
		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);
	
		$(id).fadeIn(2000); 
	
	});
	
	// Generate the embedded code
	$('#finish').click(function(e) {
		e.preventDefault();
		
		var id = '#dialog2';
	
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		$('#mask').fadeIn(1000);	
		$('#mask').fadeTo("slow",0.1);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
			  
		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);
	
		$(id).fadeIn(2000); 
		
		$('#linkIframe').attr('style', '');
		var source = $('#v1').attr('src');
		source = source.replace ("index", "read");
		var element = "<iframe width='675' height='383' src='http://localhost/blog_2/"+source+"' frameborder='0' allowfullscreen></iframe>";
		$('#textFrame').text(element);
		
		
		var dir1 = $('#v1').attr('src');
	
		//TO DO - pegar o array e montar a string para salvar no .json
		var stringTag = v1.document.getElementById("stringTag").value;

		var campos = "stringTag="+stringTag+"&dir="+dir1;

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
			//var stringAux = xmlhttp.responseText;
			//tagList = JSON.parse (stringAux);
		}
	}
	xmlhttp.open ("POST","writing.php",true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("Content-length", campos.length);
	xmlhttp.setRequestHeader("Content-length", campos.length);
	xmlhttp.send (campos);
	});	

	$('#choose').click(function (e) {
		e.preventDefault();
	});

	// Open the window to add new tag
	$('#add_tag_disable').click(function(e) {
		e.preventDefault();
		
		var id = '#dialog4';
	
		var maskHeight = $(document).height();
		var maskWidth = $(window).width();
	
		$('#mask').css({'width':maskWidth,'height':maskHeight});
		$('#mask').fadeIn(1000);	
		$('#mask').fadeTo("slow",0.1);	
	
		//Get the window height and width
		var winH = $(window).height();
		var winW = $(window).width();
			  
		$(id).css('top',  winH/2-$(id).height()/2);
		$(id).css('left', winW/2-$(id).width()/2);
	
		$(id).fadeIn(2000); 
		var source = $('#v1').attr('src');
		var element = "";
		$('#textFrame').text(element);
	});	
	
	$('.window .close').click(function (e) {
		e.preventDefault();
		$('.window').hide();
		$('#linkIframe').attr('style', 'display: none;');
	});		

	$('#show_div').click(function(event){
		event.preventDefault();
		$('#upload').show("slow");
	});

	$('#hide_div').click(function(event){
		event.preventDefault();
		$('#upload').hide("slow");
	});
					
	$('#form').ajaxForm({
		
		uploadProgress: function(event, position, total, percentComplete) {
			$('progress').attr('value',percentComplete);
			$('#porcentagem').html(percentComplete+'%');

		},
		success: function(data) {
			$('progress').attr('value','100');
			$('#porcentagem').html('100%');
			$('#v1').attr('src',data);
			$('#mask').hide();
			$('.window').hide();
			$('progress').attr('value','0');
			$('#porcentagem').html('0'+'%');
			$('#upl').val("");
		}

	});
	
/*----------------------------------- Function to call a php function - files .json----------------------------------*/
$(function(){
	$('#choose').click(function(){
		var dir1 = $('#v1').attr('src');
	
		//TO DO - pegar o array e montar a string para salvar no .json
		var stringTag = v1.document.getElementById("stringTag").value;
		$.ajax({
			type: "POST",
			url: "writing.php",
			data: "stringTag="+stringTag+"&dir="+dir1,
			
			success: function(){
				//alert('Tag added successfully!');
			}
		});	
	});
});	

/*----------------------------- Function to call a php function - files .json------------------------------*/
$(function(){
	$('#readTag').click(function(){
		var dir = $('#v1').attr('src');
		
		$.ajax({
			type: "POST",
			url: "reading.php",
			data: "dir="+dir,
			
			success: function(returnData){
				alert(returnData);
				//TO DO -> string for show in video array
			}
		});
	});
});		
});
