var nFindAPITries=0, objAPI=null, bFinishDone=false;
var status;
var startTime = Date.now();
	function FindAPI(win){
			try{
				while ((win.API==null)&&(win.parent!=null)&&(win.parent!=win)){
					nFindAPITries ++
					if(nFindAPITries>5){
						break;
						}else{
							win=win.parent
						}
					}
				return win.API
				}catch(err){
				}
			}
			function getAPI(win){
				if(location.search!='?noapi'){
					var theAPI=FindAPI(window);
					if((theAPI==null)&&(window.opener!=null)&&(typeof(window.opener)!='undefined')){
						theAPI=FindAPI(window.opener);
						}
					if(theAPI==null&&window.parent.opener!=null){
						theAPI=FindAPI(parent.opener)
					}
					if(theAPI==null&&window.parent.parent.opener!=null){
						theAPI=FindAPI(parent.parent.opener)
						}
					if(theAPI==null){
						if(parent.frames.length>0){
							for(i=0; i<parent.frames.length; i++){
								theAPI=FindAPI(parent.frames[i]);
								if(theAPI!=null){
									break
									}
								}
							}
						}
					}
			return theAPI;}
function APIOK(){
	return ((typeof(objAPI)!='undefined')&&(objAPI!=null))
}
function LMSSetValue(nam,v){
	if(APIOK()){
		return objAPI.LMSSetValue(nam,v)
	}
}
function LMSGetValue(nam){if(APIOK()){return objAPI.LMSGetValue(nam)}}
function LMSCommit(){if(APIOK()){return objAPI.LMSCommit("")}}
function LMSGetLastError(){if(APIOK()){return objAPI.LMSGetLastError()}}
function LMSGetErrorString(n){if(APIOK()){return objAPI.LMSGetErrorString(n)}}
function LMSGetDiagnostic(p){if(APIOK()){return objAPI.LMSGetDiagnostic(p)}}
var realObjAPI=null;
objAPI = getAPI(window);

if(!APIOK()){
	//alert("DEBES ESTAR EN UN SCORM");
}else{
	var result = objAPI.LMSInitialize('');
	if(result=='false') {
				var errorCode = objAPI.LMSGetLastError();
				alert('Error:' + errorCode + ' - ' + objAPI.LMSGetErrorString(errorCode) + '\n' + objAPI.LMSGetDiagnostic(''));
	self.close();
	}
	status=LMSGetValue('cmi.core.lesson_status');
	
}


function updateSessionTime() {
  	var nuevaFecha = Date.now();
	var diff = nuevaFecha - startTime;
	var minutocompleta =  60 * 1000;
	var horacompleta = 60 * minutocompleta;
	var horas = parseInt(diff / horacompleta);
	var minutos = parseInt((diff-(horas*horacompleta)) / minutocompleta);
	var segundos =parseInt((diff-(horas*horacompleta)-(minutos*minutocompleta)) / 1000);
	if (segundos<10) {
		segundos="0"+segundos;
	};
	if (minutos<10) {
		minutos="0"+minutos;
	};
	if (horas<10) {
		horas="0"+horas;
	};

   var timeSpan = horas + ":" + minutos + ":" + segundos;
   LMSSetValue("cmi.core.session_time",timeSpan);
} 

