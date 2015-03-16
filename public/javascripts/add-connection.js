// ADD Connnection

function setAddHandler () {
	$("#connect-bttn").on('click', '#send-connection', submitConnection)
}

function submitConnection () {
  var $form = $('#connect-form');
  var formElements = $form[0].elements;

  var formData = {
    connection: {
      recipient_id: formElements.recipient_id.value,
    }
  };
  createConnection( formData );
}

function createConnection (message) {
  $.ajax({
    url: '/users/' + users.id + '/connections',
    method: 'post',
    data: connection
    // success:
  });
}