# Advanced SQL Interview Questions & Answers
## Indexes, Views, Stored Procedures, Transactions & Database Design

## Table of Contents

1. [Indexes and Performance](#indexes-and-performance)
   - [Index Fundamentals](#index-fundamentals)
   - [Index Types and Strategies](#index-types-and-strategies)
   - [Index Optimization and Maintenance](#index-optimization-and-maintenance)
2. [Views and Stored Procedures](#views-and-stored-procedures)
   - [Views in SQL](#views-in-sql)
   - [Stored Procedures](#stored-procedures)
   - [Triggers](#triggers)
3. [Data Integrity and Constraints](#data-integrity-and-constraints)
4. [Transactions and Concurrency](#transactions-and-concurrency)
   - [Transaction Fundamentals](#transaction-fundamentals)
   - [Isolation Levels](#isolation-levels)
   - [Locking and Deadlocks](#locking-and-deadlocks)
5. [Database Design](#database-design)
   - [Design Principles](#design-principles)
   - [Normalization vs Denormalization](#normalization-vs-denormalization)
   - [Advanced Design Patterns](#advanced-design-patterns)

---

## Indexes and Performance

### Index Fundamentals

#### 1. What are indexes and why are they important?

**Answer:**

An **index** is a database object that improves query performance by creating a quick lookup structure for data. Instead of scanning every row (table scan), the database can use the index to find data more efficiently.

**Importance:**
- **Faster data retrieval**: Index seek is much faster than table scan
- **Improved JOIN performance**: Foreign key lookups are optimized
- **Better sorting**: ORDER BY operations use indexes
- **Faster filtering**: WHERE clauses benefit from indexes
- **Reduced disk I/O**: Less data needs to be read

**Performance Impact Example:**

```sql
-- Table: employees (1,000,000 rows)

-- WITHOUT INDEX: Table Scan (slow)
SELECT * FROM employees WHERE emp_id = 12345;
-- Scans all 1,000,000 rows

-- WITH INDEX: Index Seek (fast)
CREATE INDEX idx_emp_id ON employees(emp_id);
SELECT * FROM employees WHERE emp_id = 12345;
-- Directly seeks to the specific row

-- Index usage in query plan
-- Table 'employees'. Scan count 1, logical reads 3
-- (with index) vs logical reads 5000+ (without index)
```

**Types of Indexes:**
- Clustered Index (1 per table)
- Non-clustered Index (multiple per table)
- Composite Index (multiple columns)
- Filtered Index (subset of rows)
- Full-text Index (text searching)
- Spatial Index (geographic data)

---

#### 2. What is the difference between clustered and non-clustered indexes?

**Answer:**

| Aspect | Clustered Index | Non-Clustered Index |
|--------|---|---|
| **Number per table** | Only 1 | Multiple (up to 999) |
| **Storage** | Determines physical order of rows | Separate structure pointing to data |
| **Primary Key** | Usually the primary key | Can be on any column(s) |
| **Leaf Nodes** | Contains actual data pages | Contains index keys + row locator |
| **Performance** | Faster for range queries | Fast for specific lookups |
| **Size** | Larger (includes all columns) | Smaller (only indexed columns) |
| **Insert/Update** | Slower (reorders data) | Faster |

**Visual Structure:**

```
CLUSTERED INDEX (Table structure itself)
┌─────────────────────┐
│ Physical Data Pages │
│ (Sorted by index)   │
│ PK: 1, 5, 10, 15... │
└─────────────────────┘

NON-CLUSTERED INDEX (Separate structure)
┌──────────────────────┐     ┌─────────────────┐
│ Index Structure      │────→│ Data Rows       │
│ (B-tree of keys)     │     │ (Clustered by   │
│ emp_id: 5,8,12,20... │     │  PK or heap)    │
└──────────────────────┘     └─────────────────┘
```

**Example:**

```sql
-- CLUSTERED INDEX (Primary Key by default)
-- Physical arrangement of employees by emp_id
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,  -- Clustered index
    name VARCHAR(100),
    salary DECIMAL(10,2),
    dept_id INT
);

-- Insertion order: 5, 1, 10, 3
-- Stored as: 1, 3, 5, 10 (sorted)
INSERT INTO employees VALUES (5, 'John', 50000, 1);
INSERT INTO employees VALUES (1, 'Jane', 55000, 2);
INSERT INTO employees VALUES (10, 'Bob', 45000, 1);
INSERT INTO employees VALUES (3, 'Alice', 60000, 3);

-- NON-CLUSTERED INDEX
CREATE NONCLUSTERED INDEX idx_salary ON employees(salary);
-- Separate B-tree pointing to actual rows
-- Points to: 45000→Bob, 50000→John, 55000→Jane, 60000→Alice

-- Query using clustered index (table scan range)
SELECT * FROM employees WHERE emp_id BETWEEN 1 AND 5;
-- Uses clustered index, very fast

-- Query using non-clustered index
SELECT * FROM employees WHERE salary > 50000;
-- Uses non-clustered index on salary
```

**Covering Index Example:**

```sql
-- Create non-clustered index that "covers" the query
CREATE NONCLUSTERED INDEX idx_salary_name 
ON employees(salary) 
INCLUDE (name);  -- INCLUDE columns not part of index key

-- Query can be satisfied entirely from index (no table lookup)
SELECT name, salary 
FROM employees 
WHERE salary > 50000;
-- Execution plan shows "Index Seek" + "Index Scan" only
-- No table lookup needed
```

---

#### 3. What is a composite index and when would you use one?

**Answer:**

A **composite index** (also called multi-column or concatenated index) is an index on multiple columns in a specific order.

**When to Use:**
- Columns are frequently used together in WHERE/JOIN/ORDER BY
- Improve performance of multi-column searches
- Reduce number of indexes needed
- Support queries with multiple filtering conditions

**Important Rules:**
1. **Column order matters** - Put most selective columns first
2. **Left-to-right matching** - Indexes are used left-to-right
3. **Leading column** - First column must be in WHERE clause to use index
4. **Covering queries** - Can cover entire query need

**Example:**

```sql
-- Common queries:
-- 1. Find employees by department and job title
-- 2. Find active employees in specific department
-- 3. Filter by department, then job title, then salary

-- Create composite index
CREATE INDEX idx_dept_job_salary 
ON employees(dept_id, job_title, salary);

-- This index works best for:

-- GOOD: Uses index (all columns in WHERE)
SELECT * FROM employees
WHERE dept_id = 2 AND job_title = 'Manager';
-- Index seek on (2, 'Manager')

-- GOOD: Uses partial index (leading columns)
SELECT * FROM employees
WHERE dept_id = 2;
-- Index seek on dept_id = 2

-- NOT OPTIMAL: Skips leading column
SELECT * FROM employees
WHERE job_title = 'Manager' AND salary > 50000;
-- Cannot use the composite index efficiently
-- Should use index on (job_title, salary) instead

-- GOOD: With ORDER BY
SELECT name, salary
FROM employees
WHERE dept_id = 2
ORDER BY job_title, salary;
-- Uses index for filtering AND sorting

-- Index with INCLUDE for covering query
CREATE INDEX idx_dept_job_salary_covering
ON employees(dept_id, job_title)
INCLUDE (name, salary);

-- Query covered entirely by index
SELECT name, salary
FROM employees
WHERE dept_id = 2 AND job_title = 'Manager';
-- No table lookup needed
```

**Column Order Decision:**

```sql
-- Queries:
-- A: WHERE dept = 2 AND status = 'Active' AND salary > 50000
-- B: WHERE status = 'Active' AND salary > 50000

-- Selectivity (how many rows filtered):
-- dept_id: 2% (most selective)
-- status: 10%
-- salary: 30% (least selective)

-- Best order: Most selective to least selective
CREATE INDEX idx_best 
ON employees(dept_id, status, salary);

-- Works for Query A (all columns)
-- Works partially for Query B (without dept)
-- Query B would still benefit from index on (status, salary)
```

---

### Index Types and Strategies

#### 4. How do indexes impact INSERT, UPDATE, and DELETE operations?

**Answer:**

Indexes **improve READ performance** but **slow down WRITE operations** because the database must maintain index structure during modifications.

| Operation | Impact | Cost |
|-----------|--------|------|
| **INSERT** | Must add entry to all indexes | Moderate to High |
| **UPDATE** | Must update affected indexes | Moderate to High |
| **DELETE** | Must remove from all indexes | Moderate to High |
| **SELECT** | Significant improvement | Negative (benefits) |

**Performance Trade-offs:**

```sql
-- Example table with multiple indexes
CREATE TABLE orders (
    order_id INT PRIMARY KEY,           -- Clustered index
    customer_id INT,
    order_date DATE,
    amount DECIMAL(10,2),
    status VARCHAR(20)
);

CREATE INDEX idx_customer ON orders(customer_id);
CREATE INDEX idx_date ON orders(order_date);
CREATE INDEX idx_status ON orders(status);
-- Total: 4 indexes (1 clustered + 3 non-clustered)

-- INSERT impact: Must update all 4 indexes
INSERT INTO orders VALUES (1001, 100, '2025-01-01', 500, 'Pending');
-- Cost: 1 clustered write + 3 non-clustered writes

-- UPDATE impact: Updates affected indexes
UPDATE orders SET status = 'Shipped' WHERE order_id = 1001;
-- Updates: clustered index (on order_id) + idx_status

-- DELETE impact: Removes from all indexes
DELETE FROM orders WHERE order_id = 1001;
-- Removes from: clustered + 3 non-clustered indexes

-- SELECT benefits: Improved performance
SELECT * FROM orders WHERE customer_id = 100;
-- Uses idx_customer (Index Seek is very fast)

-- Test: Compare write performance
-- Without indexes: 10 seconds for 100,000 inserts
-- With 4 indexes: 30 seconds for 100,000 inserts (3x slower)

-- Strategy: Balance
-- - Heavy read tables: Many indexes
-- - Heavy write tables: Fewer indexes
-- - OLTP (transactional): Few selective indexes
-- - OLAP (analytical): Many indexes
```

**Optimization Strategies:**

```sql
-- 1. Drop unused indexes
SELECT * FROM sys.dm_db_index_usage_stats
WHERE database_id = DB_ID()
AND user_seeks = 0 AND user_scans = 0 AND user_lookups = 0;
-- These indexes never used, safe to drop

-- 2. Composite indexes reduce number of indexes needed
-- Instead of:
-- CREATE INDEX idx_customer ON orders(customer_id);
-- CREATE INDEX idx_date ON orders(order_date);
-- Use:
CREATE INDEX idx_customer_date 
ON orders(customer_id, order_date);
-- Handles both queries, fewer index maintenance

-- 3. Filtered indexes for subset of data
-- Only index active orders (90% of queries)
CREATE INDEX idx_active_orders 
ON orders(order_date)
WHERE status = 'Active';
-- Smaller index, faster inserts

-- 4. Disable indexes during bulk load
ALTER INDEX idx_customer DISABLE;
-- Perform bulk insert
INSERT INTO orders SELECT * FROM staging_orders;
-- Rebuild index after
ALTER INDEX idx_customer REBUILD;
```

---

#### 5. What are statistics in SQL and how do they affect query performance?

**Answer:**

**Statistics** are metadata about data distribution in columns that the query optimizer uses to create efficient execution plans.

**Components:**
- **Histogram**: Distribution of values
- **Density**: Uniqueness of values
- **Cardinality**: Number of distinct values

**Impact on Query Performance:**

```sql
-- Statistics influence execution plan decisions

-- Example: Table with 1 million orders
-- Column: status with values 'Pending' (90%), 'Shipped' (8%), 'Delivered' (2%)

-- Query 1: Likely returns many rows
SELECT * FROM orders WHERE status = 'Pending';
-- Optimizer estimates: 900,000 rows
-- Execution plan: Table scan (faster than seek for large result sets)

-- Query 2: Likely returns few rows
SELECT * FROM orders WHERE status = 'Delivered';
-- Optimizer estimates: 20,000 rows
-- Execution plan: Index seek + key lookup (faster for small result sets)

-- With OUTDATED statistics:
-- Optimizer might choose wrong plan if it thinks 'Delivered' is common
-- Uses Table Scan instead of Index Seek (slower)
```

**Updating Statistics:**

```sql
-- Check statistics
SELECT * FROM sys.stats WHERE object_id = OBJECT_ID('orders');

-- View statistics details
DBCC SHOW_STATISTICS ('orders', 'idx_customer');

-- Update statistics
-- Automatic (default)
ALTER DATABASE current_database SET AUTO_UPDATE_STATISTICS ON;

-- Manual update
UPDATE STATISTICS orders;
UPDATE STATISTICS orders idx_customer;
UPDATE STATISTICS orders WITH FULLSCAN;  -- Expensive but accurate

-- Update incremental statistics (faster)
UPDATE STATISTICS orders WITH INCREMENTAL, FULLSCAN;

-- Automatic update triggered when:
-- - 20% of rows changed (or 500 rows for small tables)
-- - Large data modifications
-- - REBUILD or REORGANIZE index
```

**Impact Example:**

```sql
-- With accurate statistics
SELECT TOP 10 * FROM orders WHERE status = 'Shipped';
-- Estimated rows: 80,000, Actual rows: 80,100 (accurate)
-- Chose Index Seek (correct plan)

-- With outdated statistics
-- Estimated rows: 10,000 (wrong!)
-- Actual rows: 80,100
-- Chose wrong plan (Index Seek instead of Table Scan)
-- Query runs slow

-- Solution: Rebuild statistics
REBUILD STATISTICS orders;
-- Query now uses correct plan and runs fast
```

---

#### 6. Explain query optimization techniques in SQL

**Answer:**

**Query Optimization** involves writing and tuning SQL queries to use system resources efficiently.

**Techniques:**

**1. Use Indexes Effectively**

```sql
-- GOOD: Uses index
SELECT name FROM employees WHERE emp_id = 5;

-- BAD: Full table scan (no index used)
SELECT name FROM employees WHERE emp_id + 1 = 6;  -- Avoid functions on columns

-- GOOD: Indexed column first
SELECT * FROM employees WHERE emp_id = 5 AND salary > 50000;

-- BAD: Non-indexed leading condition
SELECT * FROM employees WHERE salary > 50000 AND emp_id = 5;
```

**2. Avoid SELECT ***

```sql
-- BAD: Retrieves unnecessary columns
SELECT * FROM employees WHERE dept_id = 1;

-- GOOD: Only needed columns
SELECT emp_id, name, salary FROM employees WHERE dept_id = 1;
-- Fewer bytes transferred, better cache utilization
```

**3. Use JOINs instead of Subqueries**

```sql
-- SLOWER: Correlated subquery
SELECT name, 
       (SELECT COUNT(*) FROM orders WHERE emp_id = e.emp_id) AS order_count
FROM employees e;
-- Subquery runs for each employee row

-- FASTER: JOIN with aggregation
SELECT e.name, COUNT(o.order_id) AS order_count
FROM employees e
LEFT JOIN orders o ON e.emp_id = o.emp_id
GROUP BY e.emp_id, e.name;
-- Single pass through data
```

**4. Filter Early (WHERE before GROUP BY)**

```sql
-- BAD: Groups all data then filters
SELECT dept_id, AVG(salary) AS avg_salary
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 50000;
-- Must aggregate all departments

-- GOOD: Filter first
SELECT dept_id, AVG(salary) AS avg_salary
FROM employees
WHERE salary > 40000
GROUP BY dept_id
HAVING AVG(salary) > 50000;
-- Fewer rows to aggregate
```

**5. Avoid DISTINCT when possible**

```sql
-- SLOWER: DISTINCT requires sorting
SELECT DISTINCT customer_id FROM orders;

-- FASTER: Use GROUP BY for same result
SELECT customer_id FROM orders GROUP BY customer_id;

-- FASTER: Use EXISTS
SELECT customer_id FROM customers c
WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.customer_id);
```

**6. Use UNION ALL instead of UNION**

```sql
-- SLOWER: UNION removes duplicates (requires sorting)
SELECT emp_id FROM current_employees
UNION
SELECT emp_id FROM former_employees;

-- FASTER: UNION ALL (no duplicate removal)
SELECT emp_id FROM current_employees
UNION ALL
SELECT emp_id FROM former_employees;
-- Use UNION ALL when duplicates are acceptable or impossible
```

**7. Limit Results Early**

```sql
-- BAD: Gets all 1 million rows then sorts
SELECT * FROM orders ORDER BY order_date DESC;

-- GOOD: Gets top 10 immediately
SELECT TOP 10 * FROM orders ORDER BY order_date DESC;

-- GOOD: Pagination with efficient keyset
SELECT TOP 10 * FROM orders 
WHERE order_id > @last_id  -- Keyset value
ORDER BY order_id;
```

**8. Use EXISTS for existence check**

```sql
-- SLOWER: Returns all matched rows
SELECT c.* FROM customers c
WHERE c.customer_id IN (SELECT customer_id FROM orders);

-- FASTER: Stops at first match
SELECT c.* FROM customers c
WHERE EXISTS (SELECT 1 FROM orders WHERE customer_id = c.customer_id);
```

**9. Avoid implicit conversions**

```sql
-- SLOW: Implicit conversion (varchar to int)
SELECT * FROM employees WHERE emp_id = '5';  -- String to int

-- FAST: Explicit matching types
SELECT * FROM employees WHERE emp_id = 5;

-- Check for implicit conversions in execution plan
-- "CONVERT_IMPLICIT" means conversion happening
```

**10. Batch large operations**

```sql
-- SLOW: Single large transaction
BEGIN TRANSACTION;
DELETE FROM audit_log WHERE log_date < '2020-01-01';  -- 10 million rows
COMMIT;
-- Locks table for entire operation

-- FASTER: Batch deletes
WHILE (SELECT COUNT(*) FROM audit_log WHERE log_date < '2020-01-01') > 0
BEGIN
    BEGIN TRANSACTION;
    DELETE TOP (10000) FROM audit_log WHERE log_date < '2020-01-01';
    COMMIT;
    WAITFOR DELAY '00:00:01';  -- Brief pause
END;
-- Smaller batches, less locking
```

---

#### 7. What is a query execution plan and how do you analyze it?

**Answer:**

A **query execution plan** is a visual representation of how the database engine executes a query, showing which operations are performed and their costs.

**Two Types:**

1. **Estimated Plan**: Generated before execution using statistics
2. **Actual Plan**: Generated after execution with real statistics

**How to View:**

```sql
-- SQL Server: Display Estimated Plan
-- In SSMS: Query > Display Estimated Execution Plan (Ctrl+L)

-- SQL Server: Display Actual Plan
-- In SSMS: Query > Include Actual Execution Plan (Ctrl+Alt+A)

-- PostgreSQL: EXPLAIN
EXPLAIN SELECT * FROM employees WHERE salary > 50000;

-- PostgreSQL: EXPLAIN ANALYZE (actual plan)
EXPLAIN ANALYZE SELECT * FROM employees WHERE salary > 50000;

-- MySQL: EXPLAIN
EXPLAIN SELECT * FROM employees WHERE salary > 50000;

-- Oracle: EXPLAIN PLAN
EXPLAIN PLAN FOR SELECT * FROM employees WHERE salary > 50000;
```

**Key Execution Plan Components:**

```
Example Query:
SELECT e.name, d.dept_name 
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
WHERE e.salary > 50000
ORDER BY e.name;

Execution Plan (Top to Bottom):
1. SORT (ORDER BY name)
   Cost: 12% (expensive)
   
2. HASH JOIN (e JOIN d)
   Cost: 35%
   Join type: INNER JOIN
   
3. INDEX SEEK (employees)
   Cost: 23%
   Predicate: salary > 50000
   Estimated rows: 2,500
   Actual rows: 2,487
   
4. CLUSTERED INDEX SCAN (departments)
   Cost: 30%
   Estimated rows: 50
   Actual rows: 50
```

**Key Metrics to Analyze:**

| Metric | What It Shows | Red Flag |
|--------|---|---|
| **Cost Percentage** | Relative expense of operation | > 20% for any single op |
| **Estimated vs Actual Rows** | Plan accuracy | Large difference |
| **Scan vs Seek** | Access method | SCAN on large tables |
| **Join Type** | How tables combined | NESTED LOOP on large tables |
| **Parallelism** | Multi-threaded | Missing when expected |

**Example Analysis:**

```sql
-- Query: Find high-paid employees in specific department
SELECT e.name, e.salary
FROM employees e
WHERE e.dept_id = 5 AND e.salary > 80000;

-- GOOD PLAN (Index Seek):
-- Estimated Plan shows:
-- - Index Seek on idx_dept_id_salary: Cost 5%, Estimated 250 rows
-- - Filter (salary > 80000): Cost 1%
-- Total cost: 6%

-- BAD PLAN (Table Scan):
-- Estimated Plan shows:
-- - Table Scan on employees: Cost 95%, Estimated 50,000 rows
-- - Filter (dept_id = 5 AND salary > 80000): Cost 5%
-- Total cost: 100%

-- Fix: Create appropriate index
CREATE INDEX idx_dept_salary 
ON employees(dept_id, salary);

-- Query now uses Index Seek (much faster)
```

**Common Issues and Fixes:**

```sql
-- ISSUE 1: Table Scan on large table
-- PLAN SHOWS: Table Scan (red icon), Cost 95%
-- FIX: Add index
CREATE INDEX idx_status ON orders(status);

-- ISSUE 2: Nested Loop Join on large tables
-- PLAN SHOWS: Nested Loop, 100,000 rows x 50,000 rows
-- FIX: Create index on join column
CREATE INDEX idx_order_customer ON order_items(order_id);

-- ISSUE 3: Sort operation on large result set
-- PLAN SHOWS: SORT operator, Spilled to TempDB
-- FIX: Add index on ORDER BY column
CREATE INDEX idx_order_date ON orders(order_date);

-- ISSUE 4: Parameter sniffing
-- PLAN for @param='A' optimal for 1,000,000 rows
-- But @param='B' returns only 10 rows (wrong plan)
-- FIX: Use RECOMPILE hint
SELECT * FROM orders 
WHERE status = @status OPTION (RECOMPILE);

-- Or use local variable
DECLARE @local_status = @status;
SELECT * FROM orders WHERE status = @local_status;
```

**Cost Threshold for Parallelism:**

```sql
-- PLAN SHOWS: Parallelism (multiple threads)
-- Operations with high cost (>5) may be parallelized

-- Control parallelism
-- Force serial execution
SELECT e.name FROM employees e
WHERE salary > 50000
OPTION (MAXDOP 1);  -- Single thread

-- Allow parallel execution
SELECT e.name FROM employees e
WHERE salary > 50000
OPTION (MAXDOP 0);  -- Use all processors

-- Limit to specific CPUs
SELECT e.name FROM employees e
WHERE salary > 50000
OPTION (MAXDOP 4);  -- Use 4 processors
```

---

#### 8. How do you identify and resolve performance bottlenecks in SQL queries?

**Answer:**

**Methodology: Measure → Analyze → Optimize → Verify**

**Step 1: Identify Slow Queries**

```sql
-- SQL Server: sys.dm_exec_query_stats
SELECT TOP 10
    qt.text AS QueryText,
    qs.execution_count,
    qs.total_elapsed_time / 1000000 AS TotalSeconds,
    qs.total_elapsed_time / qs.execution_count / 1000 AS AvgMilliseconds,
    qs.total_logical_reads,
    qs.total_physical_reads
FROM sys.dm_exec_query_stats qs
CROSS APPLY sys.dm_exec_sql_text(qs.sql_handle) qt
ORDER BY qs.total_elapsed_time DESC;

-- PostgreSQL: pg_stat_statements
SELECT query, mean_exec_time, calls, total_exec_time
FROM pg_stat_statements
ORDER BY mean_exec_time DESC
LIMIT 10;
```

**Step 2: Analyze Execution Plan**

```sql
-- Get actual execution plan
SET STATISTICS TIME ON;
SET STATISTICS IO ON;

SELECT e.name, d.dept_name, COUNT(o.order_id)
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
LEFT JOIN orders o ON e.emp_id = o.emp_id
GROUP BY e.emp_id, e.name, d.dept_name;

-- Output shows:
-- CPU: 125ms, Elapsed: 130ms
-- Logical reads: 50,000 (high!)
```

**Step 3: Common Bottlenecks and Fixes**

**Bottleneck 1: Missing Indexes**

```sql
-- SYMPTOM: Table Scan, Logical Reads > 1,000
-- ANALYSIS: Plan shows red Table Scan icon, high cost

-- FIX: Create index
CREATE INDEX idx_salary ON employees(salary);

-- VERIFY: Re-run query, should show Index Seek
```

**Bottleneck 2: Outdated Statistics**

```sql
-- SYMPTOM: Estimated rows ≠ Actual rows
-- EXECUTION PLAN: Estimated 100 rows, Actual 10,000 rows

-- FIX: Update statistics
DBCC DBREINDEX (employees);
UPDATE STATISTICS employees;

-- VERIFY: Re-run, estimates should match actuals
```

**Bottleneck 3: Poor Join Order**

```sql
-- SYMPTOM: Nested Loop Join with 100M+ row combinations
-- Query:
SELECT *
FROM small_table s
JOIN large_table l ON s.id = l.id;

-- PROBLEM: Nested loop scans large_table for each small_table row

-- FIX 1: Create index on large_table
CREATE INDEX idx_id ON large_table(id);

-- FIX 2: Reorder tables (optimizer may not choose correctly)
SELECT *
FROM large_table l
JOIN small_table s ON l.id = s.id;
```

**Bottleneck 4: Inefficient Aggregation**

```sql
-- SLOW: Aggregates all rows then filters
SELECT dept_id, AVG(salary)
FROM employees
GROUP BY dept_id
HAVING AVG(salary) > 50000;
-- Must compute average for all 50 departments

-- FAST: Filter first
SELECT dept_id, AVG(salary)
FROM employees
WHERE salary > 40000
GROUP BY dept_id
HAVING AVG(salary) > 50000;
-- Filters 90% of rows before aggregation
```

**Bottleneck 5: Spilling to TempDB**

```sql
-- SYMPTOM: Execution plan shows "Spilled to Temp DB"
-- PROBLEM: Sort/Hash operation too large for memory

-- Query causing spill:
SELECT * FROM large_table
ORDER BY expensive_column;

-- FIX 1: Add index on sort column
CREATE INDEX idx_expensive ON large_table(expensive_column);

-- FIX 2: Increase work_mem (PostgreSQL)
SET work_mem = '256 MB';
SELECT * FROM large_table ORDER BY expensive_column;

-- FIX 3: Limit result set
SELECT TOP 1000 * FROM large_table
ORDER BY expensive_column;
```

**Step 4: Performance Monitoring Tools**

```sql
-- SQL Server: Activity Monitor
-- Shows: CPU, Memory, Disk, Network I/O

-- SQL Server: Query Store
-- Tracks: All query executions, execution plans, statistics
SELECT * FROM sys.query_store_query_text;

-- PostgreSQL: pg_stat_monitor
-- Shows: Query latency, I/O, CPU

-- MySQL: Performance Schema
SELECT * FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC;

-- Monitor blocking queries
SELECT * FROM sys.dm_exec_requests
WHERE wait_type IS NOT NULL;
```

---

#### 9. What is index fragmentation and how do you address it?

**Answer:**

**Index Fragmentation** occurs when index pages become scattered and disorganized, causing inefficient reading during execution.

**Types of Fragmentation:**

```
EXTERNAL FRAGMENTATION:
- Pages physically scattered on disk
- 0% = Perfectly organized (contiguous)
- 10% = Acceptable fragmentation
- 30%+ = High fragmentation (slow random I/O)

INTERNAL FRAGMENTATION:
- Wasted space within pages
- Too much DELETE activity leaves empty slots
- Wasted memory, inefficient page reads
```

**Measuring Fragmentation:**

```sql
-- SQL Server: sys.dm_db_index_physical_stats
SELECT 
    OBJECT_NAME(ips.object_id) AS TableName,
    i.name AS IndexName,
    ips.avg_fragmentation_in_percent,
    ips.page_count,
    CASE 
        WHEN ips.avg_fragmentation_in_percent < 10 THEN 'Good'
        WHEN ips.avg_fragmentation_in_percent < 30 THEN 'Reorganize'
        ELSE 'Rebuild'
    END AS Action
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i ON ips.object_id = i.object_id 
    AND ips.index_id = i.index_id
WHERE ips.page_count > 1000
ORDER BY ips.avg_fragmentation_in_percent DESC;

-- Example output:
-- TableName: employees
-- IndexName: idx_salary
-- avg_fragmentation_in_percent: 45.8%
-- Action: Rebuild (too high)
```

**Addressing Fragmentation:**

**Option 1: REORGANIZE (Light Defrag)**

```sql
-- For 10-30% fragmentation
ALTER INDEX idx_salary ON employees REORGANIZE;

-- Reorganize all indexes on table
ALTER INDEX ALL ON employees REORGANIZE;

-- REORGANIZE:
-- - Compacts pages in place
-- - Doesn't require additional disk space
-- - Doesn't block other users (mostly)
-- - Takes longer than rebuild
-- - Doesn't update statistics

-- After REORGANIZE, update statistics
UPDATE STATISTICS employees idx_salary;
```

**Option 2: REBUILD (Heavy Defrag)**

```sql
-- For >30% fragmentation
ALTER INDEX idx_salary ON employees REBUILD;

-- Rebuild offline (blocks users)
ALTER INDEX idx_salary ON employees REBUILD 
WITH (ONLINE = OFF);

-- Rebuild online (SQL Server Enterprise)
ALTER INDEX idx_salary ON employees REBUILD 
WITH (ONLINE = ON);

-- REBUILD:
-- - Drops and recreates index
-- - Reclaims disk space
-- - Updates statistics
-- - Can block users (offline mode)
-- - Faster than REORGANIZE for high fragmentation

-- Rebuild with sort in temporary database
ALTER INDEX idx_salary ON employees REBUILD 
WITH (ONLINE = ON, SORT_IN_TEMPDB = ON);
```

**Automated Fragmentation Maintenance:**

```sql
-- Create maintenance job
DECLARE @tables TABLE (
    TableName NVARCHAR(128),
    IndexName NVARCHAR(128),
    Fragmentation FLOAT
);

-- Collect fragmentation stats
INSERT INTO @tables
SELECT 
    OBJECT_NAME(ips.object_id),
    i.name,
    ips.avg_fragmentation_in_percent
FROM sys.dm_db_index_physical_stats(DB_ID(), NULL, NULL, NULL, 'LIMITED') ips
JOIN sys.indexes i ON ips.object_id = i.object_id;

-- REORGANIZE if 10-30%
UPDATE idx 
SET idx_statement = 'ALTER INDEX ' + IndexName + ' ON ' + TableName + ' REORGANIZE'
FROM @tables idx
WHERE Fragmentation BETWEEN 10 AND 30;

-- REBUILD if >30%
UPDATE idx 
SET idx_statement = 'ALTER INDEX ' + IndexName + ' ON ' + TableName + ' REBUILD'
FROM @tables idx
WHERE Fragmentation > 30;

-- Popular solution: Ola Hallengren's Index Maintenance
-- EXECUTE dbo.IndexOptimize
-- @Databases = 'USER_DATABASES',
-- @FragmentationLow = NULL,
-- @FragmentationMedium = 'INDEX_REORGANIZE',
-- @FragmentationHigh = 'INDEX_REBUILD_ONLINE';
```

---

#### 10. Explain the concept of query hints and when to use them

**Answer:**

**Query Hints** are directives that tell the SQL optimizer to execute a query in a specific way, overriding automatic optimization.

**When to Use (Carefully):**
- Query optimizer choosing suboptimal plan
- Need to force specific execution approach
- Testing alternative plans
- Avoiding parameter sniffing
- Forcing parallel/serial execution

**Important:** Hints are a last resort. Only use after confirming need with execution plan analysis.

**Common Hints:**

**1. INDEX Hint - Force specific index**

```sql
-- Force using specific index
SELECT e.name, e.salary
FROM employees (INDEX = idx_salary) e
WHERE e.salary > 50000;

-- Force table scan (ignore all indexes)
SELECT e.name, e.salary
FROM employees (INDEX = 0) e
WHERE e.salary > 50000;

-- Force covering index
SELECT e.name, e.salary
FROM employees (INDEX = idx_name_salary) e
WHERE e.salary > 50000;

-- Bad example (avoid):
SELECT e.name
FROM employees (INDEX = idx_salary) e
WHERE e.name = 'John';
-- Forces wrong index, probably slower
```

**2. JOIN Hint - Control join algorithm**

```sql
-- LOOP JOIN: For small inner table
SELECT *
FROM large_orders lo
INNER LOOP JOIN small_customers sc 
    ON lo.customer_id = sc.customer_id;
-- Nested loop: suitable for small inner

-- HASH JOIN: For large hash table
SELECT *
FROM orders1 o1
INNER HASH JOIN orders2 o2 
    ON o1.order_id = o2.order_id;
-- Build hash table for one input

-- MERGE JOIN: For sorted/indexed inputs
SELECT *
FROM orders1 o1
INNER MERGE JOIN orders2 o2 
    ON o1.order_id = o2.order_id;
-- Works on pre-sorted data
```

**3. OPTION Clause - Query-level hints**

```sql
-- MAXDOP: Limit or enable parallelism
SELECT e.name FROM employees e
WHERE salary > 50000
OPTION (MAXDOP 1);  -- Single-threaded (serial)

-- MAXDOP 0 means: Use all available processors

-- RECOMPILE: Recompile plan for each execution
SELECT e.name FROM employees e
WHERE salary > @salary_threshold
OPTION (RECOMPILE);
-- Avoids parameter sniffing

-- FORCE ORDER: Preserve JOIN order
SELECT *
FROM table1 t1
JOIN table2 t2 ON t1.id = t2.id
JOIN table3 t3 ON t2.id = t3.id
OPTION (FORCE ORDER);
-- Joins in exact order specified

-- OPTIMIZE FOR: Hint for specific parameter value
SELECT e.name FROM employees e
WHERE salary > @salary
OPTION (OPTIMIZE FOR (@salary = 100000));
-- Creates plan optimized for this value
```

**4. NOLOCK Hint - Dirty reads (use carefully)**

```sql
-- Read uncommitted data (faster, risky)
SELECT e.name FROM employees (NOLOCK) e
WHERE salary > 50000;
-- Equivalent to: SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED

-- Only use for:
-- - Read-only reporting
-- - Exact numbers not critical
-- - High-volume analytical queries
-- - Never for: Financial, critical data, transactional reads
```

**5. RECOMPILE - Parameter sniffing**

```sql
-- Problem: Parameter sniffing
-- First execution with @status = 'Rare' generates plan for rare status
-- Plan cached and reused for @status = 'Common' (wrong plan!)

-- Solution 1: RECOMPILE hint
CREATE PROCEDURE GetOrders @status VARCHAR(20)
AS
SELECT * FROM orders
WHERE status = @status
OPTION (RECOMPILE);
-- Compiles plan for each execution

-- Solution 2: Local variables (often better)
CREATE PROCEDURE GetOrders @status VARCHAR(20)
AS
DECLARE @local_status = @status;
SELECT * FROM orders
WHERE status = @local_status;
-- SQL treats local var differently, fresh plan

-- Solution 3: OPTIMIZE FOR hint
CREATE PROCEDURE GetOrders @status VARCHAR(20)
AS
SELECT * FROM orders
WHERE status = @status
OPTION (OPTIMIZE FOR (@status = 'Common'));
```

**When NOT to Use Hints:**

```sql
-- BAD: Hardcoding indexes that might be dropped
SELECT e.name FROM employees (INDEX = idx_deleted) e;
-- If index is dropped, query fails

-- BAD: Microoptimizing when root cause is missing index
-- Instead of:
SELECT * FROM orders (INDEX = 0)  -- Force table scan
WHERE customer_id = @id;

-- Fix the root cause:
CREATE INDEX idx_customer ON orders(customer_id);
SELECT * FROM orders WHERE customer_id = @id;
-- Let optimizer choose (usually better)
```

---

#### 11. What is a covering index and when would you use one?

**Answer:**

A **covering index** contains all columns needed to satisfy a query, eliminating the need to look up the actual table (key lookup).

**Benefits:**
- Eliminates table lookup (key lookup operator)
- Faster query execution
- Reduced I/O and CPU
- Smaller memory footprint

**Structure:**

```
Covering Index Structure:
┌────────────────────────┐
│ Index (in Memory)      │
│ Key columns:           │
│  - salary              │
│ Include columns:       │
│  - name                │
│  - email               │
└────────────────────────┘
         ↓
Query can be answered entirely from index
(No need to access table)
```

**Example:**

```sql
-- Non-covering index
CREATE INDEX idx_salary ON employees(salary);

-- Query:
SELECT name, email FROM employees WHERE salary > 50000;

-- Execution:
-- 1. Index Seek: Find salary > 50000 (from index)
-- 2. Key Lookup: Get name, email (from table)
-- Total: 2 operations (slower)

-- Covering index (with INCLUDE)
CREATE INDEX idx_salary_covering 
ON employees(salary) 
INCLUDE (name, email);

-- Same query now:
-- Execution:
-- 1. Index Seek: Find salary > 50000, get name, email (all from index)
-- Total: 1 operation (faster, no table lookup)
```

**How to Create Covering Index:**

```sql
-- Key columns: Columns in WHERE/JOIN/GROUP BY
-- Include columns: Columns in SELECT but not in key

-- CREATE INDEX with INCLUDE clause
CREATE INDEX idx_emp_dept_salary
ON employees(dept_id, salary)  -- Key columns
INCLUDE (name, email, phone);  -- Include columns

-- Index covers these queries:
-- Query 1: Perfect fit
SELECT name, email FROM employees
WHERE dept_id = 2 AND salary > 50000;

-- Query 2: Uses subset
SELECT name FROM employees
WHERE dept_id = 2;

-- Query 3: Not covered (missing column in WHERE)
SELECT name FROM employees
WHERE hire_date > '2020-01-01';
-- Cannot use dept_id in WHERE, needs different index
```

**Identifying Missing Covering Index:**

```sql
-- Execution plan shows: Index Seek + Key Lookup
-- This indicates index doesn't cover the query

-- Solution 1: Add INCLUDE columns
-- Instead of:
CREATE INDEX idx_old ON employees(salary);

-- Use:
CREATE INDEX idx_new 
ON employees(salary)
INCLUDE (name, email, phone, dept_id);

-- Solution 2: SQL Server gives recommendations
-- In execution plan, right-click operator → "Missing Index Details"
-- Auto-generates optimal index
```

**Trade-offs:**

```sql
-- BENEFITS of covering index:
-- - Eliminates key lookup (faster SELECT)
-- - Better cache utilization
-- - Fewer disk reads

-- COSTS of covering index:
-- - Larger index size (more storage)
-- - Slower INSERT/UPDATE/DELETE (more data to maintain)
-- - More memory used

-- Decision:
-- - Heavy read queries: Use covering index
-- - Heavy write tables: Minimal covering
-- - Balance with query patterns
```

**Real-World Example:**

```sql
-- Slow query:
SELECT name, email, salary
FROM employees
WHERE dept_id = 'Sales'
  AND salary > 50000
ORDER BY salary DESC;

-- Current index (not covering):
CREATE INDEX idx_dept_sal ON employees(dept_id, salary);

-- Execution plan:
-- - Index Seek: 100 rows
-- - Key Lookup: 100 table lookups (expensive!)
-- - Sort: 100 rows

-- Optimized covering index:
CREATE INDEX idx_dept_sal_cover
ON employees(dept_id, salary)
INCLUDE (name, email);

-- New execution plan:
-- - Index Seek: 100 rows (from index directly)
-- - Sort: 100 rows
-- - Total: Much faster (no key lookups)
```

---

### Index Optimization and Maintenance

#### 12. Explain filtered indexes in SQL Server

**Answer:**

A **filtered index** is a non-clustered index on a subset of rows that meet a condition, reducing index size and improving performance.

**When to Use:**
- Large tables with significant portion of similar values
- Sparse columns (many NULLs)
- Partitioned data (active vs. inactive)
- Reporting on subset of data

**Benefits:**
- Smaller index (faster maintenance)
- Faster index seek (fewer rows to scan)
- Reduced storage
- Improved INSERT/UPDATE/DELETE

**Example:**

```sql
-- Scenario: Orders table with 1 million rows
-- 95% active orders, 5% archived orders

-- Traditional index on status
CREATE INDEX idx_status ON orders(status);
-- Indexes all 1,000,000 rows (inefficient)

-- Filtered index: Only active orders
CREATE INDEX idx_active_orders
ON orders(order_date)
WHERE status = 'Active';
-- Indexes only ~950,000 rows (1/20 smaller)

-- Query using filtered index
SELECT * FROM orders
WHERE status = 'Active'
AND order_date > '2024-01-01';
-- Uses filtered index (fast)

-- Query not using filtered index
SELECT * FROM orders
WHERE status = 'Archived';
-- Cannot use filtered index (condition not met)
```

**Advanced Filtered Index:**

```sql
-- Only index expensive/valuable orders
CREATE INDEX idx_high_value
ON orders(order_date)
WHERE amount > 10000
  AND status IN ('Pending', 'Processing');
-- Indexes ~5% of rows (very small)

-- Only index NULL values
CREATE INDEX idx_null_manager
ON employees(emp_id)
WHERE manager_id IS NULL;
-- Useful for finding employees without manager

-- Combination: Date + status + amount
CREATE INDEX idx_recent_active
ON orders(customer_id)
WHERE order_date >= DATEADD(MONTH, -12, GETDATE())
  AND status = 'Completed'
  AND amount > 100;
```

---

#### 13. How do you choose which columns to index?

**Answer:**

**Indexing Strategy - Decision Framework**

**Step 1: Identify Candidate Columns**

```sql
-- Columns frequently in:
-- - WHERE clauses
-- - JOIN conditions
-- - ORDER BY
-- - GROUP BY

-- Find most frequently used columns:
SELECT TOP 20
    equality_columns,
    inequality_columns,
    included_columns,
    user_seeks + user_scans + user_lookups AS usage_count
FROM sys.dm_db_missing_indexes
WHERE database_id = DB_ID()
ORDER BY user_seeks + user_scans + user_lookups DESC;
```

**Step 2: Evaluate Selectivity**

```sql
-- Selectivity = Distinct values / Total rows
-- High selectivity (good for index): Many distinct values
-- Low selectivity (bad for index): Few distinct values

-- Example: Employees table with 100,000 rows

-- HIGH selectivity (GOOD to index)
SELECT COUNT(DISTINCT email) / COUNT(*) AS selectivity
FROM employees;
-- Result: 1.0 (100% unique) - Perfect for index

SELECT COUNT(DISTINCT emp_id) / COUNT(*) AS selectivity
FROM employees;
-- Result: 1.0 - Good

-- MEDIUM selectivity
SELECT COUNT(DISTINCT dept_id) / COUNT(*) AS selectivity
FROM employees;
-- Result: 0.05 (5% unique = 20 values)
-- Acceptable if frequently queried

-- LOW selectivity (BAD to index)
SELECT COUNT(DISTINCT gender) / COUNT(*) AS selectivity
FROM employees;
-- Result: 0.02 (only 2 values: M/F)
-- Avoid indexing (index scan almost same as table scan)
```

**Step 3: Consider Cardinality and Distribution**

```sql
-- Column distribution matters
-- Example: order_status with values
-- 'Pending': 60%
-- 'Processing': 30%
-- 'Completed': 9%
-- 'Cancelled': 1%

-- Query 1: Looking for rare status
SELECT * FROM orders WHERE status = 'Cancelled';
-- Index useful (1% of rows, good seek)

-- Query 2: Looking for common status
SELECT * FROM orders WHERE status = 'Pending';
-- Index less useful (might do table scan for 60%)

-- Check distribution:
SELECT status, COUNT(*) AS count_percentage
FROM orders
GROUP BY status
ORDER BY count_percentage DESC;
```

**Step 4: Column Ordering (for Composite Indexes)**

```sql
-- Optimal order: Most to Least selective
-- Queries:
-- Query 1: WHERE dept_id = 2 AND status = 'Active' AND salary > 50000
-- Query 2: WHERE status = 'Active' AND salary > 50000

-- Selectivity:
-- dept_id: 2% (very selective)
-- status: 10%
-- salary: depends on value

-- Best composite index:
CREATE INDEX idx_dept_status_salary
ON employees(dept_id, status, salary);

-- Works for Query 1 (all conditions)
-- Partially works for Query 2 (dept_id not in query, skips to status)

-- Left-to-right rule:
-- Index is useful if leading columns are in WHERE
SELECT * FROM employees WHERE dept_id = 2;  -- Uses index
SELECT * FROM employees WHERE status = 'Active';  -- Doesn't use index
```

**Step 5: Consider Write Performance**

```sql
-- High-write tables: Fewer indexes
-- High-read tables: More indexes

-- Check INSERT/UPDATE/DELETE frequency
SELECT 
    OBJECT_NAME(i.object_id) AS TableName,
    i.name AS IndexName,
    s.user_seeks,
    s.user_scans,
    s.user_lookups,
    s.user_updates,
    s.user_seeks + s.user_scans + s.user_lookups 
        - s.user_updates AS net_benefit
FROM sys.indexes i
LEFT JOIN sys.dm_db_index_usage_stats s 
    ON i.object_id = s.object_id 
    AND i.index_id = s.index_id
WHERE database_id = DB_ID()
ORDER BY s.user_updates DESC;

-- If user_updates >> user_seeks:
-- Too many indexes for this table
```

**Complete Decision Matrix:**

```sql
-- Candidate column: salary in employees table

Criteria                   | Score
---------------------------|--------
Selectivity (100 unique)   | ✓✓✓ High
Cardinality                | ✓✓✓ High
Query frequency (SELECT)   | ✓✓✓ High (used in 10+ queries)
WHERE clause usage         | ✓✓✓ Very common
JOIN usage                 | ✓✓ Sometimes
ORDER BY usage             | ✓ Occasionally
Write performance impact   | ✓ Low (infrequent updates)
Storage cost               | ✓ Acceptable
Total Score               | Create index: YES

Candidate column: gender in employees table

Criteria                   | Score
---------------------------|--------
Selectivity (2 values)    | ✗ Very low
Cardinality               | ✗ Very low (M/F)
Query frequency           | ✓ Some queries
WHERE clause usage        | ✓ Occasional
Write performance impact  | ✗ High (slows INSERTs)
Storage cost              | ✓ Small index
Total Score               | Create index: NO (not selective)
```

---

#### 14. What is index selectivity and why is it important?

**Answer:**

**Index Selectivity** is the ratio of distinct values in a column to total rows. It measures how effectively an index can narrow down rows.

**Formula:**
```
Selectivity = COUNT(DISTINCT values) / COUNT(total rows)
```

**Why Important:**

- **High selectivity (> 95%)**: Index is effective
- **Medium selectivity (50-95%)**: Index moderately useful
- **Low selectivity (< 50%)**: Index less beneficial

**Example:**

```sql
-- Employees table: 100,000 rows

-- Column: emp_id (PRIMARY KEY)
SELECT COUNT(DISTINCT emp_id) / COUNT(*) AS selectivity
FROM employees;
-- Result: 1.0 (100%) - Perfect selectivity

-- Column: dept_id (20 departments)
SELECT COUNT(DISTINCT dept_id) / COUNT(*) AS selectivity
FROM employees;
-- Result: 0.0002 (0.02%) - Very low selectivity

-- Column: salary (varies by employee)
SELECT COUNT(DISTINCT salary) / COUNT(*) AS selectivity
FROM employees;
-- Result: 0.85 (85%) - High selectivity

-- Query with high selectivity index
SELECT * FROM employees WHERE emp_id = 5;
-- Index Seek (very efficient, narrows to 1 row)

-- Query with low selectivity index
SELECT * FROM employees WHERE dept_id = 'Sales';
-- Index Scan or Table Scan (less efficient, ~5000 rows)
```

**Impact on Execution Plan:**

```sql
-- High selectivity index (emp_id)
-- Execution plan chooses: INDEX SEEK
SELECT * FROM employees WHERE emp_id = 5;
-- Cost: Very low

-- Low selectivity index (gender)
-- Execution plan chooses: TABLE SCAN (ignores index!)
SELECT * FROM employees WHERE gender = 'M';
-- Index not used (50% of rows anyway)
```

**Improving Selectivity:**

```sql
-- Poor: Single column, low selectivity
CREATE INDEX idx_status ON orders(status);
-- Only 3 values: Pending, Processing, Shipped
-- Selectivity: 0.03 (very low)

-- Better: Multiple columns for composite selectivity
CREATE INDEX idx_status_date ON orders(status, order_date);
-- status: 3 values
-- order_date: 365+ values
-- Selectivity: 0.03 * 365 = much higher

-- Best: Add high-selectivity column first
CREATE INDEX idx_customer_status_date 
ON orders(customer_id, status, order_date);
-- customer_id: 50,000 unique values (high selectivity)
-- status: filters by status
-- order_date: sorts/ranges
```

---

## Views and Stored Procedures

### Views in SQL

#### 15. What is a view in SQL and what are its benefits?

**Answer:**

A **view** is a virtual table based on a SELECT query. It doesn't store data but provides a logical representation of data from one or more tables.

**Benefits:**

1. **Simplification**: Hide complex queries
2. **Security**: Restrict column/row access
3. **Consistency**: Standardized data access
4. **Maintainability**: Change underlying tables without affecting queries
5. **Reusability**: Avoid duplicating complex logic

**Example:**

```sql
-- Base tables
CREATE TABLE employees (
    emp_id INT,
    name VARCHAR(100),
    salary DECIMAL(10,2),
    dept_id INT,
    hire_date DATE
);

CREATE TABLE departments (
    dept_id INT,
    dept_name VARCHAR(50)
);

-- Complex query (used frequently)
SELECT e.emp_id, e.name, e.salary, d.dept_name,
       DATEDIFF(YEAR, e.hire_date, GETDATE()) AS years_employed
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;

-- Solution: Create view
CREATE VIEW vw_employee_summary AS
SELECT e.emp_id, e.name, e.salary, d.dept_name,
       DATEDIFF(YEAR, e.hire_date, GETDATE()) AS years_employed
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id;

-- Now simple to use:
SELECT * FROM vw_employee_summary;
SELECT * FROM vw_employee_summary WHERE salary > 50000;
```

**Types of Views:**

**1. Simple View (single table)**

```sql
CREATE VIEW vw_active_employees AS
SELECT emp_id, name, salary
FROM employees
WHERE status = 'Active';

-- Can use for INSERT/UPDATE/DELETE
INSERT INTO vw_active_employees VALUES (1, 'John', 50000);
```

**2. Complex View (multiple tables)**

```sql
CREATE VIEW vw_dept_salary_summary AS
SELECT 
    d.dept_name,
    COUNT(e.emp_id) AS employee_count,
    AVG(e.salary) AS avg_salary,
    MIN(e.salary) AS min_salary,
    MAX(e.salary) AS max_salary
FROM departments d
LEFT JOIN employees e ON d.dept_id = e.dept_id
GROUP BY d.dept_id, d.dept_name;

-- Cannot use for modification (aggregations)
```

**3. Indexed View (Materialized)**

```sql
CREATE VIEW vw_high_value_orders WITH SCHEMABINDING AS
SELECT 
    customer_id,
    COUNT(*) AS order_count,
    SUM(amount) AS total_amount
FROM orders
WHERE amount > 1000
GROUP BY customer_id;

-- Create index on view (stores data)
CREATE UNIQUE CLUSTERED INDEX ix_vw_orders 
ON vw_high_value_orders(customer_id);

-- Now behaves like table (faster, materialized data)
```

---

#### 16. What is the difference between a simple view and a complex view?

**Answer:**

| Aspect | Simple View | Complex View |
|--------|---|---|
| **Tables** | Single table | Multiple tables (JOINs) |
| **Aggregations** | No | Yes (GROUP BY, aggregates) |
| **WHERE** | Can filter | Can filter |
| **UPDATE/DELETE** | Often allowed | Usually not allowed |
| **Complexity** | Low | High |
| **Performance** | Fast | May be slower |
| **Modifiability** | Can insert/update rows | Limited/no modifications |

**Simple View Example:**

```sql
-- Single table, no aggregation
CREATE VIEW vw_sales_employees AS
SELECT emp_id, name, salary
FROM employees
WHERE dept_id = 'Sales';

-- Can modify data through view
INSERT INTO vw_sales_employees VALUES (100, 'John', 50000);
-- Inserts into base employees table

UPDATE vw_sales_employees SET salary = 55000 WHERE emp_id = 100;
-- Updates base table

DELETE FROM vw_sales_employees WHERE emp_id = 100;
-- Deletes from base table
```

**Complex View Example:**

```sql
-- Multiple tables, aggregation
CREATE VIEW vw_employee_salary_analysis AS
SELECT 
    e.emp_id,
    e.name,
    d.dept_name,
    e.salary,
    AVG(e.salary) OVER (PARTITION BY d.dept_id) AS dept_avg_salary,
    RANK() OVER (PARTITION BY d.dept_id ORDER BY e.salary DESC) AS salary_rank
FROM employees e
JOIN departments d ON e.dept_id = d.dept_id
GROUP BY e.emp_id, e.name, d.dept_name, e.salary;

-- Cannot modify through this view
INSERT INTO vw_employee_salary_analysis VALUES (...)  -- ERROR
-- Complex views are read-only in most cases

-- If you must modify underlying tables:
-- Use INSTEAD OF trigger on view
CREATE TRIGGER tr_complex_view_insert
ON vw_employee_salary_analysis
INSTEAD OF INSERT
AS
BEGIN
    INSERT INTO employees (emp_id, name, dept_id, salary)
    SELECT emp_id, name, 
        (SELECT dept_id FROM departments WHERE dept_name = dept_name),
        salary
    FROM inserted;
END;
```

---

#### 17. What are materialized views and when would you use them?

**Answer:**

A **materialized view** stores the result set physically in the database, unlike regular views which recalculate each time.

**When to Use:**
- Expensive calculations (aggregations, multiple JOINs)
- Frequently accessed summary data
- Data warehouse/reporting
- Data doesn't need to be real-time
- Acceptable to refresh periodically

**Benefits:**
- Fast query performance (data already calculated)
- Reduced computation
- Can create indexes on materialized view

**Trade-offs:**
- Storage overhead
- Stale data (until refresh)
- Refresh maintenance cost

**Example:**

```sql
-- Regular view (recalculates every query)
CREATE VIEW vw_sales_summary AS
SELECT 
    YEAR(order_date) AS year,
    MONTH(order_date) AS month,
    SUM(amount) AS total_sales,
    COUNT(*) AS order_count
FROM orders
GROUP BY YEAR(order_date), MONTH(order_date);

-- Slow query (must calculate aggregations)
SELECT * FROM vw_sales_summary;

-- Materialized view solution
-- SQL Server: Indexed view
CREATE VIEW vw_sales_summary_materialized WITH SCHEMABINDING AS
SELECT 
    YEAR(order_date) AS year,
    MONTH(order_date) AS month,
    SUM(amount) AS total_sales,
    COUNT(*) AS order_count,
    COUNT_BIG(*) AS cnt  -- Required for materialization
FROM orders
GROUP BY YEAR(order_date), MONTH(order_date);

-- Create unique clustered index (materializes the view)
CREATE UNIQUE CLUSTERED INDEX idx_summary
ON vw_sales_summary_materialized(year, month);

-- Now data stored physically, very fast access
SELECT * FROM vw_sales_summary_materialized;
-- Direct table lookup (no calculation)
```

**Refresh Strategy:**

```sql
-- SQL Server: Automatic index maintenance
-- Indexes on materialized view updated with underlying tables
-- But can be slow during heavy updates

-- Schedule periodic refresh (off-peak)
-- Option 1: Drop and recreate
DROP INDEX idx_summary ON vw_sales_summary_materialized;
CREATE UNIQUE CLUSTERED INDEX idx_summary
ON vw_sales_summary_materialized(year, month);

-- Option 2: Refresh index
ALTER INDEX idx_summary 
ON vw_sales_summary_materialized REBUILD;

-- PostgreSQL: Materialized View
CREATE MATERIALIZED VIEW mv_sales_summary AS
SELECT 
    DATE_TRUNC('month', order_date) AS month,
    SUM(amount) AS total_sales
FROM orders
GROUP BY DATE_TRUNC('month', order_date);

-- Create index
CREATE INDEX idx_mv_month ON mv_sales_summary(month);

-- Manual refresh (no automatic update)
REFRESH MATERIALIZED VIEW mv_sales_summary;

-- Concurrent refresh (doesn't lock)
REFRESH MATERIALIZED VIEW CONCURRENTLY mv_sales_summary;
```

---

### Stored Procedures

#### 18. What are stored procedures and their advantages?

**Answer:**

A **stored procedure** is precompiled SQL code stored in the database that can be executed repeatedly.

**Advantages:**

1. **Performance**: Precompiled, reduced parsing overhead
2. **Security**: Parameters prevent SQL injection
3. **Reusability**: Written once, used many times
4. **Encapsulation**: Hide business logic
5. **Network efficiency**: Single call vs. multiple statements
6. **Error handling**: Centralized error management
7. **Auditability**: Track stored procedure execution

**Example:**

```sql
-- Basic stored procedure
CREATE PROCEDURE sp_GetEmployeesByDepartment
    @DepartmentName VARCHAR(50)
AS
BEGIN
    SELECT emp_id, name, salary
    FROM employees e
    JOIN departments d ON e.dept_id = d.dept_id
    WHERE d.dept_name = @DepartmentName
    ORDER BY e.salary DESC;
END;

-- Execute procedure
EXEC sp_GetEmployeesByDepartment 'Sales';

-- With error handling
CREATE PROCEDURE sp_InsertEmployee
    @Name VARCHAR(100),
    @Salary DECIMAL(10,2),
    @DeptId INT,
    @EmployeeId INT OUTPUT
AS
BEGIN
    BEGIN TRY
        INSERT INTO employees (name, salary, dept_id)
        VALUES (@Name, @Salary, @DeptId);
        
        SET @EmployeeId = SCOPE_IDENTITY();
    END TRY
    BEGIN CATCH
        SELECT ERROR_MESSAGE();
        RAISERROR('Insert failed', 16, 1);
    END CATCH
END;

-- Execute with output parameter
DECLARE @NewId INT;
EXEC sp_InsertEmployee 'John', 50000, 2, @NewId OUTPUT;
SELECT 'New employee ID:' + CAST(@NewId AS VARCHAR);
```

---

#### 19. Explain the difference between stored procedures and functions

**Answer:**

| Aspect | Stored Procedure | Function |
|--------|---|---|
| **Return** | Multiple result sets or status | Single scalar value |
| **Usage** | EXEC statement | In SELECT/WHERE clauses |
| **Side effects** | Can modify data | Usually cannot (depending on type) |
| **Recursion** | Supported | Supported |
| **Parameters** | Input, Output, Input/Output | Input only |
| **Performance** | Can be faster | Simpler logic |
| **Return type** | INT status code | Specific data type |

**Stored Procedure:**

```sql
-- Returns multiple result sets
CREATE PROCEDURE sp_GetDepartmentInfo @DeptId INT
AS
BEGIN
    -- Result set 1: Department info
    SELECT dept_id, dept_name FROM departments
    WHERE dept_id = @DeptId;
    
    -- Result set 2: Employees
    SELECT emp_id, name FROM employees
    WHERE dept_id = @DeptId;
    
    -- Result set 3: Statistics
    SELECT COUNT(*) AS emp_count, AVG(salary) AS avg_salary
    FROM employees
    WHERE dept_id = @DeptId;
END;

-- Execute
EXEC sp_GetDepartmentInfo 2;
-- Returns 3 result sets
```

**Function:**

```sql
-- Returns single scalar value
CREATE FUNCTION fn_GetDepartmentAverageSalary (@DeptId INT)
RETURNS DECIMAL(10,2)
AS
BEGIN
    DECLARE @AvgSalary DECIMAL(10,2);
    
    SELECT @AvgSalary = AVG(salary)
    FROM employees
    WHERE dept_id = @DeptId;
    
    RETURN @AvgSalary;
END;

-- Use in SELECT
SELECT dept_name, dbo.fn_GetDepartmentAverageSalary(dept_id) AS avg_salary
FROM departments;

-- Table-valued function
CREATE FUNCTION fn_GetEmployeesByDepartment (@DeptId INT)
RETURNS TABLE
AS
RETURN (
    SELECT emp_id, name, salary
    FROM employees
    WHERE dept_id = @DeptId
);

-- Use like table
SELECT * FROM fn_GetEmployeesByDepartment(2);
```

---

#### 20. What are the various types of parameters in stored procedures?

**Answer:**

| Parameter Type | Direction | Usage | Example |
|---|---|---|---|
| **INPUT** | Procedure receives value | Pass data to procedure | @DeptId INT |
| **OUTPUT** | Procedure returns value | Get result from procedure | @NewId INT OUTPUT |
| **INPUT/OUTPUT** | Both directions | Pass and receive | @Count INT OUTPUT |

**Examples:**

```sql
-- INPUT parameter (default)
CREATE PROCEDURE sp_GetEmployees @DepartmentId INT
AS
BEGIN
    SELECT * FROM employees WHERE dept_id = @DepartmentId;
END;

EXEC sp_GetEmployees 2;

-- OUTPUT parameter
CREATE PROCEDURE sp_GetEmployeeCount
    @DepartmentId INT,
    @EmployeeCount INT OUTPUT
AS
BEGIN
    SELECT @EmployeeCount = COUNT(*)
    FROM employees
    WHERE dept_id = @DepartmentId;
END;

DECLARE @Count INT;
EXEC sp_GetEmployeeCount 2, @Count OUTPUT;
SELECT 'Count: ' + CAST(@Count AS VARCHAR);

-- INPUT/OUTPUT parameter
CREATE PROCEDURE sp_DoubleAndCount
    @Value INT OUTPUT,
    @DeptId INT
AS
BEGIN
    SET @Value = @Value * 2;
    
    SELECT @Value AS doubled_value,
           (SELECT COUNT(*) FROM employees WHERE dept_id = @DeptId) AS emp_count;
END;

DECLARE @InputValue INT = 5;
EXEC sp_DoubleAndCount @InputValue OUTPUT, 2;
SELECT 'Doubled: ' + CAST(@InputValue AS VARCHAR);

-- Default parameters
CREATE PROCEDURE sp_GetOrders
    @Status VARCHAR(20) = 'Active',
    @Limit INT = 10
AS
BEGIN
    SELECT TOP (@Limit) * FROM orders
    WHERE status = @Status;
END;

EXEC sp_GetOrders;  -- Uses defaults
EXEC sp_GetOrders 'Shipped';  -- Uses @Limit default
EXEC sp_GetOrders 'Shipped', 50;  -- Explicit all

-- Variable number of parameters (table-valued parameter)
CREATE TYPE OrderIdList AS TABLE (
    OrderId INT
);

CREATE PROCEDURE sp_GetMultipleOrders
    @OrderIds OrderIdList READONLY
AS
BEGIN
    SELECT * FROM orders
    WHERE order_id IN (SELECT OrderId FROM @OrderIds);
END;

DECLARE @Ids OrderIdList;
INSERT INTO @Ids VALUES (1), (2), (5), (10);
EXEC sp_GetMultipleOrders @Ids;
```

---

#### 21. How do you handle errors in stored procedures?

**Answer:**

Use **TRY-CATCH** blocks to handle errors in stored procedures.

**Example:**

```sql
CREATE PROCEDURE sp_TransferMoney
    @FromAccount INT,
    @ToAccount INT,
    @Amount DECIMAL(10,2)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        -- Check balance
        IF (SELECT balance FROM accounts WHERE account_id = @FromAccount) < @Amount
            RAISERROR('Insufficient funds', 16, 1);
        
        -- Debit from account
        UPDATE accounts SET balance = balance - @Amount
        WHERE account_id = @FromAccount;
        
        -- Credit to account
        UPDATE accounts SET balance = balance + @Amount
        WHERE account_id = @ToAccount;
        
        -- Log transaction
        INSERT INTO transaction_log VALUES (@FromAccount, @ToAccount, @Amount, GETDATE());
        
        COMMIT TRANSACTION;
        
        RETURN 0;  -- Success
        
    END TRY
    BEGIN CATCH
        ROLLBACK TRANSACTION;
        
        DECLARE @ErrorMessage NVARCHAR(MAX) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        
        RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState);
        
        -- Log error
        INSERT INTO error_log (procedure_name, error_message, error_time)
        VALUES ('sp_TransferMoney', @ErrorMessage, GETDATE());
        
        RETURN -1;  -- Failure
    END CATCH
END;

-- Execute
DECLARE @Result INT;
EXEC @Result = sp_TransferMoney 1, 2, 500;

IF @Result = 0
    PRINT 'Transfer successful';
ELSE
    PRINT 'Transfer failed';
```

---

#### 22. Explain the difference between EXEC and sp_executesql

**Answer:**

| Aspect | EXEC | sp_executesql |
|--------|------|---------------|
| **Parameterization** | String concat (vulnerable) | Parameterized (safe) |
| **SQL Injection** | Vulnerable | Protected |
| **Plan Cache** | Separate plans per query | Reuses plans |
| **Performance** | Slower (recompile) | Faster (cached) |
| **Type Checking** | None | Type checking |

**EXEC (Vulnerable to SQL Injection):**

```sql
-- BAD: String concatenation (SQL injection risk)
DECLARE @DeptId INT = 2;
DECLARE @SQL NVARCHAR(MAX) = 'SELECT * FROM employees WHERE dept_id = ' + CAST(@DeptId AS VARCHAR);
EXEC (@SQL);

-- SQL Injection example
DECLARE @DeptId NVARCHAR(MAX) = '2; DROP TABLE employees;--';
DECLARE @SQL NVARCHAR(MAX) = 'SELECT * FROM employees WHERE dept_id = ' + @DeptId;
EXEC (@SQL);
-- Executes: SELECT * FROM employees WHERE dept_id = 2; DROP TABLE employees;--
-- Deletes the table!
```

**sp_executesql (Secure with Parameters):**

```sql
-- GOOD: Parameterized query
DECLARE @DeptId INT = 2;
DECLARE @SQL NVARCHAR(MAX) = 'SELECT * FROM employees WHERE dept_id = @DeptId';
DECLARE @Parameters NVARCHAR(MAX) = '@DeptId INT';

EXEC sp_executesql @SQL, @Parameters, @DeptId = @DeptId;

-- SQL Injection prevented
DECLARE @DeptId NVARCHAR(MAX) = '2; DROP TABLE employees;--';
DECLARE @SQL NVARCHAR(MAX) = 'SELECT * FROM employees WHERE dept_id = @DeptId';
DECLARE @Parameters NVARCHAR(MAX) = '@DeptId INT';

EXEC sp_executesql @SQL, @Parameters, @DeptId = @DeptId;
-- Treated as string '2; DROP TABLE employees;--'
-- No injection possible

-- With multiple parameters and types
DECLARE @SQL NVARCHAR(MAX) = '
    SELECT * FROM orders
    WHERE customer_id = @CustomerId
      AND order_date >= @StartDate
      AND amount > @MinAmount';

DECLARE @Parameters NVARCHAR(MAX) = '
    @CustomerId INT,
    @StartDate DATETIME,
    @MinAmount DECIMAL(10,2)';

EXEC sp_executesql
    @SQL,
    @Parameters,
    @CustomerId = 100,
    @StartDate = '2024-01-01',
    @MinAmount = 1000;
```

---

#### 23. Explain the concept of dynamic SQL

**Answer:**

**Dynamic SQL** is SQL statements constructed and executed at runtime based on conditions.

**Use Cases:**
- Search filters (optional criteria)
- Generate reports from parameters
- Administrative tools
- Dynamic table/column references

**Examples:**

```sql
-- Build query based on parameters
CREATE PROCEDURE sp_SearchOrders
    @CustomerId INT = NULL,
    @Status VARCHAR(20) = NULL,
    @MinAmount DECIMAL(10,2) = NULL
AS
BEGIN
    DECLARE @SQL NVARCHAR(MAX) = 'SELECT * FROM orders WHERE 1=1';
    DECLARE @Parameters NVARCHAR(MAX) = '';
    
    -- Add conditions dynamically
    IF @CustomerId IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND customer_id = @CustomerId';
        SET @Parameters = @Parameters + ', @CustomerId INT';
    END;
    
    IF @Status IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND status = @Status';
        SET @Parameters = @Parameters + ', @Status VARCHAR(20)';
    END;
    
    IF @MinAmount IS NOT NULL
    BEGIN
        SET @SQL = @SQL + ' AND amount > @MinAmount';
        SET @Parameters = @Parameters + ', @MinAmount DECIMAL(10,2)';
    END;
    
    -- Remove leading comma from parameters
    IF LEN(@Parameters) > 0
        SET @Parameters = SUBSTRING(@Parameters, 3, LEN(@Parameters));
    
    -- Execute
    IF LEN(@Parameters) > 0
        EXEC sp_executesql @SQL, @Parameters,
            @CustomerId = @CustomerId,
            @Status = @Status,
            @MinAmount = @MinAmount;
    ELSE
        EXEC (@SQL);
END;

-- Execute with different parameter combinations
EXEC sp_SearchOrders;  -- All orders
EXEC sp_SearchOrders @CustomerId = 100;  -- One customer
EXEC sp_SearchOrders @Status = 'Shipped', @MinAmount = 1000;  -- Filtered
```

**Best Practice: Use sp_executesql**

```sql
-- SAFE dynamic SQL (always parameterized)
CREATE PROCEDURE sp_DynamicSearch
    @TableName NVARCHAR(128),
    @ColumnName NVARCHAR(128),
    @SearchValue NVARCHAR(MAX)
AS
BEGIN
    -- Validate inputs (prevent injection)
    IF @TableName NOT IN ('employees', 'customers', 'orders')
        RAISERROR('Invalid table', 16, 1);
    
    DECLARE @SQL NVARCHAR(MAX);
    SET @SQL = 'SELECT * FROM ' + QUOTENAME(@TableName) +
               ' WHERE ' + QUOTENAME(@ColumnName) + ' = @Value';
    
    EXEC sp_executesql @SQL,
        N'@Value NVARCHAR(MAX)',
        @Value = @SearchValue;
END;
```

---

### Triggers

#### 24. What are triggers and when would you use them?

**Answer:**

A **trigger** is a special type of stored procedure that automatically executes in response to events (INSERT, UPDATE, DELETE) on a specific table.

**When to Use:**
- Enforce complex business rules
- Maintain derived/calculated columns
- Audit/log changes
- Enforce referential integrity
- Update denormalized data
- Validate data (complex constraints)

**Types:**

1. **AFTER trigger**: Executes after event
2. **INSTEAD OF trigger**: Replaces event

**Example:**

```sql
-- Audit logging trigger
CREATE TRIGGER tr_audit_employee_changes
ON employees
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    INSERT INTO audit_log (
        table_name,
        action,
        record_id,
        old_values,
        new_values,
        changed_by,
        changed_date
    )
    SELECT 'employees', 'INSERT', i.emp_id, NULL, 
           'Name: ' + i.name + ', Salary: ' + CAST(i.salary AS VARCHAR),
           USER_NAME(), GETDATE()
    FROM inserted i
    WHERE NOT EXISTS (SELECT * FROM deleted);
    
    SELECT 'employees', 'UPDATE', i.emp_id,
           'Salary: ' + CAST(d.salary AS VARCHAR),
           'Salary: ' + CAST(i.salary AS VARCHAR),
           USER_NAME(), GETDATE()
    FROM inserted i
    JOIN deleted d ON i.emp_id = d.emp_id;
    
    SELECT 'employees', 'DELETE', d.emp_id,
           'Name: ' + d.name + ', Salary: ' + CAST(d.salary AS VARCHAR),
           NULL, USER_NAME(), GETDATE()
    FROM deleted d
    WHERE NOT EXISTS (SELECT * FROM inserted);
END;

-- Maintain derived column trigger
CREATE TRIGGER tr_update_dept_emp_count
ON employees
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    -- Update employee count in departments table
    UPDATE departments
    SET emp_count = (SELECT COUNT(*) FROM employees WHERE dept_id = departments.dept_id)
    WHERE dept_id IN (SELECT dept_id FROM inserted UNION SELECT dept_id FROM deleted);
END;

-- Enforce complex business rule
CREATE TRIGGER tr_validate_salary_increase
ON employees
AFTER UPDATE
AS
BEGIN
    IF EXISTS (
        SELECT * FROM inserted i
        JOIN deleted d ON i.emp_id = d.emp_id
        WHERE (i.salary - d.salary) > d.salary * 0.20  -- >20% increase
    )
    BEGIN
        RAISERROR('Salary increase cannot exceed 20%', 16, 1);
        ROLLBACK;
    END;
END;

-- INSTEAD OF trigger for handling modifications on view
CREATE VIEW vw_active_employees AS
SELECT emp_id, name, salary
FROM employees
WHERE status = 'Active';

CREATE TRIGGER tr_insert_active_employees
ON vw_active_employees
INSTEAD OF INSERT
AS
BEGIN
    INSERT INTO employees (emp_id, name, salary, status)
    SELECT emp_id, name, salary, 'Active'
    FROM inserted;
END;

-- Create/Update trigger example
CREATE TRIGGER tr_set_modified_date
ON employees
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE employees
    SET modified_date = GETDATE()
    WHERE emp_id IN (SELECT emp_id FROM inserted);
END;
```

---

## Data Integrity and Constraints

#### 25. How do you enforce data integrity in SQL?

**Answer:**

**Data integrity** is enforced through multiple levels:

**1. Column Level (Domain Integrity)**

```sql
CREATE TABLE employees (
    emp_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    salary DECIMAL(10,2) CHECK (salary > 0),
    birth_date DATE CHECK (birth_date < GETDATE()),
    status VARCHAR(20) DEFAULT 'Active',
    department_id INT
);
```

**2. Table Level (Entity Integrity)**

```sql
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,  -- Unique, Not NULL
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    CONSTRAINT pk_employees PRIMARY KEY (emp_id),
    CONSTRAINT uq_email UNIQUE (email)
);
```

**3. Referential Integrity**

```sql
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    amount DECIMAL(10,2),
    CONSTRAINT fk_customer FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
```

**4. Triggers (Business Logic)**

```sql
CREATE TRIGGER tr_check_budget
ON expenses
BEFORE INSERT
AS
BEGIN
    IF (SELECT SUM(amount) FROM expenses) + 
       (SELECT amount FROM inserted) > 100000
    BEGIN
        RAISERROR('Budget exceeded', 16, 1);
        ROLLBACK;
    END;
END;
```

---

#### 26. Explain referential integrity and how it's maintained

**Answer:**

**Referential Integrity** ensures that foreign key values always reference existing primary key values.

**Mechanisms:**

1. **Foreign Key Constraint**
2. **Cascade Operations**
3. **Triggers**
4. **Application Logic**

**Example:**

```sql
-- Parent table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100)
);

-- Child table with FK
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    customer_id INT NOT NULL,
    amount DECIMAL(10,2),
    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
);

-- INSERT with valid FK (allowed)
INSERT INTO customers VALUES (1, 'John');
INSERT INTO orders VALUES (1001, 1, 500);  -- OK

-- INSERT with invalid FK (rejected)
INSERT INTO orders VALUES (1002, 999, 500);
-- ERROR: Foreign key violation

-- DELETE parent with CASCADE
DELETE FROM customers WHERE customer_id = 1;
-- Also deletes: order 1001 (cascade)

-- ON DELETE options:
-- CASCADE: Delete child rows
-- SET NULL: Set FK to NULL
-- SET DEFAULT: Set FK to default value
-- NO ACTION: Reject if child exists (default)
-- RESTRICT: Similar to NO ACTION
```

---

## Transactions and Concurrency

### Transaction Fundamentals

#### 27. What are the different transaction isolation levels in SQL?

**Answer:**

**Isolation Levels** control how transactions interact during concurrent execution.

| Level | Dirty Read | Non-Repeatable Read | Phantom Read |
|-------|---|---|---|
| **Read Uncommitted** | Possible | Possible | Possible |
| **Read Committed** | No | Possible | Possible |
| **Repeatable Read** | No | No | Possible |
| **Serializable** | No | No | No |

**1. Read Uncommitted (Lowest)**

```sql
-- Transaction A
BEGIN TRANSACTION;
UPDATE accounts SET balance = 100 WHERE id = 1;
-- NOT COMMITTED yet

-- Transaction B
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE id = 1;
-- Returns 100 (uncommitted, dirty read!)
COMMIT;

-- Transaction A rolls back
ROLLBACK;
-- Transaction B read data that never existed
```

**2. Read Committed (Default)**

```sql
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

-- Transaction A
BEGIN TRANSACTION;
UPDATE accounts SET balance = 100 WHERE id = 1;
COMMIT;

-- Transaction B
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE id = 1;
-- Returns 100 (committed, OK)

-- Transaction A
UPDATE accounts SET balance = 200 WHERE id = 1;
COMMIT;

-- Transaction B
SELECT balance FROM accounts WHERE id = 1;
-- Returns 200 (non-repeatable read: same query, different result!)
COMMIT;
```

**3. Repeatable Read**

```sql
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;

-- Transaction A
BEGIN TRANSACTION;
SELECT balance FROM accounts WHERE id = 1;  -- Returns 100
-- Holds read lock on row

-- Transaction B
BEGIN TRANSACTION;
UPDATE accounts SET balance = 200 WHERE id = 1;
-- Blocked by lock from Transaction A
COMMIT;

-- Transaction A
SELECT balance FROM accounts WHERE id = 1;  -- Still 100 (repeatable)
COMMIT;

-- Transaction B
SELECT balance FROM accounts WHERE id = 1;  -- Now 200
COMMIT;
```

**4. Serializable (Highest)**

```sql
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

-- Transaction A
BEGIN TRANSACTION;
SELECT COUNT(*) FROM orders WHERE customer = 'John';  -- 5 rows
-- Holds range lock

-- Transaction B
BEGIN TRANSACTION;
INSERT INTO orders VALUES (999, 'John', 500);
-- Blocked by range lock from Transaction A
COMMIT;

-- Transaction A
SELECT COUNT(*) FROM orders WHERE customer = 'John';  -- Still 5
COMMIT;

-- Transaction B's INSERT now completes
SELECT COUNT(*) FROM orders WHERE customer = 'John';  -- 6 rows
```

---

#### 28. Explain the problems that can occur in concurrent transactions

**Answer:**

| Problem | Description | Level Prevented |
|---------|---|---|
| **Dirty Read** | Read uncommitted data | Read Uncommitted |
| **Non-Repeatable Read** | Same query returns different results | Repeatable Read |
| **Phantom Read** | New rows added between reads | Serializable |
| **Lost Update** | Two updates, one lost | Depends on locking |

**Dirty Read Example:**

```sql
-- Transaction A
BEGIN TRANSACTION;
UPDATE account SET balance = balance + 100 WHERE id = 1;
-- balance now 500

-- Transaction B (READ UNCOMMITTED)
BEGIN TRANSACTION;
SELECT balance FROM account WHERE id = 1;
-- Returns 500 (uncommitted!)
PRINT 'Balance: ' + CAST(balance AS VARCHAR);

-- Transaction A rolls back
ROLLBACK;
-- Balance reverts to 400

-- Transaction B used non-existent value!
```

**Non-Repeatable Read Example:**

```sql
-- Transaction A
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN TRANSACTION;
SELECT salary FROM employees WHERE id = 1;  -- Returns 50000
WAITFOR DELAY '00:00:01';  -- Wait 1 second
SELECT salary FROM employees WHERE id = 1;  -- Returns 55000!

-- Transaction B (meanwhile)
UPDATE employees SET salary = 55000 WHERE id = 1;
COMMIT;

-- Transaction A got different values in same transaction
COMMIT;
```

**Phantom Read Example:**

```sql
-- Transaction A
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
BEGIN TRANSACTION;
SELECT COUNT(*) FROM orders WHERE status = 'Pending';  -- Returns 10

-- Transaction B (INSERT new pending order)
INSERT INTO orders VALUES (9999, 'Pending', 500);
COMMIT;

-- Transaction A
SELECT COUNT(*) FROM orders WHERE status = 'Pending';  -- Returns 11 (phantom!)
-- New row appeared even though repeatable read

COMMIT;
```

**Lost Update Example:**

```sql
-- Transaction A
READ balance = 100
balance = balance + 50  (in code)
balance now = 150

-- Transaction B (concurrent)
READ balance = 100
balance = balance + 25  (in code)
balance now = 125

-- Both write
WRITE 150 (Transaction A)
WRITE 125 (Transaction B)  -- Overwrites A!

-- Final balance: 125 (should be 175)
-- Transaction A's update lost!
```

---

#### 29. What is deadlock and how can it be prevented?

**Answer:**

A **deadlock** occurs when two or more transactions wait for each other to release locks, creating a circular dependency.

**Example Deadlock:**

```sql
-- Transaction A
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- Holds lock on account 1

-- Transaction B (concurrent)
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- Holds lock on account 2

-- Transaction A tries to access account 2
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
-- BLOCKED (waiting for Transaction B's lock)

-- Transaction B tries to access account 1
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
-- BLOCKED (waiting for Transaction A's lock)

-- DEADLOCK! Both waiting for each other
-- SQL Server detects and kills one transaction
-- Error: "Deadlock detected"
```

**Prevention Strategies:**

**1. Access Resources in Consistent Order**

```sql
-- PROBLEM (can deadlock)
-- Transaction A: Access 1, then 2
-- Transaction B: Access 2, then 1

-- SOLUTION: Always access in same order
CREATE PROCEDURE sp_TransferMoney @From INT, @To INT, @Amount DECIMAL
AS
BEGIN
    -- Always access in order (FROM then TO)
    IF @From > @To
        SELECT @From AS tmp, @To = @From, @From = tmp;
    
    BEGIN TRANSACTION;
    
    UPDATE accounts SET balance = balance - @Amount WHERE id = @From;
    UPDATE accounts SET balance = balance + @Amount WHERE id = @To;
    
    COMMIT;
END;

-- Now both transactions access accounts in same order
-- No deadlock possible
```

**2. Use Shorter Transactions**

```sql
-- PROBLEM: Long transaction holds locks longer
BEGIN TRANSACTION;
SELECT * FROM orders WHERE id = 1001;  -- Lock acquired
WAITFOR DELAY '00:01:00';  -- Hold lock for 1 minute
UPDATE orders SET status = 'Shipped';  -- Release lock
COMMIT;

-- SOLUTION: Minimize transaction duration
BEGIN TRANSACTION;
UPDATE orders SET status = 'Shipped' WHERE id = 1001;
COMMIT;
-- Lock held only milliseconds
```

**3. Use Lower Isolation Level**

```sql
-- PROBLEM: Serializable locks everything
SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
BEGIN TRANSACTION;
SELECT * FROM accounts;  -- Locks entire table!
-- Other transactions blocked

-- SOLUTION: Use Read Committed
SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
BEGIN TRANSACTION;
SELECT * FROM accounts;  -- Only locks read rows
COMMIT;
```

**4. Use Timeout and Retry**

```sql
CREATE PROCEDURE sp_WithDeadlockRetry @MaxRetries INT = 3
AS
BEGIN
    DECLARE @Attempt INT = 0;
    DECLARE @Success BIT = 0;
    
    WHILE @Attempt < @MaxRetries AND @Success = 0
    BEGIN
        BEGIN TRY
            BEGIN TRANSACTION;
            
            -- Your transaction logic
            UPDATE accounts SET balance = balance - 100 WHERE id = 1;
            UPDATE accounts SET balance = balance + 100 WHERE id = 2;
            
            COMMIT;
            SET @Success = 1;
        END TRY
        BEGIN CATCH
            IF ERROR_NUMBER() = 1205  -- Deadlock
            BEGIN
                ROLLBACK;
                SET @Attempt = @Attempt + 1;
                WAITFOR DELAY '00:00:01';  -- Brief wait before retry
            END
            ELSE
            BEGIN
                RAISERROR(ERROR_MESSAGE(), 16, 1);
                RETURN;
            END;
        END CATCH;
    END;
    
    IF @Success = 0
        RAISERROR('Transaction failed after retries', 16, 1);
END;
```

**5. Monitoring Deadlocks**

```sql
-- SQL Server: Trace Flag 1222 (log deadlock graph)
DBCC TRACEON (1222, -1);

-- Check deadlock graph in error log
SELECT * FROM sys.dm_tran_locks
WHERE request_status = 'WAIT';

-- View blocking chains
SELECT * FROM sys.dm_exec_requests
WHERE wait_type IS NOT NULL;

-- Kill blocking session
KILL 53;  -- Session ID
```

---

## Database Design

### Design Principles

#### 30. What are entity-relationship diagrams (ERDs) and how are they used?

**Answer:**

An **Entity-Relationship Diagram (ERD)** is a visual representation of database structure showing entities, attributes, and relationships.

**Components:**

1. **Entity**: Table (rectangle)
2. **Attribute**: Column (oval)
3. **Relationship**: Connection between entities (diamond)
4. **Cardinality**: Multiplicity of relationship (1:1, 1:M, M:M)

**Example ERD:**

```
┌─────────────────┐
│   CUSTOMERS     │
├─────────────────┤
│ customer_id (PK)│
│ name            │
│ email           │
│ city            │
└────────┬────────┘
         │ 1
         │ has
         │ M
         ▼
┌─────────────────┐
│    ORDERS       │
├─────────────────┤
│ order_id (PK)   │
│ customer_id (FK)│
│ order_date      │
│ amount          │
└────────┬────────┘
         │ 1
         │ contains
         │ M
         ▼
┌──────────────────┐
│  ORDER_ITEMS     │
├──────────────────┤
│ order_item_id(PK)│
│ order_id (FK)    │
│ product_id (FK)  │
│ quantity         │
│ price            │
└──────────────────┘

Relationships:
- 1 Customer has Many Orders (1:M)
- 1 Order contains Many Items (1:M)
- 1 Product appears in Many Items (1:M)
```

**Cardinality Notations:**

```
1:1 (One-to-One)
┌──────┐    ─────    ┌──────┐
│User  │────────────│Profile│
└──────┘            └──────┘
(One user has exactly one profile)

1:M (One-to-Many)
┌──────┐    ─────    ┌──────┐
│Author│───M────1────│Books │
└──────┘            └──────┘
(One author writes many books)

M:M (Many-to-Many)
┌──────┐    ─────    ┌──────┐
│Student│───M───M──┤Course│
└──────┘            └──────┘
(Many students enroll in many courses)
(Requires junction table)
```

**Creating from ERD:**

```sql
-- From the ERD above:

CREATE TABLE customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    city VARCHAR(50)
);

CREATE TABLE orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    order_date DATE NOT NULL,
    amount DECIMAL(10,2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE products (
    product_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    price DECIMAL(10,2)
);

CREATE TABLE order_items (
    order_item_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT,
    price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

---

### Normalization vs Denormalization

#### 31. Explain the concept of database normalization and its levels

**Answer:**

**Normalization** is the process of organizing data to eliminate redundancy and improve data integrity.

**1NF (First Normal Form): Atomic Values**

```sql
-- NOT 1NF (multi-valued column)
CREATE TABLE employees_bad (
    emp_id INT,
    name VARCHAR(100),
    skills VARCHAR(500)  -- 'SQL, Python, Java' (not atomic)
);

-- 1NF (atomic values)
CREATE TABLE employees (
    emp_id INT,
    name VARCHAR(100)
);

CREATE TABLE skills (
    emp_id INT,
    skill VARCHAR(50),
    FOREIGN KEY (emp_id) REFERENCES employees(emp_id)
);

-- Data:
-- employees: 1, John
-- skills: 1, SQL
-- skills: 1, Python
-- skills: 1, Java
```

**2NF (Second Normal Form): No Partial Dependencies**

```sql
-- NOT 2NF (partial dependency)
CREATE TABLE orders_bad (
    order_id INT,
    product_id INT,
    product_name VARCHAR(100),  -- Depends on product_id, not both
    customer_id INT,
    customer_name VARCHAR(100), -- Depends on customer_id, not both
    quantity INT,
    PRIMARY KEY (order_id, product_id)
);

-- 2NF (full dependency)
CREATE TABLE orders (
    order_id INT,
    customer_id INT,
    order_date DATE,
    PRIMARY KEY (order_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE order_items (
    order_item_id INT,
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_item_id),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE customers (customer_id INT PRIMARY KEY, name VARCHAR(100));
CREATE TABLE products (product_id INT PRIMARY KEY, name VARCHAR(100));
```

**3NF (Third Normal Form): No Transitive Dependencies**

```sql
-- NOT 3NF (transitive dependency)
-- emp_id → dept_id → dept_name (salary depends on dept, not directly on emp)
CREATE TABLE employees_bad (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    dept_name VARCHAR(50),  -- Can be derived from dept_id
    dept_budget DECIMAL(12,2)  -- Also depends on dept_id
);

-- 3NF (no transitive)
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES departments(dept_id)
);

CREATE TABLE departments (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50),
    dept_budget DECIMAL(12,2)
);
```

---

#### 32. When would you denormalize a database schema?

**Answer:**

**Denormalization** intentionally adds redundancy for performance benefits, primarily in read-heavy systems.

**When to Denormalize:**

1. **Read-Heavy Workloads**
   - Data warehouses
   - Reporting systems
   - Analytical queries
   - BI applications

2. **Performance-Critical Queries**
   - Frequent aggregations
   - Complex joins on large tables
   - Summary data accessed repeatedly

3. **Historical/Snapshot Data**
   - Store snapshots instead of recalculating
   - Slowly changing dimensions
   - Time-series data

**Example:**

```sql
-- Normalized (3NF)
CREATE TABLE sales (
    sale_id INT PRIMARY KEY,
    product_id INT,
    customer_id INT,
    order_date DATE,
    amount DECIMAL(10,2)
);

-- Query requires multiple JOINs
SELECT 
    c.customer_name,
    p.product_name,
    SUM(s.amount) AS total_sales,
    AVG(s.amount) AS avg_sale
FROM sales s
JOIN customers c ON s.customer_id = c.customer_id
JOIN products p ON s.product_id = p.product_id
GROUP BY c.customer_id, p.product_id;

-- Denormalized (for reporting)
CREATE TABLE sales_summary (
    sale_id INT PRIMARY KEY,
    product_id INT,
    product_name VARCHAR(100),  -- Redundant (from products)
    customer_id INT,
    customer_name VARCHAR(100),  -- Redundant (from customers)
    order_date DATE,
    amount DECIMAL(10,2),
    product_category VARCHAR(50)  -- Redundant
);

-- Same query becomes simple
SELECT 
    customer_name,
    product_name,
    SUM(amount) AS total_sales,
    AVG(amount) AS avg_sale
FROM sales_summary
GROUP BY customer_id, product_id;
```

**Denormalization Techniques:**

1. **Column Duplication**
```sql
-- Instead of joining to customer table
CREATE TABLE orders_denorm (
    order_id INT,
    customer_id INT,
    customer_name VARCHAR(100),  -- Duplicated
    customer_city VARCHAR(100),  -- Duplicated
    amount DECIMAL(10,2)
);
```

2. **Derived Columns**
```sql
CREATE TABLE order_summary (
    order_id INT,
    order_date DATE,
    total_items INT,  -- Derived from count
    total_amount DECIMAL(10,2),  -- Derived from sum
    avg_item_price DECIMAL(10,2)  -- Derived
);
```

3. **Summary Tables**
```sql
CREATE TABLE daily_sales_summary (
    sale_date DATE,
    total_sales DECIMAL(12,2),
    total_orders INT,
    avg_order_value DECIMAL(10,2),
    unique_customers INT
);
```

**Maintenance Strategy:**

```sql
-- Update denormalized data after source changes
CREATE TRIGGER tr_update_sales_summary
ON sales
AFTER INSERT, UPDATE
AS
BEGIN
    UPDATE sales_summary
    SET customer_name = c.name,
        product_name = p.name
    FROM sales_summary ss
    JOIN inserted i ON ss.sale_id = i.sale_id
    JOIN customers c ON i.customer_id = c.customer_id
    JOIN products p ON i.product_id = p.product_id;
END;
```

---

### Advanced Design Patterns

#### 33. Explain slowly changing dimensions and their types

**Answer:**

**Slowly Changing Dimensions (SCD)** handle how to track changes in dimension data over time.

**Type 1: Overwrite (No History)**

```sql
-- Original
CREATE TABLE customer_dim (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(50),
    version INT
);

-- Customer moves from NYC to LA
-- Type 1: Just update (no history)
UPDATE customer_dim
SET city = 'LA', version = 2
WHERE customer_id = 1;

-- Problem: Lost historical data
-- Analysis from past shows customer from LA (incorrect)
```

**Type 2: Add New Row (Full History)**

```sql
-- Create version of customer for each change
CREATE TABLE customer_dim (
    customer_dim_id INT PRIMARY KEY,  -- Surrogate key
    customer_id INT,                  -- Natural key
    name VARCHAR(100),
    city VARCHAR(50),
    start_date DATE,
    end_date DATE,
    is_current BIT,
    version INT
);

-- Insert: 1, 'John', 'NYC', 2020-01-01, NULL, 1, 1
INSERT INTO customer_dim VALUES (1, 1, 'John', 'NYC', '2020-01-01', NULL, 1, 1);

-- Customer moves to LA (Type 2)
UPDATE customer_dim SET end_date = '2024-12-31', is_current = 0
WHERE customer_id = 1 AND is_current = 1;

INSERT INTO customer_dim VALUES (2, 1, 'John', 'LA', '2025-01-01', NULL, 1, 2);

-- Result: Historical data preserved
-- 2020-2024: John in NYC
-- 2025+: John in LA
```

**Type 3: Add Column (Limited History)**

```sql
-- Store current and previous value
CREATE TABLE customer_dim (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    current_city VARCHAR(50),
    previous_city VARCHAR(50),
    current_version INT,
    previous_version INT,
    city_change_date DATE
);

-- Initial
INSERT INTO customer_dim VALUES (1, 'John', 'NYC', NULL, 1, NULL, '2020-01-01');

-- Update (Type 3)
UPDATE customer_dim
SET previous_city = current_city,
    current_city = 'LA',
    city_change_date = GETDATE(),
    current_version = 2
WHERE customer_id = 1;

-- Can only see: Current (LA) and Previous (NYC)
-- History beyond 1 step lost
```

**SQL Server Temporal Tables (Modern Type 2)**

```sql
-- Create temporal table
CREATE TABLE customers (
    customer_id INT PRIMARY KEY,
    name VARCHAR(100),
    city VARCHAR(50),
    SysStartTime DATETIME2 GENERATED ALWAYS AS ROW START,
    SysEndTime DATETIME2 GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime)
)
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.customers_history));

-- Update (automatic versioning)
UPDATE customers SET city = 'LA' WHERE customer_id = 1;

-- Query current data
SELECT * FROM customers WHERE customer_id = 1;
-- Returns: LA (current)

-- Query historical data
SELECT * FROM customers FOR SYSTEM_TIME AS OF '2024-01-01'
WHERE customer_id = 1;
-- Returns: NYC (as of date)

-- View history
SELECT * FROM customers_history WHERE customer_id = 1;
-- Shows all versions with timestamps
```

---

#### 34. Explain the concept of database sharding

**Answer:**

**Database Sharding** distributes data across multiple databases/servers based on a shard key (partition key).

**Benefits:**
- Horizontal scalability
- Reduced database load
- Better performance
- Geographic distribution

**Sharding Strategies:**

**1. Range-based Sharding**

```sql
-- Shard by customer_id ranges
-- Shard 1: customer_id 1-1000
-- Shard 2: customer_id 1001-2000
-- Shard 3: customer_id 2001-3000

-- Shard 1
CREATE DATABASE orders_shard1;
USE orders_shard1;
CREATE TABLE orders (
    order_id INT,
    customer_id INT,  -- Range: 1-1000
    amount DECIMAL(10,2)
);

-- Shard 2
CREATE DATABASE orders_shard2;
USE orders_shard2;
CREATE TABLE orders (
    order_id INT,
    customer_id INT,  -- Range: 1001-2000
    amount DECIMAL(10,2)
);

-- Application logic
FUNCTION GetShardConnection(customerId):
    IF customerId <= 1000:
        RETURN connection_to_shard1
    ELSE IF customerId <= 2000:
        RETURN connection_to_shard2
    ELSE:
        RETURN connection_to_shard3
```

**2. Hash-based Sharding**

```sql
-- Shard key = HASH(customer_id) % num_shards

-- Application
FUNCTION GetShardId(customerId):
    RETURN HASH(customerId) % 3  // Assume 3 shards

-- Example
customer_id = 100
shard_id = HASH(100) % 3 = 0  // Goes to Shard 0

customer_id = 200
shard_id = HASH(200) % 3 = 1  // Goes to Shard 1

customer_id = 300
shard_id = HASH(300) % 3 = 2  // Goes to Shard 2
```

**3. Directory-based Sharding**

```sql
-- Maintain lookup table
CREATE TABLE shard_directory (
    customer_id INT PRIMARY KEY,
    shard_id INT,
    shard_server VARCHAR(100)
);

-- Application
FUNCTION GetShardConnection(customerId):
    shardId = SELECT shard_id FROM shard_directory
              WHERE customer_id = customerId
    RETURN connection_to_shard[shardId]
```

---

#### 35. Explain the role of surrogate keys versus natural keys

**Answer:**

**Surrogate Key**: Artificial, system-generated key (INT IDENTITY)
**Natural Key**: Business key using actual data (Email, SSN)

| Aspect | Surrogate | Natural |
|--------|---|---|
| **Source** | System-generated | Business data |
| **Stability** | Never changes | May change |
| **Size** | Small (INT) | Variable |
| **Meaning** | No business meaning | Meaningful |
| **Index** | Efficient (small) | Variable efficiency |

**Example:**

```sql
-- NATURAL KEY (email as PK)
CREATE TABLE users_natural (
    email VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(20)
);

-- Problem: Email changes require PK update
UPDATE users_natural SET email = 'newemail@example.com'
WHERE email = 'oldemail@example.com';
-- Cascades to foreign keys in other tables

-- SURROGATE KEY (INT PK)
CREATE TABLE users_surrogate (
    user_id INT PRIMARY KEY IDENTITY,
    email VARCHAR(100) UNIQUE,
    name VARCHAR(100),
    phone VARCHAR(20)
);

-- Email change is simple (no PK change)
UPDATE users_surrogate SET email = 'newemail@example.com'
WHERE user_id = 1;
-- No cascade impact

-- Foreign key references
CREATE TABLE orders (
    order_id INT PRIMARY KEY,
    user_id INT,  -- References surrogate key (stable)
    amount DECIMAL(10,2),
    FOREIGN KEY (user_id) REFERENCES users_surrogate(user_id)
);

-- Best practice: Both surrogate + unique natural key
CREATE TABLE customers (
    customer_id INT PRIMARY KEY IDENTITY,  -- Surrogate
    ssn VARCHAR(11) UNIQUE NOT NULL,       -- Natural key
    email VARCHAR(100) UNIQUE NOT NULL,    -- Natural key
    name VARCHAR(100)
);

-- Use surrogate for FKs (efficient)
-- Use natural keys for lookups (business meaning)
```

---

#### 36. Best practices for designing audit trails

**Answer:**

**Audit Trails** track changes to important data for compliance and forensics.

**Approach 1: Audit Table**

```sql
CREATE TABLE audit_log (
    audit_id INT PRIMARY KEY IDENTITY,
    table_name VARCHAR(100),
    operation VARCHAR(10),  -- INSERT, UPDATE, DELETE
    record_id INT,
    column_name VARCHAR(100),
    old_value NVARCHAR(MAX),
    new_value NVARCHAR(MAX),
    changed_by VARCHAR(100),
    changed_date DATETIME,
    ip_address VARCHAR(15)
);

-- Trigger to populate audit
CREATE TRIGGER tr_audit_employees
ON employees
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    -- Log INSERT
    INSERT INTO audit_log (table_name, operation, record_id, new_value, changed_by, changed_date)
    SELECT 'employees', 'INSERT', i.emp_id,
           'Name: ' + i.name + ', Salary: ' + CAST(i.salary AS VARCHAR),
           USER_NAME(), GETDATE()
    FROM inserted i
    WHERE NOT EXISTS (SELECT * FROM deleted WHERE emp_id = i.emp_id);
    
    -- Log UPDATE (compare old vs new)
    INSERT INTO audit_log (table_name, operation, record_id, column_name, old_value, new_value, changed_by, changed_date)
    SELECT 'employees', 'UPDATE', i.emp_id, 'name',
           d.name, i.name, USER_NAME(), GETDATE()
    FROM inserted i
    JOIN deleted d ON i.emp_id = d.emp_id
    WHERE d.name != i.name;
    
    -- Log DELETE
    INSERT INTO audit_log (table_name, operation, record_id, old_value, changed_by, changed_date)
    SELECT 'employees', 'DELETE', d.emp_id,
           'Name: ' + d.name + ', Salary: ' + CAST(d.salary AS VARCHAR),
           USER_NAME(), GETDATE()
    FROM deleted d
    WHERE NOT EXISTS (SELECT * FROM inserted WHERE emp_id = d.emp_id);
END;
```

**Approach 2: Temporal Tables**

```sql
-- SQL Server 2016+: System-versioned temporal table
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10,2),
    SysStartTime DATETIME2 GENERATED ALWAYS AS ROW START,
    SysEndTime DATETIME2 GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (SysStartTime, SysEndTime)
)
WITH (SYSTEM_VERSIONING = ON (HISTORY_TABLE = dbo.employees_history));

-- Automatic history tracking
UPDATE employees SET salary = 55000 WHERE emp_id = 1;

-- Query current data
SELECT * FROM employees;

-- Query historical data
SELECT * FROM employees FOR SYSTEM_TIME ALL;

-- View history table directly
SELECT * FROM employees_history WHERE emp_id = 1;
```

**Approach 3: Change Data Capture (CDC)**

```sql
-- SQL Server: Enable CDC on database
EXEC sys.sp_cdc_enable_db;

-- Enable CDC on specific table
EXEC sys.sp_cdc_enable_table
    @source_schema = 'dbo',
    @source_name = 'employees',
    @role_name = NULL;

-- Query changes
SELECT * FROM cdc.fn_cdc_get_all_changes_dbo_employees
(@from_lsn = NULL, @to_lsn = NULL, 'all');

-- Returns: __$operation (1=delete, 2=insert, 3=delete old, 4=update)
-- and change data
```

---

## Complete Best Practices Summary

**Index Strategy:**
- Index columns used in WHERE, JOIN, ORDER BY, GROUP BY
- Consider selectivity and cardinality
- Use composite indexes for multi-column queries
- Monitor fragmentation and maintain regularly
- Drop unused indexes

**View Design:**
- Simple views for frequent complex queries
- Security views to restrict columns/rows
- Use indexed views for expensive aggregations
- Document view logic

**Stored Procedure Design:**
- Use parameterized queries (prevent SQL injection)
- Handle errors with TRY-CATCH
- Keep procedures focused
- Use sp_executesql for dynamic SQL
- Test performance regularly

**Transaction Design:**
- Use appropriate isolation level
- Minimize transaction duration
- Access resources in consistent order
- Implement deadlock retry logic
- Log failed transactions

**Database Design:**
- Normalize to 3NF typically
- Denormalize strategically for performance
- Use surrogate keys for PKs, natural keys for uniqueness
- Implement referential integrity via constraints
- Audit important changes
- Design for growth and scalability

---

## Conclusion

Advanced SQL involves understanding the complex interactions between indexes, transactions, constraints, and design patterns. Key principles:

1. **Performance**: Choose right indexes, understand execution plans
2. **Integrity**: Use constraints, triggers, and transactions
3. **Design**: Balance normalization with performance needs
4. **Concurrency**: Handle multi-user scenarios properly
5. **Maintainability**: Clear naming, documentation, audit trails

Master these concepts to design and optimize robust, scalable databases.
