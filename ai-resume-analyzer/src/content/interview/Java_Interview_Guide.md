# Complete Java Interview Guide
## Basic Concepts to Multithreading - 150+ Questions with Code Examples

## Table of Contents

1. [Basic Java Concepts](#basic-java-concepts)
   - [Java Fundamentals](#java-fundamentals)
   - [JDK vs JRE vs JVM](#jdk-vs-jre-vs-jvm)
   - [Variables and Data Types](#variables-and-data-types)
   - [Constructors](#constructors)

2. [Object-Oriented Programming](#object-oriented-programming)
   - [Core OOP Principles](#core-oop-principles)
   - [Inheritance and Polymorphism](#inheritance-and-polymorphism)
   - [Design Patterns](#design-patterns)

3. [Data Types and Functions](#data-types-and-functions)
   - [Primitive vs Reference Types](#primitive-vs-reference-types)
   - [String, StringBuilder, StringBuffer](#string-stringbuilder-stringbuffer)
   - [Type Casting](#type-casting)

4. [Control Flow and Exception Handling](#control-flow-and-exception-handling)
   - [Exception Hierarchy](#exception-hierarchy)
   - [Try-Catch-Finally](#try-catch-finally)
   - [Exception Propagation](#exception-propagation)

5. [Collections Framework](#collections-framework)
   - [List, Set, Map](#list-set-map)
   - [ArrayList vs LinkedList](#arraylist-vs-linkedlist)
   - [HashMap Internal Working](#hashmap-internal-working)

6. [Multithreading](#multithreading)
   - [Thread Creation](#thread-creation)
   - [Synchronization](#synchronization)
   - [Thread Pool and Callable](#thread-pool-and-callable)

---

## Basic Java Concepts

### Java Fundamentals

#### 1. What is Java and what are its main features?

**Answer:**

Java is a **general-purpose, object-oriented, platform-independent programming language** created by Sun Microsystems in 1995.

**Main Features:**

1. **Platform Independence**: Write once, run anywhere (WORA). Java code compiled to bytecode runs on any platform with JVM.

2. **Object-Oriented**: Everything is an object. Supports encapsulation, inheritance, and polymorphism.

3. **Simple**: Syntax similar to C/C++ but without complex features like pointers and multiple inheritance.

4. **Robust**: Strong memory management, exception handling, garbage collection prevent crashes.

5. **Secure**: Built-in security features, no pointers, bytecode verification, security manager.

6. **Multi-threaded**: Native support for concurrent programming and parallel execution.

7. **High Performance**: JIT (Just-In-Time) compilation optimizes bytecode to machine code.

8. **Distributed**: Supports RMI (Remote Method Invocation), CORBA for distributed applications.

```java
// Simple Java program demonstrating basic features
public class JavaDemo {
    // Instance variable (encapsulation)
    private String name;
    
    // Constructor
    public JavaDemo(String name) {
        this.name = name;
    }
    
    // Method
    public void greet() {
        System.out.println("Hello, " + name);
    }
    
    public static void main(String[] args) {
        // Create object (OOP)
        JavaDemo demo = new JavaDemo("Java");
        demo.greet();  // Method call
    }
}

// Output: Hello, Java
```

---

### JDK vs JRE vs JVM

#### 2. Explain the difference between JDK, JRE, and JVM

**Answer:**

| Aspect | JDK | JRE | JVM |
|--------|-----|-----|-----|
| **Full Form** | Java Development Kit | Java Runtime Environment | Java Virtual Machine |
| **Purpose** | Develop Java applications | Run Java applications | Execute bytecode |
| **Contains** | JRE + Compiler + Tools | JVM + Libraries | Bytecode interpreter |
| **Platform** | Platform-dependent | Platform-dependent | Platform-dependent (bytecode is not) |
| **Users** | Developers | End-users | JVM |
| **Size** | ~300 MB | ~100 MB | Part of JRE |
| **Includes** | javac, java, jar, jdb | java, libraries | Interpreter/JIT compiler |

**Detailed Explanation:**

```
┌─────────────────────────────────────────────────────────┐
│                        JDK                              │
│  ┌──────────────────────────────────────────────────┐   │
│  │               JRE                                │   │
│  │  ┌────────────────────────────────────────────┐  │   │
│  │  │              JVM                           │  │   │
│  │  │  (Executes bytecode - Interpreter/JIT)   │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  │  ┌────────────────────────────────────────────┐  │   │
│  │  │         Class Libraries                   │  │   │
│  │  │  (java.lang, java.util, etc.)             │  │   │
│  │  └────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │         Development Tools                        │   │
│  │  (javac compiler, java debugger, jar tool)      │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

**JDK (Java Development Kit):**
- Complete package for Java development
- Includes JRE, compiler (javac), debugger (jdb), tools (jar, javap)
- Used by developers to write and compile Java code

**JRE (Java Runtime Environment):**
- Runtime environment for running Java applications
- Includes JVM and standard class libraries
- Does NOT include compiler or debugger
- Used by end-users to run Java applications

**JVM (Java Virtual Machine):**
- Abstract computing machine that executes bytecode
- Platform-specific implementation (Windows JVM ≠ Linux JVM)
- Bytecode is platform-independent
- Acts as interpreter and uses JIT compiler for optimization

**Example: Java Code Execution Process:**

```java
// 1. Write Java code (Source Code)
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}

// 2. Compile with javac (JDK compiler)
// Command: javac HelloWorld.java
// Produces: HelloWorld.class (bytecode)

// 3. Run with java (JRE)
// Command: java HelloWorld
// JRE loads JVM, which interprets/compiles bytecode to machine code

// Output: Hello, World!
```

---

### Variables and Data Types

#### 3. What are the different types of variables in Java?

**Answer:**

**Types of Variables:**

1. **Local Variables**: Declared in methods, constructors, or blocks
2. **Instance Variables**: Declared in class, each object has own copy
3. **Static Variables**: Shared by all objects of class

```java
public class VariableTypes {
    // Static variable (shared by all instances)
    static int staticVar = 10;
    
    // Instance variable (each object has its own)
    int instanceVar = 20;
    
    public void method() {
        // Local variable (scope: method only)
        int localVar = 30;
        
        System.out.println("Local: " + localVar);
        System.out.println("Instance: " + instanceVar);
        System.out.println("Static: " + staticVar);
    }
    
    public static void main(String[] args) {
        VariableTypes obj1 = new VariableTypes();
        VariableTypes obj2 = new VariableTypes();
        
        // Instance variables are different for each object
        obj1.instanceVar = 100;
        System.out.println("obj1 instance: " + obj1.instanceVar);  // 100
        System.out.println("obj2 instance: " + obj2.instanceVar);  // 20 (unchanged)
        
        // Static variables are shared
        VariableTypes.staticVar = 500;
        System.out.println("obj1 static: " + obj1.staticVar);      // 500
        System.out.println("obj2 static: " + obj2.staticVar);      // 500
    }
}
```

**Comparison Table:**

| Type | Scope | Memory | Initialization | Lifetime |
|------|-------|--------|-----------------|----------|
| **Local** | Method/Block | Stack | Mandatory before use | Until method ends |
| **Instance** | Object | Heap | Default value | Until object deleted |
| **Static** | Class | Heap | Default value | Entire program |

---

#### 4. What is the difference between local and instance variables?

**Answer:**

| Aspect | Local Variables | Instance Variables |
|--------|-----------------|-------------------|
| **Declaration** | Inside methods/blocks | Inside class, outside methods |
| **Memory Location** | Stack | Heap |
| **Scope** | Method/block only | Entire class |
| **Lifetime** | Created when method called, destroyed when method exits | Created when object created, destroyed when object garbage collected |
| **Default Value** | No default value (must initialize) | Has default value (0, null, false, etc.) |
| **Access** | Can't use `this` or access modifiers | Can use `this`, public, private, protected |

```java
public class LocalVsInstance {
    // Instance variable
    int instanceVar;  // Default value: 0
    String name;      // Default value: null
    
    public void method() {
        // Local variable
        int localVar;  // No default value!
        
        // localVar = localVar + 1;  // ERROR: localVar not initialized
        localVar = 5;  // Must initialize before use
        
        instanceVar = 10;  // OK - instance var has default value
        
        System.out.println("Local: " + localVar);      // 5
        System.out.println("Instance: " + instanceVar); // 10
    }
    
    // Can't initialize local variable here
    // int localVar = 5;  // ERROR
}
```

---

#### 5. What are static variables?

**Answer:**

**Static variables** are class-level variables shared by all instances of a class.

**Characteristics:**

- Declared with `static` keyword
- Memory allocated only once (not per object)
- Shared across all instances
- Initialized at class loading time
- Accessed via class name or instance

```java
public class StaticExample {
    static int count = 0;        // Static variable
    String id;                   // Instance variable
    
    public StaticExample(String id) {
        this.id = id;
        StaticExample.count++;    // Increment shared counter
    }
    
    static void printCount() {
        System.out.println("Total objects: " + count);
    }
    
    public static void main(String[] args) {
        new StaticExample("obj1");
        new StaticExample("obj2");
        new StaticExample("obj3");
        
        StaticExample.printCount();  // Total objects: 3
    }
}

// Output: Total objects: 3

// Real-world example: Database connection counter
public class DatabasePool {
    private static int connectionCount = 0;
    private static int maxConnections = 100;
    
    public static synchronized void createConnection() {
        if (connectionCount < maxConnections) {
            connectionCount++;
        } else {
            throw new RuntimeException("Max connections exceeded");
        }
    }
    
    public static int getConnectionCount() {
        return connectionCount;
    }
}
```

---

#### 6. What is a constructor?

**Answer:**

A **constructor** is a special method called when an object is created. It initializes the object's state.

**Characteristics:**

- Same name as class
- No return type (not even void)
- Called automatically with `new` keyword
- Used to initialize variables and set up objects

```java
public class ConstructorExample {
    String name;
    int age;
    
    // Default constructor (no parameters)
    public ConstructorExample() {
        name = "Unknown";
        age = 0;
    }
    
    // Parameterized constructor
    public ConstructorExample(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Copy constructor
    public ConstructorExample(ConstructorExample other) {
        this.name = other.name;
        this.age = other.age;
    }
    
    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
    
    public static void main(String[] args) {
        // Default constructor
        ConstructorExample obj1 = new ConstructorExample();
        obj1.display();  // Name: Unknown, Age: 0
        
        // Parameterized constructor
        ConstructorExample obj2 = new ConstructorExample("Alice", 25);
        obj2.display();  // Name: Alice, Age: 25
        
        // Copy constructor
        ConstructorExample obj3 = new ConstructorExample(obj2);
        obj3.display();  // Name: Alice, Age: 25
    }
}
```

---

#### 7. What are the different types of constructors?

**Answer:**

| Type | Description | Example |
|------|-------------|---------|
| **Default Constructor** | No parameters, provided by Java if not defined | `public MyClass() {}` |
| **Parameterized Constructor** | Takes parameters for initialization | `public MyClass(String name) {}` |
| **Copy Constructor** | Copies state from another object | `public MyClass(MyClass other) {}` |

```java
public class ConstructorTypes {
    private String name;
    private int age;
    
    // Default Constructor
    public ConstructorTypes() {
        this.name = "Unknown";
        this.age = 0;
        System.out.println("Default constructor called");
    }
    
    // Parameterized Constructor
    public ConstructorTypes(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("Parameterized constructor called");
    }
    
    // Copy Constructor
    public ConstructorTypes(ConstructorTypes other) {
        this.name = other.name;
        this.age = other.age;
        System.out.println("Copy constructor called");
    }
    
    // Constructor with variable arguments
    public ConstructorTypes(String... names) {
        this.name = String.join(", ", names);
        this.age = names.length;
        System.out.println("Varargs constructor called");
    }
    
    public void display() {
        System.out.println("Name: " + name + ", Age: " + age);
    }
    
    public static void main(String[] args) {
        ConstructorTypes obj1 = new ConstructorTypes();           // Default
        ConstructorTypes obj2 = new ConstructorTypes("Bob", 30);   // Parameterized
        ConstructorTypes obj3 = new ConstructorTypes(obj2);        // Copy
        ConstructorTypes obj4 = new ConstructorTypes("A", "B", "C"); // Varargs
        
        obj1.display();
        obj2.display();
        obj3.display();
        obj4.display();
    }
}

// Output:
// Default constructor called
// Parameterized constructor called
// Copy constructor called
// Varargs constructor called
// Name: Unknown, Age: 0
// Name: Bob, Age: 30
// Name: Bob, Age: 30
// Name: A, B, C, Age: 3
```

---

## Object-Oriented Programming

### Core OOP Principles

#### 8. What are the main principles of OOP?

**Answer:**

The four main principles of OOP are:

**1. Encapsulation**: Bundling data and methods, hiding implementation details

```java
public class Employee {
    // Private data - hidden from outside
    private String name;
    private double salary;
    private int id;
    
    // Public methods - controlled access
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        if (name != null && !name.isEmpty()) {
            this.name = name;
        }
    }
    
    public double getSalary() {
        return salary;
    }
    
    public void setSalary(double salary) {
        if (salary > 0) {
            this.salary = salary;
        }
    }
    
    public int getId() {
        return id;
    }
}
```

**2. Inheritance**: Creating new classes based on existing ones

```java
// Parent class
public class Animal {
    public void eat() {
        System.out.println("Animal is eating");
    }
    
    public void sleep() {
        System.out.println("Animal is sleeping");
    }
}

// Child class inherits from Animal
public class Dog extends Animal {
    public void bark() {
        System.out.println("Dog is barking");
    }
}

// Usage
Dog dog = new Dog();
dog.eat();    // Inherited from Animal
dog.sleep();  // Inherited from Animal
dog.bark();   // Own method
```

**3. Polymorphism**: Objects can take multiple forms (same method, different behavior)

```java
// Method Overloading (Compile-time Polymorphism)
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}

// Method Overriding (Runtime Polymorphism)
public class Animal {
    public void makeSound() {
        System.out.println("Animal makes sound");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Cat meows");
    }
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog barks");
    }
}

// Usage
Animal animal1 = new Cat();
Animal animal2 = new Dog();
animal1.makeSound();  // Cat meows
animal2.makeSound();  // Dog barks
```

**4. Abstraction**: Hiding complex implementation, showing only necessary features

```java
// Abstract class - can't be instantiated
public abstract class Vehicle {
    abstract void start();  // Abstract method
    
    abstract void stop();
    
    public void display() {  // Concrete method
        System.out.println("This is a vehicle");
    }
}

// Concrete implementation
public class Car extends Vehicle {
    @Override
    public void start() {
        System.out.println("Car engine started");
    }
    
    @Override
    public void stop() {
        System.out.println("Car engine stopped");
    }
}

// Interface - pure abstraction
public interface Drawable {
    void draw();
}

public class Circle implements Drawable {
    @Override
    public void draw() {
        System.out.println("Drawing circle");
    }
}
```

---

## String, StringBuilder, StringBuffer

#### 9. What is the difference between String, StringBuilder, and StringBuffer?

**Answer:**

| Aspect | String | StringBuilder | StringBuffer |
|--------|--------|---------------|--------------|
| **Mutability** | Immutable | Mutable | Mutable |
| **Thread-Safe** | Yes (immutable) | No | Yes (synchronized) |
| **Performance** | Slow (creates new objects) | Fast | Slower (synchronization) |
| **Memory** | Creates new object on modification | Modifies in place | Modifies in place |
| **Use Case** | Fixed strings, constants | Single-threaded string manipulation | Multi-threaded string manipulation |

**Examples:**

```java
// 1. String - Immutable
String str = "Hello";
str = str + " World";  // Creates new String object
// Original "Hello" discarded, "Hello World" created

// Inefficient concatenation
String result = "";
for (int i = 0; i < 1000; i++) {
    result += i;  // Creates 1000 new String objects!
}

// 2. StringBuilder - Mutable, Not Thread-Safe (Faster)
StringBuilder sb = new StringBuilder("Hello");
sb.append(" World");   // Modifies existing object
sb.insert(0, "Say: "); // Insert at position

System.out.println(sb.toString());  // Say: Hello World
System.out.println(sb.length());    // 16
System.out.println(sb.reverse());   // dlroW olleH :yaS

// Efficient concatenation
StringBuilder result = new StringBuilder();
for (int i = 0; i < 1000; i++) {
    result.append(i);  // Single object, efficient
}

// 3. StringBuffer - Mutable, Thread-Safe (Synchronized)
StringBuffer sbf = new StringBuffer("Hello");
sbf.append(" World");  // Thread-safe modification

// 4. Comparison
String str1 = "Hello";
String str2 = new String("Hello");
System.out.println(str1 == str2);      // false (different objects)
System.out.println(str1.equals(str2)); // true (same content)

// 5. String Pool
String a = "Hello";     // Created in String pool
String b = "Hello";     // Points to same pool object
String c = new String("Hello");  // New object in heap
System.out.println(a == b);      // true (same reference)
System.out.println(a == c);      // false (different objects)
System.out.println(a.equals(c)); // true (same content)

// 6. Method Comparison
String str = "Initial";

// String methods - return new String
str = str.replace('i', 'I');      // "InItIal"
str = str.substring(0, 3);        // "InI"

// StringBuilder/StringBuffer methods
StringBuilder sb = new StringBuilder("Initial");
sb.replace(0, 2, "XX");           // "XXitial"
sb.delete(2, 5);                  // "XXal"
sb.insert(0, "Start");            // "StartXXal"
```

---

## Control Flow and Exception Handling

### Exception Hierarchy

#### 10. What is exception handling and the difference between checked and unchecked exceptions?

**Answer:**

**Exception Handling** is a mechanism to handle runtime errors and unexpected events.

**Exception Hierarchy:**

```
Throwable (root)
├── Error (fatal, not recoverable)
│   ├── OutOfMemoryError
│   ├── StackOverflowError
│   └── VirtualMachineError
└── Exception
    ├── Checked Exceptions (must handle)
    │   ├── IOException
    │   ├── SQLException
    │   ├── FileNotFoundException
    │   └── ParseException
    └── Unchecked Exceptions (don't need to handle)
        ├── RuntimeException
        │   ├── NullPointerException
        │   ├── ArrayIndexOutOfBoundsException
        │   ├── ArithmeticException
        │   └── ClassCastException
        └── Error (OutOfMemory, StackOverflow)
```

**Comparison:**

| Aspect | Checked | Unchecked |
|--------|---------|-----------|
| **Checked At** | Compile time | Runtime |
| **Handling Required** | Yes (try-catch or throws) | No (optional) |
| **Common Cause** | External factors (files, DB) | Programming errors |
| **Examples** | IOException, SQLException | NullPointerException, ArrayIndex... |

**Examples:**

```java
import java.io.*;

// 1. CHECKED EXCEPTIONS - Must handle
public class CheckedExceptionExample {
    // Method 1: Handle with try-catch
    public void readFile(String filename) {
        try {
            FileInputStream file = new FileInputStream(filename);
            file.read();
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("IO error: " + e.getMessage());
        }
    }
    
    // Method 2: Declare with throws
    public void readFile2(String filename) throws FileNotFoundException, IOException {
        FileInputStream file = new FileInputStream(filename);
        file.read();
    }
}

// 2. UNCHECKED EXCEPTIONS - Optional to handle
public class UncheckedExceptionExample {
    public void divideNumbers() {
        int result = 10 / 0;  // ArithmeticException - unchecked
        // Optional to handle
    }
    
    public void accessArray() {
        int[] arr = new int[5];
        int value = arr[10];  // ArrayIndexOutOfBoundsException - unchecked
    }
    
    public void castType() {
        Object obj = "String";
        Integer num = (Integer) obj;  // ClassCastException - unchecked
    }
    
    // But we can catch them
    public void safeOperation() {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        }
    }
}
```

---

### Try-Catch-Finally

#### 11. Explain try-catch-finally blocks

**Answer:**

**Try Block**: Contains code that might throw exception
**Catch Block**: Handles exception if it occurs
**Finally Block**: Executes regardless of exception (cleanup code)

```java
public class ExceptionHandling {
    
    // Basic try-catch
    public void basicHandling() {
        try {
            int result = 10 / 0;
        } catch (ArithmeticException e) {
            System.out.println("Cannot divide by zero");
        }
    }
    
    // Try-catch-finally
    public void tryWithFinally() {
        try {
            System.out.println("Opening file...");
            // ... file operations
            int result = 10 / 0;  // Exception occurs
        } catch (ArithmeticException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            System.out.println("Closing resources...");  // Always executes
        }
    }
    
    // Multiple catch blocks
    public void multipleExceptions() {
        try {
            String[] arr = new String[2];
            arr[5] = "value";  // ArrayIndexOutOfBoundsException
        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("Invalid array index");
        } catch (NullPointerException e) {
            System.out.println("Null pointer error");
        } catch (Exception e) {
            System.out.println("General exception: " + e);
        }
    }
    
    // Try-with-resources (automatic resource closure)
    public void tryWithResources() {
        try (FileInputStream file = new FileInputStream("data.txt")) {
            // File automatically closed after block
            file.read();
        } catch (FileNotFoundException e) {
            System.out.println("File not found");
        } catch (IOException e) {
            System.out.println("IO error");
        }
    }
    
    // Nested try-catch
    public void nestedTryBlock() {
        try {
            System.out.println("Outer try");
            try {
                int result = 10 / 0;
            } catch (ArithmeticException e) {
                System.out.println("Inner catch: " + e);
            }
        } catch (Exception e) {
            System.out.println("Outer catch");
        }
    }
    
    // Finally always executes
    public int finallyExecution() {
        try {
            return 10;
        } finally {
            System.out.println("Finally block executes");  // Prints before return
        }
    }
}

// Output when calling finallyExecution():
// Finally block executes
// (then returns 10)
```

**Key Points:**

```java
// 1. Can have multiple catch blocks (specific to general)
try {
    // code
} catch (FileNotFoundException e) {  // Specific
    
} catch (IOException e) {            // General
    
}

// 2. Can omit catch if finally present
try {
    // code
} finally {
    // cleanup
}

// 3. Finally always executes (except System.exit())
try {
    return 5;
} finally {
    System.out.println("Always runs");  // Executes before return
}

// 4. Don't catch Exception if you can catch specific exceptions
// BAD:
try {
    fileIO();
} catch (Exception e) {
    // Catches everything, hard to debug
}

// GOOD:
try {
    fileIO();
} catch (FileNotFoundException e) {
    // Handle specific case
} catch (IOException e) {
    // Handle other IO errors
}
```

---

## Collections Framework

### List, Set, Map

#### 12. What is the Collections Framework and main differences between List, Set, and Map?

**Answer:**

**Collections Framework** provides interfaces and classes for storing and manipulating groups of objects.

**Comparison:**

| Aspect | List | Set | Map |
|--------|------|-----|-----|
| **Duplicates** | Allowed | Not allowed | Key unique, value can duplicate |
| **Order** | Preserves insertion order | No order guarantee | No order guarantee |
| **Indexing** | Yes (0, 1, 2...) | No | No, accessed by key |
| **Null Values** | Allowed (multiple) | Limited (HashSet: one, TreeSet: none) | One null key, multiple null values |
| **Performance** | Array: O(1), ArrayList: O(n) | HashSet: O(1), TreeSet: O(log n) | HashMap: O(1), TreeMap: O(log n) |
| **Implementations** | ArrayList, LinkedList, Vector | HashSet, TreeSet, LinkedHashSet | HashMap, TreeMap, Hashtable |

**Examples:**

```java
import java.util.*;

public class CollectionsDemo {
    
    public static void main(String[] args) {
        
        // 1. LIST - Ordered, allows duplicates
        List<String> list = new ArrayList<>();
        list.add("Apple");
        list.add("Banana");
        list.add("Apple");  // Duplicate allowed
        System.out.println("List: " + list);
        System.out.println("First element: " + list.get(0));
        System.out.println("Contains Apple: " + list.contains("Apple"));
        
        // 2. SET - Unique, no order guarantee
        Set<String> set = new HashSet<>();
        set.add("Apple");
        set.add("Banana");
        set.add("Apple");  // Duplicate rejected
        System.out.println("Set: " + set);
        System.out.println("Size: " + set.size());  // 2 (duplicate ignored)
        
        // 3. MAP - Key-value pairs, unique keys
        Map<Integer, String> map = new HashMap<>();
        map.put(1, "Apple");
        map.put(2, "Banana");
        map.put(1, "Apricot");  // Overwrites previous value
        System.out.println("Map: " + map);
        System.out.println("Value for key 1: " + map.get(1));
        System.out.println("Keys: " + map.keySet());
        System.out.println("Values: " + map.values());
        
        // Iteration
        System.out.println("\n--- Iteration ---");
        for (String fruit : list) {
            System.out.println("List: " + fruit);
        }
        
        for (String fruit : set) {
            System.out.println("Set: " + fruit);
        }
        
        for (Map.Entry<Integer, String> entry : map.entrySet()) {
            System.out.println("Map: " + entry.getKey() + " -> " + entry.getValue());
        }
    }
}
```

---

### ArrayList vs LinkedList

#### 13. What is the difference between ArrayList and LinkedList?

**Answer:**

| Aspect | ArrayList | LinkedList |
|--------|-----------|-----------|
| **Data Structure** | Dynamic array | Doubly linked list |
| **Access Time** | O(1) - constant | O(n) - linear |
| **Insertion/Deletion** | O(n) - at start/middle | O(1) - if position known |
| **Memory** | Contiguous | Non-contiguous |
| **Initial Capacity** | 10 | No capacity needed |
| **Best For** | Searching, random access | Frequent insertions/deletions |

**Examples:**

```java
import java.util.*;

public class ListComparison {
    
    public static void main(String[] args) {
        
        // 1. ArrayList - Fast access, slow insertion
        List<Integer> arrayList = new ArrayList<>();
        long startTime = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            arrayList.add(i);  // O(n) when resize happens
        }
        long arrayAddTime = System.nanoTime() - startTime;
        
        startTime = System.nanoTime();
        int value = arrayList.get(50000);  // O(1) - direct access
        long arrayAccessTime = System.nanoTime() - startTime;
        
        // 2. LinkedList - Slow access, fast insertion
        List<Integer> linkedList = new LinkedList<>();
        startTime = System.nanoTime();
        for (int i = 0; i < 100000; i++) {
            linkedList.add(i);  // O(1) for add at end
        }
        long linkedAddTime = System.nanoTime() - startTime;
        
        startTime = System.nanoTime();
        value = linkedList.get(50000);  // O(n) - traversal needed
        long linkedAccessTime = System.nanoTime() - startTime;
        
        System.out.println("Add 100k elements:");
        System.out.println("ArrayList: " + arrayAddTime + " ns");
        System.out.println("LinkedList: " + linkedAddTime + " ns");
        
        System.out.println("\nAccess element at index 50000:");
        System.out.println("ArrayList: " + arrayAccessTime + " ns");
        System.out.println("LinkedList: " + linkedAccessTime + " ns");
        
        // 3. Insertion/Deletion comparison
        List<Integer> list1 = new ArrayList<>();
        List<Integer> list2 = new LinkedList<>();
        
        // Add elements
        for (int i = 0; i < 1000; i++) {
            list1.add(i);
            list2.add(i);
        }
        
        // Insert at beginning
        startTime = System.nanoTime();
        list1.add(0, -1);  // O(n) - shift all elements
        long arrayInsertTime = System.nanoTime() - startTime;
        
        startTime = System.nanoTime();
        list2.add(0, -1);  // O(1) - just link nodes
        long linkedInsertTime = System.nanoTime() - startTime;
        
        System.out.println("\nInsert at beginning:");
        System.out.println("ArrayList: " + arrayInsertTime + " ns");
        System.out.println("LinkedList: " + linkedInsertTime + " ns");
    }
}

// When to use:
// Use ArrayList for: Frequent access, rare insertions
// Use LinkedList for: Frequent insertions/deletions, rare access
```

---

### HashMap Internal Working

#### 14. How does HashMap work internally?

**Answer:**

HashMap uses **hash table** (array of buckets) and **linked lists/red-black trees** to handle collisions.

**Process:**

1. **Hash Function**: Converts key to bucket index
2. **Bucket**: Array position where entry is stored
3. **Collision Handling**: Uses LinkedList (buckets) or Red-Black Tree (Java 8+)

```
HashMap Structure:
┌─────────────────────────────────────────────┐
│  Index  │  Bucket (Chain of Entries)        │
├─────────────────────────────────────────────┤
│    0    │  [Key1=Value1] -> [Key5=Value5]  │
│    1    │  [Key2=Value2]                    │
│    2    │  [Key3=Value3] -> [Key7=Value7]  │
│    3    │  Empty                            │
│    4    │  [Key4=Value4]                    │
│  ...    │  ...                              │
└─────────────────────────────────────────────┘
```

**Example:**

```java
import java.util.*;

public class HashMapDemo {
    
    public static void main(String[] args) {
        
        // 1. Basic HashMap operations
        Map<String, Integer> map = new HashMap<>();
        
        // PUT - O(1) average
        map.put("Apple", 100);
        map.put("Banana", 200);
        map.put("Orange", 150);
        
        System.out.println("Map: " + map);
        
        // GET - O(1) average
        System.out.println("Value for Apple: " + map.get("Apple"));
        System.out.println("Value for Mango: " + map.get("Mango"));  // null
        
        // 2. Load Factor
        // Default capacity: 16, Load Factor: 0.75
        // Threshold: 16 * 0.75 = 12
        // When size > 12, HashMap resizes to 32
        
        Map<Integer, String> map2 = new HashMap<>();
        System.out.println("\nAdding 20 elements (will trigger resize):");
        for (int i = 0; i < 20; i++) {
            map2.put(i, "Value" + i);
        }
        System.out.println("Final size: " + map2.size());
        
        // 3. Hash Code Collision
        // Different keys might hash to same bucket
        Map<String, String> collisionMap = new HashMap<>();
        // In Java, "FB" and "Ea" have same hashCode
        collisionMap.put("FB", "Value1");
        collisionMap.put("Ea", "Value2");
        
        System.out.println("\nCollision handling:");
        System.out.println("FB: " + collisionMap.get("FB"));
        System.out.println("Ea: " + collisionMap.get("Ea"));
        
        // 4. Internal working visualization
        printMapStructure(collisionMap);
        
        // 5. Key requirements
        // Keys must implement equals() and hashCode()
        Map<Person, Integer> personMap = new HashMap<>();
        Person p1 = new Person("Alice", 25);
        Person p2 = new Person("Alice", 25);
        
        personMap.put(p1, 1000);
        System.out.println("\nPerson map:");
        System.out.println("Get p1: " + personMap.get(p1));
        System.out.println("Get p2: " + personMap.get(p2));
        // Will work if equals() and hashCode() are properly implemented
    }
    
    static class Person {
        String name;
        int age;
        
        Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        @Override
        public int hashCode() {
            return Objects.hash(name, age);
        }
        
        @Override
        public boolean equals(Object obj) {
            if (this == obj) return true;
            if (obj == null || getClass() != obj.getClass()) return false;
            Person person = (Person) obj;
            return age == person.age && Objects.equals(name, person.name);
        }
    }
    
    static void printMapStructure(Map<String, String> map) {
        // Reflection to access internal structure
        System.out.println("Map has " + map.size() + " entries");
    }
}

// Output:
// Map: {Apple=100, Banana=200, Orange=150}
// Value for Apple: 100
// Value for Mango: null
// 
// Adding 20 elements (will trigger resize):
// Final size: 20
// 
// Collision handling:
// FB: Value1
// Ea: Value2
```

**Key Points:**

```java
// 1. Time Complexity
// get/put/remove: O(1) average, O(n) worst case (all collisions)

// 2. Load Factor default
Map<Integer, String> map = new HashMap<>(16, 0.75f);
// Initial capacity: 16
// Load factor: 0.75
// Resizes when size > 12

// 3. Null handling
Map<String, String> map = new HashMap<>();
map.put(null, "nullKey");      // One null key allowed
map.put("key", null);           // Null values allowed
map.put(null, "updatedNull");   // Updates null key

// 4. Iteration
Map<String, Integer> map = new HashMap<>();
map.put("A", 1);
map.put("B", 2);

// Entry iteration (most efficient)
for (Map.Entry<String, Integer> entry : map.entrySet()) {
    String key = entry.getKey();
    Integer value = entry.getValue();
}

// Value iteration
for (Integer value : map.values()) {
    // process value
}

// Key iteration
for (String key : map.keySet()) {
    Integer value = map.get(key);
}

// 5. Difference from Hashtable
// HashMap: Not synchronized, faster
// Hashtable: Synchronized, slower, legacy
Map<String, String> map = new HashMap<>();  // Preferred
Hashtable<String, String> table = new Hashtable<>();  // Avoid
```

---

## Multithreading

### Thread Creation

#### 15. What is multithreading and different ways to create threads?

**Answer:**

**Multithreading** allows concurrent execution of multiple threads in a single process.

**Two Ways to Create Threads:**

1. **Extend Thread class**
2. **Implement Runnable interface**

```java
// 1. EXTEND THREAD CLASS
public class MyThread extends Thread {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Thread 1: " + i);
            try {
                Thread.sleep(1000);  // Sleep 1 second
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static void main(String[] args) {
        MyThread thread = new MyThread();
        thread.start();  // Calls run() in separate thread
    }
}

// 2. IMPLEMENT RUNNABLE INTERFACE (Preferred)
public class MyRunnable implements Runnable {
    @Override
    public void run() {
        for (int i = 0; i < 5; i++) {
            System.out.println("Thread 2: " + i);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
    
    public static void main(String[] args) {
        Thread thread = new Thread(new MyRunnable());
        thread.start();  // Calls run() in separate thread
    }
}

// 3. MULTIPLE THREADS
public class MultipleThreads {
    public static void main(String[] args) {
        Thread t1 = new Thread(new MyRunnable());
        Thread t2 = new Thread(new MyRunnable());
        Thread t3 = new Thread(new MyRunnable());
        
        t1.start();
        t2.start();
        t3.start();
        
        // All run concurrently
    }
}

// 4. LAMBDA EXPRESSION (Java 8+)
public class LambdaThread {
    public static void main(String[] args) {
        Thread thread = new Thread(() -> {
            System.out.println("Running in thread");
        });
        thread.start();
    }
}

// 5. WHY IMPLEMENT RUNNABLE?
// Class can extend only one class
// But can implement multiple interfaces
public class MyClass extends ParentClass implements Runnable {
    @Override
    public void run() {
        // thread code
    }
}
```

---

### Synchronization

#### 16. What is synchronization and deadlock prevention?

**Answer:**

**Synchronization** ensures only one thread accesses critical section at a time.

```java
public class SynchronizationDemo {
    
    // 1. SYNCHRONIZED METHOD
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
    
    // 2. SYNCHRONIZED BLOCK (more efficient)
    private Object lock = new Object();
    private int balance = 1000;
    
    public void withdraw(int amount) {
        synchronized (lock) {
            if (balance >= amount) {
                balance -= amount;
                System.out.println("Withdrawn: " + amount);
            } else {
                System.out.println("Insufficient balance");
            }
        }
    }
    
    // 3. RACE CONDITION (Without synchronization)
    static class Counter {
        private int count = 0;
        
        // NOT synchronized - race condition
        public void increment() {
            count++;
        }
        
        public int getCount() {
            return count;
        }
    }
    
    // 4. DEADLOCK EXAMPLE
    static class Resource {
        synchronized void method1(Resource other) {
            System.out.println("Method1 acquired resource1");
            try { Thread.sleep(100); } catch (Exception e) {}
            other.method2(this);  // Tries to acquire other's lock
        }
        
        synchronized void method2(Resource other) {
            System.out.println("Method2 acquired resource2");
        }
    }
    
    // DEADLOCK scenario
    static void deadlockExample() {
        Resource r1 = new Resource();
        Resource r2 = new Resource();
        
        Thread t1 = new Thread(() -> r1.method1(r2));  // r1 lock -> r2 lock
        Thread t2 = new Thread(() -> r2.method1(r1));  // r2 lock -> r1 lock
        // DEADLOCK: t1 waits for r2, t2 waits for r1
        
        t1.start();
        t2.start();
    }
    
    // 5. DEADLOCK PREVENTION
    static class SafeResource {
        private Object lock1 = new Object();
        private Object lock2 = new Object();
        
        // Always acquire locks in same order
        void safeMethod1() {
            synchronized (lock1) {
                System.out.println("Acquired lock1");
                synchronized (lock2) {
                    System.out.println("Acquired lock2");
                }
            }
        }
        
        void safeMethod2() {
            synchronized (lock1) {  // Same order as safeMethod1
                System.out.println("Acquired lock1");
                synchronized (lock2) {
                    System.out.println("Acquired lock2");
                }
            }
        }
    }
    
    // 6. VOLATILE keyword
    class VolatileExample {
        private volatile boolean flag = false;  // Always read from memory
        
        public void setFlag() {
            flag = true;
        }
        
        public void checkFlag() {
            while (!flag) {
                // Continuously checks memory, not cache
            }
        }
    }
    
    // 7. WAIT and NOTIFY
    class ProducerConsumer {
        private Queue<Integer> queue = new LinkedList<>();
        private int maxSize = 10;
        
        public synchronized void produce(int value) throws InterruptedException {
            while (queue.size() == maxSize) {
                wait();  // Wait until queue has space
            }
            queue.add(value);
            notifyAll();  // Wake up waiting threads
            System.out.println("Produced: " + value);
        }
        
        public synchronized int consume() throws InterruptedException {
            while (queue.isEmpty()) {
                wait();  // Wait until queue has data
            }
            int value = queue.poll();
            notifyAll();  // Wake up waiting threads
            System.out.println("Consumed: " + value);
            return value;
        }
    }
}
```

**Deadlock Prevention Strategies:**

```java
// 1. Lock Ordering - Always acquire locks in same order
synchronized (lock1) {
    synchronized (lock2) {
        // critical section
    }
}

// 2. Timeout - Don't wait indefinitely
ReentrantLock lock = new ReentrantLock();
try {
    if (lock.tryLock(5, TimeUnit.SECONDS)) {
        // acquired lock
    }
} catch (InterruptedException e) {
    e.printStackTrace();
}

// 3. Avoid Nested Locks
synchronized (lock) {
    // single lock critical section
}

// 4. Use Higher-level Concurrency utilities
ExecutorService executor = Executors.newFixedThreadPool(5);
// Let framework handle threading

// 5. Resource Allocation Order
// Thread 1: Request resource A then B
// Thread 2: Also request resource A then B (same order!)
```

---

### Thread Pool and Callable

#### 17. What is thread pool and difference between Callable and Runnable?

**Answer:**

**Thread Pool** reuses threads to avoid overhead of creating/destroying threads repeatedly.

**Comparison:**

| Aspect | Runnable | Callable |
|--------|----------|----------|
| **Return Type** | void | Generic type (T) |
| **Exception** | Can't throw checked exceptions | Can throw checked exceptions |
| **Used With** | Thread, ExecutorService | ExecutorService |
| **Result Retrieval** | Can't get result | Can get result via Future |

**Examples:**

```java
import java.util.concurrent.*;

public class ThreadPoolDemo {
    
    // 1. RUNNABLE (no return value)
    public static void runnableExample() {
        Runnable task = () -> {
            System.out.println("Task running in: " + Thread.currentThread().getName());
        };
        
        Thread thread = new Thread(task);
        thread.start();
    }
    
    // 2. CALLABLE (with return value)
    public static void callableExample() throws ExecutionException, InterruptedException {
        Callable<Integer> task = () -> {
            Thread.sleep(1000);
            return 42;  // Return a result
        };
        
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<Integer> future = executor.submit(task);
        
        System.out.println("Waiting for result...");
        Integer result = future.get();  // Blocks until result available
        System.out.println("Result: " + result);
        
        executor.shutdown();
    }
    
    // 3. FIXED THREAD POOL
    public static void fixedThreadPool() {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        for (int i = 0; i < 10; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " in " + 
                                 Thread.currentThread().getName());
            });
        }
        
        executor.shutdown();  // Graceful shutdown
    }
    
    // 4. CACHED THREAD POOL
    public static void cachedThreadPool() {
        ExecutorService executor = Executors.newCachedThreadPool();
        
        for (int i = 0; i < 5; i++) {
            executor.submit(() -> {
                System.out.println("Task in " + Thread.currentThread().getName());
            });
        }
        
        executor.shutdown();
    }
    
    // 5. SCHEDULED THREAD POOL
    public static void scheduledThreadPool() throws InterruptedException {
        ScheduledExecutorService executor = 
            Executors.newScheduledThreadPool(2);
        
        // Execute after 2 seconds
        executor.schedule(() -> {
            System.out.println("Executed after delay");
        }, 2, TimeUnit.SECONDS);
        
        // Execute repeatedly
        executor.scheduleAtFixedRate(() -> {
            System.out.println("Periodic task");
        }, 0, 1, TimeUnit.SECONDS);
        
        Thread.sleep(5000);
        executor.shutdown();
    }
    
    // 6. CALLABLE WITH EXCEPTION HANDLING
    public static void callableWithException() {
        Callable<Double> divideTask = () -> {
            int result = 10 / 0;  // Throws exception
            return (double) result;
        };
        
        ExecutorService executor = Executors.newSingleThreadExecutor();
        Future<Double> future = executor.submit(divideTask);
        
        try {
            Double result = future.get();
        } catch (ExecutionException e) {
            System.out.println("Exception in task: " + 
                             e.getCause().getMessage());
        } catch (InterruptedException e) {
            System.out.println("Task interrupted");
        }
        
        executor.shutdown();
    }
    
    // 7. MULTIPLE CALLABLES WITH FUTURE
    public static void multipleCallables() throws InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        Callable<String> task1 = () -> { Thread.sleep(1000); return "Result 1"; };
        Callable<String> task2 = () -> { Thread.sleep(2000); return "Result 2"; };
        Callable<String> task3 = () -> { Thread.sleep(500); return "Result 3"; };
        
        // Submit all tasks
        Future<String> future1 = executor.submit(task1);
        Future<String> future2 = executor.submit(task2);
        Future<String> future3 = executor.submit(task3);
        
        // Get results
        System.out.println(future1.get());
        System.out.println(future2.get());
        System.out.println(future3.get());
        
        executor.shutdown();
    }
    
    // 8. RUNNABLE vs CALLABLE SIDE BY SIDE
    public static void comparison() throws ExecutionException, InterruptedException {
        ExecutorService executor = Executors.newFixedThreadPool(2);
        
        // Runnable - no return value
        Runnable runnable = () -> {
            System.out.println("Runnable: no return value");
        };
        executor.submit(runnable);
        
        // Callable - with return value
        Callable<String> callable = () -> {
            return "Callable: returns value";
        };
        Future<String> future = executor.submit(callable);
        System.out.println(future.get());
        
        executor.shutdown();
    }
    
    public static void main(String[] args) throws Exception {
        System.out.println("=== Runnable ===");
        runnableExample();
        
        System.out.println("\n=== Callable ===");
        callableExample();
        
        System.out.println("\n=== Fixed Thread Pool ===");
        fixedThreadPool();
        
        System.out.println("\n=== Callable with Exception ===");
        callableWithException();
    }
}
```

---

## Summary

This comprehensive Java guide covers:

1. **Basic Concepts**: JDK/JRE/JVM, variables, constructors, String pool
2. **OOP Principles**: Encapsulation, inheritance, polymorphism, abstraction
3. **Collections**: List, Set, Map, ArrayList vs LinkedList, HashMap
4. **Exception Handling**: Checked/unchecked, try-catch-finally
5. **Multithreading**: Thread creation, synchronization, deadlock, thread pools

**Key Interview Tips:**

- Understand **why** not just **what**
- Know trade-offs (ArrayList vs LinkedList, String vs StringBuilder)
- Can write working code examples
- Explain complexity and performance implications
- Know when to use each concept

This guide prepares you for **junior to mid-level Java interviews**!
