class UsersController < ApplicationController

  # only take params that exist within User model
  def user_params(params)
    params.slice(*User.column_names)
  end

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
    @connected_users = @user.connected_users(connections, id)
    erb :dashboard
  end

  # update user's profile information
  put '/:id' do 
    user = User.find(params[:id])
    user.update(user_params(params))
    id = user.id

    redirect "/users/#{id}"
  end

end