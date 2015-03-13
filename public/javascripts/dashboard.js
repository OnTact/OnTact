console.log('linked');

var $container = $('#dash-content')

$(function(){	

	// render profile
	$("#profile-bttn").on('click', function(){
		console.log('clicked');
		$container.empty();
		var profileTemplate = $("#profile-view-template");
		$container.append(profileTemplate.html());
	});	

	// render all contacts
	$("#connections-bttn").on('click', function(){
		console.log('clicked');
		$container.empty();
		var connectionsTemplate = $("#connections-all-template");
		$container.append(connectionsTemplate.html());
	});	

	// render notifications
	$("#notifications-bttn").on('click', function(){
		console.log('clicked');
		$container.empty();
		var notificationsTemplate = $("#notifications-view-template");
		$container.append(notificationsTemplate.html());
	});	

	// render add contact form
	$("#add-connection-bttn").on('click', function(){
		console.log('clicked');
		$container.empty();
		var addTemplate = $("#add-connection-template");
		$container.append(addTemplate.html());
	});	
});