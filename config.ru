require "bundler"
Bundler.require

require './controllers/application_controller'
require './controllers/sessions_controller'
require './controllers/users_controller'
require './lib/connection'
require './lib/user'

map('/'){run ApplicationController }
map('/sessions'){run SessionsController }
map('/users'){run UsersController }