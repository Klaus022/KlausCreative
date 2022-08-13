$(document).ready(function(){
	window.addEventListener("message",function(event){
		if (event["data"]["show"] !== undefined){
			if (event["data"]["show"] == true){
				$("#Arena").css("display","block");
			} else {
				$("#Arena").css("display","none");
			}

			return
		}

		if (event["data"]["Players"] !== undefined){
			$("#Arena").html(`<b>JOGADORES PARTICIPANTES: ${event["data"]["Players"]}</b>`);
		}

		if (event["data"]["deathArena"] == true){
			$("#deathDiv").css("display","block");
			$("#deathText").html('PRESSIONE <color>E</color> PARA RENASCER NA ARENA');
		} else {
			$("#deathDiv").css("display","none");
		}
	});
});