# Library Management System — SQL queries

## 1. Show related loan, member, book records (up to 20).

```sql
SELECT t0."loan_id" AS "loan_loan_id",
       t0."checkout_date" AS "loan_checkout_date",
       t1."member_id" AS "member_member_id",
       t1."name" AS "member_name",
       t2."book_id" AS "book_book_id",
       t2."isbn" AS "book_isbn"
FROM portfolio."loan" t0
JOIN portfolio."member" t1 ON t0."member_id" = t1."member_id"
JOIN portfolio."book" t2 ON t0."book_id" = t2."book_id"
ORDER BY t0."loan_id", t1."member_id", t2."book_id"
LIMIT 20;
```

| loan_loan_id | loan_checkout_date | member_member_id | member_name | book_book_id | book_isbn |
| --- | --- | --- | --- | --- | --- |
| 3 | 2025-03-01 | 1 | Avery Chen | 2 | 9780000000001 |
| 4 | 2024-12-01 | 1 | Avery Chen | 2 | 9780000000001 |

## 2. Find loan records where checkout_date matches "2025-03-01" (up to 20).

```sql
SELECT * FROM portfolio."loan"
WHERE "checkout_date" IS NOT DISTINCT FROM '2025-03-01'
ORDER BY "loan_id"
LIMIT 20;
```

| loan_id | member_id | book_id | checkout_date | due_date | returned_date |
| --- | --- | --- | --- | --- | --- |
| 3 | 1 | 2 | 2025-03-01 | 2025-03-15 | NULL |

## 3. Count loan records for each member_id (up to 20 groups).

```sql
SELECT "member_id", count(*) AS record_count
FROM portfolio."loan"
GROUP BY "member_id"
ORDER BY record_count DESC, "member_id" NULLS LAST
LIMIT 20;
```

| member_id | record_count |
| --- | --- |
| 1 | 2 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 1.028 | 1.008, 1.028, 1.103 | Sort → Seq Scan | 112 |
| After index | 0.231 | 0.235, 0.23, 0.231 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 25 |

The median execution time changed from 1.028 ms to 0.231 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=0.98..0.982 rows=20 loops=1)
  Seq Scan on loan (actual time=0.018..0.932 rows=20 loops=1)
Planning Time: 0.485 ms
Execution Time: 1.008 ms
```

### Before index, run 2

```text
Sort (actual time=0.997..0.998 rows=20 loops=1)
  Seq Scan on loan (actual time=0.019..0.946 rows=20 loops=1)
Planning Time: 0.44 ms
Execution Time: 1.028 ms
```

### Before index, run 3

```text
Sort (actual time=1.074..1.076 rows=20 loops=1)
  Seq Scan on loan (actual time=0.018..1.026 rows=20 loops=1)
Planning Time: 0.464 ms
Execution Time: 1.103 ms
```

### After index, run 1

```text
Sort (actual time=0.175..0.177 rows=20 loops=1)
  Bitmap Heap Scan on loan (actual time=0.037..0.124 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.021..0.021 rows=20 loops=1)
Planning Time: 0.815 ms
Execution Time: 0.235 ms
```

### After index, run 2

```text
Sort (actual time=0.17..0.172 rows=20 loops=1)
  Bitmap Heap Scan on loan (actual time=0.036..0.119 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.021..0.021 rows=20 loops=1)
Planning Time: 0.775 ms
Execution Time: 0.23 ms
```

### After index, run 3

```text
Sort (actual time=0.171..0.173 rows=20 loops=1)
  Bitmap Heap Scan on loan (actual time=0.036..0.121 rows=20 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.021..0.021 rows=20 loops=1)
Planning Time: 0.782 ms
Execution Time: 0.231 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Elebor_Merit_301907071_P2_Queries.sql, then Elebor_Merit_301907071_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Elebor_Merit_301907071_P2_QueryResults.png) · [Index comparison](screenshots/Elebor_Merit_301907071_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

