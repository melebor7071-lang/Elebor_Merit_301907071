-- Library Management System: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."member" (
  "member_id" bigint NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "joined_date" date NOT NULL,
  CONSTRAINT "pk_member" PRIMARY KEY ("member_id"),
  CONSTRAINT "uq_member_0" UNIQUE ("email")
);
CREATE TABLE portfolio."book" (
  "book_id" bigint NOT NULL,
  "isbn" text NOT NULL,
  "title" text NOT NULL,
  "author" text NOT NULL,
  "publication_year" bigint,
  CONSTRAINT "pk_book" PRIMARY KEY ("book_id"),
  CONSTRAINT "uq_book_0" UNIQUE ("isbn")
);
CREATE TABLE portfolio."loan" (
  "loan_id" bigint NOT NULL,
  "member_id" bigint NOT NULL,
  "book_id" bigint NOT NULL,
  "checkout_date" date NOT NULL,
  "due_date" date NOT NULL,
  "returned_date" date,
  CONSTRAINT "pk_loan" PRIMARY KEY ("loan_id")
);
ALTER TABLE portfolio."loan" ADD CONSTRAINT "fk_loan_0" FOREIGN KEY ("member_id") REFERENCES portfolio."member" ("member_id");
ALTER TABLE portfolio."loan" ADD CONSTRAINT "fk_loan_1" FOREIGN KEY ("book_id") REFERENCES portfolio."book" ("book_id");
ALTER TABLE portfolio."loan" ADD CONSTRAINT "loan_dates_valid" CHECK ("due_date" > "checkout_date");
CREATE UNIQUE INDEX "active_loan_per_pair" ON portfolio."loan" ("member_id", "book_id") WHERE ("returned_date" IS NULL);
COMMIT;
