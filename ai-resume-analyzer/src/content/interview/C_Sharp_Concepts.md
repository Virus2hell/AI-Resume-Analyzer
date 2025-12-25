# C# Concepts: Complete Interview Guide

## 1. What is C#?

**Interview Answer:**

C# is a modern, object-oriented, strongly-typed programming language developed by Microsoft as part of the .NET framework. It combines the power of C++ with the simplicity of Visual Basic and incorporates modern language features like LINQ, async/await, and lambda expressions. C# is designed to be simple, safe, modern, and interoperable with other .NET languages. It supports both value types and reference types, automatic garbage collection, and runs on multiple platforms through .NET.

**Key Features:**
- Object-oriented and component-oriented
- Type-safe and memory-safe
- Automatic garbage collection
- Exception handling
- LINQ support
- Async/await programming
- Cross-platform support

---

## 2. System

**Interview Answer:**

The `System` namespace is the root namespace in C# that contains fundamental classes and interfaces used throughout the .NET Framework. It provides access to core functionality like console operations, data types, collections, exceptions, and more. You must include `using System;` to access these classes.

**Common Classes in System:**
- `Console` - for input/output operations
- `Exception` - base class for all exceptions
- `DateTime`, `TimeSpan` - for date and time operations
- `String`, `Int32`, `Double` - fundamental data types
- `Array` - for array operations
- `Enum` - base class for enumerations

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Using System.Console for console operations
        Console.WriteLine("Hello from System namespace");
        
        // Using System.DateTime
        DateTime now = DateTime.Now;
        Console.WriteLine($"Current time: {now}");
        
        // Using System.Int32
        int number = Int32.MaxValue; // Maximum value for int
        Console.WriteLine($"Max int value: {number}");
    }
}
```

---

## 3. Visual Studio Environment

**Interview Answer:**

Visual Studio is the Integrated Development Environment (IDE) provided by Microsoft for developing C# applications. It offers code editing, debugging, compilation, and deployment tools. The Visual Studio environment includes features like IntelliSense (code completion), debugging tools, solution explorer, and NuGet package manager. You can create console applications, web applications, Windows desktop applications, and more using Visual Studio.

**Key Components:**
- **Solution Explorer** - manages files and projects
- **Code Editor** - with IntelliSense support
- **Debugger** - breakpoints, watch variables
- **NuGet Package Manager** - manage dependencies
- **Build and Run** - compile and execute applications

**Example Setup:**
Visual Studio uses project files (.csproj) to organize your code and dependencies. A typical project structure includes:

```
MyProject/
├── Program.cs (Main entry point)
├── MyClass.cs (Your classes)
└── MyProject.csproj (Project configuration)
```

---

## 4. Namespace

**Interview Answer:**

A namespace is a container for organizing code and avoiding name conflicts. It provides a way to organize classes, interfaces, enums, and other types logically. Multiple classes can have the same name if they're in different namespaces. Namespaces prevent naming collisions and help organize large codebases. You define a namespace using the `namespace` keyword.

**Example Code:**

```csharp
// Define a namespace
namespace MyCompany.PaymentSystem
{
    // Classes inside this namespace
    public class PaymentProcessor
    {
        public void ProcessPayment(decimal amount)
        {
            Console.WriteLine($"Processing payment of ${amount}");
        }
    }
}

namespace MyCompany.InventorySystem
{
    // Different namespace can have same class name
    public class PaymentProcessor
    {
        public void ProcessInventory(string item)
        {
            Console.WriteLine($"Processing inventory for {item}");
        }
    }
}

class Program
{
    static void Main()
    {
        // Access using fully qualified names
        MyCompany.PaymentSystem.PaymentProcessor processor1 = 
            new MyCompany.PaymentSystem.PaymentProcessor();
        processor1.ProcessPayment(100);
        
        MyCompany.InventorySystem.PaymentProcessor processor2 = 
            new MyCompany.InventorySystem.PaymentProcessor();
        processor2.ProcessInventory("Laptop");
    }
}
```

---

## 5. Class Basics

**Interview Answer:**

A class is a blueprint for creating objects. It defines the structure (properties/fields) and behavior (methods) that objects will have. Classes are reference types stored on the heap. A class can contain fields, properties, methods, constructors, and nested classes. Classes support inheritance and can implement interfaces.

**Key Points:**
- Classes are reference types
- Objects are instances of classes
- Classes can inherit from one base class
- Classes support encapsulation and abstraction

**Example Code:**

```csharp
// Define a class
public class Student
{
    // Field - stores data
    private string name;
    private int age;
    private double gpa;
    
    // Property - encapsulates field access
    public string Name
    {
        get { return name; }
        set { name = value; }
    }
    
    // Method - defines behavior
    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {name}, Age: {age}, GPA: {gpa}");
    }
    
    // Method to calculate grade
    public char GetGrade()
    {
        if (gpa >= 3.5) return 'A';
        else if (gpa >= 3.0) return 'B';
        else if (gpa >= 2.5) return 'C';
        else return 'F';
    }
}

class Program
{
    static void Main()
    {
        // Create object instance
        Student student = new Student();
        student.Name = "John Doe";
        student.DisplayInfo();
    }
}
```

---

## 6. Main Function

**Interview Answer:**

The `Main` function is the entry point of a C# application. When you run a C# program, the runtime looks for the Main method to execute. There can be only one Main method in a program (unless using multiple Main methods with different signatures). Main must be static because it's called without creating an instance of the class.

**Variants of Main:**

```csharp
// Variant 1: No return, no parameters
public static void Main()
{
    Console.WriteLine("Hello World");
}

// Variant 2: With return type int
public static int Main()
{
    Console.WriteLine("Hello World");
    return 0; // 0 indicates success
}

// Variant 3: With string array parameter
public static void Main(string[] args)
{
    // args contains command-line arguments
    foreach (string arg in args)
    {
        Console.WriteLine(arg);
    }
}

// Variant 4: Both return and parameters
public static int Main(string[] args)
{
    if (args.Length > 0)
    {
        Console.WriteLine($"First argument: {args[0]}");
    }
    return 0;
}
```

**Example Program:**

```csharp
class Program
{
    static void Main(string[] args)
    {
        // Entry point of the program
        Console.WriteLine("Program started");
        
        // Call other methods
        PerformCalculation(5, 10);
        
        Console.WriteLine("Program ended");
    }
    
    static void PerformCalculation(int a, int b)
    {
        int sum = a + b;
        Console.WriteLine($"Sum: {sum}");
    }
}
```

---

## 7. Void

**Interview Answer:**

`void` is a return type that indicates a method does not return any value. When a method is marked as `void`, it performs operations but doesn't send any data back to the caller. The method will complete and return control to the caller without returning a value. This is useful for methods that perform actions like printing, updating state, or logging.

**Example Code:**

```csharp
class Calculator
{
    // Method with void return - performs action but returns nothing
    public void PrintSum(int a, int b)
    {
        int sum = a + b;
        // Prints result but doesn't return it
        Console.WriteLine($"Sum: {sum}");
    }
    
    // Method with int return - returns a value
    public int GetSum(int a, int b)
    {
        int sum = a + b;
        return sum; // Returns the result to caller
    }
    
    // Void method that modifies a list
    public void AddToList(List<int> numbers, int value)
    {
        numbers.Add(value);
        // Doesn't return anything
    }
    
    // Void method for logging
    public void LogMessage(string message)
    {
        Console.WriteLine($"[LOG] {DateTime.Now}: {message}");
        // Performs action without returning value
    }
}

class Program
{
    static void Main()
    {
        Calculator calc = new Calculator();
        
        // Calling void method - no return value expected
        calc.PrintSum(10, 20); // Output: Sum: 30
        
        // Calling non-void method - return value captured
        int result = calc.GetSum(15, 25); // result = 40
        Console.WriteLine($"Result: {result}");
        
        // Calling void method that modifies list
        List<int> numbers = new List<int> { 1, 2, 3 };
        calc.AddToList(numbers, 4);
        Console.WriteLine($"List has {numbers.Count} elements");
    }
}
```

---

## 8. Main Arguments

**Interview Answer:**

Main arguments (also called command-line arguments) are values passed to the Main method when running the program from the command line. They're received as a `string[]` array parameter in the Main method. These arguments allow you to pass configuration, file paths, or other parameters when launching the application without hardcoding them.

**How to Pass Arguments:**

From command line:
```
dotnet run arg1 arg2 arg3
```

Or in Visual Studio: Project Properties → Debug → Command line arguments

**Example Code:**

```csharp
class Program
{
    // Main with command-line arguments
    static void Main(string[] args)
    {
        // args is an array of strings passed from command line
        
        // Check if arguments were provided
        if (args.Length == 0)
        {
            Console.WriteLine("No arguments provided");
            Console.WriteLine("Usage: Program.exe <name> <age>");
            return;
        }
        
        // Access arguments by index
        Console.WriteLine($"Total arguments: {args.Length}");
        
        for (int i = 0; i < args.Length; i++)
        {
            Console.WriteLine($"Argument {i}: {args[i]}");
        }
        
        // Example: Get specific arguments
        if (args.Length >= 2)
        {
            string name = args[0];
            string ageStr = args[1];
            
            if (int.TryParse(ageStr, out int age))
            {
                Console.WriteLine($"Hello {name}, you are {age} years old");
            }
            else
            {
                Console.WriteLine("Age must be a number");
            }
        }
    }
}

// When run: dotnet run John 25
// Output:
// Total arguments: 2
// Argument 0: John
// Argument 1: 25
// Hello John, you are 25 years old
```

---

## 9. WriteLine

**Interview Answer:**

`WriteLine` is a static method of the `Console` class that outputs text to the console and moves to the next line. It's used for displaying information to the user. WriteLine automatically adds a newline character at the end. For output without a newline, use `Write` instead. WriteLine supports string interpolation and formatting.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Basic WriteLine
        Console.WriteLine("Hello World");
        
        // WriteLine with multiple lines
        Console.WriteLine("Line 1");
        Console.WriteLine("Line 2");
        
        // String concatenation with WriteLine
        string name = "John";
        int age = 30;
        Console.WriteLine("Name: " + name + ", Age: " + age);
        
        // String interpolation (modern way)
        Console.WriteLine($"Name: {name}, Age: {age}");
        
        // Writing numbers
        Console.WriteLine(42);
        Console.WriteLine(3.14);
        
        // Writing boolean values
        Console.WriteLine(true);
        Console.WriteLine(false);
        
        // WriteLine with expressions
        Console.WriteLine(10 + 20);
        Console.WriteLine($"Sum: {10 + 20}");
        
        // Formatted output
        Console.WriteLine($"Price: ${99.99:F2}");
        
        // Difference between Write and WriteLine
        Console.Write("This doesn't move to next line. ");
        Console.Write("Same line here.");
        Console.WriteLine(); // Now move to next line
        Console.WriteLine("This is on new line");
    }
}
```

---

## 10. Console Methods

**Interview Answer:**

The `Console` class provides methods for input/output operations. Common methods include `WriteLine()`, `Write()`, `ReadLine()`, `Read()`, `Clear()`, `ReadKey()`, and `Beep()`. These methods allow interaction with the user through the console window. WriteLine outputs with newline, Write outputs without newline, and ReadLine reads user input as a string.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Console.WriteLine() - output with newline
        Console.WriteLine("=== Console Methods Demo ===");
        
        // Console.Write() - output without newline
        Console.Write("Enter your name: ");
        
        // Console.ReadLine() - read entire line as string
        string name = Console.ReadLine();
        Console.WriteLine($"Hello, {name}!");
        
        // Console.Read() - read single character as int
        Console.Write("Press a key: ");
        int charCode = Console.Read();
        Console.WriteLine($"Character code: {charCode}");
        
        // Console.ReadKey() - read key press with KeyInfo
        Console.Write("Press any key: ");
        ConsoleKeyInfo keyInfo = Console.ReadKey();
        Console.WriteLine();
        Console.WriteLine($"You pressed: {keyInfo.Key}");
        
        // Console.Clear() - clear console screen
        // Console.Clear();
        
        // Console.Beep() - make beep sound
        // Console.Beep();
        
        // Console.ForegroundColor and BackgroundColor
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("This text is green");
        Console.ResetColor(); // Reset to default
        
        // Console.SetCursorPosition()
        Console.WriteLine("This is position 0");
        Console.SetCursorPosition(5, 0);
        Console.Write("Moved to position 5");
        
        // Console properties
        Console.WriteLine($"Console width: {Console.WindowWidth}");
        Console.WriteLine($"Console height: {Console.WindowHeight}");
    }
}
```

---

## 11. Receive User Input

**Interview Answer:**

User input is received in C# using `Console.ReadLine()` for strings or `Console.Read()` for single characters. `ReadLine()` reads an entire line and returns it as a string. To convert string input to other types, use parsing methods like `int.Parse()`, `double.Parse()`, or the safer `int.TryParse()`. Always validate input to prevent errors.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Method 1: Reading string input
        Console.Write("Enter your name: ");
        string name = Console.ReadLine();
        Console.WriteLine($"Your name is: {name}");
        
        // Method 2: Reading integer input using Parse
        Console.Write("Enter your age: ");
        string ageInput = Console.ReadLine();
        int age = int.Parse(ageInput);
        Console.WriteLine($"Your age is: {age}");
        
        // Method 3: Reading integer input using TryParse (safer)
        Console.Write("Enter a number: ");
        string numberInput = Console.ReadLine();
        
        if (int.TryParse(numberInput, out int number))
        {
            Console.WriteLine($"You entered: {number}");
        }
        else
        {
            Console.WriteLine("Invalid input! Please enter a number.");
        }
        
        // Method 4: Reading double/decimal
        Console.Write("Enter price: ");
        string priceInput = Console.ReadLine();
        
        if (double.TryParse(priceInput, out double price))
        {
            Console.WriteLine($"Price: ${price}");
        }
        
        // Method 5: Reading multiple values on single line
        Console.Write("Enter two numbers separated by space: ");
        string[] inputs = Console.ReadLine().Split(' ');
        
        if (int.TryParse(inputs[0], out int num1) && 
            int.TryParse(inputs[1], out int num2))
        {
            Console.WriteLine($"Sum: {num1 + num2}");
        }
        
        // Method 6: Reading single character
        Console.Write("Press a key: ");
        char key = Console.ReadKey().KeyChar;
        Console.WriteLine($"You pressed: {key}");
    }
}

// Example output:
// Enter your name: John
// Your name is: John
// Enter your age: 25
// Your age is: 25
```

---

## 12. Variables

**Interview Answer:**

Variables are containers for storing data values. In C#, you must declare a variable with a data type before using it. Variables have scope (where they can be accessed), and must be initialized before use. C# is statically typed, meaning the type is determined at compile time. You can declare multiple variables of the same type or use `var` keyword for type inference.

**Variable Declaration Syntax:**
```csharp
dataType variableName = value;
```

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Basic variable declaration
        int age = 25;
        string name = "John";
        double salary = 50000.50;
        bool isActive = true;
        
        // Variable declaration without initialization
        int count;
        count = 10; // Must initialize before use
        
        // Type inference with var keyword
        var city = "New York"; // Compiler infers type as string
        var population = 8000000; // Compiler infers type as int
        
        // Multiple variables of same type
        int x = 10, y = 20, z = 30;
        
        // Constants - value cannot change after initialization
        const int MAX_USERS = 100;
        
        // Variable naming conventions (camelCase for local variables)
        string firstName = "John";
        string lastName = "Doe";
        int totalEmployees = 500;
        
        // Using variables in calculations
        int num1 = 15;
        int num2 = 25;
        int sum = num1 + num2;
        
        // String concatenation
        string fullName = firstName + " " + lastName;
        
        // String interpolation
        Console.WriteLine($"Full Name: {fullName}");
        Console.WriteLine($"Age: {age}");
        Console.WriteLine($"Salary: {salary}");
        
        // Variable scope example
        if (age >= 18)
        {
            string status = "Adult"; // Local scope to if block
            Console.WriteLine(status); // Can access within block
        }
        // Console.WriteLine(status); // Error! status not in scope
        
        // Display variable values
        Console.WriteLine($"Count: {count}");
        Console.WriteLine($"Sum: {sum}");
        Console.WriteLine($"Max users: {MAX_USERS}");
    }
}
```

---

## 13. Data Types

**Interview Answer:**

C# has two main categories of data types: **Value Types** and **Reference Types**. Value types (int, double, bool, struct) store the actual value on the stack. Reference types (class, string, array, interface) store a reference to an object on the heap. C# also provides nullable types to allow null values for value types. Common value types include int, double, decimal, bool, char, and enum.

**Value Types vs Reference Types:**

| Feature | Value Type | Reference Type |
|---------|-----------|-----------------|
| Storage | Stack | Heap |
| Example | int, double, struct | class, string, array |
| Copy behavior | Copies value | Copies reference |
| Null support | No (except nullable) | Yes |
| Performance | Faster | Slower |

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // INTEGER TYPES
        byte byteVar = 255; // 8-bit unsigned
        sbyte sbyteVar = -128; // 8-bit signed
        short shortVar = -32768; // 16-bit signed
        ushort ushortVar = 65535; // 16-bit unsigned
        int intVar = -2147483648; // 32-bit signed
        uint uintVar = 4294967295; // 32-bit unsigned
        long longVar = -9223372036854775808; // 64-bit signed
        ulong ulongVar = 18446744073709551615; // 64-bit unsigned
        
        // FLOATING POINT TYPES
        float floatVar = 3.14f; // 32-bit floating point
        double doubleVar = 3.14159; // 64-bit floating point
        decimal decimalVar = 19.99m; // 128-bit precise decimal
        
        // BOOLEAN TYPE
        bool isTrue = true;
        bool isFalse = false;
        
        // CHARACTER TYPE
        char charVar = 'A';
        char numChar = '5';
        
        // STRING TYPE (Reference type)
        string stringVar = "Hello World";
        string emptyString = "";
        string nullString = null;
        
        // Display values
        Console.WriteLine($"Byte: {byteVar}");
        Console.WriteLine($"Int: {intVar}");
        Console.WriteLine($"Float: {floatVar}");
        Console.WriteLine($"Double: {doubleVar}");
        Console.WriteLine($"Decimal: {decimalVar}");
        Console.WriteLine($"Boolean: {isTrue}");
        Console.WriteLine($"Char: {charVar}");
        Console.WriteLine($"String: {stringVar}");
        
        // Type conversion and sizes
        Console.WriteLine($"Size of int: {sizeof(int)} bytes");
        Console.WriteLine($"Size of double: {sizeof(double)} bytes");
        Console.WriteLine($"Size of decimal: {sizeof(decimal)} bytes");
        
        // Nullable types
        int? nullableInt = null;
        double? nullableDouble = 3.14;
        bool? nullableBool = null;
        
        Console.WriteLine($"Nullable int: {nullableInt}");
        Console.WriteLine($"Nullable double: {nullableDouble}");
    }
}
```

---

## 14. Casting

**Interview Answer:**

Casting is converting one data type to another. There are two types: **Implicit Casting** (automatic, safe conversion from smaller to larger type) and **Explicit Casting** (requires explicit conversion operator, may lose data). You can cast between compatible numeric types. For incompatible types, use methods like `Convert.ToInt32()` or parsing methods like `int.Parse()`. Boxing converts value types to object, unboxing converts back.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // IMPLICIT CASTING - Automatic conversion (safe)
        int intValue = 10;
        long longValue = intValue; // int fits into long
        double doubleValue = intValue; // int fits into double
        
        Console.WriteLine($"Int to Long: {longValue}");
        Console.WriteLine($"Int to Double: {doubleValue}");
        
        // EXPLICIT CASTING - Manual conversion with cast operator
        double price = 19.99;
        int roundedPrice = (int)price; // Loses decimal part
        Console.WriteLine($"Double to Int: {roundedPrice}"); // Output: 19
        
        long largeNumber = 100000;
        int smallNumber = (int)largeNumber;
        Console.WriteLine($"Long to Int: {smallNumber}");
        
        // STRING TO NUMBER CASTING
        string numberString = "42";
        
        // Method 1: Using Parse (throws exception if invalid)
        int parsedNumber = int.Parse(numberString);
        Console.WriteLine($"Parsed: {parsedNumber}");
        
        // Method 2: Using TryParse (safer, returns bool)
        if (int.TryParse(numberString, out int result))
        {
            Console.WriteLine($"Converted: {result}");
        }
        
        // Method 3: Using Convert class
        int convertedNumber = Convert.ToInt32(numberString);
        Console.WriteLine($"Converted via Convert: {convertedNumber}");
        
        // NUMBER TO STRING CASTING
        int number = 123;
        string strNumber = number.ToString();
        Console.WriteLine($"Number to String: {strNumber}");
        
        double decimal_num = 3.14;
        string strDecimal = decimal_num.ToString();
        Console.WriteLine($"Double to String: {strDecimal}");
        
        // BOXING AND UNBOXING
        int originalInt = 42;
        object boxedValue = originalInt; // Boxing - value to object
        Console.WriteLine($"Boxed value: {boxedValue}");
        
        int unboxedValue = (int)boxedValue; // Unboxing - object to value
        Console.WriteLine($"Unboxed value: {unboxedValue}");
        
        // CHAR TO INT CASTING
        char character = 'A';
        int charCode = (int)character; // Get ASCII value
        Console.WriteLine($"Char 'A' to ASCII: {charCode}"); // Output: 65
        
        // Potential data loss with casting
        int largeInt = 300;
        byte smallByte = (byte)largeInt; // Explicit cast, may lose data
        Console.WriteLine($"Int 300 to Byte: {smallByte}"); // Output: 44 (overflow)
    }
}
```

---

## 15. Formatting Output

**Interview Answer:**

Output formatting allows you to control how values are displayed. C# provides string interpolation (using `$` prefix), `String.Format()` method, and composite formatting with format specifiers. Format specifiers define how numbers, dates, and currencies should appear. Common specifiers include `D` (decimal), `F` (fixed-point), `C` (currency), `P` (percentage), `N` (number with commas).

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        int number = 12345;
        double price = 99.99;
        DateTime date = DateTime.Now;
        
        // STRING INTERPOLATION - Modern way
        Console.WriteLine($"Number: {number}");
        Console.WriteLine($"Price: ${price}");
        Console.WriteLine($"Date: {date}");
        
        // STRING INTERPOLATION WITH FORMAT SPECIFIERS
        // Format: {variable:formatSpecifier}
        
        // Decimal format (D) - pads with zeros
        Console.WriteLine($"Number with padding: {number:D8}"); // Output: 00012345
        
        // Fixed-point (F) - sets decimal places
        Console.WriteLine($"Price: {price:F2}"); // Output: 99.99
        Console.WriteLine($"Price: {price:F0}"); // Output: 100
        
        // Currency (C) - displays as currency
        Console.WriteLine($"Currency: {price:C}"); // Output: $99.99
        Console.WriteLine($"Currency: {price:C2}"); // Output: $99.99
        
        // Percentage (P) - displays as percentage
        double percentage = 0.75;
        Console.WriteLine($"Percentage: {percentage:P}"); // Output: 75.00%
        Console.WriteLine($"Percentage: {percentage:P1}"); // Output: 75.0%
        
        // Number (N) - displays with thousand separators
        Console.WriteLine($"Number: {number:N}"); // Output: 12,345.00
        Console.WriteLine($"Number: {number:N0}"); // Output: 12,345
        
        // Scientific notation (E)
        double largeNumber = 123456;
        Console.WriteLine($"Scientific: {largeNumber:E}"); // Output: 1.234560E+005
        
        // Hexadecimal (X)
        int hex = 255;
        Console.WriteLine($"Hexadecimal: {hex:X}"); // Output: FF
        Console.WriteLine($"Hexadecimal: {hex:x}"); // Output: ff
        
        // Date and Time formatting
        Console.WriteLine($"Date Short: {date:d}"); // Output: 11/30/2025
        Console.WriteLine($"Date Long: {date:D}"); // Output: Sunday, November 30, 2025
        Console.WriteLine($"Time: {date:t}"); // Output: 8:13 PM
        Console.WriteLine($"Full DateTime: {date:g}"); // Output: 11/30/2025 8:13 PM
        
        // Custom date format
        Console.WriteLine($"Custom Date: {date:yyyy-MM-dd HH:mm:ss}");
        
        // STRING.FORMAT() METHOD - Traditional way
        string formatted = String.Format("Number: {0:D8}, Price: {1:C}", number, price);
        Console.WriteLine(formatted);
        
        // Alignment formatting (padding)
        Console.WriteLine($"Left align: |{number,-10}|"); // Output: |12345     |
        Console.WriteLine($"Right align: |{number,10}|"); // Output: |     12345|
        
        // Combining alignment and formatting
        Console.WriteLine($"Price right: |{price,10:C}|"); // Output: |    $99.99|
    }
}
```

---

## 16. String Functions

**Interview Answer:**

Strings in C# are immutable (once created, they cannot be changed). The `String` class provides many useful methods for manipulation: `Length` (get length), `ToUpper()`/`ToLower()` (change case), `Substring()` (extract part), `IndexOf()`/`LastIndexOf()` (find position), `Replace()` (replace characters), `Split()` (split into array), `Trim()` (remove whitespace), `Contains()` (check if string contains text), `StartsWith()`/`EndsWith()` (check beginning/end).

**Example Code:**

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        string text = "  Hello World C#  ";
        string sentence = "The quick brown fox jumps over lazy dog";
        
        // STRING PROPERTIES AND METHODS
        
        // Length - returns number of characters
        Console.WriteLine($"Length: {text.Length}"); // Output: 17
        
        // ToUpper() and ToLower() - case conversion
        Console.WriteLine($"Upper: {text.ToUpper()}"); // Output:   HELLO WORLD C#
        Console.WriteLine($"Lower: {text.ToLower()}"); // Output:   hello world c#
        
        // Trim(), TrimStart(), TrimEnd() - remove whitespace
        Console.WriteLine($"Trimmed: '{text.Trim()}'"); // Output: 'Hello World C#'
        Console.WriteLine($"TrimStart: '{text.TrimStart()}'"); // Output: 'Hello World C#  '
        Console.WriteLine($"TrimEnd: '{text.TrimEnd()}'"); // Output: '  Hello World C#'
        
        // Substring() - extract part of string
        string word = "Programming";
        Console.WriteLine($"Substring(0, 7): {word.Substring(0, 7)}"); // Output: Program
        Console.WriteLine($"Substring(7): {word.Substring(7)}"); // Output: ming
        
        // IndexOf() and LastIndexOf() - find position
        string searchText = "hello world hello";
        int firstIndex = searchText.IndexOf("hello");
        int lastIndex = searchText.LastIndexOf("hello");
        Console.WriteLine($"First index of 'hello': {firstIndex}"); // Output: 0
        Console.WriteLine($"Last index of 'hello': {lastIndex}"); // Output: 12
        
        // Contains() - check if contains substring
        if (sentence.Contains("quick"))
        {
            Console.WriteLine("Sentence contains 'quick'");
        }
        
        // StartsWith() and EndsWith() - check beginning/end
        if (sentence.StartsWith("The"))
        {
            Console.WriteLine("Sentence starts with 'The'");
        }
        
        if (sentence.EndsWith("dog"))
        {
            Console.WriteLine("Sentence ends with 'dog'");
        }
        
        // Replace() - replace substring
        string original = "I love Java";
        string replaced = original.Replace("Java", "C#");
        Console.WriteLine($"Original: {original}");
        Console.WriteLine($"Replaced: {replaced}"); // Output: I love C#
        
        // Split() - split string into array
        string csv = "apple,banana,orange,grape";
        string[] fruits = csv.Split(',');
        Console.WriteLine("Fruits:");
        foreach (string fruit in fruits)
        {
            Console.WriteLine($"  - {fruit}");
        }
        
        // Join() - join array into string
        string[] names = { "Alice", "Bob", "Charlie" };
        string joined = String.Join(", ", names);
        Console.WriteLine($"Joined: {joined}"); // Output: Alice, Bob, Charlie
        
        // Concat() - join multiple strings
        string concat = String.Concat("Hello", " ", "World");
        Console.WriteLine($"Concatenated: {concat}"); // Output: Hello World
        
        // Equals() - compare strings
        if ("hello".Equals("hello", StringComparison.Ordinal))
        {
            Console.WriteLine("Strings are equal");
        }
        
        // CompareOrdinal() - compare for sorting
        int comparison = String.CompareOrdinal("apple", "banana");
        Console.WriteLine($"Compare 'apple' and 'banana': {comparison}"); // Output: -1
        
        // Insert() - insert substring at position
        string insertText = "HelloWorld";
        string inserted = insertText.Insert(5, " ");
        Console.WriteLine($"Inserted: {inserted}"); // Output: Hello World
        
        // Remove() - remove substring at position
        string removeText = "Hello World";
        string removed = removeText.Remove(5, 6); // Remove 6 chars starting at 5
        Console.WriteLine($"Removed: {removed}"); // Output: Hello
        
        // PadLeft() and PadRight() - add padding
        string padLeft = "42".PadLeft(5, '0');
        string padRight = "42".PadRight(5, '0');
        Console.WriteLine($"PadLeft: '{padLeft}'"); // Output: '00042'
        Console.WriteLine($"PadRight: '{padRight}'"); // Output: '42000'
        
        // Reverse - reverse string
        char[] charArray = "hello".ToCharArray();
        Array.Reverse(charArray);
        string reversed = new string(charArray);
        Console.WriteLine($"Reversed: {reversed}"); // Output: olleh
    }
}
```

---

## 17. Format

**Interview Answer:**

The `Format()` method creates formatted strings using format specifiers. It's part of the `String` class and works with placeholders like `{0}`, `{1}`, etc. You can also apply format specifiers within placeholders like `{0:C}` for currency or `{0:D8}` for padded decimal. While string interpolation is more modern, `Format()` is still useful for dynamic format strings.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        int age = 25;
        double salary = 45000.50;
        string name = "John Doe";
        
        // BASIC STRING.FORMAT()
        string result1 = String.Format("Name: {0}, Age: {1}", name, age);
        Console.WriteLine(result1);
        
        // WITH FORMAT SPECIFIERS
        // Decimal format
        string result2 = String.Format("Age: {0:D3}", age); // Output: Age: 025
        
        // Currency format
        string result3 = String.Format("Salary: {0:C}", salary);
        Console.WriteLine(result3); // Output: Salary: $45,000.50
        
        // Fixed-point format
        string result4 = String.Format("Salary: {0:F2}", salary);
        Console.WriteLine(result4); // Output: Salary: 45000.50
        
        // Percentage format
        double percentage = 0.85;
        string result5 = String.Format("Score: {0:P}", percentage);
        Console.WriteLine(result5); // Output: Score: 85.00%
        
        // Number with thousand separators
        string result6 = String.Format("Salary: {0:N}", salary);
        Console.WriteLine(result6); // Output: Salary: 45,000.50
        
        // Multiple placeholders
        int quantity = 5;
        decimal price = 19.99m;
        string result7 = String.Format("Quantity: {0}, Price: {1:C}, Total: {2:C}",
            quantity, price, quantity * price);
        Console.WriteLine(result7);
        
        // Alignment
        string result8 = String.Format("Name: {0,15}", name); // Right align in 15 chars
        Console.WriteLine($"'{result8}'");
        
        // Alignment with format specifier
        string result9 = String.Format("Amount: {0,10:C}", salary);
        Console.WriteLine($"'{result9}'");
        
        // Date formatting
        DateTime now = DateTime.Now;
        string result10 = String.Format("Today: {0:d} at {1:t}", now, now);
        Console.WriteLine(result10); // Output: Today: 11/30/2025 at 8:13 PM
        
        // Using Format with arrays
        object[] data = { "Alice", 30, 75000.00 };
        string result11 = String.Format("Employee: {0}, Age: {1}, Salary: {2:C}",
            data);
        Console.WriteLine(result11);
    }
}
```

---

## 18. Escape Characters

**Interview Answer:**

Escape characters are special character sequences that represent characters that are difficult or impossible to type directly. They're prefixed with a backslash `\`. Common escape sequences include `\n` (newline), `\t` (tab), `\"` (double quote), `\'` (single quote), `\\` (backslash), `\r` (carriage return). For file paths and regex, use verbatim strings with `@` prefix to avoid excessive escaping.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // NEWLINE ESCAPE SEQUENCE \n
        Console.WriteLine("Line 1\nLine 2\nLine 3");
        // Output:
        // Line 1
        // Line 2
        // Line 3
        
        // TAB ESCAPE SEQUENCE \t
        Console.WriteLine("Name\tAge\tCity");
        Console.WriteLine("John\t25\tNYC");
        Console.WriteLine("Alice\t30\tLA");
        // Output:
        // Name    Age     City
        // John    25      NYC
        // Alice   30      LA
        
        // QUOTE ESCAPE SEQUENCES
        string withDoubleQuote = "He said \"Hello World\"";
        Console.WriteLine(withDoubleQuote);
        // Output: He said "Hello World"
        
        string withSingleQuote = "It's a beautiful day";
        Console.WriteLine(withSingleQuote);
        // Output: It's a beautiful day
        
        // BACKSLASH ESCAPE SEQUENCE \\
        string filePath1 = "C:\\Users\\John\\Documents";
        Console.WriteLine(filePath1);
        // Output: C:\Users\John\Documents
        
        // CARRIAGE RETURN \r
        Console.WriteLine("Hello\rWorld");
        // Output: World (carriage return moves to start of line)
        
        // BACKSPACE ESCAPE SEQUENCE \b
        Console.WriteLine("Hello\bWorld");
        // Output: HellWorld (backspace removes 'o')
        
        // VERTICAL TAB \v and FORM FEED \f
        Console.WriteLine("Line1\vLine2"); // Vertical tab
        
        // NULL CHARACTER \0
        string withNull = "Hello\0World";
        Console.WriteLine(withNull.Length); // Length includes null
        
        // UNICODE ESCAPE SEQUENCES
        Console.WriteLine("\u0048\u0065\u006C\u006C\u006F"); // Hello in Unicode
        Console.WriteLine("\u00A9"); // Copyright symbol ©
        Console.WriteLine("\u20AC"); // Euro symbol €
        
        // Hexadecimal escape sequences
        Console.WriteLine("\x48\x65\x6C\x6C\x6F"); // Hello in hex
        
        // COMBINING ESCAPES
        string formatted = "Item\tPrice\nApple\t$1.00\nBanana\t$0.50";
        Console.WriteLine(formatted);
        // Output:
        // Item    Price
        // Apple   $1.00
        // Banana  $0.50
    }
}
```

---

## 19. Verbatim Strings

**Interview Answer:**

Verbatim strings (prefixed with `@`) preserve whitespace and escape sequences literally, so you don't need to escape backslashes. This is especially useful for file paths and regular expressions. In verbatim strings, `\` is treated as a literal character unless followed by `"` (which requires `""`). Verbatim strings can span multiple lines, preserving line breaks.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // REGULAR STRINGS - Need escaping
        string regularPath = "C:\\Users\\John\\Documents\\file.txt";
        Console.WriteLine("Regular: " + regularPath);
        
        // VERBATIM STRINGS - No escaping needed
        string verbatimPath = @"C:\Users\John\Documents\file.txt";
        Console.WriteLine("Verbatim: " + verbatimPath);
        // Both output the same: C:\Users\John\Documents\file.txt
        
        // MULTILINE VERBATIM STRINGS
        string multiline = @"This is a multiline string
that preserves the
line breaks as typed";
        Console.WriteLine(multiline);
        // Output:
        // This is a multiline string
        // that preserves the
        // line breaks as typed
        
        // VERBATIM STRING WITH QUOTES
        // To include a quote, use double quotes ""
        string verbatimQuotes = @"He said ""Hello"" to me";
        Console.WriteLine(verbatimQuotes);
        // Output: He said "Hello" to me
        
        // REGULAR EXPRESSION - Easier with verbatim
        string regularRegex = "\\d{3}-\\d{3}-\\d{4}"; // Phone pattern - many escapes
        string verbatimRegex = @"\d{3}-\d{3}-\d{4}"; // Same pattern - clearer
        
        // SQL QUERIES - Often use verbatim strings
        string sqlQuery = @"SELECT * FROM Users
WHERE Age > 18
AND Active = 1";
        Console.WriteLine(sqlQuery);
        
        // JSON - Easier with verbatim
        string jsonData = @"{
  ""name"": ""John"",
  ""age"": 25,
  ""city"": ""New York""
}";
        Console.WriteLine(jsonData);
        
        // COMPARISON
        Console.WriteLine("\n=== Comparison ===");
        
        // Regular string with escapes
        string regular = "Line1\nLine2\n\tIndented Line3";
        Console.WriteLine("Regular:");
        Console.WriteLine(regular);
        
        // Verbatim string preserves literal content
        string verbatim = @"Line1
Line2
	Indented Line3";
        Console.WriteLine("\nVerbatim:");
        Console.WriteLine(verbatim);
        
        // NOTE: Both produce same output when printed
        
        // Mixed escaping (C# 8.0+)
        string mixedString = @"Path: C:\data\file.txt
Quote: ""Important""";
        Console.WriteLine(mixedString);
    }
}
```

---

## 20. Arrays

**Interview Answer:**

An array is a collection of elements of the same type stored in contiguous memory locations. Arrays are fixed-size (cannot grow after creation) and zero-indexed (first element is at index 0). Arrays can be single-dimensional, multidimensional, or jagged. Arrays are reference types stored on the heap. You can initialize arrays with values, set elements individually, or leave uninitialized (default values assigned). Arrays have a `Length` property and can be iterated using loops.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // SINGLE-DIMENSIONAL ARRAYS
        
        // Array declaration and initialization
        int[] numbers = { 10, 20, 30, 40, 50 };
        
        // Alternative syntax
        int[] numbers2 = new int[] { 10, 20, 30 };
        
        // Array with size but no initialization (default values)
        int[] emptyNumbers = new int[5]; // All zeros
        
        // Accessing array elements
        Console.WriteLine($"First element: {numbers[0]}"); // Output: 10
        Console.WriteLine($"Last element: {numbers[numbers.Length - 1]}"); // Output: 50
        
        // Setting array elements
        numbers[2] = 35;
        Console.WriteLine($"Modified element: {numbers[2]}"); // Output: 35
        
        // Array length
        Console.WriteLine($"Array length: {numbers.Length}"); // Output: 5
        
        // Iterating through array with for loop
        Console.WriteLine("Using for loop:");
        for (int i = 0; i < numbers.Length; i++)
        {
            Console.WriteLine($"Index {i}: {numbers[i]}");
        }
        
        // String array
        string[] fruits = { "Apple", "Banana", "Orange", "Grape" };
        foreach (string fruit in fruits)
        {
            Console.WriteLine(fruit);
        }
        
        // MULTIDIMENSIONAL ARRAYS (2D)
        
        // 2D array declaration
        int[,] matrix = new int[3, 3];
        
        // 2D array initialization
        int[,] grid = {
            { 1, 2, 3 },
            { 4, 5, 6 },
            { 7, 8, 9 }
        };
        
        // Accessing 2D array
        Console.WriteLine($"Element at [0,0]: {grid[0, 0]}"); // Output: 1
        Console.WriteLine($"Element at [1,1]: {grid[1, 1]}"); // Output: 5
        
        // Setting 2D array elements
        grid[2, 2] = 10;
        
        // Iterating 2D array
        Console.WriteLine("\n2D Array:");
        for (int row = 0; row < grid.GetLength(0); row++)
        {
            for (int col = 0; col < grid.GetLength(1); col++)
            {
                Console.Write(grid[row, col] + " ");
            }
            Console.WriteLine();
        }
        
        // JAGGED ARRAYS (array of arrays)
        
        // Jagged array declaration (not all rows same size)
        int[][] jagged = new int[3][]; // 3 rows, variable columns
        jagged[0] = new int[2]; // First row has 2 elements
        jagged[1] = new int[3]; // Second row has 3 elements
        jagged[2] = new int[4]; // Third row has 4 elements
        
        // Jagged array initialization
        int[][] jagged2 = new int[][]
        {
            new int[] { 1, 2 },
            new int[] { 3, 4, 5 },
            new int[] { 6, 7, 8, 9 }
        };
        
        // Accessing jagged array
        Console.WriteLine($"Jagged[1][2]: {jagged2[1][2]}"); // Output: 5
        
        // ARRAY METHODS
        
        // Array.Sort()
        int[] unsorted = { 50, 30, 10, 40, 20 };
        Array.Sort(unsorted);
        Console.WriteLine("\nSorted: " + string.Join(", ", unsorted)); // Output: 10, 20, 30, 40, 50
        
        // Array.Reverse()
        Array.Reverse(unsorted);
        Console.WriteLine("Reversed: " + string.Join(", ", unsorted)); // Output: 50, 40, 30, 20, 10
        
        // Array.IndexOf()
        int index = Array.IndexOf(fruits, "Orange");
        Console.WriteLine($"Index of Orange: {index}"); // Output: 2
        
        // Array.Copy()
        int[] original = { 1, 2, 3, 4, 5 };
        int[] copy = new int[5];
        Array.Copy(original, copy, original.Length);
        
        // Array.Clear()
        int[] toClear = { 1, 2, 3, 4, 5 };
        Array.Clear(toClear, 0, 3); // Clear first 3 elements
        Console.WriteLine("After clear: " + string.Join(", ", toClear)); // Output: 0, 0, 0, 4, 5
    }
}
```


---

## 21. For Loop

**Interview Answer:**

The `for` loop is used to execute a block of code a specific number of times. It's best used when you know the exact number of iterations needed. The for loop has three parts: initialization (set starting value), condition (when to stop), and increment/decrement (change after each iteration). It's useful for iterating through arrays, collections, or repeating actions a fixed number of times.

**Syntax:**
```csharp
for (initialization; condition; increment/decrement)
{
    // code to execute
}
```

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Basic for loop - count 0 to 9
        Console.WriteLine("Count from 0 to 9:");
        for (int i = 0; i < 10; i++)
        {
            Console.Write(i + " ");
        }
        Console.WriteLine();
        
        // For loop - count backwards
        Console.WriteLine("\nCount from 10 to 1:");
        for (int i = 10; i >= 1; i--)
        {
            Console.Write(i + " ");
        }
        Console.WriteLine();
        
        // For loop with step of 2
        Console.WriteLine("\nCount by 2s:");
        for (int i = 0; i <= 20; i += 2)
        {
            Console.Write(i + " ");
        }
        Console.WriteLine();
        
        // Iterate through array
        int[] numbers = { 10, 20, 30, 40, 50 };
        Console.WriteLine("\nArray elements:");
        for (int i = 0; i < numbers.Length; i++)
        {
            Console.WriteLine($"Index {i}: {numbers[i]}");
        }
        
        // Nested for loop - multiplication table
        Console.WriteLine("\nMultiplication Table (3x3):");
        for (int i = 1; i <= 3; i++)
        {
            for (int j = 1; j <= 3; j++)
            {
                Console.Write((i * j) + " ");
            }
            Console.WriteLine();
        }
        
        // For loop with multiple variables
        Console.WriteLine("\nMultiple variables:");
        for (int i = 0, j = 100; i < 5; i++, j -= 10)
        {
            Console.WriteLine($"i={i}, j={j}");
        }
        
        // Infinite loop (break needed to exit)
        Console.WriteLine("\nInfinite loop with break:");
        for (int i = 0; ; i++)
        {
            if (i == 3) break;
            Console.Write(i + " ");
        }
        Console.WriteLine();
        
        // Loop with continue (skip iteration)
        Console.WriteLine("\nLoop with continue (skip 2 and 4):");
        for (int i = 1; i <= 5; i++)
        {
            if (i == 2 || i == 4) continue; // Skip this iteration
            Console.Write(i + " ");
        }
        Console.WriteLine();
    }
}
```

---

## 22. Function Basics

**Interview Answer:**

Functions (also called methods) are reusable blocks of code that perform specific tasks. They help organize code, avoid repetition, and make programs easier to maintain. A function has a name, parameters (inputs), return type, and body (code). You call a function by name with arguments. Functions can return a value or return void (nothing). Parameters allow passing data to functions.

**Syntax:**
```csharp
accessModifier returnType MethodName(parameters)
{
    // method body
}
```

**Example Code:**

```csharp
using System;

class Program
{
    // Simple function with no parameters and no return
    static void SayHello()
    {
        Console.WriteLine("Hello World!");
    }
    
    // Function with parameters but no return
    static void DisplaySum(int a, int b)
    {
        int sum = a + b;
        Console.WriteLine($"Sum: {sum}");
    }
    
    // Function with parameters and return type
    static int GetSum(int a, int b)
    {
        return a + b;
    }
    
    // Function with string parameter and return
    static string GetGreeting(string name)
    {
        return $"Hello, {name}!";
    }
    
    // Function with multiple parameters
    static double CalculateAverage(int num1, int num2, int num3)
    {
        return (num1 + num2 + num3) / 3.0;
    }
    
    // Function with optional parameters (default values)
    static void PrintMessage(string message, int times = 1)
    {
        for (int i = 0; i < times; i++)
        {
            Console.WriteLine(message);
        }
    }
    
    // Function with variable number of parameters (params)
    static int SumAll(params int[] numbers)
    {
        int total = 0;
        foreach (int num in numbers)
        {
            total += num;
        }
        return total;
    }
    
    // Overloaded function (same name, different parameters)
    static void Print(int value)
    {
        Console.WriteLine($"Integer: {value}");
    }
    
    static void Print(string value)
    {
        Console.WriteLine($"String: {value}");
    }
    
    static void Print(double value)
    {
        Console.WriteLine($"Double: {value}");
    }
    
    static void Main()
    {
        // Call function with no parameters
        SayHello();
        
        // Call function with parameters (no return)
        DisplaySum(5, 10);
        
        // Call function with return value
        int result = GetSum(15, 25);
        Console.WriteLine($"Result: {result}");
        
        // Call function with string parameter
        string greeting = GetGreeting("Alice");
        Console.WriteLine(greeting);
        
        // Call function with multiple parameters
        double average = CalculateAverage(80, 90, 85);
        Console.WriteLine($"Average: {average}");
        
        // Call function with optional parameters
        PrintMessage("Hello"); // Uses default times=1
        PrintMessage("Hi", 3); // Prints 3 times
        
        // Call function with variable parameters
        int total = SumAll(10, 20, 30, 40, 50);
        Console.WriteLine($"Total: {total}");
        
        // Call overloaded functions
        Print(42);
        Print("World");
        Print(3.14);
    }
}
```

---

## 23. Foreach Loop

**Interview Answer:**

The `foreach` loop iterates through collections (arrays, lists, dictionaries) without needing an index. It's cleaner than `for` loop when you don't need the index. Foreach automatically gets each element one by one. It works with any collection implementing `IEnumerable` interface. Use `foreach` when iterating through all elements; use `for` when you need index access.

**Syntax:**
```csharp
foreach (dataType variable in collection)
{
    // code using variable
}
```

**Example Code:**

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Foreach with array
        string[] colors = { "Red", "Green", "Blue", "Yellow" };
        Console.WriteLine("Colors:");
        foreach (string color in colors)
        {
            Console.WriteLine($"  - {color}");
        }
        
        // Foreach with int array
        int[] numbers = { 10, 20, 30, 40, 50 };
        int sum = 0;
        foreach (int num in numbers)
        {
            sum += num;
        }
        Console.WriteLine($"Sum: {sum}");
        
        // Foreach with List
        List<string> fruits = new List<string> { "Apple", "Banana", "Orange" };
        foreach (string fruit in fruits)
        {
            Console.WriteLine(fruit);
        }
        
        // Foreach with Dictionary
        Dictionary<string, int> ages = new Dictionary<string, int>
        {
            { "John", 25 },
            { "Alice", 30 },
            { "Bob", 28 }
        };
        
        foreach (var entry in ages)
        {
            Console.WriteLine($"{entry.Key}: {entry.Value}");
        }
        
        // Foreach with KeyValuePair (more explicit)
        foreach (KeyValuePair<string, int> kvp in ages)
        {
            Console.WriteLine($"{kvp.Key} is {kvp.Value} years old");
        }
        
        // Foreach with nested collection
        int[][] matrix = {
            new int[] { 1, 2, 3 },
            new int[] { 4, 5, 6 },
            new int[] { 7, 8, 9 }
        };
        
        Console.WriteLine("Matrix:");
        foreach (int[] row in matrix)
        {
            foreach (int value in row)
            {
                Console.Write(value + " ");
            }
            Console.WriteLine();
        }
        
        // Foreach with string (iterates characters)
        string word = "Hello";
        Console.WriteLine("Characters:");
        foreach (char c in word)
        {
            Console.WriteLine(c);
        }
        
        // Foreach with range
        Console.WriteLine("Range 1-5:");
        foreach (int i in Range(1, 5))
        {
            Console.Write(i + " ");
        }
        Console.WriteLine();
    }
    
    // Helper method to generate range
    static IEnumerable<int> Range(int start, int end)
    {
        for (int i = start; i <= end; i++)
        {
            yield return i;
        }
    }
}
```

---

## 24. If / Else / Else If

**Interview Answer:**

Conditional statements control program flow based on conditions. `if` executes code if condition is true. `else` executes if condition is false. `else if` checks additional conditions. Multiple `else if` can be chained. Only one block executes. Use logical operators `&&` (AND), `||` (OR), `!` (NOT) to combine conditions. Nested if statements are allowed.

**Syntax:**
```csharp
if (condition)
{
    // code if condition true
}
else if (anotherCondition)
{
    // code if another condition true
}
else
{
    // code if all conditions false
}
```

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Simple if statement
        int age = 18;
        if (age >= 18)
        {
            Console.WriteLine("You are an adult");
        }
        
        // If-else statement
        int score = 45;
        if (score >= 50)
        {
            Console.WriteLine("Pass");
        }
        else
        {
            Console.WriteLine("Fail");
        }
        
        // If-else if-else statement
        int grade_score = 85;
        if (grade_score >= 90)
        {
            Console.WriteLine("Grade: A");
        }
        else if (grade_score >= 80)
        {
            Console.WriteLine("Grade: B");
        }
        else if (grade_score >= 70)
        {
            Console.WriteLine("Grade: C");
        }
        else if (grade_score >= 60)
        {
            Console.WriteLine("Grade: D");
        }
        else
        {
            Console.WriteLine("Grade: F");
        }
        
        // Multiple conditions with AND operator (&&)
        int hours = 10;
        bool isWeekend = true;
        
        if (hours > 8 && isWeekend)
        {
            Console.WriteLine("Great day off!");
        }
        
        // Multiple conditions with OR operator (||)
        string dayOfWeek = "Saturday";
        if (dayOfWeek == "Saturday" || dayOfWeek == "Sunday")
        {
            Console.WriteLine("It's the weekend!");
        }
        
        // NOT operator (!)
        bool isRaining = false;
        if (!isRaining)
        {
            Console.WriteLine("Good weather");
        }
        
        // Nested if statement
        int temperature = 25;
        bool isSunny = true;
        
        if (temperature > 20)
        {
            if (isSunny)
            {
                Console.WriteLine("Perfect day to go outside!");
            }
            else
            {
                Console.WriteLine("Warm but cloudy");
            }
        }
        else
        {
            Console.WriteLine("Too cold");
        }
        
        // Comparing strings
        string userRole = "Admin";
        if (userRole == "Admin")
        {
            Console.WriteLine("You have admin privileges");
        }
        else if (userRole == "User")
        {
            Console.WriteLine("You have limited privileges");
        }
        else
        {
            Console.WriteLine("Invalid role");
        }
        
        // Complex condition
        int salary = 50000;
        int experience = 5;
        bool hasSkills = true;
        
        if ((salary > 40000) && (experience >= 3 || hasSkills))
        {
            Console.WriteLine("Eligible for promotion");
        }
    }
}
```

---

## 25. Ternary Operator

**Interview Answer:**

The ternary operator `? :` is a shorthand for if-else statements. It evaluates a condition and returns one of two values based on the result. It's useful for simple conditional assignments. Syntax: `condition ? valueIfTrue : valueIfFalse`. It returns a value (unlike if-else), so it can be used in assignments. Nested ternary operators work but reduce readability.

**Syntax:**
```csharp
condition ? valueIfTrue : valueIfFalse
```

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Basic ternary operator
        int age = 20;
        string status = age >= 18 ? "Adult" : "Minor";
        Console.WriteLine(status); // Output: Adult
        
        // Ternary with calculation
        int number = 15;
        int result = number > 10 ? number * 2 : number;
        Console.WriteLine($"Result: {result}"); // Output: 30
        
        // Ternary with string comparison
        string dayOfWeek = "Saturday";
        string dayType = dayOfWeek == "Saturday" || dayOfWeek == "Sunday" 
            ? "Weekend" 
            : "Weekday";
        Console.WriteLine(dayType);
        
        // Ternary in Console.WriteLine
        int score = 75;
        Console.WriteLine(score >= 50 ? "Pass" : "Fail");
        
        // Nested ternary operator
        int marks = 85;
        string grade = marks >= 90 ? "A" :
                       marks >= 80 ? "B" :
                       marks >= 70 ? "C" :
                       marks >= 60 ? "D" : "F";
        Console.WriteLine($"Grade: {grade}"); // Output: B
        
        // Ternary with method calls
        string name = "John";
        string greeting = string.IsNullOrEmpty(name) ? "Hello Guest" : $"Hello {name}";
        Console.WriteLine(greeting);
        
        // Ternary with boolean condition
        bool isLoggedIn = true;
        string message = isLoggedIn ? "Welcome back!" : "Please log in";
        Console.WriteLine(message);
        
        // Ternary in array/list
        int age2 = 25;
        string[] categories = { age2 < 18 ? "Child" : "Adult" };
        Console.WriteLine(categories[0]);
        
        // Ternary with null coalescing
        string user = null;
        string displayName = user ?? "Guest";
        Console.WriteLine(displayName); // Output: Guest
        
        // Practical example: Determine price based on quantity
        int quantity = 100;
        decimal price = quantity > 50 ? 100 : (quantity > 20 ? 150 : 200);
        Console.WriteLine($"Price: ${price}");
        
        // Using ternary for min/max
        int x = 10, y = 20;
        int max = x > y ? x : y;
        int min = x < y ? x : y;
        Console.WriteLine($"Max: {max}, Min: {min}");
    }
}
```

---

## 26. Switch Statement

**Interview Answer:**

The `switch` statement executes different code blocks based on different conditions. It's cleaner than multiple if-else statements when checking one variable against many values. Each case represents a possible value. `break` exits the switch. `default` is optional, like else in if-else. Switch works with int, string, enum, char, and bool. Since C# 7.0, pattern matching allows complex conditions.

**Syntax:**
```csharp
switch (expression)
{
    case value1:
        // code if expression == value1
        break;
    case value2:
        // code if expression == value2
        break;
    default:
        // code if no match
        break;
}
```

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Basic switch with integers
        int dayNumber = 3;
        switch (dayNumber)
        {
            case 1:
                Console.WriteLine("Monday");
                break;
            case 2:
                Console.WriteLine("Tuesday");
                break;
            case 3:
                Console.WriteLine("Wednesday");
                break;
            case 4:
                Console.WriteLine("Thursday");
                break;
            case 5:
                Console.WriteLine("Friday");
                break;
            default:
                Console.WriteLine("Weekend");
                break;
        }
        
        // Switch with strings
        string operation = "add";
        int a = 10, b = 5;
        
        switch (operation)
        {
            case "add":
                Console.WriteLine($"Result: {a + b}");
                break;
            case "subtract":
                Console.WriteLine($"Result: {a - b}");
                break;
            case "multiply":
                Console.WriteLine($"Result: {a * b}");
                break;
            case "divide":
                Console.WriteLine($"Result: {a / b}");
                break;
            default:
                Console.WriteLine("Invalid operation");
                break;
        }
        
        // Switch with fall-through (multiple cases)
        char grade = 'B';
        switch (grade)
        {
            case 'A':
            case 'B':
                Console.WriteLine("Excellent");
                break;
            case 'C':
                Console.WriteLine("Good");
                break;
            case 'D':
                Console.WriteLine("Fair");
                break;
            case 'F':
                Console.WriteLine("Failed");
                break;
            default:
                Console.WriteLine("Invalid grade");
                break;
        }
        
        // Switch with methods in cases
        string command = "help";
        switch (command)
        {
            case "start":
                StartApplication();
                break;
            case "stop":
                StopApplication();
                break;
            case "help":
                ShowHelp();
                break;
            default:
                Console.WriteLine("Unknown command");
                break;
        }
        
        // Modern switch expression (C# 8.0+)
        int dayNum = 5;
        string dayName = dayNum switch
        {
            1 => "Monday",
            2 => "Tuesday",
            3 => "Wednesday",
            4 => "Thursday",
            5 => "Friday",
            6 or 7 => "Weekend",
            _ => "Invalid"
        };
        Console.WriteLine(dayName);
        
        // Switch with enum
        Status status = Status.Active;
        switch (status)
        {
            case Status.Active:
                Console.WriteLine("User is active");
                break;
            case Status.Inactive:
                Console.WriteLine("User is inactive");
                break;
            case Status.Suspended:
                Console.WriteLine("User is suspended");
                break;
        }
    }
    
    static void StartApplication()
    {
        Console.WriteLine("Application started");
    }
    
    static void StopApplication()
    {
        Console.WriteLine("Application stopped");
    }
    
    static void ShowHelp()
    {
        Console.WriteLine("Available commands: start, stop, help");
    }
}

enum Status
{
    Active,
    Inactive,
    Suspended
}
```

---

## 27. While Loop

**Interview Answer:**

The `while` loop executes a block of code repeatedly as long as a condition is true. It checks the condition before executing the block, so it might not execute at all. Use `while` when you don't know how many iterations are needed. The loop exits when the condition becomes false. Be careful of infinite loops (always ensure condition eventually becomes false). You can use `break` to exit early or `continue` to skip to next iteration.

**Syntax:**
```csharp
while (condition)
{
    // code to execute
    // must eventually make condition false
}
```

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Basic while loop
        int count = 1;
        Console.WriteLine("Count 1 to 5:");
        while (count <= 5)
        {
            Console.Write(count + " ");
            count++;
        }
        Console.WriteLine();
        
        // While loop with user input
        Console.WriteLine("\nEnter numbers (enter -1 to stop):");
        int number = 0;
        int sum = 0;
        
        while (number != -1)
        {
            Console.Write("Enter number: ");
            number = int.Parse(Console.ReadLine());
            
            if (number != -1)
            {
                sum += number;
            }
        }
        Console.WriteLine($"Sum: {sum}");
        
        // While loop with break
        int i = 0;
        Console.WriteLine("\nLoop with break:");
        while (true)
        {
            if (i == 5) break;
            Console.Write(i + " ");
            i++;
        }
        Console.WriteLine();
        
        // While loop with continue
        int j = 0;
        Console.WriteLine("\nLoop with continue (skip 3 and 4):");
        while (j < 7)
        {
            if (j == 3 || j == 4)
            {
                j++;
                continue; // Skip current iteration
            }
            Console.Write(j + " ");
            j++;
        }
        Console.WriteLine();
        
        // While loop - find divisible number
        Console.WriteLine("\nFind first number > 20 divisible by 7:");
        int num = 20;
        while (num % 7 != 0)
        {
            num++;
        }
        Console.WriteLine($"Found: {num}");
        
        // While loop with multiple conditions
        int age_input = 15;
        bool validAge = false;
        
        while (!validAge && age_input < 100)
        {
            if (age_input >= 18)
            {
                validAge = true;
                Console.WriteLine("Age is valid");
            }
            age_input++;
        }
        
        // While loop - countdown
        int countdown = 5;
        Console.WriteLine("\nCountdown:");
        while (countdown > 0)
        {
            Console.WriteLine(countdown);
            countdown--;
        }
        Console.WriteLine("Blast off!");
    }
}
```

---

## 28. Do While Loop

**Interview Answer:**

The `do-while` loop executes a block of code at least once, then repeats while a condition is true. Unlike `while`, it checks the condition after executing the block. Use `do-while` when you want the loop body to execute at least once. It's useful for menu systems and input validation where you need to prompt the user at least once. The loop exits when condition becomes false.

**Syntax:**
```csharp
do
{
    // code to execute
} while (condition);
```

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Basic do-while loop
        int count = 1;
        Console.WriteLine("Count 1 to 5:");
        do
        {
            Console.Write(count + " ");
            count++;
        } while (count <= 5);
        Console.WriteLine();
        
        // Do-while - input validation
        Console.WriteLine("\nEnter number between 1 and 10:");
        int userInput;
        do
        {
            Console.Write("Number: ");
            userInput = int.Parse(Console.ReadLine());
            
            if (userInput < 1 || userInput > 10)
            {
                Console.WriteLine("Invalid! Try again.");
            }
        } while (userInput < 1 || userInput > 10);
        Console.WriteLine($"You entered: {userInput}");
        
        // Do-while - menu system
        Console.WriteLine("\n=== Menu System ===");
        int choice;
        do
        {
            Console.WriteLine("\n1. Add");
            Console.WriteLine("2. Subtract");
            Console.WriteLine("3. Exit");
            Console.Write("Choose: ");
            choice = int.Parse(Console.ReadLine());
            
            switch (choice)
            {
                case 1:
                    Console.WriteLine("Addition selected");
                    break;
                case 2:
                    Console.WriteLine("Subtraction selected");
                    break;
                case 3:
                    Console.WriteLine("Exiting...");
                    break;
                default:
                    Console.WriteLine("Invalid choice");
                    break;
            }
        } while (choice != 3);
        
        // Do-while with break
        int x = 0;
        Console.WriteLine("\nDo-while with break:");
        do
        {
            if (x == 3) break;
            Console.Write(x + " ");
            x++;
        } while (x < 10);
        Console.WriteLine();
        
        // Do-while with continue
        int y = 0;
        Console.WriteLine("\nDo-while with continue:");
        do
        {
            if (y == 2 || y == 4)
            {
                y++;
                continue;
            }
            Console.Write(y + " ");
            y++;
        } while (y < 6);
        Console.WriteLine();
        
        // Do-while - game simulation
        Console.WriteLine("\n=== Simple Game ===");
        Random random = new Random();
        int secretNumber = random.Next(1, 11);
        int guess;
        int attempts = 0;
        
        do
        {
            Console.Write("Guess a number (1-10): ");
            guess = int.Parse(Console.ReadLine());
            attempts++;
            
            if (guess < secretNumber)
                Console.WriteLine("Too low!");
            else if (guess > secretNumber)
                Console.WriteLine("Too high!");
            
        } while (guess != secretNumber);
        
        Console.WriteLine($"Correct! You took {attempts} attempts.");
    }
}
```

---

## 29. Random

**Interview Answer:**

The `Random` class generates random numbers. Create an instance with `new Random()`. Use `Next()` for random integers, `NextDouble()` for random decimals between 0 and 1, `NextBytes()` for random byte arrays. `Next(max)` returns value 0 to max-1. `Next(min, max)` returns value min to max-1. Create one instance and reuse it for better randomness (creating multiple instances in quick succession gives same values). For cryptographic randomness, use `RandomNumberGenerator` from `System.Security.Cryptography`.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Create Random instance
        Random random = new Random();
        
        // Next() - random integer
        int randomNumber = random.Next();
        Console.WriteLine($"Random int: {randomNumber}");
        
        // Next(max) - random from 0 to max-1
        int randomDie = random.Next(6); // 0 to 5
        Console.WriteLine($"Die roll (0-5): {randomDie}");
        
        // Corrected die roll (1 to 6)
        int correctDie = random.Next(1, 7);
        Console.WriteLine($"Die roll (1-6): {correctDie}");
        
        // Next(min, max) - random from min to max-1
        int randomAge = random.Next(18, 65);
        Console.WriteLine($"Random age (18-64): {randomAge}");
        
        // NextDouble() - random decimal 0.0 to 1.0
        double randomDouble = random.NextDouble();
        Console.WriteLine($"Random double: {randomDouble}");
        
        // Scale NextDouble to range
        double randomPrice = random.NextDouble() * 100; // 0 to 100
        Console.WriteLine($"Random price: ${randomPrice:F2}");
        
        // Simulate coin flip
        bool isHeads = random.Next(2) == 0;
        Console.WriteLine($"Coin flip: {(isHeads ? "Heads" : "Tails")}");
        
        // Simulate dice rolls
        Console.WriteLine("\nRoll two dice:");
        int die1 = random.Next(1, 7);
        int die2 = random.Next(1, 7);
        Console.WriteLine($"Die 1: {die1}, Die 2: {die2}, Total: {die1 + die2}");
        
        // Random in range with custom logic
        // Random percentage (0-100)
        int percentage = random.Next(0, 101);
        Console.WriteLine($"Percentage: {percentage}%");
        
        // Random from array
        string[] colors = { "Red", "Green", "Blue", "Yellow", "Purple" };
        string randomColor = colors[random.Next(colors.Length)];
        Console.WriteLine($"Random color: {randomColor}");
        
        // Multiple random numbers
        Console.WriteLine("\nRandom numbers 1-10:");
        for (int i = 0; i < 5; i++)
        {
            Console.Write(random.Next(1, 11) + " ");
        }
        Console.WriteLine();
        
        // Random bytes
        Console.WriteLine("\nRandom bytes:");
        byte[] randomBytes = new byte[5];
        random.NextBytes(randomBytes);
        foreach (byte b in randomBytes)
        {
            Console.Write(b + " ");
        }
        Console.WriteLine();
        
        // Practical: Random password generation
        Console.WriteLine("\nGenerated password:");
        string password = GeneratePassword(random);
        Console.WriteLine(password);
    }
    
    // Generate random password
    static string GeneratePassword(Random random)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        string password = "";
        
        for (int i = 0; i < 8; i++)
        {
            password += chars[random.Next(chars.Length)];
        }
        
        return password;
    }
}
```

---

## 30. Exception Handling

**Interview Answer:**

Exception handling manages runtime errors gracefully using try-catch-finally blocks. `try` contains code that might throw exception. `catch` handles the exception if it occurs. `finally` always executes (cleanup code). You can have multiple `catch` blocks for different exception types. `throw` keyword manually throws exceptions. Always catch specific exceptions before general ones. `finally` is useful for releasing resources like file handles or database connections.

**Syntax:**
```csharp
try
{
    // code that might throw exception
}
catch (ExceptionType ex)
{
    // handle exception
}
finally
{
    // cleanup code (always executes)
}
```

**Example Code:**

```csharp
using System;
using System.IO;

class Program
{
    static void Main()
    {
        // Basic try-catch
        try
        {
            int number = int.Parse("abc"); // Will throw FormatException
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"Error: Invalid format - {ex.Message}");
        }
        
        // Try-catch-finally
        try
        {
            int[] numbers = { 1, 2, 3 };
            int value = numbers[5]; // Will throw IndexOutOfRangeException
        }
        catch (IndexOutOfRangeException ex)
        {
            Console.WriteLine($"Error: Array index out of range - {ex.Message}");
        }
        finally
        {
            Console.WriteLine("Finally block always executes\n");
        }
        
        // Multiple catch blocks (specific to general)
        try
        {
            int x = 10;
            int y = 0;
            int result = x / y; // DivideByZeroException
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Error: Cannot divide by zero - {ex.Message}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Unexpected error: {ex.Message}");
        }
        
        // Catching generic Exception
        try
        {
            string text = null;
            Console.WriteLine(text.ToUpper()); // NullReferenceException
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error: {ex.GetType().Name} - {ex.Message}");
        }
        
        // File operations with try-catch-finally
        FileHandling();
        
        // Custom exception example
        try
        {
            ValidateAge(15);
        }
        catch (InvalidOperationException ex)
        {
            Console.WriteLine($"Validation Error: {ex.Message}");
        }
        
        // Re-throwing exception
        try
        {
            try
            {
                int num = int.Parse("invalid");
            }
            catch (FormatException)
            {
                Console.WriteLine("Caught FormatException, re-throwing...");
                throw; // Re-throw the exception
            }
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"Caught re-thrown exception: {ex.Message}");
        }
    }
    
    static void FileHandling()
    {
        StreamReader reader = null;
        try
        {
            reader = new StreamReader("file.txt");
            string line = reader.ReadLine();
            Console.WriteLine($"Read: {line}");
        }
        catch (FileNotFoundException ex)
        {
            Console.WriteLine($"File not found: {ex.Message}");
        }
        finally
        {
            // Ensure file is closed even if error occurs
            reader?.Close();
            Console.WriteLine("File closed\n");
        }
    }
    
    static void ValidateAge(int age)
    {
        if (age < 18)
        {
            throw new InvalidOperationException("Age must be at least 18");
        }
    }
}

```

## 31. StringBuilder

**Interview Answer:**

`StringBuilder` is a mutable string class from `System.Text` namespace. Unlike `string` (immutable), StringBuilder can be modified efficiently. When you concatenate strings multiple times, StringBuilder is more efficient (especially in loops) because string creates new objects each time. Use StringBuilder for frequent string modifications, building dynamic strings, or in tight loops. Use regular string for simple operations. StringBuilder has methods like `Append()`, `Insert()`, `Replace()`, `Remove()`, and `ToString()`.

**Example Code:**

```csharp
using System;
using System.Text;

class Program
{
    static void Main()
    {
        // Why StringBuilder is needed
        Console.WriteLine("=== String vs StringBuilder ===");
        
        // String concatenation (inefficient in loops)
        string result = "";
        for (int i = 0; i < 5; i++)
        {
            result += i + ", "; // Creates new string each time
        }
        Console.WriteLine($"String result: {result}");
        
        // StringBuilder (efficient)
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 5; i++)
        {
            sb.Append(i);
            sb.Append(", ");
        }
        Console.WriteLine($"StringBuilder result: {sb}");
        
        // StringBuilder methods
        Console.WriteLine("\n=== StringBuilder Methods ===");
        
        // Create and Append
        StringBuilder sb1 = new StringBuilder();
        sb1.Append("Hello");
        sb1.Append(" ");
        sb1.Append("World");
        Console.WriteLine($"Appended: {sb1}");
        
        // AppendLine
        StringBuilder sb2 = new StringBuilder();
        sb2.AppendLine("Line 1");
        sb2.AppendLine("Line 2");
        sb2.AppendLine("Line 3");
        Console.WriteLine($"AppendLine: {sb2}");
        
        // Insert
        StringBuilder sb3 = new StringBuilder("Hello World");
        sb3.Insert(6, "Beautiful ");
        Console.WriteLine($"After Insert: {sb3}"); // Hello Beautiful World
        
        // Replace
        StringBuilder sb4 = new StringBuilder("I love Java");
        sb4.Replace("Java", "C#");
        Console.WriteLine($"After Replace: {sb4}"); // I love C#
        
        // Remove
        StringBuilder sb5 = new StringBuilder("Hello World");
        sb5.Remove(5, 6); // Remove starting at index 5, 6 characters
        Console.WriteLine($"After Remove: {sb5}"); // Hello
        
        // Length and Capacity
        StringBuilder sb6 = new StringBuilder("Test");
        Console.WriteLine($"Length: {sb6.Length}");
        Console.WriteLine($"Capacity: {sb6.Capacity}");
        
        sb6.Append("ing"); // Length grows
        Console.WriteLine($"After append - Length: {sb6.Length}");
        
        // Clear
        StringBuilder sb7 = new StringBuilder("Text to clear");
        sb7.Clear();
        Console.WriteLine($"After Clear: '{sb7}' (empty)");
        
        // ToString
        StringBuilder sb8 = new StringBuilder("Convert to string");
        string finalString = sb8.ToString();
        Console.WriteLine($"Final string: {finalString}");
        
        // Practical example: Building dynamic query
        Console.WriteLine("\n=== Building Dynamic SQL Query ===");
        string name = "John";
        int age = 25;
        
        StringBuilder query = new StringBuilder();
        query.Append("SELECT * FROM Users WHERE ");
        query.Append("Name = '").Append(name).Append("' ");
        query.Append("AND Age = ").Append(age);
        
        Console.WriteLine($"Query: {query}");
        
        // Practical example: CSV builder
        Console.WriteLine("\n=== Building CSV Data ===");
        StringBuilder csv = new StringBuilder();
        csv.AppendLine("Name,Age,City");
        csv.AppendLine("John,25,NYC");
        csv.AppendLine("Alice,30,LA");
        csv.AppendLine("Bob,28,Chicago");
        
        Console.WriteLine("CSV Data:");
        Console.WriteLine(csv);
    }
}
```

---

## 32. Functions (Advanced)

**Interview Answer:**

Advanced function concepts include optional parameters (default values), named parameters, `params` keyword for variable arguments, method overloading, ref/out parameters, and lambda expressions. Optional parameters have default values and must come after required parameters. `params` allows variable number of arguments. `ref` passes by reference (caller sees changes), `out` is for returning multiple values. Method overloading allows same name with different signatures.

**Example Code:**

```csharp
using System;

class Program
{
    // Optional parameters - must come after required params
    static void PrintInfo(string name, int age = 0, string city = "Unknown")
    {
        Console.WriteLine($"Name: {name}, Age: {age}, City: {city}");
    }
    
    // Named parameters - call in any order
    static void DisplayMessage(string message, int fontSize = 12, bool isBold = false)
    {
        Console.WriteLine(message);
        Console.WriteLine($"Font Size: {fontSize}, Bold: {isBold}");
    }
    
    // Variable parameters with params
    static int SumNumbers(params int[] numbers)
    {
        int sum = 0;
        foreach (int num in numbers)
        {
            sum += num;
        }
        return sum;
    }
    
    // Ref parameter - pass by reference (changes affect original)
    static void DoubleValue(ref int number)
    {
        number = number * 2;
    }
    
    // Out parameter - for returning multiple values
    static bool TryGetUserData(out string name, out int age)
    {
        name = "John";
        age = 25;
        return true;
    }
    
    // Method overloading - same name, different parameters
    static void Print(int value)
    {
        Console.WriteLine($"Integer: {value}");
    }
    
    static void Print(double value)
    {
        Console.WriteLine($"Double: {value}");
    }
    
    static void Print(string value)
    {
        Console.WriteLine($"String: {value}");
    }
    
    static void Main()
    {
        // Optional parameters
        PrintInfo("John"); // Uses default age=0, city="Unknown"
        PrintInfo("Alice", 30); // Uses default city="Unknown"
        PrintInfo("Bob", 35, "LA");
        
        // Named parameters - call in any order
        Console.WriteLine("\n=== Named Parameters ===");
        DisplayMessage("Hello", fontSize: 16);
        DisplayMessage(message: "World", isBold: true, fontSize: 14);
        DisplayMessage(isBold: true, message: "C#", fontSize: 18);
        
        // Variable parameters (params)
        Console.WriteLine("\n=== Params Keyword ===");
        int total1 = SumNumbers(10, 20, 30);
        Console.WriteLine($"Sum of 10,20,30: {total1}");
        
        int total2 = SumNumbers(5, 10, 15, 20, 25);
        Console.WriteLine($"Sum of 5,10,15,20,25: {total2}");
        
        int total3 = SumNumbers(); // Even works with no arguments
        Console.WriteLine($"Sum of nothing: {total3}");
        
        // Ref parameter
        Console.WriteLine("\n=== Ref Parameter ===");
        int num = 5;
        Console.WriteLine($"Before: {num}");
        DoubleValue(ref num);
        Console.WriteLine($"After: {num}"); // Value changed!
        
        // Out parameter
        Console.WriteLine("\n=== Out Parameter ===");
        if (TryGetUserData(out string name, out int age))
        {
            Console.WriteLine($"Got user: {name}, Age: {age}");
        }
        
        // Method overloading
        Console.WriteLine("\n=== Method Overloading ===");
        Print(42);
        Print(3.14);
        Print("Hello");
        
        // Recursive function example
        Console.WriteLine("\n=== Recursion ===");
        int factorial = CalculateFactorial(5);
        Console.WriteLine($"Factorial of 5: {factorial}");
    }
    
    // Recursive function
    static int CalculateFactorial(int n)
    {
        if (n <= 1)
            return 1;
        return n * CalculateFactorial(n - 1);
    }
}
```

---

## 33. Access Specifiers

**Interview Answer:**

Access specifiers control visibility of classes, methods, and properties. `public` - accessible anywhere, `private` - accessible only within the class (default for members), `protected` - accessible within class and derived classes, `internal` - accessible within same assembly, `protected internal` - accessible within assembly and derived classes. Use `private` by default (encapsulation), then relax as needed. They enforce encapsulation and prevent unauthorized access.

**Example Code:**

```csharp
using System;

// Public class - accessible from anywhere
public class BankAccount
{
    // Private field - not accessible outside class
    private decimal balance;
    
    // Private field
    private string accountNumber;
    
    // Public property - controlled access to balance
    public decimal Balance
    {
        get { return balance; }
        private set { balance = value; } // Only class can set
    }
    
    // Public method - accessible from anywhere
    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
            LogTransaction("Deposit", amount);
        }
    }
    
    // Public method
    public bool Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= balance)
        {
            balance -= amount;
            LogTransaction("Withdrawal", amount);
            return true;
        }
        return false;
    }
    
    // Private method - only accessible within class
    private void LogTransaction(string type, decimal amount)
    {
        Console.WriteLine($"[LOG] {type}: ${amount}");
    }
    
    // Protected method - accessible by derived classes
    protected void ResetAccount()
    {
        balance = 0;
    }
}

// Derived class inherits from BankAccount
public class SavingsAccount : BankAccount
{
    private decimal interestRate;
    
    public void ApplyInterest()
    {
        // Can access protected method
        // ResetAccount();
        
        decimal interest = Balance * interestRate;
        Deposit(interest);
    }
}

class Program
{
    static void Main()
    {
        BankAccount account = new BankAccount();
        
        // Access public method
        account.Deposit(1000);
        Console.WriteLine($"Balance: ${account.Balance}");
        
        // Access public method
        if (account.Withdraw(500))
        {
            Console.WriteLine("Withdrawal successful");
        }
        
        // Can read Balance (public get)
        Console.WriteLine($"Current Balance: ${account.Balance}");
        
        // Cannot do this (private field):
        // account.balance = 5000; // Compile error
        
        // Cannot do this (private method):
        // account.LogTransaction("Test", 100); // Compile error
        
        // Cannot set Balance directly (private setter):
        // account.Balance = 500; // Compile error
    }
}
```

---

## 34. Out Parameter

**Interview Answer:**

The `out` keyword allows a method to return multiple values. The caller must initialize the variable as `out`. The method must assign a value to the `out` parameter before returning. Unlike `ref`, `out` parameters don't need initialization before calling (the method will initialize them). Use `out` when you need to return multiple values without using a class or tuple.

**Example Code:**

```csharp
using System;

class Program
{
    // Method with out parameter - returns multiple values
    static void GetPersonInfo(out string name, out int age)
    {
        name = "John";
        age = 25;
    }
    
    // Parse string to integer using out
    static bool ParseInteger(string value, out int result)
    {
        return int.TryParse(value, out result);
    }
    
    // Calculate with multiple results
    static void CalculateStats(int[] numbers, out int min, out int max, out double average)
    {
        min = numbers[0];
        max = numbers[0];
        int sum = 0;
        
        foreach (int num in numbers)
        {
            if (num < min) min = num;
            if (num > max) max = num;
            sum += num;
        }
        
        average = sum / (double)numbers.Length;
    }
    
    static void Main()
    {
        // Using out parameter
        GetPersonInfo(out string name, out int age);
        Console.WriteLine($"Name: {name}, Age: {age}");
        
        // Using TryParse with out
        if (ParseInteger("42", out int number))
        {
            Console.WriteLine($"Parsed number: {number}");
        }
        
        // Get multiple return values
        int[] values = { 10, 50, 30, 20, 40 };
        CalculateStats(values, out int minimum, out int maximum, out double avg);
        
        Console.WriteLine($"Min: {minimum}");
        Console.WriteLine($"Max: {maximum}");
        Console.WriteLine($"Average: {avg}");
    }
}
```

---

## 35. Pass By Reference

**Interview Answer:**

`ref` keyword passes variables by reference, meaning the method receives a reference to the original variable (not a copy). Changes made to `ref` parameters affect the original variable. Unlike value types which are copied, `ref` lets you modify the original. Both caller and method must use `ref` keyword. `ref` parameters must be initialized before calling. Use `ref` when you want to modify the caller's variable or avoid copying large values.

**Example Code:**

```csharp
using System;

class Program
{
    // Pass by reference - method can modify original
    static void Increment(ref int value)
    {
        value++;
    }
    
    // Swap two values using ref
    static void Swap(ref int a, ref int b)
    {
        int temp = a;
        a = b;
        b = temp;
    }
    
    // Modify array using ref
    static void DoubleArrayValues(ref int[] array)
    {
        for (int i = 0; i < array.Length; i++)
        {
            array[i] *= 2;
        }
    }
    
    // Ref with string (immutable, so limited use)
    static void ModifyString(ref string text)
    {
        text = text.ToUpper();
    }
    
    static void Main()
    {
        // Ref parameter example
        int number = 5;
        Console.WriteLine($"Before: {number}");
        Increment(ref number);
        Console.WriteLine($"After: {number}"); // 6
        
        // Swap using ref
        int x = 10, y = 20;
        Console.WriteLine($"Before swap: x={x}, y={y}");
        Swap(ref x, ref y);
        Console.WriteLine($"After swap: x={x}, y={y}");
        
        // Modify array
        int[] numbers = { 1, 2, 3, 4, 5 };
        Console.WriteLine("Before: " + string.Join(", ", numbers));
        DoubleArrayValues(ref numbers);
        Console.WriteLine("After: " + string.Join(", ", numbers));
        
        // Modify string
        string text = "hello";
        Console.WriteLine($"Before: {text}");
        ModifyString(ref text);
        Console.WriteLine($"After: {text}");
    }
}
```

---

## 36. Passing Unknown Number of Parameters

**Interview Answer:**

The `params` keyword allows a method to accept a variable number of arguments of the same type. The `params` parameter must be an array and must be the last parameter in the method signature. It allows calling the method with 0 or more arguments. You can pass an array directly. Multiple methods can be overloaded to accept different numbers of parameters using `params`. Internally, `params` creates an array.

**Example Code:**

```csharp
using System;

class Program
{
    // Method with params - variable number of integers
    static int SumNumbers(params int[] numbers)
    {
        int sum = 0;
        foreach (int num in numbers)
        {
            sum += num;
        }
        return sum;
    }
    
    // Method with params for strings
    static void PrintNames(params string[] names)
    {
        foreach (string name in names)
        {
            Console.WriteLine(name);
        }
    }
    
    // Method with required + params
    static void LogMessages(string level, params string[] messages)
    {
        Console.WriteLine($"[{level}]");
        foreach (string msg in messages)
        {
            Console.WriteLine($"  - {msg}");
        }
    }
    
    static void Main()
    {
        // Call with different number of arguments
        Console.WriteLine($"Sum: {SumNumbers()}"); // 0
        Console.WriteLine($"Sum: {SumNumbers(5)}"); // 5
        Console.WriteLine($"Sum: {SumNumbers(10, 20)}"); // 30
        Console.WriteLine($"Sum: {SumNumbers(1, 2, 3, 4, 5)}"); // 15
        
        // Pass array directly
        int[] values = { 100, 200, 300 };
        Console.WriteLine($"Sum: {SumNumbers(values)}"); // 600
        
        // With strings
        PrintNames("Alice", "Bob", "Charlie");
        
        // With required + params
        LogMessages("INFO", "Application started", "Database connected");
        LogMessages("ERROR", "Network error", "Retry attempt 1", "Retry attempt 2");
    }
}
```

---

## 37. Method Overloading

**Interview Answer:**

Method overloading allows multiple methods with the same name but different parameters. The difference can be in number, type, or order of parameters. The compiler chooses which method to call based on the arguments provided (compile-time polymorphism). Overloading makes code more intuitive and readable. You cannot overload based on return type alone. Overloading is different from overriding (which is runtime polymorphism with inheritance).

**Example Code:**

```csharp
using System;

class Calculator
{
    // Overload 1: Two integers
    public int Add(int a, int b)
    {
        Console.WriteLine("Add(int, int) called");
        return a + b;
    }
    
    // Overload 2: Two doubles
    public double Add(double a, double b)
    {
        Console.WriteLine("Add(double, double) called");
        return a + b;
    }
    
    // Overload 3: Three integers
    public int Add(int a, int b, int c)
    {
        Console.WriteLine("Add(int, int, int) called");
        return a + b + c;
    }
    
    // Overload 4: Different order of parameters
    public string Concat(string a, int b)
    {
        Console.WriteLine("Concat(string, int) called");
        return a + b;
    }
    
    public string Concat(int a, string b)
    {
        Console.WriteLine("Concat(int, string) called");
        return a + b;
    }
    
    // Overload 5: Different types
    public void Display(int value)
    {
        Console.WriteLine($"Integer: {value}");
    }
    
    public void Display(string value)
    {
        Console.WriteLine($"String: {value}");
    }
    
    public void Display(double value)
    {
        Console.WriteLine($"Double: {value}");
    }
}

class Program
{
    static void Main()
    {
        Calculator calc = new Calculator();
        
        // Calls Add(int, int)
        int result1 = calc.Add(10, 20);
        Console.WriteLine($"Result: {result1}\n");
        
        // Calls Add(double, double)
        double result2 = calc.Add(10.5, 20.3);
        Console.WriteLine($"Result: {result2}\n");
        
        // Calls Add(int, int, int)
        int result3 = calc.Add(5, 10, 15);
        Console.WriteLine($"Result: {result3}\n");
        
        // Different parameter order
        string concat1 = calc.Concat("Number: ", 42);
        Console.WriteLine($"Result: {concat1}\n");
        
        string concat2 = calc.Concat(42, " is the answer");
        Console.WriteLine($"Result: {concat2}\n");
        
        // Different parameter types
        calc.Display(42);
        calc.Display("Hello");
        calc.Display(3.14);
    }
}
```

---

## 38. DateTime / TimeSpan

**Interview Answer:**

`DateTime` represents a date and time value. `TimeSpan` represents a duration (difference between two dates/times). DateTime is immutable (methods return new instances). Common DateTime methods: `Now` (current date/time), `Today` (current date), `AddDays()`, `AddMonths()`, `AddYears()`, `AddHours()`, `AddMinutes()`. TimeSpan measures elapsed time. DateTime can be formatted using format strings. `DateTime.TryParse()` safely parses strings.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // DateTime properties
        DateTime now = DateTime.Now; // Current date and time
        DateTime today = DateTime.Today; // Current date, time 00:00:00
        DateTime specificDate = new DateTime(2025, 11, 30); // Specific date
        DateTime specificDateTime = new DateTime(2025, 11, 30, 20, 30, 45); // With time
        
        Console.WriteLine($"Now: {now}");
        Console.WriteLine($"Today: {today}");
        Console.WriteLine($"Specific: {specificDate}");
        Console.WriteLine();
        
        // DateTime components
        Console.WriteLine($"Year: {now.Year}");
        Console.WriteLine($"Month: {now.Month}");
        Console.WriteLine($"Day: {now.Day}");
        Console.WriteLine($"Hour: {now.Hour}");
        Console.WriteLine($"Minute: {now.Minute}");
        Console.WriteLine($"Second: {now.Second}");
        Console.WriteLine($"DayOfWeek: {now.DayOfWeek}");
        Console.WriteLine();
        
        // DateTime arithmetic
        DateTime tomorrow = now.AddDays(1);
        DateTime nextMonth = now.AddMonths(1);
        DateTime nextYear = now.AddYears(1);
        DateTime later = now.AddHours(3).AddMinutes(30);
        
        Console.WriteLine($"Tomorrow: {tomorrow}");
        Console.WriteLine($"Next month: {nextMonth}");
        Console.WriteLine($"Next year: {nextYear}");
        Console.WriteLine($"Later: {later}");
        Console.WriteLine();
        
        // DateTime formatting
        Console.WriteLine($"Short date: {now:d}"); // 11/30/2025
        Console.WriteLine($"Long date: {now:D}"); // Sunday, November 30, 2025
        Console.WriteLine($"Time: {now:t}"); // 8:13 PM
        Console.WriteLine($"Full: {now:g}"); // 11/30/2025 8:13 PM
        Console.WriteLine($"Custom: {now:yyyy-MM-dd HH:mm:ss}");
        Console.WriteLine();
        
        // TimeSpan - represents time duration
        DateTime start = new DateTime(2025, 1, 1);
        DateTime end = new DateTime(2025, 12, 31);
        
        TimeSpan duration = end - start;
        Console.WriteLine($"Duration: {duration}");
        Console.WriteLine($"Days: {duration.Days}");
        Console.WriteLine($"Hours: {duration.Hours}");
        Console.WriteLine($"Minutes: {duration.Minutes}");
        Console.WriteLine($"Total days: {duration.TotalDays}");
        Console.WriteLine();
        
        // Creating TimeSpan
        TimeSpan ts1 = new TimeSpan(5, 30, 45); // 5 hours, 30 min, 45 sec
        TimeSpan ts2 = TimeSpan.FromDays(7);
        TimeSpan ts3 = TimeSpan.FromHours(24);
        
        Console.WriteLine($"Timespan 1: {ts1}");
        Console.WriteLine($"7 days: {ts2}");
        Console.WriteLine($"24 hours: {ts3}");
        Console.WriteLine();
        
        // DateTime comparison
        if (tomorrow > today)
        {
            Console.WriteLine("Tomorrow is after today");
        }
        
        // DateTime parsing
        if (DateTime.TryParse("11/30/2025", out DateTime parsed))
        {
            Console.WriteLine($"Parsed: {parsed}");
        }
    }
}
```

---

## 39. Enumerated Types (Enums)

**Interview Answer:**

An enum (enumeration) is a value type that defines a set of named integer constants. Enums provide readable code by using meaningful names instead of numbers. Default underlying type is `int`. Values auto-increment by 1, starting from 0. You can assign custom values to enum members. Enums are useful for representing fixed sets of values (like status, direction, color). Use `Enum.GetNames()` and `Enum.GetValues()` to iterate through enum members.

**Example Code:**

```csharp
using System;

// Define enum
public enum DayOfWeek
{
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 7
}

// Enum with different underlying type
public enum Priority : byte
{
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4
}

// Flags enum - for combinations
[Flags]
public enum Permissions
{
    Read = 1,
    Write = 2,
    Execute = 4,
    Delete = 8
}

class Program
{
    static void Main()
    {
        // Using enum
        DayOfWeek today = DayOfWeek.Monday;
        Console.WriteLine($"Today: {today}");
        
        // Enum comparison
        if (today == DayOfWeek.Monday)
        {
            Console.WriteLine("It's Monday!");
        }
        
        // Enum values as integers
        int dayValue = (int)DayOfWeek.Friday;
        Console.WriteLine($"Friday value: {dayValue}");
        
        // Convert int to enum
        DayOfWeek day = (DayOfWeek)5;
        Console.WriteLine($"Day 5: {day}");
        
        // Enum in switch
        switch (today)
        {
            case DayOfWeek.Monday:
                Console.WriteLine("Start of week");
                break;
            case DayOfWeek.Friday:
                Console.WriteLine("Almost weekend!");
                break;
            case DayOfWeek.Saturday:
            case DayOfWeek.Sunday:
                Console.WriteLine("Weekend!");
                break;
        }
        
        // Get all enum values
        Console.WriteLine("\nAll days:");
        foreach (DayOfWeek d in Enum.GetValues(typeof(DayOfWeek)))
        {
            Console.WriteLine($"  {d}: {(int)d}");
        }
        
        // Get all enum names
        Console.WriteLine("\nEnum names:");
        string[] names = Enum.GetNames(typeof(DayOfWeek));
        foreach (string name in names)
        {
            Console.WriteLine($"  {name}");
        }
        
        // Parse string to enum
        if (Enum.TryParse("Wednesday", out DayOfWeek result))
        {
            Console.WriteLine($"Parsed: {result}");
        }
        
        // Flags enum example
        Permissions userPermissions = Permissions.Read | Permissions.Write;
        
        // Check if permission exists
        if ((userPermissions & Permissions.Read) == Permissions.Read)
        {
            Console.WriteLine("User has Read permission");
        }
        
        if ((userPermissions & Permissions.Delete) == Permissions.Delete)
        {
            Console.WriteLine("User has Delete permission");
        }
        else
        {
            Console.WriteLine("User doesn't have Delete permission");
        }
    }
}
```

---

## 40. Classes / Objects

**Interview Answer:**

A class is a template/blueprint for creating objects. It defines properties (data) and methods (behavior). Objects are instances of classes. Classes are reference types stored on the heap. When you create an object using `new`, memory is allocated on the heap and a reference is stored on the stack. Classes support inheritance, encapsulation, abstraction, and polymorphism. A class can have fields, properties, methods, constructors, and nested classes.

**Example Code:**

```csharp
using System;

// Define a class
public class Person
{
    // Fields (data members)
    private string firstName;
    private string lastName;
    private int age;
    
    // Properties (controlled access to fields)
    public string FirstName
    {
        get { return firstName; }
        set { firstName = value; }
    }
    
    public string LastName
    {
        get { return lastName; }
        set { lastName = value; }
    }
    
    public int Age
    {
        get { return age; }
        set { if (value >= 0) age = value; }
    }
    
    // Method
    public string GetFullName()
    {
        return $"{firstName} {lastName}";
    }
    
    // Method
    public void DisplayInfo()
    {
        Console.WriteLine($"Name: {GetFullName()}, Age: {age}");
    }
}

class Program
{
    static void Main()
    {
        // Create object instance using new keyword
        Person person1 = new Person();
        
        // Access and set properties
        person1.FirstName = "John";
        person1.LastName = "Doe";
        person1.Age = 30;
        
        // Call methods
        Console.WriteLine($"Full Name: {person1.GetFullName()}");
        person1.DisplayInfo();
        
        // Create another object
        Person person2 = new Person();
        person2.FirstName = "Alice";
        person2.LastName = "Smith";
        person2.Age = 28;
        
        person2.DisplayInfo();
        
        // Objects are reference types
        Person person3 = person1; // person3 references same object as person1
        person3.Age = 35;
        Console.WriteLine($"person1 age: {person1.Age}"); // Also 35!
        
        // Objects are different from value types
        int x = 5;
        int y = x; // y is copy of x
        y = 10;
        Console.WriteLine($"x: {x}, y: {y}"); // x is still 5
    }
}


```

---
## 41. Constructor

**Interview Answer:**

A constructor is a special method called automatically when creating an object instance. It initializes object state. Constructors have the same name as the class and no return type. You can have multiple constructors (overloading). If you don't define a constructor, C# provides a default parameterless one. Constructors can call other constructors using `:this()`. Use constructors to ensure objects start in a valid state. Cannot be inherited; each class defines its own.

**Example Code:**

```csharp
using System;

public class Car
{
    public string Brand { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }
    
    // Default constructor (parameterless)
    public Car()
    {
        Brand = "Unknown";
        Model = "Unknown";
        Year = 2000;
        Console.WriteLine("Default constructor called");
    }
    
    // Constructor with parameters
    public Car(string brand, string model)
    {
        Brand = brand;
        Model = model;
        Year = DateTime.Now.Year;
        Console.WriteLine("Constructor with 2 parameters called");
    }
    
    // Constructor with all parameters
    public Car(string brand, string model, int year)
    {
        Brand = brand;
        Model = model;
        Year = year;
        Console.WriteLine("Constructor with 3 parameters called");
    }
    
    // Constructor that calls another constructor using this()
    public Car(string brand) : this(brand, "Default Model", 2020)
    {
        Console.WriteLine("Constructor with 1 parameter called");
    }
    
    // Display method
    public void Display()
    {
        Console.WriteLine($"{Year} {Brand} {Model}");
    }
}

class Program
{
    static void Main()
    {
        // Calls default constructor
        Car car1 = new Car();
        car1.Display();
        
        Console.WriteLine();
        
        // Calls constructor with 2 parameters
        Car car2 = new Car("Toyota", "Camry");
        car2.Display();
        
        Console.WriteLine();
        
        // Calls constructor with 3 parameters
        Car car3 = new Car("Honda", "Civic", 2023);
        car3.Display();
        
        Console.WriteLine();
        
        // Calls constructor with 1 parameter (which calls 3-parameter constructor)
        Car car4 = new Car("BMW");
        car4.Display();
    }
}
```

---

## 42. Static

**Interview Answer:**

`static` members belong to the class itself, not to instances. A static field is shared by all instances. A static method can be called without creating an object. Static constructors initialize static fields (called once). Use static for utility methods, constants, or shared data. Static fields take memory only once (not per instance). Cannot access instance members from static context without an object reference. `Math.PI` and `Console.WriteLine` are examples of static members.

**Example Code:**

```csharp
using System;

public class BankAccount
{
    // Static field - shared by all instances
    static decimal interestRate = 0.05m;
    
    // Static counter
    static int accountCount = 0;
    
    // Instance field
    private decimal balance;
    private string accountNumber;
    
    // Constructor
    public BankAccount(decimal initialBalance)
    {
        balance = initialBalance;
        accountCount++; // Increment static counter
        accountNumber = $"ACC{accountCount}";
    }
    
    // Static method
    public static void SetInterestRate(decimal rate)
    {
        interestRate = rate;
    }
    
    // Static method - utility
    public static decimal GetInterestRate()
    {
        return interestRate;
    }
    
    // Instance method
    public void ApplyInterest()
    {
        balance += balance * interestRate;
    }
    
    // Static method - total accounts created
    public static int GetTotalAccounts()
    {
        return accountCount;
    }
    
    public void Display()
    {
        Console.WriteLine($"Account: {accountNumber}, Balance: ${balance:F2}");
    }
}

class Program
{
    static void Main()
    {
        // Call static method without creating object
        Console.WriteLine($"Initial interest rate: {BankAccount.GetInterestRate()}");
        
        // Create accounts
        BankAccount account1 = new BankAccount(1000);
        BankAccount account2 = new BankAccount(2000);
        BankAccount account3 = new BankAccount(1500);
        
        // Static field is shared
        Console.WriteLine($"Total accounts: {BankAccount.GetTotalAccounts()}");
        
        account1.Display();
        account2.Display();
        account3.Display();
        
        // Change static interest rate
        BankAccount.SetInterestRate(0.08m);
        
        // All accounts use the new rate
        account1.ApplyInterest();
        account2.ApplyInterest();
        account3.ApplyInterest();
        
        Console.WriteLine($"\nAfter interest:");
        account1.Display();
        account2.Display();
        account3.Display();
    }
}
```

---

## 43. This Keyword

**Interview Answer:**

`this` refers to the current instance of the class. Use `this` to distinguish between instance variables and parameters (e.g., `this.name = name`). Use `this()` in constructor to call another constructor of the same class. Use `this.methodName()` to explicitly call instance methods (usually not necessary). `this` helps avoid naming conflicts and improves code clarity.

**Example Code:**

```csharp
using System;

public class Student
{
    private string name;
    private int age;
    private double gpa;
    
    // Constructor using 'this' to refer to fields
    public Student(string name, int age, double gpa)
    {
        this.name = name; // 'this.name' refers to field, 'name' is parameter
        this.age = age;
        this.gpa = gpa;
    }
    
    // Overloaded constructor that calls another constructor using 'this()'
    public Student(string name) : this(name, 0, 0.0)
    {
        Console.WriteLine("Student created with name only");
    }
    
    // Method using 'this'
    public void Display()
    {
        Console.WriteLine($"Name: {this.name}, Age: {this.age}, GPA: {this.gpa}");
    }
    
    // Method that returns 'this' for method chaining
    public Student SetAge(int age)
    {
        this.age = age;
        return this;
    }
    
    public Student SetGPA(double gpa)
    {
        this.gpa = gpa;
        return this;
    }
    
    // Explicitly call another method using 'this'
    public void PrintInfo()
    {
        this.Display(); // Explicit call (implicit also works)
    }
}

class Program
{
    static void Main()
    {
        Student student = new Student("John", 20, 3.5);
        student.Display();
        
        // Method chaining using 'this'
        Student student2 = new Student("Alice")
            .SetAge(22)
            .SetGPA(3.8);
        
        student2.Display();
    }
}
```

---

## 44. Structs

**Interview Answer:**

A struct is a value type (like int, double) unlike classes which are reference types. Structs are stored on the stack (for local variables) and are copied by value. Structs can have methods and properties like classes. Structs are useful for small, lightweight data types. When passing struct to a method, a copy is made. Default constructor can't be defined in structs. Structs cannot inherit from other structs (but can implement interfaces). Use struct for small, immutable data; use class for complex objects.

**Example Code:**

```csharp
using System;

// Define a struct (value type)
public struct Point
{
    public int X { get; set; }
    public int Y { get; set; }
    
    // Constructor
    public Point(int x, int y)
    {
        X = x;
        Y = y;
    }
    
    // Method
    public double GetDistance()
    {
        return Math.Sqrt(X * X + Y * Y);
    }
    
    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}

class Program
{
    // Method that receives struct by value
    static void ModifyPoint(Point p)
    {
        p.X = 100;
        p.Y = 100;
        Console.WriteLine($"Inside method: {p}"); // (100, 100)
    }
    
    // Method that receives struct by reference
    static void ModifyPointByRef(ref Point p)
    {
        p.X = 100;
        p.Y = 100;
    }
    
    static void Main()
    {
        // Create struct variable
        Point point1 = new Point(5, 10);
        Console.WriteLine($"Original: {point1}");
        
        // Pass by value - original not modified
        ModifyPoint(point1);
        Console.WriteLine($"After passing by value: {point1}"); // Still (5, 10)
        
        // Pass by reference - original is modified
        ModifyPointByRef(ref point1);
        Console.WriteLine($"After passing by ref: {point1}"); // (100, 100)
        
        // Struct as array element
        Point[] points = new Point[3];
        points[0] = new Point(0, 0);
        points[1] = new Point(3, 4);
        points[2] = new Point(5, 12);
        
        Console.WriteLine("Points and distances:");
        foreach (Point p in points)
        {
            Console.WriteLine($"{p}: Distance = {p.GetDistance():F2}");
        }
    }
}
```

---

## 45. Nullable Types

**Interview Answer:**

Nullable types allow value types (int, double, bool) to have a `null` value. Declared using `?` after the type (e.g., `int?`). Use `HasValue` property to check if null, use `.Value` to get value or `.GetValueOrDefault()` for default if null. Useful when a value might be absent (like database nulls). Can use `??` null coalescing operator to provide default. Common in LINQ and database operations.

**Example Code:**

```csharp
using System;

class Program
{
    static void Main()
    {
        // Nullable int
        int? nullableInt = null;
        Console.WriteLine($"Nullable int is null: {nullableInt == null}");
        
        // Assign value
        nullableInt = 42;
        Console.WriteLine($"Nullable int value: {nullableInt}");
        
        // Check HasValue
        if (nullableInt.HasValue)
        {
            Console.WriteLine($"Value: {nullableInt.Value}");
        }
        
        // Different nullable types
        double? nullableDouble = null;
        bool? nullableBool = true;
        decimal? nullableDecimal = null;
        
        // GetValueOrDefault
        int? num = null;
        int result = num.GetValueOrDefault(10); // Default 10
        Console.WriteLine($"Result: {result}"); // 10
        
        // Null coalescing operator ??
        int? age = null;
        int defaultAge = age ?? 18;
        Console.WriteLine($"Age: {defaultAge}"); // 18
        
        int? userAge = 25;
        int finalAge = userAge ?? 18;
        Console.WriteLine($"User age: {finalAge}"); // 25
        
        // Null coalescing assignment operator ??= (C# 8.0+)
        string name = null;
        name ??= "Guest";
        Console.WriteLine($"Name: {name}"); // Guest
        
        // Nullable with calculations
        int? x = 10;
        int? y = 20;
        int? sum = x + y; // Result: 30
        
        int? a = 10;
        int? b = null;
        int? product = a * b; // Result: null
        Console.WriteLine($"Sum: {sum}, Product: {product}");
    }
}
```

---

## 46. Basic Setter / Getter

**Interview Answer:**

Properties provide controlled access to fields using getter (return value) and setter (assign value). Basic syntax: get/set blocks. Getters return field value; setters assign value. You can add logic (validation, side effects). Auto-properties (`{ get; set; }`) generate backing field automatically. Properties allow encapsulation - hide implementation, expose interface. Useful for validation before setting values.

**Example Code:**

```csharp
using System;

public class Employee
{
    // Backing field
    private string name;
    private int age;
    private decimal salary;
    
    // Basic property with getter and setter
    public string Name
    {
        get
        {
            return name;
        }
        set
        {
            name = value;
        }
    }
    
    // Property with validation in setter
    public int Age
    {
        get
        {
            return age;
        }
        set
        {
            if (value >= 0 && value <= 120)
                age = value;
            else
                Console.WriteLine("Invalid age");
        }
    }
    
    // Property with only getter (read-only)
    public decimal Salary
    {
        get
        {
            return salary;
        }
        set
        {
            if (value > 0)
                salary = value;
        }
    }
    
    public void Display()
    {
        Console.WriteLine($"Name: {Name}, Age: {Age}, Salary: ${Salary:F2}");
    }
}

class Program
{
    static void Main()
    {
        Employee emp = new Employee();
        
        // Using setter
        emp.Name = "John";
        emp.Age = 30;
        emp.Salary = 50000;
        
        // Using getter
        Console.WriteLine(emp.Name);
        Console.WriteLine(emp.Age);
        
        emp.Display();
        
        // Validation in setter prevents invalid age
        emp.Age = 150; // Invalid, not set
        Console.WriteLine(emp.Age); // Still 30
    }
}
```

---

## 47. Getters / Setters Properties (Advanced)

**Interview Answer:**

Advanced property patterns include auto-properties, init-only properties, expression-bodied members, nullable reference types, and validation logic. Auto-properties with `{ get; set; }` remove boilerplate. Expression bodies `=>` make simple properties concise. `init` keyword (C# 9) makes properties settable only during initialization. Properties can have different access levels for getter/setter (e.g., public get, private set).

**Example Code:**

```csharp
using System;

public class User
{
    // Auto-property (compiler generates backing field)
    public string Email { get; set; }
    
    // Auto-property with initialization
    public string Username { get; set; } = "Unknown";
    
    // Expression-bodied property
    public string FullDescription => $"User: {Username}";
    
    // Property with private setter
    public int Id { get; private set; }
    
    // Init-only property (settable only during initialization) - C# 9+
    public DateTime CreatedDate { get; init; }
    
    // Property with backing field and validation
    private int _loginCount;
    public int LoginCount
    {
        get { return _loginCount; }
        set
        {
            if (value >= 0)
                _loginCount = value;
        }
    }
    
    // Read-only property (only getter)
    public bool IsActive => LoginCount > 0;
    
    // Constructor
    public User(int id)
    {
        Id = id;
        CreatedDate = DateTime.Now;
    }
}

class Program
{
    static void Main()
    {
        // Create user with init-only property
        User user = new User(1)
        {
            Email = "john@example.com",
            Username = "john_doe",
            LoginCount = 5
        };
        
        Console.WriteLine($"Email: {user.Email}");
        Console.WriteLine($"Username: {user.Username}");
        Console.WriteLine($"Description: {user.FullDescription}");
        Console.WriteLine($"ID: {user.Id}");
        Console.WriteLine($"Created: {user.CreatedDate}");
        Console.WriteLine($"Login Count: {user.LoginCount}");
        Console.WriteLine($"Is Active: {user.IsActive}");
        
        // Set expression-bodied property result
        user.Email = "newemail@example.com";
        Console.WriteLine($"Updated Email: {user.Email}");
        
        // Init-only property can't be changed after creation
        // user.CreatedDate = DateTime.Now; // Compile error
    }
}
```

---

## 48. Public / Private / Protected

**Interview Answer:**

Access modifiers control visibility. `public` - accessible everywhere, `private` - only within the class (default for members), `protected` - within class and derived classes, `internal` - within same assembly, `protected internal` - within assembly and derived classes. Use `private` for implementation details, `public` for interface. Always minimize visibility (encapsulation). Properties use different access for getter/setter (e.g., public get, private set).

**Example Code:**

```csharp
using System;

public class BankAccount
{
    // Private - only accessible within this class
    private decimal _balance;
    
    // Public - accessible from anywhere
    public string AccountNumber { get; set; }
    
    // Protected - accessible in derived classes
    protected string OwnerName;
    
    // Public property with different access for get/set
    public decimal Balance
    {
        get { return _balance; }
        private set { _balance = value; } // Only class can set
    }
    
    public BankAccount(string accountNumber, string owner)
    {
        AccountNumber = accountNumber;
        OwnerName = owner;
        _balance = 0;
    }
    
    // Public method
    public void Deposit(decimal amount)
    {
        if (amount > 0)
            _balance += amount;
    }
    
    // Private method - helper
    private void LogTransaction(string type, decimal amount)
    {
        Console.WriteLine($"[{type}] ${amount}");
    }
    
    // Protected method - can be used by derived classes
    protected void ResetBalance()
    {
        _balance = 0;
    }
}

class SavingsAccount : BankAccount
{
    public void ApplyInterest(decimal rate)
    {
        // Can access protected member
        if (OwnerName != null)
        {
            Balance += Balance * rate;
        }
    }
}

class Program
{
    static void Main()
    {
        BankAccount account = new BankAccount("12345", "John");
        
        // Access public members
        account.Deposit(1000);
        Console.WriteLine($"Account: {account.AccountNumber}");
        Console.WriteLine($"Balance: ${account.Balance}");
        
        // Cannot access private members
        // account._balance = 5000; // Compile error
        // account.LogTransaction("test", 100); // Compile error
        
        // Cannot set Balance directly (private setter)
        // account.Balance = 500; // Compile error
    }
}
```

---

## 49. Constants

**Interview Answer:**

`const` declares a constant whose value cannot be changed after initialization. Constants must be initialized at declaration. Value must be a compile-time constant. Scope is limited to the method or class. Use `const` for values that never change (PI, MAX_SIZE). Cannot be marked `static` (implicitly static). Unlike `readonly`, constants are replaced by their value at compile time.

**Example Code:**

```csharp
using System;

public class MathConstants
{
    // Constant - compile-time value
    public const double PI = 3.14159;
    public const double E = 2.71828;
    public const int MAX_USERS = 100;
    public const string COMPANY = "MyCompany";
    
    // Constants with mathematical expressions
    public const int MINUTES_PER_HOUR = 60;
    public const int SECONDS_PER_HOUR = 60 * 60;
}

public class Configuration
{
    // Private constants
    private const string DATABASE_NAME = "AppDB";
    private const int TIMEOUT_SECONDS = 30;
    
    public void ConnectToDatabase()
    {
        Console.WriteLine($"Connecting to {DATABASE_NAME} with timeout {TIMEOUT_SECONDS}s");
    }
}

class Program
{
    // Local constant
    const string APP_VERSION = "1.0.0";
    
    static void Main()
    {
        // Using constants
        Console.WriteLine($"PI = {MathConstants.PI}");
        Console.WriteLine($"E = {MathConstants.E}");
        Console.WriteLine($"Max Users: {MathConstants.MAX_USERS}");
        
        // Circle calculation using constant
        double radius = 5;
        double area = MathConstants.PI * radius * radius;
        Console.WriteLine($"Area of circle with radius 5: {area}");
        
        // Application version
        Console.WriteLine($"Version: {APP_VERSION}");
        
        // Constants are compile-time - compiler replaces them
        int secondsPerHour = MathConstants.SECONDS_PER_HOUR;
        Console.WriteLine($"Seconds per hour: {secondsPerHour}");
    }
}
```

---

## 50. Readonly

**Interview Answer:**

`readonly` fields can be assigned once - at declaration or in the constructor. Value is a runtime value (unlike const which is compile-time). Readonly provides immutability for objects. Can be assigned based on constructor parameter. Can be static. Useful for preventing accidental modification of important fields. Once assigned, readonly fields cannot be changed.

**Example Code:**

```csharp
using System;

public class Person
{
    // Readonly field
    public readonly int Id;
    public readonly string Name;
    
    // Readonly object reference (object itself can be modified, but reference cannot)
    public readonly List<string> Tags;
    
    public Person(int id, string name)
    {
        Id = id;
        Name = name;
        Tags = new List<string>();
    }
    
    public void AddTag(string tag)
    {
        Tags.Add(tag); // Can modify the list contents
    }
    
    public void DisplayInfo()
    {
        Console.WriteLine($"ID: {Id}, Name: {Name}");
        Console.WriteLine($"Tags: {string.Join(", ", Tags)}");
    }
}

class Program
{
    static void Main()
    {
        Person person = new Person(1, "John");
        
        // Can read readonly fields
        Console.WriteLine($"ID: {person.Id}");
        Console.WriteLine($"Name: {person.Name}");
        
        // Cannot assign to readonly fields after construction
        // person.Id = 2; // Compile error
        // person.Name = "Alice"; // Compile error
        
        // Can modify contents of readonly object
        person.AddTag("Developer");
        person.AddTag("C#");
        person.DisplayInfo();
    }
}
```

---



## 51. Inheritance

**Interview Answer:**

Inheritance allows a derived class (child) to inherit members from a base class (parent). Use `:` to inherit (`public class Dog : Animal`). Derived class can override base class methods (with `virtual`/`override`). Supports code reuse and hierarchical relationships. C# supports single inheritance from classes (but multiple interface implementation). Derived class can extend functionality and override methods. Constructor of base class is called first. Use `base` keyword to call base class methods/constructors.

**Example Code:**

```csharp
using System;

// Base class
public class Animal
{
    public string Name { get; set; }
    
    public Animal(string name)
    {
        Name = name;
    }
    
    public virtual void MakeSound()
    {
        Console.WriteLine("Some generic sound");
    }
    
    public void Sleep()
    {
        Console.WriteLine($"{Name} is sleeping");
    }
}

// Derived class
public class Dog : Animal
{
    public string Breed { get; set; }
    
    public Dog(string name, string breed) : base(name)
    {
        Breed = breed;
    }
    
    // Override base class method
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} says: Woof!");
    }
    
    public void Fetch()
    {
        Console.WriteLine($"{Name} is fetching");
    }
}

// Another derived class
public class Cat : Animal
{
    public Cat(string name) : base(name)
    {
    }
    
    public override void MakeSound()
    {
        Console.WriteLine($"{Name} says: Meow!");
    }
}

class Program
{
    static void Main()
    {
        Dog dog = new Dog("Buddy", "Golden Retriever");
        Cat cat = new Cat("Whiskers");
        
        // Call inherited method
        dog.Sleep();
        cat.Sleep();
        
        // Call overridden method
        dog.MakeSound();
        cat.MakeSound();
        
        // Call derived class method
        dog.Fetch();
        
        // Polymorphism - treat derived as base
        Animal[] animals = { dog, cat };
        foreach (Animal animal in animals)
        {
            animal.MakeSound();
        }
    }
}
```

---

## 52. Virtual

**Interview Answer:**

`virtual` keyword marks a method in the base class as overridable in derived classes. Virtual methods use runtime polymorphism (late binding) - the actual method called depends on the object type, not the reference type. Virtual methods have a default implementation that can be overridden. Performance is slightly lower than non-virtual due to dynamic lookup. Use `virtual` when you expect subclasses to provide different implementations.

**Example Code:**

```csharp
using System;

public class Shape
{
    public string Name { get; set; }
    
    // Virtual method - can be overridden
    public virtual void Draw()
    {
        Console.WriteLine("Drawing shape");
    }
    
    public virtual double GetArea()
    {
        return 0;
    }
}

public class Circle : Shape
{
    public double Radius { get; set; }
    
    public Circle(double radius)
    {
        Radius = radius;
        Name = "Circle";
    }
    
    // Override virtual method
    public override void Draw()
    {
        Console.WriteLine($"Drawing {Name} with radius {Radius}");
    }
    
    public override double GetArea()
    {
        return Math.PI * Radius * Radius;
    }
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    
    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
        Name = "Rectangle";
    }
    
    public override void Draw()
    {
        Console.WriteLine($"Drawing {Name} {Width}x{Height}");
    }
    
    public override double GetArea()
    {
        return Width * Height;
    }
}

class Program
{
    static void Main()
    {
        Shape shape1 = new Circle(5);
        Shape shape2 = new Rectangle(4, 6);
        
        // Late binding - calls overridden method based on actual type
        shape1.Draw(); // Calls Circle.Draw()
        shape2.Draw(); // Calls Rectangle.Draw()
        
        Console.WriteLine($"Circle area: {shape1.GetArea()}");
        Console.WriteLine($"Rectangle area: {shape2.GetArea()}");
        
        // Polymorphic array
        Shape[] shapes = { shape1, shape2 };
        foreach (Shape s in shapes)
        {
            s.Draw();
            Console.WriteLine($"Area: {s.GetArea()}\n");
        }
    }
}
```

---

## 53. Override Method

**Interview Answer:**

`override` keyword in derived class provides new implementation for a virtual method from base class. Both base method must be `virtual` (or `abstract`) and derived method must use `override`. Signature must match exactly. Override enables polymorphism - different behaviors through same interface. Cannot override non-virtual methods. `base.MethodName()` calls base class version of overridden method.

**Example Code:**

```csharp
using System;

public class Vehicle
{
    public string Name { get; set; }
    
    public virtual void Start()
    {
        Console.WriteLine("Vehicle is starting");
    }
    
    public virtual void Stop()
    {
        Console.WriteLine("Vehicle is stopping");
    }
}

public class Car : Vehicle
{
    public override void Start()
    {
        Console.WriteLine($"{Name} engine starts");
    }
    
    public override void Stop()
    {
        Console.WriteLine($"{Name} engine stops");
    }
}

public class Motorcycle : Vehicle
{
    public override void Start()
    {
        // Call base implementation first
        base.Start();
        Console.WriteLine($"{Name} motorcycle engine started");
    }
    
    public override void Stop()
    {
        Console.WriteLine($"{Name} motorcycle stopped");
    }
}

class Program
{
    static void Main()
    {
        Vehicle car = new Car { Name = "Tesla" };
        Vehicle bike = new Motorcycle { Name = "Harley" };
        
        car.Start();
        car.Stop();
        
        Console.WriteLine();
        
        bike.Start();
        bike.Stop();
    }
}
```

---

## 54. Abstract Classes / Methods

**Interview Answer:**

`abstract` class cannot be instantiated directly. Abstract methods have no implementation; derived classes must override them. Abstract class can have concrete methods too. Used to define template/contract for derived classes. Use when you have common functionality but need specific implementations in subclasses. Abstract ensures derived classes provide required methods. Cannot mark `private` or `static` with `abstract` on method level.

**Example Code:**

```csharp
using System;

// Abstract base class
public abstract class Employee
{
    public string Name { get; set; }
    
    public Employee(string name)
    {
        Name = name;
    }
    
    // Concrete method
    public void DisplayName()
    {
        Console.WriteLine($"Employee: {Name}");
    }
    
    // Abstract method - must be overridden
    public abstract decimal CalculateSalary();
    
    // Another abstract method
    public abstract void GetRole();
}

public class Manager : Employee
{
    private decimal baseSalary;
    private decimal bonus;
    
    public Manager(string name, decimal salary, decimal bonus) : base(name)
    {
        baseSalary = salary;
        this.bonus = bonus;
    }
    
    // Must override abstract methods
    public override decimal CalculateSalary()
    {
        return baseSalary + bonus;
    }
    
    public override void GetRole()
    {
        Console.WriteLine($"{Name} is a Manager");
    }
}

public class Developer : Employee
{
    private decimal hourlyRate;
    private int hoursWorked;
    
    public Developer(string name, decimal rate, int hours) : base(name)
    {
        hourlyRate = rate;
        hoursWorked = hours;
    }
    
    public override decimal CalculateSalary()
    {
        return hourlyRate * hoursWorked;
    }
    
    public override void GetRole()
    {
        Console.WriteLine($"{Name} is a Developer");
    }
}

class Program
{
    static void Main()
    {
        // Cannot instantiate abstract class
        // Employee emp = new Employee("John"); // Compile error
        
        Manager manager = new Manager("John", 5000, 500);
        Developer developer = new Developer("Alice", 50, 160);
        
        manager.DisplayName();
        manager.GetRole();
        Console.WriteLine($"Salary: ${manager.CalculateSalary()}");
        
        Console.WriteLine();
        
        developer.DisplayName();
        developer.GetRole();
        Console.WriteLine($"Salary: ${developer.CalculateSalary()}");
    }
}
```

---

## 55. Polymorphism

**Interview Answer:**

Polymorphism means "many forms" - ability to treat objects of different types through a single interface. Two types: Compile-time (method overloading, operator overloading) and Runtime (method overriding, interface implementation). Enables writing generic code. Runtime polymorphism uses `virtual`/`override` and base class references. Allows treating Cat and Dog as Animal. Makes code flexible and extensible.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;

public abstract class Shape
{
    public abstract double GetArea();
    public abstract void Display();
}

public class Circle : Shape
{
    public double Radius { get; set; }
    
    public Circle(double radius) => Radius = radius;
    
    public override double GetArea() => Math.PI * Radius * Radius;
    
    public override void Display() => Console.WriteLine($"Circle: Radius={Radius}, Area={GetArea():F2}");
}

public class Rectangle : Shape
{
    public double Width { get; set; }
    public double Height { get; set; }
    
    public Rectangle(double width, double height)
    {
        Width = width;
        Height = height;
    }
    
    public override double GetArea() => Width * Height;
    
    public override void Display() => Console.WriteLine($"Rectangle: {Width}x{Height}, Area={GetArea():F2}");
}

public class Triangle : Shape
{
    public double Base { get; set; }
    public double Height { get; set; }
    
    public Triangle(double baseLength, double height)
    {
        Base = baseLength;
        Height = height;
    }
    
    public override double GetArea() => 0.5 * Base * Height;
    
    public override void Display() => Console.WriteLine($"Triangle: Area={GetArea():F2}");
}

class Program
{
    static void Main()
    {
        // Polymorphic collection
        List<Shape> shapes = new List<Shape>
        {
            new Circle(5),
            new Rectangle(4, 6),
            new Triangle(5, 8)
        };
        
        double totalArea = 0;
        
        foreach (Shape shape in shapes)
        {
            shape.Display();
            totalArea += shape.GetArea();
        }
        
        Console.WriteLine($"\nTotal area: {totalArea:F2}");
    }
}
```

---

## 56. Interfaces

**Interview Answer:**

An interface defines a contract (methods/properties) that implementing classes must provide. Interfaces cannot have implementation (except default methods in C# 8.0+). A class can implement multiple interfaces. Interface members are public and abstract by default. Use interface for "capability" relationships. Interface name often starts with 'I'. Cannot instantiate interface, but can declare reference of interface type. Interfaces support polymorphism through implementation.

**Example Code:**

```csharp
using System;

// Define interfaces
public interface IDrawable
{
    void Draw();
}

public interface IResizable
{
    void Resize(double factor);
}

public interface IMovable
{
    void Move(int x, int y);
}

// Implementing single interface
public class Circle : IDrawable
{
    public void Draw()
    {
        Console.WriteLine("Drawing circle");
    }
}

// Implementing multiple interfaces
public class Shape : IDrawable, IResizable, IMovable
{
    private double _size;
    private int _x, _y;
    
    public Shape(double size, int x = 0, int y = 0)
    {
        _size = size;
        _x = x;
        _y = y;
    }
    
    public void Draw()
    {
        Console.WriteLine($"Drawing shape at ({_x}, {_y})");
    }
    
    public void Resize(double factor)
    {
        _size *= factor;
        Console.WriteLine($"Shape resized. New size: {_size}");
    }
    
    public void Move(int x, int y)
    {
        _x = x;
        _y = y;
        Console.WriteLine($"Shape moved to ({_x}, {_y})");
    }
}

class Program
{
    static void Main()
    {
        Shape shape = new Shape(10, 5, 5);
        
        // Use as IDrawable
        IDrawable drawable = shape;
        drawable.Draw();
        
        // Use as IResizable
        IResizable resizable = shape;
        resizable.Resize(2);
        
        // Use as IMovable
        IMovable movable = shape;
        movable.Move(10, 20);
        
        // Polymorphic array
        IDrawable[] drawables = new IDrawable[] { shape, new Circle() };
        foreach (IDrawable d in drawables)
        {
            d.Draw();
        }
    }
}
```

---

## 57. ArrayList

**Interview Answer:**

`ArrayList` is a non-generic collection (from `System.Collections`) that can hold mixed types. Dynamically resizes. Less efficient than generic `List<T>` because of boxing/unboxing. Add items with `Add()`, retrieve with `[]` index. Useful for legacy code. Modern code should use generic `List<T>` instead. Cannot directly iterate with specific type - need casting. Mostly used for backward compatibility.

**Example Code:**

```csharp
using System;
using System.Collections;

class Program
{
    static void Main()
    {
        // Create ArrayList
        ArrayList list = new ArrayList();
        
        // Add different types (boxing occurs)
        list.Add(42);
        list.Add("Hello");
        list.Add(3.14);
        list.Add(true);
        list.Add(new object());
        
        Console.WriteLine($"Count: {list.Count}");
        
        // Access elements
        Console.WriteLine($"First: {list[0]}");
        Console.WriteLine($"Second: {list[1]}");
        
        // Iterate and cast
        foreach (object item in list)
        {
            Console.WriteLine($"Item: {item}");
        }
        
        // Insert
        list.Insert(1, "Inserted");
        
        // Remove
        list.Remove("Hello");
        list.RemoveAt(0);
        
        // Contains
        if (list.Contains(3.14))
            Console.WriteLine("Contains 3.14");
        
        // Better approach: Use generic List<T> instead
        Console.WriteLine("\n=== Better: Use List<T> instead ===");
        
        List<int> numbers = new List<int>();
        numbers.Add(10);
        numbers.Add(20);
        numbers.Add(30);
        
        foreach (int num in numbers)
        {
            Console.WriteLine(num);
        }
    }
}
```

---

## 58. Dictionaries

**Interview Answer:**

`Dictionary<TKey, TValue>` stores key-value pairs with fast O(1) lookup. Keys must be unique. Access using `dictionary[key]`. Add with `Add()` or `dictionary[key] = value`. Use `TryGetValue()` for safe retrieval. Iterate with foreach over `KeyValuePair`. Use `ContainsKey()` to check existence. Keys and Values properties return collections. Useful for lookups, mappings, caching.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // Create dictionary
        Dictionary<string, int> ages = new Dictionary<string, int>();
        
        // Add items
        ages.Add("John", 25);
        ages.Add("Alice", 30);
        ages.Add("Bob", 28);
        
        // Alternatively, initialize with values
        Dictionary<string, string> cities = new Dictionary<string, string>
        {
            { "US", "New York" },
            { "UK", "London" },
            { "France", "Paris" }
        };
        
        // Access value
        Console.WriteLine($"John's age: {ages["John"]}");
        
        // Check key existence
        if (ages.ContainsKey("Alice"))
            Console.WriteLine("Alice found");
        
        // Safe retrieval with TryGetValue
        if (ages.TryGetValue("Bob", out int bobAge))
            Console.WriteLine($"Bob's age: {bobAge}");
        else
            Console.WriteLine("Bob not found");
        
        // Update value
        ages["John"] = 26;
        
        // Iterate over key-value pairs
        Console.WriteLine("\nAll ages:");
        foreach (KeyValuePair<string, int> kvp in ages)
        {
            Console.WriteLine($"{kvp.Key}: {kvp.Value}");
        }
        
        // Iterate over keys
        Console.WriteLine("\nKeys:");
        foreach (string key in ages.Keys)
        {
            Console.WriteLine(key);
        }
        
        // Iterate over values
        Console.WriteLine("\nValues:");
        foreach (int age in ages.Values)
        {
            Console.WriteLine(age);
        }
        
        // Remove
        ages.Remove("Bob");
        Console.WriteLine($"Count after remove: {ages.Count}");
        
        // Clear
        // ages.Clear();
    }
}
```

---

## 59. Queues and Stacks

**Interview Answer:**

`Queue<T>` follows FIFO (First-In-First-Out) - first element added is first removed. Use `Enqueue()` to add, `Dequeue()` to remove. `Peek()` views first element without removing. Useful for task scheduling, message processing.

`Stack<T>` follows LIFO (Last-In-First-Out) - last element added is first removed. Use `Push()` to add, `Pop()` to remove. `Peek()` views top element. Useful for undo/redo, expression evaluation, recursion.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main()
    {
        // QUEUE - FIFO
        Console.WriteLine("=== Queue (FIFO) ===");
        Queue<int> queue = new Queue<int>();
        
        // Enqueue
        queue.Enqueue(10);
        queue.Enqueue(20);
        queue.Enqueue(30);
        queue.Enqueue(40);
        
        // Count
        Console.WriteLine($"Queue count: {queue.Count}");
        
        // Peek (view first without removing)
        Console.WriteLine($"Front element: {queue.Peek()}");
        
        // Dequeue (remove and return first)
        while (queue.Count > 0)
        {
            int item = queue.Dequeue();
            Console.WriteLine($"Dequeued: {item}");
        }
        
        // STACK - LIFO
        Console.WriteLine("\n=== Stack (LIFO) ===");
        Stack<string> stack = new Stack<string>();
        
        // Push
        stack.Push("First");
        stack.Push("Second");
        stack.Push("Third");
        stack.Push("Fourth");
        
        // Count
        Console.WriteLine($"Stack count: {stack.Count}");
        
        // Peek (view top without removing)
        Console.WriteLine($"Top element: {stack.Peek()}");
        
        // Pop (remove and return top)
        while (stack.Count > 0)
        {
            string item = stack.Pop();
            Console.WriteLine($"Popped: {item}");
        }
        
        // Practical example: Undo mechanism
        Console.WriteLine("\n=== Undo Mechanism ===");
        Stack<string> undoStack = new Stack<string>();
        
        undoStack.Push("Typed: Hello");
        undoStack.Push("Typed: World");
        undoStack.Push("Deleted: d");
        
        while (undoStack.Count > 0)
        {
            Console.WriteLine($"Undo: {undoStack.Pop()}");
        }
    }
}
```

---

## 60. Generics

**Interview Answer:**

Generics allow type-safe collections and methods using type parameters. Declared with angle brackets `<T>`. Compiler ensures type safety at compile time. No boxing/unboxing (better performance). `List<T>`, `Dictionary<K,V>`, `Queue<T>` are generic. Can create generic classes/methods. Generic constraints restrict types (`where T : IComparable`). Generic methods can be called with different types. Better than non-generic `ArrayList`.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;

// Generic class
public class Repository<T>
{
    private List<T> items = new List<T>();
    
    public void Add(T item)
    {
        items.Add(item);
    }
    
    public T GetAt(int index)
    {
        return items[index];
    }
    
    public int Count => items.Count;
    
    public void DisplayAll()
    {
        foreach (T item in items)
        {
            Console.WriteLine(item);
        }
    }
}

// Generic method
public class Utility
{
    public static void PrintArray<T>(T[] array)
    {
        foreach (T item in array)
        {
            Console.WriteLine(item);
        }
    }
    
    public static T GetMax<T>(T a, T b) where T : IComparable<T>
    {
        return a.CompareTo(b) > 0 ? a : b;
    }
}

class Program
{
    static void Main()
    {
        // Generic with integers
        Repository<int> intRepo = new Repository<int>();
        intRepo.Add(10);
        intRepo.Add(20);
        intRepo.Add(30);
        
        Console.WriteLine("Integers:");
        intRepo.DisplayAll();
        
        // Generic with strings
        Repository<string> stringRepo = new Repository<string>();
        stringRepo.Add("Alice");
        stringRepo.Add("Bob");
        
        Console.WriteLine("\nStrings:");
        stringRepo.DisplayAll();
        
        // Generic method
        Utility.PrintArray(new int[] { 1, 2, 3 });
        Utility.PrintArray(new string[] { "A", "B", "C" });
        
        // Generic with constraints
        int max = Utility.GetMax(10, 20);
        Console.WriteLine($"Max: {max}");
    }
}
```

---

## 61. Delegates

**Interview Answer:**

A delegate is a type-safe function pointer or reference type that holds a reference to a method. Declares method signature. Multiple methods can be assigned to same delegate. Use `+=` to add, `-=` to remove methods. Useful for callbacks, events, functional programming. `Action<T>` - delegate with no return. `Func<T, TResult>` - delegate returning value. Delegates enable loose coupling and flexible callback mechanisms.

**Example Code:**

```csharp
using System;

// Define delegate type
public delegate void Notify(string message);
public delegate int Calculate(int a, int b);

class Program
{
    // Method matching delegate signature
    static void SendEmail(string message)
    {
        Console.WriteLine($"Email sent: {message}");
    }
    
    static void SendSMS(string message)
    {
        Console.WriteLine($"SMS sent: {message}");
    }
    
    static int Add(int a, int b)
    {
        return a + b;
    }
    
    static int Multiply(int a, int b)
    {
        return a * b;
    }
    
    static void Main()
    {
        // Create delegate instance
        Notify notifier = SendEmail;
        notifier("Hello!");
        
        // Multicast delegate
        notifier += SendSMS;
        notifier("Important message");
        
        // Remove method
        notifier -= SendEmail;
        notifier("Another message");
        
        // Calculate delegate
        Calculate calc = Add;
        int result1 = calc(5, 10);
        Console.WriteLine($"Sum: {result1}");
        
        calc = Multiply;
        int result2 = calc(5, 10);
        Console.WriteLine($"Product: {result2}");
        
        // Action and Func
        Action<string> greet = (name) => Console.WriteLine($"Hello {name}");
        greet("Alice");
        
        Func<int, int, int> sum = (a, b) => a + b;
        Console.WriteLine($"Sum: {sum(3, 4)}");
    }
}
```

---

## 62. Lambda

**Interview Answer:**

Lambda expressions are anonymous functions using `=>` operator. Compact syntax for delegates and LINQ. Syntax: `(parameters) => expression/statement`. Single parameter doesn't need parentheses. Single expression doesn't need braces. Type inference determines parameter types. Return type inferred from expression. Can be assigned to delegates and Func/Action types. Enables functional programming style.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Simple lambda
        Func<int, int> square = x => x * x;
        Console.WriteLine($"Square of 5: {square(5)}");
        
        // Lambda with multiple parameters
        Func<int, int, int> add = (a, b) => a + b;
        Console.WriteLine($"Sum: {add(10, 20)}");
        
        // Lambda with statement body
        Action<string> greet = name =>
        {
            Console.WriteLine($"Hello {name}");
            Console.WriteLine("Welcome!");
        };
        greet("Alice");
        
        // Lambda with no parameters
        Action sayHi = () => Console.WriteLine("Hi!");
        sayHi();
        
        // Lambda with List
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        
        // Filter using lambda
        var evenNumbers = numbers.Where(n => n % 2 == 0);
        Console.WriteLine("Even: " + string.Join(", ", evenNumbers));
        
        // Map using lambda
        var doubled = numbers.Select(n => n * 2);
        Console.WriteLine("Doubled: " + string.Join(", ", doubled));
        
        // Complex lambda
        var result = numbers
            .Where(n => n > 2)
            .Select(n => n * n)
            .OrderByDescending(n => n);
        
        Console.WriteLine("Squared > 2: " + string.Join(", ", result));
    }
}
```

---



## 63. Where (LINQ)

**Interview Answer:**

`Where` is a LINQ operator that filters elements based on a condition (predicate). Returns only elements where the predicate returns true. Takes a lambda expression or delegate as parameter. Returns `IEnumerable<T>`. Can chain multiple Where clauses. Useful for filtering collections. Executes lazily (only when enumerated).

**Example Code:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        
        // Basic Where
        var evenNumbers = numbers.Where(n => n % 2 == 0);
        Console.WriteLine("Even numbers: " + string.Join(", ", evenNumbers));
        
        // Where with condition
        var greaterThanFive = numbers.Where(n => n > 5);
        Console.WriteLine("Greater than 5: " + string.Join(", ", greaterThanFive));
        
        // Multiple Where clauses
        var filtered = numbers
            .Where(n => n > 2)
            .Where(n => n < 8)
            .Where(n => n % 2 == 0);
        Console.WriteLine("Filtered: " + string.Join(", ", filtered));
        
        // Where with complex condition
        var result = numbers.Where(n => (n > 3) && (n % 2 == 1));
        Console.WriteLine("Odd and > 3: " + string.Join(", ", result));
        
        // Where with objects
        List<Person> people = new List<Person>
        {
            new Person { Name = "John", Age = 25 },
            new Person { Name = "Alice", Age = 30 },
            new Person { Name = "Bob", Age = 22 }
        };
        
        var adults = people.Where(p => p.Age >= 18);
        foreach (var person in adults)
        {
            Console.WriteLine($"{person.Name}: {person.Age}");
        }
    }
}

public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
}
```

---

## 64. Select (LINQ)

**Interview Answer:**

`Select` transforms/projects each element using a selector function. Returns new sequence of transformed elements. Useful for extracting specific properties or computing values. Returns `IEnumerable<T>`. Can change the type (e.g., int collection to string collection). Executes lazily. Often used with Where for filtering and transforming.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        
        // Basic Select - double each number
        var doubled = numbers.Select(n => n * 2);
        Console.WriteLine("Doubled: " + string.Join(", ", doubled));
        
        // Select to string
        var numberStrings = numbers.Select(n => n.ToString());
        Console.WriteLine("As strings: " + string.Join(", ", numberStrings));
        
        // Select with calculation
        var squares = numbers.Select(n => new { Number = n, Square = n * n });
        foreach (var item in squares)
        {
            Console.WriteLine($"{item.Number} -> {item.Square}");
        }
        
        // Select specific property from objects
        List<Product> products = new List<Product>
        {
            new Product { Name = "Laptop", Price = 1000 },
            new Product { Name = "Mouse", Price = 25 },
            new Product { Name = "Keyboard", Price = 75 }
        };
        
        var names = products.Select(p => p.Name);
        Console.WriteLine("Products: " + string.Join(", ", names));
        
        // Select with Where
        var expensiveNames = products
            .Where(p => p.Price > 50)
            .Select(p => p.Name);
        Console.WriteLine("Expensive: " + string.Join(", ", expensiveNames));
        
        // Select creates new type
        var productInfo = products.Select(p => $"{p.Name}: ${p.Price}");
        foreach (var info in productInfo)
        {
            Console.WriteLine(info);
        }
    }
}

public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
}
```

---

## 65. Range

**Interview Answer:**

`Range` generates sequence of integers within specified range. Static method of `Enumerable` class. Syntax: `Enumerable.Range(start, count)`. Returns `IEnumerable<int>`. Useful for generating sequences without explicit loops. First parameter is start value, second is count of elements. Executes lazily.

**Example Code:**

```csharp
using System;
using System.Linq;

class Program
{
    static void Main()
    {
        // Basic Range - 0 to 9
        var range1 = Enumerable.Range(0, 10);
        Console.WriteLine("0-9: " + string.Join(", ", range1));
        
        // Range with different start
        var range2 = Enumerable.Range(1, 5);
        Console.WriteLine("1-5: " + string.Join(", ", range2));
        
        // Range with Select
        var doubled = Enumerable.Range(1, 5).Select(n => n * 2);
        Console.WriteLine("Doubled: " + string.Join(", ", doubled));
        
        // Range with Where
        var evenNumbers = Enumerable.Range(1, 20).Where(n => n % 2 == 0);
        Console.WriteLine("Even 1-20: " + string.Join(", ", evenNumbers));
        
        // Range with Skip and Take
        var middle = Enumerable.Range(1, 100).Skip(40).Take(10);
        Console.WriteLine("40-49: " + string.Join(", ", middle));
    }
}
```

---

## 66. Zip

**Interview Answer:**

`Zip` combines two sequences element by element. Applies function to corresponding elements. Returns sequence of results. Stops when shorter sequence ends. Useful for combining parallel data. Can merge two lists into one result.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<string> names = new List<string> { "Alice", "Bob", "Charlie" };
        List<int> ages = new List<int> { 25, 30, 28 };
        
        // Basic Zip
        var combined = names.Zip(ages, (name, age) => $"{name}: {age}");
        foreach (var item in combined)
        {
            Console.WriteLine(item);
        }
        
        // Zip with different types
        List<string> colors = new List<string> { "Red", "Blue", "Green" };
        List<string> animals = new List<string> { "Fox", "Jay", "Turtle" };
        
        var pairs = colors.Zip(animals, (color, animal) => 
            $"The {color} {animal}");
        foreach (var pair in pairs)
        {
            Console.WriteLine(pair);
        }
    }
}
```

---

## 67. Aggregate

**Interview Answer:**

`Aggregate` applies accumulator function over sequence. Returns single value. Can provide seed (initial value). Useful for combining/reducing data. Works like fold/reduce in functional programming. Different from GroupBy - Aggregate reduces to single value.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        
        // Sum using Aggregate
        int sum = numbers.Aggregate((acc, n) => acc + n);
        Console.WriteLine($"Sum: {sum}");
        
        // Product using Aggregate
        int product = numbers.Aggregate((acc, n) => acc * n);
        Console.WriteLine($"Product: {product}");
        
        // With seed value
        int sumWithSeed = numbers.Aggregate(100, (acc, n) => acc + n);
        Console.WriteLine($"Sum (seed 100): {sumWithSeed}");
        
        // String concatenation
        List<string> words = new List<string> { "Hello", "World", "C#" };
        string sentence = words.Aggregate((acc, word) => acc + " " + word);
        Console.WriteLine($"Sentence: {sentence}");
        
        // With result selector
        List<int> nums = new List<int> { 1, 2, 3, 4 };
        var result = nums.Aggregate(0, (acc, n) => acc + n, acc => acc * 2);
        Console.WriteLine($"Sum * 2: {result}");
    }
}
```

---

## 68. Average

**Interview Answer:**

`Average` calculates average (mean) of numeric sequence. Returns decimal. Throws exception if sequence is empty. Can use on numeric types only. Can combine with Where to average subset.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 10, 20, 30, 40, 50 };
        
        // Basic Average
        double avg = numbers.Average();
        Console.WriteLine($"Average: {avg}");
        
        // Average with decimals
        List<decimal> prices = new List<decimal> { 19.99m, 29.99m, 39.99m };
        decimal avgPrice = prices.Average();
        Console.WriteLine($"Average price: ${avgPrice:F2}");
        
        // Average with Where
        var avgEven = numbers.Where(n => n % 2 == 0).Average();
        Console.WriteLine($"Average even: {avgEven}");
        
        // Average with Select (calculating from property)
        List<Product> products = new List<Product>
        {
            new Product { Name = "A", Price = 10 },
            new Product { Name = "B", Price = 20 },
            new Product { Name = "C", Price = 30 }
        };
        
        double avgProductPrice = products.Average(p => (double)p.Price);
        Console.WriteLine($"Average product price: ${avgProductPrice}");
    }
}

public class Product { public string Name { get; set; } public decimal Price { get; set; } }
```

---

## 69. All / Any

**Interview Answer:**

`All` returns true if all elements satisfy condition. `Any` returns true if at least one element satisfies condition. Both return bool. Both execute immediately (not lazy). Useful for validation/verification. `All` with empty collection returns true.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        List<int> numbers = new List<int> { 2, 4, 6, 8, 10 };
        
        // All - all elements are even
        bool allEven = numbers.All(n => n % 2 == 0);
        Console.WriteLine($"All even: {allEven}"); // true
        
        // Any - at least one odd
        bool hasOdd = numbers.Any(n => n % 2 == 1);
        Console.WriteLine($"Has odd: {hasOdd}"); // false
        
        // All greater than zero
        bool allPositive = numbers.All(n => n > 0);
        Console.WriteLine($"All positive: {allPositive}"); // true
        
        // Any greater than 15
        bool hasGreatThan15 = numbers.Any(n => n > 15);
        Console.WriteLine($"Any > 15: {hasGreatThan15}"); // false
        
        // With objects
        List<Person> people = new List<Person>
        {
            new Person { Name = "Alice", Age = 25 },
            new Person { Name = "Bob", Age = 30 },
            new Person { Name = "Charlie", Age = 28 }
        };
        
        // All adults
        bool allAdults = people.All(p => p.Age >= 18);
        Console.WriteLine($"All adults: {allAdults}"); // true
        
        // Any older than 35
        bool anyOldThan35 = people.Any(p => p.Age > 35);
        Console.WriteLine($"Any > 35: {anyOldThan35}"); // false
    }
}

public class Person { public string Name { get; set; } public int Age { get; set; } }
```

---

## 70. Distinct / Except / Intersect

**Interview Answer:**

`Distinct` removes duplicates from sequence. `Except` returns elements in first sequence not in second. `Intersect` returns common elements between two sequences. All return new sequences. Useful for set operations. Execute immediately.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // DISTINCT
        List<int> numbers = new List<int> { 1, 2, 2, 3, 3, 3, 4, 5, 5 };
        var distinct = numbers.Distinct();
        Console.WriteLine("Distinct: " + string.Join(", ", distinct));
        
        // EXCEPT - elements in first but not in second
        List<int> list1 = new List<int> { 1, 2, 3, 4, 5 };
        List<int> list2 = new List<int> { 4, 5, 6, 7 };
        var except = list1.Except(list2);
        Console.WriteLine("List1 - List2: " + string.Join(", ", except)); // 1, 2, 3
        
        // INTERSECT - common elements
        var intersect = list1.Intersect(list2);
        Console.WriteLine("Common: " + string.Join(", ", intersect)); // 4, 5
        
        // With strings
        var names1 = new List<string> { "Alice", "Bob", "Charlie", "Alice" };
        var names2 = new List<string> { "Bob", "David", "Eve" };
        
        var uniqueNames = names1.Distinct();
        Console.WriteLine("Unique names: " + string.Join(", ", uniqueNames));
        
        var onlyInNames1 = names1.Distinct().Except(names2);
        Console.WriteLine("Only in list1: " + string.Join(", ", onlyInNames1));
        
        var common = names1.Intersect(names2);
        Console.WriteLine("Common names: " + string.Join(", ", common));
    }
}
```

---

## 71. IEnumerator

**Interview Answer:**

`IEnumerator` interface provides forward-only iteration through collection. Methods: `MoveNext()` (advance to next), `Current` (get current element), `Reset()` (go to beginning). Implements foreach logic. Usually used indirectly through foreach. Used in yield return. Enables custom iteration logic.

**Example Code:**

```csharp
using System;
using System.Collections;
using System.Collections.Generic;

public class CustomCollection : IEnumerable
{
    private int[] items = { 10, 20, 30, 40, 50 };
    
    public IEnumerator GetEnumerator()
    {
        return new CustomEnumerator(items);
    }
}

public class CustomEnumerator : IEnumerator
{
    private int[] items;
    private int position = -1;
    
    public CustomEnumerator(int[] items)
    {
        this.items = items;
    }
    
    public object Current
    {
        get { return items[position]; }
    }
    
    public bool MoveNext()
    {
        position++;
        return position < items.Length;
    }
    
    public void Reset()
    {
        position = -1;
    }
}

class Program
{
    static void Main()
    {
        CustomCollection collection = new CustomCollection();
        
        foreach (int item in collection)
        {
            Console.WriteLine(item);
        }
        
        // Manual enumerator usage
        IEnumerator enumerator = collection.GetEnumerator();
        while (enumerator.MoveNext())
        {
            Console.WriteLine(enumerator.Current);
        }
    }
}
```

---

## 72. Operator Overloading

**Interview Answer:**

Operator overloading allows defining custom behavior for operators (+, -, *, /, ==, !=, etc.). Declare static method with `operator` keyword. Enables intuitive syntax for custom types. Example: Vector + Vector. Cannot overload assignment (=), logical (&&, ||), ternary (?:). Both operands must be the custom type (or one can be different). Useful for mathematical/domain types.

**Example Code:**

```csharp
using System;

public class Vector
{
    public int X { get; set; }
    public int Y { get; set; }
    
    public Vector(int x, int y)
    {
        X = x;
        Y = y;
    }
    
    // Overload + operator
    public static Vector operator +(Vector v1, Vector v2)
    {
        return new Vector(v1.X + v2.X, v1.Y + v2.Y);
    }
    
    // Overload - operator
    public static Vector operator -(Vector v1, Vector v2)
    {
        return new Vector(v1.X - v2.X, v1.Y - v2.Y);
    }
    
    // Overload * operator (scalar multiplication)
    public static Vector operator *(Vector v, int scalar)
    {
        return new Vector(v.X * scalar, v.Y * scalar);
    }
    
    // Overload == operator
    public static bool operator ==(Vector v1, Vector v2)
    {
        return v1.X == v2.X && v1.Y == v2.Y;
    }
    
    // Overload != operator
    public static bool operator !=(Vector v1, Vector v2)
    {
        return !(v1 == v2);
    }
    
    public override string ToString()
    {
        return $"({X}, {Y})";
    }
}

class Program
{
    static void Main()
    {
        Vector v1 = new Vector(1, 2);
        Vector v2 = new Vector(3, 4);
        
        // Use overloaded operators
        Vector sum = v1 + v2;
        Console.WriteLine($"{v1} + {v2} = {sum}");
        
        Vector diff = v1 - v2;
        Console.WriteLine($"{v1} - {v2} = {diff}");
        
        Vector scaled = v1 * 3;
        Console.WriteLine($"{v1} * 3 = {scaled}");
        
        // Comparison
        Console.WriteLine($"{v1} == {v2}: {v1 == v2}");
        Console.WriteLine($"{v1} != {v2}: {v1 != v2}");
    }
}
```

---

## 73. Anonymous Types

**Interview Answer:**

Anonymous types are types created on-the-fly without explicit class definition. Created using `new { prop1 = value1, prop2 = value2 }` syntax. Compiler generates class with properties. Scope limited (usually local). Properties are read-only. Useful with LINQ Select. Two anonymous types with same properties/names are same type. Cannot be returned from method (scope issue). Used for temporary data grouping.

**Example Code:**

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Create anonymous type
        var person = new { Name = "John", Age = 25, City = "NYC" };
        
        Console.WriteLine($"Name: {person.Name}");
        Console.WriteLine($"Age: {person.Age}");
        Console.WriteLine($"City: {person.City}");
        
        // Anonymous type from LINQ
        List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
        
        var numberInfo = numbers.Select(n => new 
        { 
            Number = n, 
            Square = n * n, 
            IsEven = n % 2 == 0 
        });
        
        foreach (var info in numberInfo)
        {
            Console.WriteLine($"{info.Number}: Square={info.Square}, Even={info.IsEven}");
        }
        
        // Collection of anonymous types
        var employees = new[]
        {
            new { Name = "Alice", Department = "IT", Salary = 60000 },
            new { Name = "Bob", Department = "HR", Salary = 50000 },
            new { Name = "Charlie", Department = "IT", Salary = 65000 }
        };
        
        var itEmployees = employees.Where(e => e.Department == "IT");
        foreach (var emp in itEmployees)
        {
            Console.WriteLine($"{emp.Name}: ${emp.Salary}");
        }
    }
}
```

---














