class SessionsController < ApplicationController

	get '/new' do
		erb :login
	end

end