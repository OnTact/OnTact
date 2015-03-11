class User < ActiveRecord::Base
  has_many(:connections)
end