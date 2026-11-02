-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. member pk. Expected: pk_member, SQLSTATE 23505.
INSERT INTO portfolio."member" ("member_id", "name", "email", "joined_date")
VALUES (1, 'Riley Park', 'riley.park@example.test', '2025-02-01');

-- 2. member email unique. Expected: uq_member_0, SQLSTATE 23505.
INSERT INTO portfolio."member" ("member_id", "name", "email", "joined_date")
VALUES (101, 'Jordan Vale', 'avery.chen@example.test', '2025-02-02');

-- 3. member name not null. Expected: name, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "name", "email", "joined_date")
VALUES (102, NULL, 'sam.river@example.test', '2025-02-03');

-- 4. book pk. Expected: pk_book, SQLSTATE 23505.
INSERT INTO portfolio."book" ("book_id", "isbn", "title", "author", "publication_year")
VALUES (2, '9780000000099', 'A Different Volume', 'Taylor Quinn', 2022);

-- 5. book isbn unique. Expected: uq_book_0, SQLSTATE 23505.
INSERT INTO portfolio."book" ("book_id", "isbn", "title", "author", "publication_year")
VALUES (103, '9780000000001', 'Another Title', 'Jamie North', NULL);

-- 6. loan pk. Expected: pk_loan, SQLSTATE 23505.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "checkout_date", "due_date", "returned_date")
VALUES (3, 1, 2, '2025-04-01', '2025-04-15', '2025-04-10');

-- 7. loan member fk. Expected: fk_loan_0, SQLSTATE 23503.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "checkout_date", "due_date", "returned_date")
VALUES (104, 9001, 2, '2025-05-01', '2025-05-15', '2025-05-10');

-- 8. loan book fk. Expected: fk_loan_1, SQLSTATE 23503.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "checkout_date", "due_date", "returned_date")
VALUES (105, 1, 9002, '2025-05-02', '2025-05-16', '2025-05-11');

-- 9. loan dates check. Expected: loan_dates_valid, SQLSTATE 23514.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "checkout_date", "due_date", "returned_date")
VALUES (106, 1, 2, '2025-06-15', '2025-06-14', '2025-06-20');

-- 10. active pair unique. Expected: active_loan_per_pair, SQLSTATE 23505.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "checkout_date", "due_date", "returned_date")
VALUES (107, 1, 2, '2025-07-01', '2025-07-15', NULL);
