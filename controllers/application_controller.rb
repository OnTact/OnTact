class ApplicationController < Sinatra::Base

  ActiveRecord::Base.establish_connection ({
  :adapter => "postgresql",
  :database => "ontact"
  })

	set :views, File.expand_path('../../views', __FILE__)
	set :public_folder, File.expand_path("../../public", __FILE__)

  enable :sessions, :method_override

	get "/" do
		erb :index
	end

  get '/login' do
    erb :login
  end

  get '/new' do
    erb :new
  end

end