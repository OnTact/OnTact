require_relative 'user.rb' 

class Connection < ActiveRecord::Base
  belongs_to(:user)

  # belongs_to :initiator, class_name: User, foreign_key: initiator_id
  # belongs_to :receiver, class_name: User, foreign_key: receiver_id

end