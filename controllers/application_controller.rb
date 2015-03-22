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

  # sends invite to potential OnTact member
  post '/leads' do
    content_type :text
    id = session[:current_user]
    email = params[:email]
    name = params[:name]
    client = SendGrid::Client.new(api_user: 'gretchenziegler', api_key: '8DinosaurCupcakes')
    client.send(SendGrid::Mail.new(to: email, from: 'gretchenziegler@gmail.com', subject: 'Join the OnTact Community!', text: "OnTact: Contacts for the Digital World. Manage your contacts in one fun, efficient location. Your contacts update your address book so you don't have to. Join OnTact today!", html: "<h1>OnTact: Contact Management for the Digital World.</h1><p>Manage your contacts in one fun, efficient location. Your contacts update your address book so you don't have to.</p><h2><a href='http://45.55.147.119/'>Join OnTact today!</a></h2>"))

    "Thanks! You have successfully invited #{name} to join OnTact!"
  end

  post '/finduser' do
    User.find_by(username: params[:username]).to_json
  end

end

