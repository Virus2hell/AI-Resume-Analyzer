# Advanced SQL Concepts, Data Types & Security Interview Guide
## CTEs, PIVOT, JSON, Performance, & Database Administration

## Table of Contents

1. [Advanced SQL Concepts](#advanced-sql-concepts)
   - [CTEs and Temporary Tables](#ctes-and-temporary-tables)
   - [PIVOT and UNPIVOT](#pivot-and-unpivot)
   - [JSON Functions](#json-functions)
   - [Hierarchical Data](#hierarchical-data)
   - [Analytical Functions](#analytical-functions)
2. [Data Types and Functions](#data-types-and-functions)
   - [Data Type Fundamentals](#data-type-fundamentals)
   - [String and Numeric Functions](#string-and-numeric-functions)
   - [Date/Time Functions](#date-time-functions)
   - [User-Defined and Aggregate Functions](#user-defined-and-aggregate-functions)
3. [Security and Administration](#security-and-administration)
   - [SQL Injection Prevention](#sql-injection-prevention)
   - [User Permissions and Roles](#user-permissions-and-roles)
   - [Data Protection](#data-protection)
   - [Backup and Disaster Recovery](#backup-and-disaster-recovery)

---

## Advanced SQL Concepts

### CTEs and Temporary Tables

#### 1. What are CTEs (Common Table Expressions) and how are they different from temporary tables?

**Answer:**

A **CTE (Common Table Expression)** is a temporary named result set accessible only within a single query execution.

A **Temporary Table** is a physical table stored in tempdb that persists during the session.

**Comparison Table:**

| Aspect | CTE | Temporary Table |
|--------|-----|---|
| **Storage** | Memory only | Physical (tempdb) |
| **Lifespan** | Query execution | Session or procedure |
| **Scope** | Single query | Multiple queries |
| **Indexing** | Not supported | Supported |
| **Statistics** | Not maintained | Maintained |
| **Recursion** | Supported | Not supported |
| **Explicit Management** | No (automatic) | Yes (CREATE/DROP) |
| **Performance** | Smaller datasets | Large datasets |

**CTE Example:**

```sql
-- Simple CTE
WITH high_earners AS (
    SELECT emp_id, name, salary
    FROM employees
    WHERE salary > 50000
)
SELECT * FROM high_earners;

-- Multiple CTEs
WITH dept_summary AS (
    SELECT dept_id, COUNT(*) AS emp_count, AVG(salary) AS avg_salary
    FROM employees
    GROUP BY dept_id
),
high_earners AS (
    SELECT emp_id, name, salary
    FROM employees
    WHERE salary > 50000
)
SELECT e.emp_id, e.name, d.emp_count, d.avg_salary
FROM high_earners e
JOIN dept_summary d ON e.dept_id = d.dept_id;

-- Recursive CTE (organizational hierarchy)
WITH org_hierarchy AS (
    -- Anchor member: Root level (employees with no manager)
    SELECT emp_id, name, manager_id, 0 AS hierarchy_level
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive member: Each level of hierarchy
    SELECT e.emp_id, e.name, e.manager_id, oh.hierarchy_level + 1
    FROM employees e
    INNER JOIN org_hierarchy oh ON e.manager_id = oh.emp_id
    WHERE oh.hierarchy_level < 10  -- Prevent infinite recursion
)
SELECT emp_id, name, manager_id, hierarchy_level
FROM org_hierarchy
ORDER BY hierarchy_level, emp_id;
```

**Temporary Table Example:**

```sql
-- Local temporary table (# prefix, session-scoped)
CREATE TABLE #HighEarners (
    emp_id INT,
    name VARCHAR(100),
    salary DECIMAL(10,2)
);

INSERT INTO #HighEarners
SELECT emp_id, name, salary
FROM employees
WHERE salary > 50000;

-- Can be used multiple times in same session
SELECT * FROM #HighEarners WHERE salary > 60000;
SELECT * FROM #HighEarners WHERE name LIKE 'J%';

-- Global temporary table (## prefix, accessible to all sessions)
CREATE TABLE ##GlobalTemp (
    temp_id INT,
    temp_data VARCHAR(100)
);

-- Automatic cleanup
DROP TABLE #HighEarners;

-- With indexes (advantage over CTE)
CREATE TABLE #OptimizedTemp (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    salary DECIMAL(10,2)
);

CREATE INDEX idx_salary ON #OptimizedTemp(salary);

INSERT INTO #OptimizedTemp SELECT emp_id, name, salary FROM employees;

-- Index improves performance
SELECT * FROM #OptimizedTemp WHERE salary > 50000;
```

**When to Use:**

```sql
-- USE CTE for:
-- 1. Simplifying complex queries
-- 2. Recursive queries (hierarchies)
-- 3. One-time use of result set
-- 4. Improving readability

WITH categorized_sales AS (
    SELECT 
        customer_id,
        SUM(amount) AS total_sales,
        CASE 
            WHEN SUM(amount) > 10000 THEN 'High Value'
            WHEN SUM(amount) > 5000 THEN 'Medium Value'
            ELSE 'Low Value'
        END AS category
    FROM orders
    GROUP BY customer_id
)
SELECT * FROM categorized_sales WHERE category = 'High Value';

-- USE TEMPORARY TABLE for:
-- 1. Large datasets (needs indexing)
-- 2. Multiple operations on same data
-- 3. Complex transformations
-- 4. Need for statistics/query plans

CREATE TABLE #StagedData (
    order_id INT,
    customer_id INT,
    amount DECIMAL(10,2),
    processed_date DATETIME
);

INSERT INTO #StagedData
SELECT order_id, customer_id, amount, GETDATE()
FROM orders
WHERE order_date > '2025-01-01';

-- Create indexes
CREATE INDEX idx_customer ON #StagedData(customer_id);
CREATE INDEX idx_amount ON #StagedData(amount);

-- Multiple operations
UPDATE #StagedData SET processed_date = GETDATE() WHERE processed_date IS NULL;
SELECT * FROM #StagedData WHERE amount > 1000;
DELETE FROM #StagedData WHERE amount < 100;

DROP TABLE #StagedData;
```

---

### PIVOT and UNPIVOT

#### 2. Explain the PIVOT and UNPIVOT operators

**Answer:**

**PIVOT** transforms rows into columns (rotates vertical data to horizontal).
**UNPIVOT** transforms columns into rows (rotates horizontal data to vertical).

**PIVOT Example:**

```sql
-- Sample data: Sales by employee and quarter
CREATE TABLE sales (
    employee_id INT,
    employee_name VARCHAR(100),
    quarter VARCHAR(10),
    amount DECIMAL(10,2)
);

INSERT INTO sales VALUES
    (1, 'John', 'Q1', 5000),
    (1, 'John', 'Q2', 6000),
    (1, 'John', 'Q3', 7000),
    (2, 'Jane', 'Q1', 8000),
    (2, 'Jane', 'Q2', 7500),
    (2, 'Jane', 'Q3', 9000);

-- PIVOT: Convert quarters from rows to columns
SELECT 
    employee_id,
    employee_name,
    [Q1] AS Q1_Sales,
    [Q2] AS Q2_Sales,
    [Q3] AS Q3_Sales
FROM (
    SELECT employee_id, employee_name, quarter, amount
    FROM sales
) AS source_data
PIVOT (
    SUM(amount)
    FOR quarter IN ([Q1], [Q2], [Q3])
) AS pivot_table;

-- Result:
-- employee_id | employee_name | Q1_Sales | Q2_Sales | Q3_Sales
-- 1           | John         | 5000     | 6000     | 7000
-- 2           | Jane         | 8000     | 7500     | 9000

-- More complex PIVOT with filtering
SELECT 
    employee_name,
    [Q1] AS Q1,
    [Q2] AS Q2,
    [Q3] AS Q3,
    ([Q1] + [Q2] + [Q3]) AS Total
FROM (
    SELECT employee_name, quarter, amount
    FROM sales
    WHERE amount > 5000
) AS filtered_data
PIVOT (
    AVG(amount)
    FOR quarter IN ([Q1], [Q2], [Q3])
) AS pivot_table
ORDER BY employee_name;
```

**UNPIVOT Example:**

```sql
-- Create pivoted table
CREATE TABLE pivoted_sales (
    employee_name VARCHAR(100),
    Q1_Sales DECIMAL(10,2),
    Q2_Sales DECIMAL(10,2),
    Q3_Sales DECIMAL(10,2)
);

INSERT INTO pivoted_sales VALUES
    ('John', 5000, 6000, 7000),
    ('Jane', 8000, 7500, 9000);

-- UNPIVOT: Convert columns back to rows
SELECT 
    employee_name,
    quarter,
    amount
FROM (
    SELECT employee_name, Q1_Sales, Q2_Sales, Q3_Sales
    FROM pivoted_sales
) AS source_data
UNPIVOT (
    amount FOR quarter IN (Q1_Sales, Q2_Sales, Q3_Sales)
) AS unpivot_table;

-- Result:
-- employee_name | quarter   | amount
-- John          | Q1_Sales  | 5000
-- John          | Q2_Sales  | 6000
-- John          | Q3_Sales  | 7000
-- Jane          | Q1_Sales  | 8000
-- Jane          | Q2_Sales  | 7500
-- Jane          | Q3_Sales  | 9000

-- UNPIVOT with column aliasing
SELECT 
    employee_name,
    REPLACE(quarter, '_Sales', '') AS quarter_code,
    amount
FROM (
    SELECT employee_name, Q1_Sales, Q2_Sales, Q3_Sales
    FROM pivoted_sales
) AS source_data
UNPIVOT (
    amount FOR quarter IN (Q1_Sales, Q2_Sales, Q3_Sales)
) AS unpivot_table;

-- Result:
-- employee_name | quarter_code | amount
-- John          | Q1           | 5000
-- ...

-- Handling NULL values
-- UNPIVOT with INCLUDE NULLS (include NULL values in result)
-- UNPIVOT with EXCLUDE NULLS (skip NULL values, default)
```

---

### JSON Functions

#### 3. What are JSON functions in SQL and how are they used?

**Answer:**

SQL Server provides native JSON functions for storing, querying, and manipulating JSON data within relational databases.

**Core JSON Functions:**

| Function | Purpose |
|----------|---------|
| **JSON_VALUE** | Extract scalar value from JSON |
| **JSON_QUERY** | Extract object/array from JSON |
| **JSON_MODIFY** | Update JSON data |
| **JSON_EXTRACT** | Extract value using path |
| **ISJSON** | Validate JSON format |

**Examples:**

```sql
-- Sample JSON data
DECLARE @customer_json NVARCHAR(MAX) = '{
    "customer_id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "address": {
        "street": "123 Main St",
        "city": "New York",
        "zip": "10001"
    },
    "orders": [
        {"order_id": 101, "amount": 500},
        {"order_id": 102, "amount": 750}
    ]
}';

-- JSON_VALUE: Extract scalar values
SELECT 
    JSON_VALUE(@customer_json, '$.customer_id') AS customer_id,
    JSON_VALUE(@customer_json, '$.name') AS name,
    JSON_VALUE(@customer_json, '$.address.city') AS city;

-- Result: customer_id=1, name=John Doe, city=New York

-- JSON_QUERY: Extract objects/arrays
SELECT 
    JSON_QUERY(@customer_json, '$.address') AS address_object,
    JSON_QUERY(@customer_json, '$.orders') AS orders_array;

-- Result: Returns JSON objects/arrays as text

-- JSON_MODIFY: Update JSON data
-- Update scalar value
SELECT JSON_MODIFY(@customer_json, '$.name', 'Jane Doe') AS updated_json;

-- Add new property
SELECT JSON_MODIFY(@customer_json, '$.phone', '555-1234') AS updated_json;

-- Update nested value
SELECT JSON_MODIFY(@customer_json, '$.address.city', 'Boston') AS updated_json;

-- Delete property (set to NULL)
SELECT JSON_MODIFY(@customer_json, '$.email', NULL) AS updated_json;

-- Append to array
SELECT JSON_MODIFY(@customer_json, '$.orders[append]', 
    JSON_OBJECT('order_id', 103, 'amount', 600)) AS updated_json;

-- ISJSON: Validate JSON
SELECT ISJSON(@customer_json);  -- Returns 1 (valid)
SELECT ISJSON('not json');      -- Returns 0 (invalid)

-- Working with JSON arrays
DECLARE @orders_json NVARCHAR(MAX) = '[
    {"order_id": 1, "amount": 100},
    {"order_id": 2, "amount": 200},
    {"order_id": 3, "amount": 300}
]';

-- Extract from array
SELECT 
    JSON_VALUE(@orders_json, '$[0].order_id') AS first_order_id,
    JSON_VALUE(@orders_json, '$[1].amount') AS second_order_amount;

-- Cross apply with JSON array
SELECT 
    JSON_VALUE(order_value, '$.order_id') AS order_id,
    JSON_VALUE(order_value, '$.amount') AS amount
FROM OPENJSON(@orders_json) AS order_items(order_value NVARCHAR(MAX));

-- Store and query JSON columns
CREATE TABLE customers_json (
    customer_id INT PRIMARY KEY,
    customer_data NVARCHAR(MAX)
);

INSERT INTO customers_json VALUES
    (1, '{"name":"John","email":"john@example.com"}'),
    (2, '{"name":"Jane","email":"jane@example.com"}');

-- Query JSON column
SELECT 
    customer_id,
    JSON_VALUE(customer_data, '$.name') AS name,
    JSON_VALUE(customer_data, '$.email') AS email
FROM customers_json;

-- Update JSON column
UPDATE customers_json
SET customer_data = JSON_MODIFY(customer_data, '$.email', 'newemail@example.com')
WHERE customer_id = 1;

-- Filter by JSON value
SELECT * FROM customers_json
WHERE JSON_VALUE(customer_data, '$.name') = 'John';
```

---

### Hierarchical Data

#### 4. How do you handle hierarchical data in SQL?

**Answer:**

Hierarchical data (parent-child relationships) can be handled using:
1. Recursive CTEs
2. Hierarchyid data type
3. Path enumeration
4. Nested sets

**Recursive CTE (Most Common):**

```sql
-- Employee hierarchy with managers
CREATE TABLE employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    manager_id INT,
    salary DECIMAL(10,2)
);

INSERT INTO employees VALUES
    (1, 'CEO', NULL, 150000),
    (2, 'VP Sales', 1, 120000),
    (3, 'VP Engineering', 1, 125000),
    (4, 'Sales Manager', 2, 80000),
    (5, 'Engineer', 3, 90000),
    (6, 'Engineer', 3, 85000),
    (7, 'Sales Rep', 4, 60000);

-- Recursive CTE: Show hierarchy with level
WITH emp_hierarchy AS (
    -- Anchor: Start with CEO (no manager)
    SELECT 
        emp_id, 
        name, 
        manager_id,
        1 AS hierarchy_level,
        CAST(name AS NVARCHAR(MAX)) AS hierarchy_path,
        salary
    FROM employees
    WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive: Add employees and their managers
    SELECT 
        e.emp_id,
        e.name,
        e.manager_id,
        eh.hierarchy_level + 1,
        eh.hierarchy_path + ' -> ' + e.name,
        e.salary
    FROM employees e
    INNER JOIN emp_hierarchy eh ON e.manager_id = eh.emp_id
    WHERE eh.hierarchy_level < 10
)
SELECT * FROM emp_hierarchy
ORDER BY hierarchy_level, emp_id;

-- Find all subordinates of a manager
WITH subordinates AS (
    SELECT emp_id, name, manager_id, 1 AS level
    FROM employees
    WHERE emp_id = 2  -- VP Sales
    
    UNION ALL
    
    SELECT e.emp_id, e.name, e.manager_id, s.level + 1
    FROM employees e
    INNER JOIN subordinates s ON e.manager_id = s.emp_id
)
SELECT * FROM subordinates
ORDER BY level;

-- Find path from employee to CEO
WITH emp_chain AS (
    SELECT emp_id, name, manager_id, 1 AS level, CAST(name AS NVARCHAR(MAX)) AS chain
    FROM employees
    WHERE emp_id = 7  -- Start from Sales Rep
    
    UNION ALL
    
    SELECT 
        e.emp_id, 
        e.name, 
        e.manager_id, 
        ec.level + 1,
        e.name + ' <- ' + ec.chain
    FROM employees e
    INNER JOIN emp_chain ec ON e.emp_id = ec.manager_id
)
SELECT * FROM emp_chain
ORDER BY level DESC;
```

**HierarchyId Data Type (SQL Server):**

```sql
-- Using hierarchyid for efficient hierarchy
CREATE TABLE org_chart (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    node_id HIERARCHYID
);

-- Insert data
-- Level 0: /1/ (CEO)
INSERT INTO org_chart VALUES (1, 'CEO', '/1/');
-- Level 1: /1/1/ (VP Sales), /1/2/ (VP Engineering)
INSERT INTO org_chart VALUES (2, 'VP Sales', '/1/1/');
INSERT INTO org_chart VALUES (3, 'VP Engineering', '/1/2/');
-- Level 2: /1/1/1/ (Sales Manager)
INSERT INTO org_chart VALUES (4, 'Sales Manager', '/1/1/1/');
-- Level 3: /1/1/1/1/ (Sales Rep)
INSERT INTO org_chart VALUES (7, 'Sales Rep', '/1/1/1/1/');

-- Query hierarchy
SELECT 
    node_id.ToString() AS hierarchy_path,
    emp_id,
    name,
    node_id.GetLevel() AS hierarchy_level
FROM org_chart
ORDER BY node_id;

-- Get children of a node
DECLARE @parent_node HIERARCHYID = '/1/1/';

SELECT emp_id, name
FROM org_chart
WHERE node_id.IsDescendantOf(@parent_node) = 1
  AND node_id != @parent_node;
```

---

### Analytical Functions

#### 5. Explain ROLLUP, CUBE, and GROUPING SETS

**Answer:**

These operators provide multi-level aggregations:

- **ROLLUP**: Hierarchical subtotals (parent → child)
- **CUBE**: All combinations
- **GROUPING SETS**: Custom combinations

**Examples:**

```sql
CREATE TABLE sales (
    year INT,
    quarter VARCHAR(2),
    region VARCHAR(50),
    amount DECIMAL(10,2)
);

INSERT INTO sales VALUES
    (2024, 'Q1', 'North', 10000),
    (2024, 'Q1', 'South', 12000),
    (2024, 'Q2', 'North', 15000),
    (2024, 'Q2', 'South', 18000),
    (2025, 'Q1', 'North', 20000),
    (2025, 'Q1', 'South', 22000);

-- ROLLUP: Year → Quarter → Region hierarchy
SELECT 
    year,
    quarter,
    region,
    SUM(amount) AS total_sales,
    GROUPING(year) AS year_is_null,
    GROUPING(quarter) AS quarter_is_null,
    GROUPING(region) AS region_is_null
FROM sales
GROUP BY ROLLUP(year, quarter, region);

-- Result includes:
-- Detailed rows: 2024, Q1, North
-- Quarter totals: 2024, Q1, NULL
-- Year totals: 2024, NULL, NULL
-- Grand total: NULL, NULL, NULL

-- CUBE: All combinations
SELECT 
    year,
    quarter,
    region,
    SUM(amount) AS total_sales,
    GROUPING_ID(year, quarter, region) AS grouping_id
FROM sales
GROUP BY CUBE(year, quarter, region);

-- Includes all combinations:
-- By year/quarter/region
-- By year/quarter
-- By year/region
-- By year
-- By quarter/region
-- By quarter
-- By region
-- Grand total

-- GROUPING SETS: Custom combinations
SELECT 
    year,
    quarter,
    region,
    SUM(amount) AS total_sales
FROM sales
GROUP BY GROUPING SETS (
    (year, quarter, region),
    (year, quarter),
    (year),
    ()  -- Grand total
);

-- Practical example: Sales dashboard
SELECT 
    CASE 
        WHEN GROUPING(year) = 1 THEN 'ALL YEARS'
        ELSE CAST(year AS VARCHAR)
    END AS year,
    CASE 
        WHEN GROUPING(region) = 1 THEN 'ALL REGIONS'
        ELSE region
    END AS region,
    SUM(amount) AS total_sales,
    GROUPING(year) AS year_total,
    GROUPING(region) AS region_total
FROM sales
GROUP BY ROLLUP(year, region)
ORDER BY year, region;
```

---

## Data Types and Functions

### Data Type Fundamentals

#### 6. What are the common data types in SQL?

**Answer:**

**Numeric Data Types:**

| Type | Range | Storage | Use |
|------|-------|---------|-----|
| **TINYINT** | 0-255 | 1 byte | Small counts, flags |
| **SMALLINT** | -32,768 to 32,767 | 2 bytes | Small integers |
| **INT** | -2.1B to 2.1B | 4 bytes | Most integers |
| **BIGINT** | -9.2E18 to 9.2E18 | 8 bytes | Large counters, IDs |
| **DECIMAL(p,s)** | Fixed precision | Variable | Money, exact calculations |
| **FLOAT** | Approximate | 8 bytes | Scientific data |

**String Data Types:**

```sql
-- CHAR: Fixed-length, padded with spaces
-- Storage: Always n bytes
CREATE TABLE example_char (
    id INT,
    code CHAR(3)
);
INSERT INTO example_char VALUES (1, 'AB');
-- Stored as 'AB ' (padded to 3 chars)

-- VARCHAR: Variable-length
-- Storage: Actual data + 2 bytes overhead
CREATE TABLE example_varchar (
    id INT,
    description VARCHAR(100)
);
INSERT INTO example_varchar VALUES (1, 'Hello');
-- Stored as 'Hello' (5 chars + 2 bytes)

-- TEXT: Large text (deprecated, use VARCHAR(MAX))
-- NCHAR/NVARCHAR: Unicode (wide characters)
CREATE TABLE example_unicode (
    id INT,
    name NVARCHAR(100)  -- Supports Unicode
);
INSERT INTO example_unicode VALUES (1, '日本語');
-- Supports various languages
```

**Date/Time Data Types:**

```sql
-- DATE: Only date, no time
-- Storage: 3 bytes
-- Range: 0001-01-01 to 9999-12-31
SELECT CAST('2025-01-15' AS DATE);

-- TIME: Only time, no date
-- Storage: 3-5 bytes
-- Precision: seconds to 100 nanoseconds
SELECT CAST('14:30:25.123' AS TIME(3));

-- DATETIME: Date + Time
-- Storage: 8 bytes
-- Precision: to 3.33 milliseconds
SELECT CAST('2025-01-15 14:30:25.123' AS DATETIME);

-- DATETIME2: More precision
-- Storage: 6-8 bytes
-- Precision: to 100 nanoseconds
SELECT CAST('2025-01-15 14:30:25.1234567' AS DATETIME2(7));

-- DATETIMEOFFSET: With timezone
-- Includes timezone offset
SELECT CAST('2025-01-15 14:30:25.123 -05:00' AS DATETIMEOFFSET(3));

-- SMALLDATETIME: Less precision
-- Storage: 4 bytes
-- Precision: minutes
SELECT CAST('2025-01-15 14:30:00' AS SMALLDATETIME);
```

**Binary Data Types:**

```sql
-- BINARY: Fixed-length binary
-- Storage: n bytes
DECLARE @binary_data BINARY(4) = 0x12345678;

-- VARBINARY: Variable-length binary
-- Storage: Actual data + 2 bytes
DECLARE @image_data VARBINARY(MAX);
SET @image_data = 0xFFD8FF;  -- JPEG header

-- VARBINARY(MAX): Large binary (up to 2GB)
-- Store files, images, etc.
CREATE TABLE documents (
    doc_id INT,
    doc_content VARBINARY(MAX)  -- Store PDF, Word docs
);
```

**Other Data Types:**

```sql
-- BIT: 0 or 1 (true/false)
CREATE TABLE flags (
    id INT,
    is_active BIT  -- 1=true, 0=false
);

-- UNIQUEIDENTIFIER: GUID
CREATE TABLE objects (
    object_id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID()
);

-- XML: Structured XML data
CREATE TABLE xml_documents (
    doc_id INT,
    xml_content XML
);

-- JSON (stored as NVARCHAR(MAX))
CREATE TABLE json_data (
    id INT,
    json_content NVARCHAR(MAX)
);
```

---

#### 7. Explain the differences between VARCHAR and CHAR data types

**Answer:**

| Aspect | CHAR | VARCHAR |
|--------|------|---------|
| **Length** | Fixed | Variable |
| **Storage** | Always n bytes (padded) | Actual length + 2 bytes |
| **Performance** | Faster access (fixed length) | Slightly slower |
| **Use Case** | Codes, flags | Descriptions, names |
| **Trailing spaces** | Preserved (padded) | Trimmed (stored as-is) |

**Examples:**

```sql
-- CHAR examples
CREATE TABLE char_example (
    id INT,
    country_code CHAR(2),  -- Always 2 chars
    state_code CHAR(2)     -- Always 2 chars
);

INSERT INTO char_example VALUES 
    (1, 'US', 'NY'),
    (2, 'CA', 'BC');

-- Storage:
-- 'US' stored as 'US' (exactly 2 bytes)
-- 'CA' stored as 'CA' (exactly 2 bytes)

-- Comparison:
SELECT * FROM char_example WHERE country_code = 'US ';  -- Works (space ignored)
SELECT * FROM char_example WHERE state_code = 'NY';     -- Works

-- VARCHAR examples
CREATE TABLE varchar_example (
    id INT,
    description VARCHAR(100)
);

INSERT INTO varchar_example VALUES
    (1, 'Short desc'),
    (2, 'A much longer description that uses more characters');

-- Storage:
-- 'Short desc' = 10 chars + 2 bytes = 12 bytes total
-- Long string = 51 chars + 2 bytes = 53 bytes total

-- Trailing space handling
DECLARE @char_val CHAR(10) = 'Hello';
DECLARE @varchar_val VARCHAR(10) = 'Hello';

SELECT 
    LEN(@char_val) AS char_length,        -- Returns 5 (ignores padding)
    DATALENGTH(@char_val) AS char_size,   -- Returns 10 (includes padding)
    LEN(@varchar_val) AS varchar_length,  -- Returns 5
    DATALENGTH(@varchar_val) AS varchar_size;  -- Returns 7 (5 + 2)

-- Performance difference
-- CHAR: Faster for fixed-length data (index lookups)
-- VARCHAR: Better storage efficiency for variable data

-- Best practices:
-- Use CHAR for: Country codes, state codes, fixed-length IDs
-- Use VARCHAR for: Names, descriptions, addresses
```

---

#### 8. Explain VARCHAR vs NVARCHAR

**Answer:**

| Aspect | VARCHAR | NVARCHAR |
|--------|---------|----------|
| **Character Set** | Single-byte (ASCII/ANSI) | Double-byte (Unicode) |
| **Storage** | 1 byte per character | 2 bytes per character |
| **Languages** | English, Western European | All languages |
| **Size** | VARCHAR(50) = 50 bytes max | NVARCHAR(50) = 100 bytes max |

**Examples:**

```sql
-- VARCHAR: ASCII/ANSI only
CREATE TABLE varchar_table (
    id INT,
    name VARCHAR(100)
);

INSERT INTO varchar_table VALUES (1, 'John Doe');
-- Storage: 9 bytes

-- NVARCHAR: Unicode (supports all languages)
CREATE TABLE nvarchar_table (
    id INT,
    name NVARCHAR(100)
);

INSERT INTO nvarchar_table VALUES (1, '日本語');     -- Japanese
INSERT INTO nvarchar_table VALUES (2, '中文');      -- Chinese
INSERT INTO nvarchar_table VALUES (3, 'العربية');   -- Arabic
-- Storage: 2 bytes per character

-- String literal prefix
-- N'' prefix denotes Unicode string
DECLARE @unicode_string NVARCHAR(50) = N'Hello';
DECLARE @ansi_string VARCHAR(50) = 'Hello';

-- Collation
-- VARCHAR uses COLLATE SQL_Latin1_General_CP1_CI_AS
-- NVARCHAR uses various Unicode collations

-- Performance considerations
-- VARCHAR: Faster for Western languages, smaller storage
-- NVARCHAR: Needed for international applications

-- Conversion
SELECT CAST(N'Unicode String' AS VARCHAR(100));  -- Loses non-ASCII
SELECT CAST('ASCII String' AS NVARCHAR(100));    -- Works, adds Unicode support
```

---

#### 9. How do you handle date and time data in SQL?

**Answer:**

**Date/Time Best Practices:**

```sql
-- 1. Store in UTC, convert on display
CREATE TABLE events (
    event_id INT,
    event_name VARCHAR(100),
    event_utc_time DATETIME2(3) DEFAULT GETUTCDATE()
);

-- 2. Date functions
DECLARE @today DATE = GETDATE();
DECLARE @now DATETIME2 = GETUTCDATE();

SELECT 
    @today AS today,
    YEAR(@today) AS year_part,
    MONTH(@today) AS month_part,
    DAY(@today) AS day_part,
    QUARTER(@today) AS quarter,
    WEEK(@today) AS week;

-- 3. Date arithmetic
DECLARE @start_date DATE = '2025-01-01';
DECLARE @end_date DATE = '2025-12-31';

SELECT 
    DATEDIFF(DAY, @start_date, @end_date) AS days_between,
    DATEADD(MONTH, 3, @start_date) AS three_months_later,
    DATEADD(YEAR, 1, @start_date) AS next_year;

-- 4. Date formatting
DECLARE @date DATETIME2 = '2025-01-15 14:30:25.123';

SELECT 
    FORMAT(@date, 'MM/dd/yyyy') AS us_format,
    FORMAT(@date, 'dd/MM/yyyy') AS eu_format,
    FORMAT(@date, 'yyyy-MM-dd HH:mm:ss') AS iso_format,
    FORMAT(@date, 'MMMM d, yyyy') AS long_format;

-- 5. Timezone conversion
DECLARE @utc_time DATETIMEOFFSET = '2025-01-15 14:30:00-00:00';

SELECT 
    @utc_time AT TIME ZONE 'Eastern Standard Time' AS est_time,
    @utc_time AT TIME ZONE 'Pacific Standard Time' AS pst_time,
    @utc_time AT TIME ZONE 'India Standard Time' AS ist_time;

-- 6. Generate date ranges
WITH date_range AS (
    SELECT 
        DATEADD(DAY, number, '2025-01-01') AS date_value
    FROM master..spt_values
    WHERE type = 'P'
      AND DATEADD(DAY, number, '2025-01-01') < '2025-02-01'
)
SELECT date_value
FROM date_range;

-- 7. Fiscal periods
SELECT 
    @date AS calendar_date,
    CASE 
        WHEN MONTH(@date) IN (1,2,3) THEN 'FY-Q4'
        WHEN MONTH(@date) IN (4,5,6) THEN 'FY-Q1'
        WHEN MONTH(@date) IN (7,8,9) THEN 'FY-Q2'
        ELSE 'FY-Q3'
    END AS fiscal_period;
```

---

## Security and Administration

### SQL Injection Prevention

#### 10. Explain SQL injection and how to prevent it

**Answer:**

**SQL Injection** is an attack where malicious SQL code is injected through user input, potentially accessing/modifying data.

**Attack Example:**

```sql
-- Vulnerable code (DO NOT USE)
DECLARE @username VARCHAR(100) = 'admin';
DECLARE @password VARCHAR(100) = 'password'' OR ''1''=''1';

DECLARE @sql NVARCHAR(MAX) = 'SELECT * FROM users WHERE username = ''' 
                           + @username + ''' AND password = ''' 
                           + @password + '''';

-- Executed SQL becomes:
-- SELECT * FROM users WHERE username = 'admin' AND password = 'password' OR '1'='1'
-- Returns all users because '1'='1' is always true!
```

**Prevention 1: Parameterized Queries (BEST)**

```sql
-- SQL Server: Using sp_executesql
DECLARE @username NVARCHAR(100) = 'admin';
DECLARE @password NVARCHAR(100) = 'password'' OR ''1''=''1';

DECLARE @sql NVARCHAR(MAX) = 'SELECT * FROM users WHERE username = @user AND password = @pass';

EXEC sp_executesql @sql,
    N'@user NVARCHAR(100), @pass NVARCHAR(100)',
    @user = @username,
    @pass = @password;

-- @user treated as literal 'admin'
-- @pass treated as literal 'password'' OR ''1''=''1'
-- No SQL injection possible!

-- Stored procedure with parameters
CREATE PROCEDURE sp_GetUser
    @username NVARCHAR(100),
    @password NVARCHAR(100)
AS
BEGIN
    SELECT * FROM users 
    WHERE username = @username 
      AND password = @password;
END;

-- Execute safely
EXEC sp_GetUser 'admin', 'password'' OR ''1''=''1';
-- Still safe - parameter treated as value, not code
```

**Prevention 2: Input Validation**

```sql
-- Whitelist approach
CREATE FUNCTION fn_ValidateUsername(@username NVARCHAR(100))
RETURNS BIT
AS
BEGIN
    -- Only allow alphanumeric and underscore
    IF @username LIKE '%[^a-z0-9_]%'
        RETURN 0;
    
    -- Check length
    IF LEN(@username) > 50 OR LEN(@username) < 3
        RETURN 0;
    
    RETURN 1;
END;

-- Usage
DECLARE @input NVARCHAR(100) = 'admin'' OR ''1''=''1';

IF dbo.fn_ValidateUsername(@input) = 1
BEGIN
    EXEC sp_GetUser @input, 'password';
END
ELSE
BEGIN
    PRINT 'Invalid username format';
END;
```

**Prevention 3: Stored Procedures (when parameterized)**

```sql
-- Safe stored procedure
CREATE PROCEDURE sp_InsertEmployee
    @name NVARCHAR(100),
    @email NVARCHAR(100),
    @salary DECIMAL(10,2)
AS
BEGIN
    IF LEN(@name) > 100 OR LEN(@name) < 1
    BEGIN
        RAISERROR('Invalid name', 16, 1);
        RETURN;
    END;
    
    IF @email NOT LIKE '%@%.%'
    BEGIN
        RAISERROR('Invalid email', 16, 1);
        RETURN;
    END;
    
    INSERT INTO employees (name, email, salary)
    VALUES (@name, @email, @salary);
END;
```

**Prevention 4: Escaping (Less reliable)**

```sql
-- Replace single quotes with double quotes
DECLARE @safe_input NVARCHAR(100) = REPLACE('admin''OR''1''=''1', '''', '''''');

-- Now 'admin''OR''1''=''1' becomes 'admin''''OR''''1''''=''''1'
-- The extra quotes escape the injection

-- Better: Use QUOTENAME for identifiers
DECLARE @table_name NVARCHAR(100) = 'employees';
DECLARE @column_name NVARCHAR(100) = 'name';

DECLARE @sql NVARCHAR(MAX) = 'SELECT ' + QUOTENAME(@column_name) + 
                             ' FROM ' + QUOTENAME(@table_name);

EXEC sp_executesql @sql;
```

**Complete Secure Example:**

```sql
-- Application code (C# example)
using (SqlConnection conn = new SqlConnection(connectionString))
{
    SqlCommand cmd = new SqlCommand("sp_GetUser", conn);
    cmd.CommandType = CommandType.StoredProcedure;
    
    // Parameters automatically escape and parameterize
    cmd.Parameters.AddWithValue("@username", txtUsername.Text);
    cmd.Parameters.AddWithValue("@password", txtPassword.Text);
    
    conn.Open();
    SqlDataReader reader = cmd.ExecuteReader();
}

-- SQL Server: Stored procedure
CREATE PROCEDURE sp_GetUser
    @username NVARCHAR(100),
    @password NVARCHAR(100)
AS
BEGIN
    SELECT * FROM users
    WHERE username = @username
      AND password_hash = HASHBYTES('SHA2_256', @password);
END;

-- Calling safely
DECLARE @user_input NVARCHAR(100) = 'admin'' OR ''1''=''1';
EXEC sp_GetUser @user_input, 'any_password';
-- Result: Treated as literal, no injection
```

---

#### 11. How do you manage user permissions in SQL?

**Answer:**

SQL uses roles and permissions for access control.

**User and Role Management:**

```sql
-- Create login (authentication - proves identity)
CREATE LOGIN sales_user WITH PASSWORD = 'StrongPassword123!';

-- Create database user (authorization - grants access to database)
CREATE USER sales_user FOR LOGIN sales_user;

-- Create custom role
CREATE ROLE sales_role;

-- Grant permissions on table
GRANT SELECT, INSERT, UPDATE ON employees TO sales_role;

-- Grant specific columns only
GRANT SELECT, UPDATE(salary) ON employees TO sales_role;

-- Add user to role
ALTER ROLE sales_role ADD MEMBER sales_user;

-- Deny specific permission (takes precedence over GRANT)
DENY DELETE ON employees TO sales_role;

-- View user permissions
SELECT permission_name, state_desc
FROM fn_my_permissions(NULL, 'DATABASE');

-- Drop user and login
DROP USER sales_user;
DROP LOGIN sales_user;

-- Database roles (predefined)
-- db_owner: Full control
-- db_datareader: Can read all data
-- db_datawriter: Can write all data
-- db_ddladmin: Can create/alter schemas
-- db_accessadmin: Can manage users

ALTER ROLE db_datareader ADD MEMBER sales_user;
```

**Row-Level Security:**

```sql
-- Example: Managers can only see their department
CREATE SCHEMA security;

-- Security policy function
CREATE FUNCTION security.fn_department_filter(@dept_id INT)
RETURNS TABLE
WITH SCHEMABINDING
AS
RETURN
    SELECT 1 AS result
    WHERE @dept_id = CAST(SESSION_CONTEXT(N'current_dept_id') AS INT)
        OR CAST(SESSION_CONTEXT(N'is_manager') AS BIT) = 1;

-- Security policy
CREATE SECURITY POLICY employees_policy
ADD FILTER PREDICATE security.fn_department_filter(dept_id) ON dbo.employees;

-- Set user context
EXEC sp_set_session_context @key = N'current_dept_id', @value = 1;
EXEC sp_set_session_context @key = N'is_manager', @value = 0;

-- User now only sees their department
SELECT * FROM employees;
```

---

#### 12. Explain data masking and encryption

**Answer:**

**Dynamic Data Masking (DDM):**

```sql
-- Mask sensitive columns
ALTER TABLE employees
ALTER COLUMN email NVARCHAR(100) MASKED WITH (FUNCTION = 'email()');

ALTER TABLE employees
ALTER COLUMN phone NVARCHAR(20) MASKED WITH (FUNCTION = 'partial(1,"XXX-XXXX",0)');

ALTER TABLE employees
ALTER COLUMN salary DECIMAL(10,2) MASKED WITH (FUNCTION = 'default()');

-- Create user with masking
CREATE USER report_user WITHOUT LOGIN;

-- Query returns masked data
EXECUTE AS USER = 'report_user';
SELECT email, phone, salary FROM employees;
-- Email: [email protected]
-- Phone: 5XX-XXXX
-- Salary: 0

-- Users with UNMASK permission see actual data
GRANT UNMASK TO admin_user;
```

**Transparent Data Encryption (TDE):**

```sql
-- Create master key
CREATE MASTER KEY ENCRYPTION BY PASSWORD = 'StrongPassword123!';

-- Create certificate
CREATE CERTIFICATE certificate_name
    WITH SUBJECT = 'Certificate for Encryption';

-- Create encryption key
CREATE SYMMETRIC KEY symmetric_key
    WITH ALGORITHM = AES_256
    ENCRYPTION BY CERTIFICATE certificate_name;

-- Encrypt data
OPEN SYMMETRIC KEY symmetric_key
    DECRYPTION BY CERTIFICATE certificate_name;

INSERT INTO encrypted_data (encrypted_ssn)
SELECT ENCRYPTBYKEY(KEY_GUID(N'symmetric_key'), ssn)
FROM employees;

-- Decrypt data
SELECT DECRYPTBYKEY(encrypted_ssn) AS ssn
FROM encrypted_data;

CLOSE SYMMETRIC KEY symmetric_key;
```

---

#### 13. Explain backup and disaster recovery strategies

**Answer:**

**Backup Types:**

```sql
-- Full backup
BACKUP DATABASE mydb
TO DISK = 'C:\backups\mydb_full.bak'
WITH INIT;

-- Differential backup (changes since last full)
BACKUP DATABASE mydb
TO DISK = 'C:\backups\mydb_diff.bak'
WITH DIFFERENTIAL, INIT;

-- Transaction log backup
BACKUP LOG mydb
TO DISK = 'C:\backups\mydb_log.bak'
WITH INIT;

-- Backup with compression
BACKUP DATABASE mydb
TO DISK = 'C:\backups\mydb.bak'
WITH COMPRESSION;

-- Backup to URL (Azure)
BACKUP DATABASE mydb
TO URL = 'https://myaccount.blob.core.windows.net/mycontainer/mydb.bak'
WITH CREDENTIAL = 'mycredential';
```

**Recovery Models:**

```sql
-- Simple Recovery: No log backups
ALTER DATABASE mydb SET RECOVERY SIMPLE;

-- Full Recovery: Full + Log backups
ALTER DATABASE mydb SET RECOVERY FULL;

-- Bulk-Logged Recovery: Hybrid
ALTER DATABASE mydb SET RECOVERY BULK_LOGGED;
```

**Restore Operations:**

```sql
-- Restore database
RESTORE DATABASE mydb
FROM DISK = 'C:\backups\mydb_full.bak'
WITH REPLACE;

-- Restore with recovery
RESTORE DATABASE mydb
FROM DISK = 'C:\backups\mydb_full.bak'
WITH REPLACE, RECOVERY;

-- Restore to point in time
RESTORE DATABASE mydb
FROM DISK = 'C:\backups\mydb_full.bak'
WITH RECOVERY;

RESTORE LOG mydb
FROM DISK = 'C:\backups\mydb_log.bak'
WITH RECOVERY, STOPAT = '2025-01-15 14:30:00';

-- Verify backup integrity
RESTORE VERIFYONLY
FROM DISK = 'C:\backups\mydb_full.bak';
```

**High Availability:**

```sql
-- Always On Availability Groups
CREATE AVAILABILITY GROUP ag_primary
WITH (
    AUTOMATED_BACKUP_PREFERENCE = SECONDARY,
    DB_FAILOVER = ON
);

-- Add database
ALTER AVAILABILITY GROUP ag_primary
ADD DATABASE mydb;

-- Add secondary replica
ALTER AVAILABILITY GROUP ag_primary
ADD REPLICA ON
    'SECONDARY_SERVER' WITH (
        ENDPOINT_URL = 'TCP://SECONDARY_SERVER:5022',
        FAILOVER_MODE = AUTOMATIC,
        AVAILABILITY_MODE = SYNCHRONOUS_COMMIT
    );
```

---

## Summary

This advanced SQL guide covers:

1. **Advanced Concepts**: CTEs, PIVOT/UNPIVOT, JSON, hierarchical data, analytical functions
2. **Data Types**: All SQL data types with examples and best practices
3. **Functions**: String, date, numeric, user-defined, and aggregate functions
4. **Security**: SQL injection prevention, permissions, encryption, data masking
5. **Administration**: Backups, recovery, high availability, disaster recovery

**Key Takeaways:**

- Use **CTEs** for complex queries, **temp tables** for large datasets
- **PIVOT/UNPIVOT** for reshaping data
- **JSON** for modern data structures
- **Parameterized queries** to prevent SQL injection
- **Proper backups** for disaster recovery
- **Row-level security** for data protection
- **Dynamic masking** for sensitive data
- **Encryption** for data at rest and in transit

Master these concepts for advanced SQL interview success!
