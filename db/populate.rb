require 'pg'
require 'pry'

init_users = <<-SQL
CREATE TABLE users(
	id	SERIAL	PRIMARY KEY,
	f_name VARCHAR(255),
	l_name VARCHAR(255),
	username VARCHAR(255),
	password_digest TEXT,
	account_email TEXT,
	updated_at TIMESTAMP,
	created_at TIMESTAMP,
	personal_email TEXT,
	personal_phone VARCHAR,
	professional_email TEXT,
	professional_phone VARCHAR(50),
	company VARCHAR(255),
	website TEXT,
	image INTEGER,
	card_layout INTEGER,
	connection_count INTEGER,
	points INTEGER
	);
SQL

init_connections = <<-SQL
CREATE TABLE connections(
	id SERIAL PRIMARY KEY,
	initiator_id INTEGER,
	receiver_id INTEGER,
	created_at INTEGER,
	updated_at INTEGER,
	pending BOOLEAN,
	connection_type VARCHAR(255),
	is_connected BOOLEAN,
	additional_info TEXT
	);
SQL

db = PG.connect(dbname: 'ontact')

db.exec('DROP TABLE IF EXISTS users')
db.exec('DROP TABLE IF EXISTS connections')

db.exec(init_users)
db.exec(init_connections)
