class SessionsController < ApplicationController

  # create new session (log in)
	post '/' do
		user = User.find_by({username: params[:username]})
    if user && user.password == params[:password]
      session[:current_user] = user.id
      redirect "/users/#{user.id}"
    else
      redirect '/'
    end
	end

  # destroy session (log out)
	delete '/' do
    session[:current_user] = nil
    redirect '/'
  end

end