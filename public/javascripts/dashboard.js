console.log('linked');

var $container = $('#dash-content')

function loadDom(template){
	$container.empty();
	$container.append(template.html());
}

$(function(){	

	// render profile
	$("#profile-bttn").on('click', function(){
		var profileTemplate = $("#profile-view-template");
		loadDom(profileTemplate);

		// render profile edit form
		$("#profile-edit-button").on('click', function(){
			var profileEditTemplate = $("#profile-edit-template");
			loadDom(profileEditTemplate);	
		});
	});	

	// render all contacts
	$("#connections-bttn").on('click', function(){
		var connectionsTemplate = $("#connections-all-template");
		loadDom(connectionsTemplate);
	});	

	// render notifications
	$("#notifications-bttn").on('click', function(){
		var notificationsTemplate = $("#notifications-view-template");
		loadDom(notificationsTemplate);
	});	

	// render add contact form
	$("#add-connection-bttn").on('click', function(){
		var addTemplate = $("#add-connection-template");
		loadDom(addTemplate);

			// render send-request-template
		$("#find-connection-bttn").on('click', function(e){
			e.preventDefault();
			console.log("find button clicked");
			var input = $("#find-username").val();
			$.ajax({
				url: '/finduser',
				type: 'POST',
				data: {username: input}
			}).done(function(data){
				console.log(data);
			});

			// 1. parse the data
			// 2. render  template
			// 3. get it into the db

			// var profileEditTemplate = $("#send-request-template");
			// loadDom(profileEditTemplate);	
		});
	});	

});