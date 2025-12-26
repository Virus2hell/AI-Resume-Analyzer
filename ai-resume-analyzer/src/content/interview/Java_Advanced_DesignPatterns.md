# Advanced Java Concepts, Java EE & Design Patterns Interview Guide
## 130+ Questions with Code Examples - Reflection, Annotations, JDBC, Servlets, SOLID & Design Patterns

## Table of Contents

1. [Advanced Concepts](#advanced-concepts)
   - [Reflection](#reflection)
   - [Annotations](#annotations)
   - [ClassLoader vs Class](#classloader-vs-class)
   - [Marker Interfaces](#marker-interfaces)

2. [Design Principles](#design-principles)
   - [Composition vs Aggregation vs Association](#composition-vs-aggregation-vs-association)
   - [SOLID Principles](#solid-principles)
   - [Immutable Classes](#immutable-classes)

3. [Design Patterns](#design-patterns)
   - [Creational Patterns](#creational-patterns)
   - [Structural Patterns](#structural-patterns)
   - [Behavioral Patterns](#behavioral-patterns)

4. [Java EE Basics](#java-ee-basics)
   - [JDBC](#jdbc)
   - [Servlets](#servlets)
   - [JSP](#jsp)

---

## Advanced Concepts

### Reflection

#### 1. What is reflection in Java?

**Answer:**

**Reflection** is a mechanism to inspect and modify runtime behavior of classes, methods, fields, and constructors.

**Key Uses:**

- Inspecting class structure at runtime
- Invoking methods dynamically
- Accessing private fields
- Creating objects dynamically
- Framework development (Spring, Hibernate)

**Examples:**

```java
import java.lang.reflect.*;

public class ReflectionDemo {
    
    static class Person {
        private String name;
        private int age;
        
        public Person(String name, int age) {
            this.name = name;
            this.age = age;
        }
        
        public void display() {
            System.out.println("Name: " + name + ", Age: " + age);
        }
        
        private void privateMethod() {
            System.out.println("Private method called");
        }
        
        public int getAge() {
            return age;
        }
    }
    
    public static void main(String[] args) throws Exception {
        
        // 1. GET CLASS OBJECT
        Class<?> clazz = Class.forName("com.example.Person");
        // OR
        Class<?> clazz2 = Person.class;
        // OR
        Person person = new Person("John", 30);
        Class<?> clazz3 = person.getClass();
        
        // 2. GET CLASS INFORMATION
        System.out.println("Class name: " + clazz.getName());
        System.out.println("Simple name: " + clazz.getSimpleName());
        System.out.println("Package: " + clazz.getPackageName());
        
        // 3. GET CONSTRUCTORS
        Constructor<?>[] constructors = clazz.getDeclaredConstructors();
        for (Constructor<?> constructor : constructors) {
            System.out.println("Constructor: " + constructor);
        }
        
        // Create object using constructor
        Constructor<?> constructor = clazz.getDeclaredConstructor(
            String.class, int.class);
        Person newPerson = (Person) constructor.newInstance("Alice", 25);
        newPerson.display();
        
        // 4. GET FIELDS
        Field[] fields = clazz.getDeclaredFields();
        for (Field field : fields) {
            System.out.println("Field: " + field.getName() + 
                             " Type: " + field.getType());
        }
        
        // Access private field
        Field nameField = clazz.getDeclaredField("name");
        nameField.setAccessible(true);  // Allow access to private field
        String nameValue = (String) nameField.get(person);
        System.out.println("Name via reflection: " + nameValue);
        
        // Modify private field
        nameField.set(person, "Bob");
        person.display();  // Name changed to Bob
        
        // 5. GET METHODS
        Method[] methods = clazz.getDeclaredMethods();
        for (Method method : methods) {
            System.out.println("Method: " + method.getName());
        }
        
        // Invoke public method
        Method displayMethod = clazz.getDeclaredMethod("display");
        displayMethod.invoke(person);
        
        // Invoke method with return value
        Method getAgeMethod = clazz.getDeclaredMethod("getAge");
        int age = (int) getAgeMethod.invoke(person);
        System.out.println("Age via reflection: " + age);
        
        // 6. INVOKE PRIVATE METHOD
        Method privateMethod = clazz.getDeclaredMethod("privateMethod");
        privateMethod.setAccessible(true);
        privateMethod.invoke(person);
        
        // 7. GET ANNOTATIONS
        Annotation[] annotations = clazz.getDeclaredAnnotations();
        for (Annotation annotation : annotations) {
            System.out.println("Annotation: " + annotation);
        }
        
        // 8. CHECK IF ARRAY/INTERFACE/ENUM
        System.out.println("Is array: " + clazz.isArray());
        System.out.println("Is interface: " + clazz.isInterface());
        System.out.println("Is enum: " + clazz.isEnum());
    }
}

// Real-world example: Dependency Injection using Reflection
public class DIContainer {
    public static <T> T createInstance(Class<T> clazz) throws Exception {
        // Get constructor
        Constructor<T> constructor = clazz.getDeclaredConstructor();
        constructor.setAccessible(true);
        
        // Create instance
        T instance = constructor.newInstance();
        
        // Auto-wire dependencies (simplified)
        for (Field field : clazz.getDeclaredFields()) {
            if (field.isAnnotationPresent(Inject.class)) {
                field.setAccessible(true);
                Object dependency = createInstance(field.getType());
                field.set(instance, dependency);
            }
        }
        
        return instance;
    }
}

@interface Inject {}

class UserService {
    @Inject
    private UserRepository repository;
    
    public void printRepo() {
        System.out.println("Repository: " + repository);
    }
}
```

**Performance Considerations:**

```java
// Reflection is slow - avoid in tight loops
// BAD: Reflection in loop
for (int i = 0; i < 1000000; i++) {
    Method method = clazz.getMethod("getValue");
    Object result = method.invoke(obj);
}

// GOOD: Cache reflection objects
Method method = clazz.getMethod("getValue");
for (int i = 0; i < 1000000; i++) {
    Object result = method.invoke(obj);
}
```

---

### Annotations

#### 2. What are annotations?

**Answer:**

**Annotations** are metadata (data about data) that provide information but don't directly affect code execution.

**Types:**

1. **Predefined Annotations**: @Deprecated, @Override, @SuppressWarnings, @FunctionalInterface
2. **Meta-annotations**: @Retention, @Target, @Documented, @Inherited, @Repeatable
3. **Custom Annotations**: User-defined

**Examples:**

```java
// 1. PREDEFINED ANNOTATIONS

// @Override - Marks method override
class Parent {
    public void method() {}
}

class Child extends Parent {
    @Override
    public void method() {  // Compiler checks override
        System.out.println("Child method");
    }
}

// @Deprecated - Marks obsolete code
class OldClass {
    @Deprecated
    public void oldMethod() {
        System.out.println("Old method");
    }
}

// @SuppressWarnings - Suppress compiler warnings
class Warning {
    @SuppressWarnings("unchecked")
    void method() {
        List list = new ArrayList();  // No warning
    }
}

// 2. META-ANNOTATIONS
@Retention(RetentionPolicy.RUNTIME)  // Available at runtime
@Target(ElementType.METHOD)           // Applied to methods
@Documented                           // Included in Javadoc
public @interface MyAnnotation {
    String value() default "default";
    int count() default 0;
}

// 3. CUSTOM ANNOTATIONS

// Simple annotation
@interface Author {
    String name();
    String date();
}

@Author(name = "John", date = "2025-01-15")
public class MyClass {
    
}

// Annotation with default values
@interface Version {
    String version() default "1.0";
    boolean active() default true;
}

@Version(version = "2.0")
class VersionedClass {
}

// Repeatable annotation (Java 8+)
@Repeatable(Authors.class)
@interface Author2 {
    String value();
}

@interface Authors {
    Author2[] value();
}

@Author2("John")
@Author2("Jane")
@Author2("Bob")
class MultiAuthorClass {
}

// 4. RETENTION POLICIES
public enum RetentionPolicy {
    SOURCE,      // Discarded by compiler
    CLASS,       // In bytecode, not available at runtime
    RUNTIME      // Available at runtime (reflection)
}

// 5. TARGET TYPES
public enum ElementType {
    TYPE,              // Class, interface, enum
    FIELD,             // Fields
    METHOD,            // Methods
    PARAMETER,         // Parameters
    CONSTRUCTOR,       // Constructors
    LOCAL_VARIABLE,    // Local variables
    ANNOTATION_TYPE,   // Annotations
    PACKAGE,           // Packages
    TYPE_PARAMETER,    // Type parameters
    TYPE_USE           // Any type usage
}

// 6. USING ANNOTATIONS AT RUNTIME

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
public @interface LogExecution {
    String value() default "";
}

public class AnnotationProcessor {
    
    @LogExecution("Getting user")
    public void getUser() {
        System.out.println("Fetching user...");
    }
    
    public static void processAnnotations(Class<?> clazz) 
            throws Exception {
        for (Method method : clazz.getDeclaredMethods()) {
            if (method.isAnnotationPresent(LogExecution.class)) {
                LogExecution annotation = 
                    method.getAnnotation(LogExecution.class);
                System.out.println("Method: " + method.getName());
                System.out.println("Log: " + annotation.value());
            }
        }
    }
    
    public static void main(String[] args) throws Exception {
        processAnnotations(AnnotationProcessor.class);
    }
}

// Output:
// Method: getUser
// Log: Getting user
```

---

### ClassLoader vs Class

#### 3. What is the difference between ClassLoader and Class?

**Answer:**

| Aspect | ClassLoader | Class |
|--------|---|---|
| **Purpose** | Loads Java classes | Represents loaded class metadata |
| **Type** | Process/Tool | Object |
| **Hierarchy** | Bootstrap → Extension → Application | Single instance per class |
| **Method** | loadClass() | Class.forName(), .class |
| **Responsibility** | Loading | Representing |

**Examples:**

```java
public class ClassLoaderDemo {
    
    public static void main(String[] args) {
        
        // 1. GET CLASSLOADER
        ClassLoader cl = String.class.getClassLoader();
        System.out.println("ClassLoader: " + cl);
        
        // 2. CLASSLOADER HIERARCHY
        ClassLoader currentCL = String.class.getClassLoader();
        while (currentCL != null) {
            System.out.println("ClassLoader: " + currentCL);
            currentCL = currentCL.getParent();
        }
        
        // 3. CUSTOM CLASSLOADER
        class CustomClassLoader extends ClassLoader {
            @Override
            public Class<?> loadClass(String name) 
                    throws ClassNotFoundException {
                System.out.println("Loading: " + name);
                return super.loadClass(name);
            }
        }
        
        CustomClassLoader customCL = new CustomClassLoader();
        try {
            Class<?> clazz = customCL.loadClass("java.lang.String");
            System.out.println("Loaded: " + clazz.getName());
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
        
        // 4. CLASS OBJECT
        Class<?> clazz = String.class;
        System.out.println("Class name: " + clazz.getName());
        System.out.println("Simple name: " + clazz.getSimpleName());
        System.out.println("Superclass: " + clazz.getSuperclass());
        
        // 5. CLASS vs INSTANCE
        String str = "Hello";
        Class<?> clazz1 = str.getClass();      // Get from instance
        Class<?> clazz2 = String.class;        // Get from class literal
        System.out.println(clazz1 == clazz2);  // true (same Class object)
    }
}

// ClassLoader Types:
/*
Bootstrap ClassLoader (null in Java)
  ├─ Loads java.lang, java.util, etc.
  
Extension ClassLoader
  ├─ Loads from jre/lib/ext directory
  
Application ClassLoader
  └─ Loads from classpath (main application)
*/
```

---

### Marker Interface

#### 4. What is a marker interface?

**Answer:**

A **marker interface** has no methods - it's used to mark classes for special treatment.

**Examples:**

```java
// 1. MARKER INTERFACE (no methods)
public interface Serializable {
    // Empty - just marks class for serialization
}

public interface Cloneable {
    // Empty - marks class as cloneable
}

public interface RandomAccess {
    // Empty - marks list supports random access
}

// 2. USING MARKER INTERFACE
class Employee implements Serializable {
    private String name;
    private int id;
}

// 3. CHECKING MARKER INTERFACE
public class MarkerInterfaceDemo {
    public static void serialize(Object obj) throws IOException {
        if (obj instanceof Serializable) {
            // Serialize the object
            System.out.println(obj.getClass().getName() + 
                             " is serializable");
        } else {
            throw new NotSerializableException(
                "Object must implement Serializable");
        }
    }
    
    public static void main(String[] args) throws IOException {
        Employee emp = new Employee();
        serialize(emp);  // OK - implements Serializable
        
        String str = "Hello";
        serialize(str);  // OK - String implements Serializable
    }
}

// 4. CUSTOM MARKER INTERFACE
@interface Premium {
    // Marks premium users
}

@Premium
class PremiumUser {
    String name;
}

public class UserProcessor {
    public static void processUser(Object user) {
        if (user instanceof PremiumUser && 
            user.getClass().isAnnotationPresent(Premium.class)) {
            System.out.println("Premium user benefits applied");
        }
    }
}
```

---

## Design Principles

### SOLID Principles

#### 5. What are SOLID principles?

**Answer:**

SOLID is an acronym for five design principles that make code maintainable and flexible.

**S - Single Responsibility Principle (SRP)**

```java
// BAD: Multiple responsibilities
class Employee {
    void work() { }
    void saveToDatabase() { }
    void generateReport() { }
}

// GOOD: Single responsibility each
class Employee {
    void work() { }
}

class EmployeeRepository {
    void save(Employee emp) { }
}

class EmployeeReporter {
    void generate(Employee emp) { }
}
```

**O - Open/Closed Principle (OCP)**

```java
// BAD: Closed to extension
class DiscountCalculator {
    public double calculate(String type, double price) {
        if (type.equals("premium")) {
            return price * 0.2;
        } else if (type.equals("standard")) {
            return price * 0.1;
        }
        return 0;
    }
}

// GOOD: Open to extension
interface DiscountStrategy {
    double calculate(double price);
}

class PremiumDiscount implements DiscountStrategy {
    @Override
    public double calculate(double price) {
        return price * 0.2;
    }
}

class StandardDiscount implements DiscountStrategy {
    @Override
    public double calculate(double price) {
        return price * 0.1;
    }
}

class DiscountCalculator {
    private DiscountStrategy strategy;
    
    public DiscountCalculator(DiscountStrategy strategy) {
        this.strategy = strategy;
    }
    
    public double calculate(double price) {
        return strategy.calculate(price);
    }
}
```

**L - Liskov Substitution Principle (LSP)**

```java
// BAD: Subclass violates parent contract
class Bird {
    public void fly() {
        System.out.println("Flying");
    }
}

class Penguin extends Bird {
    @Override
    public void fly() {
        throw new UnsupportedOperationException(
            "Penguins cannot fly");
    }
}

// GOOD: Use correct hierarchy
interface Animal {
    void move();
}

interface Flyer extends Animal {
    void fly();
}

class Sparrow implements Flyer {
    @Override
    public void fly() {
        System.out.println("Sparrow flying");
    }
    
    @Override
    public void move() {
        fly();
    }
}

class Penguin implements Animal {
    @Override
    public void move() {
        System.out.println("Penguin swimming");
    }
}
```

**I - Interface Segregation Principle (ISP)**

```java
// BAD: Fat interface
interface Worker {
    void work();
    void eat();
    void manage();
}

class Robot implements Worker {
    @Override
    public void work() { }
    
    @Override
    public void eat() {  // Robots don't eat!
        throw new UnsupportedOperationException();
    }
    
    @Override
    public void manage() { }
}

// GOOD: Segregated interfaces
interface Worker {
    void work();
}

interface Eater {
    void eat();
}

interface Manager {
    void manage();
}

class Robot implements Worker {
    @Override
    public void work() { }
}

class Employee implements Worker, Eater, Manager {
    @Override
    public void work() { }
    
    @Override
    public void eat() { }
    
    @Override
    public void manage() { }
}
```

**D - Dependency Inversion Principle (DIP)**

```java
// BAD: High-level depends on low-level
class PaymentProcessor {
    private PayPalGateway paypal;  // Concrete dependency
    
    public PaymentProcessor() {
        this.paypal = new PayPalGateway();
    }
    
    public void process(double amount) {
        paypal.pay(amount);
    }
}

// GOOD: Both depend on abstraction
interface PaymentGateway {
    void pay(double amount);
}

class PayPalGateway implements PaymentGateway {
    @Override
    public void pay(double amount) {
        System.out.println("Processing via PayPal");
    }
}

class StripeGateway implements PaymentGateway {
    @Override
    public void pay(double amount) {
        System.out.println("Processing via Stripe");
    }
}

class PaymentProcessor {
    private PaymentGateway gateway;  // Abstract dependency
    
    public PaymentProcessor(PaymentGateway gateway) {
        this.gateway = gateway;  // Injected
    }
    
    public void process(double amount) {
        gateway.pay(amount);
    }
}
```

---

### Immutable Classes

#### 6. How to create an immutable class?

**Answer:**

**Rules:**

1. Declare class as `final` (prevent subclassing)
2. Make all fields `private final`
3. No setters
4. Deep copy mutable objects
5. Return copies in getters

**Example:**

```java
import java.util.*;

// IMMUTABLE CLASS
public final class ImmutablePerson {
    private final String name;
    private final int age;
    private final List<String> hobbies;  // Mutable object
    
    // Constructor with deep copy
    public ImmutablePerson(String name, int age, List<String> hobbies) {
        this.name = name;
        this.age = age;
        // Deep copy of mutable list
        this.hobbies = new ArrayList<>(hobbies);
    }
    
    // Getters only (no setters)
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
    
    // Return copy to prevent external modification
    public List<String> getHobbies() {
        return new ArrayList<>(hobbies);
    }
    
    @Override
    public String toString() {
        return "Person{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", hobbies=" + hobbies +
                '}';
    }
}

public class ImmutableDemo {
    public static void main(String[] args) {
        List<String> hobbies = new ArrayList<>();
        hobbies.add("Reading");
        hobbies.add("Coding");
        
        ImmutablePerson person = new ImmutablePerson("John", 30, hobbies);
        
        System.out.println("Original: " + person);
        
        // Try to modify original list
        hobbies.add("Gaming");
        System.out.println("After modifying original list: " + person);
        // Output: hobbies still [Reading, Coding]
        
        // Try to modify retrieved list
        List<String> retrieved = person.getHobbies();
        retrieved.add("Gaming");
        System.out.println("After modifying retrieved list: " + person);
        // Output: hobbies still [Reading, Coding]
    }
}

// Benefits of Immutability:
// 1. Thread-safe (no synchronization needed)
// 2. Can be cached and reused
// 3. Predictable behavior
// 4. Good for HashMap keys
// 5. Functional programming style
```

---

## Design Patterns

### Creational Patterns

#### 7. What is the Singleton pattern?

**Answer:**

**Singleton** ensures a class has only ONE instance and provides global access.

**Implementations:**

```java
// 1. EAGER INITIALIZATION (Thread-safe)
public class EagerSingleton {
    private static final EagerSingleton instance = 
        new EagerSingleton();
    
    private EagerSingleton() {
        // Private constructor
    }
    
    public static EagerSingleton getInstance() {
        return instance;
    }
}

// 2. LAZY INITIALIZATION (Not thread-safe)
public class LazySingleton {
    private static LazySingleton instance;
    
    private LazySingleton() { }
    
    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
}

// 3. SYNCHRONIZED LAZY INITIALIZATION (Thread-safe, slower)
public class SyncSingleton {
    private static SyncSingleton instance;
    
    private SyncSingleton() { }
    
    public static synchronized SyncSingleton getInstance() {
        if (instance == null) {
            instance = new SyncSingleton();
        }
        return instance;
    }
}

// 4. DOUBLE-CHECKED LOCKING (Thread-safe, efficient)
public class DoubleCheckedSingleton {
    private static volatile DoubleCheckedSingleton instance;
    
    private DoubleCheckedSingleton() { }
    
    public static DoubleCheckedSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckedSingleton.class) {
                if (instance == null) {
                    instance = new DoubleCheckedSingleton();
                }
            }
        }
        return instance;
    }
}

// 5. BILL PUGH SINGLETON (Best - uses classloader)
public class BillPughSingleton {
    private BillPughSingleton() { }
    
    private static class SingletonHelper {
        private static final BillPughSingleton INSTANCE = 
            new BillPughSingleton();
    }
    
    public static BillPughSingleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
}

// 6. ENUM SINGLETON (Best - serialization safe)
public enum EnumSingleton {
    INSTANCE;
    
    public void doSomething() {
        System.out.println("Singleton action");
    }
}

// Usage
EnumSingleton singleton = EnumSingleton.INSTANCE;

// 7. REAL-WORLD EXAMPLE: Logger
public final class Logger {
    private static final Logger INSTANCE = new Logger();
    
    private Logger() { }
    
    public static Logger getInstance() {
        return INSTANCE;
    }
    
    public void log(String message) {
        System.out.println("[LOG] " + message);
    }
}

// 8. BREAKING SINGLETON (using Reflection)
// Protect against reflection attacks:
public class SecureSingleton {
    private static volatile SecureSingleton instance;
    
    private SecureSingleton() {
        if (instance != null) {
            throw new RuntimeException(
                "Cannot create new instance");
        }
    }
    
    public static SecureSingleton getInstance() {
        if (instance == null) {
            synchronized (SecureSingleton.class) {
                if (instance == null) {
                    instance = new SecureSingleton();
                }
            }
        }
        return instance;
    }
}
```

---

#### 8. What is the Factory pattern?

**Answer:**

**Factory** creates objects without specifying their exact classes.

**Example:**

```java
// 1. SIMPLE FACTORY
interface DataSource {
    void connect();
}

class MySQLDataSource implements DataSource {
    @Override
    public void connect() {
        System.out.println("Connecting to MySQL");
    }
}

class PostgresDataSource implements DataSource {
    @Override
    public void connect() {
        System.out.println("Connecting to Postgres");
    }
}

// Factory class
class DataSourceFactory {
    public static DataSource create(String type) {
        switch(type.toLowerCase()) {
            case "mysql":
                return new MySQLDataSource();
            case "postgres":
                return new PostgresDataSource();
            default:
                throw new IllegalArgumentException(
                    "Unknown type: " + type);
        }
    }
}

// Usage
public class FactoryDemo {
    public static void main(String[] args) {
        DataSource mysql = DataSourceFactory.create("mysql");
        mysql.connect();  // Connecting to MySQL
        
        DataSource postgres = DataSourceFactory.create("postgres");
        postgres.connect();  // Connecting to Postgres
    }
}

// 2. ABSTRACT FACTORY
interface DatabaseFactory {
    DataSource createDataSource();
    Dialect createDialect();
}

interface Dialect {
    String getSQL(String query);
}

class MySQLFactory implements DatabaseFactory {
    @Override
    public DataSource createDataSource() {
        return new MySQLDataSource();
    }
    
    @Override
    public Dialect createDialect() {
        return new MySQLDialect();
    }
}

class MySQLDialect implements Dialect {
    @Override
    public String getSQL(String query) {
        return "MySQL: " + query;
    }
}

// 3. FACTORY METHOD (in class)
interface DatabaseConnection {
    void execute(String sql);
    
    static DatabaseConnection create(String type) {
        switch(type.toLowerCase()) {
            case "mysql":
                return new MySQLConnection();
            case "postgres":
                return new PostgresConnection();
            default:
                throw new IllegalArgumentException();
        }
    }
}

class MySQLConnection implements DatabaseConnection {
    @Override
    public void execute(String sql) {
        System.out.println("MySQL: " + sql);
    }
}

class PostgresConnection implements DatabaseConnection {
    @Override
    public void execute(String sql) {
        System.out.println("Postgres: " + sql);
    }
}

// Usage
DatabaseConnection conn = DatabaseConnection.create("mysql");
```

---

#### 9. What is the Builder pattern?

**Answer:**

**Builder** constructs complex objects step-by-step.

**Example:**

```java
public class StringBuilder_Pattern_Example {
    
    // Complex object
    static class Person {
        private String firstName;
        private String lastName;
        private int age;
        private String email;
        private String phone;
        private String address;
        
        // Private constructor
        private Person(Builder builder) {
            this.firstName = builder.firstName;
            this.lastName = builder.lastName;
            this.age = builder.age;
            this.email = builder.email;
            this.phone = builder.phone;
            this.address = builder.address;
        }
        
        // Static Builder class
        public static class Builder {
            private String firstName;
            private String lastName;
            private int age;
            private String email;
            private String phone;
            private String address;
            
            public Builder firstName(String firstName) {
                this.firstName = firstName;
                return this;
            }
            
            public Builder lastName(String lastName) {
                this.lastName = lastName;
                return this;
            }
            
            public Builder age(int age) {
                this.age = age;
                return this;
            }
            
            public Builder email(String email) {
                this.email = email;
                return this;
            }
            
            public Builder phone(String phone) {
                this.phone = phone;
                return this;
            }
            
            public Builder address(String address) {
                this.address = address;
                return this;
            }
            
            public Person build() {
                return new Person(this);
            }
        }
        
        @Override
        public String toString() {
            return "Person{" +
                    "firstName='" + firstName + '\'' +
                    ", lastName='" + lastName + '\'' +
                    ", age=" + age +
                    ", email='" + email + '\'' +
                    ", phone='" + phone + '\'' +
                    ", address='" + address + '\'' +
                    '}';
        }
    }
    
    // Usage
    public static void main(String[] args) {
        Person person = new Person.Builder()
            .firstName("John")
            .lastName("Doe")
            .age(30)
            .email("john@example.com")
            .phone("123-456-7890")
            .address("123 Main St")
            .build();
        
        System.out.println(person);
    }
}
```

---

### Structural Patterns

#### 10. What is the Decorator pattern?

**Answer:**

**Decorator** adds behavior to objects dynamically.

**Example:**

```java
// Component interface
interface Coffee {
    double cost();
    String description();
}

// Concrete component
class SimpleCoffee implements Coffee {
    @Override
    public double cost() {
        return 2.0;
    }
    
    @Override
    public String description() {
        return "Simple coffee";
    }
}

// Abstract decorator
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;
    
    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public double cost() {
        return coffee.cost() + 0.5;
    }
    
    @Override
    public String description() {
        return coffee.description() + ", Milk";
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }
    
    @Override
    public double cost() {
        return coffee.cost() + 0.2;
    }
    
    @Override
    public String description() {
        return coffee.description() + ", Sugar";
    }
}

// Usage
public class DecoratorDemo {
    public static void main(String[] args) {
        Coffee coffee = new SimpleCoffee();
        System.out.println(coffee.description() + 
                         " - $" + coffee.cost());
        
        coffee = new MilkDecorator(coffee);
        System.out.println(coffee.description() + 
                         " - $" + coffee.cost());
        
        coffee = new SugarDecorator(coffee);
        System.out.println(coffee.description() + 
                         " - $" + coffee.cost());
    }
}

// Output:
// Simple coffee - $2.0
// Simple coffee, Milk - $2.5
// Simple coffee, Milk, Sugar - $2.7
```

---

### Behavioral Patterns

#### 11. What is the Observer pattern?

**Answer:**

**Observer** notifies multiple objects about state changes.

**Example:**

```java
import java.util.*;

// Observer interface
interface Observer {
    void update(String message);
}

// Subject/Publisher
class NewsAgency {
    private List<Observer> observers = new ArrayList<>();
    private String news;
    
    public void subscribe(Observer observer) {
        observers.add(observer);
    }
    
    public void unsubscribe(Observer observer) {
        observers.remove(observer);
    }
    
    public void publishNews(String news) {
        this.news = news;
        notifyObservers();
    }
    
    private void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(news);
        }
    }
}

// Concrete observers
class EmailObserver implements Observer {
    private String emailAddress;
    
    public EmailObserver(String emailAddress) {
        this.emailAddress = emailAddress;
    }
    
    @Override
    public void update(String message) {
        System.out.println("Email to " + emailAddress + 
                         ": " + message);
    }
}

class SMSObserver implements Observer {
    private String phoneNumber;
    
    public SMSObserver(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    @Override
    public void update(String message) {
        System.out.println("SMS to " + phoneNumber + 
                         ": " + message);
    }
}

// Usage
public class ObserverDemo {
    public static void main(String[] args) {
        NewsAgency agency = new NewsAgency();
        
        EmailObserver email = new EmailObserver("john@example.com");
        SMSObserver sms = new SMSObserver("123-456-7890");
        
        agency.subscribe(email);
        agency.subscribe(sms);
        
        agency.publishNews("Breaking News!");
        // Email to john@example.com: Breaking News!
        // SMS to 123-456-7890: Breaking News!
    }
}
```

---

## Java EE Basics

### JDBC

#### 12. What is the difference between Statement and PreparedStatement?

**Answer:**

| Aspect | Statement | PreparedStatement |
|--------|-----------|------------------|
| **Type** | Simple SQL | Precompiled SQL |
| **Parameters** | String concatenation | Parameterized (?) |
| **Compilation** | Each execution | Once |
| **Performance** | Slower for repeated | Faster |
| **SQL Injection** | Vulnerable | Safe |
| **Use Case** | One-time queries | Repeated queries |

**Examples:**

```java
import java.sql.*;

public class JDBCDemo {
    
    // 1. STATEMENT (NOT RECOMMENDED)
    static void usingStatement() throws SQLException {
        String query = "SELECT * FROM users WHERE id = 1";
        Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost/mydb", "user", "pass");
        
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(query);
        
        while (rs.next()) {
            System.out.println(rs.getString("name"));
        }
        
        rs.close();
        stmt.close();
        conn.close();
    }
    
    // 2. PREPAREDSTATEMENT (RECOMMENDED)
    static void usingPreparedStatement(int userId) 
            throws SQLException {
        String query = "SELECT * FROM users WHERE id = ?";
        Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost/mydb", "user", "pass");
        
        // Prepare once
        PreparedStatement pstmt = conn.prepareStatement(query);
        pstmt.setInt(1, userId);  // Safe parameter binding
        
        ResultSet rs = pstmt.executeQuery();
        
        while (rs.next()) {
            System.out.println(rs.getString("name"));
        }
        
        rs.close();
        pstmt.close();
        conn.close();
    }
    
    // 3. SQL INJECTION PROTECTION
    // VULNERABLE (Statement):
    static void vulnerableCode(String userId) throws SQLException {
        // If userId = "1 OR 1=1" - bypasses authentication!
        String query = "SELECT * FROM users WHERE id = " + userId;
        Statement stmt = conn.createStatement();
        stmt.executeQuery(query);
    }
    
    // SAFE (PreparedStatement):
    static void safeCode(String userId) throws SQLException {
        String query = "SELECT * FROM users WHERE id = ?";
        PreparedStatement pstmt = conn.prepareStatement(query);
        pstmt.setString(1, userId);  // Parameter is escaped
        pstmt.executeQuery();
    }
    
    // 4. BATCH PROCESSING
    static void batchProcessing() throws SQLException {
        String query = "INSERT INTO users (name, email) VALUES (?, ?)";
        
        Connection conn = DriverManager.getConnection(
            "jdbc:mysql://localhost/mydb", "user", "pass");
        
        PreparedStatement pstmt = conn.prepareStatement(query);
        
        // Add batch
        for (int i = 0; i < 1000; i++) {
            pstmt.setString(1, "User" + i);
            pstmt.setString(2, "user" + i + "@example.com");
            pstmt.addBatch();
        }
        
        // Execute batch (more efficient)
        int[] results = pstmt.executeBatch();
        System.out.println("Inserted " + results.length + " rows");
        
        pstmt.close();
        conn.close();
    }
    
    // 5. CONNECTION POOLING
    // Use DataSource instead of DriverManager
    /*
    <bean id="dataSource" 
          class="org.apache.commons.dbcp.BasicDataSource">
        <property name="driverClassName" 
                  value="com.mysql.jdbc.Driver"/>
        <property name="url" 
                  value="jdbc:mysql://localhost/mydb"/>
        <property name="username" value="user"/>
        <property name="password" value="pass"/>
        <property name="maxActive" value="20"/>
        <property name="maxIdle" value="10"/>
    </bean>
    */
}
```

---

## Summary

This comprehensive guide covers:

1. **Advanced Concepts**:
   - Reflection API (class inspection, method invocation)
   - Annotations (predefined, meta, custom)
   - ClassLoader (loading mechanism)
   - Marker interfaces

2. **Design Principles**:
   - SOLID principles (5 principles)
   - Immutable class creation
   - Composition vs Aggregation

3. **Design Patterns**:
   - Creational (Singleton, Factory, Builder)
   - Structural (Decorator, Adapter, Facade, Proxy)
   - Behavioral (Observer, Strategy)

4. **Java EE**:
   - JDBC (Statement vs PreparedStatement)
   - Connection pooling
   - SQL injection prevention

**Interview Tips:**

✅ Understand **why** patterns exist
✅ Compare and contrast options
✅ Provide working code
✅ Discuss trade-offs
✅ Real-world examples

This guide prepares you for **senior-level Java and architecture interviews**!
