class SessionsController < ApplicationController

	post '/' do
		user = User.find_by({username: params[:username]})
    if user && user.password == params[:password]
      session[:current_user] = user.id
      redirect "/users/#{user.id}"
    else
      redirect '/'
    end
	end

	delete '/' do
    session[:current_user] = nil
    redirect '/'
  end

end