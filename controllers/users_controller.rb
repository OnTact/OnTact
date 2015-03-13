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
  	erb :dashboard
  end

  # update user's profile information
  put '/:id' do 

  end

end