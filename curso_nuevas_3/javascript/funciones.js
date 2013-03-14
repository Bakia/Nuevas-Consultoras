var preload=true;
var currentAudio="";
var nombre_consultora = "";


var listaFamiliaArrayNom = [];
var listaFamiliaArrayApe = [];
var listaFamiliaArrayTel = [];

var listaAmigosArrayNom = [];
var listaAmigosArrayApe = [];
var listaAmigosArrayTel = [];

var listaVecinosArrayNom = [];
var listaVecinosArrayApe = [];
var listaVecinosArrayTel = [];

/*$(document).ready(function(e) {
    listo();
});
function stopSong(){
	//console.log("parar audio");
}
function playSong(){
	//console.log("play audio");
}
*/
function listo(){
	if(preload){
		$("body").queryLoader2({
			barColor: "#6c1f7f",
			backgroundColor: "#ffffff",
			onComplete:init,
			percentage: true,
			barHeight: 1,
			completeAnimation: "grow",
			minimumTime: 500
		});
	}else{
		init();
	}
}
function init(){
	
	$("body").elearningHTML({
		onInitComplete:iniciar,
		widthSlide:960
	});
}
function audios(cual){
	currentAudio=cual+"";
	playSong(cual);
}


function iniciar(){
	

	 function IniciarObjetivosModulo () {
            
            var intentosModulo = LMSGetValue("cmi.objectives.0.id");            
            //alert(intentosModulo);
            var estrellasModulo = LMSGetValue("cmi.objectives.1.id");
                 
            var get_intentosModulo_score;           
            if (intentosModulo != "intentosModulo" ) {
                // alert("No existen los objetivo, los voy a crear.");
                var set_intentosModulo = LMSSetValue("cmi.objectives.0.id", "intentosModulo");
                
                var set_intentosModulo_score = LMSSetValue("cmi.objectives.0.score.raw", 0);
                get_intentosModulo_score = LMSGetValue("cmi.objectives.0.score.raw");
                
                // alert("Objetivos creados exitosamente!\nIntentos: " + get_intentosModulo_score);
                
            } else {
                get_intentosModulo_score = LMSGetValue("cmi.objectives.0.score.raw");
                // alert("Ya has completado este modulo " + get_intentosModulo_score + " veces.");            
            };
      
            
            LMSCommit("");

        }

        IniciarObjetivosModulo();   
	
	
	nombre_consultora = LMSGetValue("cmi.core.student_name");
	nombre_consultora = nombre_consultora.split(",");
	//nombre_consultora = nombre_consultora[1] +" "+ nombre_consultora[0];
	nombre_consultora = nombre_consultora[1];
	
	//alert(nombre_consultora);
	
	//alert(LMSGetValue("cmi.interactions.9.student_response"));
	
	$(".seccion .nombre-consultora").text(nombre_consultora);
	
	
	/*INICIO FUNCIONES MODULO 1*/
	$(".mostrar").each(function () {
		$(this).hide();
	})
	$("#introduccion").seccionInterna();
	$("#introduccion .iniciar").on("click", function  () {
		$("#introduccion .derecha").trigger("click");
		$("#flechas #derecha").fadeIn(300);
	});

	$("#introduccion").bind( 'empezoanimaciondesalida', function () {
		$("#seccion0 .cuadro-texto .botones .siguiente").hide();
	});

	$("#seccion0").slideInstrucciones(false, function () {
		$("body").elearningHTML("ocultarPerfil");
		$("#seccion0 .mostrar").delay(500).fadeIn(300);
		$("#derecha").delay(1500).fadeIn(300);
	});

	$("#imagina-meta").bind( 'empezoanimaciondeentrada', function () {
		$("#imagina-meta .cuadro-texto .botones .siguiente").hide();
		$("#imagina-meta .opciones").hide();
		$("#imagina-meta .opciones .opcion-sueno").each(function (i, val) {
			$(this).hide();
		});

		$("#imagina-meta .opcion-sueno .botones .boton").each(function (i, val) {
			$(val).find("img").eq(1).hide();
		})
	});

	$("#imagina-meta").slideInstrucciones(false, function () {
		$(this).parent().parent().fadeOut(500);
		$("#bienvenida-casa-claudia .mostrar").fadeIn(500);
		eligeMeta();
	});

	$("#calculadora").bind("empezoanimaciondeentrada", function () {
		$("#calculadora").seccionInterna();
		calculadora();
		$("#calculadora").find(".derecha").hide();
	})

	/*FIN FUNCIONES MODULO 1*/

	/*INICIO FUNCIONES MODULO 2*/
	$("#sec1etapa2").seccion1paso2();
	$("#sec2etapa2").seccion1paso2();
	$("#sec3etapa2").seccion1paso2();
	$("#sec_tu_casa").seccion1paso2();
	$("#tu_red_social").seccion1paso2();
	$("#tu_red_social").seccionInterna();
	$(".txtFamiliaTel").validarCampo('0123456789');
	
	$(".text_prueba").validarCampo('0123456789.a');
	
	
	$("#lista_familia").seccionLlenarListas(listaFamiliaArrayNom, listaFamiliaArrayApe , listaFamiliaArrayTel);
	$("#lista_amigos").seccionLlenarListas(listaAmigosArrayNom, listaAmigosArrayApe , listaAmigosArrayTel);
	$("#lista_vecinos").seccionLlenarListas(listaVecinosArrayNom, listaVecinosArrayApe , listaVecinosArrayTel);
	
	
	
	$("#lista_completa").seccionVerListaCompleta();
	
	$("#ciudad_2").seccion1paso2();
	$("#casa_claudia_2").seccion1paso2();
	$("#ciudad_3").seccion1paso2();
	$("#menu_casa_1").seccion1paso2();
	
	$("#prod_cada_cliente").seccionInterna();
	$("#prod_cada_cliente").prodCadaCliente();
	
	$("#act_drags_prod").actividadDragProds();
	
	$("#agregar_familia").actividadAgregarFamilia();
	

	$("#act_citas").bind( 'empezoanimaciondeentrada', function () {
		calendarioCitas();
		var api = $("#calendario input:date").data("dateinput");
		api.show();

		TweenLite.to( $("#calroot"),0.7, {css:{top:"154px", left:"540px"}, delay:0, ease:Circ.easeInOut});
		
		$("#act_citas").append($("#calroot"));
		//$("#act_citas div").css("position","relative");left: 523px; top: 91px;
		$("#calroot").css("position","absolute");
	});

	
	$("#sec_catalogos").actividadcatalogos();
	
	$("#ciudad_4").seccion1paso2();
	$("#casa_claudia_3").seccion1paso2();
	$("#ciudad_5").seccion1paso2();
	
	$("#tu_casa_agenda").seccion1paso2();
	$("#act_citas").actividad_calendario();
	
	
	
	$("#act_secciones_papeles_fam").actividadSeccionesPapeles();
	$("#act_secciones_papeles_am").actividadSeccionesPapeles();
	
	
	$(".sec_video").bind( 'empezoanimaciondeentrada', function () {
		$("#derecha").fadeOut(10);
		/*$("#derecha").delay(3000).fadeIn("slow");*/
		
	});
	
	
	
	
	$("#video1").bind( 'terminaranimaciondesalida', function () {
		var iframe_0 = document.getElementById("frame_video_0");
		iframe_0.contentWindow.cerrarVideo();

	});
	
	$("#videoEt2_1").bind( 'terminaranimaciondesalida', function () {
		var iframe_1 = document.getElementById("frame_video_1");
		iframe_1.contentWindow.cerrarVideo();
	});
	
	$("#videoEt2_2").bind( 'terminaranimaciondesalida', function () {
		var iframe_2 = document.getElementById("frame_video_2");
		iframe_2.contentWindow.cerrarVideo();
	});
	
	$("#videoEt2_3").bind( 'terminaranimaciondesalida', function () {
		var iframe_3 = document.getElementById("frame_video_3");
		iframe_3.contentWindow.cerrarVideo();
	});
	
	$("#video5").bind( 'terminaranimaciondesalida', function () {
		var iframe_4 = document.getElementById("frame_video_4");
		iframe_4.contentWindow.cerrarVideo();
	});
	
	$("#video6").bind( 'terminaranimaciondesalida', function () {
		var iframe_5 = document.getElementById("frame_video_5");
		iframe_5.contentWindow.cerrarVideo();
	});
	
	
	$("#videoEt4_1").bind( 'terminaranimaciondesalida', function () {
		var iframe_6 = document.getElementById("frame_video_6");
		iframe_6.contentWindow.cerrarVideo();
	});
	
	$("#videoEt4_2").bind( 'terminaranimaciondesalida', function () {
		var iframe_7 = document.getElementById("frame_video_7");
		iframe_7.contentWindow.cerrarVideo();
	});

	/*FIN FUNCIONES MODULO 2*/
	
	/*INICIO FUNCIONES MODULO 3*/

	$("#continua-camino .cerrar").on("click", function () {
		$(this).parent().parent().fadeOut(300);
		$("#continua-camino .mostrar").delay(500).fadeIn(300);
	});
	$("#momento-aprender .cerrar").on("click", function () {
		$(this).parent().parent().fadeOut(300);
		$("#momento-aprender .mostrar").delay(500).fadeIn(300);
	});
	$("#ciudad-planificar .cerrar").on("click", function () {
		$(this).parent().parent().fadeOut(300);
		$("#ciudad-planificar .mostrar").delay(500).fadeIn(300);
	});
	$("#casa-bolso .cerrar").on("click", function () {
		$(this).parent().parent().fadeOut(300);
		$("#casa-bolso .mostrar").delay(500).fadeIn(300);
	});


	$("#drag-cartera").bind( 'empezoanimaciondeentrada', function () {
		$("#drag-cartera").seccionInterna();
		dragCartera();
	});

	$("#ciudad-claudia-visita .cerrar").on("click", function () {
		$(this).parent().parent().fadeOut(300);
		$("#ciudad-claudia-visita .mostrar").delay(500).fadeIn(300);
	});
	$("#ciudad-casa-carolina .cerrar").on("click", function () {
		$(this).parent().parent().fadeOut(300);
		$("#ciudad-casa-carolina .mostrar").delay(500).fadeIn(300);
	});

	$("#dialogos-casa-carolina").seccionInterna();


	$("#actividad-prueba-carolina").bind( 'empezoanimaciondeentrada', function () {
		respuestasDialogosCarolina();
	});


	$("#actividad-prueba-carolina").seccionInterna();

	/*FIN FUNCIONES MODULO 3*/
	
	
	/*INICIO FUNCIONES MODULO 4*/
		$("#ciudad_1_part_4").seccion1paso2();
		$("#claudia_1_part_4").seccion1paso2();
		$("#tu_casa_1_part_4").seccion1paso2();
		$("#agenda_1_part_4").seccion1paso2();
		
		$("#act_agenda_1").actividad_agenda();
		$("#act_agenda_1").seccion1paso2();
		
		$(".monto_ped_age").validarCampo('0123456789');
		$(".adelanto_age").validarCampo('0123456789');
		$(".saldo_age").validarCampo('0123456789');
		
		$("#ciudad_2_part_4").seccion1paso2();
		$("#claudia_2_part_4").seccion1paso2();
		
		$("#sec_catalogos").bind( 'empezoanimaciondeentradainterna', function () {
			$.timer(1500,function(e){
				
				$("#sec_catalogos .titila").fadeOut(500);
				$("#sec_catalogos .titila").delay(500).fadeIn(500);
			});
		});
		
		$("#agenda_1_part_4").bind( 'empezoanimaciondesalida', function () {
			
			if (navigator.appName.indexOf("Explorer") != -1) { 
					
				$("#act_agenda_1 .fecha_cob_age").validarCampo('0123456789');
					
			} else{
				
				$.tools.dateinput.localize("es", {
					months: 'Enero,Febrero,Marzo,Abril,Mayo,Junio,Julio,Agosto,Septiembre,Octubre,Noviembre,Diciembre',
					shortMonths:  'Ene,Feb,Mar,Abr,May,Jun,Jul,Ago,Sep,Oct,Nov,Dic',
					days:         'Domingo,Lunes,Martes,Miercoles,Jueves,Viernes,Sábado',
					shortDays:    'D,L,M,M,J,V,S'
				});
		
		
				$("#agenda_date").find(".fecha_cob_age").dateinput({
					lang: 'es',
					onHide: function()  {
						return true;
					},
					css:{
						root:"calendario-cobranza"
					}
				
				}).data("dateinput").setValue(0).show();
				
				
				
				$("#calroot_2_container").append($("#calendario-cobranza"));
				
				$("#calendario-cobranza").css("position", "relative");
			
	
				TweenLite.to( $("#calendario-cobranza"), 0.7, { css:{top: "-300px" ,width:395 }, delay:0, ease:Circ.easeInOut});
				
				$("#agenda_date").find(".fecha_cob_age").click(function(e) {
					$("#agenda_date").find(".sombra_calendario").fadeIn("fast");
				});
				
				
				
				$("#agenda_date").find(".fecha_cob_age").change(function(event, date) {
					$("#agenda_date").find(".sombra_calendario").fadeOut("fast");	
					$("#calendario-cobranza").fadeOut("fast");		
				});
			
			
			}
			
			
			
			
		});
		
	
	/*FIN FUNCIONES MODULO 4*/
	
	/*INICIO FUNCIONES MODULO 5*/
		$("#seccion_preguntas_prt_5").seccionInterna();
		
		$("#inicio_pregunta").actividad_evaluacion();
		
		$("#pregunta_1").actividad_evaluacion();
		$("#pregunta_2").actividad_evaluacion();
		$("#pregunta_3").actividad_evaluacion();
		$("#pregunta_4").actividad_evaluacion();
		$("#pregunta_5").actividad_evaluacion();
		$("#pregunta_6").actividad_evaluacion();
		$("#pregunta_7").actividad_evaluacion();
		
		$("#ultimo_3_eva").actividad_evaluacion();
		
	
	/*FIN FUNCIONES MODULO 5*/
	
	/* INICIO ACUMULACION ESTRELLAS */
	$("#felicitacion-1").bind("empezoanimaciondeentrada", function () {
		indexEstrellas+=5;
		$("#felicitacion-1 .estrellas-acumuladas").text(indexEstrellas);
	})
	$("#felicitacion-2").bind("empezoanimaciondeentrada", function () {
		indexEstrellas+=5;
		$("#felicitacion-2 .estrellas-acumuladas").text(indexEstrellas);
	})
	$("#felicitacion-3").bind("empezoanimaciondeentradainterna", function () {
		indexEstrellas+=5;
		$("#felicitacion-3 .estrellas-acumuladas").text(indexEstrellas);
		$("#derecha").fadeIn("fast");
	})
	$("#felicitacion-4").bind("empezoanimaciondeentradainterna", function () {
		indexEstrellas+=5;
		$("#felicitacion-4 .estrellas-acumuladas").text(indexEstrellas);
		$("#derecha").fadeIn("fast");
	})
	$("#felicitacion-5").bind("empezoanimaciondeentrada", function () {
		indexEstrellas+=5;
		$("#felicitacion-5 .estrellas-acumuladas").text(indexEstrellas);
	})
	
	$("#felicitacion-mod-1").bind("empezoanimaciondeentrada", function () {
		indexEstrellas+=10;
		$("#felicitacion-mod-1 .estrellas-acumuladas").text(indexEstrellas);
	})
	$("#felicitacion-mod-2").bind("empezoanimaciondeentrada", function () {
		indexEstrellas+=10;
		$("#felicitacion-mod-2 .estrellas-acumuladas").text(indexEstrellas);
	})
	$("#felicitacion-mod-3").bind("empezoanimaciondeentrada", function () {
		indexEstrellas+=10;
		$("#felicitacion-mod-3 .estrellas-acumuladas").text(indexEstrellas);
	})
	$("#felicitacion-mod-4").bind("empezoanimaciondeentrada", function () {
		indexEstrellas+=10;
		$("#felicitacion-mod-4 .estrellas-acumuladas").text(indexEstrellas);
	})
	
	
	/* FIN ACUMULACION ESTRELLAS */



}

function terminoaudio(){
	//console.log(currentAudio);
	switch(currentAudio){
			/*case "1":
				$("body").elearningHTML('showSeccion',(currentIndex + 1));
			break;*/


			/*INICIO AUDIOS MODULO 1*/
			case "2":
				stopSong();
				audios("3");
			break;

			case "3":
				$("#seccion0 .cuadro-texto .botones .siguiente").fadeIn(300);
				$("#seccion0 .cuadro-texto .botones .siguiente").on("click", function () {
					stopSong();
					audios("4");	
				});
			break;

			case "4":
				stopSong();
				audios("5")
			break;

			case "5":
				$("#seccion0 .slide .cerrar").fadeIn(300);
			break;

			case "6":
				$("#empecemos .marcador").fadeIn(300);
			break;

			case "7":
				stopSong();
				$("#bienvenida-casa-claudia .cerrar").delay(500).fadeIn(300);
				$("#bienvenida-casa-claudia .cerrar").on("click", function () {
					$(this).parent().parent().fadeOut(500);
					$("#bienvenida-casa-claudia .mostrar").fadeIn(500);
				})
			break;

			case "10":
				$("#imagina-meta .cuadro-texto .botones .siguiente").fadeIn(300);
				
			break;

			case "11":
				$("#imagina-meta .slide .cerrar").fadeIn(300);
			break;

			case "21":
				$("#dirigete-casa .cerrar").fadeIn(300);
				$("#dirigete-casa .cerrar").on("click", function () {
					$(this).parent().fadeOut(500);
					$("#dirigete-casa .mostrar").fadeIn(500);
				})
			break;

			case "22":
				$("#click-calculadora .cerrar").fadeIn(300);
				$("#click-calculadora .cerrar").on("click", function () {
					$(this).parent().parent().fadeOut(500);
					$("#click-calculadora .mostrar").fadeIn(500);
				})
			break;
			/*FIN AUDIOS MODULO 1*/
			
			/*INICIO AUDIOS MODULO 2*/
			
			case "30":
				$("#sec1etapa2").find(".cerrar_shadow").fadeIn("slow");
			
			break;
			
			case "31":
				$("#sec2etapa2").find(".cerrar_shadow").fadeIn("slow");
			
			break;
			
			case "34":
				$("#sec3etapa2").find(".cerrar_shadow").fadeIn("slow");
			
			break;
			
			case "35":
				$("#sec_tu_casa").find(".cerrar_shadow").fadeIn("slow");
			
			break;
			
			case "37":
				$("#tu_red_social").find(".cerrar_shadowV2").fadeIn("slow");
			
			break;
			
			case "38":
				$("#lista_familia").find(".cerrar_shadow").fadeIn("slow");
			
			break;
			
			case "39":
				$("#lista_amigos").find(".cerrar_shadow").fadeIn("slow");
			
			break;
			
			case "40-1":
				$("#lista_vecinos").find(".cerrar_shadow").fadeIn("slow");
			
			break;
			
			case "40-2":
				stopSong();
				audios("41");
			
			break;
			
			case "42":
				$("#shadow_1_lista_comp").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "41":
				$("#shadow_1_lista_comp").find(".btnSigGloboListComp").fadeIn("slow");
			break;
			
			case "44":
				$("#ciudad_2").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "46":
				$("#casa_claudia_2").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "49":
				$("#ciudad_3").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "50":
				$("#menu_casa_1").find(".cerrar_shadow").fadeIn("slow");
			break;

			case "60":
				$("#ciudad_4").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "61":
				$("#casa_claudia_3").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "64":
				$("#ciudad_5").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "65":
				$("#tu_casa_agenda").find(".cerrar_shadow").fadeIn("slow");
			break;

			case "69":
				$("#act_citas").find(".cerrar_shadow1_cal").fadeIn("slow");
			break;

			/*FIN AUDIOS MODULO 2*/
			
			/*INICIO AUDIOS MODULO 3*/


			case "74":
				$("#continua-camino .cerrar").fadeIn("300");
			break;

			case "75":
				$("#momento-aprender .cerrar").fadeIn("300");
			break;

			case "78":
				$("#ciudad-planificar .cerrar").fadeIn("300");
			break;

			case "79":
				$("#casa-bolso .cerrar").fadeIn("300");
			break;

			case "88":
				$("#ciudad-claudia-visita .cerrar").fadeIn("300");
			break;

			case "91":
				$("#ciudad-casa-carolina .cerrar").fadeIn("300");
			break;
			
			case "92":
				$(".derecha").fadeIn("300");
			break;

			case "93":
				$(".derecha").fadeIn("300");
			break;

			case "94":
				$(".derecha").fadeIn("300");
			break;

			case "95":
				$(".derecha").fadeIn("300");
			break;

			case "96":
				$(".derecha").fadeIn("300");
			break;

			case "97":
				$(".derecha").fadeIn("300");
			break;

			case "98":
				$(".derecha").fadeIn("300");
			break;

			case "99":
				$(".derecha").fadeIn("300");
			break;

			case "100":
				$(".derecha").fadeIn("300");
			break;

			case "101":
				$(".derecha").fadeIn("300");
			break;

			case "102":
				$(".derecha").fadeIn("300");
			break;

			case "103":
				$(".derecha").fadeIn("300");
			break;

			case "104":
				$("#derecha").fadeIn("300");
			break;

			case "106":
				$("#derecha").fadeIn("300");
			break;

			/*FIN AUDIOS MODULO 3*/
			
			/*INICIO AUDIOS MODULO 4*/
			
			case "110":
				$("#ciudad_1_part_4").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "112":
				$("#claudia_1_part_4").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "114":
				$("#tu_casa_1_part_4").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "115":
				$("#agenda_1_part_4").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "120":
				$("#ciudad_2_part_4").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			case "121":
				$("#claudia_2_part_4").find(".cerrar_shadow").fadeIn("slow");
			break;
			
			
			/*FIN AUDIOS MODULO 4*/
			
			/*INICIO AUDIOS MODULO 5*/
			
			case "124":
				$("#inicio_pregunta").find(".iniciar_evaluacion").fadeIn("slow");
			break;
			
			case "134":
			case "135":
				$("#seccion_preguntas_prt_5").find(".derecha").fadeIn("slow");
			break;
			
			/*FIN AUDIOS MODULO 5*/
			
			
			
			
				
			default:
				// $("#derecha").fadeIn();
			break;
			
	}
}




// MOSTRAR FLECHAS
function mostrarFlechaDer () {
	$("#derecha").fadeIn(300);
}
function mostrarFlechaIzq () {
	$("#izquierda").fadeIn(300);
}
function mostrarFlechas () {
	$("#izquierda").fadeIn(300);
	$("#derecha").fadeIn(300);
}






