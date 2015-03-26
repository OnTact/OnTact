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
    user.f_name = params[:f_name]
    user.l_name = params[:l_name]
    user.image = "./images/avatars/BaoBao.png"
    user.save!

    redirect '/'
  end

  # get user's dashboard
  get '/:id' do
    id = session[:current_user]
    @user = User.find(id)

    connections = Connection.where("receiver_id = #{id} OR initiator_id = #{id} and is_connected = true")

    @connected_users = @user.connected_users(connections, id)

    #gets a user's pending requests
    @requests = Connection.where("pending = true and receiver_id = #{id}")

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