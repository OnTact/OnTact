class ApplicationController < Sinatra::Base

  ActiveRecord::Base.establish_connection ({
  :adapter => "postgresql",
  :database => "ontact"
  })

	set :views, File.expand_path('../../views', __FILE__)
	set :public_folder, File.expand_path("../../public", __FILE__)

  enable :sessions, :method_override

  # get index
	get "/" do
		erb :index
	end

  # get login form
  get '/login' do
    erb :login
  end

  # get new user form
  get '/new' do
    erb :new
  end

  # creates new lead in the database after anon user inputs email address
  post '/leads' do

  end

  post '/finduser' do
    Pry.start(binding)
    User.find_by(username: params[:username]).to_json

  end

end