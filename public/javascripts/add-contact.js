
function hideElements() {
  $("#hide").hide();
};


function setNavHandlers() {
	var $connect = $("add-connection-btnn");

	$connect.on('click', function(){
		$("#hide").show();
		console.log('clicked');
	})
}

function initialize() {
	hideElements();
	setNavHandlers();
};


$(document).ready(function(){
	initialize();
})

