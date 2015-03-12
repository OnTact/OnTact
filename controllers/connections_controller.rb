class ConnectionsController < ApplicationController
  get "/" do
    Connection.all.to_json
  end

  get "/:id" do
    connection = Connection.find(params[:id]).to_json
  end
end