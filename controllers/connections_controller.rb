class ConnectionsController < ApplicationController
  
  # get all connections from server and send as json string
  ## needs to be changed to reflect where receiver id or initiator id == current user id
  get "/" do
    Connection.all.to_json
  end

  # get individual connection information and send as json string
  get "/:id" do
    connection = Connection.find(params[:id]).to_json
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

  end

end