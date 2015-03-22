class ConnectionsController < ApplicationController
  
  def connection_params(params)
    params.slice(*Connection.column_names)
  end

  # create a connection after initiator adds; is_connected = false and pending = true
  post '/' do
    receiver_id = params[:receiver_id]
    initiator_id = session[:current_user]
    connection_type = params[:connection_type]
    additional_info = params[:additional_info]

    Connection.create({
      receiver_id: receiver_id,
      initiator_id: initiator_id,
      connection_type: connection_type,
      is_connected: false,
      pending: true,
      additional_info: additional_info
      })

    redirect "/users/#{initiator_id}"
  end

  # update a connection if a receiver accepts or rejects connection, or if either receiver or initiator "deletes" connection (is_connected = false)
  put '/:id' do
    content_type :text
    connection = Connection.find(params[:id])
    connection.update(connection_params(params))

    connection.to_json
  end

end