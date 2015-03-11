class SessionsController < ApplicationController

	post '/' do
		user = User.find_by({username: params[:username]})
    binding.pry
    if user && user.password == params[:password]
      session[:current_user] = user.id
      binding.pry
      redirect "/user/#{user.id}"
    else
    	binding.pry
      redirect '/'
    end
	end

end