class ConnectionsController < ApplicationController
  
  # get all connections from server and send as json string
  ## needs to be changed to reflect where receiver id or initiator id == current user id
  get "/" do
  	binding.pry
    Connection.all.to_json
  end

  # get individual connection information and send as json string
  get "/:id" do
    connection = Connection.find(params[:id]).to_json
  end

  # create a connection after initiator adds; is_connected = false and pending = true
  post '/' do

  end

  # update a connection if a receiver accepts or rejects connection, or if either receiver or initiator "deletes" connection (is_connected = false)
  put '/:id' do

  end

end