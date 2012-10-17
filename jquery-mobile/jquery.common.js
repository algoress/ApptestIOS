// JavaScript Document

// Wait for Cordova to load
//

var language_root = 'it';
//document.addEventListener("deviceready", onDeviceReady, false);


//---------------------------------------------------------------//
//TROVO DATI HOMEPAGE
//
function homepageDB(tx) {
	var outputhome = $('#txt-home');
	var content = $('#home-cont');
	
	$.ajax({
		url: 'http://test.vision121.it/appPhoneGap/ext/findhome.php',
		dataType: 'jsonp',
		data: "lingua=" + language_root,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			outputhome.empty();
			$.each(data, function(i,item){
					outputhome.css("background-position","center");
					outputhome.append(''+this["titolo"]+'');
					outputhome.css("background-image","http://test.vision121.it/appPhoneGap/_files/immagini/"+this["immagine"]+"");
					alert(this["titolo"]);
					
			});
		},
		error: function(){
			alert("error");
		}
	});
}

//--------------------------------------------------------------//
// TROVO LA LISTA PRODOTTI
//
function listaProdDB(tx) {
	var output = $('#lista-prod');
	$.ajax({
		url: 'http://test.vision121.it/appPhoneGap/ext/findprod.php',
		dataType: 'jsonp',
		data: "lingua=" + language_root,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			
			output.empty();
			j=1;
			$.each(data, function(i,item){					
				if (j/2 == 0) {
					output.append('<li style="clear:"right;"><a href="javascript:getDettProd('+this["id"]+');"><img src="http://test.vision121.it/appPhoneGap/_files/immagini/'+this["immagine"]+'" alt="'+this["nome"]+'"  /><br />'+this["nome"]+'</a></li>');
					j=1;
				} else {
					output.append('<li><a href="javascript:getDettProd('+this["id"]+');"><img src="http://test.vision121.it/appPhoneGap/_files/immagini/'+this["immagine"]+'" alt="'+this["nome"]+'"  /><br />'+this["nome"]+'</a></li>');
				}
				j++;
			});
		},
		error: function(){
			//alert("error");
			/*output.text('C\'è un errore nel caricamento dei dati.');
				navigator.notification.confirm(
					'Qualcosa non va. Vuoi riprovare?',
					yourCallback,
					'Errore',
					'No,Si'
				);*/

		}
	});
}

// Query the database
//
function queryDB(tx) {
	tx.executeSql('SELECT * FROM TPRODOTTI', [], querySuccess, errorCB);
}

// Query the success callback
//
function querySuccess(tx, results) {
	var output = $('#lista-prod');
	output.empty();
	var len = results.rows.length;
	j=1;
	for (var i=0; i<len; i++){
		if (j/2 == 0) {
			output.append('<li style="clear:"right;"><a href="#" onclick="javascript:getDettProd('+results.rows.item(i).id+');"><img src="http://test.vision121.it/appPhoneGap/_files/immagini/'+results.rows.item(i).immagine+'" alt="'+results.rows.item(i).nome+'"  /><br />'+results.rows.item(i).nome+'</a></li>');
			j=1;
		} else {
			output.append('<li><a href="#" onclick="javascript:getDettProd('+results.rows.item(i).id+');"><img src="http://test.vision121.it/appPhoneGap/_files/immagini/'+results.rows.item(i).immagine+'" alt="'+results.rows.item(i).nome+'"  /><br />'+results.rows.item(i).nome+'</a></li>');
		}
		j++;
		
	}
}

//--------------------------------------------------------------//
// DETTAGLIO PRODOTTI
//
function getDettProd(id) {
	var output = $('#lista-prod');
	$.ajax({
		url: 'http://test.vision121.it/appPhoneGap/ext/dett-prod.php',
		dataType: 'jsonp',
		data: {
			lingua: + language_root,
			prod_id: + id
		},
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			output.empty();
			$.each(data, function(i,item){					
					$('<a data-role="button" href="javascript:backButton();"><< Lista Prodotti</a>').appendTo($('#dett-prod'));
					$('<div id="dett-prod-img"><img src="http://test.vision121.it/appPhoneGap/_files/immagini/'+results.rows.item(i).immagine+'" alt="'+results.rows.item(i).nome+'"  /></div><div id="dett-prod-txt"><h2>'+results.rows.item(i).nome+'</h2>'+results.rows.item(i).descrizione+'</div>').appendTo($('#dett-prod'));
			});
		},
		error: function(){


		}
	});
	
	
}

// Query the success callback
//
/*function querySuccessDettProd(tx, results) {
	var output = $('#dett-prod');
	output.empty();
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		$('<a data-role="button" href="javascript:backButton();"><< Lista Prodotti</a>').appendTo($('#dett-prod'));
		$('<div id="dett-prod-img"><img src="http://test.vision121.it/appPhoneGap/_files/immagini/'+results.rows.item(i).immagine+'" alt="'+results.rows.item(i).nome+'"  /></div><div id="dett-prod-txt"><h2>'+results.rows.item(i).nome+'</h2>'+results.rows.item(i).descrizione+'</div>').appendTo($('#dett-prod'));
						
	}
}*/

function backButton() {
	var output = $('#dett-prod');
	output.empty();
	output.append('<ul id="lista-prod"></ul>');
	var db = window.openDatabase("EllisMobile", "1.0", "Ellis Mobile", 300000);
	//db.transaction(tx.executeSql('SELECT * FROM TPRODOTTI where ID='+id, [], querySuccessDettProd, errorCB), errorCB);
	db.transaction(function(tx)
	{
	tx.executeSql('SELECT * FROM TPRODOTTI', [],querySuccess, errorCB)
	});
}

//--------------------------------------------------------------//
// TROVO LA LISTA NEWS
//
function listaNewsDB(tx) {
	var output = $('#dett-news');
	$.ajax({
		url: 'http://test.vision121.it/appPhoneGap/ext/news-list.php',
		dataType: 'jsonp',
		data: "lingua=" + language_root,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			
			//tx.executeSql('DROP TABLE IF EXISTS TNEWS');
			//tx.executeSql('CREATE TABLE IF NOT EXISTS TNEWS (id integer primary key, titolo text, descrizione text, dt_creazione text)');
			output.empty();
			
            
        
			output.append('<div data-role="collapsible-set" data-theme="c" data-content-theme="a">');
			$.each(data, function(i,item){					
				output.append('<div data-role="collapsible" data-collapsed="true"><h3>'+this["titolo"]+' / '+ this["dt_creazione"]+'</h3><p><div class="touchslider'+this["id"]+'"></div>'+this["descrizione"]+'</p></div>');
				imgNewsDB(this["id"]);
				//tx.executeSql('INSERT INTO TNEWS (id, titolo,descrizione,dt_creazione) VALUES ('+this["id"]+', "'+this["titolo"]+'", "'+this["descrizione"]+'", "'+this["dt_creazione"]+'")');
				//tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
			});
			output.append('</div>');
			
			//CARICO IMG NEWS
			
			/*db.transaction(docNewsDB, errorCB, successCB);*/
		},
		error: function(jqXHR, exception){
			if (jqXHR.status === 0) {
				alert('Not connect.\n Verify Network.');
			} else if (jqXHR.status == 404) {
				alert('Requested page not found. [404]');
			} else if (jqXHR.status == 500) {
				alert('Internal Server Error [500].');
			} else if (exception === 'parsererror') {
				alert('Requested JSON parse failed.');
			} else if (exception === 'timeout') {
				alert('Time out error.');
			} else if (exception === 'abort') {
				alert('Ajax request aborted.');
			} else {
				alert('Uncaught Error.\n' + jqXHR.responseText);
			}
			/*var db = window.openDatabase("EllisMobile", "1.0", "Ellis Mobile", 300000);
			db.transaction(queryListNewsDB, errorCB);*/
		}
	});
}
//immagini news
function imgNewsDB(idnews) {
	/*var db = window.openDatabase("EllisMobile", "1.0", "Ellis Mobile", 300000);
	db.transaction(function(tx)
	{*/
		//alert(idnews);
		var output = $('.touchslider'+idnews);
		$.ajax({
			url: 'http://test.vision121.it/appPhoneGap/ext/news-img.php',
			dataType: 'jsonp',
			data: {
				lingua: + language_root,
				news_id: + idnews
			},
			jsonp: 'jsoncallback',
			timeout: 5000,
			success: function(data, status){
				//tx.executeSql('DROP TABLE IF EXISTS TNEWS_IMG');
				//tx.executeSql('CREATE TABLE IF NOT EXISTS TNEWS_IMG (id integer primary key, file text, descrizione text, news_id integer)');		
				//output.append('<div class="touchslider-viewport" style="width:500px;overflow:hidden"><div>');
				output.append('<ul id="Gallery" class="gallery">');
				$.each(data, function(i,item){		
					
					//output.append('<div class="touchslider-item"><img src="http://test.vision121.it/appPhoneGap/_files/immagini/'+this["file"]+'" style="width:25%;"></div>');
					
                

                    output.append('<li style="width:40%;"><a href="http://test.vision121.it/appPhoneGap/_files/immagini/'+this["file"]+'"><img src="http://test.vision121.it/appPhoneGap/_files/immagini/'+this["file"]+'"></a></li>');
                       
                    
						
					//tx.executeSql('INSERT INTO TNEWS_IMG (id, file,descrizione,news_id) VALUES ('+this["id"]+', "'+this["file"]+'", "'+this["descrizione"]+'", "'+this["news_id"]+'")');
				});
				output.append('</ul>');
				
			},
			error: function(){
				/*var db = window.openDatabase("EllisMobile", "1.0", "Ellis Mobile", 200000);
				db.transaction(queryListNewsDB, errorCB);*/
			}
		});
	/*});*/
	
	
	
}

//ALLEGATI news
function docNewsDB(tx) {
	$.ajax({
		url: 'http://test.vision121.it/appPhoneGap/ext/news-doc.php',
		dataType: 'jsonp',
		data: "lingua=" + language_root,
		jsonp: 'jsoncallback',
		timeout: 5000,
		success: function(data, status){
			//tx.executeSql('DROP TABLE IF EXISTS TNEWS_DOC');
			//tx.executeSql('CREATE TABLE IF NOT EXISTS TNEWS_DOC (id integer primary key, file text, descrizione text, news_id integer)');		
			$.each(data, function(i,item){					
				//tx.executeSql('INSERT INTO TNEWS_DOC (id, file,descrizione,news_id) VALUES ('+this["id"]+', "'+this["file"]+'", "'+this["descrizione"]+'", "'+this["news_id"]+'")');
			});
		},
		error: function(){
			/*var db = window.openDatabase("EllisMobile", "1.0", "Ellis Mobile", 200000);
			db.transaction(queryListNewsDB, errorCB);*/
		}
	});
}

// Query the database
//
function queryListNewsDB(tx) {
	tx.executeSql('SELECT * FROM TNEWS', [], querySuccessListNews, errorCB);
}

// Query the success callback
//
function querySuccessListNews(tx, results) {
	var output = $('#lista-news');
	output.empty();
	var len = results.rows.length;
	
	for (var i=0; i<len; i++){
		output.append('<a href="javascript:getDettNews('+results.rows.item(i).id+');">'+results.rows.item(i).titolo+' - '+ results.rows.item(i).dt_creazione +'</a>');
		
	}
}

//--------------------------------------------------------------//
// DETTAGLIO NEWS
//
function getDettNews(id) {
	var db = window.openDatabase("EllisMobile", "1.0", "Ellis Mobile", 300000);
	db.transaction(function(tx)
	{
	tx.executeSql('SELECT * FROM TNEWS where ID='+id, [],querySuccessDettNews, errorCB)
	});
	
}

// Query the success callback
//
function querySuccessDettNews(tx, results) {
	var output = $('#dett-news');
	output.empty();
	var len = results.rows.length;
	for (var i=0; i<len; i++){
		$('<div id="menu-prod"><a href="javascript:backButtonNews();"><< Lista News</div>').appendTo(output);
		$('<div id="dett-prod-img"></div><div id="dett-prod-txt"><h2>'+results.rows.item(i).titolo+' - '+results.rows.item(i).dt_creazione+'</h2>'+results.rows.item(i).descrizione+'</div>').appendTo(output);
						
	}
}

function backButtonNews() {
	var output = $('#dett-news');
	output.empty();
	var db = window.openDatabase("EllisMobile", "1.0", "Ellis Mobile", 300000);
	//db.transaction(tx.executeSql('SELECT * FROM TPRODOTTI where ID='+id, [], querySuccessDettProd, errorCB), errorCB);
	db.transaction(function(tx)
	{
	tx.executeSql('SELECT * FROM TPRODOTTI', [],querySuccess, errorCB)
	});
}

// -------------------------------------------------- //
// Transaction error callback
//
function errorCB(err) {
	console.log("Error processing SQL: "+err.code);
}

// Transaction success callback
//
function successCB() {
	console.log("SQL Process");
}

// Cordova is ready
//
function onDeviceReady() {
	var language = navigator.language.split("-");
	language_root = (language[0]);
	/*
	//APRO E CREO DB
	var db = window.openDatabase("EllisMobile", "1.0", "Ellis Mobile", 300000);
	//TROVO DATI HOMEPAGE
	db.transaction(homepageDB, errorCB, successCB);
	
	//TROVO DATI PRODOTTI
	db.transaction(listaProdDB, errorCB, successCB);
	
	//TROVO DATI NEWS
	db.transaction(listaNewsDB, errorCB, successCB);*/
	
	homepageDB();
	//listaProdDB();
	//listaNewsDB();
	
	/*if(navigator.network.connection.type == Connection.NONE){
		$("#txt-home").append('<button id="home_network_button" data-icon="check"></button>');
		$("#home_network_button").text('No Internet Access')
			 .attr("data-icon", "delete")
			 .button('refresh');
	} else {
		
	}*/
	
	//PLUGIN NOTIFICHE PUSH
	//window.plugins.statusBarNotification.notify("Put your title here", "Put your message here");
	
}

function yourCallback(button) {
	if (button == 2) {
		dataRequest();
	} else {
		var db = window.openDatabase("EllisMobile", "1.0", "Ellis Mobile", 300000);
		db.transaction(queryDB, errorCB);
	}
}
/*
// Show a custom alert
//
function showAlert() {
	navigator.notification.alert(
		'You are the winner!',  // message
		'Game Over',            // title
		'Done'                  // buttonName
	);
}*/



$(document).ready(function(e) {
	//COMPANY
	//
	if (language_root == 'it') {
		$("#cont-company").append("ITALIANO Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.");
	} else {
		$("#cont-company").append("ENGLISH Lorem Ipsum è un testo segnaposto utilizzato nel settore della tipografia e della stampa. Lorem Ipsum è considerato il testo segnaposto standard sin dal sedicesimo secolo, quando un anonimo tipografo prese una cassetta di caratteri e li assemblò per preparare un testo campione. È sopravvissuto non solo a più di cinque secoli, ma anche al passaggio alla videoimpaginazione, pervenendoci sostanzialmente inalterato. Fu reso popolare, negli anni ’60, con la diffusione dei fogli di caratteri trasferibili “Letraset”, che contenevano passaggi del Lorem Ipsum, e più recentemente da software di impaginazione come Aldus PageMaker, che includeva versioni del Lorem Ipsum.");
	}

	
	// -------------------------------------------- //
	//ADD COPYRIGHT
    var my_date = new Date();	
    $("#c-copyr").text("Copyright Ellis "+my_date.getFullYear());
	$("#c-copyC").text("Copyright Ellis "+my_date.getFullYear());
	$("#c-copyP").text("Copyright Ellis "+my_date.getFullYear());
	
});






