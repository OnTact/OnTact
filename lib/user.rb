class User < ActiveRecord::Base
	has_secure_password
  has_many(:connections)
  include BCrypt

  def password
    @password ||= Password.new(self.password_digest)
  end

  def create
    binding.pry
    @user = User.new(params[:user])
    @user.password = params[:password]
    @user.save!
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_digest = @password
  end
end