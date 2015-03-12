class UsersController < ApplicationController

  post '/' do
    user = User.new(params[:user])
    user.username = params[:username]
    user.password = params[:password]
    user.save!
    redirect '/'
  end

end