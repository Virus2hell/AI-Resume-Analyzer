# Python Interview Questions and Answers

> Comprehensive, interview-ready answers for core and advanced Python topics, including NumPy and pandas.

---

## 1. Python Fundamentals

### 1.1 What is Python?

Python is a high-level, general-purpose, interpreted programming language designed with an emphasis on readability and developer productivity. It supports multiple programming paradigms:

- Object-oriented
- Procedural
- Functional (first-class functions, higher-order functions, comprehensions)

Key characteristics:
- **High-level**: abstracts away low-level memory management.
- **Interpreted**: Python code is executed by an interpreter (CPython, PyPy, etc.).
- **Dynamically typed**: variables do not have fixed types; types are associated with objects at runtime.
- **Large standard library**: batteries-included philosophy for networking, file I/O, OS interaction, data formats, etc.

Use cases: web backends, scripting/automation, data science, AI/ML, DevOps, scientific computing, finance, and more.

---

### 1.2 What are the benefits of using Python language as a tool in the present scenario?

1. **Rapid development**  
   - Clean, concise syntax and dynamic typing allow building prototypes and production systems faster than many compiled languages.

2. **Rich ecosystem**  
   - Huge package index (PyPI) with libraries for web (Django, Flask, FastAPI), data (NumPy, pandas), ML (TensorFlow, PyTorch), automation, etc.

3. **Cross-platform and portable**  
   - Runs on Windows, macOS, Linux and many other platforms with minimal changes.

4. **Strong community and support**  
   - Mature documentation, active community, and extensive Q&A resources (e.g., Stack Overflow) make troubleshooting easier.

5. **Integration and interoperability**  
   - Easy to interface with C/C++, Java, .NET, and system tools. Popular for scripting around existing systems.

6. **Excellent for data and AI**  
   - De-facto standard in data science and machine learning due to libraries like NumPy, pandas, scikit-learn, TensorFlow, and PyTorch.

7. **Readable and maintainable**  
   - Enforced indentation and PEP 8 guidelines promote clean, consistent code, which lowers maintenance cost.

---

### 1.3 Is Python a compiled language or an interpreted language?

Python is **interpreted**, but with an important nuance:

- Source `.py` files are **compiled to bytecode** (`.pyc`) by the CPython interpreter.
- This bytecode is then executed by the Python Virtual Machine (PVM).

So, Python is often described as an **interpreted language with a compilation step to bytecode**. The compilation is automatic and not like explicit compilation to native machine code in languages such as C or C++.

---

### 1.4 How is Python interpreted?

In CPython (the reference implementation):

1. You run a `.py` script.
2. CPython parses the source code and **compiles it to bytecode**.
3. The bytecode is stored in `.pyc` files (in `__pycache__`) for faster subsequent loads.
4. The **Python Virtual Machine (PVM)** executes this bytecode instruction by instruction.

The PVM is an interpreter loop implemented in C. It reads bytecode instructions, maintains a stack, manages objects, and interacts with the garbage collector.

---

### 1.5 What is an interpreted language?

An interpreted language is one in which programs are primarily executed by an interpreter rather than being compiled ahead-of-time into native machine code.

Characteristics:
- Execution happens via an interpreter loop (often bytecode-based).
- Typically offers faster iteration and easier debugging.
- Often trades some runtime performance for portability and developer productivity.

Examples: Python, Ruby, JavaScript (though modern engines JIT-compile internally), PHP.

---

### 1.6 What is a dynamically typed language?

A dynamically typed language is one where **type checking occurs at runtime instead of compile time**.

In Python:
- Variables are just labels pointing to objects.
- Objects carry type information; variables do not.
- The same variable name can refer to different types at different times:

```python
x = 10        # x refers to an int
x = "hello"  # now x refers to a str
```

Pros:
- Very flexible and concise.
- Faster to prototype.

Cons:
- Type errors appear at runtime, not earlier.
- Large codebases can benefit from optional type hints (`typing`) and static analyzers (mypy, pyright).

---

### 1.7 What is PEP 8 and why is it important?

**PEP 8** is the official **style guide for Python code**.

It covers:
- Naming conventions (functions, classes, constants).
- Indentation (4 spaces, no tabs).
- Maximum line length.
- Whitespace usage around operators and commas.
- Imports organization.
- Comments and docstrings.

Importance:
- Promotes **readable and consistent code** across projects and teams.
- Makes it easier for other Python developers to understand and contribute to your code.
- Many tools (e.g., `flake8`, `black`, `pylint`) enforce or rely on PEP 8.

In an interview, mention that following PEP 8 is a sign of professionalism and improves maintainability.

---

### 1.8 What does the `#` symbol do in Python?

The `#` symbol introduces a **comment**.

- Everything after `#` on the same line is ignored by the interpreter.

```python
x = 10  # this is an inline comment
# This is a full-line comment
```

- Comments are used to clarify intent, not to restate obvious code.

---

### 1.9 Is indentation required in Python?

Yes. **Indentation is syntactically significant in Python**.

- It defines code blocks (for `if`, `for`, `while`, `def`, `class`, etc.).
- Standard is 4 spaces per indentation level (PEP 8).

Example:

```python
if condition:
    do_something()
    do_more()
else:
    do_other()
```

Mixing tabs and spaces is discouraged and can raise `IndentationError` in Python 3.

---

## 2. Data Types and Structures

### 2.1 What is the difference between a mutable datatype and an immutable data type?

- **Mutable types**: their contents can be changed in place after creation.
- **Immutable types**: any “change” creates a new object; the original cannot be altered.

Examples:
- Mutable: `list`, `dict`, `set`, `bytearray`.
- Immutable: `int`, `float`, `bool`, `str`, `tuple`, `frozenset`, `bytes`.

Implications:
- Immutable objects are hashable (if they only contain immutable members), so they can be used as dictionary keys or set elements.
- Sharing mutable objects can cause subtle bugs (e.g. default mutable arguments in functions).

---

### 2.2 What are built-in data types in Python? / What are the common built-in data types in Python?

Common built-in data types include:

- **Numeric**: `int`, `float`, `complex`.
- **Boolean**: `bool` (`True`, `False`).
- **Text**: `str`.
- **Binary**: `bytes`, `bytearray`, `memoryview`.
- **Sequence**: `list`, `tuple`, `range`.
- **Set types**: `set`, `frozenset`.
- **Mapping**: `dict`.

These are core to Python’s data model and heavily optimized.

---

### 2.3 What is the difference between a set and a dictionary?

Both are hash-based, unordered collections, but they differ in what they store:

- **Set** (`set`):
  - Stores **unique elements only**.
  - Only values, no key–value pairs.
  - Used for membership tests, removing duplicates, set operations (union, intersection, difference).

- **Dictionary** (`dict`):
  - Stores **key–value pairs**.
  - Keys must be hashable (usually immutable types); values can be any type.
  - Used for associative lookups (mapping keys to values).

Example:

```python
s = {1, 2, 3}
d = {"a": 1, "b": 2}
```

---

### 2.4 How is a dictionary different from a list?

- **List**:
  - Ordered collection of elements.
  - Indexed by integer positions starting from 0.
  - Good for ordered data, sequences, and when you need positional access.

- **Dictionary**:
  - Unordered (insertion-ordered from Python 3.7+), key-based mapping.
  - Indexed by keys (strings, integers, tuples, etc.), not positions.
  - Good for fast lookups by key, configuration, records.

Time complexity (average case):
- List access by index: O(1), search by value: O(n).
- Dict lookup by key: O(1) average.

---

### 2.5 What are lists and tuples? What is the key difference between the two? / Differentiate between list and tuple.

Both are sequence types, but:

- **List** (`list`):
  - Mutable.
  - Defined with `[]`.
  - Example: `nums = [1, 2, 3]`.

- **Tuple** (`tuple`):
  - Immutable.
  - Defined with `()`, e.g. `coords = (10, 20)`.

Key differences:
- Mutability: lists can be modified (append, remove, etc.), tuples cannot.
- Performance: tuples can be slightly more memory-efficient and faster to iterate.
- Use cases: tuples often used for fixed collections (e.g. coordinates, return multiple values), lists for variable-length data.

---

### 2.6 What is the difference between Python arrays and lists?

Python has several “array-like” constructs:

1. **Built-in list**:
   - General-purpose, dynamic array of object references.
   - Can hold heterogeneous types.

2. **`array.array`** (standard library):
   - Stores elements of a **single primitive C type** (e.g. `'i'` for signed int).
   - More memory-efficient than lists for numeric primitives.

3. **NumPy `ndarray`** (third-party):
   - N-dimensional array for numerical computing.
   - Homogeneous data type, contiguous memory, vectorized operations.

Differences vs list:
- Lists are more flexible but less memory- and compute-efficient for numerical operations.
- Arrays (`array.array` or NumPy) are more compact and faster for numerical workloads.

---

### 2.7 What are negative indexes and why are they used?

Negative indices allow indexing from the **end** of a sequence.

- `-1` refers to the last element, `-2` to the second last, and so on.

```python
arr = [10, 20, 30, 40]
print(arr[-1])  # 40
print(arr[-2])  # 30
```

They provide a convenient way to access elements relative to the end without computing `len(arr) - n`.

---

### 2.8 What is slicing in Python?

Slicing extracts a **subsequence** from sequence types like `str`, `list`, `tuple`.

General syntax:

```python
seq[start:stop:step]
```

- `start`: index to start (inclusive, default 0).
- `stop`: index to end (exclusive, default len(seq)).
- `step`: step size (default 1; can be negative).

Example:

```python
nums = [0, 1, 2, 3, 4, 5]
print(nums[1:4])    # [1, 2, 3]
print(nums[:3])     # [0, 1, 2]
print(nums[::2])    # [0, 2, 4]
print(nums[::-1])   # reversed list
```

---

## 3. Control Flow and Functions

### 3.1 What is `pass` in Python?

`pass` is a **no-op statement**. It does nothing and is often used as a placeholder where syntactically a statement is required but no action is needed yet.

Examples:

```python
if condition:
    pass  # TODO: implement later

class MyClass:
    pass
```

---

### 3.2 What is the difference between `/` and `//` in Python?

- `/` is **true division**:
  - Always returns a `float` (in Python 3), even if the result is mathematically an integer.

- `//` is **floor division**:
  - Returns the quotient rounded down to the nearest integer (for floats, returns `float` but floored).

Examples:

```python
5 / 2   # 2.5
5 // 2  # 2
-5 // 2 # -3 (floors toward negative infinity)
```

---

### 3.3 What is `break`, `continue`, and `pass` in Python?

All three are used in loops (and `pass` also elsewhere):

- `break`: exits the **innermost loop** immediately.
- `continue`: skips the rest of the current loop iteration and moves to the next iteration.
- `pass`: does nothing; placeholder.

Example:

```python
for i in range(5):
    if i == 2:
        continue  # skip 2
    if i == 4:
        break     # stop loop
    print(i)
```

---

### 3.4 Difference between `for` loop and `while` loop in Python?

- **`for` loop**:
  - Iterates over a sequence or any iterable.
  - Preferred when you know the collection or the exact range.

```python
for x in [1, 2, 3]:
    print(x)
```

- **`while` loop**:
  - Repeats as long as a condition is `True`.
  - Useful when the number of iterations is not predetermined.

```python
while condition:
    # do something
```

In interviews, emphasize that `for` is usually more Pythonic when iterating over collections.

---

### 3.5 What is a lambda function? / What are lambda functions?

A lambda function is a **small anonymous function** defined with the `lambda` keyword.

Syntax:

```python
lambda arguments: expression
```

Example:

```python
square = lambda x: x * x
print(square(5))  # 25

# common use with higher-order functions
nums = [1, 2, 3]
print(list(map(lambda x: x * 2, nums)))  # [2, 4, 6]
```

Limitations:
- Single expression only (no statements inside).
- For complex logic, prefer `def` functions.

---

### 3.6 How are arguments passed, by value or by reference, in Python?

Python uses **pass-by-object-reference** (sometimes described as “call by sharing”):

- Function parameters receive **references to objects**, not copies.
- The reference itself is passed by value (rebinding inside the function doesn’t affect the caller’s variable).

Implications:

```python
def modify_list(lst):
    lst.append(4)   # mutates the original list

nums = [1, 2, 3]
modify_list(nums)
print(nums)  # [1, 2, 3, 4]


def reassign_list(lst):
    lst = [0]       # rebinds local name only

nums = [1, 2, 3]
reassign_list(nums)
print(nums)  # [1, 2, 3]
```

So: objects can be mutated if mutable; variable bindings in the caller are not changed.

---

### 3.7 Can we pass a function as an argument in Python?

Yes. Functions are **first-class objects** in Python.

Example:

```python
def greet(name):
    return f"Hello, {name}"

def call_with_bob(func):
    return func("Bob")

print(call_with_bob(greet))  # Hello, Bob
```

You can pass functions, return them from other functions, and store them in data structures.

---

### 3.8 What are `*args` and `**kwargs`?

They allow functions to accept a **variable number of arguments**.

- `*args`: collects extra **positional** arguments into a tuple.
- `**kwargs`: collects extra **keyword** arguments into a dictionary.

Example:

```python
def func(a, *args, **kwargs):
    print(a)
    print(args)    # tuple of extra positionals
    print(kwargs)  # dict of extra keywords

func(1, 2, 3, x=10, y=20)
# a = 1
# args = (2, 3)
# kwargs = {"x": 10, "y": 20}
```

They are very common in wrapper functions, decorators, and APIs needing flexibility.

---

### 3.9 What is the use of `self` in Python?

In instance methods of a class, `self` refers to the **instance** on which the method is called.

- It is the first parameter of instance methods by convention (name is not reserved, but `self` is standard).

Example:

```python
class Person:
    def __init__(self, name):
        self.name = name  # instance attribute

    def greet(self):
        return f"Hi, I am {self.name}"

p = Person("Alice")
print(p.greet())
```

`self` is how methods access and modify the instance’s attributes and other methods.

---

### 3.10 What is the main function in Python? How do you invoke it?

Python does not require a `main()` function, but a common pattern is to define one and call it under a guard:

```python
def main():
    # program entry point
    ...

if __name__ == "__main__":
    main()
```

- The `if __name__ == "__main__"` condition is true only when the file is executed directly, not when imported as a module.
- This pattern defines a clear entry point and avoids running code on import.

---

## 4. Comprehensions and Generators

### 4.1 What is list comprehension? Give an example.

List comprehension is a concise way to create lists from iterables.

Syntax:

```python
[expression for item in iterable if condition]
```

Example:

```python
squares = [x * x for x in range(5)]
# [0, 1, 4, 9, 16]

odds = [x for x in range(10) if x % 2 == 1]
# [1, 3, 5, 7, 9]
```

They are more readable and usually faster than manual `for` loops for simple transformations.

---

### 4.2 What is dictionary comprehension? Give an example. / What are dict and list comprehensions?

Dictionary comprehension builds dictionaries succinctly.

Syntax:

```python
{key_expr: value_expr for item in iterable if condition}
```

Example:

```python
squares = {x: x * x for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

word = "hello"
freq = {ch: word.count(ch) for ch in set(word)}
```

List, dict, and set comprehensions provide a declarative style for building collections.

---

### 4.3 Is there tuple comprehension? If yes, how, and if not why?

There is **no separate tuple comprehension syntax**.

- `(expr for x in iterable)` creates a **generator expression**, not a tuple.

Example:

```python
gen = (x * x for x in range(5))  # generator, not tuple
```

To create a tuple via a comprehension-like pattern, you wrap a generator expression with `tuple()`:

```python
result = tuple(x * x for x in range(5))
```

Reason: parentheses are already used for grouping and generator expressions; having them also mean “tuple comprehension” would be ambiguous.

---

### 4.4 What are generators in Python? / What are Generators in Python?

Generators are **iterators defined with a function and the `yield` keyword**.

Characteristics:
- Yield values one at a time, on demand (lazy evaluation).
- Maintain internal state between `yield`s, allowing pausing and resuming.
- Memory-efficient for large or infinite sequences.

Example:

```python
def countdown(n):
    while n > 0:
        yield n
        n -= 1

for i in countdown(3):
    print(i)
```

You can also create generators using **generator expressions**:

```python
g = (x * x for x in range(10))
```

---

### 4.5 What is the difference between `yield` and `return`?

- `return`:
  - Ends the function execution immediately.
  - Optionally returns a single value (or `None`).

- `yield`:
  - Pauses the function, returning a value to the caller.
  - Preserves local state so it can resume from the next statement on subsequent iteration.
  - Functions with `yield` become **generators**.

Example:

```python
def gen():
    yield 1
    yield 2

# gen() returns a generator object
```

Using `return` inside a generator (without value) raises `StopIteration` and ends the iteration.

---

### 4.6 What are iterators in Python? / What are Iterators in Python?

An **iterator** is an object that implements the iterator protocol:

- `__iter__()` that returns the iterator object itself.
- `__next__()` that returns the next value, or raises `StopIteration` when exhausted.

Most built-in collections are iterable; `iter(obj)` returns an iterator over them.

Example:

```python
nums = [1, 2, 3]
it = iter(nums)
print(next(it))  # 1
print(next(it))  # 2
print(next(it))  # 3
# next(it) now raises StopIteration
```

Generators are a convenient way to implement iterators.

---

## 5. Scope and Namespaces

### 5.1 What is variable scope in Python? / What is scope in Python?

Scope defines **where a name (identifier) is visible and accessible**.

Python uses the LEGB rule:

- **L**ocal: inside the current function.
- **E**nclosing: in any outer (nested) function scopes.
- **G**lobal: at the module level.
- **B**uilt-in: names predefined in Python (e.g. `len`, `print`).

Example:

```python
x = 10  # global

def outer():
    x = 20  # enclosing
    def inner():
        x = 30  # local
        print(x)
    inner()
    print(x)

outer()
print(x)
```

---

### 5.2 What is scope resolution in Python?

Scope resolution refers to how Python **resolves a name** using the LEGB order described above.

To modify variables in outer scopes:
- `global` keyword: refers to the module-level variable.
- `nonlocal` keyword: refers to the nearest enclosing (non-global) scope variable.

Example:

```python
x = 10

def func():
    global x
    x = 20  # modifies global x
```

```python
def outer():
    x = 10
    def inner():
        nonlocal x
        x = 20  # modifies x in outer
```

---

### 5.3 What are Python namespaces? Why are they used? / What is a namespace in Python?

A **namespace** is a mapping from **names to objects**, usually implemented as a dictionary.

Types:
- Built-in namespace (e.g. `len`, `range`).
- Global (module-level) namespace.
- Local namespaces for each function call.
- Class namespaces.

Why used:
- Avoid naming conflicts (e.g. same name can exist in different scopes).
- Organize code logically.

When you do `import math`, `math` is a module namespace containing names like `math.pi` and `math.sin`.

---

### 5.4 What is `PYTHONPATH` in Python? / Define `PYTHONPATH`.

`PYTHONPATH` is an **environment variable** that adds additional directories to Python’s module search path (`sys.path`).

- When you `import` a module, Python searches these directories in order.
- Setting `PYTHONPATH` allows importing custom or third-party modules located outside the standard site-packages or project directory.

Example (Unix shell):

```bash
export PYTHONPATH=/path/to/my/modules:$PYTHONPATH
```

---

### 5.5 What is a docstring in Python?

A **docstring** is a string literal that appears as the first statement in a module, function, class, or method definition.

Example:

```python
def add(a, b):
    """Return the sum of a and b."""
    return a + b

print(add.__doc__)
```

Docstrings are accessible at runtime via the `.__doc__` attribute and are used for documentation tools (e.g. `help()`, Sphinx).

---

## 6. Memory Management

### 6.1 How is memory managed in Python? / How is memory management done in Python?

Memory management in Python (CPython) involves:

1. **Reference counting**:
   - Each object keeps a count of references pointing to it.
   - When the count drops to zero, the object is deallocated immediately.

2. **Garbage collector (GC)** for cyclic references:
   - Detects and cleans up reference cycles (e.g. objects referring to each other).

3. **Private heap**:
   - All Python objects are stored in a private heap managed by the Python memory manager.

4. **Memory allocators**:
   - Layered allocation strategy (e.g., `pymalloc`) to optimize performance.

Developers usually don’t manage memory explicitly; they rely on Python’s automatic memory management.

---

### 6.2 What is the difference between a shallow copy and a deep copy? / Differentiate between deep and shallow copies. / What is the difference between `deepcopy` and `copy`?

Using the `copy` module:

- **Shallow copy** (`copy.copy(obj)`):
  - Creates a new container, but **does not recursively copy nested objects**.
  - The new container refers to the same inner objects.

- **Deep copy** (`copy.deepcopy(obj)`):
  - Recursively copies all nested objects.
  - The new container is completely independent.

Example:

```python
import copy

lst = [[1, 2], [3, 4]]
shallow = copy.copy(lst)
deep = copy.deepcopy(lst)

lst[0][0] = 99
print(shallow[0][0])  # 99 (shares inner list)
print(deep[0][0])     # 1  (fully independent)
```

---

### 6.3 How do you copy an object in Python?

Ways to copy:

- For simple containers:
  - `list_copy = original_list[:]`
  - `dict_copy = original_dict.copy()`
  - `set_copy = original_set.copy()`

- For generic copying, especially nested structures:
  - Use `import copy` and then `copy.copy()` or `copy.deepcopy()`.

Be explicit in interviews: slicing and `dict.copy()` create **shallow copies**.

---

### 6.4 What is the purpose of the `weakref` module?

`weakref` provides support for **weak references** to objects.

- A weak reference does **not increase the reference count** of an object.
- When only weak references remain and no strong references exist, the object can be garbage-collected.

Use cases:
- Caches or mappings where you do not want the cache to keep objects alive.
- Observers/listeners that should not prevent objects from being collected.

Example:

```python
import weakref

class MyClass:
    pass

obj = MyClass()
weak_obj = weakref.ref(obj)
print(weak_obj())  # <MyClass instance>

del obj
print(weak_obj())  # None (object collected)
```

`weakref.WeakKeyDictionary` and `weakref.WeakValueDictionary` help create dictionaries that do not prevent their keys/values from being garbage-collected.

---

### 6.5 What are Python's memory optimization techniques?

Some techniques used internally and at the coding level:

1. **Object reuse and interning**:
   - Small integers and some strings may be interned and reused.

2. **Slots**:
   - Using `__slots__` in classes to avoid per-instance `__dict__`, reducing memory for many small objects.

3. **Efficient data structures**:
   - Use `tuple` instead of `list` when immutability is fine.
   - Use `array.array` or NumPy arrays for large numeric data.

4. **Generators and iterators**:
   - Use generators instead of materializing huge lists in memory.

5. **Weak references**:
   - Use `weakref` to build caches that do not leak memory.

6. **Avoid unnecessary copies**:
   - Be careful with slicing and copying large containers.

---

## 7. Object-Oriented Programming

### 7.1 What is `__init__()` in Python and how does `self` play a role in it? / What is `__init__`? / What is `__init__` method in Python?

`__init__` is the **initializer** (constructor-like) method of a class.

- It is called **after** a new instance is created, to initialize its state.
- `self` refers to the instance being initialized.

Example:

```python
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

p = Person("Alice", 30)
```

Here, `self.name` and `self.age` are instance attributes.

---

### 7.2 How do you create a class in Python? / How is an empty class created in Python?

Class definition:

```python
class MyClass:
    def method(self):
        return "Hello"
```

Empty class:

```python
class Empty:
    pass
```

`pass` is used because a body is syntactically required.

---

### 7.3 Define encapsulation in Python.

Encapsulation means **bundling data and the methods that operate on it** within a class, hiding internal representation and exposing a public interface.

In Python:
- True access modifiers do not exist, but naming conventions help:
  - Public: `name`
  - Protected (convention): `_name`
  - Private (name-mangled): `__name`

Encapsulation encourages information hiding, separating internal state from the public API.

---

### 7.4 How do you do data abstraction in Python?

Abstraction means **exposing only essential features** and hiding implementation details.

In Python:
- Done via **classes**, **abstract base classes** (ABCs) from the `abc` module, and interfaces.

Example:

```python
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass
```

Concrete classes implement `area()` but callers depend only on the abstract interface.

---

### 7.5 What are access specifiers in Python? / What are global, protected and private attributes in Python? / Are access specifiers used in Python?

Python does not enforce access modifiers like `public`, `private`, `protected`. Instead, it uses **naming conventions**:

- Public: `name` — accessible everywhere.
- Protected (convention): `_name` — indicates “internal use”; still accessible, but considered non-public API.
- Private (name-mangled): `__name` — triggers name mangling to `_ClassName__name`, making accidental access harder.

Example:

```python
class Example:
    def __init__(self):
        self.public = 1
        self._protected = 2
        self.__private = 3
```

`__private` can still be accessed via `_Example__private` but this is discouraged. Python relies on discipline rather than strict access control.

---

### 7.6 Does Python support multiple inheritance?

Yes. A class can inherit from multiple base classes.

Example:

```python
class A: ...
class B: ...
class C(A, B):
    pass
```

Python uses the **C3 linearization** algorithm to determine method resolution order (MRO).

---

### 7.7 How does inheritance work in Python? Explain with an example.

Inheritance allows a class (child/subclass) to reuse and extend behavior from another class (parent/superclass).

Example:

```python
class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof"

d = Dog()
print(d.speak())  # Woof
```

Methods are resolved according to the class’s MRO. Subclasses can override or extend base class behavior.

---

### 7.8 How will you check if a class is a child of another class?

Use:
- `issubclass(SubClass, ParentClass)` for classes.
- `isinstance(obj, Class)` for objects.

Example:

```python
class A: pass
class B(A): pass

print(issubclass(B, A))  # True
b = B()
print(isinstance(b, A))  # True
```

---

### 7.9 How do you access parent members in the child class?

Use `super()` or explicitly reference the parent:

```python
class Parent:
    def greet(self):
        return "Hello from Parent"

class Child(Parent):
    def greet(self):
        base_msg = super().greet()
        return base_msg + " and Child"
```

`super()` is preferred for cooperative multiple inheritance.

---

### 7.10 Is it possible to call parent class without its instance creation?

Yes, you can call **class methods or static methods** of a parent class directly using the class name:

```python
class Parent:
    @classmethod
    def f(cls):
        ...

Parent.f()
```

For normal instance methods, you can also call them with an explicit instance:

```python
Parent.greet(self_instance)
```

But typically `super()` is used from a child class method.

---

### 7.11 What is polymorphism in Python?

Polymorphism means **the same interface can work with different underlying types**.

Python supports polymorphism via duck typing and inheritance.

Example:

```python
class Dog:
    def speak(self):
        return "Woof"

class Cat:
    def speak(self):
        return "Meow"

for animal in (Dog(), Cat()):
    print(animal.speak())  # Dog and Cat implement same interface
```

The caller doesn’t care about the concrete type as long as it provides the expected method.

---

### 7.12 What are decorators in Python? / What are Decorators?

Decorators are **callables that take a function or class and return a modified or wrapped version**.

They are usually applied with the `@decorator_name` syntax.

Example:

```python
def logger(func):
    def wrapper(*args, **kwargs):
        print(f"Calling {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@logger
