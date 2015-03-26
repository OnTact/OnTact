console.log('linked');

var $container = $('#dash-content')

function loadDom(template){
	$container.empty();
	$container.append(template.html());
}

// alert for accepting or rejecting notifications

function notificationAlert(data){
	var parsed = JSON.parse(data);
	if (parsed.is_connected){
		alert("Request Accepted")
	} else {
		alert("Request Hidden")
	}
	var cardView = $("#" + parsed.id);
	cardView.remove();
}

// window onload function
$(function(){	

	// render profile
	$("#profile-bttn").on('click', function(){
		var profileTemplate = $("#profile-view-template");
		console.log('profile clicked');
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
		console.log('connections clicked');
		loadDom(connectionsTemplate);
	
	// scroll function
	  $("#scrolladex").slick({
	  	slidesToShow: 2,
	  	slidesToScroll: 1,
	  	centerMode: true,
	  	centerPadding: "100px"
  		});

	  // show individual user info when clicking on slide
		var slides = $(".slick-slide");
		for (i = 0; i < slides.length; i ++){
			$(slides[i]).on("click", function(){
				if (this.id){
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
						var $template = $('<div id="view-connection-template" class="cardview">')
						$container.append($template);
							// append header "connect with >username?"
						

						var $img = $('<img class="card-image" src="'+userParsed.image+'"">');
						var $h3 = $('<h3 class="card-view-name">').text(userParsed.f_name + " " +userParsed.l_name);
						var $p0 = $('<p class="card-headline">').text(userParsed.headline);


						var $br = $('<br>');
						var $hr = $('<hr class="card-view-hr">');

						var $p1 = $('<p>').text(userParsed.position + " | " + userParsed.company + " | " + userParsed.website);
						var $p2 = $('<p>').text("Personal: " + userParsed.personal_phone);
						var $p3 = $('<p>').text("Work: " + userParsed.professional_phone);
						var $p4 = $('<p>').text("Personal: " + userParsed.personal_email);
						var $p5 = $('<p>').text("Work: " + userParsed.professional_email);

						$template.append($img);
						$template.append($h3);
						$template.append($p0);

						$template.append($br);
						$template.append($hr);

						$template.append($p2);
						$template.append($p3);
						$template.append($p4);
						$template.append($p5);
						$template.append($p1);
					});
				};
			});
		};
	});	

	// VIEW NOTIFICATIONS
		// render notifications
		$("#notifications-bttn").on('click', function(){
			var notificationsTemplate = $("#notifications-view-template");
			console.log('notifications clicked');
			loadDom(notificationsTemplate);
		});	

	// REJECT
		$('body').on('click', '#reject', function(){
			console.log('clicked reject');
			var id = this.parentElement.id;
			$.ajax({
				url: "/connections/" + id,
				type: "PUT",
				data: ({pending: false, is_connected: false})
			}).done(function(data){
				notificationAlert(data);
			})
		});
		
	// ACCEPT
		$('body').on('click', '#accept', function(){
			console.log('clicked accept');
			var id = this.parentElement.id;
			$.ajax({
				url: "/connections/" + id,
				type: "PUT",
				data: ({pending: false, is_connected: true})
			}).done(function(data){
				notificationAlert(data);
			})
		});

	// INVITE CONNECTION
		$('body').on('click', "#invite-to-button-div", function(){
			var inviteTemplate = $("#invite-template");
			// create email invite
			$("#invite-form-button").on("click", function(e){
				e.preventDefault();
				console.log('clicked');
				var name = $("#invite-name").val();
				var email = $("#invite-email").val();
				debugger
				$.ajax({
					url: "/leads",
					type: "POST",
					data: {name: name, email: email}
				}).done(function(data){
					debugger
					alert(data);
					$("#invite-name").val("");
					$("#invite-email").val("");
				})
			});
			loadDom(inviteTemplate);
		});	



	// ADD CONNECTIONS general function
	function addConnection(){
		
		// render add contact form
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
				var $resultHeader = $('<h3 class="srch-rslt-header">').text("Connect with +"+parsedConnection.username)
				$searchResultTemplate.append($resultHeader);
				// append connection preview card
				var $resultPreviewCard = $('<div class="srch-rslt-preview">')
				$searchResultTemplate.append($resultPreviewCard);
			
				var $h3 = $('<h3 class="srch-rslt-header">').text(parsedConnection.f_name + " " +parsedConnection.l_name);
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
				var $connectInfo = $('<input class="input-text" type="text" name="additional_info" required placeholder="How did we meet?"><br>')
				var $hiddenInput = $('<input type="hidden" name="receiver_id" value='+ parsedConnection.id +'>')
				var $connectSubmit = $('<input class="input-submit"type="submit" value="Request To Connect">')

				var $select = $('<select id="srch-rslt-select"><option class="srch-rslt-select-option"name="connection_type" value="professional">Professional</option><option class="srch-rslt-select-option"name="connection_type" value="personal">Personal</option></select>')
				var $option1 = $('<option class="srch-rslt-select-option"name="connection_type" value="professional">Professional</option>')
				var $option2 = $('<option class="srch-rslt-select-option"name="connection_type" value="personal">Personal</option>')

				var $br = $('<br>');

				$connectForm.append($select);
				$connectForm.append($connectInfo);
				$connectForm.append($hiddenInput);
				$connectForm.append($connectSubmit);
				$connectForm.append($br);
				$connectForm.append($br);
				$connectForm.append($br);

				$addSearchResultTemplate.append($connectForm);
				$container.append($addSearchResultTemplate);
			});
		});
	}

	// render add form on dashboard load
	addConnection();

	// render add form on button click
	$("#add-connection-bttn").on('click', function(){
		addConnection();
	});

});


					