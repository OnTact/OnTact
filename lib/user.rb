require_relative 'connection.rb'

class User < ActiveRecord::Base
	has_secure_password
  has_many(:connections)

  # has_many :initiated_connections, class_name: Connection, foreign_key: initiator_id
  # has_many :received_connections, class_name: Connection, foreign_key: receiver_id



  include BCrypt

  def password
    @password ||= Password.new(self.password_digest)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_digest = @password
  end

  def connected_users(connections, user_id)
    users = []
    connections.each do |connection|
      if connection.receiver_id == user_id
        users << User.find(connection.initiator_id)
      elsif connection.initiator_id == user_id
        users << User.find(connection.receiver_id)
      end
    end
    return users
  end

  def user_params(params)
    params.slice(*User.column_names)
  end

end