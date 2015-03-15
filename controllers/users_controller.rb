class UsersController < ApplicationController

	# create new user
  post '/' do
    user = User.new(params[:user])
    user.username = params[:username]
    user.password = params[:password]
    user.save!
    redirect '/'
  end

  # get user's dashboard
  get '/:id' do
  	id = session[:current_user]
  	@user = User.find(id)
  	connections = Connection.where("receiver_id = #{id} or initiator_id = #{id}")
  	binding.pry
  	@connected_users = @user.connected_users(connections, id)
  	binding.pry
  	erb :dashboard
  end

  # update user's profile information
  put '/:id' do 

  end

end