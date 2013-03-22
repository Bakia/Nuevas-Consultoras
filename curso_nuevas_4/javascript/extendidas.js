var estrellasGenerales;
var indexEstrellas = 0;

/*INICIO VARIABLES MODULO 2*/

var nombre_amiga = "";

var nombre_esposo = "";
var nombres_hijos = [];
var nombres_hijas = [];

var nueva_fecha_cal = "";

/*FIN VARIABLES MODULO 2*/

/*INICIO VARIABLES MODULO 5*/

var calificacion_eva = 0;

/*FIN VARIABLES MODULO 5*/





/*INICIO FUNCIONES MODULO 1*/

var miMetaEs;
function eligeMeta () {
	
	var imaginaMeta = $("#imagina-meta");

	imaginaMeta.find(".imagen-meta").each(function (i, val) {
		$(this).addClass("boton")
	})

	var imagenMeta;
	var dataSueno;
	

	imaginaMeta.find(".imagen-meta").on("click", function () {
		imagenMeta = $(this);
		dataSueno = $(this).data("sueno");

		imaginaMeta.find(".opciones .opcion-sueno").each(function () {
			$(this).find(".botones .boton").each(function () {
				$(this).find("img").eq(1).hide();
				$(this).find("img").eq(0).show();
				imaginaMeta.find(".opciones .otro").fadeOut(300);
			})
		})

		imaginaMeta.find(".opciones .otro input").val("");
		miMetaEs = "";
		imaginaMeta.find(".finalizar").fadeOut(500);

		var opciones = imaginaMeta.find(".opciones");

		var dataOpcionSueno;
		$(".opcion-sueno").each(function  (i, val) {
			var dataOpcionSueno = $(this).data("sueno");
					
			if(dataSueno == dataOpcionSueno){
				opciones.fadeIn(500);
				$(this).delay(500).fadeIn(500);
				opciones.find(".cerrar").delay(1500).fadeIn(500);
			}
		})

		opciones.find(".cerrar").on("click", function (argument) {
			$(this).fadeOut(500);
			imaginaMeta.find(".guardar").fadeOut(500);
			opciones.find(".opcion-sueno").each(function (i, val) {
				$(this).fadeOut(500);
			})
			opciones.fadeOut(500);

			miMetaEs = "";
			
		});	
		
		
	});
	
	var dataBoton;
	imaginaMeta.find(".opciones .opcion-sueno .botones .boton").on("click", function () {
		miMetaEs = "";
		imaginaMeta.find(".opciones .opcion-sueno").each(function () {
			$(this).find(".botones .boton").each(function () {
				$(this).find("img").eq(1).hide();
				$(this).find("img").eq(0).show();
				imaginaMeta.find(".opciones .otro").fadeOut(300);
			})
		})
		$(this).find("img").eq(0).hide()
		$(this).find("img").eq(1).show()
		imaginaMeta.find(".opciones .guardar").fadeIn(500);

		dataBoton = $(this).data("boton");

		if (dataBoton == "otro") {
			imaginaMeta.find(".opciones .otro").fadeIn(300);
		}

	})

	imaginaMeta.find(".guardar").on("click", function () {
		var botonGuardar = $(this);
		function guardarOK () {
			botonGuardar.fadeOut(500);
			imaginaMeta.find(".opciones .opcion-sueno").each(function (i, val) {
				$(this).fadeOut(500);
			})
			imaginaMeta.find(".opciones").fadeOut(500);
			imaginaMeta.find(".opciones .otro").fadeOut(500);
			imaginaMeta.find(".opciones .cerrar").fadeOut(500);

			imaginaMeta.find(".finalizar").delay(1000).fadeIn(500);
		}

		if (dataBoton == "otro") {
			var otraMeta = imaginaMeta.find(".opciones .otro input").val();
			if (otraMeta == "" || otraMeta == " ") {
				alert("Ingresa en el campo de texton\nla meta que quieres alcanzar\nen tus primeras cuatro campañas.")
			} else {
				miMetaEs = imaginaMeta.find(".opciones .otro input").val();
				guardarOK();
			}
		} else {
			miMetaEs = dataBoton;
			guardarOK();
		}
		$("#felicitacion-1 .mi-meta-es").text(miMetaEs);
		
	})

}


function calculadora () {
	var calculadora = $("#calculadora");

	var valorCalculo;
	var cifraMeta;
	
	calculadora.find(".bandera").on("click", function () {
		var dataPais = $(this).data("pais");
		if(dataPais == "si"){
			valorCalculo = 0.30;
		} else {
			valorCalculo = 0.25;
		}

		calculadora.find(".derecha").fadeIn(300);
	})

	//$("#cifra-meta").attr('maxlength','8');
	$("#cifra-meta").on("change",function () {
	});

	$("#cifra-meta").keydown(function (event) {
		var texto = $("#cifra-meta").val();
		var aux = false;
		
		
		if(event.keyCode == 190){
			
			 if($(this).hasClass("punto") ){
				event.preventDefault();
			 }else{
				$(this).addClass("punto");
			 }
			
		}
		
		if(event.keyCode == 8){
			
			 for(var t = 0; t < texto.length; t++){
				 if(texto[t] == "."){
					aux = true;
				 }
			}
			
			if(aux){
				$(this).removeClass("punto");
				aux = false;
			}
			
			return;
		}
		
        // Allow: backspace, delete, tab, escape, and enter
        if ( event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||  event.keyCode == 190 ||
             // Allow: Ctrl+A
            ( event.keyCode == 65 && event.ctrlKey === true) || 
             // Allow: home, end, left, right
            ( event.keyCode >= 35 && event.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        else {
            // Ensure that it is a number and stop the keypress
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105 )) {
               event.preventDefault();
			   
			   
			   
            } else {
                calculadora.find(".resultado").fadeIn(300);
            }
		}
		
		
    });

    calculadora.find(".resultado").on("click", function () {
    	cifraMeta = parseInt($("#cifra-meta").val());
    	////////console.log(cifraMeta)
    	if(cifraMeta == 0 || cifraMeta == "" || isNaN(cifraMeta) ){
    		alert("Debes ingresar un valor para tu meta")
    	} else {
    		//var resultadoCalculadora = parseInt( (cifraMeta * 4) * valorCalculo);
			var resultadoCalculadora = ( (cifraMeta * 4) * valorCalculo).toFixed(2);
			
			resultadoCalculadora = addCommas(resultadoCalculadora);
			
	    	$("#pedido-campana").text(resultadoCalculadora);
    		$(".derecha").trigger("click");
    		$("#derecha").delay(3000).fadeIn(300);
			
			
        }
		
		
    });
	
	

}

function addCommas(nStr) {
   nStr += '';
   var x = nStr.split('.');
   var x1 = x[0];
   var x2 = x.length > 1 ? '.' + x[1] : '';
   var rgx = /(\d+)(\d{3})/;
   while (rgx.test(x1)) {
       x1 = x1.replace(rgx, '$1' + ',' + '$2');
   }
   return x1 + x2;
}

/*FIN FUNCIONES MODULO 1*/



// JavaScript Document

/*INICIO FUNCIONES MODULO 2*/


jQuery.fn.extend({
	seccion1paso2: function(){
		
	var idDiv = $(this).attr("id");
	
	
	$("#"+idDiv+" .cerrar_shadow").click(function(e){
		$(this).parent().fadeOut("fast");
		$("#"+idDiv+" .siguiente-diapositiva").fadeIn("slow");
		
	});	
	
	$("#"+idDiv+" .cerrar_shadowV2").click(function(e){
		$(this).parent().fadeOut("fast");
		$("#"+idDiv).find(".derecha").fadeIn("slow");
		
	});	

}});

var amigo0 = {
	nombre:"",
	apellido:"",
	telefono:""
};

var amigo1 = {
	nombre:"",
	apellido:"",
	telefono:""
};

var amigo2 = {
	nombre:"",
	apellido:"",
	telefono:""
};

var amigo3 = {
	nombre:"",
	apellido:"",
	telefono:""
};

var amigo4 = {
	nombre:"",
	apellido:"",
	telefono:""
};


jQuery.fn.extend({
	seccionLlenarListas: function(cualArrayNom, cualArrayApe ,cualArrayTel){
		
	var idDiv = $(this).attr("id");

	var contNomFamilia = 0;
	var contApeFamilia = 0;
	var contTelFamilia = 0;
	var indexTxt;
	
	
	var contLlenado;
	var contLlenado_2;
	var contLlenado_3;
	
	$("#"+idDiv+" .btnGuardaListaFamilia").hover(function(e){
		$(this).find("img").eq(1).fadeIn(10);
	},function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});
	
	$("#"+idDiv+" .btnGuardaListaFamilia").click(function (e){
			
			contLlenado = 0;
			contLlenado_2 = 0;
			contLlenado_3 = 0;
			
			
			for(indexTxt = 0; indexTxt < 5; indexTxt ++){
				
				if($("#"+idDiv+" .txtFamiliaNom").eq(indexTxt).val() != "" && $("#"+idDiv+" .txtFamiliaNom").eq(indexTxt).val() != " "){
					contNomFamilia ++;
					////////////console.log(contNomFamilia);
				}else{
					
				}
				
				if($("#"+idDiv+" .txtFamiliaApe").eq(indexTxt).val() != "" && $("#"+idDiv+" .txtFamiliaNom").eq(indexTxt).val() != " "){
					contApeFamilia ++;
					////////////console.log(contNomFamilia);
				}else{
					
				}
				
				if($("#"+idDiv+" .txtFamiliaApe").eq(indexTxt).val() != "" && $("#"+idDiv+" .txtFamiliaNom").eq(indexTxt).val() != " "){
					contTelFamilia ++;
					////////////console.log(contNomFamilia);
				}else{
					
				}
	
			}
			
			if(contNomFamilia >= 3 && contApeFamilia >= 3 && contTelFamilia >= 3){
				
				
				$("#"+idDiv+" .txtFamiliaNom").each(function(index, element) {
					if($(element).val() != "" && $(element).val() != " "){
						
							cualArrayNom[contLlenado]= $(element).val(); 
							contLlenado ++;
							////console.log(cualArrayNom[contLlenado]);
						
					}
				   
				   $(element).attr('disabled',true);
                });
				
				$("#"+idDiv+" .txtFamiliaApe").each(function(index, element) {
				   if($(element).val() != "" && $(element).val() != " "){
					   	//if(jQuery.inArray($(element).val(),cualArrayApe) == -1){
							//cualArrayApe.push($(element).val()); 
							cualArrayApe[contLlenado_2]= $(element).val();
							contLlenado_2 ++;
						//}
						//cualArrayApe.push($(element).val());
					}
                  
				   $(element).attr('disabled',true); 
                });
				
				$("#"+idDiv+" .txtFamiliaTel").each(function(index, element) {
					if($(element).val() != "" && $(element).val() != " "){
						//if(jQuery.inArray($(element).val(),cualArrayTel) == -1){
							//cualArrayTel.push($(element).val()); 
							
							cualArrayTel[contLlenado_3]= $(element).val();
							contLlenado_3 ++;
						//}
						
						//cualArrayTel.push($(element).val());
					}
					$(element).attr('disabled',true);
                });
				
				$("#"+idDiv).parent().find(".flechas-internas").find(".derecha").fadeIn("slow");
				
				
				
				switch(cualArrayNom){
					
					case listaFamiliaArrayNom:
						
					break;
					
					case listaAmigosArrayNom:
					 	
						var indexAm_1 = 0;
						var indexAm_2 = 0;
						var indexAm_3 = 0;
						
						if(listaAmigosArrayNom.length <= 3){
							  
							  
							  
							  
						}else{
							
						
							
						}
						
						$("#act_secciones_papeles_am").find(".botones-tira-imagenes .boton-tira-siguiente").each(function(index, element) {                                $(element).trigger("click");
						});
						
						$("#act_secciones_papeles_am").find(".botones-tira-imagenes .boton-tira-anterior").each(function(index, element) {                                $(element).trigger("click");
						});
						
					break;
				}
				
				
				$("#"+idDiv+" .btnEditarLinea").each(function(index, element) {
                	$(element).fadeIn("fast");
           		});
				
			}else{
				contNomFamilia = 0;
				contApeFamilia = 0;
				contTelFamilia = 0;
			}
			
			
		
			
	});
	
	$("#"+idDiv+" .btnEditarLinea").hover(function(e){
		$(this).find("img").eq(1).fadeIn(10);
	},function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});
	
	$("#"+idDiv+" .btnEditarLinea").click(function(e){
		var cualLine = $(this).data("linea");
		
		$("#"+idDiv+" .txtFamiliaNom").eq(cualLine).removeAttr("disabled");
		$("#"+idDiv+" .txtFamiliaApe").eq(cualLine).removeAttr("disabled");
		$("#"+idDiv+" .txtFamiliaTel").eq(cualLine).removeAttr("disabled");
		

	});	
	
	

}});





jQuery.fn.extend({
	seccionVerListaCompleta: function(e){
	var idDiv = $(this).attr("id");
	
	$("#"+idDiv+" .btnHover").hover(function(e){
		
		$(this).find("img").eq(1).fadeIn(10);
	},function(e){
		$(this).find("img").eq(1).fadeOut(10);
		$(this).find("img").eq(0).fadeIn(10);
	});
	
	$("#"+idDiv+" .cerrar_shadow").click(function(e){
		$(this).parent().fadeOut(10);
	});
	
	
	$("#"+idDiv+" .btnAntGloboListComp").click(function(e){
		$(this).parent().find(".textoGlobo").eq(0).fadeIn("fast");
		$(this).parent().find(".textoGlobo").eq(1).fadeOut(10);
		$(this).parent().find(".btnSigGloboListComp").fadeIn("slow");
		$(this).fadeOut("fast");
		
		stopSong();
		audios("40-2");
		
	});
	
	$("#"+idDiv+" .btnSigGloboListComp").click(function(e){
		
		$(this).parent().find(".textoGlobo").eq(1).fadeIn("fast");
		$(this).parent().find(".textoGlobo").eq(0).fadeOut(10);
		$(this).parent().find(".btnAntGloboListComp").fadeIn("slow");
		//$(this).parent().find(".cerrar_shadow").fadeIn("slow");
		
		$(this).fadeOut("fast");
		
		stopSong();
		audios("42");
		
	});
	
	$("#"+idDiv+" .btnVerListaComp").click(function(e){
		$("#"+idDiv).parent().find(".flechas-internas").find(".derecha").fadeIn("slow");
		$("#"+idDiv).parent().find(".flechas-internas").find(".izquierda").fadeIn("slow");
		
		var indexNomFam = 0;
		var indexApeFam = 0;
		var indexTelFam = 0;
		
		var indexNomAm = 0;
		var indexApeAm = 0;
		var indexTelAm = 0;
		
		var indexNomVec = 0;
		var indexApeVec = 0;
		var indexTelVec = 0;
		
		
		/**** FAMILIA ****/
		$("#"+idDiv).find(".txtFamiliaNomListComp").each(function(index, element) {
			$(element).val(listaFamiliaArrayNom[indexNomFam]);
			indexNomFam ++;
			$(element).attr("disabled",true);
			
        });
		
		$("#"+idDiv).find(".txtFamiliaApeListComp").each(function(index, element) {
			$(element).val(listaFamiliaArrayApe[indexApeFam]);
			indexApeFam ++;
			$(element).attr("disabled",true);
			
        });
		
		$("#"+idDiv).find(".txtFamiliaTelListComp").each(function(index, element) {
			$(element).val(listaFamiliaArrayTel[indexTelFam]);
			indexTelFam ++;
			$(element).attr("disabled",true);
			
        });
		
		
		/**** Amigos ****/
		$("#"+idDiv).find(".txtAmigosNomListComp").each(function(index, element) {
			$(element).val(listaAmigosArrayNom[indexNomAm]);
			indexNomAm ++;
			$(element).attr("disabled",true);
			
        });
		
		$("#"+idDiv).find(".txtAmigosApeListComp").each(function(index, element) {
			$(element).val(listaAmigosArrayApe[indexApeAm]);
			indexApeAm ++;
			$(element).attr("disabled",true);
			
        });
		
		$("#"+idDiv).find(".txtAmigosTelListComp").each(function(index, element) {
			$(element).val(listaAmigosArrayTel[indexTelAm]);
			indexTelAm ++;
			$(element).attr("disabled",true);
			
        });
		
		
		/**** Vecinos ****/
		$("#"+idDiv).find(".txtVecinosNomListComp").each(function(index, element) {
			$(element).val(listaVecinosArrayNom[indexNomVec]);
			indexNomVec ++;
			$(element).attr("disabled",true);
			
        });
		
		$("#"+idDiv).find(".txtVecinosApeListComp").each(function(index, element) {
			$(element).val(listaVecinosArrayApe[indexApeVec]);
			indexApeVec ++;
			$(element).attr("disabled",true);
			
        });
		
		$("#"+idDiv).find(".txtVecinosTelListComp").each(function(index, element) {
			$(element).val(listaVecinosArrayTel[indexTelVec]);
			indexTelVec ++;
			$(element).attr("disabled",true);
			
        });
		
		$("#"+idDiv+" .btnEnviaCorreo").fadeIn("fast");
		
	});
	
	$("#"+idDiv+" .btnEnviaCorreo").click(function(e){
		$("#"+idDiv).parent().find(".shadow_correo").fadeIn("slow");
	});
	
	$("#"+idDiv).find(".shadow_correo").find(".btn_enviar_correo").click(function(e){
		var txt_correo = $(this).parent().find(".txt_env_correo").val();
		
		var arroba = /.\@./;
		var punto = /.\../;
		
		
		var cont_fam = 0;
		var cont_am = 0;
		var cont_vec = 0;
		
		var nom_fam = [];
		var ape_fam = [];
		var tel_fam = [];
		var tot_list_fam = "";
		
		var nom_am = [];
		var ape_am = [];
		var tel_am = [];
		var tot_list_am = "";
		
		var nom_vec = [];
		var ape_vec = [];
		var tel_vec = [];
		var tot_list_vec = "";
		
		//_____________ familia _____________
		
		$("#lista_completa").find(".txtFamiliaNomListComp").each(function(index, element) {
            if($(element).val() != "" && $(element).val() != " "){
				nom_fam[cont_fam] = $(element).val();
				cont_fam ++;
			}
			
        });
		
		cont_fam = 0;
		
		$("#lista_completa").find(".txtFamiliaApeListComp").each(function(index, element) {
            if($(element).val() != "" && $(element).val() != " "){
				ape_fam[cont_fam] = $(element).val();
				cont_fam ++;
			}
        });
		
		cont_fam = 0;
		
		$("#lista_completa").find(".txtFamiliaTelListComp").each(function(index, element) {
            if($(element).val() != "" && $(element).val() != " "){
				tel_fam[cont_fam] = $(element).val();
				cont_fam ++;
			}
        });
		
		
		
		//_____________ amigos	_____________
		
		$("#lista_completa").find(".txtAmigosNomListComp").each(function(index, element) {
            if($(element).val() != "" && $(element).val() != " "){
				nom_am[cont_am] = $(element).val();
				cont_am ++;
			}
			
        });
		
		cont_am = 0;
		
		$("#lista_completa").find(".txtAmigosApeListComp").each(function(index, element) {
            if($(element).val() != "" && $(element).val() != " "){
				ape_am[cont_am] = $(element).val();
				cont_am ++;
			}
        });
		
		cont_am = 0;
		
		$("#lista_completa").find(".txtAmigosTelListComp").each(function(index, element) {
            if($(element).val() != "" && $(element).val() != " "){
				tel_am[cont_am] = $(element).val();
				cont_am ++;
			}
        });
		
		
		//_____________ Vecinos	_____________
		
		$("#lista_completa").find(".txtVecinosNomListComp").each(function(index, element) {
            if($(element).val() != "" && $(element).val() != " "){
				nom_vec[cont_vec] = $(element).val();
				cont_vec ++;
			}
			
        });
		
		cont_vec = 0;
		
		$("#lista_completa").find(".txtVecinosApeListComp").each(function(index, element) {
            if($(element).val() != "" && $(element).val() != " "){
				ape_vec[cont_vec] = $(element).val();
				cont_vec ++;
			}
        });
		
		cont_vec = 0;
		
		$("#lista_completa").find(".txtVecinosTelListComp").each(function(index, element) {
            if($(element).val() != "" && $(element).val() != " "){
				tel_vec[cont_vec] = $(element).val();
				cont_vec ++;
			}
        });
		
		
		
		for (var c = 0; c < cont_fam  ; c ++){
			tot_list_fam = tot_list_fam +" | "+ nom_fam[c] + " - " + ape_fam[c] + " - " + tel_fam[c];
		}
		
		for (var c = 0; c < cont_am  ; c ++){
			tot_list_am = tot_list_am +" | "+ nom_am[c] + " - " + ape_am[c] + " - " + tel_am[c];
		}
		
		for (var c = 0; c < cont_vec  ; c ++){
			tot_list_vec = tot_list_vec +" | "+ nom_vec[c] + " - " + ape_vec[c] + " - " + tel_vec[c];
		}
		
		
		
		var contenido_msn =  tot_list_fam + "<br>"  + tot_list_am  + "<br>"  +  tot_list_vec;
		
		
		
		if(arroba.test(txt_correo) == false){
			alert("Por favor, digite un e-mail valido.");
		}else{
			if(punto.test(txt_correo) == false){
				alert("Por favor, digite un e-mail valido.");
			}else{
				enviar_mail( nombre_consultora , txt_correo , "Lista de Conocidos" , contenido_msn );
				//alert("Enviado a : "+txt_correo);
				$(this).parent().fadeOut("fast");
			}
		}
		
		
	});	
	
	
}});

jQuery.fn.extend({
	prodCadaCliente: function(e){
	var idDiv = $(this).attr("id");
	
	
	$("#"+idDiv+" .txt_nom_amiga").keyup(function(e){
		$("#prod_cada_cliente").find(".flechas-internas").find(".derecha").fadeIn(500);
		nombre_amiga = $("#"+idDiv+" .txt_nom_amiga").val();
		$("#"+idDiv+" .nomAmiga").text("¿Qué cosas crees que  "+nombre_amiga+"  utiliza diariamente?");
		$("#act_secciones_papeles_am .nomAmiga").text(nombre_amiga);
		
		
		$("#postits_familia .postit").remove();
		$("#postits_familia_2 .postit").remove();
		$("#postits_familia_3 .postit").remove();
						
		$("#postits_familia").append("<div class='postit' id='familiapostit_1_1' style='left: 337px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombre_amiga+"</span></div>");
							 
		 $("#postits_familia_2").append("<div class='postit' id='familiapostit_2_1' style='left: 337px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombre_amiga+"</span></div>");
		 
		 $("#postits_familia_3").append("<div class='postit' id='familiapostit_3_1' style='left: 337px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombre_amiga+"</span></div>");
		 
			$("#act_secciones_papeles_fam").find(".botones-tira-imagenes .boton-tira-siguiente").each(function(index, element) {                  $(element).trigger("click");
			});
			
			$("#act_secciones_papeles_fam").find(".botones-tira-imagenes .boton-tira-anterior").each(function(index, element) {                  $(element).trigger("click");
			});
		
	});
	
	
}});

jQuery.fn.extend({
	actividadDragProds: function(e){
	var idDiv = $(this).attr("id");
	
	$( "#"+idDiv+" .prodDrag" ).draggable({revert:true});

	$("#"+idDiv+" .cajaDropProds").droppable({accept:".prodDrag"});
	$("#"+idDiv+" .cajaDropProds").bind("drop",function (event,ui){
		ui.draggable.draggable({revert:false});
		ui.draggable.draggable('destroy');
		$("#prod_cada_cliente").find(".flechas-internas").find(".derecha").fadeIn(500);
		
	});
  
	
	
}});

jQuery.fn.extend({
	actividadcatalogos: function(e){
		
	var idDiv = $(this).attr("id");
	
	
	
	$("#"+idDiv+" .cerra_shadow_cat").mousedown(function(e){
		$(this).parent().fadeOut("fast");
		var dataCual = $(this).data("cual");
		$("#sec_catalogos .shadow_cat").eq(dataCual).fadeIn("slow");
		
	});
	
	$("#"+idDiv+" .sig_interna").click(function(e){
		$("#prod_cada_cliente .flechas-internas .derecha").trigger("click"); 
	});
	
	
	
}});


jQuery.fn.extend({
	actividadAgregarFamilia: function(e){
	var idDiv = $(this).attr("id");
	var contHijos = 0;
	var contHijas = 0;
	
	var hijo1 = "";
	var hijo2 = "";
	var hijo3 = "";
	var hijo4 = "";
	
	
	$( "#"+idDiv+" .btn_guardar_familia" ).hover(function(){
		$(this).find("img").eq(1).fadeIn("fast");
	}, function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});
	
	
	
	
	$( "#"+idDiv+" .btn_guardar_familia" ).click(function(e){
		

					nombres_hijos = [];
					nombres_hijas = [];
					nombre_esposo = "";
					
					
					$("#"+idDiv+" .hijo").each(function(index, element) {
						if($(element).find("input").val() != "" && $(element).find("input").val() != " "){
							
							nombres_hijos.push($(element).find("input").val());
						
						}
                        
                    });
					
					
					nombre_esposo = $("#"+idDiv).find(".txt_esposo").val();
					
					
				  /*** Para Llenar postits ***/
				  
				  //$("#postits_familia").find(".postit").find(".nombre-amiga").text(nombre_esposo);
					
				  var indexFa_1 = 0;
				  var indexFa_2 = 0;
				  var indexFa_3 = 0;
				  
					 	$("#postits_familia .postit").remove();
						$("#postits_familia_2 .postit").remove();
						$("#postits_familia_3 .postit").remove();
					   
						var totArrayAm = nombres_hijos.length;
						if(totArrayAm >4){
							totArrayAm = 4;
						}
						
						var left_post_1 = 212;
						var left_post_2 = 212;
						var left_post_3 = 212;
						  
						  
						for(var i = 0; i < totArrayAm + 2 ; i++){
							if (i == 0){
							 
							 
							 $("#postits_familia").append("<div class='postit' id='familiapostit_1_"+i+"' style='left: "+left_post_1+"px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombre_amiga+"</span></div>");
							 
							 $("#postits_familia_2").append("<div class='postit' id='familiapostit_2_"+i+"' style='left: "+left_post_2+"px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombre_amiga+"</span></div>");
							 
							 $("#postits_familia_3").append("<div class='postit' id='familiapostit_3_"+i+"' style='left: "+left_post_3+"px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombre_amiga+"</span></div>");
							 
							
							}else{
								
							if(i == 1){
							
								if($("#"+idDiv).find(".txt_esposo").val() != "" && $("#"+idDiv).find(".txt_esposo").val() != " " ){
							 
									 $("#postits_familia").append("<div class='postit' id='familiapostit_1_"+i+"' style='left: "+left_post_1+"px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombre_esposo+"</span></div>");
									 
									 $("#postits_familia_2").append("<div class='postit' id='familiapostit_2_"+i+"' style='left: "+left_post_2+"px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombre_esposo+"</span></div>");
									 
									 $("#postits_familia_3").append("<div class='postit' id='familiapostit_3_"+i+"' style='left: "+left_post_3+"px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombre_esposo+"</span></div>");
									 
								}
							
							}else{
							
								
							
							
								 $("#postits_familia").append("<div class='postit' id='familiapostit_1_"+i+"' style='left: "+left_post_1+"px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombres_hijos[i-2]+"</span></div>");
	
							   
							   $("#postits_familia_2").append("<div class='postit' id='familiapostit_2_"+i+"' style='left: "+left_post_2+"px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombres_hijos[i-2]+"</span></div>");
							   
							   
							   
							   
							   $("#postits_familia_3").append("<div class='postit' id='familiapostit_3_"+i+"' style='left: "+left_post_3+"px; top: 460px;'><img src='img/02/act_secciones/papel.png'><span class='relacion'></span><span style='left: 30px; top: 33px; position: absolute; ' class='nombre-fam'>"+nombres_hijos[i-2]+"</span></div>");
							   }

							}
							
							left_post_1 = left_post_1 + 125;
						    left_post_2 = left_post_2 + 125;
						    left_post_3 = left_post_3 + 125;
							
						}
				  
				  //}
				  
				  /*$("#familiapostit_1_0").find(".nombre-amiga").text(nombre_esposo);
				  $("#familiapostit_2_0").find(".nombre-amiga").text(nombre_esposo);
				  $("#familiapostit_3_0").find(".nombre-amiga").text(nombre_esposo);*/
				  
				  
				  $("#act_secciones_papeles_fam").find(".botones-tira-imagenes .boton-tira-siguiente").each(function(index, element) {                                $(element).trigger("click");
				  });
				  
				  $("#act_secciones_papeles_fam").find(".botones-tira-imagenes .boton-tira-anterior").each(function(index, element) {                                $(element).trigger("click");
				  });
					

	});
	
	$( "#"+idDiv).find(".agregarTxt").click(function(e){
		
		if($(this).parent().hasClass("hijos")){

			$(this).parent().find(".divTxt").eq(contHijos).fadeIn("slow");
			contHijos ++;
			
			if(contHijos >= 3){
				$(this).fadeOut("fast");	
			}
			
		}else if($(this).parent().hasClass("hijas")){
			$(this).parent().find(".divTxt").eq(contHijas).fadeIn("slow");
			contHijas ++;
			
			if(contHijas >= 3){
				$(this).fadeOut("fast");	
			}
		}else if($(this).parent().hasClass("esposo")){
			$(this).parent().find(".divTxt").fadeIn("slow");
			$(this).fadeOut("fast");
		}
		
		
		$(this).parent().find(".quitarTxt").fadeIn("slow");
		
	});
	
	
	$( "#"+idDiv).find(".quitarTxt").click(function(e){
		
		if($(this).parent().hasClass("hijos")){
			contHijos --;
			//////////console.log(contHijos);
			if(contHijos <= 0){
				$(this).fadeOut("fast");
				contHijos = 0;	
			}
			$(this).parent().find(".divTxt").eq(contHijos).fadeOut("slow");
			
			
		}else if($(this).parent().hasClass("hijas")){
			contHijas --;
			if(contHijas <= 0){
				$(this).fadeOut("fast");	
				contHijas = 0;
			}
			$(this).parent().find(".divTxt").eq(contHijas).fadeOut("slow");

		}else if($(this).parent().hasClass("esposo")){
			$(this).parent().find(".divTxt").fadeOut("slow");
			$(this).fadeOut();

		}
		
		$(this).parent().find(".agregarTxt").fadeIn("slow");
		
	});
	
	
	
}});




jQuery.fn.extend({
	actividadSeccionesPapeles: function(){
	var idDiv = $(this).attr("id");
	
	
	$("#"+idDiv+" .btn_sec").hover(function(e){
		$(this).find("img").eq(1).fadeIn("fast");
	},function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});
	
	$("#"+idDiv+" .btn_sec").click(function(e){
		var cual_sec = $(this).data("cual");
		
		$("#"+idDiv+" .cuadro_sec").each(function(index, element) {
            $(element).fadeOut(1);
        });
		$("#"+idDiv+" .cuadro_sec").eq(cual_sec).fadeIn("fast");
		
		$("#"+idDiv+" .globo_postits").fadeOut("fast");
		
	});
	
	
	
	switch(idDiv){
		case "act_secciones_papeles_am":
		
			tirasImagenes("#"+idDiv,"#slider_esika .tira-imagenes", ".imagen-tira", "#postits-amigas .postit", "#slider_esika","#prod_cada_cliente .flechas-internas");
			tirasImagenes("#"+idDiv,"#slider_lbel .tira-imagenes_2", ".imagen-tira", "#postits-amigas_2 .postit", "#slider_lbel","#prod_cada_cliente .flechas-internas");
			tirasImagenes("#"+idDiv,"#slider_cyzone .tira-imagenes_3", ".imagen-tira", "#postits-amigas_3 .postit", "#slider_cyzone","#prod_cada_cliente .flechas-internas");
			
		break;
		
		case "act_secciones_papeles_fam":
		
			tirasImagenes("#"+idDiv,"#slider_esika_f .tira-imagenes", ".imagen-tira", "#postits_familia .postit", "#slider_esika_f","#prod_cada_cliente .flechas-internas");
			tirasImagenes("#"+idDiv,"#slider_lbel_f .tira-imagenes_2", ".imagen-tira", "#postits_familia_2 .postit", "#slider_lbel_f","#prod_cada_cliente .flechas-internas");
			tirasImagenes("#"+idDiv,"#slider_cyzone_f .tira-imagenes_3", ".imagen-tira", "#postits_familia_3 .postit", "#slider_cyzone_f","#prod_cada_cliente .flechas-internas");
			
		break;
	}
	
	
	
}});








/*idSeccion entera, slider-familia.tira-imagenes , imagen-tira, postits-amigas.postit*/

function tirasImagenes (idSeccion, parentContainer, childContainer, postContainer , slideContent, queMostrar) {
		  	 // var idSeccion = $(this).attr("id");
			  
			  var indexTira = 0;
		  
			  var imagenTira = $(idSeccion + " " + parentContainer + " " + childContainer);
			  var primeraImagen = $(idSeccion + " " + parentContainer + " " + childContainer).eq(0);
			  var ultimaImagen = $(idSeccion + " " + parentContainer + " " + childContainer).length;
		  
			  var botonTiraAnt = $(idSeccion + " "+ slideContent + " " + ".botones-tira-imagenes .boton-tira-anterior");
			  var botonTiraSig = $(idSeccion + " "+ slideContent + " " + ".botones-tira-imagenes .boton-tira-siguiente");
		  
			  // //////////console.log(imagenTira);
			  // //////////console.log(primeraImagen);
			  // //////////console.log(ultimaImagen);
			  // //////////console.log(botonTiraAnt);
			  // //////////console.log(botonTiraSig);
		  
		  
			  function showTiraAnt (proxTira) {
				  
				  TweenLite.to( imagenTira.eq(indexTira), 0.7, {css:{left:"540px", opacity:"0"}, ease:Circ.easeInOut});
				  
				  indexTira = proxTira;
		  
				  if(indexTira <= 0)
				  {
					  indexTira = 0;
		  
					  botonTiraAnt.hide();
					  botonTiraSig.show();
		  
				  } else if (indexTira > 0) {
		  
					  botonTiraAnt.show();
					  botonTiraSig.show();
		  
				  }
				  
				  if (indexTira >= ultimaImagen - 1) {
		  
					  indexTira = ultimaImagen - 1;
					  botonTiraSig.hide();
				  }
		  
				  TweenLite.to( imagenTira.eq(indexTira),0.7, {css:{left:"25px", opacity:"1"}, ease:Circ.easeInOut});
		  
				 // $(imagenTira).droppable("destroy");
				  dragPosts(indexTira, idSeccion, postContainer);
		  
		  
			  }
			  function showTiraSig (proxTira) {
				  
				  TweenLite.to( imagenTira.eq(indexTira),0.7, {css:{left:"-540px", opacity:"0"}, ease:Circ.easeInOut});
				  
				  indexTira = proxTira;
		  
				  if(indexTira <= 0)
				  {
					  indexTira = 0;
		  
					  botonTiraAnt.hide();
					  botonTiraSig.show();
		  
				  } else if (indexTira > 0) {
		  
					  botonTiraAnt.show();
					  botonTiraSig.show();
		  
				  }
		  
				  if (indexTira >= ultimaImagen - 1) {
								  
					  indexTira = ultimaImagen - 1;
					  botonTiraSig.hide();
		  
				  }
		  
				  TweenLite.to( imagenTira.eq(indexTira),0.7, {css:{left:"25", opacity:"1"}, ease:Circ.easeInOut});
				  
				  //$( imagenTira ).droppable( "destroy" );
				  
				  dragPosts(indexTira, idSeccion, postContainer);
				  
		  
			  }
		  
			  function dragPosts (proxTira ,idSeccion, postContainer) {
				 
				  indexTira = proxTira;
		  
				  //Counter
				  counter = 0;
		  
				  //Make element draggable
				  $(postContainer).draggable({
					  helper:'clone',
					  revert: 'invalid'
		  
				  });
				  
				  
				  //Make element droppable
				  $(imagenTira).eq(indexTira).droppable({
					  //accept: postContainer,
		  
					  drop: function(ev, ui) {
							  counter++;
							  
							  $(queMostrar).find("div").fadeIn("slow");
							  
							  var element = $(ui.draggable).clone();
								  element.addClass("tempclass");
		  
							  var pos = $(imagenTira).parent().position(); 
							  var offset = $(imagenTira).parent().offset(); 
		  
							  var elementLeft	= $(element).css( "left", (ui.position.left - pos.left + 17) + "px" );
							  var elementTop = $(element).css( "top", (ui.position.top - pos.top - 26) + "px" );
		  
							  var posElement = $(element).offset();
		  
					  
							  $(this).append(element);
							  $(element).on("click", function(e) {
								  var temp = $(this);
								  
								  $(this).fadeOut( "fast", function(e) { 
									  $(temp).remove();
								  });
							  })
			  
							  $(".tempclass").attr( "id", "clonediv" + counter);
							  //$(".tempclass").draggable("destroy");
							  $("#clonediv" + counter).removeClass("tempclass");
							  $("#clonediv" + counter).addClass("itemDragged");
		  
					  }
				  });
		  
		  
				  
			  }
		  
			  botonTiraAnt.on("click", function (e) {
				  showTiraAnt(indexTira - 1);
				  //////////console.log(indexTira);
			  });
		  
			  botonTiraSig.on("click", function (e) {
				  showTiraSig(indexTira + 1);
				  //////////console.log(indexTira);
			  });
		  
			  showTiraAnt(indexTira);
			  showTiraSig(indexTira);
			  
			  
}


var num_personas = 0;

jQuery.fn.extend({
	actividad_calendario: function(){
	var idDiv = $(this).attr("id");
	var topCitas =0;
	var contCitas =0;
	
	for(var i = 0; i < 60; i = i + 5){
		if(i < 10){
			$("#"+idDiv).find("#cita_min").append("<option value="+ i +">"+"0"+i+"</option>");
		}else{
			$("#"+idDiv).find("#cita_min").append("<option value="+ i +">"+i+"</option>");
		}
	}
	
	
	
	$("#"+idDiv).find(".cerrar_shadow1_cal").click(function(e){
		$(this).parent().fadeOut("fast");
	});
	
	$("#"+idDiv).find(".guardar_cita").hover(function(e){
		$(this).find("img").eq(1).fadeIn("fast");
	}, function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});
	
	
	$("#"+idDiv).find(".btn_enviar_correo_cal").hover(function(e){
		$(this).find("img").eq(1).fadeIn("fast");
	}, function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});
	
	
	
	$("#"+idDiv).find(".guardar_cita").click(function(e){
		
		
		if(num_personas < 7){
			
		var cita_persona = $("#act_citas").find(".cita_persona").val();
		var cita_lugar = $("#act_citas").find(".cita_lugar").val();
		
		if(cita_persona != "" && cita_persona != " " ){
			
			if(cita_lugar != "" && cita_lugar != " "){
		
				
				var posicion1=document.getElementById("cita_hora").options.selectedIndex; 
				var posicion2=document.getElementById("cita_min").options.selectedIndex; 
				var posicion3=document.getElementById("cita_jr").options.selectedIndex; 
				
				var cita_hora = document.getElementById("cita_hora").options[posicion1].text;//$("#act_citas").find(".cita_hora").val();
				var cita_min = document.getElementById("cita_min").options[posicion2].text;
				var cita_jr = document.getElementById("cita_jr").options[posicion3].text;
				
				var hora = cita_hora + ":" + cita_min +"  "+cita_jr;
				
				$("#citas_programadas").append("<div class='cita_prog' data-cual="+contCitas+" style='width: 540px;'><!--<div class='boton borrar_cita' style='left:0px;'><img src='img/btn_circulo-cerrar_peque.png'></div>--><span class='cita_fec' style=''>"+nueva_fecha_cal+"</span><span class='cita_per' style=''>"+cita_persona+"</span><span class='cita_hora' style=''>"+hora+"</span><span class='cita_lugar_txt' style=''>"+cita_lugar+"</span></div>");
				
				$(this).parent().fadeOut("fast");
				num_personas ++;
				topCitas += 28;
				contCitas ++;
				
					$(".cita_prog").find(".borrar_cita").bind("click",function(e){
						
						var dataPapa = $(this).parent().data("cual");
						var miTop = $(this).parent().position().top;
						$(this).parent().fadeOut(300);
						
				
						$(".cita_prog").each(function(index, element) {
							if($(element).data("cual") > dataPapa){
								$(element).css({top:miTop});
								miTop += 28;
								//$(element).css({top: - 28});
								//$(element).data("cual",$(element).data("cual") - 1)
								//$(element).animate({top:'-=28'},500,function(){});
							}
						});
			
						$(this).parent().remove();
						num_personas --;
						topCitas -=28;
						contCitas --;
						
					});
				
			
				
					$("#act_citas").find(".cita_persona").val("");
					$("#act_citas").find(".cita_lugar").val("");
					
					
				}else{
					alert("Digite el lugar de la cita.");
				}
			
			
			}else{
				alert("Digite el nombre.");
			}
				
				
		}
		
	});
	
	
	$("#"+idDiv).find(".btn_enviar_correo_cal").click(function(e){
		$("#"+idDiv).find(".shadow_correo_cal").fadeIn("slow");
		
	});
	
	
	$("#"+idDiv).find(".btn_enviar_correo_cal_2").hover(function(e){
		$(this).find("img").eq(1).fadeIn("fast");
	},function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});
	
	
	$("#"+idDiv).find(".btn_enviar_correo_cal_2").click(function(e){
		
		
		var correo_persona = $(this).parent().find(".txt_env_correo").val();
		
		var arroba = /.\@./;
		var punto = /.\../;
		
		var contenido_corr = "";
		
		
		
		$("#act_citas").find(".cita_prog").each(function(index, element) {
             
			 contenido_corr = contenido_corr + $(element).find(".cita_fec").text()  + " | " + $(element).find(".cita_per").text() + " | " + $(element).find(".cita_hora").text() + " | " + $(element).find(".cita_lugar_txt").text() + "<br>" ; 
			 
        });
		
		
		//alert(contenido_corr);
		
		if(arroba.test(correo_persona)==false){
			alert("Por favor, introduce un e-mail valido.");
		}else{
			if(punto.test(correo_persona) == false){
				alert("Por favor, introduce un e-mail valido.");
			}else{
				
				enviar_mail(nombre_consultora, correo_persona, "Citas programadas", contenido_corr);
				$(this).parent().fadeOut("fast");
				$("#flechas #derecha").fadeIn("slow");
			}
		}
		
		
	});

	
}});



var contPrimerCalendario = true;
function calendarioCitas () {
	

	/************	INICIO CALENDARIO	**********/

	$.tools.dateinput.localize("es", {
		months: 'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre',
	 	shortMonths:  'Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic',
	  	days:         'Domingo,Lunes,Martes,Miercoles,Jueves,Viernes,Sábado',
	  	shortDays:    'D,L,M,M,J,V,S'
	});

		// initialize dateinput
	$(":date").dateinput( {
	 	lang: 'es',
		// closing is not possible
		onHide: function()  {
			return false;
		},
	 
		change: function(e, date)  {
			$(this).on("click", function () {
				$("calendario input").val() = "";
			})
		}

	 
	// set initial value and show dateinput when page loads
	}).data("dateinput").setValue(0).show();
	

	/************	FIN CALENDARIO		**********/


	$(":input.date").change(function(event, date) {
  		//////console.info("a date was selected", date);
  		$('#act_citas .globo_1_cal').fadeOut(300);
		
		if(num_personas < 13){
		
			if(contPrimerCalendario){
				$('#act_citas .shadow_cuadro_azul').fadeIn("slow");
				$('#act_citas .shadow_cuadro_primer_mensaje').fadeIn("slow");
				stopSong();
				audios("69");
				contPrimerCalendario=false;
			}else{
				$('#act_citas .shadow_cuadro_azul').fadeIn("slow");
			}
			
			
			
			
			nueva_fecha_cal = $("#calendario input").val();
			$('#act_citas .btn_enviar_correo_cal').fadeIn("slow");
		
		}
		//$("#citas_programadas").append();
		
	});

	
  	$("#calendario").css("left","-1000px");
	


}



/****** Calendario  ******/
function calendarioCobranzas () {

	/************	INICIO CALENDARIO	**********/

	$.tools.dateinput.localize("es", {
		months: 'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre',
	 	shortMonths:  'Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic',
	  	days:         'Domingo,Lunes,Martes,Miercoles,Jueves,Viernes,Sábado',
	  	shortDays:    'Dom,Lun,Mar,Mier,Jue,Vie,Sab'
	});

		// initialize dateinput
	$("#calendario :date").dateinput( {
	 	lang: 'es',
	 	css: {
		    root: 'calendario-cobranzas-principal'
		},
		// closing is not possible
		onHide: function()  {
			return false;
		},
	 
		change: function(e, date)  {
			$(this).on("click", function () {
				$("calendario-cobranzas .fecha-cita input").val() = "";
			})
		}
	 
	// set initial value and show dateinput when page loads
	}).data("dateinput").setValue(0).show();

	$("#calendario-cobranzas .fecha-cita input:date").dateinput({
		lang: 'es',
		css: {
		    root: 'calendario-fecha-citas',
		    head: 'calendario-fecha-citas-calhead', 
		    title: 'calendario-fecha-citas-caltitle', 
		    prev: 'calendario-fecha-citas-calprev',
		    next: 'calendario-fecha-citas-calnext',
		    disabled: 'calendario-fecha-citas-caldisabled',
		    body: 'calendario-fecha-citas-caldisabled-calbody',
		    days: 'calendario-fecha-citas-caldays',
		    weeks: 'calendario-fecha-citas-calweeks',
		    week: 'calendario-fecha-citas-calweek',
		    off: 'calendario-fecha-citas-caloff',
		    sunday: 'calendario-fecha-citas-calsun',
		    current: 'calendario-fecha-citas-calcurrent',
		    today: 'calendario-fecha-citas-caltoday',
		    focus: 'calendario-fecha-citas-calfocus'
		}

	});


	/************	FIN CALENDARIO		**********/

	var apiCalendario = $("#calendario input:date").data("dateinput");
	var apiFechaCita = $("#calendario-cobranzas .fecha-cita input:date").data("dateinput");
	

	//CUANDO SE SELECCIONA UNA FECHA EN EL CALENDARIO GRANDE
	$("#calendario :input.date").change(function(event, date) {
  		var fechaPago = apiCalendario.getValue();
   		
		//CAMBIAR LAS FECHAS DE TODOS LOS INPUTS DE FECHA CITA
   		$("#calendario-cobranzas .fecha-cita input").each(function (index, element) {
			apiFechaCita = $(this).data("dateinput");
			apiFechaCita.setMax(fechaPago, false);
   		})


	});

 	//EN FOCUS DE CADA INPUT DE LAS FECHAS DE CITA
	$("#calendario-cobranzas .fecha-cita input").focusin(function shadowBoxCita () {
		if($("#calendario-cobranzas .opacidad").css('opacity') == 1){
			$("#calendario-cobranzas .opacidad").fadeIn(500);
		}
	})
   	
   	//EN FOCUS DE CADA INPUT DE LAS FECHAS DE CITA
	$("#calendario-cobranzas .fecha-cita input:date").change(function () {
		if($(this).val() != ""){
			$("#act_citas .shadow_cuadro_azul").fadeOut(500);
			$("#act_citas .shadow_cuadro_azul").fadeOut(500);
		}
	})	

	$("#calendario-cobranzas .fecha-cita input").focusout(function () {
		$("#calendario-cobranzas .opacidad").fadeOut(500);
	})
	$(".opacidad").on("click", function () {
		$(this).fadeOut(500);
	})

	$("#calendario-cobranzas .nombre-cliente input").focusin(function () {
		if($(this).parent().parent().find(".fecha-cita input").val == " "){
			alert("Por favor selecciona una fecha para esta cita.");
		}
	})

	//ESCONDER EL INPUT DEL CALENDARIO GRANDE
  	$("#calendario-cobranzas #calendario input:date").hide();
	
}


/********** Validar TXT *********/
jQuery.fn.extend({
	validarCampo: function(cadena){
		
	$(this).on({
				keypress : function(e){
					var key = e.which,
						keye = e.keyCode,
						tecla = String.fromCharCode(key).toLowerCase(),
						letras = cadena;
					if(letras.indexOf(tecla)==-1 && keye!=9&& (key==37 || keye!=37)&& (keye!=39 || key==39) && keye!=8 && (keye!=46 || key==46) || key==161){
						e.preventDefault();
					}
				}
			});

}});

/*FIN FUNCIONES MODULO 2*/




// JavaScript Document
/*INICIO FUNCIONES MODULO 3*/
function dragCartera () {
	var dragCartera = $("#drag-cartera");
	var indexCorrectas = 0;
	var intentos =  0;
	
	$(".imagen-bolso").draggable({
		revert: true
	});
	$("#cartera").droppable({
		accept: ".imagen-bolso",
		drop: function (event, ui) {
			ui.draggable.fadeOut(300);
			ui.draggable.draggable({revert:true});
			var datoObjeto = ui.draggable.data("correcto");
			if (datoObjeto == "si") {
				indexCorrectas+=1;
			} else {
				indexCorrectas-=1;
			};
			dragCartera.find(".validar").fadeIn(300);
		}
	});

	dragCartera.find(".validar").on("click", function () {
		
		intentos+=1;
		
		
		
		function dragOK () {
			TweenLite.to( dragCartera.find(".interna").eq(0), 0.7, { css:{ display:"none", left: "-960px", opacity: "0" }} )
			TweenLite.to( dragCartera.find(".interna").eq(2), 0.7, { css:{ display:"block", left: "0", opacity: "1"} } )
			$("#derecha").delay(1000).fadeIn(300);
			$("#felicitacion-6 .correcto").show();
			$("#felicitacion-6 .incorrecto").hide();
			
			indexEstrellas+=5;	
			$("#felicitacion-6 .estrellas-acumuladas").text(indexEstrellas);
		}

		function dragNO () {
			$("#felicitacion-6 .incorrecto").show();
			$("#felicitacion-6 .correcto").hide();
			$("#felicitacion-6 .nombre-consultora").hide();
			$("#felicitacion-6 .estrellas-acumuladas").text(indexEstrellas);
			TweenLite.to(dragCartera.find(".interna").eq(0), 0.7, { css:{ display:"none", left: "-960px", opacity: "0"} } );
			
		}
		
		if (intentos >=2) {
			
			if (indexCorrectas == 5) {
				dragOK();

			} else {
				dragNO();
				TweenLite.to(dragCartera.find(".interna").eq(3), 0.7, { css:{ display:"block", left: "0", opacity: "1"} } )
				$("#derecha").delay(1000).fadeIn(300);			

			};
			
		} else {
		
			if (indexCorrectas == 5) {
				dragOK();
		
			} else {
				dragNO();
				TweenLite.to(dragCartera.find(".interna").eq(1), 0.7, { css:{ display:"block", left: "0", opacity: "1"} } )
				dragCartera.find(".interna").eq(1).find(".volver").delay(1000).fadeIn(300);
		
			};
		};
		
	
	});

	dragCartera.find(".volver").on("click", function () {
		indexCorrectas = 0;
		$(this).fadeOut(300);
		dragCartera.find(".imagen-bolso").each(function () {
			$(this).fadeIn(300);
		});
		dragCartera.find(".validar").hide();
		TweenLite.to(dragCartera.find(".interna").eq(1), 0.7, { css:{ display:"none", left: "960px", opacity: "0"} } )
		TweenLite.to(dragCartera.find(".interna").eq(0), 0.7, { css:{ display:"block", left: "0", opacity: "1"} } )
	});
}


function respuestasDialogosCarolina () {
	var indexRespuestas = 0;
	var intentos = 0;
	var intentosDialogos = 0;
	
	var respuestasCarolina = $("#actividad-prueba-carolina");

	respuestasCarolina.find(".respuesta .boton").on("click", function () {
		var dataCorrecto = $(this).data("correcto");
		
		if (dataCorrecto == "si") {
			$(this).parent().addClass("correcto");
		} else if (dataCorrecto == "no") {
			$(this).parent().removeClass("correcto");
		};


		if ($(this).parent().hasClass("contestada") == true) {
			$(this).parent().find(".boton").each(function () {
				$(this).find("img").eq(0).show();
				$(this).find("img").eq(1).hide();
			})
			$(this).find("img").eq(0).hide();
			$(this).find("img").eq(1).show();
			$(this).parent().find(".boton").each(function () {
				$(this).removeClass("elegido");
			})
			$(this).addClass("elegido");
		} else {
			indexRespuestas+=1;
			$(this).parent().addClass("contestada");
			$(this).find("img").eq(0).hide();
			$(this).find("img").eq(1).show();
			$(this).addClass("elegido");
		};

		
		if (indexRespuestas >= 10) {
			indexRespuestas = 10;
			respuestasCarolina.find(".validar").fadeIn(300);
		};

		////console.log("indexRespuestas: " + indexRespuestas);
	})

	respuestasCarolina.find(".validar").on("click", function () {
		intentosDialogos += 1;
		var cuantasCorrectas = respuestasCarolina.find(".correcto").length - 1;
		function dialogosOK () {
			TweenLite.to( respuestasCarolina.find(".interna").eq(0), 0.7, { css:{ display:"none", left: "-960px", opacity: "0" }} )
			TweenLite.to( respuestasCarolina.find(".interna").eq(2), 0.7, { css:{ display:"block", left: "0", opacity: "1"} } )
			$("#derecha").delay(1000).fadeIn(300);
			$("#felicitacion-7 .correcto").show();
			$("#felicitacion-7 .incorrecto").hide();
			$("#felicitacion-7 .nombre-consultora").hide();
			
			indexEstrellas+=5;
			$("#felicitacion-7 .estrellas-acumuladas").text(indexEstrellas);
		}
		function dialogosNO () {
			$("#felicitacion-7 .incorrecto").show();
			$("#felicitacion-7 .correcto").hide();
			$("#felicitacion-7 .nombre-consultora").hide();
			$("#felicitacion-7 .estrellas-acumuladas").text(indexEstrellas);
			TweenLite.to(respuestasCarolina.find(".interna").eq(0), 0.7, { css:{ display:"none", left: "-960px", opacity: "0"} } )
		}
		
		
		if (intentosDialogos >=2 ) {
			if(cuantasCorrectas == 9 ){
				dialogosOK();		
			} else {
				dialogosNO();
				TweenLite.to(respuestasCarolina.find(".interna").eq(3), 0.7, { css:{ display:"block", left: "0", opacity: "1"} } )
				$("#derecha").delay(1000).fadeIn(300);
			}
		} else {
			if(cuantasCorrectas == 9 ){
				dialogosOK();
			} else {
				dialogosNO();
				TweenLite.to(respuestasCarolina.find(".interna").eq(1), 0.7, { css:{ display:"block", left: "0", opacity: "1"} } )
				respuestasCarolina.find(".interna").eq(1).find(".volver").delay(1000).fadeIn(300);

			}
		}
	})

	respuestasCarolina.find(".volver").on("click", function () {
		indexRespuestas = 0;
		respuestasCarolina.find(".respuesta").each(function () {
			$(this).removeClass("contestada");
			$(this).parent().find(".boton").each(function () {
				$(this).find("img").eq(0).show();
				$(this).find("img").eq(1).hide();
			})
		});
		respuestasCarolina.find(".validar").hide();
		TweenLite.to(respuestasCarolina.find(".interna").eq(1), 0.7, { css:{ display:"none", left: "960px", opacity: "0"} } )
		TweenLite.to(respuestasCarolina.find(".interna").eq(0), 0.7, { css:{ display:"block", left: "0", opacity: "1"} } )
	})
}

/*FIN FUNCIONES MODULO 3*/



// JavaScript Document
/*INICIO MODULO 4*/

jQuery.fn.extend({
	actividad_agenda : function(){
	var idDiv = $(this).attr("id"); 
	var arraySpanAgenda = [];
	
	
	$("#"+idDiv).find(".inicio_agenda").click(function(e){
		$(this).parent().fadeOut("fast");
		$("#"+idDiv).find(".shadow_agenda_2").fadeIn("fast");
		stopSong();
		audios("117");
	});
	
	$("#"+idDiv).find(".finalizar_agenda").click(function(e){
		if($("#"+idDiv).find(".cliente_age").val() != "" && $("#"+idDiv).find(".campaña_age").val() != "" 
			&& $("#"+idDiv).find(".producto_age").val() != "" &&  $("#"+idDiv).find(".fecha_cob_age").val() != "" 
			&& $("#"+idDiv).find(".saldo_age").val() != "" &&  $("#"+idDiv).find(".monto_ped_age").val() != ""){
			

			$(this).parent().fadeOut("fast");
			$("#"+idDiv).find(".shadow_agenda_3").fadeIn("fast");
			
			
			
			$("#"+idDiv).find(".txt_agenda input").each(function(index, element) {
				var dataTxt = $(element).data("cual");
				//////////console.log($(element).val());
				$("#"+idDiv).find(".span_agenda").eq(dataTxt).text( $(element).val() );
			});
		}else{
			alert("Por favor revisé que no falte información.");
		}
		
	});
	
	$("#"+idDiv).find(".enviar_agenda").click(function(e){
		$("#"+idDiv).find(".shadow_correo_ag").fadeIn("slow");
	});
	
	$("#"+idDiv).find(".izq_cob").click(function(e){
		$(this).parent().fadeOut("fast");
		$("#"+idDiv).find(".shadow_agenda_3").fadeIn("slow");
		$("#derecha").fadeOut(10);
	});
	
	$("#"+idDiv).find(".izq_shadow_agenda_3").click(function(e){
		$(this).parent().fadeOut("fast");
		$("#"+idDiv).find(".shadow_agenda_2").fadeIn("slow");
		$("#derecha").fadeOut(10);
	});
	
	
	
	
	$("#"+idDiv).find(".btn_enviar_correo").click(function(e){
		
		var correo_persona =  $(this).parent().find(".txt_env_correo").val();
		
		var arroba = /.\@./;
		var punto  = /.\../;
		var contenido_email = "<p>Lista de Cobranzas: </p></br>";
		
		if(arroba.test(correo_persona) == false){
			alert("Por favor, introduce un e-mail valido.");
		}else{
			if(punto.test(correo_persona) == false){
				alert("Por favor, introduce un e-mail valido.");
			}else{
				var indexAgenda = 0;

				$("#"+idDiv).find(".txt_agenda input").each(function(index, element) {
					if($(element).val() != "" && $(element).val() != " "){
						arraySpanAgenda[indexAgenda] = $(element).val();
						indexAgenda ++;
					}
						
                });
				
				
				for(var c = 0; c < arraySpanAgenda.length ; c++){
					switch(c){
						case 0:
							contenido_email = contenido_email+ "<p> Nombre: " +arraySpanAgenda[c] + "</p></br>";
						break;
						
						case 1:
							contenido_email = contenido_email+ "<p> Campaña: " +arraySpanAgenda[c] + "</p></br>";
						break;
						
						case 2:
							contenido_email = contenido_email+ "<p> Productos pedido: " + "</p></br></br>";
							contenido_email = contenido_email+ "<p> * " +arraySpanAgenda[c] + "</p></br>";
							
						case 3:
						case 4:
						case 5:
						case 6:
						case 7:
							contenido_email = contenido_email+ "<p> * " +arraySpanAgenda[c] + "</p></br>";
						break;
						
						case 8:
							contenido_email = contenido_email+ "<p> Monto de Pedido: " +arraySpanAgenda[c] + "</p></br>";
						break;
						
						case 9:
							contenido_email = contenido_email+ "<p> Adelanto: " +arraySpanAgenda[c] + "</p></br>";
						break;
						
						case 10:
							contenido_email = contenido_email+ "<p> Saldo: " +arraySpanAgenda[c] + "</p></br>";
						break;
						
						case 11:
							contenido_email = contenido_email+ "<p> Fecha de cobranza: " +arraySpanAgenda[c] + "</p>";
						break;
						
					}

				}
				
				contenido_email = contenido_email + "</p>";
								
				$(this).parent().fadeOut("slow");
				$(this).parent().parent().fadeOut("slow");
				
				$("#"+idDiv).find(".shadow_agenda_4").fadeIn("fast");
				$("#derecha").fadeIn("slow");
				
				enviar_mail(nombre_consultora, correo_persona, "Lista de Cobranza" , contenido_email);
				
				stopSong();
				audios("119");
			}
		}
		
		
		
	});
	
	
	
	$("#"+idDiv).find(".hover_btn").hover(function(e){
		$(this).find("img").eq(1).fadeIn("fast");
	},function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});




}});

/*FIN MODULO 4*/



// JavaScript Document



/*INICIO MODULO 5*/

//calificacion_eva
var respuesta = ""; 
var respCorr = 0;
var est_ganadas = 0;
var tot_est_ganadas = 0;
	
jQuery.fn.extend({
	actividad_evaluacion : function(){
	var idDiv = $(this).attr("id");
	var intentos = 2;

	
	$("#"+idDiv).find(".iniciar_evaluacion").hover(function(e){
		$(this).find("img").eq(1).fadeIn("fast");
	}, function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});
	
	
	$("#"+idDiv).find(".irEncuesta").hover(function(e){
		$(this).find("img").eq(1).fadeIn("fast");
	}, function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});
	
	
	
	$("#"+idDiv).find(".iniciar_evaluacion").click(function(e){
		$(this).parent().parent().find(".flechas-internas .derecha").trigger("click");
		
	});
	
	$("#"+idDiv).find(".responder_preg_eva").hover(function(e){
		$(this).find("img").eq(1).fadeIn("fast");
	}, function(e){
		$(this).find("img").eq(1).fadeOut(10);
	});

	
	$("#"+idDiv).find(".responder_preg_eva").click(function(e){
		
		if(respuesta == "bien"){
			//$(this).parent().parent().find(".flechas-internas .derecha").trigger("click");
			
			$("#"+idDiv).find(".shadow_correctas").fadeIn("fast");
			$(this).parent().parent().find(".flechas-internas .derecha").fadeIn("fast");
			
			calificacion_eva  = calificacion_eva + 2;
			respuesta = "";
			respCorr ++;
		}else{
			intentos --;
			
			//$("#"+idDiv).find(".shadow_incorrectas").fadeIn("fast");
			
			if(intentos <= 0){
				$(this).parent().parent().find(".flechas-internas .derecha").fadeIn("fast");
				//$("#"+idDiv).find(".shadow_incorrectas").find(".volver_eva").fadeOut(10);
				
				$("#"+idDiv).find(".msn_bellisa_2").fadeIn("fast");
				$("#"+idDiv).find(".fondo_resp").fadeIn("fast");
				
				$("#"+idDiv).find(".msn_bellisa_1").fadeOut(10);
				
				$("#"+idDiv).find(".responder_preg_eva").unbind("click");
				$("#"+idDiv).find(".responder_preg_eva").css("cursor","auto");
				$("#"+idDiv).find(".responder_preg_eva").fadeOut(10);
				
				$("#"+idDiv).find(".respuesta_eva").unbind("click");
				$("#"+idDiv).find(".respuesta_eva").css("cursor","auto");
				
			}else{
				$("#"+idDiv).find(".shadow_incorrectas").fadeIn("fast");
				$("#"+idDiv).find(".shadow_incorrectas").find(".volver_eva").fadeIn("fast");
			}
			
			

			respuesta = "";
		}
		
		$("#felicitacion-8").find(".tot_resp_corr").text(respCorr);
		
		est_ganadas = respCorr * 2;
		
		////////console.log(est_ganadas);
		$("#felicitacion-8").find(".est_gan").text(est_ganadas);
		
		$("#felicitacion-8").find(".estrellas-acumuladas").text(calificacion_eva);
		

		tot_est_ganadas = calificacion_eva + 11;
		
		$("#felicitacion-mod-5 .estrellas-acumuladas").text(tot_est_ganadas);
		////////console.log(tot_est_ganadas);

	});
	
	
		
	$("#"+idDiv).find(".volver_eva").hover(function(e){
		$(this).find("img").fadeIn("fast");
	}, function(e){
		$(this).find("img").fadeOut(10);
	});
	
	

	$("#"+idDiv).find(".volver_eva").click(function(e){
		$(this).parent().fadeOut(500);
	});
	
	
	
	$("#"+idDiv).find(".respuesta_eva").click(function(e){
		var dataResp = $(this).data("correcta");
		if(dataResp == 1){
			respuesta = "bien";
		}else{
			respuesta = "mal";
		}
		$(this).parent().find(".responder_preg_eva").fadeIn("fast");
		
		$("#"+idDiv).find(".respuesta_eva").each(function(index, element) {
            $(this).find("img").eq(0).fadeIn(10);
			$(this).find("img").eq(1).fadeOut(10);
        });
		
		$(this).find("img").eq(1).fadeIn("fast");
		
	});
	
	
	

}});

/*FIN MODULO 5*/



/******	  FUNCION DE MAIL	******/


function enviar_mail(nombre, correo, asunto, contenido){
	
	$.ajax({
		  
		  type: "POST",
		  url: "http://www.bakia.co/nuevas_c/mail.php",
		  data: { mai:correo , asu: asunto ,  com: contenido , nom: nombre },
		  
		error: function (xhr, ajaxOptions, thrownError) {
		  console.log(xhr.status);
		  console.log(thrownError);
		}
	
		}).done(function( msg ) {
		
			switch(msg){
				case "0":
					alert("Hubo un error, intente de nuevo más adelante");
				return;
				case "1":
					//$("#nombre,#mail,#telefono,#comentario").val("");
					alert("Mensaje enviado exitosamente");
				break;
				
			}
	});

	alert("Mensaje enviado exitosamente.");


}
