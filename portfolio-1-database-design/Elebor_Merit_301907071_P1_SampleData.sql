-- Fictional sample records for Library Management System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."member" ("member_id", "name", "email", "joined_date") VALUES (1, 'Avery Chen', 'avery.chen@example.test', '2025-01-15');
INSERT INTO portfolio."book" ("book_id", "isbn", "title", "author", "publication_year") VALUES (2, '9780000000001', 'The Quiet Index', 'Morgan Lee', 2020);
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "checkout_date", "due_date", "returned_date") VALUES (3, 1, 2, '2025-03-01', '2025-03-15', NULL);
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "checkout_date", "due_date", "returned_date") VALUES (4, 1, 2, '2024-12-01', '2024-12-15', '2024-12-12');
COMMIT;
