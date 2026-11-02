# Library Management System — database design

My case study records member, book, loan.

## Users

- Library staff managing memberships and the catalogue
- Library staff recording loans and returns

## Main operations

- Register a member and catalogue a book
- Record a book loan and return
- Review loan activity by member, book, or date

## Entities

| Entity | Information stored |
| --- | --- |
| member | Stores a library member's identifying details. |
| book | Stores a catalogue entry for a library book. |
| loan | Records a member borrowing a book, including its due and return dates. |

## member

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| member_id | BIGINT | PK | Yes |
| name | TEXT |  | Yes |
| email | TEXT | Unique | Yes |
| joined_date | DATE |  | Yes |
- Unique key: (email).

## book

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| book_id | BIGINT | PK | Yes |
| isbn | TEXT | Unique | Yes |
| title | TEXT |  | Yes |
| author | TEXT |  | Yes |
| publication_year | INTEGER |  | No |
- Unique key: (isbn).

## loan

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| loan_id | BIGINT | PK | Yes |
| member_id | BIGINT | FK | Yes |
| book_id | BIGINT | FK | Yes |
| checkout_date | DATE |  | Yes |
| due_date | DATE |  | Yes |
| returned_date | DATE |  | No |
- member_id → member.member_id
- book_id → book.book_id

## Relationships and business rules

- Each member email address identifies at most one member.
- Each catalogue ISBN identifies at most one book.
- Every loan member_id must reference member.member_id.
- Every loan book_id must reference book.book_id.
- A loan's due date must be on or after its checkout date.
- A member cannot have two active loans for the same book; enforce uniqueness on member_id and book_id only for rows where returned_date is null.

## Assumptions

- Each entity has one globally unique identifier as its single-column primary key.
- A loan refers to exactly one member and one book.
- A book may have multiple historical loans, but only one active loan per member-book pair.
- A loan is active when returned_date is null.
- A loan's due date cannot be earlier than its checkout date.
- The model records dates, not times, and omits reservations, fines, and staff accounts.

