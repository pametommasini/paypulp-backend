CREATE DATABASE paypulp;



CREATE TABLE users (
	"user_id" serial PRIMARY KEY NOT NULL UNIQUE,
	"user_uuid" varchar(40) NOT NULL UNIQUE,
	"email" varchar(80) NOT NULL UNIQUE,
	"account_type" varchar(15) NOT NULL,
	"password" varchar(32) NOT NULL  
);



CREATE TABLE admin_accounts (
	"admin_id" serial PRIMARY KEY NOT NULL,
	"user_uuid" varchar(40) NOT NULL
);



CREATE TABLE paypulp_costumers (
	"costumer_id" serial PRIMARY KEY NOT NULL UNIQUE,
	"user_uuid" varchar(40) NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"birth_date" date NOT NULL,
	"address" varchar(100) NOT NULL,
	"city" varchar(50) NOT NULL,
	"country" varchar(50) NOT NULL,
	"time_zone" varchar(20) NOT NULL,
	"security_question" varchar(50) NOT NULL,
	"security_question_answer" varchar(255) NOT NULL,
	"mailing_invoices" boolean NOT NULL DEFAULT 'true',
	"mailing_sales" boolean NOT NULL DEFAULT 'true',
	"mailing_updates" boolean NOT NULL DEFAULT 'true',
	"creation_time" date NOT NULL
);



CREATE TABLE personal_accounts (
	"personal_id" serial PRIMARY KEY NOT NULL,
	"costumer_id" int NOT NULL
);



CREATE TABLE business_accounts (
	"business_id" serial PRIMARY KEY NOT NULL UNIQUE,
	"costumer_id" int NOT NULL UNIQUE,
	"business_name" varchar(50) NOT NULL UNIQUE,
	"business_type" varchar(40) NOT NULL,
	"business_description" text,
	"web_page" varchar(255),
	"cif" varchar(40) NOT NULL,
	"industry" varchar(40) NOT NULL,
	"country" varchar(100) NOT NULL,
	"bank_account_number" varchar(20) NOT NULL
);



CREATE TABLE countries (
	"country_id" serial PRIMARY KEY NOT NULL UNIQUE,
	"costumer_id" int NOT NULL UNIQUE,
	"tax_percentage" smallint NOT NULL,
	"phone_prefix" varchar(5) NOT NULL,
	"currency" varchar(3) NOT NULL
);



CREATE TABLE products (
	"product_id" serial PRIMARY KEY NOT NULL UNIQUE,
	"product_uuid" varchar(40) NOT NULL UNIQUE,
	"business_id" int NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"product_type" varchar(255) NOT NULL,
	"product_description" varchar(255) NOT NULL,
	"image" varchar(255) NOT NULL,
	"price" numeric NOT NULL
);



CREATE TABLE payment_methods (
	"pay_method_id" serial PRIMARY KEY NOT NULL,
	"pay_method_uuid" varchar(40) NOT NULL UNIQUE,
	"personal_id" int NOT NULL,
	"is_preferred" boolean NOT NULL,
	"card_number" varchar(25) NOT NULL,
	"card_name" varchar(100) NOT NULL,
	"card_type" varchar(20) NOT NULL,
	"card_expiry_date" date NOT NULL,
	"card_security_code" varchar(3) NOT NULL
);



CREATE TABLE transactions (
	"transaction_id" serial PRIMARY KEY NOT NULL UNIQUE,
	"business_id" int NOT NULL,
	"personal_id" int NOT NULL,
	"pay_method_uuid" varchar(32) NOT NULL,
	"product_uuid" varchar(32) NOT NULL,
	"total_amount" numeric NOT NULL,
	"date_time" timestamp with time zone NOT NULL,
	"went_trough" boolean NOT NULL
);




ALTER TABLE "admin_accounts" ADD CONSTRAINT "admin_accounts_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "paypulp_costumers" ADD CONSTRAINT "paypulp_costumers_fk0" FOREIGN KEY ("user_uuid") REFERENCES "users"("user_uuid");

ALTER TABLE "business_accounts" ADD CONSTRAINT "business_accounts_fk0" FOREIGN KEY ("costumer_id") REFERENCES "paypulp_costumers"("costumer_id");

ALTER TABLE "personal_accounts" ADD CONSTRAINT "personal_accounts_fk0" FOREIGN KEY ("costumer_id") REFERENCES "paypulp_costumers"("costumer_id");

ALTER TABLE "countries" ADD CONSTRAINT "countries_fk0" FOREIGN KEY ("costumer_id") REFERENCES "paypulp_costumers"("costumer_id");

ALTER TABLE "products" ADD CONSTRAINT "products_fk0" FOREIGN KEY ("business_id") REFERENCES "business_accounts"("business_id");

ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_fk0" FOREIGN KEY ("personal_id") REFERENCES "personal_accounts"("personal_id");

ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk0" FOREIGN KEY ("business_id") REFERENCES "business_accounts"("business_id");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk1" FOREIGN KEY ("personal_id") REFERENCES "personal_accounts"("personal_id");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk2" FOREIGN KEY ("pay_method_uuid") REFERENCES "payment_methods"("pay_method_uuid");
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_fk3" FOREIGN KEY ("product_uuid") REFERENCES "products"("product_uuid");
