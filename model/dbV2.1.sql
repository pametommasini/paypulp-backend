CREATE DATABASE paypulp_v2;

CREATE TABLE users (
	user_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL UNIQUE,
	email varchar(80) NOT NULL UNIQUE,
	password varchar(32) NOT NULL,
	first_name varchar(50) NOT NULL,
	account_type varchar(15) NOT NULL DEFAULT 'personal',
	funds numeric NOT NULL DEFAULT '0',
	CONSTRAINT users_pk PRIMARY KEY (user_id)
);

CREATE TABLE login_statistics (
	login_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL,
	login_date timestamp NOT NULL DEFAULT current_timestamp,
	time_spent interval
);



CREATE TABLE personal_info (
	personal_info_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL UNIQUE,
	last_name varchar(50) NOT NULL,
	phone varchar(20) NOT NULL,
	birth_date DATE NOT NULL,
	address varchar(100) NOT NULL,
	gvmt_id varchar(50) NOT NULL,
	city varchar(50) NOT NULL,
	state varchar(50) NOT NULL,
	country varchar(50) NOT NULL,
	time_zone varchar(10) NOT NULL,
	preferred_business varchar(50) DEFAULT 'no data',
	CONSTRAINT personal_info_pk PRIMARY KEY (personal_info_id)
);


CREATE TABLE user_statistics (
	user_statistics_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL UNIQUE,
	transaction_count integer NOT NULL DEFAULT 0,
	failed_transactions integer NOT NULL DEFAULT 0,
	aborted_transactions integer NOT NULL DEFAULT 0,
	churn_risk integer NOT NULL DEFAULT 0,
	days_since_last_login integer NOT NULL DEFAULT 0,
	days_since_last_transaction integer NOT NULL DEFAULT 0,
	time_spent_per_week interval NOT NULL,
	login_count integer NOT NULL,
	tenure interval,
	creation_time DATE NOT NULL,
	inactive BOOLEAN NOT NULL,
	cancelled varchar(255) NOT NULL,
	CONSTRAINT user_statistics_pk PRIMARY KEY (user_statistics_id)
);


CREATE TABLE seller_info (
	seller_info_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL UNIQUE,
	seller_name varchar(50) NOT NULL UNIQUE,
	category varchar(30) NOT NULL,
	store_address varchar(50),
	store_address_add_info varchar(50),
	CONSTRAINT seller_info_pk PRIMARY KEY (seller_info_id)
);

CREATE TABLE qr_links (
	qr_link_id serial NOT NULL,
	seller_uuid varchar(40) NOT NULL,
	checkout_type varchar(15) NOT NULL,
	total_amount numeric,
	link_slug varchar(40) NOT NULL UNIQUE,
	CONSTRAINT qrLinks_pk PRIMARY KEY (qr_link_id)
);

CREATE TABLE payment_methods (
	pay_method_id serial NOT NULL UNIQUE,
	user_uuid varchar(40) NOT NULL,
	payment_method_uuid varchar(40) NOT NULL UNIQUE,
	card_number varchar(25) NOT NULL,
	card_owner_name varchar(50) NOT NULL,
	card_expiry_date DATE NOT NULL,
	card_cvv varchar(4) NOT NULL,
	CONSTRAINT payment_methods_pk PRIMARY KEY (pay_method_id)
);



CREATE TABLE transactions (
	transaction_id serial NOT NULL UNIQUE,
	seller_uuid varchar(40) NOT NULL,
	buyer_uuid varchar(40) NOT NULL,
	payment_method_uuid varchar(40) NOT NULL,
	total_amount numeric NOT NULL,
	date_time TIMESTAMP NOT NULL,
	user_completed BOOLEAN NOT NULL,
	went_trough BOOLEAN NOT NULL,
	transaction_time timestamp NOT NULL DEFAULT current_timestamp,
	geolocation POINT NOT NULL,
	CONSTRAINT transactions_pk PRIMARY KEY (transaction_id)
);

-- INSERT INTO locations (name, location)
-- VALUES ('San Francisco', ST_Point(-122.4194, 37.7749));

-- SELECT name, ST_X(location) AS longitude, ST_Y(location) AS latitude
-- FROM locations;



ALTER TABLE "qr_links" ADD CONSTRAINT "qr_links_fk0" FOREIGN KEY ("seller_uuid") REFERENCES "users"("user_uuid");


ALTER TABLE "login_statistics" ADD CONSTRAINT "login_statistics_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "user_statistics" ADD CONSTRAINT "user_statistics_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "seller_info" ADD CONSTRAINT "seller_info_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("seller_uuid") REFERENCES "users"("user_uuid");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk1" FOREIGN KEY ("buyer_uuid") REFERENCES "users"("user_uuid");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk2" FOREIGN KEY ("payment_method_uuid") REFERENCES "payment_methods"("payment_method_uuid");



