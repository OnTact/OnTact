class UsersController < ApplicationController

  post '/' do
    user = User.create
    binding.pry
    redirect '/'
  end

end