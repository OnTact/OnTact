CREATE TABLE users (id serial primary key, f_name varchar(255), l_name varchar(255), username varchar(255), password_digest text, updated_at timestamp, created_at timestamp, personal_email text, professional_email text, phone varchar(50), account_email text, company varchar(255), position varchar(255), website text, image integer, card_layout integer, connection_count integer, points integer
);

CREATE TABLE connections (id serial primary key, initiator_id integer, receiver_id integer, created_at timestamp, updated_at timestamp, pending boolean, type varchar(255), is_connected boolean, additional_info text
);

CREATE TABLE leads (id serial primary key, email text, first_name text, created_at timestamp, updated_at timestamp
);