console.log('linked');

var $container = $('#dash-content')

function loadDom(template){
	$container.empty();
	$container.append(template.html());
}

// window onload function
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
						var $template = $('<div id="view-connection-template">')
						$container.append($template);
							// append header "connect with >username?"
						
						var $h3 = $('<h3">').text(userParsed.f_name + " " +userParsed.l_name);
						var $p1 = $('<p>').text(userParsed.position + " | " + userParsed.company);
						var $p2 = $('<p>').text(userParsed.username);

						$template.append($h3);
						$template.append($p1);
						$template.append($p2);
					});
				};
			});
		};
	});	

	// VIEW NOTIFICATIONS
		// render notifications
		$("#notifications-bttn").on('click', function(){
			var notificationsTemplate = $("#notifications-view-template");
			loadDom(notificationsTemplate);
		});	

	// REJECT
		$('body').on('click', '#reject', function(){
			console.log('clicked reject');
		});

		//NOTES FO FINISHING THIS
		 // use ajax patch to change the is_connected column
		// to false and pending to false.  
		// ON success $(.card).remove or something similar

	// ACCEPT
		$('body').on('click', '#accept', function(){
			console.log('clicked accept');
		});

	// INVITE CONNECTION
		$('body').on('click', "#invite-to-button-div", function(){
			var inviteTemplate = $("#invite-template");
			loadDom(inviteTemplate);
		});	

	// ADD CONNECTIONS general function
	function addConnection(){
		
		// render add contact form
		var addTemplate = $("#add-connection-template");
		loadDom(addTemplate);

		// create email invite
		$("#invite-form").on("submit", function(e){
			e.preventDefault();
			var name = $("#invite-name").val()
			var email = $("#invite-email").val()
			$.ajax({
				url: "/leads",
				type: "POST",
				data: {name: name, email: email}
			}).done(function(data){
				alert(data);
				$("#invite-name").val("");
				$("#invite-email").val("");
			})
		});

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

				$connectForm.append($connectionTypePro);
				$connectForm.append($connectTypePer);
				$connectForm.append($connectInfo);
				$connectForm.append($hiddenInput);
				$connectForm.append($connectSubmit);

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


					