CREATE DATABASE "paypulp_v2";

CREATE TABLE "users" (
	"user_id" serial NOT NULL UNIQUE,
	"user_uuid" varchar(40) NOT NULL UNIQUE,
	"email" varchar(80) NOT NULL UNIQUE,
	"password" varchar(32) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"account_type" varchar(15) NOT NULL DEFAULT 'personal',
	"funds" numeric NOT NULL DEFAULT '0',
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
);



CREATE TABLE "personal_info" (
	"personal_info_id" serial NOT NULL UNIQUE,
	"user_uuid" varchar(40) NOT NULL UNIQUE,
	"last_name" varchar(50) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"birth_date" DATE NOT NULL,
	"address" varchar(100) NOT NULL,
	"city" varchar(50) NOT NULL,
	"country" varchar(50) NOT NULL,
	"time_zone" varchar(10) NOT NULL,
	"creation_time" DATE NOT NULL,
	CONSTRAINT "personal_info_pk" PRIMARY KEY ("personal_info_id")
);



CREATE TABLE "seller_info" (
	"seller_info_id" serial NOT NULL UNIQUE,
	"user_uuid" varchar(40) NOT NULL UNIQUE,
	"seller_name" varchar(50) NOT NULL UNIQUE,
	"category" varchar(30) NOT NULL,
	"store_address" varchar(50),
	"store_address_add_info" varchar(50) NOT NULL,
	CONSTRAINT "seller_info_pk" PRIMARY KEY ("seller_info_id")
);



CREATE TABLE "payment_methods" (
	"pay_method_id" serial NOT NULL UNIQUE,
	"user_uuid" varchar(40) NOT NULL,
	"payment_method_uuid" varchar(40) NOT NULL UNIQUE,
	"card_number" varchar(25) NOT NULL,
	"card_owner_name" varchar(50) NOT NULL,
	"card_expiry_date" DATE NOT NULL,
	"card_cvv" varchar(4) NOT NULL,
	CONSTRAINT "payment_methods_pk" PRIMARY KEY ("pay_method_id")
);



CREATE TABLE "transactions" (
	"transaction_id" serial NOT NULL UNIQUE,
	"seller_uuid" varchar(40) NOT NULL,
	"buyer_uuid" varchar(40) NOT NULL,
	"payment_method_uuid" varchar(40) NOT NULL,
	"total_amount" numeric NOT NULL,
	"date_time" TIMESTAMP NOT NULL,
	"went_trough" BOOLEAN NOT NULL,
	CONSTRAINT "transactions_pk" PRIMARY KEY ("transaction_id")
);




ALTER TABLE "personal_info" ADD CONSTRAINT "personal_info_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "seller_info" ADD CONSTRAINT "seller_info_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("seller_uuid") REFERENCES "users"("user_uuid");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk1" FOREIGN KEY ("buyer_uuid") REFERENCES "users"("user_uuid");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk2" FOREIGN KEY ("payment_method_uuid") REFERENCES "payment_methods"("payment_method_uuid");
