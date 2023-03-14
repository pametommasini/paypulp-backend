CREATE DATABASE "paypulpV2";

CREATE TABLE "users" (
	"userId" serial NOT NULL UNIQUE,
	"userUuid" varchar(40) NOT NULL UNIQUE,
	"email" varchar(80) NOT NULL UNIQUE,
	"accountType" varchar(15) NOT NULL,
	"password" varchar(32) NOT NULL,
	"firstName" varchar(50) NOT NULL,
	"funds" numeric NOT NULL,
	CONSTRAINT "usersPk" PRIMARY KEY ("userId")
);



CREATE TABLE "personalInfo" (
	"personalInfoId" serial NOT NULL UNIQUE,
	"userUuid" varchar(40) NOT NULL UNIQUE,
	"lastName" varchar(50) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"birthDate" DATE NOT NULL,
	"address" varchar(100) NOT NULL,
	"city" varchar(50) NOT NULL,
	"country" varchar(50) NOT NULL,
	"timeZone" varchar(10) NOT NULL,
	"creationTime" DATE NOT NULL,
	CONSTRAINT "personalInfoPk" PRIMARY KEY ("personalInfoId")
);



CREATE TABLE "sellerInfo" (
	"sellerInfoId" serial NOT NULL UNIQUE,
	"userUuid" varchar(40) NOT NULL UNIQUE,
	"sellerName" varchar(50) NOT NULL UNIQUE,
	"category" varchar(30) NOT NULL,
	"storeAddress" varchar(50),
	"storeAddressAddInfo" varchar(50) NOT NULL,
	CONSTRAINT "sellerInfoPk" PRIMARY KEY ("sellerInfoId")
);



CREATE TABLE "paymentMethods" (
	"payMethodId" serial NOT NULL UNIQUE,
	"userUuid" varchar(40) NOT NULL,
	"payMethodUuid" varchar(40) NOT NULL UNIQUE,
	"cardNumber" varchar(25) NOT NULL,
	"cardOwnerName" varchar(50) NOT NULL,
	"cardExpiryDate" DATE NOT NULL,
	"cardCvv" varchar(4) NOT NULL,
	CONSTRAINT "paymentMethodsPk" PRIMARY KEY ("payMethodId")
);



CREATE TABLE "transactions" (
	"transactionId" serial NOT NULL UNIQUE,
	"sellerUuid" varchar(40) NOT NULL,
	"buyerUuid" varchar(40) NOT NULL,
	"payMethodUuid" varchar(40) NOT NULL,
	"totalAmount" numeric NOT NULL,
	"dateTime" TIMESTAMP NOT NULL,
	"wentTrough" BOOLEAN NOT NULL,
	CONSTRAINT "transactionsPk" PRIMARY KEY ("transactionId")
);




ALTER TABLE "personalInfo" ADD CONSTRAINT "personalInfoFk0" FOREIGN KEY ("userUuid") REFERENCES "users"("userUuid");

ALTER TABLE "sellerInfo" ADD CONSTRAINT "sellerInfoFk0" FOREIGN KEY ("userUuid") REFERENCES "users"("userUuid");

ALTER TABLE "paymentMethods" ADD CONSTRAINT "paymentMethodsFk0" FOREIGN KEY ("userUuid") REFERENCES "users"("userUuid");

ALTER TABLE "transactions" ADD CONSTRAINT "transactionsFk0" FOREIGN KEY ("sellerUuid") REFERENCES "users"("userUuid");
ALTER TABLE "transactions" ADD CONSTRAINT "transactionsFk1" FOREIGN KEY ("buyerUuid") REFERENCES "users"("userUuid");
ALTER TABLE "transactions" ADD CONSTRAINT "transactionsFk2" FOREIGN KEY ("payMethodUuid") REFERENCES "paymentMethods"("payMethodUuid");
