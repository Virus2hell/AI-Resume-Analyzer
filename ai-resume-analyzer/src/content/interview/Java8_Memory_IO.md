# Java 8 Features, Memory Management & File I/O Interview Guide
## 100+ Questions with Code Examples - Lambda, Streams, GC, Serialization & NIO

## Table of Contents

1. [Java 8 Features](#java-8-features)
   - [Lambda Expressions](#lambda-expressions)
   - [Functional Interfaces](#functional-interfaces)
   - [Stream API](#stream-api)
   - [Optional Class](#optional-class)
   - [Method References](#method-references)
   - [Default Methods](#default-methods)

2. [Memory Management](#memory-management)
   - [Garbage Collection](#garbage-collection)
   - [Memory Areas](#memory-areas)
   - [References](#references)
   - [OutOfMemoryError](#outofmemoryerror)

3. [File Handling and I/O](#file-handling-and-io)
   - [Streams](#streams)
   - [Serialization](#serialization)
   - [NIO](#nio)

---

## Java 8 Features

### Lambda Expressions

#### 1. What are lambda expressions?

**Answer:**

**Lambda expressions** are concise, anonymous functions that allow you to treat functionality as method arguments or store them in variables. They enable functional programming in Java.

**Syntax:**

```
(parameters) -> { body }
```

**Types:**

1. **No parameters**: `() -> statement;`
2. **Single parameter**: `x -> statement;` or `(x) -> statement;`
3. **Multiple parameters**: `(x, y) -> statement;`
4. **With body**: `(x) -> { multiple statements; return x; }`

**Examples:**

```java
// 1. Traditional approach with Anonymous Class
Runnable r1 = new Runnable() {
    @Override
    public void run() {
        System.out.println("Hello World");
    }
};
r1.run();

// 2. Lambda expression (concise)
Runnable r2 = () -> System.out.println("Hello World");
r2.run();

// 3. Lambda with single parameter
Function<Integer, Integer> square = x -> x * x;
System.out.println(square.apply(5));  // 25

// 4. Lambda with multiple parameters
BiFunction<Integer, Integer, Integer> add = (x, y) -> x + y;
System.out.println(add.apply(5, 3));  // 8

// 5. Lambda with explicit body
Function<String, Integer> length = str -> {
    System.out.println("Computing length...");
    return str.length();
};
System.out.println(length.apply("Hello"));  // 5

// 6. With Collections
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// Using lambda with forEach
names.forEach(name -> System.out.println(name));

// 7. Comparator with lambda
Comparator<Integer> comparator = (a, b) -> a.compareTo(b);
List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5);
numbers.sort(comparator);
System.out.println(numbers);  // [1, 1, 3, 4, 5]

// 8. Lambda in Stream API
List<Integer> evenNumbers = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * 2)
    .collect(Collectors.toList());
System.out.println(evenNumbers);
```

**Benefits:**

- ✅ **Concise**: Less boilerplate code
- ✅ **Functional**: Supports functional programming
- ✅ **Readable**: More expressive code
- ✅ **Parallelizable**: Works well with Streams for parallel processing

---

### Functional Interfaces

#### 2. What are functional interfaces?

**Answer:**

A **functional interface** has exactly ONE abstract method. Multiple default or static methods are allowed.

**Characteristics:**

- Single Abstract Method (SAM)
- Can have multiple default methods
- Marked with `@FunctionalInterface` annotation (optional but recommended)
- Target for lambda expressions

**Examples:**

```java
// 1. Custom Functional Interface
@FunctionalInterface
public interface Calculator {
    int calculate(int x, int y);  // Single abstract method
    
    // Default method is allowed
    default void display() {
        System.out.println("Calculating...");
    }
}

// Usage
Calculator add = (x, y) -> x + y;
System.out.println(add.calculate(5, 3));  // 8

// 2. Built-in Functional Interfaces

// Predicate<T> - Returns boolean
Predicate<Integer> isEven = n -> n % 2 == 0;
System.out.println(isEven.test(4));  // true

// Function<T, R> - Takes T, returns R
Function<Integer, String> convert = n -> "Number: " + n;
System.out.println(convert.apply(10));  // Number: 10

// Consumer<T> - Takes T, returns void
Consumer<String> print = System.out::println;
print.accept("Hello");  // Hello

// Supplier<T> - Returns T
Supplier<String> greeting = () -> "Hello World";
System.out.println(greeting.get());  // Hello World

// 3. Predefined Functional Interfaces
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

// Using Predicate
Predicate<Integer> greaterThan3 = n -> n > 3;
numbers.stream()
    .filter(greaterThan3)
    .forEach(System.out::println);  // 4, 5

// Using Function
Function<Integer, Integer> double_value = n -> n * 2;
numbers.stream()
    .map(double_value)
    .forEach(System.out::println);  // 2, 4, 6, 8, 10

// Using Consumer
Consumer<Integer> printDouble = n -> System.out.println(n + " doubled is " + (n * 2));
numbers.forEach(printDouble);

// 4. Custom Functional Interface with Lambda
@FunctionalInterface
interface StringProcessor {
    String process(String input);
}

StringProcessor toUpperCase = String::toUpperCase;
System.out.println(toUpperCase.process("hello"));  // HELLO

// 5. BiFunction - Two parameters
BiFunction<String, String, String> concatenate = (s1, s2) -> s1 + s2;
System.out.println(concatenate.apply("Hello", " World"));  // Hello World

// 6. BinaryOperator - Two same type, returns same type
BinaryOperator<Integer> multiply = (x, y) -> x * y;
System.out.println(multiply.apply(5, 3));  // 15

// 7. Error case - Multiple abstract methods (NOT functional)
/*
@FunctionalInterface  // ERROR: Multiple abstract methods
interface NotFunctional {
    void method1();
    void method2();
}
*/
```

**Common Functional Interfaces:**

```
Predicate<T>        (T) -> boolean
Function<T, R>      (T) -> R
Consumer<T>         (T) -> void
Supplier<T>         () -> T
UnaryOperator<T>    (T) -> T
BinaryOperator<T>   (T, T) -> T
BiPredicate<T, U>   (T, U) -> boolean
BiFunction<T, U, R> (T, U) -> R
BiConsumer<T, U>    (T, U) -> void
```

---

### Stream API

#### 3. What is Stream API and the difference between intermediate and terminal operations?

**Answer:**

**Stream API** allows functional-style operations on collections. A stream is a sequence of elements that can be processed in parallel or sequentially.

**Comparison Table:**

| Aspect | Intermediate Operations | Terminal Operations |
|--------|------------------------|-------------------|
| **Return Type** | Stream | Non-stream (result) |
| **Chainable** | Yes (can chain multiple) | No (ends the pipeline) |
| **Lazy Evaluation** | Yes (not executed until terminal) | No (executes immediately) |
| **Reusable** | Stream can't be reused | N/A |
| **Examples** | filter(), map(), flatMap(), sorted(), distinct() | collect(), forEach(), reduce(), count() |

**Examples:**

```java
import java.util.*;
import java.util.stream.*;

public class StreamAPIDemo {
    
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // 1. INTERMEDIATE OPERATIONS
        
        // filter() - Intermediate
        List<Integer> evens = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        System.out.println("Evens: " + evens);  // [2, 4, 6, 8, 10]
        
        // map() - Intermediate (transforms each element)
        List<Integer> doubled = numbers.stream()
            .map(n -> n * 2)
            .collect(Collectors.toList());
        System.out.println("Doubled: " + doubled);  // [2, 4, 6, ...]
        
        // distinct() - Intermediate
        List<Integer> list = Arrays.asList(1, 2, 2, 3, 3, 3, 4);
        List<Integer> unique = list.stream()
            .distinct()
            .collect(Collectors.toList());
        System.out.println("Unique: " + unique);  // [1, 2, 3, 4]
        
        // sorted() - Intermediate
        List<Integer> sorted = numbers.stream()
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Sorted: " + sorted);
        
        // limit() - Intermediate
        List<Integer> first5 = numbers.stream()
            .limit(5)
            .collect(Collectors.toList());
        System.out.println("First 5: " + first5);  // [1, 2, 3, 4, 5]
        
        // skip() - Intermediate
        List<Integer> skipFirst3 = numbers.stream()
            .skip(3)
            .collect(Collectors.toList());
        System.out.println("Skip 3: " + skipFirst3);  // [4, 5, 6, ...]
        
        // peek() - Intermediate (for debugging)
        List<Integer> result = numbers.stream()
            .peek(n -> System.out.println("Before filter: " + n))
            .filter(n -> n > 5)
            .peek(n -> System.out.println("After filter: " + n))
            .collect(Collectors.toList());
        
        // 2. TERMINAL OPERATIONS
        
        // forEach() - Terminal
        System.out.println("\nForEach:");
        numbers.stream()
            .filter(n -> n > 5)
            .forEach(System.out::println);
        
        // collect() - Terminal
        System.out.println("\nCollect to List:");
        List<Integer> collected = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        
        // count() - Terminal
        long count = numbers.stream()
            .filter(n -> n > 5)
            .count();
        System.out.println("Count > 5: " + count);  // 5
        
        // reduce() - Terminal
        Optional<Integer> sum = numbers.stream()
            .reduce((a, b) -> a + b);
        System.out.println("Sum: " + sum.get());  // 55
        
        // max() and min() - Terminal
        Optional<Integer> max = numbers.stream()
            .max(Integer::compareTo);
        System.out.println("Max: " + max.get());  // 10
        
        Optional<Integer> min = numbers.stream()
            .min(Integer::compareTo);
        System.out.println("Min: " + min.get());  // 1
        
        // anyMatch(), allMatch(), noneMatch() - Terminal
        boolean hasEven = numbers.stream()
            .anyMatch(n -> n % 2 == 0);
        System.out.println("Has even: " + hasEven);  // true
        
        boolean allPositive = numbers.stream()
            .allMatch(n -> n > 0);
        System.out.println("All positive: " + allPositive);  // true
        
        boolean noneNegative = numbers.stream()
            .noneMatch(n -> n < 0);
        System.out.println("None negative: " + noneNegative);  // true
        
        // findFirst() - Terminal
        Optional<Integer> first = numbers.stream()
            .filter(n -> n > 5)
            .findFirst();
        System.out.println("First > 5: " + first.get());  // 6
        
        // findAny() - Terminal (useful for parallel streams)
        Optional<Integer> any = numbers.parallelStream()
            .filter(n -> n > 5)
            .findAny();
        System.out.println("Any > 5: " + any.get());
    }
}
```

---

#### 4. What is the difference between map() and flatMap() in Stream API?

**Answer:**

| Aspect | map() | flatMap() |
|--------|------|----------|
| **Function** | Transforms each element T -> R | Transforms & flattens T -> Stream<R> |
| **Output** | Stream<R> | Stream<R> (flattened) |
| **Use Case** | 1-to-1 mapping | 1-to-many mapping |
| **Example** | Each number to double | Each list to individual elements |

**Examples:**

```java
// 1. map() - Transform 1-to-1
List<Integer> numbers = Arrays.asList(1, 2, 3);
List<Integer> doubled = numbers.stream()
    .map(n -> n * 2)      // 1->2, 2->4, 3->6
    .collect(Collectors.toList());
System.out.println(doubled);  // [2, 4, 6]

// 2. map() with String transformation
List<String> words = Arrays.asList("hello", "world");
List<Integer> lengths = words.stream()
    .map(String::length)  // "hello"->5, "world"->5
    .collect(Collectors.toList());
System.out.println(lengths);  // [5, 5]

// 3. flatMap() - Transform and flatten
List<List<Integer>> nestedNumbers = Arrays.asList(
    Arrays.asList(1, 2),
    Arrays.asList(3, 4),
    Arrays.asList(5, 6)
);

// map() would create Stream<Stream<Integer>>
List<List<Integer>> withMap = nestedNumbers.stream()
    .map(list -> list.stream().map(n -> n * 2).collect(Collectors.toList()))
    .collect(Collectors.toList());
System.out.println(withMap);  // [[2, 4], [6, 8], [10, 12]]

// flatMap() flattens to Stream<Integer>
List<Integer> withFlatMap = nestedNumbers.stream()
    .flatMap(list -> list.stream())
    .map(n -> n * 2)
    .collect(Collectors.toList());
System.out.println(withFlatMap);  // [2, 4, 6, 8, 10, 12]

// 4. Real-world example: Split strings
List<String> sentences = Arrays.asList("Hello World", "Java Stream");

// Using map (wrong approach)
// Would create Stream<String[]>

// Using flatMap (correct approach)
List<String> allWords = sentences.stream()
    .flatMap(sentence -> Arrays.stream(sentence.split(" ")))
    .collect(Collectors.toList());
System.out.println(allWords);  // [Hello, World, Java, Stream]

// 5. flatMap with Optional
List<String> names = Arrays.asList("Alice", "Bob", null, "Charlie");

List<String> nonNullNames = names.stream()
    .flatMap(name -> name != null ? Stream.of(name) : Stream.empty())
    .collect(Collectors.toList());
System.out.println(nonNullNames);  // [Alice, Bob, Charlie]

// 6. flatMap with multiple streams
List<Integer> nums1 = Arrays.asList(1, 2);
List<Integer> nums2 = Arrays.asList(3, 4);
List<Integer> nums3 = Arrays.asList(5, 6);

List<Integer> combined = Arrays.asList(nums1, nums2, nums3).stream()
    .flatMap(List::stream)
    .collect(Collectors.toList());
System.out.println(combined);  // [1, 2, 3, 4, 5, 6]
```

**Key Difference Visualization:**

```
map():
[1, 2, 3] -> map(x -> Stream.of(x*2)) -> [[2], [4], [6]]

flatMap():
[1, 2, 3] -> flatMap(x -> Stream.of(x*2)) -> [2, 4, 6]
             (flattens the nested streams)
```

---

### Optional Class

#### 5. What is Optional class?

**Answer:**

**Optional** is a container that may or may not contain a non-null value. It prevents `NullPointerException` and provides a cleaner API for handling null values.

**Key Methods:**

```java
public class OptionalDemo {
    
    public static void main(String[] args) {
        
        // 1. Creating Optional
        Optional<String> empty = Optional.empty();
        Optional<String> ofNullable = Optional.ofNullable(null);
        Optional<String> of = Optional.of("Hello");
        
        // 2. isPresent() and isEmpty()
        Optional<String> name = Optional.ofNullable("Alice");
        
        if (name.isPresent()) {
            System.out.println("Name: " + name.get());
        }
        
        if (name.isEmpty()) {  // Java 11+
            System.out.println("No name");
        }
        
        // 3. orElse() - Provide default value
        String result1 = Optional.ofNullable(null).orElse("Default");
        System.out.println(result1);  // Default
        
        String result2 = Optional.of("Present").orElse("Default");
        System.out.println(result2);  // Present
        
        // 4. orElseGet() - Lazy evaluation
        String result3 = Optional.ofNullable(null).orElseGet(() -> "Computed Default");
        System.out.println(result3);  // Computed Default
        
        // 5. orElseThrow() - Throw exception if empty
        try {
            Optional<String> empty_opt = Optional.empty();
            String value = empty_opt.orElseThrow(() -> 
                new IllegalArgumentException("Value not present"));
        } catch (IllegalArgumentException e) {
            System.out.println("Exception: " + e.getMessage());
        }
        
        // 6. map() - Transform value if present
        Optional<String> text = Optional.of("hello");
        Optional<String> upper = text.map(String::toUpperCase);
        System.out.println(upper.orElse("Not present"));  // HELLO
        
        // 7. flatMap() - Transform and flatten
        Optional<User> user = Optional.of(new User("Alice", Optional.of("alice@example.com")));
        Optional<String> email = user.flatMap(User::getEmail);
        System.out.println(email.orElse("No email"));
        
        // 8. filter() - Filter based on condition
        Optional<Integer> num = Optional.of(10);
        Optional<Integer> filtered = num.filter(n -> n > 5);
        System.out.println(filtered.orElse(-1));  // 10
        
        Optional<Integer> filtered2 = num.filter(n -> n > 20);
        System.out.println(filtered2.orElse(-1));  // -1 (condition failed)
        
        // 9. ifPresent() and ifPresentOrElse()
        Optional<String> name2 = Optional.of("Bob");
        name2.ifPresent(n -> System.out.println("Name is: " + n));
        
        // ifPresentOrElse (Java 9+)
        name2.ifPresentOrElse(
            n -> System.out.println("Name: " + n),
            () -> System.out.println("No name")
        );
        
        // 10. Real-world example: Null-safe operations
        Optional<String> userInput = getUserInput();
        String processed = userInput
            .map(String::trim)
            .filter(s -> !s.isEmpty())
            .map(String::toLowerCase)
            .orElse("default_value");
        System.out.println(processed);
    }
    
    static class User {
        private String name;
        private Optional<String> email;
        
        User(String name, Optional<String> email) {
            this.name = name;
            this.email = email;
        }
        
        public Optional<String> getEmail() {
            return email;
        }
    }
    
    static Optional<String> getUserInput() {
        return Optional.ofNullable(System.console() != null ? "input" : null);
    }
}
```

---

### Method References

#### 6. What is method reference?

**Answer:**

**Method references** are shorthand for lambda expressions that call a specific method. They use `::` syntax.

**Types:**

```java
public class MethodReferenceDemo {
    
    public static void main(String[] args) {
        List<String> names = Arrays.asList("alice", "bob", "charlie");
        
        // 1. STATIC METHOD REFERENCE: ClassName::staticMethod
        Function<String, Integer> parseInt = Integer::parseInt;
        System.out.println(parseInt.apply("123"));  // 123
        
        // Equivalent lambda: s -> Integer.parseInt(s)
        
        // 2. INSTANCE METHOD REFERENCE: instance::methodName
        String str = "Hello";
        Supplier<Integer> length = str::length;
        System.out.println(length.get());  // 5
        
        // Equivalent lambda: () -> str.length()
        
        // 3. ARBITRARY OBJECT METHOD REFERENCE: Class::methodName
        List<String> sorted = names.stream()
            .sorted(String::compareTo)  // Calls compareTo on each String
            .collect(Collectors.toList());
        System.out.println(sorted);  // [alice, bob, charlie]
        
        // Equivalent lambda: (a, b) -> a.compareTo(b)
        
        // 4. CONSTRUCTOR REFERENCE: Class::new
        Supplier<ArrayList> supplier = ArrayList::new;
        ArrayList list = supplier.get();
        
        // Equivalent lambda: () -> new ArrayList()
        
        // Function<Integer, ArrayList> supplier2 = ArrayList::new;
        
        // 5. Practical examples
        
        // Method reference for forEach
        names.forEach(System.out::println);
        
        // Equivalent lambda: n -> System.out.println(n)
        
        // Method reference for map
        List<Integer> lengths = names.stream()
            .map(String::length)
            .collect(Collectors.toList());
        System.out.println(lengths);  // [5, 3, 7]
        
        // Equivalent lambda: s -> s.length()
        
        // 6. Constructor references
        List<Integer> numbers = Arrays.asList(1, 2, 3);
        Set<Integer> set = numbers.stream()
            .collect(Collectors.toCollection(HashSet::new));
        System.out.println(set);
        
        // 7. Complex method reference
        Stream<String> stream = Stream.of("a", "b", "c");
        String result = stream.collect(StringBuilder::new, 
                                      StringBuilder::append, 
                                      StringBuilder::append)
                             .toString();
        System.out.println(result);  // abc
    }
}

/*
Method Reference Cheat Sheet:

1. Static Method:    ClassName::staticMethodName
   Example:          Math::abs, Integer::parseInt

2. Instance Method:  instance::methodName
   Example:          str::length, list::size

3. Object Method:    ClassName::instanceMethodName
   Example:          String::length, String::compareTo

4. Constructor:      ClassName::new
   Example:          ArrayList::new, String::new
*/
```

---

### Default Methods

#### 7. What are default methods?

**Answer:**

**Default methods** are interface methods with implementation (introduced in Java 8). Classes implementing the interface don't have to override them.

**Key Points:**

- Marked with `default` keyword
- Have body/implementation
- Can be overridden by implementing classes
- Enable adding methods to existing interfaces without breaking compatibility

**Examples:**

```java
// 1. Interface with default method
public interface Vehicle {
    // Abstract method
    void drive();
    
    // Default method
    default void fuel() {
        System.out.println("Refueling...");
    }
    
    // Another default method
    default void displayInfo() {
        System.out.println("This is a vehicle");
    }
    
    // Static method (Java 8+)
    static void honk() {
        System.out.println("Honk honk!");
    }
}

// 2. Implementing class
class Car implements Vehicle {
    @Override
    public void drive() {
        System.out.println("Car is driving");
    }
    
    // Default method inherited, can use as-is
    // Or override if needed
    @Override
    public void fuel() {
        System.out.println("Filling petrol tank");
    }
}

// 3. Usage
public class DefaultMethodDemo {
    public static void main(String[] args) {
        Vehicle car = new Car();
        car.drive();              // Car is driving
        car.fuel();               // Filling petrol tank
        car.displayInfo();        // This is a vehicle
        Vehicle.honk();           // Honk honk!
    }
}

// 4. Multiple Inheritance Problem (Solved in Java 8)
interface A {
    default void method() {
        System.out.println("A's method");
    }
}

interface B {
    default void method() {
        System.out.println("B's method");
    }
}

// Ambiguity: Which default method to use?
class C implements A, B {
    @Override
    public void method() {
        // Must override to resolve ambiguity
        A.super.method();  // Explicitly call A's method
        // or B.super.method();
    }
}

// 5. Backward Compatibility Example
// Old interface
interface OldCalculator {
    int add(int a, int b);
}

// Updated with new method (default) - won't break existing implementations
interface NewCalculator extends OldCalculator {
    default int subtract(int a, int b) {
        return a - b;
    }
}

class Calculator implements NewCalculator {
    @Override
    public int add(int a, int b) {
        return a + b;
    }
    // subtract() method is inherited from default implementation
}

// 6. Comparison with abstract class
abstract class AbstractCalculator {
    abstract int add(int a, int b);
    
    // Concrete method in abstract class
    public int subtract(int a, int b) {
        return a - b;
    }
}

class MyCalculator extends AbstractCalculator {
    @Override
    public int add(int a, int b) {
        return a + b;
    }
    // subtract() inherited
}
```

---

## Memory Management

### Garbage Collection

#### 8. What is garbage collection and how does it work?

**Answer:**

**Garbage Collection (GC)** is an automatic memory management mechanism that reclaims memory occupied by unreachable objects.

**Process:**

1. **Mark**: Identify reachable objects from GC roots
2. **Sweep**: Delete unreachable objects
3. **Compact**: Rearrange remaining objects (optional)

**Example:**

```java
public class GarbageCollectionDemo {
    
    static class Person {
        String name;
        Person(String name) {
            this.name = name;
        }
        
        @Override
        public void finalize() {
            System.out.println(name + " is garbage collected");
        }
    }
    
    public static void main(String[] args) {
        // 1. OBJECT ELIGIBLE FOR GC
        Person p1 = new Person("Alice");
        p1 = null;  // No reference, eligible for GC
        
        // 2. Unreachable object
        Person p2 = new Person("Bob");
        Person p3 = p2;
        p2 = null;  // p2 is null but p3 still references object
        // Object not eligible for GC
        
        // 3. Request garbage collection (best effort)
        System.gc();
        
        // 4. GC Types
        // Minor GC: Collects young generation
        // Major GC: Collects old generation
        // Full GC: Collects both
    }
}

// Memory Generational Model:
/*
Heap Memory:
┌─────────────────────────────────────────────┐
│  Young Generation (85% of heap)             │
│  ┌──────────┬──────────┬──────────┐         │
│  │  Eden    │  Survivor S0  │  Survivor S1  │
│  └──────────┴──────────┴──────────┘         │
│  (frequent GC)                              │
├─────────────────────────────────────────────┤
│  Old Generation (15% of heap)               │
│  (infrequent GC)                            │
├─────────────────────────────────────────────┤
│  Permanent Generation (Java 7)              │
│  Metaspace (Java 8+)                        │
└─────────────────────────────────────────────┘
*/
```

**Garbage Collectors:**

```
1. Serial GC:       Single thread, pause time matters
2. Parallel GC:     Multiple threads, high throughput
3. CMS GC:          Concurrent, low pause time
4. G1 GC:           Regional, suitable for large heaps
5. ZGC:             Ultra-low latency (Java 11+)
```

---

### Memory Leak

#### 9. What is memory leak and how to detect it?

**Answer:**

**Memory Leak** occurs when objects are no longer needed but still referenced, preventing garbage collection.

**Examples:**

```java
public class MemoryLeakDemo {
    
    // 1. COMMON MEMORY LEAK: Static Collections
    static class Cache {
        static Map<String, String> cache = new HashMap<>();
        
        public static void add(String key, String value) {
            cache.put(key, value);  // Never removed, grows infinitely!
        }
    }
    
    // Fix: Use WeakHashMap
    static class FixedCache {
        static Map<String, String> cache = new WeakHashMap<>();
        // Objects removed when no strong reference exists
    }
    
    // 2. MEMORY LEAK: Listener not unregistered
    static class EventSource {
        private List<EventListener> listeners = new ArrayList<>();
        
        public void addEventListener(EventListener listener) {
            listeners.add(listener);
        }
        
        public void removeEventListener(EventListener listener) {
            listeners.remove(listener);
        }
        
        public void fireEvent() {
            for (EventListener listener : listeners) {
                listener.handleEvent();
            }
        }
    }
    
    interface EventListener {
        void handleEvent();
    }
    
    // Bad: Listener not removed
    // listeners.add(new MyListener());
    
    // Good: Remove listener when done
    // EventListener listener = new MyListener();
    // listeners.add(listener);
    // ... do something
    // listeners.remove(listener);
    
    // 3. MEMORY LEAK: Connection not closed
    static class DatabaseConnection {
        public void query() throws Exception {
            // Connection never closed - memory leak!
            java.sql.Connection conn = DriverManager.getConnection("jdbc:mysql://localhost");
            // ... use connection
            // Missing: conn.close();
        }
        
        public void queryFixed() throws Exception {
            // Use try-with-resources
            try (java.sql.Connection conn = DriverManager.getConnection("jdbc:mysql://localhost")) {
                // ... use connection
            }  // Automatically closed
        }
    }
    
    // 4. DETECTING MEMORY LEAK: Heap Dump Analysis
    public static void detectMemoryLeak() {
        // Generate heap dump
        // jmap -dump:live,format=b,file=heap.bin <pid>
        
        // Analyze with MAT (Memory Analyzer Tool)
        // Check for growing memory usage
        // Identify objects that should be garbage collected
    }
    
    // 5. PREVENTING MEMORY LEAK: WeakReference
    static class WeakCacheExample {
        public static void main(String[] args) {
            // Strong reference
            String str = new String("Important");
            
            // Weak reference
            WeakReference<String> weakRef = new WeakReference<>(str);
            
            System.out.println("Before GC: " + weakRef.get());  // Important
            
            str = null;  // Remove strong reference
            System.gc();  // Request GC
            
            System.out.println("After GC: " + weakRef.get());   // null
        }
    }
}
```

---

### References

#### 10. What are different types of references in Java?

**Answer:**

| Reference Type | Garbage Collected | Use Case |
|---|---|---|
| **Strong** | No | Normal object references |
| **Weak** | Yes (immediately) | Caching, preventing memory leaks |
| **Soft** | Only if memory needed | Caches that can be cleared |
| **Phantom** | Yes (cleanup tracking) | Resource cleanup |

**Examples:**

```java
import java.lang.ref.*;
import java.util.*;

public class ReferencesDemo {
    
    static class Item {
        String name;
        Item(String name) { this.name = name; }
        @Override
        protected void finalize() {
            System.out.println(name + " finalized");
        }
    }
    
    public static void main(String[] args) throws InterruptedException {
        
        // 1. STRONG REFERENCE (default)
        Item item1 = new Item("Item1");
        // item1 prevents garbage collection
        
        // 2. WEAK REFERENCE
        Item item2 = new Item("Item2");
        WeakReference<Item> weakRef = new WeakReference<>(item2);
        
        System.out.println("Before: " + weakRef.get());  // Item@...
        item2 = null;
        System.gc();
        System.out.println("After: " + weakRef.get());   // null
        
        // 3. SOFT REFERENCE
        Item item3 = new Item("Item3");
        SoftReference<Item> softRef = new SoftReference<>(item3);
        
        item3 = null;
        System.gc();
        System.out.println("Soft (no pressure): " + softRef.get());  // Item@... (still there)
        
        // Only cleared when JVM needs memory
        
        // 4. PHANTOM REFERENCE
        Item item4 = new Item("Item4");
        ReferenceQueue<Item> queue = new ReferenceQueue<>();
        PhantomReference<Item> phantomRef = new PhantomReference<>(item4, queue);
        
        System.out.println("Phantom: " + phantomRef.get());  // null (always)
        item4 = null;
        System.gc();
        
        // Reference is enqueued for cleanup
        Reference<?> ref = queue.poll();
        if (ref != null) {
            System.out.println("Item was garbage collected");
        }
    }
}
```

---

## File Handling and I/O

### Streams

#### 11. What is the difference between FileInputStream and BufferedInputStream?

**Answer:**

| Aspect | FileInputStream | BufferedInputStream |
|--------|---|---|
| **Buffering** | No (unbuffered) | Yes (buffered) |
| **Performance** | Slow (direct I/O) | Fast (buffer reads) |
| **Memory** | Less memory | More memory (buffer) |
| **Method Calls** | Each read → OS call | Read from buffer |
| **Use Case** | Small files | Large files, high throughput |

**Examples:**

```java
import java.io.*;

public class FileIODemo {
    
    public static void main(String[] args) throws IOException {
        
        // 1. FileInputStream - Unbuffered
        FileInputStream fis = new FileInputStream("file.txt");
        
        // Each read() call goes to OS
        int byteRead;
        while ((byteRead = fis.read()) != -1) {
            System.out.print((char) byteRead);
            // Slow for large files!
        }
        fis.close();
        
        // 2. BufferedInputStream - Buffered (FASTER)
        FileInputStream fis2 = new FileInputStream("file.txt");
        BufferedInputStream bis = new BufferedInputStream(fis2);
        
        while ((byteRead = bis.read()) != -1) {
            System.out.print((char) byteRead);
            // Faster - reads from buffer
        }
        bis.close();
        
        // 3. Performance comparison
        long startTime = System.nanoTime();
        readUnbuffered("largefile.txt");
        long unbufferedTime = System.nanoTime() - startTime;
        
        startTime = System.nanoTime();
        readBuffered("largefile.txt");
        long bufferedTime = System.nanoTime() - startTime;
        
        System.out.println("Unbuffered: " + unbufferedTime + "ns");
        System.out.println("Buffered: " + bufferedTime + "ns");
        System.out.println("Buffered is " + (unbufferedTime / bufferedTime) + "x faster");
    }
    
    static void readUnbuffered(String filename) throws IOException {
        FileInputStream fis = new FileInputStream(filename);
        int count = 0;
        while (fis.read() != -1) {
            count++;
        }
        fis.close();
    }
    
    static void readBuffered(String filename) throws IOException {
        BufferedInputStream bis = new BufferedInputStream(
            new FileInputStream(filename));
        int count = 0;
        while (bis.read() != -1) {
            count++;
        }
        bis.close();
    }
}
```

---

### Serialization

#### 12. What is serialization and the transient keyword?

**Answer:**

**Serialization** converts objects to byte stream (for storage/transmission).
**Transient** keyword marks fields that should NOT be serialized.

**Examples:**

```java
import java.io.*;

// 1. Serializable class
class Employee implements Serializable {
    private static final long serialVersionUID = 1L;
    
    String name;
    int id;
    transient String password;  // NOT serialized
    transient double salary;     // NOT serialized
    
    Employee(String name, int id, String password, double salary) {
        this.name = name;
        this.id = id;
        this.password = password;
        this.salary = salary;
    }
    
    @Override
    public String toString() {
        return "Employee{" +
                "name='" + name + '\'' +
                ", id=" + id +
                ", password='" + password + '\'' +
                ", salary=" + salary +
                '}';
    }
}

public class SerializationDemo {
    
    public static void main(String[] args) throws IOException, ClassNotFoundException {
        
        // 1. SERIALIZATION (Object -> Bytes)
        Employee emp = new Employee("John", 101, "secret123", 50000);
        System.out.println("Original: " + emp);
        
        // Serialize
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(baos);
        oos.writeObject(emp);
        byte[] serializedData = baos.toByteArray();
        System.out.println("Serialized bytes: " + serializedData.length);
        
        // 2. DESERIALIZATION (Bytes -> Object)
        ByteArrayInputStream bais = new ByteArrayInputStream(serializedData);
        ObjectInputStream ois = new ObjectInputStream(bais);
        Employee deserializedEmp = (Employee) ois.readObject();
        System.out.println("Deserialized: " + deserializedEmp);
        
        // Notice: password and salary are null/0 (transient fields not restored)
        
        // 3. File-based serialization
        serializeToFile(emp, "employee.ser");
        Employee loaded = deserializeFromFile("employee.ser");
        System.out.println("Loaded from file: " + loaded);
    }
    
    static void serializeToFile(Object obj, String filename) 
            throws IOException {
        FileOutputStream fos = new FileOutputStream(filename);
        ObjectOutputStream oos = new ObjectOutputStream(fos);
        oos.writeObject(obj);
        oos.close();
        System.out.println("Serialized to " + filename);
    }
    
    static Object deserializeFromFile(String filename) 
            throws IOException, ClassNotFoundException {
        FileInputStream fis = new FileInputStream(filename);
        ObjectInputStream ois = new ObjectInputStream(fis);
        Object obj = ois.readObject();
        ois.close();
        return obj;
    }
}

// Output:
// Original: Employee{name='John', id=101, password='secret123', salary=50000.0}
// Deserialized: Employee{name='John', id=101, password='null', salary=0.0}
//    Note: transient fields are null/0
```

---

### NIO (New I/O)

#### 13. What is NIO and how do Channels and Buffers work?

**Answer:**

**NIO (New I/O)** provides non-blocking, channel-based I/O using Channels, Buffers, and Selectors.

**Comparison:**

| Aspect | IO | NIO |
|--------|----|----|
| **Model** | Stream-based | Channel + Buffer |
| **Blocking** | Blocking | Non-blocking |
| **Performance** | Slower | Faster |
| **Scalability** | Limited | Better (Selectors) |

**Examples:**

```java
import java.nio.*;
import java.nio.channels.*;
import java.nio.file.*;
import java.io.*;

public class NIODemo {
    
    public static void main(String[] args) throws IOException {
        
        // 1. BUFFERS
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        
        // Write to buffer
        buffer.put("Hello NIO".getBytes());
        
        // Flip to read
        buffer.flip();
        
        // Read from buffer
        byte[] data = new byte[buffer.limit()];
        buffer.get(data);
        System.out.println(new String(data));  // Hello NIO
        
        // 2. CHANNELS - File reading
        readFileNIO("input.txt");
        
        // 3. CHANNELS - File writing
        writeFileNIO("output.txt", "Hello from NIO");
        
        // 4. CHANNELS - File copy
        copyFileNIO("source.txt", "destination.txt");
    }
    
    static void readFileNIO(String filename) throws IOException {
        Path path = Paths.get(filename);
        FileChannel channel = FileChannel.open(path, StandardOpenOption.READ);
        
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        
        while (channel.read(buffer) > 0) {
            buffer.flip();
            System.out.println(new String(buffer.array(), 0, buffer.limit()));
            buffer.clear();
        }
        
        channel.close();
    }
    
    static void writeFileNIO(String filename, String content) throws IOException {
        Path path = Paths.get(filename);
        FileChannel channel = FileChannel.open(path, 
            StandardOpenOption.CREATE, 
            StandardOpenOption.WRITE);
        
        ByteBuffer buffer = ByteBuffer.allocate(1024);
        buffer.put(content.getBytes());
        buffer.flip();
        
        channel.write(buffer);
        channel.close();
    }
    
    static void copyFileNIO(String source, String destination) throws IOException {
        FileChannel srcChannel = FileChannel.open(Paths.get(source), 
            StandardOpenOption.READ);
        FileChannel destChannel = FileChannel.open(Paths.get(destination),
            StandardOpenOption.CREATE,
            StandardOpenOption.WRITE);
        
        long position = 0;
        long count = srcChannel.size();
        srcChannel.transferTo(position, count, destChannel);
        
        srcChannel.close();
        destChannel.close();
        System.out.println("File copied");
    }
}

// Buffer Lifecycle:
/*
1. CREATE:  ByteBuffer.allocate(1024)
           capacity=1024, position=0, limit=1024

2. WRITE:   buffer.put(data)
           Data written, position incremented

3. FLIP:    buffer.flip()
           position=0, limit=position (ready to read)

4. READ:    buffer.get()
           Reads data, position incremented

5. CLEAR:   buffer.clear()
           position=0, limit=capacity (ready to reuse)
*/
```

---

## Summary

This guide covers:

1. **Java 8 Features**:
   - Lambda expressions & functional interfaces
   - Stream API (intermediate & terminal operations)
   - Optional, method references, default methods

2. **Memory Management**:
   - Garbage collection & types
   - Heap vs Stack
   - Memory leaks & prevention
   - Different reference types

3. **File I/O**:
   - Stream-based I/O
   - Serialization
   - NIO (Channels, Buffers)

**Interview Tips:**

✅ Understand **why** each feature exists
✅ Know performance implications
✅ Compare and contrast alternatives
✅ Provide working code examples
✅ Discuss trade-offs (threading, memory, speed)

This guide prepares you for **intermediate to advanced Java interviews**!
