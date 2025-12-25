# JavaScript Interview Questions - Comprehensive Guide

## Table of Contents
1. [Basics](#basics)
2. [DOM Manipulation](#dom-manipulation)
3. [Functions](#functions)
4. [Arrays and Objects](#arrays-and-objects)

---

## Basics

### What is JavaScript?

JavaScript is a lightweight, interpreted, dynamically-typed programming language that runs in browsers and servers (Node.js). It's the primary language for interactive web development, enabling dynamic content manipulation, asynchronous operations, and event handling.

**Key Points:**
- Interpreted language (not compiled)
- Runs on the client-side (browser) and server-side (Node.js)
- Dynamically typed (type checking at runtime)
- Object-oriented and functional programming paradigms

---

### What are the key features of JavaScript?

1. **Lightweight and Interpreted** - No compilation step needed
2. **Dynamic Typing** - Variables can hold any data type
3. **Functional Programming** - First-class functions, closures, higher-order functions
4. **Prototype-based OOP** - Objects inherit from prototypes rather than classes
5. **Event-driven** - Responds to user interactions
6. **Asynchronous** - Non-blocking I/O with callbacks, promises, async/await
7. **DOM Manipulation** - Interact with HTML elements
8. **JSON Support** - Native JSON parsing and stringification

---

### What are the differences between JavaScript and Java?

| Feature | JavaScript | Java |
|---------|-----------|------|
| **Type** | Interpreted | Compiled |
| **Typing** | Dynamically typed | Statically typed |
| **Execution** | Client-side (browser) & Server-side | Server-side (JVM) |
| **Object Model** | Prototype-based | Class-based |
| **Syntax** | Curly braces, flexible | Curly braces, strict |
| **Memory Management** | Garbage collection | Garbage collection |
| **Use Case** | Web development, frontend | Enterprise applications |
| **Extension** | `.js` | `.java` |

---

### How do you include JavaScript in an HTML file?

**Three methods:**

```html
<!-- 1. External JavaScript File (Recommended) -->
<script src="path/to/script.js"></script>

<!-- 2. Internal JavaScript -->
<script>
  console.log("Inline JavaScript");
</script>

<!-- 3. Inline JavaScript (Not recommended for production) -->
<button onclick="alert('Clicked!')">Click me</button>
```

**Best Practice:** Use external files as they:
- Improve code organization
- Enable caching
- Separate concerns
- Support minification

---

### What are the different data types in JavaScript?

JavaScript has **7 primitive types** and **1 complex type**:

**Primitive Types:**
```javascript
// 1. String
const str = "Hello";

// 2. Number (includes integers and floats)
const num = 42;
const float = 3.14;
const inf = Infinity;

// 3. Boolean
const bool = true;

// 4. Undefined (variable declared but not assigned)
let x;
console.log(x); // undefined

// 5. Null (intentional absence of value)
const empty = null;

// 6. Symbol (unique identifier)
const sym = Symbol("id");

// 7. BigInt (numbers larger than Number.MAX_SAFE_INTEGER)
const big = 123456789012345678901234567890n;
```

**Complex Type:**
```javascript
// Object (includes arrays, functions, and objects)
const obj = { name: "John", age: 30 };
const arr = [1, 2, 3];
const func = function() {};
```

---

### What is the difference between == and ===?

```javascript
// == (Loose Equality - Type Coercion)
console.log(5 == "5");      // true (string "5" coerced to number 5)
console.log(true == 1);     // true (boolean coerced to number 1)
console.log(null == undefined); // true (special case)

// === (Strict Equality - No Type Coercion)
console.log(5 === "5");     // false (different types)
console.log(true === 1);    // false (different types)
console.log(null === undefined); // false (different types)
```

**Best Practice:** Always use `===` to avoid unexpected type coercion bugs.

---

### What is the difference between null and undefined?

```javascript
// undefined
// - Declared but not assigned
// - Function returns nothing
// - Function parameter not passed
let x;
console.log(x); // undefined

function test(param) {
  console.log(param); // undefined if not passed
}

// null
// - Intentional absence of value
// - Must be explicitly assigned
const value = null;

// Checking for both
if (value === null || value === undefined) {
  console.log("Value is empty");
}

// Using nullish coalescing
const result = null ?? "default"; // "default"
const result2 = undefined ?? "default"; // "default"
const result3 = 0 ?? "default"; // 0 (doesn't treat 0 as nullish)
```

---

### What is the use of the typeof operator in JavaScript?

```javascript
// Returns the type of a variable as a string

console.log(typeof "hello");        // "string"
console.log(typeof 42);             // "number"
console.log(typeof true);           // "boolean"
console.log(typeof undefined);      // "undefined"
console.log(typeof Symbol("id"));   // "symbol"
console.log(typeof 123n);           // "bigint"
console.log(typeof {});             // "object" (objects return "object")
console.log(typeof []);             // "object" (arrays return "object")
console.log(typeof function() {});  // "function" (functions return "function")
console.log(typeof null);           // "object" (this is a known quirk in JS)

// Practical use: Null checking
if (typeof data === "undefined") {
  console.log("Data is not defined");
}

// Check if variable exists
if (typeof myVar !== "undefined") {
  // Safe to use myVar
}
```

---

### What are JavaScript variables? How do you declare them?

Variables are containers for storing data values.

```javascript
// Three ways to declare variables

// 1. var (Function-scoped, can be redeclared, hoisted)
var name = "John";
var name = "Jane"; // Can redeclare

// 2. let (Block-scoped, cannot be redeclared, hoisted but not initialized)
let age = 25;
// let age = 30; // Error: Identifier 'age' has already been declared

// 3. const (Block-scoped, cannot be redeclared or reassigned, hoisted but not initialized)
const PI = 3.14159;
// PI = 3.14; // Error: Assignment to constant variable

// But const objects can have properties modified
const person = { name: "John" };
person.name = "Jane"; // This works
```

---

### What is the difference between let, const, and var?

```javascript
// Scope
{
  var x = 1;      // Function-scoped
  let y = 2;      // Block-scoped
  const z = 3;    // Block-scoped
}

console.log(x); // 1 (accessible outside the block)
console.log(y); // ReferenceError (not accessible)
console.log(z); // ReferenceError (not accessible)

// Redeclaration
var a = 1;
var a = 2;      // Allowed
console.log(a); // 2

let b = 1;
// let b = 2;   // Error: Already declared

const c = 1;
// const c = 2; // Error: Already declared

// Reassignment
var d = 1;
d = 2;          // Allowed
console.log(d); // 2

let e = 1;
e = 2;          // Allowed
console.log(e); // 2

const f = 1;
// f = 2;       // Error: Cannot reassign

// Hoisting
console.log(g); // undefined (var is hoisted and initialized)
var g = 1;

console.log(h); // ReferenceError (let is hoisted but not initialized)
let h = 2;
```

**Best Practices:**
- Use `const` by default
- Use `let` when you need to reassign
- Avoid `var` in modern JavaScript

---

### What is hoisting in JavaScript?

Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution.

```javascript
// Variable Hoisting
console.log(x); // undefined (not ReferenceError)
var x = 5;
console.log(x); // 5

// Explanation: JavaScript interprets the above code as:
// var x;           // Declaration hoisted
// console.log(x);  // undefined
// x = 5;           // Assignment stays in place
// console.log(x);  // 5

// Function Declaration Hoisting
sayHi(); // "Hi" - works fine because entire function is hoisted

function sayHi() {
  console.log("Hi");
}

// Function Expression NOT hoisted
// greet(); // Error: greet is not a function

var greet = function() {
  console.log("Hello");
};

// let and const hoisting (Temporal Dead Zone)
console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
```

**Hoisting with var, let, and const:**

```javascript
// var: Hoisted and initialized with undefined
console.log(a); // undefined
var a = 1;

// let: Hoisted but not initialized (Temporal Dead Zone)
// console.log(b); // ReferenceError
let b = 2;

// const: Hoisted but not initialized (Temporal Dead Zone)
// console.log(c); // ReferenceError
const c = 3;
```

---

### Explain the difference in hoisting between var, let, and const.

```javascript
// var
function testVar() {
  console.log(x); // undefined (hoisted with undefined)
  var x = 5;
  console.log(x); // 5
}

// let and const (Temporal Dead Zone - TDZ)
function testLet() {
  // console.log(y); // ReferenceError (in TDZ)
  let y = 10;
  console.log(y); // 10
}

function testConst() {
  // console.log(z); // ReferenceError (in TDZ)
  const z = 15;
  console.log(z); // 15
}

// Hoisting order:
// 1. Function declarations (fully hoisted)
// 2. var declarations (hoisted, initialized to undefined)
// 3. let/const declarations (hoisted, not initialized - TDZ)
```

---

### How does hoisting affect function declarations and expressions?

```javascript
// Function Declaration - Fully Hoisted
console.log(typeof add); // "function"
console.log(add(2, 3)); // 5

function add(a, b) {
  return a + b;
}

// Function Expression - Variable Hoisted, not the function
console.log(typeof multiply); // "undefined"
// console.log(multiply(2, 3)); // Error: multiply is not a function

var multiply = function(a, b) {
  return a * b;
};
console.log(multiply(2, 3)); // 6

// Arrow Function Expression - Same as function expression
// console.log(divide(4, 2)); // Error

const divide = (a, b) => a / b;
console.log(divide(4, 2)); // 2
```

---

### What are the potential issues caused by hoisting?

```javascript
// Issue 1: Using variable before declaration
console.log(x); // undefined (confusing behavior)
var x = 5;

// Issue 2: Function called before declaration (works but confusing)
console.log(add(1, 2)); // 3

function add(a, b) {
  return a + b;
}

// Issue 3: Temporal Dead Zone confusion
function demo() {
  console.log(a); // ReferenceError (but looks like it should be undefined)
  let a = 10;
}

// Issue 4: var in loops
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100); // Prints 3, 3, 3 (not 0, 1, 2)
}

// Fix: use let
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100); // Prints 0, 1, 2 (correct)
}
```

---

### How can you avoid problems related to hoisting?

```javascript
// 1. Declare variables at the top of their scope
function myFunc() {
  let x, y, z; // Declare early
  
  x = 1;
  y = 2;
  z = 3;
}

// 2. Use let and const instead of var
const MY_CONSTANT = 42;
let variable = "value";

// 3. Declare functions before using them
function setUp() {
  // Do setup work
}
setUp(); // Call after declaration

// 4. Use strict mode to catch errors
"use strict";
// Prevents implicit global variables
// function() { implicitGlobal = 5; } // Error

// 5. Use a linter (ESLint) to catch hoisting issues
// ESLint can warn about using variables before declaration
```

---

### What is scope in JavaScript?

Scope determines the accessibility of variables. There are three types:

```javascript
// 1. Global Scope
var globalVar = "global";

function outer() {
  console.log(globalVar); // "global" - accessible
}

// 2. Function Scope (Local Scope)
function myFunc() {
  var funcVar = "function";
  console.log(funcVar); // "function"
}
// console.log(funcVar); // Error - not accessible outside function

// 3. Block Scope (with let and const)
{
  let blockVar = "block";
  const blockConst = "constant";
  console.log(blockVar); // "block"
}
// console.log(blockVar); // Error - not accessible outside block

// 4. Module Scope (with exports/imports)
export const moduleVar = "module";
// Accessible only when imported in other modules
```

---

### Explain Scope and Scope Chain in JavaScript.

```javascript
// Scope Chain: Inner functions can access outer scopes

var globalVar = "global";

function outer() {
  var outerVar = "outer";
  
  function inner() {
    var innerVar = "inner";
    
    // Scope chain: innerVar -> outerVar -> globalVar
    console.log(innerVar);  // "inner"
    console.log(outerVar);  // "outer"
    console.log(globalVar); // "global"
  }
  
  inner();
  // console.log(innerVar); // Error - not accessible
}

outer();

// Example: Real-world scope chain
const userDB = {
  users: ["Alice", "Bob"],
  
  findUser(name) {
    // Scope chain: name -> this -> userDB scope
    const found = this.users.find(user => {
      // Inner scope: user -> found -> name -> this
      return user.toLowerCase() === name.toLowerCase();
    });
    return found;
  }
};

console.log(userDB.findUser("alice")); // "Alice"
```

---

### What is the difference between global and local scope?

```javascript
// Global Scope
var globalVar = "I'm global";

function testScopes() {
  // Local Scope (Function-scoped)
  var localVar = "I'm local";
  
  console.log(globalVar); // "I'm global" - can access global
  console.log(localVar);  // "I'm local" - can access local
}

testScopes();
console.log(globalVar); // "I'm global" - can access global
// console.log(localVar); // Error - cannot access local scope

// Block Scope (with let and const)
{
  let blockVar = "block scoped";
  console.log(blockVar); // "block scoped"
}
// console.log(blockVar); // Error

// Global object scope
// In browsers: window.globalVar
// In Node.js: global.globalVar
console.log(window.globalVar); // "I'm global" (browser)

// Avoid polluting global scope
// Bad:
function badFunc() {
  implicitGlobal = "oops"; // Becomes global!
}

// Good:
function goodFunc() {
  let localVar = "safe";
}
```

---

### What is an arrow function? How is it different from a regular function?

```javascript
// Regular Function
function regularFunc(a, b) {
  return a + b;
}
console.log(regularFunc(2, 3)); // 5

// Arrow Function
const arrowFunc = (a, b) => {
  return a + b;
};
console.log(arrowFunc(2, 3)); // 5

// Concise Arrow Function (implicit return)
const conciseArrow = (a, b) => a + b;
console.log(conciseArrow(2, 3)); // 5

// Single parameter (parentheses optional)
const square = x => x * x;
console.log(square(4)); // 16

// No parameters
const greet = () => "Hello";
console.log(greet()); // "Hello"

// Key Differences:

// 1. this binding - Arrow functions don't have their own 'this'
const obj = {
  name: "Object",
  regularMethod: function() {
    console.log(this.name); // "Object" - correct
  },
  arrowMethod: () => {
    console.log(this.name); // undefined - this is global object
  },
  nestedTest: function() {
    const inner = () => {
      console.log(this.name); // "Object" - inherits outer 'this'
    };
    inner();
  }
};

obj.regularMethod();  // "Object"
obj.arrowMethod();    // undefined
obj.nestedTest();     // "Object"

// 2. arguments object - Arrow functions don't have it
const regularWithArgs = function(a, b) {
  console.log(arguments); // Arguments(2) [1, 2]
};
regularWithArgs(1, 2);

const arrowWithArgs = (a, b) => {
  // console.log(arguments); // Error - not defined
};

// Use rest parameters instead
const arrowWithRest = (...args) => {
  console.log(args); // [1, 2]
};
arrowWithRest(1, 2);

// 3. Constructor - Arrow functions can't be used with new
// const ArrowClass = () => {};
// new ArrowClass(); // Error

function RegularClass() {
  this.value = 42;
}
const instance = new RegularClass();
console.log(instance.value); // 42
```

---

### What is a closure in JavaScript?

A closure is a function that has access to variables from its outer scope, even after the outer function has returned.

```javascript
// Basic Closure Example
function outer() {
  const message = "Hello from outer";
  
  function inner() {
    console.log(message); // Accesses outer's variable
  }
  
  return inner;
}

const closure = outer();
closure(); // "Hello from outer"

// Practical Closures: Data Privacy
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.getCount());  // 2
console.log(counter.decrement()); // 1

// Cannot access count directly
// console.log(counter.count); // undefined

// Closures in Loops
const funcs = [];

// Without closure (wrong)
for (var i = 0; i < 3; i++) {
  funcs.push(() => i);
}
console.log(funcs[0]()); // 3 (all reference the same i)
console.log(funcs[1]()); // 3
console.log(funcs[2]()); // 3

// With closure (correct using let)
const funcsClosed = [];
for (let j = 0; j < 3; j++) {
  funcsClosed.push(() => j);
}
console.log(funcsClosed[0]()); // 0
console.log(funcsClosed[1]()); // 1
console.log(funcsClosed[2]()); // 2

// Module Pattern using Closures
const calculator = (() => {
  let memory = 0;
  
  return {
    add: (x) => {
      memory += x;
      return memory;
    },
    subtract: (x) => {
      memory -= x;
      return memory;
    },
    getMemory: () => memory,
    clear: () => {
      memory = 0;
    }
  };
})();

console.log(calculator.add(10));      // 10
console.log(calculator.add(5));       // 15
console.log(calculator.subtract(3));  // 12
```

---

### What is an IIFE (Immediately Invoked Function Expression)?

An IIFE is a function that runs immediately after it's defined.

```javascript
// Basic IIFE
(function() {
  console.log("I run immediately!");
})();

// With parameters
(function(name) {
  console.log(`Hello, ${name}!`);
})("John");

// Arrow function IIFE
(() => {
  console.log("Arrow IIFE");
})();

// IIFE that returns a value
const result = (function() {
  return 42;
})();
console.log(result); // 42

// With async (useful for async/await at top level)
(async () => {
  const data = await fetch("/api");
  console.log(data);
})();

// Use cases:

// 1. Avoiding global scope pollution
const app = (() => {
  const privateVar = "private";
  
  return {
    publicMethod: () => privateVar
  };
})();

console.log(app.publicMethod()); // "private"
// console.log(app.privateVar); // undefined

// 2. Creating module pattern
const module = (() => {
  let state = {};
  
  return {
    setState: (newState) => {
      state = { ...state, ...newState };
    },
    getState: () => state
  };
})();

// 3. Creating private variables
const counter = (() => {
  let count = 0;
  
  return () => ++count;
})();

console.log(counter()); // 1
console.log(counter()); // 2
```

---

### What is the this keyword in JavaScript?

`this` refers to the object that the function is called on.

```javascript
// 1. Global context
console.log(this); // Window (browser) or Global (Node.js)

// 2. Method context
const person = {
  name: "John",
  greet: function() {
    console.log(this.name); // "John"
  }
};
person.greet();

// 3. Function context
function whoAmI() {
  console.log(this); // Window (browser) or undefined (strict mode)
}
whoAmI();

// 4. Constructor context
function Person(name) {
  this.name = name;
}
const john = new Person("John");
console.log(john.name); // "John"

// 5. Event handler context
const button = document.querySelector("button");
button?.addEventListener("click", function() {
  console.log(this); // The button element
});

// Arrow functions inherit 'this' from outer scope
const obj = {
  name: "Object",
  method: function() {
    const arrow = () => {
      console.log(this.name); // "Object" (inherits from method)
    };
    arrow();
  }
};
obj.method(); // "Object"

// Explicit this binding with call, apply, bind
function introduce() {
  console.log(`I am ${this.name}`);
}

const person1 = { name: "Alice" };
const person2 = { name: "Bob" };

introduce.call(person1);        // "I am Alice"
introduce.apply(person2);       // "I am Bob"
const boundIntro = introduce.bind(person1);
boundIntro();                   // "I am Alice"
```

---

### What is JSON? How do you parse and stringify JSON in JavaScript?

JSON (JavaScript Object Notation) is a lightweight data format for data interchange.

```javascript
// JSON.stringify - Convert JavaScript object to JSON string
const person = {
  name: "John",
  age: 30,
  hobbies: ["reading", "coding"]
};

const jsonString = JSON.stringify(person);
console.log(jsonString);
// {"name":"John","age":30,"hobbies":["reading","coding"]}

// With formatting (indentation)
const prettyJSON = JSON.stringify(person, null, 2);
console.log(prettyJSON);
// {
//   "name": "John",
//   "age": 30,
//   "hobbies": ["reading", "coding"]
// }

// With replacer function (filter/transform)
const filtered = JSON.stringify(person, (key, value) => {
  if (key === "age") return undefined; // Skip age
  return value;
}, 2);

// JSON.parse - Convert JSON string to JavaScript object
const jsonStr = '{"name":"John","age":30,"hobbies":["reading","coding"]}';
const parsedPerson = JSON.parse(jsonStr);
console.log(parsedPerson.name); // "John"

// With reviver function (transform during parsing)
const dateJson = '{"date":"2024-01-15"}';
const withDate = JSON.parse(dateJson, (key, value) => {
  if (key === "date") return new Date(value);
  return value;
});

console.log(withDate.date); // Date object

// Common use cases

// 1. API communication
async function fetchUserData() {
  const response = await fetch("/api/user");
  const data = await response.json(); // Automatically parses JSON
  return data;
}

// 2. LocalStorage
const user = { id: 1, name: "John" };
localStorage.setItem("user", JSON.stringify(user));
const retrievedUser = JSON.parse(localStorage.getItem("user"));

// 3. Deep copying objects
const original = { name: "John", address: { city: "NYC" } };
const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "LA";
console.log(original.address.city); // "NYC" (unchanged)
```

---

### What are JavaScript promises?

Promises represent the eventual completion or failure of an asynchronous operation.

```javascript
// Creating a Promise
const promise = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  
  if (success) {
    resolve("Operation successful!"); // Fulfilled
  } else {
    reject("Operation failed!");      // Rejected
  }
});

// Promise states:
// 1. Pending - initial state
// 2. Fulfilled - operation completed successfully
// 3. Rejected - operation failed

// Consuming a Promise
promise
  .then(result => {
    console.log(result); // "Operation successful!"
  })
  .catch(error => {
    console.error(error); // Called if rejected
  })
  .finally(() => {
    console.log("Operation complete"); // Always runs
  });

// Real-world example: Fetch API
fetch("/api/users")
  .then(response => {
    if (!response.ok) throw new Error("Network error");
    return response.json();
  })
  .then(users => {
    console.log(users); // Process users
  })
  .catch(error => {
    console.error("Error:", error);
  });

// Promise.all - Wait for all promises
Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/posts").then(r => r.json())
])
  .then(([users, posts]) => {
    console.log(users, posts);
  })
  .catch(error => {
    console.error("One promise failed:", error);
  });

// Promise.race - First promise to settle wins
Promise.race([
  fetch("/api/users"),
  new Promise((_, reject) => setTimeout(() => reject("Timeout"), 5000))
])
  .then(response => response.json())
  .catch(error => console.error(error));

// Promise.allSettled - All promises must settle (not fail)
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("error"),
  Promise.resolve(3)
])
  .then(results => {
    console.log(results);
    // [{status: 'fulfilled', value: 1}, 
    //  {status: 'rejected', reason: 'error'}, 
    //  {status: 'fulfilled', value: 3}]
  });
```

---

### What is the use of promises in JavaScript?

```javascript
// 1. Handling asynchronous operations
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: "API response" });
      } else {
        reject("Invalid URL");
      }
    }, 1000);
  });
}

fetchData("/api/data")
  .then(data => console.log(data))
  .catch(error => console.error(error));

// 2. Chaining operations (callback hell solution)
function getUserPosts(userId) {
  return fetch(`/api/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      return fetch(`/api/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => ({ user, posts }));
    });
}

// 3. Error handling
fetch("/api/data")
  .then(response => {
    if (!response.ok) throw new Error("HTTP Error");
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error("Caught error:", error));

// 4. Parallel operations with Promise.all
const results = Promise.all([
  fetch("/api/users").then(r => r.json()),
  fetch("/api/products").then(r => r.json()),
  fetch("/api/orders").then(r => r.json())
]);

// 5. Converting callbacks to promises
function asyncOperation(callback) {
  setTimeout(() => callback(null, "result"), 1000);
}

// Promisified version
function asyncOperationPromise() {
  return new Promise((resolve, reject) => {
    asyncOperation((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
}
```

---

### What is the difference between call, apply, and bind?

These methods control the `this` context of functions.

```javascript
// All three methods: call, apply, bind

const person = {
  fullName: function(title, suffix) {
    return `${title} ${this.firstName} ${this.lastName} ${suffix}`;
  }
};

const john = { firstName: "John", lastName: "Doe" };
const jane = { firstName: "Jane", lastName: "Smith" };

// 1. call() - Calls function immediately with specific 'this'
console.log(person.fullName.call(john, "Mr.", "Esq."));
// "Mr. John Doe Esq."

console.log(person.fullName.call(jane, "Ms.", "PhD"));
// "Ms. Jane Smith PhD"

// 2. apply() - Same as call but takes arguments as array
console.log(person.fullName.apply(john, ["Mr.", "Esq."]));
// "Mr. John Doe Esq."

// Use case: Spreading arguments
const numbers = [5, 6, 2, 3, 7];
const max = Math.max.apply(null, numbers); // Spread array to function
console.log(max); // 7

// 3. bind() - Returns new function with bound 'this' (doesn't call immediately)
const johnGreet = person.fullName.bind(john, "Mr.");
console.log(johnGreet("Esq.")); // "Mr. John Doe Esq." (call later)

const janeGreet = person.fullName.bind(jane, "Ms.");
console.log(janeGreet("PhD")); // "Ms. Jane Smith PhD"

// Practical examples

// use case 1: Borrowing methods
const character = {
  name: "Character",
  health: 100,
  takeDamage: function(damage) {
    this.health -= damage;
    return this.health;
  }
};

const player = { name: "Player", health: 50 };

console.log(character.takeDamage.call(player, 20)); // 30

// Use case 2: Function methods
function greet(greeting, punctuation) {
  console.log(greeting + ", " + this.name + punctuation);
}

const boundGreet = greet.bind({ name: "Alice" }, "Hello");
boundGreet("!"); // "Hello, Alice!"

// Use case 3: Event handlers with class methods
class Button {
  constructor() {
    this.clicks = 0;
  }
  
  onClick() {
    this.clicks++;
    console.log(`Clicks: ${this.clicks}`);
  }
}

const button = new Button();
// Without bind, 'this' would be the button element
const handler = button.onClick.bind(button);
// element.addEventListener("click", handler);

// Comparison table
console.log("call:  Immediate execution, args as list");
console.log("apply: Immediate execution, args as array");
console.log("bind:  Returns function, doesn't execute immediately");
```

---

### What is the difference between exec() and test() methods in JavaScript?

These are RegExp methods for pattern matching.

```javascript
// test() - Returns boolean, no memory between calls
const regex = /hello/i; // Case-insensitive

console.log(regex.test("Hello World")); // true
console.log(regex.test("Goodbye"));     // false
console.log(regex.test("hello"));       // true

// exec() - Returns array with match details or null
const result = regex.exec("Hello World");
console.log(result);
// [
//   "Hello",      // [0] - matched string
//   index: 0,     // position in string
//   input: "Hello World", // original string
//   groups: undefined
// ]

const noMatch = regex.exec("Goodbye");
console.log(noMatch); // null

// Key difference: Global flag (g)
const globalRegex = /hello/gi; // Global + Case-insensitive

// test() with global flag
console.log(globalRegex.test("hello")); // true
console.log(globalRegex.test("hello")); // false (maintains lastIndex)
console.log(globalRegex.test("hello")); // true (lastIndex reset)

// exec() with global flag
const matches = [];
let match;
const pattern = /\d+/g; // Find all numbers

while ((match = pattern.exec("I have 2 apples and 5 oranges")) !== null) {
  matches.push(match[0]);
}
console.log(matches); // ["2", "5"]

// String methods alternative
const string = "Hello World";

// String.match() - Similar to exec()
console.log(string.match(/hello/i)); // ["Hello"]
console.log(string.match(/hello/gi)); // ["Hello"]

// String.search() - Similar to test()
console.log(string.search(/hello/i)); // 0 (index of match)
console.log(string.search(/hello/)); // -1 (no match)

// String.includes() - Simple true/false
console.log(string.includes("Hello")); // true
console.log(string.includes("hello")); // false (case-sensitive)
```

---

### What is currying in JavaScript?

Currying transforms a function with multiple parameters into a sequence of functions with one parameter each.

```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}
console.log(add(1, 2, 3)); // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
console.log(curriedAdd(1)(2)(3)); // 6

// With arrow functions (more concise)
const curriedArrow = a => b => c => a + b + c;
console.log(curriedArrow(1)(2)(3)); // 6

// Practical use: Partial application
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);
console.log(addOneAndTwo(3)); // 6

// Real-world example: Logger
const log = (level) => (context) => (message) => {
  console.log(`[${level}] [${context}] ${message}`);
};

const error = log("ERROR");
const errorDB = error("DATABASE");
errorDB("Connection failed"); // [ERROR] [DATABASE] Connection failed

const warn = log("WARN");
const warnAPI = warn("API");
warnAPI("Slow response"); // [WARN] [API] Slow response

// Generic curry function
function curry(fn) {
  const arity = fn.length; // Number of parameters
  
  return function curried(...args) {
    if (args.length >= arity) {
      return fn.apply(null, args);
    } else {
      return (...nextArgs) => curried(...args, ...nextArgs);
    }
  };
}

const multiply = (a, b, c) => a * b * c;
const curriedMultiply = curry(multiply);

console.log(curriedMultiply(2)(3)(4)); // 24
console.log(curriedMultiply(2, 3)(4)); // 24
console.log(curriedMultiply(2)(3, 4)); // 24

// Benefits:
// 1. Function reusability
// 2. Partial application
// 3. Composability
// 4. Function specialization
```

---

### What is the rest parameter and spread operator?

```javascript
// Rest Parameter (...) - Collects arguments into an array
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
console.log(sum(10, 20)); // 30

// Rest with other parameters
function introduce(title, ...hobbies) {
  console.log(`Title: ${title}`);
  console.log(`Hobbies: ${hobbies.join(", ")}`);
}
introduce("Developer", "coding", "gaming", "reading");
// Title: Developer
// Hobbies: coding, gaming, reading

// Rest in destructuring
const [first, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(rest);  // [2, 3, 4, 5]

const { name, ...others } = { name: "John", age: 30, city: "NYC" };
console.log(name);   // "John"
console.log(others); // { age: 30, city: "NYC" }

// Spread Operator (...) - Spreads array/object elements
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Spread in array
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Spread in function calls
function add(a, b, c) {
  return a + b + c;
}
const numbers = [1, 2, 3];
console.log(add(...numbers)); // 6

// Spread in objects
const obj1 = { name: "John", age: 30 };
const obj2 = { city: "NYC", country: "USA" };

const mergedObj = { ...obj1, ...obj2 };
console.log(mergedObj);
// { name: "John", age: 30, city: "NYC", country: "USA" }

// Shallow copy
const original = { a: 1, b: 2 };
const copy = { ...original };
copy.a = 10;
console.log(original.a); // 1 (unchanged)

// Shallow copy of array
const originalArr = [1, 2, 3];
const copiedArr = [...originalArr];
copiedArr[0] = 10;
console.log(originalArr[0]); // 1 (unchanged)

// Rest vs Spread - Key difference
// Rest: Collects arguments
// Spread: Spreads elements

function restExample(...args) {
  console.log(args); // Array
}
restExample(1, 2, 3); // [1, 2, 3]

function spreadExample() {
  const arr = [1, 2, 3];
  console.log(...arr); // 1 2 3 (spread)
}
```

---

### What is Implicit Type Coercion in JavaScript?

JavaScript automatically converts types in certain operations.

```javascript
// String + Number
console.log("5" + 3);      // "53" (converts number to string)
console.log("5" - 3);      // 2 (converts string to number)
console.log("5" * "2");    // 10 (converts both to numbers)
console.log("10" / "2");   // 5

// Comparison operators
console.log("5" == 5);     // true (loose equality, coerces type)
console.log("5" === 5);    // false (strict equality, no coercion)
console.log(true == 1);    // true
console.log(false == 0);   // true

// Boolean coercion (Truthy/Falsy values)
console.log(Boolean("hello"));     // true
console.log(Boolean(""));          // false
console.log(Boolean(0));           // false
console.log(Boolean(1));           // true
console.log(Boolean(null));        // false
console.log(Boolean(undefined));   // false
console.log(Boolean([]));          // true (arrays are truthy)
console.log(Boolean({}));          // true (objects are truthy)

// Logical operators with coercion
console.log(5 && "hello");     // "hello" (returns last truthy value)
console.log(0 && "hello");     // 0 (returns first falsy value)
console.log(5 || "hello");     // 5 (returns first truthy value)
console.log(0 || "hello");     // "hello" (returns first truthy value)

// Nullish coalescing (only null/undefined, not falsy values)
console.log(null ?? "default"); // "default"
console.log(0 ?? "default");    // 0 (0 is not nullish)
console.log("" ?? "default");   // "" (empty string is not nullish)

// Problems with implicit coercion
console.log([] + []);           // "" (both convert to strings)
console.log([] + {});           // "[object Object]"
console.log({} + []);           // "[object Object]"
console.log(1 + "2" + 3);       // "123" (string concatenation)
console.log(1 + 2 + "3");       // "33" (number addition, then string concat)

// Best practices
// 1. Use strict equality (===)
if (value === 5) { }

// 2. Explicit type conversion
const num = Number("5");    // 5
const str = String(5);      // "5"
const bool = Boolean(1);    // true

// 3. Use Number(), String(), Boolean() constructors
const parsed = parseInt("5", 10); // 5
const floated = parseFloat("3.14"); // 3.14
```

---

### Is JavaScript a statically typed or a dynamically typed language?

JavaScript is **dynamically typed**.

```javascript
// Variables can change types
let value = 5;
console.log(typeof value);    // "number"

value = "hello";
console.log(typeof value);    // "string"

value = true;
console.log(typeof value);    // "boolean"

value = { name: "John" };
console.log(typeof value);    // "object"

// Type checking happens at runtime
function process(input) {
  if (typeof input === "number") {
    return input * 2;
  } else if (typeof input === "string") {
    return input.toUpperCase();
  }
}

console.log(process(5));        // 10
console.log(process("hello"));  // "HELLO"

// TypeScript - Adds static typing (compiles to JavaScript)
// const value: number = 5;
// value = "hello"; // Error at compile time

// Dynamic typing advantages:
// - Flexible and less verbose
// - Quick prototyping
// - Less code overhead

// Dynamic typing disadvantages:
// - More runtime errors
// - Harder to maintain large codebases
// - IDE can't catch type errors early

// Best practice: Use TypeScript for large projects
// or add JSDoc for type hints

/**
 * @param {number} x
 * @param {number} y
 * @returns {number}
 */
function add(x, y) {
  return x + y;
}
```

---

### What is the NaN property in JavaScript?

NaN stands for "Not-a-Number" and represents an undefined or unrepresentable numerical result.

```javascript
// Creating NaN
console.log(NaN);                    // NaN
console.log(0 / 0);                  // NaN
console.log(Math.sqrt(-1));          // NaN
console.log(parseInt("hello"));      // NaN
console.log(Number("hello"));        // NaN

// NaN is of type "number"
console.log(typeof NaN);             // "number" (quirky!)

// Checking for NaN
const result = 0 / 0;

// WRONG - NaN is not equal to NaN
console.log(result == NaN);          // false
console.log(result === NaN);         // false

// CORRECT ways to check for NaN
console.log(Number.isNaN(result));   // true
console.log(isNaN(result));          // true (less strict)
console.log(Object.is(result, NaN)); // true

// Key difference: isNaN vs Number.isNaN
console.log(isNaN("hello"));         // true (converts to NaN first)
console.log(Number.isNaN("hello"));  // false (strict check)

// Operations that return NaN
console.log("text" * 2);            // NaN
console.log(undefined + 5);         // NaN
console.log(Math.log(-1));          // NaN

// Best practice: Use Number.isNaN()
function safeOperation(value) {
  if (Number.isNaN(value)) {
    console.log("Result is NaN");
  } else {
    console.log("Result is:", value);
  }
}

safeOperation(NaN);        // "Result is NaN"
safeOperation(42);         // "Result is: 42"
```

---

### Explain passed by value and passed by reference.

```javascript
// Passed by Value - Primitives (numbers, strings, booleans, etc.)
let a = 5;
let b = a;  // Copy the value

b = 10;

console.log(a); // 5 (unchanged)
console.log(b); // 10

// In functions:
function modifyValue(num) {
  num = 100;
}

let value = 5;
modifyValue(value);
console.log(value); // 5 (unchanged)

// Passed by Reference - Objects and Arrays
let obj1 = { name: "John" };
let obj2 = obj1;  // Copy the reference (not the object)

obj2.name = "Jane";

console.log(obj1.name); // "Jane" (changed)
console.log(obj2.name); // "Jane"
console.log(obj1 === obj2); // true (same reference)

// In functions:
function modifyObject(obj) {
  obj.name = "Modified";
}

let person = { name: "John" };
modifyObject(person);
console.log(person.name); // "Modified" (changed)

// Arrays (also passed by reference)
function addToArray(arr) {
  arr.push(4);
}

let numbers = [1, 2, 3];
addToArray(numbers);
console.log(numbers); // [1, 2, 3, 4] (changed)

// But reassignment doesn't affect original
function reassignArray(arr) {
  arr = [10, 20, 30]; // Creates new array
}

let nums = [1, 2, 3];
reassignArray(nums);
console.log(nums); // [1, 2, 3] (unchanged - reassignment inside function)

// Visual explanation:
// Passed by value:
let x = 5;
let y = x;  // y gets a copy of 5
// x: 5    y: 5

// Passed by reference:
let obj = { id: 1 };
let ref = obj;  // ref points to same object as obj
// obj ----\
//          \----> { id: 1 }
// ref ----/

// Modifying properties affects both
ref.id = 2;
console.log(obj.id); // 2
```

---

### Is JavaScript a pass-by-reference or pass-by-value language?

JavaScript is **pass-by-value**, but the values for objects are references.

```javascript
// For primitives: pass-by-value
function changePrimitive(x) {
  x = 100;
}

let num = 5;
changePrimitive(num);
console.log(num); // 5 (unchanged)

// For objects: pass-by-value of the reference
function changeObject(obj) {
  obj.value = 100;  // Modifies the object the reference points to
}

let myObj = { value: 5 };
changeObject(myObj);
console.log(myObj.value); // 100 (changed)

// But reassignment doesn't affect original
function reassignObject(obj) {
  obj = { value: 100 }; // Creates new object, doesn't affect original reference
}

let myObj2 = { value: 5 };
reassignObject(myObj2);
console.log(myObj2.value); // 5 (unchanged)

// Key insight: What's passed is always a value
// - For primitives: the value itself
// - For objects: the reference (which is a value pointing to an object)

// Example demonstrating this:
const obj = { id: 1 };

function test(reference) {
  // This creates a new reference, doesn't affect original
  reference = { id: 2 };
}

test(obj);
console.log(obj.id); // 1 (obj still points to original object)

// To modify the object itself:
function test2(reference) {
  reference.id = 2; // Modifies the object the reference points to
}

test2(obj);
console.log(obj.id); // 2 (now changed)
```

---

### What do you mean by strict mode in JavaScript?

Strict mode enforces stricter parsing and error handling.

```javascript
// Enable strict mode
"use strict";

// Strict mode rules:

// 1. Variables must be declared
function test1() {
  x = 5; // Error: x is not defined (in strict mode)
  let x = 5; // Correct
}

// 2. Cannot delete variables
let y = 5;
// delete y; // Error: Cannot delete variable in strict mode

// 3. Parameter names must be unique
// function test2(a, a, b) {} // Error in strict mode

// 4. Octal syntax forbidden
// let octal = 010; // Error

// 5. eval() doesn't create variables in current scope
eval("var z = 10");
// console.log(z); // Error in strict mode

// 6. arguments object doesn't track parameter changes
function test3(x) {
  x = 5;
  console.log(arguments[0]); // 5 in non-strict, undefined in strict
}

// 7. this is undefined in functions
function strictFunc() {
  console.log(this); // undefined in strict mode
}
strictFunc();

// vs non-strict where this would be global object

// 8. Eval has its own scope
"use strict";
eval("var localVar = 5");
// console.log(localVar); // Error

// Function-level strict mode
function test4() {
  "use strict";
  // Only this function is in strict mode
}

// Module strict mode (in ES6 modules)
// Entire module is in strict mode by default

// Enable strict mode in files
// Add "use strict"; at the very top

// Best practice: Always use strict mode
"use strict";

class Car {
  constructor(model) {
    this.model = model;
  }
  
  getModel() {
    console.log(this.model);
  }
}

const car = new Car("Tesla");
car.getModel(); // "Tesla"
```

---

### What are some advantages of using External JavaScript?

```javascript
// External JavaScript file (advantages):

// 1. Separation of Concerns
// - HTML: structure
// - CSS: styling
// - JavaScript: behavior

// 2. Caching
// - Browsers cache external files
// - Reduces bandwidth on repeat visits

// 3. Code Reusability
// - Same script file used across multiple pages

// 4. Easier Maintenance
// - Update JavaScript in one place
// - All pages using it get the update

// 5. Improved Performance
// - Reduces HTML file size
// - Parallel downloads of CSS and JS

// 6. Minification and Compression
// - Can be minified to reduce file size
// - Gzipped for faster transfer

// 7. IDE Support
// - Better syntax highlighting
// - Code completion
// - Debugging tools

// 8. Version Control
// - Better tracking of changes
// - Easier collaboration

// 9. Security
// - Code not visible in HTML source
// - Can be hosted on CDN with CORS

// 10. Loading Options
// - Async loading
// - Deferred loading
// - Module bundling (Webpack, Vite, etc.)

// HTML Example:
/*
<!-- External JavaScript with async -->
<script src="path/to/script.js" async></script>

<!-- External JavaScript with defer -->
<script src="path/to/script.js" defer></script>

<!-- External JavaScript blocking -->
<script src="path/to/script.js"></script>
*/

// Best practices
console.log("Keep production code in external files");
console.log("Minify and bundle for production");
console.log("Use CDN for popular libraries");
```

---

## DOM Manipulation

### What is the DOM (Document Object Model)?

The DOM is a programming interface representing the HTML structure of a webpage as a tree of objects.

```javascript
// The DOM represents HTML as a tree:
/*
Document
├── html
│   ├── head
│   │   └── title
│   └── body
│       ├── h1
│       ├── p
│       └── div
│           └── button
*/

// Accessing DOM elements
const title = document.title;               // "Page Title"
const body = document.body;                 // Body element
const root = document.documentElement;      // HTML element

// DOM is dynamic - changes reflect in the browser
const div = document.createElement("div");
div.textContent = "Hello";
document.body.appendChild(div);  // Adds to page

// Removing from DOM
div.remove();  // Removes from page

// DOM events
const button = document.querySelector("button");
button?.addEventListener("click", () => {
  console.log("Button clicked!");
});

// DOM traversal
const element = document.querySelector(".container");
const parent = element?.parentElement;       // Parent
const children = element?.children;          // Child nodes
const nextElement = element?.nextElementSibling; // Next sibling

// DOM manipulation
element.className = "new-class";             // Change class
element.id = "new-id";                       // Change id
element.setAttribute("data-value", "123");   // Custom attribute
element.style.color = "red";                 // Inline style

// DOM queries
document.getElementById("id");               // By ID
document.querySelector(".class");            // By selector
document.querySelectorAll("p");              // All elements
document.getElementsByClassName("class");    // By class name
document.getElementsByTagName("div");        // By tag name
```

---

### How do you select elements in the DOM using JavaScript?

```javascript
// 1. getElementById() - Select by ID
const header = document.getElementById("header");
console.log(header); // <div id="header">...</div>

// 2. querySelector() - Select by CSS selector
const firstDiv = document.querySelector("div");           // First div
const withClass = document.querySelector(".container");   // First with class
const withId = document.querySelector("#main");           // Element with id
const complex = document.querySelector("div.card > h2");  // Complex selector

// 3. querySelectorAll() - Select all matching elements
const allDivs = document.querySelectorAll("div");         // NodeList
const allCards = document.querySelectorAll(".card");      // All with class

// Convert NodeList to Array (if needed)
const divsArray = Array.from(allDivs);
// or
const divsArray2 = [...allDivs];

// 4. getElementsByClassName() - Select by class name
const cards = document.getElementsByClassName("card");    // HTMLCollection
console.log(cards[0]); // First element

// 5. getElementsByTagName() - Select by tag
const buttons = document.getElementsByTagName("button");  // HTMLCollection
console.log(buttons.length);

// 6. querySelector variations
const article = document.querySelector("article");
const firstParagraph = article?.querySelector("p");      // Within article
const allLinks = article?.querySelectorAll("a");         // All links in article

// Useful selectors
const element1 = document.querySelector("[data-id='123']");    // Attribute
const element2 = document.querySelector("div:nth-child(2)");   // Nth child
const element3 = document.querySelector(".class1.class2");     // Multiple classes
const element4 = document.querySelector("#id > .class");       // Child combinator

// Performance comparison:
// Fastest to slowest:
// 1. getElementById (fastest - optimized)
// 2. getElementsByClassName / getElementsByTagName (fast)
// 3. querySelector / querySelectorAll (slower - must parse selector)

// Best practices
// Use querySelector for most cases (more flexible)
// Use getElementById only if you need absolute best performance
// Cache selected elements if using multiple times

const container = document.querySelector(".container");
const cards = container.querySelectorAll(".card");       // Cached
const title = container.querySelector("h1");             // Cached
```

---

### What is the difference between innerHTML and innerText?

```javascript
// HTML: <div id="example">
//   <p>Hello <strong>World</strong></p>
// </div>

const div = document.getElementById("example");

// innerHTML - Sets/Gets HTML content
console.log(div.innerHTML);
// "<p>Hello <strong>World</strong></p>"

div.innerHTML = "<p>New <em>content</em></p>";
// Changes the HTML structure

// innerText - Sets/Gets plain text content
console.log(div.innerText);
// "Hello World" (text only, no tags)

div.innerText = "Just text";
// Sets text, escapes HTML tags

// Differences:

// 1. HTML parsing
const example = document.createElement("div");

example.innerHTML = "<p>Paragraph</p>";  // Creates actual p element
example.innerText = "<p>Paragraph</p>";  // Text content: "<p>Paragraph</p>"

// 2. Security (innerHTML vulnerability)
// Dangerous: If userInput contains script tags
const userInput = "<img src=x onerror='alert(\"XSS\")'>";
// div.innerHTML = userInput; // Dangerous! Script could run

// Safe: Use innerText or textContent
div.innerText = userInput; // Safe - treats as plain text

// 3. Performance
// innerText is slower (must consider CSS)
// innerHTML is faster (just replaces)

// 4. CSS visibility
const hidden = document.createElement("div");
hidden.innerHTML = "Visible";
hidden.style.display = "none";
console.log(hidden.innerText); // "" (empty - element not visible)
console.log(hidden.innerHTML);  // "Visible" (has content)

// textContent - Alternative to innerText
const div2 = document.createElement("div");
div2.innerHTML = "<p>Content</p>";

console.log(div2.textContent); // "Content" (same as innerText)
console.log(div2.innerText);   // "Content"

// Difference: textContent doesn't care about CSS
const hidden2 = document.createElement("div");
hidden2.innerHTML = "Text";
hidden2.style.display = "none";
console.log(hidden2.textContent);  // "Text" (ignores display)
console.log(hidden2.innerText);    // "" (considers CSS)

// Best practices:
// - Use textContent for plain text (faster, safer)
// - Use innerHTML only when you need HTML parsing
// - Always sanitize user input before using innerHTML
// - Use a library like DOMPurify for safe HTML insertion

// Safe HTML insertion example
function safeInsertHTML(element, html) {
  // Never trust user input directly
  const temp = document.createElement("div");
  temp.textContent = html; // Escapes HTML
  return temp.innerHTML;
}
```

---

### What is event bubbling and event capturing?

Event propagation has three phases: capturing, target, and bubbling.

```javascript
// HTML:
// <div class="parent">
//   <div class="child">
//     <button>Click me</button>
//   </div>
// </div>

const parent = document.querySelector(".parent");
const child = document.querySelector(".child");
const button = document.querySelector("button");

// Phase 1: Capturing Phase (top-down)
// Phase 2: Target Phase (event target)
// Phase 3: Bubbling Phase (bottom-up) - DEFAULT

// Event Bubbling (default) - Event bubbles up the DOM tree
button.addEventListener("click", () => {
  console.log("Button clicked"); // Fires first
});

child.addEventListener("click", () => {
  console.log("Child clicked"); // Fires second (bubbles up)
});

parent.addEventListener("click", () => {
  console.log("Parent clicked"); // Fires third (bubbles up)
});

// Output when button is clicked:
// "Button clicked"
// "Child clicked"
// "Parent clicked"

// Event Capturing (setting third parameter to true)
// Event travels down the DOM tree
button.addEventListener("click", () => {
  console.log("Button (capturing)");
}, true); // true = capturing phase

child.addEventListener("click", () => {
  console.log("Child (capturing)");
}, true);

parent.addEventListener("click", () => {
  console.log("Parent (capturing)"); // Fires first
}, true);

// Output when button is clicked:
// "Parent (capturing)"
// "Child (capturing)"
// "Button (capturing)"

// Stopping propagation
button.addEventListener("click", (event) => {
  console.log("Button clicked");
  event.stopPropagation(); // Prevents bubbling to parent
});

child.addEventListener("click", () => {
  console.log("Child clicked"); // Won't fire
});

// Stopping immediate propagation
button.addEventListener("click", (event) => {
  console.log("First listener");
  event.stopImmediatePropagation(); // Prevents other listeners on same element
});

button.addEventListener("click", () => {
  console.log("Second listener"); // Won't fire
});

// Event delegation (using bubbling)
const list = document.querySelector("ul");
list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log("Item clicked:", event.target.textContent);
  }
});

// Adding items dynamically (still works with delegation)
const newItem = document.createElement("li");
newItem.textContent = "New item";
list.appendChild(newItem);
// Click event still works because of bubbling
```

---

### What is the difference between addEventListener and onclick?

```javascript
// HTML: <button id="btn">Click me</button>

const button = document.getElementById("btn");

// Method 1: onclick property
button.onclick = function() {
  console.log("Clicked via onclick");
};

// Method 2: addEventListener
button.addEventListener("click", function() {
  console.log("Clicked via addEventListener");
});

// Differences:

// 1. Multiple listeners
// onclick - Only one handler per event
button.onclick = () => console.log("First");
button.onclick = () => console.log("Second"); // Overwrites first
// Output: "Second" (only one handler)

// addEventListener - Multiple handlers possible
button.addEventListener("click", () => console.log("First"));
button.addEventListener("click", () => console.log("Second"));
// Output: "First" then "Second"

// 2. Inline HTML
// onclick - Can be set in HTML
// <button onclick="handleClick()">Click</button>

// addEventListener - Not possible in HTML (requires JavaScript)
// <button id="btn">Click</button>
// button.addEventListener("click", handleClick);

// 3. Removing listeners
// onclick
button.onclick = null; // Remove easily

// addEventListener - Need to store reference
function clickHandler() {
  console.log("Clicked");
}
button.addEventListener("click", clickHandler);
button.removeEventListener("click", clickHandler); // Must use exact function reference

// 4. Capturing and bubbling control
// onclick - No control (always bubbling phase)
button.onclick = () => console.log("Default: bubbling");

// addEventListener - Can control with third parameter
button.addEventListener("click", () => {
  console.log("Capturing");
}, true); // Capturing phase

button.addEventListener("click", () => {
  console.log("Bubbling");
}, false); // Bubbling phase (default)

// 5. Event parameter
// onclick - Limited access to event
button.onclick = function(event) {
  console.log(event.type); // "click"
};

// addEventListener - Full event access
button.addEventListener("click", (event) => {
  console.log(event.type);        // "click"
  console.log(event.target);      // button element
  console.log(event.preventDefault); // method
});

// 6. Performance
// onclick - Slightly faster (no event listener management)
// addEventListener - Slightly slower (manages listeners list)

// Best practices:
// - Use addEventListener for modern code
// - Avoid inline onclick handlers
// - addEventListener allows multiple listeners and better control

// Example: Remove event listener
function handleClick(event) {
  console.log("Clicked");
  event.target.removeEventListener("click", handleClick);
}

button.addEventListener("click", handleClick);
// First click works, subsequent clicks don't
```

---

### What is the distinction between client-side and server-side JavaScript?

```javascript
// Client-side JavaScript (Browser)
// ================================

// 1. DOM Manipulation
const div = document.createElement("div");
div.textContent = "Hello";
document.body.appendChild(div);

// 2. Event Handling
document.addEventListener("click", () => {
  console.log("User clicked");
});

// 3. Browser APIs
// Geolocation
navigator.geolocation.getCurrentPosition(position => {
  console.log(position.coords.latitude);
});

// LocalStorage
localStorage.setItem("key", "value");
const value = localStorage.getItem("key");

// Fetch API
fetch("/api/data")
  .then(response => response.json())
  .then(data => console.log(data));

// 4. User interaction
window.alert("Alert message");
const input = prompt("Enter name:");
const confirm = confirm("Are you sure?");

// Server-side JavaScript (Node.js)
// ================================

// 1. File System Operations
// const fs = require("fs");
// fs.readFile("file.txt", (err, data) => {
//   console.log(data);
// });

// 2. Database Operations
// const db = require("./database");
// db.query("SELECT * FROM users", (err, results) => {
//   console.log(results);
// });

// 3. HTTP Server
// const http = require("http");
// http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Server response");
// }).listen(3000);

// 4. Environment Variables
// const apiKey = process.env.API_KEY;

// 5. Command Line Arguments
// console.log(process.argv); // Arguments passed to script

// 6. Working with Modules
// const express = require("express");
// const app = express();
// app.get("/", (req, res) => res.send("Hello"));

// Key Differences:

console.log("Client-side:");
console.log("- Access to DOM and Browser APIs");
console.log("- Can run JavaScript without server");
console.log("- Code visible to users (not secure for secrets)");
console.log("- Limited file system access");
console.log("- Depends on browser capabilities");

console.log("Server-side:");
console.log("- Full file system access");
console.log("- Database connectivity");
console.log("- Can handle requests/responses");
console.log("- Code not visible to users");
console.log("- Can access environment variables and secrets");
console.log("- More powerful for computations");

// Modern JavaScript runs in both environments!
// Example: Isomorphic/Universal JavaScript (same code, both sides)
function formatDate(date) {
  return new Date(date).toLocaleDateString();
}

// Client-side usage
const formattedDate = formatDate(new Date());

// Server-side usage (in Node.js)
// const formatted = formatDate(new Date());
```

---

### Describe the difference between a cookie, sessionStorage, and localStorage in browsers.

```javascript
// All three store data on the client-side, but with differences

// 1. COOKIES
// ============
// Created: Client-side (via JavaScript) or Server-side (via Set-Cookie header)
// Expiration: Can be set by developer or expire when browser closes
// Size: ~4KB
// Sent: With every HTTP request (overhead!)
// Scope: Domain and path specific

// Setting a cookie
document.cookie = "name=John; expires=Wed, 09 Jun 2025 10:00:00 UTC; path=/";
document.cookie = "age=30; max-age=86400"; // Expires in 24 hours

// Getting a cookie
console.log(document.cookie); // "name=John; age=30"

// Deleting a cookie
document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 UTC";

// 2. LOCAL STORAGE
// ================
// Created: Client-side only (JavaScript)
// Expiration: Persistent until manually deleted
// Size: ~5-10MB
// Sent: NOT sent with requests
// Scope: Same origin (domain + protocol + port)

// Setting
localStorage.setItem("user", "John");
localStorage.setItem("theme", "dark");

// Getting
console.log(localStorage.getItem("user"));     // "John"
console.log(localStorage.getItem("theme"));    // "dark"

// Checking existence
if (localStorage.getItem("user")) {
  console.log("User is logged in");
}

// Storing objects
const user = { name: "John", age: 30 };
localStorage.setItem("userObj", JSON.stringify(user));
const retrieved = JSON.parse(localStorage.getItem("userObj"));

// Deleting
localStorage.removeItem("theme");
localStorage.clear(); // Delete all

// Iteration
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(key, localStorage.getItem(key));
}

// 3. SESSION STORAGE
// ===================
// Created: Client-side only (JavaScript)
// Expiration: When tab/window closes
// Size: ~5-10MB
// Sent: NOT sent with requests
// Scope: Same tab/window only

// Setting
sessionStorage.setItem("sessionId", "abc123");
sessionStorage.setItem("tempData", JSON.stringify({ value: 42 }));

// Getting
console.log(sessionStorage.getItem("sessionId")); // "abc123"

// Deleting
sessionStorage.removeItem("sessionId");
sessionStorage.clear();

// Comparison Table:
console.log("COMPARISON:");
console.log("Cookies: 4KB, sent with requests, domain-specific");
console.log("LocalStorage: 5-10MB, NOT sent with requests, persistent");
console.log("SessionStorage: 5-10MB, NOT sent with requests, cleared on close");

// Use cases:

// Cookies - Authentication tokens, tracking
document.cookie = "authToken=xyz789; path=/; secure; samesite=strict";

// LocalStorage - User preferences, cached data
localStorage.setItem("preferredLanguage", "en");
localStorage.setItem("cachedUserData", JSON.stringify(userData));

// SessionStorage - Temporary form data, single-tab state
sessionStorage.setItem("formDraft", JSON.stringify(formData));

// Practical example:
class StorageManager {
  static saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  
  static getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
  
  static saveTempData(data) {
    sessionStorage.setItem("tempData", JSON.stringify(data));
  }
  
  static getTempData() {
    const data = sessionStorage.getItem("tempData");
    return data ? JSON.parse(data) : null;
  }
  
  static setAuthCookie(token) {
    document.cookie = `auth=${token}; path=/; secure`;
  }
}
```

---

### Explain event delegation in JavaScript.

Event delegation uses event bubbling to handle events on dynamically added elements.

```javascript
// HTML:
// <ul id="list">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>
// <button id="addItem">Add Item</button>

const list = document.getElementById("list");

// Without event delegation (doesn't work for dynamic elements)
document.querySelectorAll("li").forEach(li => {
  li.addEventListener("click", () => {
    console.log("Clicked:", li.textContent);
  });
});

// If we add a new item, the event listener doesn't exist!
const newItem = document.createElement("li");
newItem.textContent = "Item 4";
list.appendChild(newItem);
// newItem.click() - No event listener!

// With event delegation (works for dynamic elements)
list.addEventListener("click", (event) => {
  if (event.target.tagName === "LI") {
    console.log("Clicked:", event.target.textContent);
  }
});

// Now new items automatically have the click handler!
const anotherItem = document.createElement("li");
anotherItem.textContent = "Item 5";
list.appendChild(anotherItem);
// anotherItem.click() - Works! Event bubbles up to list

// More complex example with class check
list.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (item && item.parentElement === list) {
    console.log("List item clicked:", item.textContent);
    item.classList.add("selected");
  }
});

// Practical example: Todo list
const todoList = document.getElementById("todoList");
const input = document.getElementById("todoInput");
const addButton = document.getElementById("addButton");

// Single listener for all todo items
todoList.addEventListener("click", (event) => {
  const todo = event.target.closest("[data-todo-id]");
  
  if (!todo) return;
  
  if (event.target.classList.contains("delete-btn")) {
    // Handle delete
    const id = todo.dataset.todoId;
    todo.remove();
    console.log("Deleted:", id);
  } else if (event.target.classList.contains("complete-btn")) {
    // Handle complete
    todo.classList.toggle("completed");
    console.log("Toggled:", todo.textContent);
  }
});

// Event delegation with multiple element types
document.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  const link = event.target.closest("a[data-link]");
  const input = event.target.closest("input[type='checkbox']");
  
  if (button) {
    const action = button.dataset.action;
    console.log("Button action:", action);
  }
  
  if (link) {
    const href = link.dataset.link;
    console.log("Link:", href);
  }
  
  if (input) {
    console.log("Checkbox:", input.checked);
  }
});

// Benefits of event delegation:
console.log("1. Single listener instead of many");
console.log("2. Works for dynamically added elements");
console.log("3. Better performance");
console.log("4. Cleaner code");

// Performance comparison:
// Without delegation: 1000 items = 1000 listeners
// With delegation: 1000 items = 1 listener
```

---

### What is the difference between mouseenter and mouseover events in JavaScript?

```javascript
// HTML:
// <div class="outer">
//   <div class="inner"></div>
// </div>

const outer = document.querySelector(".outer");
const inner = document.querySelector(".inner");

// MOUSEOVER - BUBBLES and AFFECTED by child elements
console.log("=== MOUSEOVER (bubbles) ===");

outer.addEventListener("mouseover", (event) => {
  console.log("Outer mouseover");
  console.log("Target:", event.target.className); // Shows which element triggered it
  console.log("Current:", event.currentTarget.className);
});

inner.addEventListener("mouseover", (event) => {
  console.log("Inner mouseover");
});

// When you hover from outer to inner:
// "Outer mouseover" (triggered by inner, bubbles)
// "Inner mouseover"

// MOUSEENTER - Does NOT bubble and ONLY fires on the element itself
console.log("=== MOUSEENTER (doesn't bubble) ===");

outer.addEventListener("mouseenter", (event) => {
  console.log("Outer mouseenter"); // Only fires when entering outer
});

inner.addEventListener("mouseenter", (event) => {
  console.log("Inner mouseenter"); // Only fires when entering inner
});

// When you hover from outer to inner:
// Only "Inner mouseenter" fires (no bubble)

// Key differences:

console.log("Mouseover: Bubbles, re-fires when entering child elements");
console.log("Mouseenter: Doesn't bubble, fires only once");

// Performance example:
// Inefficient with mouseover (fires multiple times)
outer.addEventListener("mouseover", () => {
  console.log("Check hover status"); // Fires repeatedly!
});

// Better with mouseenter (fires once)
outer.addEventListener("mouseenter", () => {
  console.log("User entered"); // Fires once per entry
});

// Matching pair: mouseleave (opposite of mouseenter)
outer.addEventListener("mouseleave", () => {
  console.log("User left outer");
});

// Matching pair: mouseout (opposite of mouseover)
outer.addEventListener("mouseout", () => {
  console.log("User left outer or child"); // Could be inner element
});

// Practical example: Tooltip
const tooltip = document.querySelector(".tooltip");
const trigger = document.querySelector(".trigger");

// Using mouseenter/mouseleave (better for tooltips)
trigger.addEventListener("mouseenter", () => {
  tooltip.style.display = "block";
});

trigger.addEventListener("mouseleave", () => {
  tooltip.style.display = "none";
});

// Why mouseenter is better here:
// - Shows tooltip only once
// - Doesn't re-show if mouse hovers over children
// - Cleaner behavior

console.log("Recommendation: Use mouseenter/mouseleave");
console.log("Reason: More predictable, better performance");
```

---

### What is the difference between event.preventDefault() and event.stopPropagation()?

```javascript
// HTML:
// <form id="form">
//   <input type="text" />
//   <button type="submit">Submit</button>
// </form>

const form = document.getElementById("form");
const button = form.querySelector("button");

// 1. preventDefault() - Prevents default browser behavior
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents page reload
  
  console.log("Form submitted"); // Still runs
  // Get form data
  const input = form.querySelector("input");
  console.log("Input value:", input.value);
  
  // Send via AJAX instead
  fetch("/api/submit", {
    method: "POST",
    body: JSON.stringify({ value: input.value })
  });
});

// Without preventDefault(), page would reload

// 2. stopPropagation() - Prevents event bubbling
// HTML:
// <div class="parent">
//   <button class="child">Click</button>
// </div>

const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

parent.addEventListener("click", () => {
  console.log("Parent clicked");
});

child.addEventListener("click", (event) => {
  event.stopPropagation(); // Prevents bubbling to parent
  console.log("Child clicked");
});

// Without stopPropagation():
// "Child clicked" -> "Parent clicked"

// With stopPropagation():
// "Child clicked" (only)

// 3. stopImmediatePropagation() - Stops all listeners on same element + bubbling
const button2 = document.querySelector("button");

button2.addEventListener("click", (event) => {
  console.log("First listener");
  event.stopImmediatePropagation(); // Stops everything
});

button2.addEventListener("click", () => {
  console.log("Second listener"); // Won't run
});

document.addEventListener("click", () => {
  console.log("Document listener"); // Won't run
});

// Example 1: Link with preventDefault
const link = document.querySelector("a");
link.addEventListener("click", (event) => {
  event.preventDefault(); // Prevents navigation
  console.log("Link clicked but not navigated");
});

// Example 2: Checkbox with custom behavior
const checkbox = document.querySelector("input[type='checkbox']");
checkbox.addEventListener("click", (event) => {
  if (!confirm("Are you sure?")) {
    event.preventDefault(); // Prevents check/uncheck
  }
});

// Example 3: Modal with stopPropagation
const modal = document.querySelector(".modal");
const backdrop = document.querySelector(".modal-backdrop");

backdrop.addEventListener("click", () => {
  // Close modal when clicking outside
  modal.style.display = "none";
});

modal.addEventListener("click", (event) => {
  // Don't close when clicking inside modal
  event.stopPropagation();
});

// Common use cases:

console.log("preventDefault() cases:");
console.log("- Form submission (AJAX instead)");
console.log("- Link navigation");
console.log("- Checkbox behavior");
console.log("- Right-click menu");

console.log("stopPropagation() cases:");
console.log("- Modal backdrop clicks");
console.log("- Nested button clicks");
console.log("- Event delegation edge cases");

// Best practices
button.addEventListener("click", (event) => {
  // Only use if you really need to prevent bubbling
  event.stopPropagation();
  
  // preventDefault() is safer to use
  event.preventDefault();
});
```

---

## Functions

### What is a first-class function?

First-class functions can be treated as values.

```javascript
// 1. Assigned to variables
const greet = function() {
  return "Hello";
};

console.log(greet()); // "Hello"

// 2. Passed as arguments
function execute(fn) {
  return fn();
}

console.log(execute(greet)); // "Hello"

// 3. Returned from functions
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}`;
  };
}

const sayHi = createGreeter("Hi");
console.log(sayHi("John")); // "Hi, John"

// 4. Stored in data structures
const functions = [
  () => "First",
  () => "Second",
  function() { return "Third"; }
];

functions.forEach(fn => console.log(fn()));

// 5. Used as return values and callbacks
const calculator = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b
};

function compute(fn, a, b) {
  return fn(a, b);
}

console.log(compute(calculator.add, 5, 3)); // 8

// Benefits:
console.log("First-class functions enable:");
console.log("- Functional programming patterns");
console.log("- Higher-order functions");
console.log("- Closures");
console.log("- Callbacks");
console.log("- Composition");
```

---

### What is a higher-order function?

A higher-order function takes functions as arguments or returns functions.

```javascript
// Type 1: Takes function as argument
function map(array, fn) {
  const result = [];
  for (let item of array) {
    result.push(fn(item));
  }
  return result;
}

const numbers = [1, 2, 3, 4];
const doubled = map(numbers, (n) => n * 2);
console.log(doubled); // [2, 4, 6, 8]

// Type 2: Returns a function
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Common higher-order functions:

// map() - Transform elements
const words = ["hello", "world"];
const upper = words.map(w => w.toUpperCase());
console.log(upper); // ["HELLO", "WORLD"]

// filter() - Select elements
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// reduce() - Aggregate elements
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// sort() - Order elements
const sorted = [3, 1, 2].sort((a, b) => a - b);
console.log(sorted); // [1, 2, 3]

// forEach() - Execute for each
nums.forEach(n => console.log(n * 2));

// Composition using higher-order functions
function compose(...functions) {
  return function(value) {
    return functions.reduceRight((acc, fn) => fn(acc), value);
  };
}

const add5 = (n) => n + 5;
const multiply2 = (n) => n * 2;
const subtract3 = (n) => n - 3;

const composed = compose(subtract3, multiply2, add5);
console.log(composed(10)); // (10 + 5) * 2 - 3 = 27

// Practical example: Request interceptor
function withLogging(fn) {
  return function(...args) {
    console.log("Calling with:", args);
    const result = fn(...args);
    console.log("Result:", result);
    return result;
  };
}

const add = (a, b) => a + b;
const addWithLogging = withLogging(add);
addWithLogging(2, 3); // Logs call and result
```

---

### What is a callback function?

A callback is a function passed to another function to be executed later.

```javascript
// Synchronous callback
function processArray(array, callback) {
  for (let item of array) {
    callback(item);
  }
}

processArray([1, 2, 3], (item) => {
  console.log(item * 2);
});
// 2, 4, 6

// Asynchronous callback
function fetchData(url, callback) {
  setTimeout(() => {
    const data = { id: 1, name: "John" };
    callback(data);
  }, 1000);
}

fetchData("/api/user", (data) => {
  console.log("Data:", data);
});

// Callback with error handling
function readFile(filename, callback) {
  setTimeout(() => {
    if (filename === "valid.txt") {
      callback(null, "File contents");
    } else {
      callback("File not found", null);
    }
  }, 500);
}

readFile("valid.txt", (error, data) => {
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
});

// Callback hell (Pyramid of Doom)
fetchUser((user) => {
  fetchPosts(user.id, (posts) => {
    fetchComments(posts[0].id, (comments) => {
      console.log(comments);
      // Deeply nested
    });
  });
});

// Solution: Use Promises or async/await
async function getData() {
  const user = await fetchUserPromise();
  const posts = await fetchPostsPromise(user.id);
  const comments = await fetchCommentsPromise(posts[0].id);
  console.log(comments);
}

// Common callbacks in JavaScript

// Array methods
[1, 2, 3].forEach((item) => {
  console.log(item); // forEach callback
});

// Event listeners
button.addEventListener("click", () => {
  console.log("Clicked"); // Event callback
});

// setTimeout
setTimeout(() => {
  console.log("Delayed"); // Timer callback
}, 1000);

// fetch API
fetch("/api/data")
  .then((response) => response.json()) // Callback
  .then((data) => console.log(data));  // Callback
```

---

### What is a pure function?

A pure function always returns the same output for the same input and has no side effects.

```javascript
// Pure function - same input = same output
function add(a, b) {
  return a + b;
}

console.log(add(2, 3)); // 5 (always)
console.log(add(2, 3)); // 5 (consistent)

// Impure function - depends on external state
let counter = 0;
function increment() {
  counter++; // Modifies external state (side effect)
  return counter;
}

console.log(increment()); // 1
console.log(increment()); // 2 (different output, same input!)

// Pure function - no side effects
function multiply(a, b) {
  return a * b; // No modifications to external state
}

// Impure function - side effects
let results = [];
function processAndStore(value) {
  results.push(value * 2); // Modifies external array (side effect)
  return results;
}

// Pure function - doesn't modify original
function processArray(array) {
  return array.map(item => item * 2); // Returns new array
}

const original = [1, 2, 3];
const doubled = processArray(original);
console.log(original); // [1, 2, 3] (unchanged)
console.log(doubled);  // [2, 4, 6]

// Examples of side effects (make functions impure)
// 1. Modifying external variables
let globalVar = 0;
function impure1() {
  globalVar = 5; // Side effect
}

// 2. API calls
function impure2() {
  fetch("/api/data"); // Side effect (HTTP request)
}

// 3. DOM manipulation
function impure3() {
  document.body.innerHTML = "Changed"; // Side effect
}

// 4. Logging
function impure4(x) {
  console.log(x); // Side effect (I/O)
  return x;
}

// 5. Random values
function impure5() {
  return Math.random(); // Different output each time
}

// Pure version (if needed)
function pure5(seed) {
  // Deterministic based on seed
  return seed * 1.5;
}

// Benefits of pure functions:
console.log("Pure functions:");
console.log("- Easy to test");
console.log("- Predictable behavior");
console.log("- Cacheable (memoization)");
console.log("- Thread-safe");
console.log("- Easy to debug");

// Testing example
function sum(a, b) {
  return a + b; // Pure
}

// Test is simple
console.assert(sum(2, 3) === 5, "sum(2, 3) should be 5");
console.assert(sum(-1, 1) === 0, "sum(-1, 1) should be 0");
```

---

### What is a decorator in JavaScript?

A decorator is a function that modifies or extends another function or class.

```javascript
// Function decorator
function withTiming(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(`Execution time: ${end - start}ms`);
    return result;
  };
}

function slowFunction(n) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
}

const timedFunction = withTiming(slowFunction);
timedFunction(1000000); // Logs execution time

// Class method decorator (ES6 proposal syntax)
// @deprecated
// class MyClass {
//   myMethod() {}
// }

// Implemented as function:
function deprecated(fn) {
  return function(...args) {
    console.warn(`This function is deprecated`);
    return fn(...args);
  };
}

// Usage
const oldFunction = deprecated(() => "result");
oldFunction(); // Warns before executing

// Caching decorator (Memoization)
function withCache(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log("From cache");
      return cache.get(key);
    }
    
    console.log("Computing");
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const cachedFib = withCache(fibonacci);
console.log(cachedFib(10)); // Computing
console.log(cachedFib(10)); // From cache

// Logging decorator
function withLogging(fn) {
  return function(...args) {
    console.log(`Called with: ${JSON.stringify(args)}`);
    const result = fn(...args);
    console.log(`Returned: ${JSON.stringify(result)}`);
    return result;
  };
}

const add = (a, b) => a + b;
const loggedAdd = withLogging(add);
loggedAdd(2, 3);
// Called with: [2,3]
// Returned: 5

// Validation decorator
function withValidation(fn) {
  return function(...args) {
    if (args.some(arg => arg === null || arg === undefined)) {
      throw new Error("Arguments cannot be null or undefined");
    }
    return fn(...args);
  };
}

const divide = (a, b) => {
  if (b === 0) throw new Error("Division by zero");
  return a / b;
};

const safeDiv = withValidation(divide);
safeDiv(10, 2); // Works
// safeDiv(10, null); // Error: Arguments cannot be null

// Chaining decorators
function withError(fn) {
  return function(...args) {
    try {
      return fn(...args);
    } catch (e) {
      console.error("Error:", e.message);
    }
  };
}

const enhanced = withError(withValidation(divide));
enhanced(10, null); // Error: Arguments cannot be null
enhanced(10, 0);    // Error: Division by zero
```

---

### What is the Temporal Dead Zone?

The Temporal Dead Zone (TDZ) is the time between variable declaration and initialization where the variable cannot be accessed.

```javascript
// TDZ Example
console.log(typeof x); // ReferenceError: Cannot access 'x' before initialization
// ^^^ The TDZ for 'x' starts here
let x = 5;
// TDZ ends here ^^^

console.log(x); // 5

// TDZ only affects let and const (not var)
console.log(typeof y); // "undefined" (hoisted and initialized)
var y = 5;

// TDZ in block scope
{
  // TDZ starts for z
  console.log(z); // ReferenceError
  let z = 10;
  // TDZ ends here
}

// TDZ in function parameters
function test(x = y, y = 5) {
  // x = y tries to access y, but y is still in TDZ
}
// test(); // ReferenceError

// Real-world TDZ issue
const arr = [1, 2, 3];

function process(array = arr, length = array.length) {
  // 'arr' is accessible (declared in outer scope)
  return array.slice(0, length);
}

process(); // Works

// Incorrect example
function incorrectExample(x = y, y = 2) {
  // 'y' is in TDZ when 'x = y' is evaluated
}
// incorrectExample(); // ReferenceError: Cannot access 'y' before initialization

// Why TDZ exists?
console.log("TDZ prevents errors from using variables before declaration");
console.log("With var, you got undefined (confusing)");
console.log("With let/const, you get ReferenceError (clear error)");

// Before TDZ (bad):
function oldWay() {
  console.log(x); // undefined (confusing!)
  var x = 5;
}

// With TDZ (good):
function newWay() {
  // console.log(y); // ReferenceError (clear!)
  let y = 5;
}

// Debugging TDZ
function debugTDZ() {
  try {
    console.log(value); // TDZ
  } catch (e) {
    console.log("Caught:", e.message);
    // Caught: Cannot access 'value' before initialization
  }
  let value = 10;
}

debugTDZ();
```

---

## Arrays and Objects

### What is the purpose of the Array.prototype.slice method?

`slice()` returns a shallow copy of a portion of an array without modifying the original.

```javascript
// Syntax: array.slice(start, end)
// Returns new array with elements from start to end (end not included)

const original = [1, 2, 3, 4, 5];

// Copy entire array
const copy = original.slice();
console.log(copy); // [1, 2, 3, 4, 5]
console.log(copy === original); // false (different array)

// Extract portion
const slice1 = original.slice(1, 4);
console.log(slice1); // [2, 3, 4]

// Using negative indices (count from end)
const slice2 = original.slice(-3);
console.log(slice2); // [3, 4, 5]

const slice3 = original.slice(-4, -1);
console.log(slice3); // [2, 3, 4]

// Practical uses:

// 1. Create shallow copy
const arr = [1, 2, 3];
const copy = arr.slice();
copy[0] = 10;
console.log(arr); // [1, 2, 3] (unchanged)

// 2. Get first N elements
const first3 = original.slice(0, 3);
console.log(first3); // [1, 2, 3]

// 3. Get last N elements
const last2 = original.slice(-2);
console.log(last2); // [4, 5]

// 4. Convert array-like objects to arrays
function arrayLikeFunc() {
  const argsArray = Array.prototype.slice.call(arguments);
  return argsArray;
}
const result = arrayLikeFunc(1, 2, 3);
console.log(result); // [1, 2, 3]

// 5. Shallow copy of strings (as array)
const letters = "Hello".split("");
const reversed = letters.reverse();
console.log(reversed); // ['o', 'l', 'l', 'e', 'H']

// Modern alternatives:
// Using spread operator
const copy2 = [...original];

// Using Array.from()
const copy3 = Array.from(original);

// Shallow copy means nested objects are referenced
const nested = [1, { name: "John" }, 3];
const shallowCopy = nested.slice();
shallowCopy[1].name = "Jane";
console.log(nested[1].name); // "Jane" (shared reference)

// For deep copy, use:
const deepCopy = JSON.parse(JSON.stringify(nested));
```

---

### What is the purpose of the Array.prototype.splice method?

`splice()` modifies an array by adding, removing, or replacing elements in place.

```javascript
// Syntax: array.splice(start, deleteCount, item1, item2, ...)
// Modifies original array and returns deleted elements

const arr = [1, 2, 3, 4, 5];

// Remove 2 elements starting at index 1
const removed = arr.splice(1, 2);
console.log(removed); // [2, 3]
console.log(arr); // [1, 4, 5] (modified!)

// Add elements without removing
const arr2 = [1, 2, 3];
arr2.splice(1, 0, "a", "b");
console.log(arr2); // [1, "a", "b", 2, 3]

// Replace elements
const arr3 = [1, 2, 3, 4];
arr3.splice(1, 2, "x", "y");
console.log(arr3); // [1, "x", "y", 4]

// Remove from end using negative index
const arr4 = [1, 2, 3, 4, 5];
arr4.splice(-2, 1);
console.log(arr4); // [1, 2, 3, 5]

// Practical uses:

// 1. Remove element at index
function removeAt(array, index) {
  array.splice(index, 1);
}
const items = ["a", "b", "c"];
removeAt(items, 1);
console.log(items); // ["a", "c"]

// 2. Insert elements
function insertAt(array, index, ...elements) {
  array.splice(index, 0, ...elements);
}
const nums = [1, 4, 5];
insertAt(nums, 1, 2, 3);
console.log(nums); // [1, 2, 3, 4, 5]

// 3. Replace range
const str = [1, 2, 3, 4, 5];
str.splice(1, 3, 10, 20);
console.log(str); // [1, 10, 20, 5]

// 4. Remove multiple items
const toDelete = [1, 2, 3, 4, 5];
toDelete.splice(1, 2);
console.log(toDelete); // [1, 4, 5]

// 5. Pop and unshift alternatives
const stack = [1, 2, 3];
stack.splice(stack.length, 0, 4); // Push equivalent
stack.splice(0, 1); // Shift equivalent
```

---

### What is the difference between slice and splice?

```javascript
// SLICE - Non-destructive
const arr1 = [1, 2, 3, 4, 5];

// Returns new array, doesn't modify original
const sliced = arr1.slice(1, 4);
console.log(sliced);     // [2, 3, 4]
console.log(arr1);       // [1, 2, 3, 4, 5] (unchanged)

// SPLICE - Destructive
const arr2 = [1, 2, 3, 4, 5];

// Modifies original, returns removed elements
const spliced = arr2.splice(1, 2);
console.log(spliced);    // [2, 3]
console.log(arr2);       // [1, 4, 5] (modified!)

// Comparison Table
console.log("SLICE:");
console.log("- Non-destructive (doesn't modify original)");
console.log("- Returns new array");
console.log("- Works on strings too");
console.log("- Takes start and end indices");

console.log("SPLICE:");
console.log("- Destructive (modifies original)");
console.log("- Returns removed elements");
console.log("- Only works on arrays");
console.log("- Takes start, count, and items to insert");

// Practical examples:

// Slice: Get without modifying
const data = ["a", "b", "c", "d"];
const partial = data.slice(1, 3);
console.log(partial); // ["b", "c"]
console.log(data);    // ["a", "b", "c", "d"]

// Splice: Remove and modify
const items = ["a", "b", "c", "d"];
const removed = items.splice(1, 2);
console.log(removed); // ["b", "c"]
console.log(items);   // ["a", "d"]

// When to use:
console.log("Use slice for: creating copies, extracting data");
console.log("Use splice for: removing items, filtering, inserting");
```

---

### How do you compare Object and Map?

```javascript
// Both store key-value pairs, but with differences

// OBJECT - Plain key-value storage
const obj = {
  name: "John",
  age: 30,
  city: "NYC"
};

// MAP - Ordered key-value storage
const map = new Map([
  ["name", "John"],
  ["age", 30],
  ["city", "NYC"]
]);

// Key Types
// Object - Keys must be strings or symbols
const objKeys = {
  "1": "number key as string",
  true: "boolean key",
  name: "string key"
};
console.log(objKeys["1"]);    // "number key as string"

// Map - Keys can be any type
const mapKeys = new Map([
  [1, "number key"],
  [true, "boolean key"],
  [{ id: 1 }, "object key"],
  [function() {}, "function key"]
]);
console.log(mapKeys.get(1)); // "number key"
console.log(mapKeys.get(true)); // "boolean key"

// Accessing values
// Object
const value1 = obj.name;       // Dot notation
const value2 = obj["name"];    // Bracket notation

// Map
const mapValue1 = map.get("name");     // get() method
const mapValue2 = map["name"];         // undefined (not the right way)

// Size
// Object - No direct size property
console.log(Object.keys(obj).length);  // 3

// Map - Has size property
console.log(map.size);                 // 3

// Iteration
// Object
for (let key in obj) {
  console.log(key, obj[key]);
}
Object.entries(obj).forEach(([k, v]) => {
  console.log(k, v);
});

// Map - Maintains insertion order
map.forEach((value, key) => {
  console.log(key, value);
});

for (let [key, value] of map) {
  console.log(key, value);
}

// Adding/Removing
// Object
obj.country = "USA";    // Add
delete obj.age;         // Delete

// Map
map.set("country", "USA"); // Add
map.delete("age");         // Delete
map.clear();               // Delete all

// Checking existence
// Object
console.log("name" in obj);        // true
console.log(obj.hasOwnProperty("name")); // true

// Map
console.log(map.has("name"));      // true

// Performance for key lookup
console.log("Map is optimized for frequent additions/removals");
console.log("Object is optimized for property access");

// Use cases:

// Object:
// - Configuration objects
// - Data with string keys
// - Plain data structures
// - JSON compatible

// Map:
// - Associative arrays with any key type
// - Frequently updated collections
// - Complex key types
// - Guaranteed order preservation

// Practical example:

// Using Object
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};

// Using Map
const userCache = new Map();
const userId1 = { id: 1 };
const userId2 = { id: 2 };

userCache.set(userId1, { name: "John", role: "admin" });
userCache.set(userId2, { name: "Jane", role: "user" });

console.log(userCache.get(userId1)); // { name: "John", role: "admin" }
```

---

### What is the difference between Object.keys and Object.getOwnPropertyNames?

```javascript
// Both return array of property names, but with differences

const obj = {
  name: "John",
  age: 30,
  [Symbol.for("hidden")]: "value"
};

// Define non-enumerable property
Object.defineProperty(obj, "hidden", {
  value: "secret",
  enumerable: false // Not enumerable
});

// OBJECT.KEYS - Returns enumerable properties
const keys = Object.keys(obj);
console.log(keys);
// ["name", "age"] (doesn't include non-enumerable 'hidden')

// OBJECT.GETOWNPROPERTYNAMES - Returns all properties (except symbols)
const names = Object.getOwnPropertyNames(obj);
console.log(names);
// ["name", "age", "hidden"] (includes non-enumerable)

// Getting symbols
const symbols = Object.getOwnPropertySymbols(obj);
console.log(symbols);
// [Symbol(hidden)]

// Comparison
console.log("Object.keys:");
console.log("- Only enumerable properties");
console.log("- Excludes symbols");
console.log("- Excludes non-enumerable properties");

console.log("Object.getOwnPropertyNames:");
console.log("- All properties (enumerable and non-enumerable)");
console.log("- Excludes symbols");
console.log("- For symbols, use getOwnPropertySymbols");

// Practical example
class User {
  constructor(name) {
    this.name = name;
  }
  
  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

const user = new User("John");

// keys shows enumerable instance properties
console.log(Object.keys(user));           // ["name"]

// getOwnPropertyNames shows all own properties
console.log(Object.getOwnPropertyNames(user)); // ["name"]

// Methods are in prototype, not own properties
console.log(Object.keys(Object.getPrototypeOf(user))); // ["greet"]

// Checking if property is enumerable
for (let key in user) {
  console.log(key); // "name" (enumerable)
}

// Including non-enumerable
const allProps = Object.getOwnPropertyNames(user);
console.log(allProps); // All properties
```

---

### What are object prototypes?

Prototypes are objects that other objects inherit properties and methods from.

```javascript
// Every object has a prototype
const obj = {};
console.log(Object.getPrototypeOf(obj)); // Object.prototype

// Prototype chain - objects inherit up the chain
const animal = {
  move() {
    console.log("Moving");
  }
};

const dog = Object.create(animal);
dog.bark = function() {
  console.log("Bark");
};

// dog inherits move from animal
dog.move();  // "Moving"
dog.bark();  // "Bark"

// Prototype chain visualization:
// dog -> animal -> Object.prototype -> null

// Constructor functions create prototypes
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};

const person1 = new Person("John");
const person2 = new Person("Jane");

console.log(person1.greet()); // "Hello, I'm John"
console.log(person2.greet()); // "Hello, I'm Jane"

// Both share the same greet method
console.log(person1.greet === person2.greet); // true

// Checking prototype relationship
console.log(person1 instanceof Person);              // true
console.log(Object.getPrototypeOf(person1) === Person.prototype); // true
console.log(person1.hasOwnProperty("greet"));      // false (in prototype)
console.log(Person.prototype.hasOwnProperty("greet")); // true

// Modifying prototype affects all instances
Person.prototype.sayGoodbye = function() {
  return "Goodbye";
};

console.log(person1.sayGoodbye()); // "Goodbye"
console.log(person2.sayGoodbye()); // "Goodbye"

// Class syntax (modern)
class Animal {
  constructor(type) {
    this.type = type;
  }
  
  describe() {
    return `I'm a ${this.type}`;
  }
}

const cat = new Animal("cat");
console.log(cat.describe()); // "I'm a cat"
console.log(Object.getPrototypeOf(cat) === Animal.prototype); // true

// Prototype property vs __proto__
// __proto__ is the actual prototype link (avoid using)
// .prototype is used to set up inheritance

// Finding property in prototype chain
function findProperty(obj, prop) {
  if (obj.hasOwnProperty(prop)) {
    return obj[prop];
  }
  const proto = Object.getPrototypeOf(obj);
  if (proto === null) {
    return undefined;
  }
  return findProperty(proto, prop);
}
```

---

### What is the prototype design pattern?

The prototype pattern creates new objects by copying an existing object (prototype).

```javascript
// Basic prototype pattern
const carPrototype = {
  drive() {
    return "Driving";
  },
  
  honk() {
    return "Honk!";
  }
};

// Create new car by copying prototype
const car1 = Object.create(carPrototype);
car1.color = "red";

const car2 = Object.create(carPrototype);
car2.color = "blue";

console.log(car1.drive()); // "Driving"
console.log(car2.honk());  // "Honk!"

// Efficient - methods are shared
console.log(car1.drive === car2.drive); // true

// Constructor pattern (similar)
function Car(color) {
  this.color = color;
}

Car.prototype.drive = function() {
  return `${this.color} car driving`;
};

const myCar = new Car("red");
console.log(myCar.drive()); // "red car driving"

// Prototype pattern in practice: Object.create with descriptor

const personPrototype = {
  greet: function() {
    return `Hello from ${this.name}`;
  }
};

const person = Object.create(personPrototype, {
  name: {
    value: "John",
    enumerable: true,
    writable: true
  },
  age: {
    value: 30,
    enumerable: true,
    writable: true
  }
});

console.log(person.greet()); // "Hello from John"
console.log(person.name);    // "John"

// Advantages:
console.log("Prototype pattern advantages:");
console.log("1. Shared methods (memory efficient)");
console.log("2. Flexible inheritance");
console.log("3. Dynamic property creation");
console.log("4. Clone without class definition");

// Real-world example: Cloning with modifications

function cloneWithModifications(proto, modifications) {
  const clone = Object.create(proto);
  Object.assign(clone, modifications);
  return clone;
}

const baseConfig = {
  timeout: 5000,
  retries: 3
};

const apiConfig = cloneWithModifications(baseConfig, {
  timeout: 10000
});

console.log(apiConfig.timeout); // 10000
console.log(apiConfig.retries); // 3 (inherited)
```

---

### What is Object Destructuring?

Destructuring extracts values from objects into individual variables.

```javascript
// Basic destructuring
const person = {
  name: "John",
  age: 30,
  city: "NYC"
};

const { name, age } = person;
console.log(name); // "John"
console.log(age);  // 30

// Renaming variables
const { name: personName, age: personAge } = person;
console.log(personName); // "John"

// Default values
const { name, job = "Developer" } = person;
console.log(job); // "Developer" (default)

// Nested destructuring
const user = {
  name: "John",
  address: {
    city: "NYC",
    zip: "10001"
  }
};

const { address: { city, zip } } = user;
console.log(city); // "NYC"

// Rest operator in objects
const { name, ...rest } = person;
console.log(rest); // { age: 30, city: "NYC" }

// Destructuring in function parameters
function printInfo({ name, age }) {
  console.log(`${name} is ${age}`);
}

printInfo(person); // "John is 30"

// Default values in function
function createUser({ name, role = "user" }) {
  return { name, role };
}

console.log(createUser({ name: "Alice" })); // { name: "Alice", role: "user" }

// Array destructuring
const colors = ["red", "green", "blue"];

const [first, second] = colors;
console.log(first);  // "red"
console.log(second); // "green"

// Skip elements
const [primary, , tertiary] = colors;
console.log(primary);  // "red"
console.log(tertiary); // "blue"

// Rest in arrays
const [head, ...tail] = colors;
console.log(head); // "red"
console.log(tail); // ["green", "blue"]

// Swapping variables
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1

// Mixed destructuring
const user2 = {
  name: "John",
  contacts: ["john@example.com", "555-1234"]
};

const { name: userName, contacts: [email] } = user2;
console.log(email); // "john@example.com"

// Practical example: API response handling
function handleUserResponse({ data: { user: { id, name, role = "user" } } }) {
  return { id, name, role };
}
```

---

### What are Sets and Maps and how are they used?

```javascript
// SET - Collection of unique values
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 3]);
console.log(uniqueNumbers); // Set(3) { 1, 2, 3 }

// Adding to Set
uniqueNumbers.add(4);
uniqueNumbers.add(1); // Duplicate - not added
console.log(uniqueNumbers.size); // 4

// Checking membership
console.log(uniqueNumbers.has(2)); // true
console.log(uniqueNumbers.has(5)); // false

// Removing from Set
uniqueNumbers.delete(2);
console.log(uniqueNumbers.size); // 3

// Clearing Set
uniqueNumbers.clear();
console.log(uniqueNumbers.size); // 0

// Set use cases

// 1. Remove duplicates
const arr = [1, 2, 2, 3, 3, 3];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3]

// 2. Intersection of arrays
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
const intersection = arr1.filter(x => new Set(arr2).has(x));
console.log(intersection); // [3, 4]

// 3. Tracking unique values
const visited = new Set();
const urls = ["a", "b", "a", "c", "b"];

urls.forEach(url => {
  if (!visited.has(url)) {
    console.log("First visit:", url);
    visited.add(url);
  }
});

// MAP - Collection of key-value pairs (like Object but with any key type)
const userMap = new Map([
  ["id1", { name: "John", age: 30 }],
  ["id2", { name: "Jane", age: 25 }]
]);

// Accessing values
console.log(userMap.get("id1")); // { name: "John", age: 30 }

// Adding entries
userMap.set("id3", { name: "Bob", age: 35 });

// Checking existence
console.log(userMap.has("id1")); // true

// Removing entries
userMap.delete("id1");

// Getting size
console.log(userMap.size); // 2

// Iteration
for (let [key, value] of userMap) {
  console.log(key, value);
}

// Map use cases

// 1. Caching with expiry
const cache = new Map();

function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// 2. Counting occurrences
const words = ["apple", "banana", "apple", "cherry", "banana", "apple"];
const wordCount = new Map();

words.forEach(word => {
  wordCount.set(word, (wordCount.get(word) || 0) + 1);
});

console.log(wordCount); // { apple: 3, banana: 2, cherry: 1 }

// 3. Object key mapping
const idMap = new Map([
  [{ id: 1 }, "User One"],
  [{ id: 2 }, "User Two"]
]);

// Comparing Sets and Maps
console.log("SET: Collection of unique values");
console.log("MAP: Collection of key-value pairs");

console.log("Set size: O(1) lookup");
console.log("Map: Any type of key, maintains order");
```

---

### What are the differences between Map/Set and WeakMap/WeakSet?

```javascript
// WEAK Collections hold weak references to objects
// Objects can be garbage collected even if in WeakMap/WeakSet

// MAP vs WEAKMAP

// Map holds strong references
const map = new Map();
let obj = { id: 1 };
map.set(obj, "value");
obj = null;
// Object still in map - prevents garbage collection

// WeakMap holds weak references
const weakMap = new WeakMap();
let obj2 = { id: 2 };
weakMap.set(obj2, "value");
obj2 = null;
// Object can be garbage collected now

// Key differences

console.log("MAP:");
console.log("- Any type of key (primitives and objects)");
console.log("- Iterable (can use for...of, forEach)");
console.log("- Has size property");
console.log("- Holds strong references");
console.log("- Use for general key-value storage");

console.log("WEAKMAP:");
console.log("- Only objects as keys");
console.log("- Not iterable");
console.log("- No size property");
console.log("- Holds weak references");
console.log("- Use for private data, caching");

// Practical example of WeakMap: Private data

class MyClass {
  constructor(data) {
    privateData.set(this, data);
  }
  
  getData() {
    return privateData.get(this);
  }
}

const privateData = new WeakMap();

const instance = new MyClass("secret");
console.log(instance.getData()); // "secret"
// Can't access privateData externally, and cleaned up with instance

// SET vs WEAKSET

// Set holds strong references
const set = new Set();
let obj3 = { id: 3 };
set.add(obj3);
obj3 = null;
// Object still in set

// WeakSet holds weak references
const weakSet = new WeakSet();
let obj4 = { id: 4 };
weakSet.add(obj4);
obj4 = null;
// Object can be garbage collected

console.log("SET:");
console.log("- Unique primitive and object values");
console.log("- Iterable (for...of, forEach)");
console.log("- Has size property");

console.log("WEAKSET:");
console.log("- Only objects (no primitives)");
console.log("- Not iterable");
console.log("- No size property");
console.log("- Weak references");

// Practical example of WeakSet: Tracking objects

const observedObjects = new WeakSet();

function observe(obj) {
  observedObjects.add(obj);
}

function isObserved(obj) {
  return observedObjects.has(obj);
}

const obj5 = { data: "test" };
observe(obj5);
console.log(isObserved(obj5)); // true

// When obj5 is garbage collected, it's automatically removed from WeakSet

// Memory comparison

console.log("Memory efficiency:");
console.log("WeakMap/WeakSet don't prevent garbage collection");
console.log("Good for caching and private data");
console.log("Bad for iteration and size checks");

// Use cases

// WeakMap for private data in classes
class User {
  #data = new WeakMap();
  
  constructor(id) {
    this.#data.set(this, { userId: id });
  }
}

// WeakSet for tracking specific objects
const mutableObjects = new WeakSet();

function markAsMutable(obj) {
  mutableObjects.add(obj);
}

function isMutable(obj) {
  return mutableObjects.has(obj);
}
```

---

### How do you convert a Set to an array in JavaScript?

```javascript
// Method 1: Using spread operator (most common)
const set = new Set([1, 2, 3, 4, 5]);
const arr1 = [...set];
console.log(arr1); // [1, 2, 3, 4, 5]

// Method 2: Using Array.from()
const arr2 = Array.from(set);
console.log(arr2); // [1, 2, 3, 4, 5]

// Method 3: Using destructuring
const [first, second, ...rest] = set;
console.log([first, second, ...rest]); // [1, 2, 3, 4, 5]

// Method 4: Manual conversion
const arr3 = [];
set.forEach(value => arr3.push(value));
console.log(arr3); // [1, 2, 3, 4, 5]

// Converting Set of objects
const users = new Set([
  { id: 1, name: "John" },
  { id: 2, name: "Jane" }
]);

const userArray = Array.from(users);
console.log(userArray);
// [{ id: 1, name: "John" }, { id: 2, name: "Jane" }]

// With transformation
const names = Array.from(users, user => user.name);
console.log(names); // ["John", "Jane"]

// Practical examples

// Remove duplicates and convert to array
const numbers = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(numbers)];
console.log(unique); // [1, 2, 3, 4]

// Convert and filter
const data = new Set(["apple", "banana", "apple", "cherry"]);
const filtered = Array.from(data).filter(item => item.length > 5);
console.log(filtered); // ["banana", "cherry"]

// Most efficient way
console.log("Recommendation: Use spread operator [...]");
console.log("It's concise and readable");
console.log("Performance is equivalent to Array.from()");
```

---

### What is the difference between a Map object and a plain object?

```javascript
// MAP - Designed for key-value storage

const map = new Map([
  ["name", "John"],
  ["age", 30]
]);

console.log(map.get("name")); // "John"
map.set("city", "NYC");
console.log(map.size); // 3

// PLAIN OBJECT - Designed for structured data

const obj = {
  name: "John",
  age: 30
};

console.log(obj.name); // "John"
obj.city = "NYC";
console.log(Object.keys(obj).length); // 3

// Key differences

console.log("KEY TYPES:");
console.log("Map: Any type (objects, functions, primitives)");
console.log("Object: Only strings and symbols");

const mapAnyKey = new Map();
mapAnyKey.set(1, "number key");
mapAnyKey.set({ id: 1 }, "object key");
mapAnyKey.set(true, "boolean key");

const objLimitedKey = {
  1: "converted to string '1'",
  true: "converted to string 'true'"
};

console.log(mapAnyKey.get(1)); // "number key"
console.log(objLimitedKey[1]); // "converted to string '1'"

// ITERATION

console.log("ITERATION:");
console.log("Map: Built-in iteration, maintains order");
console.log("Object: Need Object.keys/values/entries");

// Map iteration
map.forEach((value, key) => {
  console.log(key, value);
});

for (let [key, value] of map) {
  console.log(key, value);
}

// Object iteration
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});

for (let key in obj) {
  console.log(key, obj[key]);
}

// PERFORMANCE

console.log("PERFORMANCE:");
console.log("Map: Optimized for frequent add/remove");
console.log("Object: Optimized for property access");

// SIZE CHECKING

console.log("SIZE:");
console.log("Map: Direct .size property");
console.log("Object: Need Object.keys().length");

console.log("Map size:", map.size);
console.log("Object size:", Object.keys(obj).length);

// METHOD AVAILABILITY

console.log("METHODS:");
console.log("Map: get(), set(), has(), delete(), clear()");
console.log("Object: No built-in methods for all operations");

map.has("name");    // true
map.delete("name");
map.clear();

// PROTOTYPE POLLUTION

console.log("PROTOTYPE:");
console.log("Map: No prototype chain issues");
console.log("Object: Inherits from Object.prototype");

const normalObj = {};
console.log("toString" in normalObj); // true (inherited)

const cleanMap = new Map();
console.log("toString" in cleanMap);  // true (but different)

// WHEN TO USE

console.log("Use MAP when:");
console.log("- Keys are not always strings");
console.log("- Need frequent add/remove operations");
console.log("- Need guaranteed order");
console.log("- Building lookup tables");

console.log("Use OBJECT when:");
console.log("- Keys are always strings");
console.log("- Fixed structure");
console.log("- JSON compatibility needed");
console.log("- Plain data storage");

// Practical example

// Using Map for a cache
const cache = new Map();

function getData(id) {
  if (cache.has(id)) {
    console.log("From cache");
    return cache.get(id);
  }
  
  const data = { id, value: Math.random() };
  cache.set(id, data);
  return data;
}

// Using object for configuration
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3
};
```

---

### How do Sets and Maps handle equality checks for objects?

```javascript
// SETS - Uses SameValueZero algorithm

const set = new Set();

const obj1 = { id: 1 };
const obj2 = { id: 1 }; // Different object, same content

set.add(obj1);
set.add(obj2);

console.log(set.size); // 2 (both are added - different references)
console.log(set.has(obj1)); // true
console.log(set.has(obj2)); // true
console.log(set.has({ id: 1 })); // false (new object, not in set)

// Reference equality matters
const obj3 = obj1;
console.log(set.has(obj3)); // true (same reference as obj1)

// MAPS - Uses SameValueZero for keys

const map = new Map();

const key1 = { id: 1 };
const key2 = { id: 1 };

map.set(key1, "value1");
map.set(key2, "value2");

console.log(map.size); // 2 (different objects)
console.log(map.get(key1)); // "value1"
console.log(map.get(key2)); // "value2"
console.log(map.get({ id: 1 })); // undefined (new object)

// Primitive values in Sets/Maps

const primitiveSet = new Set();
primitiveSet.add(1);
primitiveSet.add("1");
primitiveSet.add(true);
primitiveSet.add(NaN);
primitiveSet.add(NaN); // Not added (NaN === NaN is false, but Set treats as equal)

console.log(primitiveSet.size); // 4

// SameValueZero behavior

console.log("SameValueZero treats:");
console.log("+0 and -0 as equal");
console.log("NaN as equal to NaN (unlike ===)");
console.log("Different object references as different");

// Checking NaN equality
console.log(NaN === NaN); // false (normal equality)
const set2 = new Set([NaN, NaN]);
console.log(set2.size); // 1 (SameValueZero treats NaNs as equal)

// Implications for object equality

// If you want Set of objects by value, you need workaround:
class User {
  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
  
  equals(other) {
    return this.id === other.id && this.name === other.name;
  }
}

const user1 = new User(1, "John");
const user2 = new User(1, "John");

const userSet = new Set();
userSet.add(user1);

// Check manually with equals
const isDuplicate = Array.from(userSet).some(u => u.equals(user2));
console.log(isDuplicate); // true

// Better approach: Use unique key
const userMap = new Map();
userMap.set("1:John", user1);
userMap.set("1:John", user2); // Overwrites (same key)

console.log(userMap.size); // 1

// SameValueZero algorithm examples
const testSet = new Set();

// NaN equality
testSet.add(NaN);
console.log(testSet.has(NaN)); // true

// Object references
const ref = { a: 1 };
testSet.add(ref);
console.log(testSet.has(ref)); // true
console.log(testSet.has({ a: 1 })); // false (different object)

// Primitive equality
testSet.add(0);
testSet.add(-0);
console.log(testSet.size); // 1 (+0 and -0 are equal)

console.log("For object equality by value, manually check or use custom logic");
```

---

## Additional Topics

### What is a thunk function?

A thunk is a function that wraps an expression to delay its evaluation.

```javascript
// Without thunk (immediate evaluation)
const value = 1 + 2 + 3; // Evaluated immediately

// With thunk (delayed evaluation)
const thunk = () => 1 + 2 + 3; // Not evaluated yet
const result = thunk(); // Now evaluated

// Practical use: Redux thunk middleware

// Synchronous action
const action = {
  type: "INCREMENT",
  payload: 1
};

// Thunk action (function instead of object)
const thunkAction = (dispatch, getState) => {
  // Can do async work here
  setTimeout(() => {
    dispatch({
      type: "INCREMENT",
      payload: 1
    });
  }, 1000);
};

// Converting callback to thunk
function fetchData(callback) {
  setTimeout(() => callback({ data: "result" }), 1000);
}

// As thunk
function fetchDataThunk() {
  return function(callback) {
    fetchData(callback);
  };
}

// Thunk for lazy computation
function lazyFibonacci(n) {
  return () => {
    if (n <= 1) return n;
    return lazyFibonacci(n - 1)() + lazyFibonacci(n - 2)();
  };
}

// Evaluation is delayed
const fib10 = lazyFibonacci(10); // No computation yet
const result = fib10(); // Now computed

console.log("Thunks delay evaluation");
console.log("Useful for: lazy evaluation, async actions, memoization");
```

---

### What are asynchronous thunks?

Asynchronous thunks handle async operations within the Redux pattern.

```javascript
// Async thunk with Redux

const fetchUserAsync = (userId) => async (dispatch) => {
  // Dispatch loading state
  dispatch({ type: "LOADING" });
  
  try {
    // Async operation
    const response = await fetch(`/api/users/${userId}`);
    const data = await response.json();
    
    // Dispatch success
    dispatch({
      type: "SUCCESS",
      payload: data
    });
  } catch (error) {
    // Dispatch error
    dispatch({
      type: "ERROR",
      payload: error.message
    });
  }
};

// Using it in Redux
// dispatch(fetchUserAsync(1));

// Without thunk (more complex)
const manualFetch = (userId) => {
  return (dispatch) => {
    dispatch({ type: "LOADING" });
    
    fetch(`/api/users/${userId}`)
      .then(response => response.json())
      .then(data => {
        dispatch({
          type: "SUCCESS",
          payload: data
        });
      })
      .catch(error => {
        dispatch({
          type: "ERROR",
          payload: error.message
        });
      });
  };
};

console.log("Async thunks:");
console.log("- Handle async operations in Redux");
console.log("- Dispatch multiple actions");
console.log("- Access state via getState");
console.log("- Cleaner than manual promise handling");
```

---

### What is the rest parameter and spread operator?

(Already covered in detail earlier in the guide)

---

### What is memoization?

Memoization caches function results to avoid redundant computations.

```javascript
// Without memoization (slow)
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2); // Recalculates many times
}

console.time("Fibonacci without memo");
console.log(fibonacci(40)); // Very slow!
console.timeEnd("Fibonacci without memo");

// With memoization (fast)
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log("From cache");
      return cache.get(key);
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const memoizedFib = memoize(fibonacci);

console.time("Fibonacci with memo");
console.log(memoizedFib(40)); // Fast!
console.timeEnd("Fibonacci with memo");

// Practical example: Computing expensive operations

function expensive(x, y) {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += x * y;
  }
  return sum;
}

const memoizedExpensive = memoize(expensive);

console.time("Expensive without memo");
expensive(5, 10);
console.timeEnd("Expensive without memo");

console.time("Expensive with memo");
memoizedExpensive(5, 10); // First call
console.timeEnd("Expensive with memo");

console.time("Expensive with memo (cached)");
memoizedExpensive(5, 10); // Cached
console.timeEnd("Expensive with memo (cached)");

// React.memo example
const MyComponent = React.memo(({ name }) => {
  console.log("Rendered:", name);
  return <div>{name}</div>;
});

// Component only re-renders if props change

// Class component memoization
class DataFetcher {
  constructor() {
    this.cache = new Map();
  }
  
  fetch(url) {
    if (this.cache.has(url)) {
      return Promise.resolve(this.cache.get(url));
    }
    
    return fetch(url)
      .then(r => r.json())
      .then(data => {
        this.cache.set(url, data);
        return data;
      });
  }
}

const fetcher = new DataFetcher();
fetcher.fetch("/api/data"); // Makes request
fetcher.fetch("/api/data"); // Uses cache
```

---

### What is the Temporal Dead Zone?

(Already covered in detail earlier in the guide)

---

### What is recursion and how is it used in JavaScript?

```javascript
// Recursion - Function calling itself

// Base case: Condition to stop recursion
// Recursive case: Function calls itself with different arguments

// Example 1: Countdown
function countdown(n) {
  if (n <= 0) return; // Base case
  console.log(n);
  countdown(n - 1);   // Recursive case
}

countdown(5);
// 5, 4, 3, 2, 1

// Example 2: Factorial
function factorial(n) {
  if (n <= 1) return 1;        // Base case
  return n * factorial(n - 1); // Recursive case
}

console.log(factorial(5)); // 120

// Example 3: Fibonacci
function fib(n) {
  if (n <= 1) return n;           // Base case
  return fib(n - 1) + fib(n - 2); // Recursive cases
}

console.log(fib(10)); // 55

// Practical: Tree traversal
const tree = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4, left: null, right: null },
    right: { value: 5, left: null, right: null }
  },
  right: {
    value: 3,
    left: null,
    right: null
  }
};

function traverseTree(node) {
  if (!node) return;
  
  console.log(node.value);       // Pre-order
  traverseTree(node.left);
  traverseTree(node.right);
}

// traverseTree(tree);
// Output: 1, 2, 4, 5, 3

// Recursion with array
function sum(arr) {
  if (arr.length === 0) return 0;      // Base case
  return arr[0] + sum(arr.slice(1));   // Recursive case
}

console.log(sum([1, 2, 3, 4, 5])); // 15

// Stack overflow risk
function deepRecursion(n) {
  if (n === 0) return;
  deepRecursion(n - 1); // Will hit stack limit
}

// Maximum call stack size exceeded at around 10000-15000
// console.log(deepRecursion(100000)); // Error!

// Solution: Use iteration or tail-call optimization

// Tail-call optimized (not always supported)
function tailFactorial(n, acc = 1) {
  if (n <= 1) return acc;
  return tailFactorial(n - 1, n * acc);
}

console.log(tailFactorial(5)); // 120 (uses less stack)

// Practical example: Deep object search
const obj = {
  a: { b: { c: { d: "found!" } } }
};

function searchObject(obj, searchKey) {
  for (let key in obj) {
    if (key === searchKey) {
      return obj[key];
    }
    
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const result = searchObject(obj[key], searchKey);
      if (result !== undefined) {
        return result;
      }
    }
  }
}

console.log(searchObject(obj, "d")); // "found!"
```

---

### What are default parameters and how are they used?

```javascript
// Default parameters provide default values if argument not provided

// Basic example
function greet(name = "Guest") {
  return `Hello, ${name}`;
}

console.log(greet());         // "Hello, Guest"
console.log(greet("John"));   // "Hello, John"

// Multiple defaults
function createUser(name = "Anonymous", role = "user", active = true) {
  return { name, role, active };
}

console.log(createUser());                    // { name: "Anonymous", role: "user", active: true }
console.log(createUser("Alice"));             // { name: "Alice", role: "user", active: true }
console.log(createUser("Bob", "admin"));      // { name: "Bob", role: "admin", active: true }
console.log(createUser("Charlie", "mod", false)); // { name: "Charlie", role: "mod", active: false }

// Using expressions as defaults
function getTime(timestamp = Date.now()) {
  return new Date(timestamp);
}

// Default values evaluated at call time
const defaultArray = [];
function addItem(item, array = defaultArray) {
  array.push(item);
  return array;
}

console.log(addItem(1)); // [1]
console.log(addItem(2)); // [2] - new default array each call

// Using previous parameters as defaults
function buildURL(baseURL = "https://api.example.com", path = "", port = 80) {
  return `${baseURL}:${port}${path}`;
}

// Parameters evaluated left to right
function test(a = 1, b = a * 2) {
  return [a, b];
}

console.log(test());      // [1, 2]
console.log(test(5));     // [5, 10]
console.log(test(5, 20)); // [5, 20]

// Cannot reference later parameters
// function bad(a = b, b = 2) {} // ReferenceError

// With destructuring
function printUser({ name = "John", age = 30 } = {}) {
  console.log(`${name} is ${age}`);
}

printUser();                      // "John is 30"
printUser({ name: "Jane" });      // "Jane is 30"
printUser({ age: 25 });           // "John is 25"
printUser({ name: "Bob", age: 35 }); // "Bob is 35"

// Array defaults
function processArray(arr = []) {
  return arr.map(x => x * 2);
}

console.log(processArray());       // []
console.log(processArray([1, 2])); // [2, 4]

// Avoiding undefined
function calculate(value = 0) {
  return value * 2;
}

console.log(calculate());        // 0
console.log(calculate(null));    // 0 (default used)
console.log(calculate(0));       // 0 (falsy but not undefined)

// For any falsy value, use nullish coalescing with destructuring
function better(value = 0) {
  return (value ?? 0) * 2; // Uses 0 for null/undefined, not other falsy
}

console.log(better(0));     // 0
console.log(better(null));  // 0
console.log(better(""));    // 0 ('' is falsy but not nullish)

console.log("Default parameters make code more readable and robust");
```

---

## Final Tips for Interview Success

1. **Understand, don't memorize** - Know the 'why' behind each concept
2. **Practice coding** - Write code while explaining your thoughts
3. **Ask clarifying questions** - If the question is ambiguous
4. **Talk through your solution** - Explain your approach before coding
5. **Test your code** - Walk through examples and edge cases
6. **Know the trade-offs** - Every approach has pros and cons
7. **Stay updated** - Keep learning modern JavaScript practices
8. **Be honest about gaps** - It's better to say "I'm not sure" than guess

Good luck with your JavaScript interviews!
