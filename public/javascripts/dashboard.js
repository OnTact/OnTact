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



// VIEW CONNECTIONS
	// render all contacts
	$("#connections-bttn").on('click', function(){
		var connectionsTemplate = $("#connections-all-template");
		console.log('connections clicked')
		loadDom(connectionsTemplate);
	
	  $("#scrolladex").slick({
	  	slidesToShow: 2,
	  	slidesToScroll: 1,
	  	centerMode: true,
	  	centerPadding: "100px"
  		});


		var centers = $(".slick-center");
		var centerClick = $(centers[0]);
		centerClick.on("click", function(){
			var username = this.id
			$.ajax({
				url: '/finduser',
				type: 'POST',
				data: {username: username}
				}).done(function(data){
				var userParsed = JSON.parse(data);
// RENDER SEARCH RESULT PAGE:
				$container.empty();

				// search result template
				var $template = $('<div id="view-connection-template">')
				$container.append($template);
					// append header "connect with >username?"
				
					var $h3 = $('<h3">').text(userParsed.f_name + " " +userParsed.l_name);
					var $p1 = $('<p>').text(userParsed.position + " | " + userParsed.company);
					var $p2 = $('<p>').text(userParsed.username);

					$template.append($h3);
					$template.append($p1);
					$template.append($p2);

				// debugger
				// var template = $("<div class='card-info'><img src='" +user.image + "'></div><div class='card-info'><h3>" + user.f_name + " " + user.l_name "</h3><h4>Headline" + user.headline + "</h4><h4>Personal Phone</h4><p>" + user.personal_phone + "</p><h4>Work Phone</h4><p>" + user.professional_phone + "</p><h4>Personal Email</h4><p>" + user.personal_email + "</p><h4>Work Email</h4><p>" + user.professional_email + "</p><p>" + user.position + " | " + user.company + " | " + user.website + "</p><div>");
				// debugger
				// loadDom(template);
			});
		});

	});	



// VIEW NOTIFICATIONS
	// render notifications
	$("#notifications-bttn").on('click', function(){
		var notificationsTemplate = $("#notifications-view-template");
		loadDom(notificationsTemplate);
	});	



// ADD CONNECTIONS
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
				var parsedConnection = JSON.parse(data);
				// RENDER SEARCH RESULT PAGE:
				$container.empty();

				// search result template
				var $searchResultTemplate = $('<div id="search-result-template">')
				$container.append($searchResultTemplate);
					// append header "connect with >username?"
					var $resultHeader = $('<h3 class="srch-rslt-header">').text("Connect with >"+parsedConnection.username)
					$searchResultTemplate.append($resultHeader);
					// append connection preview card
					var $resultPreviewCard = $('<div class="srch-rslt-preview">')
					$searchResultTemplate.append($resultPreviewCard);
				
					var $h3 = $('<h3 class="srch-rslt-Name">').text(parsedConnection.f_name + " " +parsedConnection.l_name);
					var $p1 = $('<p>').text(parsedConnection.position + " | " + parsedConnection.company);
					var $p2 = $('<p>').text(parsedConnection.username);

					$resultPreviewCard.append($h3);
					$resultPreviewCard.append($p1);
					$resultPreviewCard.append($p2);

				// search result template & form
				var $addSearchResultTemplate = $('<div id="add-search-result-template">')
				
					var $connectForm = $('<form id="add-connection-form" method="post" action="/connections">')

					var $connectionTypePro = $('<p>Professional</p><input type="radio" name="connection_type" value="professional" checked><br>')
					var $connectTypePer = $('<p>Personal</p><input type="radio" name="connection_type" value="personal"><br>')
					var $connectInfo = $('<input type="text" name="additional_info" required placeholder="How did we meet?"><br>')
					var $hiddenInput = $('<input type="hidden" name="receiver_id" value='+ parsedConnection.id +'>')
					var $connectSubmit = $('<input type="submit" value="Request To Connect">')

					$connectForm.append($connectionTypePro);
					$connectForm.append($connectTypePer);
					$connectForm.append($connectInfo);
					$connectForm.append($hiddenInput);
					$connectForm.append($connectSubmit);

					$addSearchResultTemplate.append($connectForm);
					$container.append($addSearchResultTemplate);

			});

		});
	});	

});


					