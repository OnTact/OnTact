require "active_record"
require_relative "connection.rb"
require_relative "../lib/user.rb"
require_relative "../lib/connection.rb"

users = [
["John", "Doe", "JohnDoe", "password", "JohnDoe@example.com"],
["Jane", "Doe", "JaneDoe", "password", "JaneDoe@example.com"],
["The", "Queen", "DaQueen", "password", "DaQueen@example.com"],
["Joseph", "Briefcase", "JoeB", "password", "JoeB@example.com"],
["Alex", "Alexson", "AAlexson", "password", "AAlexson@example.com"],
["Lichard", "DeGrayest", "LDeGrayest", "password", "LDeGrayest@example.com"],
["Omily", "Bod", "OBod", "password", "OBod@example.com"],
["Christopher", "Christopherson", "CChristopherson", "password", "CChristopherson@example.com"],
["Jacob", "Jacobson", "JJacobson", "password", "JJacobson@example.com"],
["Frank", "Francis", "FFrancis", "password", "FFrancis@example.com"],
]
users.each do |f_name, l_name, username, password, account_email|
  User.create({f_name: f_name, l_name: l_name, username: username, password: password, account_email: account_email})
end

users = User.all

25.times do
  Connection.create({initiator_id: users.sample.id, receiver_id: users.sample.id, pending: false, is_connected: true, connection_type: "personal"})
end

25.times do
  Connection.create({initiator_id: users.sample.id, receiver_id: users.sample.id, pending: true, is_connected: false, connection_type: "professional"})
end