# Library Management System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| member_id | loan records (list) |
| --- | --- |
| 1 | [3,4] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| loan.loan_id | loan.member_id | loan.book_id | member.member_id | member.name | book.book_id | book.isbn |
| --- | --- | --- | --- | --- | --- | --- |
| 3 | 1 | 2 | 1 | Avery Chen | 2 | 9780000000001 |
| 4 | 1 | 2 | 1 | Avery Chen | 2 | 9780000000001 |

Key: loan_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## loan_example

| loan.loan_id | loan.member_id | loan.book_id | member.member_id | member.name | book.book_id | book.isbn |
| --- | --- | --- | --- | --- | --- | --- |
| 3 | 1 | 2 | 1 | Avery Chen | 2 | 9780000000001 |
| 4 | 1 | 2 | 1 | Avery Chen | 2 | 9780000000001 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## member

| member_id | name | email | joined_date |
| --- | --- | --- | --- |
| 1 | Avery Chen | avery.chen@example.test | 2025-01-15 |

## book

| book_id | isbn | title | author | publication_year |
| --- | --- | --- | --- | --- |
| 2 | 9780000000001 | The Quiet Index | Morgan Lee | 2020 |

## loan

| loan_id | member_id | book_id | checkout_date | due_date | returned_date |
| --- | --- | --- | --- | --- | --- |
| 3 | 1 | 2 | 2025-03-01 | 2025-03-15 | NULL |
| 4 | 1 | 2 | 2024-12-01 | 2024-12-15 | 2024-12-12 |

## Dependencies

- member: (member_id) → name, email, joined_date
- book: (book_id) → isbn, title, author, publication_year
- loan: (loan_id) → member_id, book_id, checkout_date, due_date, returned_date

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
