# JavaScript Interview Questions - Intermediate Level Guide

## Table of Contents
1. [Advanced Concepts](#advanced-concepts)
2. [Asynchronous JavaScript](#asynchronous-javascript)
3. [Prototypal Inheritance](#prototypal-inheritance)
4. [ES6+ Features](#es6-features)
5. [Error Handling & Security](#error-handling--security)
6. [Performance & Debugging](#performance--debugging)

---

## Advanced Concepts

### What is the prototype chain in JavaScript?

The prototype chain is how JavaScript objects inherit properties and methods from other objects.

```javascript
// Every object has an internal [[Prototype]] reference
// Objects look up properties through the prototype chain

// Example: Prototype chain visualization
const animal = {
  type: "animal",
  move() {
    console.log("Moving");
  }
};

const dog = Object.create(animal); // dog.__proto__ = animal
dog.name = "Buddy";
dog.bark = function() {
  console.log("Woof!");
};

const puppy = Object.create(dog); // puppy.__proto__ = dog
puppy.age = 2;

// Property lookup: puppy -> dog -> animal -> Object.prototype -> null

console.log(puppy.name); // "Buddy" (found in dog)
console.log(puppy.type); // "animal" (found in animal)
console.log(puppy.age);  // 2 (found in puppy itself)

// hasOwnProperty vs 'in' operator
console.log(puppy.hasOwnProperty("age"));  // true (own property)
console.log(puppy.hasOwnProperty("name")); // false (inherited)
console.log("name" in puppy);              // true (includes prototype)

// Walking the prototype chain
function walkPrototypeChain(obj) {
  let current = obj;
  while (current !== null) {
    console.log(Object.getOwnPropertyNames(current));
    current = Object.getPrototypeOf(current);
  }
}

// Constructor function prototype chain
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

Dog.prototype.bark = function() {
  console.log(`${this.name} barks`);
};

const myDog = new Dog("Rex", "Labrador");
myDog.speak(); // "Rex makes a sound" (inherited from Animal)
myDog.bark();  // "Rex barks"

console.log(myDog instanceof Dog);    // true
console.log(myDog instanceof Animal); // true
```

---

### What is the difference between prototypal inheritance and classical inheritance?

```javascript
// CLASSICAL INHERITANCE (Class-based)
// - Common in Java, C++
// - Classes are blueprints
// - Objects are instances of classes
// - Strict hierarchy

class Animal {
  constructor(name) {
    this.name = name;
  }
  
  move() {
    console.log("Moving");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

// Note: ES6 class syntax is syntactic sugar over prototypal inheritance
// Under the hood, it still uses prototypes

const dog = new Dog("Rex");
dog.move(); // "Moving" (inherited)
dog.bark(); // "Woof!"

// PROTOTYPAL INHERITANCE (Prototype-based)
// - Objects inherit directly from other objects
// - No classes (though ES6 added class syntax)
// - More flexible
// - Dynamic

const animalPrototype = {
  move() {
    console.log("Moving");
  }
};

const dogPrototype = Object.create(animalPrototype);
dogPrototype.bark = function() {
  console.log("Woof!");
};

// Create instances
const dog1 = Object.create(dogPrototype);
dog1.name = "Rex";

const dog2 = Object.create(dogPrototype);
dog2.name = "Buddy";

console.log(dog1.move()); // "Moving" (inherited from animalPrototype)
console.log(dog1.bark()); // "Woof!"

// Key Differences:

console.log("CLASSICAL:");
console.log("- Class-based");
console.log("- Compile-time resolution");
console.log("- Rigid hierarchies");
console.log("- Single inheritance (usually)");

console.log("PROTOTYPAL:");
console.log("- Object-based");
console.log("- Runtime resolution");
console.log("- Flexible composition");
console.log("- Multiple inheritance possible");

// Concatenative inheritance (true prototypal)
const canEat = {
  eat() { console.log("Eating"); }
};

const canWalk = {
  walk() { console.log("Walking"); }
};

const canBark = {
  bark() { console.log("Barking"); }
};

// Compose from multiple prototypes
const dog3 = Object.assign(Object.create({}), canEat, canWalk, canBark);
dog3.eat();   // "Eating"
dog3.walk();  // "Walking"
dog3.bark();  // "Barking"

// Advantages of prototypal inheritance:
console.log("More flexible");
console.log("Easier to prototype");
console.log("No class hierarchies");
console.log("Supports multiple inheritance via composition");
```

---

### What is the difference between Object.create and the new keyword?

```javascript
// Both create new objects with prototypes, but different approaches

// USING OBJECT.CREATE
const animalPrototype = {
  move() { return "Moving"; },
  type: "animal"
};

const animal1 = Object.create(animalPrototype);
animal1.name = "Leo";

console.log(animal1.move()); // "Moving"
console.log(animal1.name);   // "Leo"

// Object.create with property descriptors
const animal2 = Object.create(animalPrototype, {
  name: {
    value: "Tiger",
    enumerable: true,
    writable: true,
    configurable: true
  },
  age: {
    value: 5,
    enumerable: false // Hidden property
  }
});

// USING NEW KEYWORD WITH CONSTRUCTOR
function Animal(name) {
  this.name = name;
}

Animal.prototype.move = function() {
  return "Moving";
};

const animal3 = new Animal("Cheetah");
console.log(animal3.move()); // "Moving"
console.log(animal3.name);   // "Cheetah"

// Key Differences:

console.log("OBJECT.CREATE:");
console.log("- Explicit prototype setting");
console.log("- No constructor function called");
console.log("- Property descriptors supported");
console.log("- More control");
console.log("- Not calling a function");

console.log("NEW KEYWORD:");
console.log("- Constructor function called");
console.log("- Automatic prototype setup");
console.log("- Simpler syntax");
console.log("- Creates 'this' binding");
console.log("- Function initialization");

// Simulating new keyword behavior
function simulateNew(constructor, ...args) {
  // 1. Create new object with prototype
  const obj = Object.create(constructor.prototype);
  
  // 2. Call constructor with new 'this'
  const result = constructor.apply(obj, args);
  
  // 3. Return object (unless constructor returns object)
  return typeof result === "object" ? result : obj;
}

const animal4 = simulateNew(Animal, "Zebra");
console.log(animal4.name); // "Zebra"
console.log(animal4 instanceof Animal); // true

// When to use which:

// Use Object.create when:
// - Creating simple objects without constructor logic
// - Need property descriptors
// - Prefer functional approach

// Use new keyword when:
// - Need constructor initialization
// - Using standard patterns
// - Clearer intent

// Comparison in practice
const proto = {
  greet() {
    return `Hello, I'm ${this.name}`;
  }
};

// Method 1: Object.create
const person1 = Object.create(proto);
person1.name = "John";

// Method 2: Constructor with new
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function() {
  return `Hello, I'm ${this.name}`;
};
const person2 = new Person("John");

// Both work similarly but different syntax
console.log(person1.greet()); // "Hello, I'm John"
console.log(person2.greet()); // "Hello, I'm John"
```

---

### What is the difference between Object.freeze and Object.seal?

```javascript
// Both prevent object modification but in different ways

// OBJECT.FREEZE - Complete immutability
const frozenObj = {
  name: "John",
  age: 30,
  skills: ["JavaScript", "React"]
};

Object.freeze(frozenObj);

// Cannot modify existing properties
frozenObj.name = "Jane"; // Fails silently (or throws in strict mode)
console.log(frozenObj.name); // "John" (unchanged)

// Cannot add new properties
frozenObj.city = "NYC"; // Fails silently
console.log(frozenObj.city); // undefined

// Cannot delete properties
delete frozenObj.age; // Fails silently
console.log(frozenObj.age); // 30

// However: Nested objects are NOT frozen (shallow freeze)
frozenObj.skills.push("Node.js"); // Works!
console.log(frozenObj.skills); // ["JavaScript", "React", "Node.js"]

// OBJECT.SEAL - Prevent add/delete, allow modification
const sealedObj = {
  name: "John",
  age: 30
};

Object.seal(sealedObj);

// CAN modify existing properties
sealedObj.name = "Jane"; // Works!
console.log(sealedObj.name); // "Jane"

sealedObj.age = 31; // Works!
console.log(sealedObj.age); // 31

// CANNOT add new properties
sealedObj.city = "NYC"; // Fails silently
console.log(sealedObj.city); // undefined

// CANNOT delete properties
delete sealedObj.age; // Fails silently
console.log(sealedObj.age); // 31

// Comparison:

console.log("FREEZE:");
console.log("- Cannot modify properties");
console.log("- Cannot add properties");
console.log("- Cannot delete properties");
console.log("- Most restrictive");

console.log("SEAL:");
console.log("- CAN modify properties");
console.log("- Cannot add properties");
console.log("- Cannot delete properties");
console.log("- Moderate restriction");

// Checking freeze/seal status
console.log("Object.isFrozen(frozenObj)"); // true
console.log("Object.isSealed(sealedObj)"); // true

// Deep freeze implementation
function deepFreeze(obj) {
  // Freeze the object itself
  Object.freeze(obj);
  
  // Freeze all nested objects recursively
  Object.values(obj).forEach(value => {
    if (typeof value === "object" && value !== null) {
      deepFreeze(value);
    }
  });
  
  return obj;
}

const complexObj = {
  user: {
    name: "John",
    address: {
      city: "NYC"
    }
  }
};

deepFreeze(complexObj);

// Now nested objects are also frozen
// complexObj.user.name = "Jane"; // Fails
// complexObj.user.address.city = "LA"; // Fails

// OBJECT.PREVENTEXTENSIONS - No new properties, but can modify/delete
const preventObj = {
  name: "John"
};

Object.preventExtensions(preventObj);

// CAN modify
preventObj.name = "Jane"; // Works
console.log(preventObj.name); // "Jane"

// CANNOT add
preventObj.age = 30; // Fails
console.log(preventObj.age); // undefined

// CAN delete
delete preventObj.name; // Works
console.log(preventObj.name); // undefined

// Summary of all three:
const comparison = {
  "preventExtensions": "Can modify/delete, but not add",
  "seal": "Can modify, but not add/delete",
  "freeze": "Cannot modify/add/delete"
};

console.log(comparison);

// Practical use case: Immutable config objects
const CONFIG = Object.freeze({
  API_URL: "https://api.example.com",
  TIMEOUT: 5000,
  RETRIES: 3
});

// Any attempt to modify CONFIG fails
// CONFIG.TIMEOUT = 10000; // Fails
// CONFIG.NEW_PROPERTY = "value"; // Fails
```

---

### What is the difference between deep copy and shallow copy?

```javascript
// SHALLOW COPY - Copies only the top level
// Nested objects/arrays are referenced, not copied

const original = {
  name: "John",
  age: 30,
  address: {
    city: "NYC",
    zip: "10001"
  },
  hobbies: ["reading", "gaming"]
};

// Shallow copy method 1: Object.assign()
const shallowCopy1 = Object.assign({}, original);

// Shallow copy method 2: Spread operator
const shallowCopy2 = { ...original };

// Shallow copy method 3: Array.prototype.slice()
const arrayOriginal = [1, { name: "item" }, 3];
const shallowArrayCopy = arrayOriginal.slice();

// Shallow copy problems: Nested objects are shared
shallowCopy1.address.city = "LA";
console.log(original.address.city); // "LA" (changed!) - Same reference

shallowCopy1.hobbies.push("coding");
console.log(original.hobbies); // ["reading", "gaming", "coding"] - Shared!

// Top-level properties are independent
shallowCopy1.name = "Jane";
console.log(original.name); // "John" (unchanged) - Different value

// DEEP COPY - Copies everything recursively
// All nested objects/arrays are also copied

// Deep copy method 1: JSON.parse + JSON.stringify
// Limitation: Functions and undefined values are lost
const deepCopy1 = JSON.parse(JSON.stringify(original));

deepCopy1.address.city = "Boston";
console.log(original.address.city); // "NYC" (unchanged) - Independent!

deepCopy1.hobbies.push("music");
console.log(original.hobbies); // ["reading", "gaming"] (unchanged) - Independent!

// Deep copy method 2: Recursive function
function deepCopyRecursive(obj) {
  // Handle null and non-objects
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  
  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(item => deepCopyRecursive(item));
  }
  
  // Handle objects
  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopyRecursive(obj[key]);
    }
  }
  return copy;
}

const deepCopy2 = deepCopyRecursive(original);

deepCopy2.address.zip = "10002";
console.log(original.address.zip); // "10001" (unchanged)

// Deep copy method 3: structuredClone() (Modern - No function support)
const deepCopy3 = structuredClone(original);

// Comparison:

console.log("SHALLOW COPY:");
console.log("- Top-level independent");
console.log("- Nested objects shared");
console.log("- Fast");
console.log("- Less memory");
console.log("- Use: When you only change top-level properties");

console.log("DEEP COPY:");
console.log("- Everything independent");
console.log("- No shared references");
console.log("- Slower");
console.log("- More memory");
console.log("- Use: When you modify nested structures");

// Visual representation:
console.log("SHALLOW COPY:");
console.log("Original: { name, address* }");
console.log("Copy: { name, address* } <- same address object");

console.log("DEEP COPY:");
console.log("Original: { name, address* }");
console.log("Copy: { name, address** } <- different address object");

// Handling special types in deep copy
const complexObj = {
  name: "John",
  date: new Date(),
  regex: /test/g,
  func: function() { return "hello"; },
  symbol: Symbol("id")
};

// JSON.parse/stringify loses functions, symbols, dates
const lost = JSON.parse(JSON.stringify(complexObj));
console.log(lost.func);   // undefined (lost)
console.log(lost.symbol); // undefined (lost)
console.log(lost.date);   // string instead of Date

// Better deep copy with special handling
function smartDeepCopy(obj, visited = new WeakSet()) {
  // Prevent circular references
  if (visited.has(obj)) {
    return obj;
  }
  
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  
  if (obj instanceof Date) {
    return new Date(obj);
  }
  
  if (obj instanceof RegExp) {
    return new RegExp(obj);
  }
  
  if (Array.isArray(obj)) {
    const arr = [];
    visited.add(obj);
    obj.forEach((item, index) => {
      arr[index] = smartDeepCopy(item, visited);
    });
    return arr;
  }
  
  const copy = {};
  visited.add(obj);
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = smartDeepCopy(obj[key], visited);
    }
  }
  return copy;
}

// Handling circular references
const circularObj = { name: "John" };
circularObj.self = circularObj; // Circular reference

const circularCopy = smartDeepCopy(circularObj);
console.log(circularCopy.name); // "John"
console.log(circularCopy.self === circularCopy); // true (circular preserved)
```

---

### What is the role of deferred scripts in JavaScript?

```javascript
// The 'defer' attribute on script tags loads scripts asynchronously
// but executes them in order before DOMContentLoaded

// HTML examples:
/*
<!-- Regular script (blocks parsing) -->
<script src="script.js"></script>

<!-- Async script (loads async, executes immediately) -->
<script src="script.js" async></script>

<!-- Deferred script (loads async, executes after parsing) -->
<script src="script.js" defer></script>
*/

// Execution order with defer

// script1.js
console.log("Script 1 loaded");
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready - Script 1");
});

// script2.js
console.log("Script 2 loaded");
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM ready - Script 2");
});

// With defer attribute on both:
// HTML parses completely first
// Then scripts execute in order:
// 1. "Script 1 loaded"
// 2. "Script 2 loaded"
// 3. DOMContentLoaded fires
// 4. "DOM ready - Script 1"
// 5. "DOM ready - Script 2"

// Defer vs Async vs Regular:

console.log("REGULAR SCRIPT:");
console.log("- Blocks HTML parsing");
console.log("- Executes immediately");
console.log("- Best: Small inline scripts");

console.log("ASYNC SCRIPT:");
console.log("- Non-blocking loading");
console.log("- Executes as soon as loaded");
console.log("- Order not guaranteed");
console.log("- Best: Analytics, ads (independent scripts)");

console.log("DEFER SCRIPT:");
console.log("- Non-blocking loading");
console.log("- Executes after parsing (before DOMContentLoaded)");
console.log("- Order preserved");
console.log("- Best: Dependent scripts, libraries");

// Practical example: Optimal script loading

// HTML structure:
/*
<!DOCTYPE html>
<html>
<head>
  <!-- Critical inline script -->
  <script>
    console.log("Critical setup");
  </script>
</head>
<body>
  <!-- Page content -->
  
  <!-- Libraries with defer (order matters) -->
  <script src="jquery.js" defer></script>
  <script src="bootstrap.js" defer></script>
  
  <!-- Independent analytics with async -->
  <script src="analytics.js" async></script>
  
  <!-- Page-specific scripts with defer -->
  <script src="app.js" defer></script>
</body>
</html>
*/

// Why defer is important for performance:
console.log("Benefits of defer:");
console.log("1. Page renders faster (scripts don't block)");
console.log("2. Scripts execute in order");
console.log("3. DOM available when scripts run");
console.log("4. Better user experience");

// Module scripts are deferred by default
/*
<script type="module" src="app.js"></script>
*/
// This is automatically deferred

// Dynamic script insertion (async by default)
const script = document.createElement("script");
script.src = "dynamic.js";
script.async = false; // Make it wait for previous scripts
script.defer = true;  // Defer execution
document.body.appendChild(script);

// Event sequence with defer
console.log("Execution timeline with defer:");
console.log("1. HTML parsing starts");
console.log("2. Encounter <script defer>");
console.log("3. Continue parsing HTML (script loads in background)");
console.log("4. HTML parsing completes");
console.log("5. Script executes (DOM ready)");
console.log("6. DOMContentLoaded event fires");
```

---

### Explain the concept of lexical scoping.

Lexical scoping means variables are resolved based on the position in the source code.

```javascript
// Lexical scoping: Inner scopes have access to outer scopes
// Scope is determined at WRITE time, not execution time

const globalVar = "global";

function outer() {
  const outerVar = "outer";
  
  function inner() {
    const innerVar = "inner";
    
    // Can access all scopes due to lexical scoping
    console.log(innerVar);    // "inner" (own scope)
    console.log(outerVar);    // "outer" (lexical parent scope)
    console.log(globalVar);   // "global" (global scope)
  }
  
  inner();
  // console.log(innerVar); // Error: innerVar not accessible
}

outer();

// Lexical scope chain (determined at compile time):
// inner -> outer -> global -> null

// Dynamic scope (JavaScript is NOT dynamically scoped):
// With dynamic scope, scope depends on call stack, not source position

function dynamicExample() {
  const x = "dynamic";
  nestedFunc();
}

function nestedFunc() {
  // With dynamic scope, could access 'x' from dynamicExample's scope
  // With lexical scope, can only access global x (or x in nestedFunc's parent)
  // console.log(x); // undefined (if x not in lexical scope)
}

// Lexical scoping with closures

function createCounter() {
  let count = 0; // Captured by closure (lexical scope)
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1 (increment has access to count via lexical scope)
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1

// Lexical scope is fixed at definition time

const globalX = "global";

const makeFunc = function(name) {
  const localX = name; // Captured in closure
  
  return function() {
    return localX; // Always returns 'name' parameter
  };
};

const func1 = makeFunc("func1");
const func2 = makeFunc("func2");

console.log(func1()); // "func1" (closure captured at definition)
console.log(func2()); // "func2" (different closure)

// Scope chain resolution

const a = "a";

function level1() {
  const b = "b";
  
  function level2() {
    const c = "c";
    
    function level3() {
      const d = "d";
      
      // Scope chain: d -> c -> b -> a -> global
      console.log(a, b, c, d); // "a", "b", "c", "d"
    }
    
    level3();
  }
  
  level2();
}

level1();

// Shadowing - Inner scope hides outer scope variable

const name = "outer";

function shadow() {
  const name = "inner"; // Shadows outer 'name'
  console.log(name); // "inner" (uses inner scope)
}

shadow();
console.log(name); // "outer" (outer still unchanged)

// Lexical scoping with arrow functions

const person = {
  name: "John",
  age: 30,
  
  greet: function() {
    // 'this' is lexically scoped in arrow functions
    const introduce = () => {
      console.log(`${this.name} is ${this.age}`);
    };
    introduce();
  }
};

person.greet(); // "John is 30"

// Function scope vs Block scope (let/const)

function testScope() {
  if (true) {
    var varVar = "var";      // Function-scoped
    let letVar = "let";      // Block-scoped
    const constVar = "const"; // Block-scoped
  }
  
  console.log(varVar);   // "var" (accessible - function scoped)
  // console.log(letVar); // Error - not accessible
  // console.log(constVar); // Error - not accessible
}

testScope();

// Lexical scoping enables:
console.log("Benefits of lexical scoping:");
console.log("1. Predictable scope resolution");
console.log("2. Enables closures");
console.log("3. Prevents accidental variable capture");
console.log("4. Scope is static (compile-time)");
```

---

### How can closures be used to create private variables?

```javascript
// Closures create a private scope that persists

// Method 1: Module Pattern

const Module = (function() {
  // Private variables (not accessible outside)
  const privateVar = "private";
  let counter = 0;
  
  // Private function
  function privateFunc() {
    return "Only visible inside module";
  }
  
  // Public interface
  return {
    getPrivateVar: function() {
      return privateVar;
    },
    
    increment: function() {
      counter++;
      return counter;
    },
    
    getCounter: function() {
      return counter;
    }
  };
})();

console.log(Module.getPrivateVar()); // "private"
console.log(Module.increment());     // 1
console.log(Module.increment());     // 2
console.log(Module.getCounter());    // 2

// Cannot access private variables directly
// console.log(Module.counter); // undefined
// console.log(Module.privateVar); // undefined

// Method 2: Constructor Pattern

function BankAccount(initialBalance) {
  // Private variable
  let balance = initialBalance;
  
  // Private method
  const validateAmount = function(amount) {
    return amount > 0;
  };
  
  // Public methods with closure access to private variables
  this.deposit = function(amount) {
    if (validateAmount(amount)) {
      balance += amount;
      return `Deposited ${amount}. New balance: ${balance}`;
    }
    return "Invalid amount";
  };
  
  this.withdraw = function(amount) {
    if (validateAmount(amount) && amount <= balance) {
      balance -= amount;
      return `Withdrew ${amount}. New balance: ${balance}`;
    }
    return "Invalid amount or insufficient balance";
  };
  
  this.getBalance = function() {
    return balance;
  };
}

const account = new BankAccount(1000);
console.log(account.deposit(500));    // "Deposited 500. New balance: 1500"
console.log(account.withdraw(200));   // "Withdrew 200. New balance: 1300"
console.log(account.getBalance());    // 1300
// console.log(account.balance); // undefined (private)

// Method 3: Using WeakMap for Private Data

class User {
  constructor(name, email) {
    this.name = name;
    privateData.set(this, {
      email: email,
      password: null
    });
  }
  
  setPassword(pwd) {
    const data = privateData.get(this);
    data.password = pwd;
  }
  
  getEmail() {
    return privateData.get(this).email;
  }
}

const privateData = new WeakMap();

const user = new User("John", "john@example.com");
console.log(user.getEmail()); // "john@example.com"
user.setPassword("secret");
// console.log(user.email); // undefined (private)

// Method 4: Closures with Factory Function

function createUser(name, email) {
  // Private variables
  const id = Math.random();
  let lastLogin = null;
  
  // Public interface
  return {
    getName: () => name,
    getEmail: () => email,
    setLastLogin: () => {
      lastLogin = new Date();
    },
    getLastLogin: () => lastLogin,
    getId: () => id
  };
}

const user1 = createUser("Alice", "alice@example.com");
const user2 = createUser("Bob", "bob@example.com");

user1.setLastLogin();
console.log(user1.getEmail());      // "alice@example.com"
console.log(user1.getLastLogin());  // Current date
console.log(user2.getLastLogin());  // null (different instance)

// Method 5: Revealing Module Pattern

const Calculator = (function() {
  let result = 0; // Private state
  
  // Private functions
  const logOperation = (operation, a, b) => {
    console.log(`${operation}: ${a} and ${b}`);
  };
  
  // Public methods
  const add = (a, b) => {
    logOperation("Add", a, b);
    return a + b;
  };
  
  const multiply = (a, b) => {
    logOperation("Multiply", a, b);
    return a * b;
  };
  
  const getResult = () => result;
  
  const setResult = (value) => {
    result = value;
  };
  
  // Reveal only what should be public
  return { add, multiply, getResult, setResult };
})();

const sum = Calculator.add(5, 3);
const product = Calculator.multiply(4, 2);

console.log(sum);     // 8
console.log(product); // 8

// Method 6: Combining Closures for Multi-level Privacy

function createBankingApp() {
  // Application-level private state
  const accounts = new Map();
  
  return {
    createAccount: function(userId) {
      // Account-level private state
      let transactions = [];
      let balance = 0;
      
      accounts.set(userId, {
        getBalance: () => balance,
        deposit: (amount) => {
          balance += amount;
          transactions.push({ type: "deposit", amount });
        },
        withdraw: (amount) => {
          if (amount <= balance) {
            balance -= amount;
            transactions.push({ type: "withdraw", amount });
          }
        },
        getTransactions: () => [...transactions] // Return copy
      });
    },
    
    getAccount: (userId) => accounts.get(userId)
  };
}

const app = createBankingApp();
app.createAccount("user123");
const myAccount = app.getAccount("user123");
myAccount.deposit(1000);
myAccount.withdraw(200);
console.log(myAccount.getBalance()); // 800
console.log(myAccount.getTransactions()); // [deposit, withdraw]

// Benefits of closures for privacy:
console.log("Closure-based privacy benefits:");
console.log("1. Data encapsulation");
console.log("2. Information hiding");
console.log("3. Prevents external modification");
console.log("4. Control access via methods");
console.log("5. Multiple instances have separate state");
```

---

### What are the potential pitfalls of using closures?

```javascript
// Pitfall 1: Memory Leaks (Closures prevent garbage collection)

function problematicClosure() {
  const largeData = new Array(1000000).fill("data"); // Large array
  
  return function() {
    return largeData[0]; // Closure captures entire largeData
  };
}

const leak = problematicClosure();
// largeData cannot be garbage collected while leak exists
// This wastes memory!

// Solution: Clean up references
function betterClosure() {
  let largeData = new Array(1000000).fill("data");
  
  const innerFunc = function() {
    return largeData[0];
  };
  
  // When done, clear the reference
  setTimeout(() => {
    largeData = null; // Allow garbage collection
  }, 5000);
  
  return innerFunc;
}

// Pitfall 2: Shared State in Loops

const functions = [];

// Wrong: Closure captures the variable, not the value
for (var i = 0; i < 3; i++) {
  functions.push(function() {
    return i; // All functions reference same 'i'
  });
}

console.log(functions[0]()); // 3 (not 0!)
console.log(functions[1]()); // 3 (not 1!)
console.log(functions[2]()); // 3 (not 2!)

// Solution 1: Use let (block scope)
const correctFunctions = [];

for (let j = 0; j < 3; j++) {
  correctFunctions.push(function() {
    return j;
  });
}

console.log(correctFunctions[0]()); // 0
console.log(correctFunctions[1]()); // 1
console.log(correctFunctions[2]()); // 2

// Solution 2: Use IIFE (Immediately Invoked Function Expression)
const iifeFunctions = [];

for (var k = 0; k < 3; k++) {
  iifeFunctions.push((function(index) {
    return function() {
      return index;
    };
  })(k));
}

console.log(iifeFunctions[0]()); // 0
console.log(iifeFunctions[1]()); // 1
console.log(iifeFunctions[2]()); // 2

// Pitfall 3: Unexpected 'this' Binding

const obj = {
  name: "Object",
  getData: function() {
    const getInternal = function() {
      console.log(this.name); // 'this' is global, not obj!
    };
    getInternal();
  }
};

obj.getData(); // undefined (or error in strict mode)

// Solution: Preserve 'this'
const obj2 = {
  name: "Object",
  getData: function() {
    const self = this; // Store reference
    const getInternal = function() {
      console.log(self.name); // Use stored reference
    };
    getInternal();
  }
};

obj2.getData(); // "Object"

// Or use arrow function
const obj3 = {
  name: "Object",
  getData: function() {
    const getInternal = () => {
      console.log(this.name); // Arrow inherits 'this'
    };
    getInternal();
  }
};

obj3.getData(); // "Object"

// Pitfall 4: Accidental Variable Capture

function setupHandlers() {
  const handlers = [];
  
  for (var i = 0; i < 3; i++) {
    const btn = document.createElement("button");
    btn.textContent = `Button ${i}`;
    
    // Each handler captures the same 'i'
    btn.addEventListener("click", function() {
      console.log(`Clicked button ${i}`); // All show 3
    });
    
    handlers.push(btn);
  }
  
  return handlers;
}

// Solution: Use let or bind the value
function setupHandlersFixed() {
  const handlers = [];
  
  for (let i = 0; i < 3; i++) {
    const btn = document.createElement("button");
    btn.textContent = `Button ${i}`;
    
    btn.addEventListener("click", function() {
      console.log(`Clicked button ${i}`); // Correct value
    });
    
    handlers.push(btn);
  }
  
  return handlers;
}

// Pitfall 5: Closure Performance Issues

// Creating many closures can slow down performance
function createManyClosures() {
  const closures = [];
  
  for (let i = 0; i < 100000; i++) {
    closures.push(function() {
      return i; // Each closure has its own scope chain
    });
  }
  
  return closures;
}

console.time("Closures");
const manyClosures = createManyClosures();
console.timeEnd("Closures"); // May be slower than expected

// Pitfall 6: Hidden Dependencies

const helper = (function() {
  // Hidden state that's hard to track
  let internalState = 0;
  let initialized = false;
  let cache = {};
  let listeners = [];
  
  return {
    getValue: () => internalState,
    setValue: (value) => {
      internalState = value;
      cache = {}; // Silently clear cache
    }
  };
})();

// Difficult to debug: Where is the cache cleared?
// What other side effects happen?

// Solution: Make dependencies explicit
const betterHelper = (function() {
  const state = {
    value: 0,
    cache: {},
    listeners: []
  };
  
  return {
    getValue: () => state.value,
    setValue: (value) => {
      state.value = value;
      // Be explicit about side effects
      state.cache = {};
      state.listeners.forEach(fn => fn(value));
    },
    addListener: (fn) => state.listeners.push(fn)
  };
})();

// Pitfall 7: Closure Size (Scope Chain Length)

// Deep nesting creates longer scope chains
function level1() {
  const var1 = 1;
  
  function level2() {
    const var2 = 2;
    
    function level3() {
      const var3 = 3;
      
      function level4() {
        const var4 = 4;
        
        // Long scope chain: var4 -> var3 -> var2 -> var1 -> global
        // Property lookup must traverse all levels
        return var1 + var2 + var3 + var4;
      }
      
      return level4();
    }
    
    return level3();
  }
  
  return level2();
}

// Best practices to avoid pitfalls:
console.log("Closure pitfall prevention:");
console.log("1. Be aware of memory implications");
console.log("2. Use let/const instead of var in loops");
console.log("3. Manage 'this' carefully");
console.log("4. Clear references when done");
console.log("5. Avoid deep nesting");
console.log("6. Document closure behavior");
console.log("7. Monitor performance impact");
```

---

## Asynchronous JavaScript

### What is the event loop in JavaScript runtimes?

The event loop continuously checks for tasks and executes them, managing asynchronous operations.

```javascript
// The event loop processes three main queues:
// 1. Call Stack - Synchronous code
// 2. Microtask Queue - Promises, queueMicrotask
// 3. Macrotask Queue - setTimeout, setInterval, I/O

// Visualization of event loop execution:
/*
CALL STACK        MICROTASK QUEUE      MACROTASK QUEUE
    |                   |                    |
 sync code          promises            setTimeout
                    then/catch          setInterval
                    queueMicrotask      I/O operations
*/

// EXAMPLE 1: Event Loop Execution Order

console.log("1. Start"); // Synchronous (call stack)

setTimeout(() => {
  console.log("2. setTimeout"); // Macrotask
}, 0);

Promise.resolve()
  .then(() => {
    console.log("3. Promise"); // Microtask
  })
  .then(() => {
    console.log("4. Promise 2"); // Microtask
  });

queueMicrotask(() => {
  console.log("5. queueMicrotask"); // Microtask
});

console.log("6. End"); // Synchronous (call stack)

// Output order:
// 1. Start
// 6. End
// 3. Promise
// 4. Promise 2
// 5. queueMicrotask
// 2. setTimeout

// Explanation:
// 1. Call stack executes synchronously (1, 6)
// 2. Call stack is empty
// 3. Event loop checks microtask queue (3, 4, 5)
// 4. Microtask queue is empty
// 5. Event loop checks macrotask queue (2)

// EXAMPLE 2: Complex Event Loop Scenario

console.log("=== Complex Scenario ===");
console.log("Script start");

const promise = new Promise(resolve => {
  console.log("Promise constructor");
  resolve("resolved");
});

setTimeout(() => {
  console.log("setTimeout 1");
  Promise.resolve().then(() => {
    console.log("Promise inside setTimeout");
  });
}, 0);

promise.then(
  result => {
    console.log("Promise.then 1:", result);
    
    setTimeout(() => {
      console.log("setTimeout inside Promise.then");
    }, 0);
  }
);

promise.then(
  result => {
    console.log("Promise.then 2:", result);
  }
);

setTimeout(() => {
  console.log("setTimeout 2");
}, 0);

console.log("Script end");

// Output:
// Script start
// Promise constructor
// Script end
// Promise.then 1: resolved
// Promise.then 2: resolved
// setTimeout 1
// Promise inside setTimeout
// setTimeout 2
// setTimeout inside Promise.then

// EXAMPLE 3: Event Loop Visualization with Code

function visualizeEventLoop() {
  console.log("\n=== Event Loop Visualization ===\n");
  
  console.log("1. Synchronous code runs first");
  
  setTimeout(() => {
    console.log("4. Macrotask: setTimeout");
  }, 0);
  
  Promise.resolve()
    .then(() => {
      console.log("2. Microtask: Promise.then");
      return Promise.resolve();
    })
    .then(() => {
      console.log("3. Microtask: Chained Promise.then");
    });
  
  console.log("1. More synchronous code");
}

visualizeEventLoop();

// EXAMPLE 4: Requesters and Microtask Queue Priority

console.log("\n=== Microtask Priority ===\n");

setTimeout(() => console.log("setTimeout 1"), 0);
setTimeout(() => console.log("setTimeout 2"), 0);

Promise.resolve()
  .then(() => console.log("Promise 1"))
  .then(() => console.log("Promise 2"));

queueMicrotask(() => console.log("queueMicrotask 1"));
queueMicrotask(() => console.log("queueMicrotask 2"));

// Output:
// Promise 1
// queueMicrotask 1
// Promise 2
// queueMicrotask 2
// setTimeout 1
// setTimeout 2

// Explanation:
// 1. All microtasks execute before any macrotask
// 2. setTimeout callbacks are macrotasks
// 3. They execute in the order they were queued
// 4. But microtasks always have priority

// Event Loop Phases (detailed):
console.log("\n=== Event Loop Phases ===\n");

function explainEventLoop() {
  // Phase 1: Execute call stack (synchronous)
  console.log("Phase 1: Call stack");
  
  // Phase 2: Execute all microtasks
  Promise.resolve().then(() => {
    console.log("Phase 2: Microtasks (Promise)");
  });
  
  queueMicrotask(() => {
    console.log("Phase 2: Microtasks (queueMicrotask)");
  });
  
  // Phase 3: Execute one macrotask
  setTimeout(() => {
    console.log("Phase 3: One Macrotask");
    
    // After each macrotask, check microtasks again
    Promise.resolve().then(() => {
      console.log("Phase 2 (again): Microtasks after macrotask");
    });
  }, 0);
}

explainEventLoop();

// Key Points:
console.log("\nKey Event Loop Concepts:");
console.log("1. Synchronous code runs immediately");
console.log("2. Callbacks go to either microtask or macrotask queue");
console.log("3. When call stack is empty, check microtask queue");
console.log("4. Execute ALL microtasks before next macrotask");
console.log("5. After each macrotask, check microtask queue again");
console.log("6. Render updates happen between macrotasks (if needed)");

// Practical: Understanding async operations
async function asyncExample() {
  console.log("async start");
  
  // await pauses execution, returns control to event loop
  await Promise.resolve();
  console.log("async after await");
}

console.log("\n=== Async/Await in Event Loop ===\n");
asyncExample();
console.log("after asyncExample call");

// Output:
// async start
// after asyncExample call
// async after await
// (async function continues as microtask)

// Performance implications:
console.log("\n=== Performance Implications ===\n");
console.log("1. Too many microtasks can block rendering");
console.log("2. Heavy computations should use requestAnimationFrame");
console.log("3. Avoid nested setTimeouts (callback hell)");
console.log("4. Use promises for better control flow");

// requestAnimationFrame timing
console.log("\n=== requestAnimationFrame ===\n");

requestAnimationFrame(() => {
  console.log("requestAnimationFrame - renders frame");
});

setTimeout(() => {
  console.log("setTimeout - macrotask");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise - microtask");
});

// Execution order:
// Promise - microtask
// setTimeout - macrotask
// requestAnimationFrame - before next frame render
```

---

### Explain the difference between synchronous and asynchronous functions.

```javascript
// SYNCHRONOUS - Code executes line by line, blocking subsequent code

function synchronousExample() {
  console.log("Step 1");
  
  // Blocks execution for 2 seconds
  const end = Date.now() + 2000;
  while (Date.now() < end) {}
  
  console.log("Step 2"); // Doesn't execute until blocking completes
}

// synchronousExample();
// This will block the entire JavaScript thread

// Problem: Blocks UI, freezes browser
function blockingOperation() {
  console.log("Starting heavy computation");
  
  // Simulate heavy work
  for (let i = 0; i < 1000000000; i++) {
    // Do work...
  }
  
  console.log("Finished"); // Comes much later
}

// ASYNCHRONOUS - Code doesn't block, continues executing

// Method 1: Callbacks
function asynchronousCallback(callback) {
  console.log("Starting async operation");
  
  setTimeout(() => {
    console.log("Async operation complete");
    callback("result");
  }, 1000);
  
  console.log("Operation started, continuing...");
}

asynchronousCallback((result) => {
  console.log("Got result:", result);
});

// Output:
// Starting async operation
// Operation started, continuing...
// Async operation complete
// Got result: result

// Method 2: Promises
function asynchronousPromise() {
  console.log("Starting promise operation");
  
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Promise resolved");
      resolve("result");
    }, 1000);
  });
}

asynchronousPromise()
  .then(result => {
    console.log("Got result:", result);
  });

// Method 3: Async/Await
async function asynchronousAsync() {
  console.log("Starting async/await operation");
  
  const result = await new Promise(resolve => {
    setTimeout(() => {
      resolve("result");
    }, 1000);
  });
  
  console.log("Operation complete");
  return result;
}

// asynchronousAsync().then(result => {
//   console.log("Got result:", result);
// });

// Practical Comparison:

// SYNCHRONOUS: Reading a file
function readFileSynchronous(filename) {
  // This blocks
  return "file contents";
}

const data = readFileSynchronous("file.txt");
console.log(data); // Blocks until file is read

// ASYNCHRONOUS: Reading a file

// With callbacks
function readFileCallback(filename, callback) {
  setTimeout(() => {
    callback("file contents");
  }, 100);
}

console.log("Before read");
readFileCallback("file.txt", (data) => {
  console.log("File data:", data);
});
console.log("After read"); // Executes immediately

// With Promises
function readFilePromise(filename) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("file contents");
    }, 100);
  });
}

readFilePromise("file.txt")
  .then(data => console.log("File data:", data));

// With async/await
async function readFileAsync(filename) {
  const data = await readFilePromise(filename);
  console.log("File data:", data);
  return data;
}

readFileAsync("file.txt");

// Comparison Table:

console.log("\nSYNCHRONOUS:");
console.log("- Blocks execution");
console.log("- Next line waits for current to finish");
console.log("- Freezes UI if long-running");
console.log("- Simple to understand");
console.log("- Code executes top to bottom");

console.log("ASYNCHRONOUS:");
console.log("- Non-blocking");
console.log("- Continues to next line immediately");
console.log("- UI remains responsive");
console.log("- More complex control flow");
console.log("- Requires callbacks/promises/async-await");

// Real-world example: Fetching data

// Synchronous approach (if it existed)
// const user = fetchUser(1); // Blocks until response
// const posts = fetchPosts(1); // Blocks until response
// console.log(user, posts);

// Asynchronous: Promises
function fetchUserAsync(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: "John" });
    }, 500);
  });
}

function fetchPostsAsync(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ id: 1, title: "Post 1" }]);
    }, 500);
  });
}

// Sequential (waits for user, then posts)
fetchUserAsync(1)
  .then(user => {
    console.log("User:", user);
    return fetchPostsAsync(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts);
  });

// Parallel (fetches both simultaneously)
Promise.all([fetchUserAsync(1), fetchPostsAsync(1)])
  .then(([user, posts]) => {
    console.log("User:", user);
    console.log("Posts:", posts);
  });

// Asynchronous: Async/Await (cleaner syntax)
async function getUserAndPosts(userId) {
  try {
    // Sequential
    const user = await fetchUserAsync(userId);
    console.log("User:", user);
    
    const posts = await fetchPostsAsync(user.id);
    console.log("Posts:", posts);
    
    return { user, posts };
  } catch (error) {
    console.error("Error:", error);
  }
}

async function getUserAndPostsParallel(userId) {
  try {
    // Parallel
    const [user, posts] = await Promise.all([
      fetchUserAsync(userId),
      fetchPostsAsync(userId)
    ]);
    
    console.log("User:", user);
    console.log("Posts:", posts);
    
    return { user, posts };
  } catch (error) {
    console.error("Error:", error);
  }
}

// Performance example

// Synchronous (blocks for 3 seconds)
function blockingCalculation() {
  console.time("blocking");
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) {
    sum += i;
  }
  console.timeEnd("blocking");
  return sum;
}

// Asynchronous (doesn't block)
function nonBlockingCalculation() {
  console.log("Starting calculation...");
  
  return new Promise(resolve => {
    setTimeout(() => {
      let sum = 0;
      for (let i = 0; i < 100000000; i++) {
        sum += i;
      }
      console.log("Calculation complete");
      resolve(sum);
    }, 0);
  });
}

// blockingCalculation(); // Freezes execution

// nonBlockingCalculation(); // Doesn't freeze

// When to use each:

console.log("\nWhen to use SYNCHRONOUS:");
console.log("- Quick, simple operations");
console.log("- No external I/O");
console.log("- Short computations");

console.log("When to use ASYNCHRONOUS:");
console.log("- API calls");
console.log("- File I/O");
console.log("- Long computations");
console.log("- User interactions");
console.log("- Database queries");
```

---

### What are Promises and how do they work?

```javascript
// Promises represent the eventual result of an async operation

// Promise states:
// 1. PENDING - Initial state
// 2. FULFILLED - Resolved with value
// 3. REJECTED - Rejected with error

// CREATING PROMISES

// Promise constructor
const myPromise = new Promise((resolve, reject) => {
  // Async operation
  const success = true;
  
  if (success) {
    resolve("Success!"); // Fulfill promise
  } else {
    reject("Error!"); // Reject promise
  }
});

// Consuming the promise
myPromise
  .then(result => {
    console.log(result); // "Success!"
  })
  .catch(error => {
    console.error(error); // Called if rejected
  })
  .finally(() => {
    console.log("Complete"); // Always runs
  });

// PROMISE EXAMPLES

// Example 1: Simulating async operation
function fetchData(url) {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    
    setTimeout(() => {
      if (success) {
        resolve({ data: "some data" });
      } else {
        reject(new Error("Network error"));
      }
    }, 1000);
  });
}

fetchData("api.example.com")
  .then(response => {
    console.log("Data:", response);
    return response.data;
  })
  .then(data => {
    console.log("Processed:", data);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });

// Example 2: Promise chaining
function step1() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Step 1 complete");
      resolve(1);
    }, 1000);
  });
}

function step2(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Step 2 complete, received:", data);
      resolve(data + 1);
    }, 1000);
  });
}

function step3(data) {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("Step 3 complete, received:", data);
      resolve(data + 1);
    }, 1000);
  });
}

// Chain multiple promises
step1()
  .then(data => step2(data))
  .then(data => step3(data))
  .then(result => {
    console.log("Final result:", result); // 3
  });

// Example 3: Promise.resolve() and Promise.reject()

// Instantly resolved
Promise.resolve("Done")
  .then(value => console.log(value)); // "Done"

// Instantly rejected
Promise.reject("Error")
  .catch(error => console.error(error)); // "Error"

// Example 4: Promise utilities

// Promise.all - All must resolve
Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
])
  .then(results => console.log(results)); // [1, 2, 3]

// If any rejects, all rejects
Promise.all([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3)
])
  .catch(error => console.error(error)); // "Error"

// Promise.race - First to settle wins
Promise.race([
  new Promise(r => setTimeout(() => r(1), 100)),
  new Promise(r => setTimeout(() => r(2), 50))
])
  .then(result => console.log(result)); // 2

// Promise.allSettled - All settle (not fail)
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3)
])
  .then(results => {
    console.log(results);
    // [
    //   { status: "fulfilled", value: 1 },
    //   { status: "rejected", reason: "Error" },
    //   { status: "fulfilled", value: 3 }
    // ]
  });

// Promise.any - First fulfilled (opposite of race)
Promise.any([
  Promise.reject("Error 1"),
  Promise.resolve(2),
  Promise.reject("Error 2")
])
  .then(result => console.log(result)); // 2

// PROMISE PATTERNS

// Pattern 1: Wait for multiple async operations
const promise1 = fetchData("url1");
const promise2 = fetchData("url2");
const promise3 = fetchData("url3");

Promise.all([promise1, promise2, promise3])
  .then(([data1, data2, data3]) => {
    console.log("All data:", data1, data2, data3);
  });

// Pattern 2: Retry logic
function retryPromise(fn, retries = 3) {
  return fn().catch(error => {
    if (retries > 0) {
      console.log("Retrying...");
      return retryPromise(fn, retries - 1);
    }
    throw error;
  });
}

// Pattern 3: Timeout
function promiseWithTimeout(promise, timeoutMs) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), timeoutMs)
    )
  ]);
}

// Pattern 4: Converting callbacks to promises
function callbackFunction(callback) {
  setTimeout(() => {
    callback(null, "result");
  }, 1000);
}

// Promisify
function promisify(fn) {
  return new Promise((resolve, reject) => {
    fn((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

// COMMON PATTERNS

// Converting callback to promise
function readFile(filename) {
  return new Promise((resolve, reject) => {
    // Simulate file reading
    setTimeout(() => {
      resolve("file contents");
    }, 100);
  });
}

readFile("file.txt").then(contents => {
  console.log("Contents:", contents);
});

// Promise then() returns a new promise
const p1 = Promise.resolve(1);
const p2 = p1.then(value => value + 1);
const p3 = p2.then(value => value + 1);

p3.then(value => console.log(value)); // 3

// Each then() returns a new promise
console.log(p1 === p2); // false
console.log(p2 === p3); // false

// Error handling
Promise.reject("Error")
  .then(() => console.log("Never runs"))
  .catch(error => {
    console.log("Caught error:", error);
    return "recovered"; // Can return from catch
  })
  .then(value => {
    console.log("Recovered with:", value);
  });

// Finally always runs
Promise.resolve("done")
  .finally(() => {
    console.log("Cleanup");
  })
  .then(value => {
    console.log("Value:", value);
  });
```

---

### Explain the different states of a Promise.

```javascript
// PROMISE STATES (Can only change once)

// State 1: PENDING (Initial state)
const pendingPromise = new Promise((resolve, reject) => {
  // Promise is pending until resolve or reject is called
  // This will stay pending
});

console.log(pendingPromise); // Promise { <pending> }

// State 2: FULFILLED (Resolved successfully)
const fulfilledPromise = new Promise((resolve) => {
  resolve("Success!");
});

// After a tick, it's fulfilled
setTimeout(() => {
  console.log(fulfilledPromise); // Promise { "Success!" }
}, 0);

// State 3: REJECTED (Failed)
const rejectedPromise = new Promise((_, reject) => {
  reject(new Error("Failed!"));
});

// After a tick, it's rejected
setTimeout(() => {
  console.log(rejectedPromise); // Promise { <rejected> Error: Failed! }
}, 0);

// STATE TRANSITIONS

// Once fulfilled, cannot change
const once = new Promise((resolve, reject) => {
  resolve("First");
  resolve("Second"); // Ignored
  reject("Error");    // Ignored
});

once.then(value => console.log(value)); // "First"

// Once rejected, cannot change
const rejected = new Promise((resolve, reject) => {
  reject("First");
  reject("Second"); // Ignored
  resolve("Done");  // Ignored
});

rejected.catch(error => console.log(error)); // "First"

// STATE DETAILS

// Fulfilled state
const fulfilled = new Promise(resolve => {
  resolve({ id: 1, name: "John" });
});

fulfilled
  .then(value => {
    console.log("Fulfilled with:", value);
    // {
    //   id: 1,
    //   name: "John"
    // }
  });

// Rejected state
const rejected2 = new Promise((_, reject) => {
  reject(new Error("Network error"));
});

rejected2
  .catch(error => {
    console.log("Rejected with:", error.message); // "Network error"
  });

// Checking promise state (not directly possible, but observable through handlers)

function checkState(promise) {
  const pending = new Promise(resolve => {
    promise
      .then(() => resolve("fulfilled"))
      .catch(() => resolve("rejected"));
    
    setTimeout(() => resolve("pending"), 0);
  });
  
  return pending;
}

// checkState(fulfilledPromise).then(state => console.log(state)); // "fulfilled"

// STATE FLOW DIAGRAM
/*
            +-------+
            | PENDING |
            +-------+
               |
        +------+------+
        |             |
      resolve      reject
        |             |
        v             v
    +-----------+  +-----------+
    | FULFILLED |  | REJECTED  |
    +-----------+  +-----------+
        (terminal)    (terminal)

Key points:
- Starts in PENDING state
- Can transition to FULFILLED or REJECTED
- Once in FULFILLED or REJECTED, cannot change
- Cannot transition from FULFILLED to REJECTED or vice versa
*/

// HANDLING DIFFERENT STATES

// Handling fulfilled
const completedPromise = Promise.resolve("Done!");

completedPromise
  .then(result => {
    console.log("State: Fulfilled");
    console.log("Value:", result);
  });

// Handling rejected
const failedPromise = Promise.reject(new Error("Failed!"));

failedPromise
  .catch(error => {
    console.log("State: Rejected");
    console.log("Reason:", error.message);
  });

// Both handlers
const somePromise = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  if (success) {
    resolve("Success!");
  } else {
    reject(new Error("Failure!"));
  }
});

somePromise
  .then(
    result => {
      // Fulfilled
      console.log("Fulfilled:", result);
    },
    error => {
      // Rejected
      console.log("Rejected:", error.message);
    }
  );

// Or using .then() and .catch()
somePromise
  .then(result => {
    console.log("Fulfilled:", result);
  })
  .catch(error => {
    console.log("Rejected:", error.message);
  });

// FINAL STATE IS IMMUTABLE

const immutable = new Promise((resolve, reject) => {
  resolve("First state");
  
  // These have no effect
  resolve("Cannot change");
  reject("Also cannot change");
});

immutable.then(value => {
  console.log(value); // Always "First state"
});

// Manually checking promise state (advanced)
const checkPromiseState = (promise) => {
  return Promise.race([
    promise.then(
      value => ({ state: "fulfilled", value }),
      reason => ({ state: "rejected", reason })
    ),
    new Promise(resolve => {
      setTimeout(() => resolve({ state: "pending" }), 0);
    })
  ]);
};

// Using async/await to understand states
async function demonstrateStates() {
  // Fulfilled state
  const fulfilled = Promise.resolve("Value");
  const value = await fulfilled;
  console.log("Fulfilled value:", value); // "Value"
  
  // Rejected state
  const rejected = Promise.reject("Error");
  try {
    await rejected;
  } catch (error) {
    console.log("Rejected reason:", error); // "Error"
  }
}

// demonstrateStates();

// PRACTICAL: State-dependent logic

function handleState(promise) {
  console.log("Initial state: pending");
  
  promise
    .then(value => {
      console.log("Final state: fulfilled");
      console.log("Value:", value);
      // Can now safely use value
    })
    .catch(error => {
      console.log("Final state: rejected");
      console.log("Error:", error.message);
      // Can now safely handle error
    })
    .finally(() => {
      console.log("Cleanup regardless of state");
    });
}

// State determines what handlers run:
console.log("\nState -> Handlers:");
console.log("Fulfilled -> then() handler runs");
console.log("Rejected -> catch() handler runs");
console.log("Pending -> No handlers run");
console.log("Finally -> Always runs regardless of state");
```

---

### What are the pros and cons of using Promises instead of callbacks?

```javascript
// CALLBACK APPROACH

function fetchUserCallback(id, callback) {
  setTimeout(() => {
    if (id > 0) {
      callback(null, { id, name: "John" });
    } else {
      callback("Invalid ID", null);
    }
  }, 100);
}

function fetchUserPostsCallback(userId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" }
    ]);
  }, 100);
}

// Callback hell (Pyramid of Doom)
fetchUserCallback(1, (err, user) => {
  if (err) {
    console.error("Error fetching user:", err);
  } else {
    console.log("User:", user);
    
    fetchUserPostsCallback(user.id, (err, posts) => {
      if (err) {
        console.error("Error fetching posts:", err);
      } else {
        console.log("Posts:", posts);
        
        // More nested callbacks...
        // This can get deeply nested
      }
    });
  }
});

// PROMISE APPROACH

function fetchUserPromise(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) {
        resolve({ id, name: "John" });
      } else {
        reject("Invalid ID");
      }
    }, 100);
  });
}

function fetchUserPostsPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" }
      ]);
    }, 100);
  });
}

// Much cleaner chaining
fetchUserPromise(1)
  .then(user => {
    console.log("User:", user);
    return fetchUserPostsPromise(user.id);
  })
  .then(posts => {
    console.log("Posts:", posts);
  })
  .catch(err => {
    console.error("Error:", err);
  });

// PROS AND CONS

console.log("\n=== CALLBACKS ===\n");

console.log("PROS:");
console.log("1. Simple for basic async operations");
console.log("2. No additional library needed (historical)");
console.log("3. Direct control over execution");
console.log("4. Memory footprint can be smaller");

console.log("\nCONS:");
console.log("1. Callback hell / Pyramid of Doom");
console.log("2. Hard to read nested callbacks");
console.log("3. Error handling is inconsistent");
console.log("4. Difficult to compose operations");
console.log("5. Code duplication in error handling");
console.log("6. Hard to debug complex flows");
console.log("7. Race conditions in parallel operations");

console.log("\n=== PROMISES ===\n");

console.log("PROS:");
console.log("1. Cleaner, more readable code");
console.log("2. Better error handling with catch()");
console.log("3. Composable with .then() chaining");
console.log("4. Utilities like Promise.all(), Promise.race()");
console.log("5. Single error handler for entire chain");
console.log("6. Easier to debug");
console.log("7. Built-in state management");
console.log("8. Standard ES6 feature");

console.log("\nCONS:");
console.log("1. Still has callback functions (.then())");
console.log("2. Slightly more complex syntax");
console.log("3. Requires understanding of state/transitions");
console.log("4. Nested promises can still get complex");
console.log("5. Unhandled rejection can cause issues");

// DETAILED COMPARISON

// Error Handling: Callback Style
function operationCallback(callback) {
  asyncTask((err, data) => {
    if (err) {
      callback(err, null);
    } else {
      processData(data, (err, result) => {
        if (err) {
          callback(err, null); // Error handling repeated
        } else {
          callback(null, result);
        }
      });
    }
  });
}

// Error Handling: Promise Style
function operationPromise() {
  return asyncTask()
    .then(data => processData(data))
    .catch(err => {
      // Single error handler for entire chain
      console.error("Error:", err);
      // Can recover or re-throw
      throw err;
    });
}

// Parallel Operations: Callback Hell
let userDone = false;
let postsDone = false;
let commentsDone = false;
const results = {};

fetchUserCallback(1, (err, user) => {
  if (!err) results.user = user;
  userDone = true;
});

fetchUserPostsCallback(1, (err, posts) => {
  if (!err) results.posts = posts;
  postsDone = true;
});

// How do we know when all are done? Need manual tracking!

// Parallel Operations: Promise Style (Much simpler)
Promise.all([
  fetchUserPromise(1),
  fetchUserPostsPromise(1)
])
  .then(([user, posts]) => {
    console.log("All data:", { user, posts });
  })
  .catch(err => console.error("Error:", err));

// Callback Hell Example
function deepNesting(step1, step2, step3, step4) {
  step1((err, result1) => {
    if (err) {
      console.error("Step 1 error:", err);
    } else {
      step2(result1, (err, result2) => {
        if (err) {
          console.error("Step 2 error:", err);
        } else {
          step3(result2, (err, result3) => {
            if (err) {
              console.error("Step 3 error:", err);
            } else {
              step4(result3, (err, result4) => {
                if (err) {
                  console.error("Step 4 error:", err);
                } else {
                  console.log("Final result:", result4);
                }
              });
            }
          });
        }
      });
    }
  });
}

// Same with Promises (Much cleaner!)
function cleanFlow(step1, step2, step3, step4) {
  return step1()
    .then(result1 => step2(result1))
    .then(result2 => step3(result2))
    .then(result3 => step4(result3))
    .then(result4 => {
      console.log("Final result:", result4);
      return result4;
    })
    .catch(err => console.error("Error:", err));
}

// Readability Example

// Callback style
const callbackReadability = `
function loadData(id, callback) {
  getUser(id, (err, user) => {
    if (err) callback(err);
    else getPosts(user.id, (err, posts) => {
      if (err) callback(err);
      else getComments(posts[0].id, (err, comments) => {
        if (err) callback(err);
        else callback(null, { user, posts, comments });
      });
    });
  });
}
`;

// Promise style
const promiseReadability = `
function loadData(id) {
  return getUser(id)
    .then(user => getPosts(user.id)
      .then(posts => ({ user, posts }))
    )
    .then(({ user, posts }) => getComments(posts[0].id)
      .then(comments => ({ user, posts, comments }))
    );
}
`;

// Async/await style (best)
const asyncReadability = `
async function loadData(id) {
  const user = await getUser(id);
  const posts = await getPosts(user.id);
  const comments = await getComments(posts[0].id);
  return { user, posts, comments };
}
`;

console.log("\n=== EVOLUTION OF ASYNC PATTERNS ===");
console.log("Callbacks -> Promises -> Async/Await");
console.log("Each improves readability and maintainability");

// When to use each:

console.log("\nWhen to use CALLBACKS:");
console.log("- Very simple async operations");
console.log("- Single async call");
console.log("- Working with legacy code");

console.log("When to use PROMISES:");
console.log("- Multiple async operations");
console.log("- Need parallel/sequential operations");
console.log("- Complex error handling needed");
console.log("- Readable code is important");

console.log("When to use ASYNC/AWAIT:");
console.log("- Multiple async operations");
console.log("- Want synchronous-looking code");
console.log("- Need to handle errors with try/catch");
console.log("- Modern code (ES2017+)");

// SUMMARY
console.log("\n=== SUMMARY ===");
console.log("Promises are generally better than callbacks:");
console.log("1. Avoids callback hell");
console.log("2. Better error handling");
console.log("3. Easier to compose");
console.log("4. More readable code");
console.log("5. Built-in utilities");
console.log("\nAsync/await is even better (built on promises)");
console.log("Use promises/async-await in modern code");
```

---

### What is the use of Promise.all()?

```javascript
// Promise.all() waits for ALL promises to resolve
// Returns array of results in same order
// If ANY promise rejects, entire all() rejects

// BASIC USAGE

const promise1 = Promise.resolve(1);
const promise2 = Promise.resolve(2);
const promise3 = Promise.resolve(3);

Promise.all([promise1, promise2, promise3])
  .then(results => {
    console.log(results); // [1, 2, 3]
  });

// PRACTICAL EXAMPLES

// Example 1: Fetching multiple resources in parallel

function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: "User" + id });
    }, 100);
  });
}

function fetchPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ id: 1, title: "Post 1" }]);
    }, 150);
  });
}

function fetchComments(postId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ id: 1, text: "Comment 1" }]);
    }, 120);
  });
}

// Without Promise.all (sequential - slow)
console.time("Sequential");
fetchUser(1)
  .then(user => fetchPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => {
    console.log("Sequential complete");
    console.timeEnd("Sequential"); // ~370ms
  });

// With Promise.all (parallel - fast)
console.time("Parallel");
Promise.all([
  fetchUser(1),
  fetchPosts(1),
  fetchComments(1)
])
  .then(([user, posts, comments]) => {
    console.log("Parallel complete");
    console.timeEnd("Parallel"); // ~150ms
  });

// Example 2: Fetching multiple users
const userIds = [1, 2, 3, 4, 5];

Promise.all(userIds.map(id => fetchUser(id)))
  .then(users => {
    console.log("All users:", users);
  });

// Example 3: Error handling with Promise.all

const promises = [
  Promise.resolve(1),
  Promise.reject("Error!"),
  Promise.resolve(3)
];

Promise.all(promises)
  .then(results => {
    console.log(results); // Never reached
  })
  .catch(error => {
    console.log("Caught error:", error); // "Error!"
  });

// If ANY rejects, the whole Promise.all rejects
// The error is from the first rejection

// Example 4: Complex scenario

function loadPageData(pageId) {
  return Promise.all([
    fetch(`/api/page/${pageId}`).then(r => r.json()),
    fetch(`/api/page/${pageId}/sidebar`).then(r => r.json()),
    fetch(`/api/page/${pageId}/comments`).then(r => r.json()),
    fetch(`/api/user/profile`).then(r => r.json())
  ])
    .then(([page, sidebar, comments, userProfile]) => {
      return {
        page,
        sidebar,
        comments,
        userProfile
      };
    })
    .catch(err => {
      console.error("Failed to load page data:", err);
      // Partial load or fallback
      return null;
    });
}

// PROMISE.ALL VS OTHER METHODS

// Promise.all - Wait for all, fail if ANY fails
console.log("Promise.all:");
console.log("- All must resolve");
console.log("- Returns array in order");
console.log("- Rejects on first failure");
console.log("- Fast (parallel)");

// Promise.race - First to settle wins
console.log("\nPromise.race:");
console.log("- First to resolve or reject wins");
console.log("- Used for timeouts");

// Promise.allSettled - All settle (don't fail on rejection)
console.log("Promise.allSettled:");
console.log("- All must settle (not fail)");
console.log("- Returns status objects");
console.log("- Never rejects");

// COMPARISON

// Using Promise.all
Promise.all([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3)
])
  .catch(err => console.log("all() failed:", err)); // "all() failed: Error"

// Using Promise.allSettled
Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("Error"),
  Promise.resolve(3)
])
  .then(results => {
    console.log("allSettled() succeeded:");
    results.forEach(r => {
      if (r.status === "fulfilled") {
        console.log("  Success:", r.value);
      } else {
        console.log("  Failed:", r.reason);
      }
    });
  });

// ADVANCED PATTERNS

// Pattern 1: Handling partially failed requests
async function robustLoadData() {
  const results = await Promise.allSettled([
    fetchUser(1),
    fetchUser(2),
    fetchUser(3)
  ]);
  
  const users = [];
  const errors = [];
  
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      users.push(result.value);
    } else {
      errors.push({ index, reason: result.reason });
    }
  });
  
  return { users, errors };
}

// Pattern 2: Timeout with Promise.all and Promise.race
function withTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), ms)
    )
  ]);
}

Promise.all([
  withTimeout(fetchUser(1), 1000),
  withTimeout(fetchUser(2), 1000),
  withTimeout(fetchUser(3), 1000)
])
  .then(users => console.log("Users:", users))
  .catch(err => console.error("Error:", err));

// Pattern 3: Sequential vs Parallel decision

// Use Promise.all when operations are independent
// (faster, parallelizable)
function independentOperations() {
  return Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/products").then(r => r.json()),
    fetch("/api/categories").then(r => r.json())
  ]);
}

// Use sequential when operations depend on each other
// (order matters)
async function dependentOperations() {
  const user = await fetch("/api/user").then(r => r.json());
  const userPosts = await fetch(`/api/user/${user.id}/posts`).then(r => r.json());
  const firstPostComments = await fetch(`/api/posts/${userPosts[0].id}/comments`).then(r => r.json());
  
  return { user, userPosts, firstPostComments };
}

// COMMON MISTAKES

console.log("\n=== COMMON MISTAKES ===\n");

// Mistake 1: Not handling rejection
// This will cause unhandled rejection!
// Promise.all([
//   Promise.reject("Error")
// ]); // Should have .catch()!

// Mistake 2: Not returning promises from array
const items = [1, 2, 3];
// Promise.all(items.map(i => i * 2)); // Not promises!
Promise.all(items.map(i => Promise.resolve(i * 2))); // Correct

// Mistake 3: Using Promise.all for sequential operations (inefficient)
// This runs each in sequence unnecessarily
const sequential = await Promise.all([
  asyncOp1(),
  asyncOp2().then(() => asyncOp3()), // Waits for asyncOp1 unnecessarily
]);

// Better: use then chain
const better = await asyncOp1()
  .then(() => asyncOp2())
  .then(() => asyncOp3());

// PERFORMANCE CONSIDERATION

console.log("\nPerformance:");
console.log("Promise.all is fast for parallel operations");
console.log("Makes 3 requests simultaneously instead of sequentially");
console.log("Total time ≈ longest individual request (not sum)");
```

---

### How is Promise.all() different from Promise.allSettled()?

```javascript
// PROMISE.ALL vs PROMISE.ALLSETTLED

// Promise.all - All must resolve, rejects on first failure
const allPromise = Promise.all([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]);

allPromise.then(results => {
  console.log("All results:", results); // [1, 2, 3]
});

// If ANY rejects, all rejects
const allWithReject = Promise.all([
  Promise.resolve(1),
  Promise.reject("Error!"),
  Promise.resolve(3)
]);

allWithReject
  .then(results => console.log(results)) // Never runs
  .catch(err => console.log("Error:", err)); // "Error!"

// Promise.allSettled - All settle (success or failure)
const allSettledPromise = Promise.allSettled([
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
]);

allSettledPromise.then(results => {
  console.log("AllSettled results:");
  results.forEach(r => {
    if (r.status === "fulfilled") {
      console.log("  Success:", r.value);
    } else {
      console.log("  Failed:", r.reason);
    }
  });
  // Success: 1
  // Success: 2
  // Success: 3
});

// allSettled never rejects (returns status objects)
const allSettledWithReject = Promise.allSettled([
  Promise.resolve(1),
  Promise.reject("Error!"),
  Promise.resolve(3)
]);

allSettledWithReject
  .then(results => {
    console.log("Results:");
    results.forEach((r, i) => {
      console.log(`${i}:`, r);
    });
    // 0: { status: "fulfilled", value: 1 }
    // 1: { status: "rejected", reason: "Error!" }
    // 2: { status: "fulfilled", value: 3 }
  })
  .catch(err => console.log("Error:", err)); // Never runs

// COMPARISON TABLE

const comparison = {
  "Promise.all": {
    "Returns on": "First rejection or all fulfill",
    "Behavior on rejection": "Rejects immediately",
    "Result format": "Array of values",
    "Use case": "All-or-nothing operations"
  },
  "Promise.allSettled": {
    "Returns on": "All settle (always succeeds)",
    "Behavior on rejection": "Never rejects",
    "Result format": "Array of status objects",
    "Use case": "Partial success acceptable"
  }
};

console.log("COMPARISON:");
console.log(comparison);

// DETAILED COMPARISON

console.log("\n=== DETAILED COMPARISON ===\n");

console.log("Promise.all:");
console.log("- Returns: Array of values");
console.log("  [1, 2, 3]");
console.log("- On rejection: Immediately rejects");
console.log("  Promise.all([p1, reject, p3]) → caught by .catch()");
console.log("- Use when: All operations must succeed");

console.log("\nPromise.allSettled:");
console.log("- Returns: Array of status objects");
console.log("  [");
console.log("    { status: 'fulfilled', value: 1 },");
console.log("    { status: 'rejected', reason: Error },");
console.log("    { status: 'fulfilled', value: 3 }");
console.log("  ]");
console.log("- On rejection: Never rejects (always resolves)");
console.log("- Use when: Partial success is acceptable");

// PRACTICAL EXAMPLES

// Example 1: API requests - when all must succeed
function fetchAllUserData(userIds) {
  // Use Promise.all when you need ALL to succeed
  return Promise.all(
    userIds.map(id => fetch(`/api/users/${id}`).then(r => r.json()))
  )
    .then(users => {
      console.log("All users loaded:", users);
      return users;
    })
    .catch(err => {
      console.error("Failed to load all users:", err);
      // Can't continue without all users
      throw err;
    });
}

// Example 2: Form validation - partial success acceptable
async function validateFormFields(formData) {
  // Use allSettled when you want to validate all fields
  // even if some fail
  const results = await Promise.allSettled([
    validateEmail(formData.email),
    validatePassword(formData.password),
    validateUsername(formData.username),
    validateAge(formData.age)
  ]);
  
  const errors = {};
  const valid = {};
  
  results.forEach((result, index) => {
    const fieldNames = ["email", "password", "username", "age"];
    const fieldName = fieldNames[index];
    
    if (result.status === "fulfilled") {
      valid[fieldName] = result.value;
    } else {
      errors[fieldName] = result.reason;
    }
  });
  
  return { valid, errors };
}

// Example 3: Image loading - some can fail
async function loadImages(urls) {
  // allSettled - if some images fail, we still get the others
  const results = await Promise.allSettled(
    urls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = () => reject(`Failed to load ${url}`);
        img.src = url;
      });
    })
  );
  
  const loaded = [];
  const failed = [];
  
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      loaded.push(result.value);
    } else {
      failed.push(result.reason);
    }
  });
  
  console.log(`Loaded ${loaded.length} images, ${failed.length} failed`);
  return { loaded, failed };
}

// Example 4: Database operations - all must succeed or rollback
async function transactionalUpdate(updates) {
  // Use Promise.all when any failure should fail entire operation
  try {
    const results = await Promise.all(
      updates.map(update => updateDatabase(update))
    );
    console.log("All updates successful:", results);
    return results;
  } catch (err) {
    console.error("Update failed, rolling back...", err);
    // Rollback logic here
    throw err;
  }
}

// CHOOSING THE RIGHT ONE

console.log("\n=== WHEN TO USE ===\n");

console.log("Use Promise.all when:");
console.log("1. All operations must succeed");
console.log("2. One failure should fail everything");
console.log("3. You want values directly in array");
console.log("4. Example: Loading all critical resources");
console.log("5. Example: Database transactions");
console.log("6. Example: Form submission (all fields must be valid)");

console.log("\nUse Promise.allSettled when:");
console.log("1. Partial success is acceptable");
console.log("2. You need to know about failures but continue");
console.log("3. You need to handle each result differently");
console.log("4. Example: Downloading multiple files (some might fail)");
console.log("5. Example: Validating multiple form fields");
console.log("6. Example: Batch image uploads");

// IMPLEMENTATION DIFFERENCES

// Promise.all simplified implementation
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject); // Reject on first error
    });
  });
}

// Promise.allSettled simplified implementation
function myPromiseAllSettled(promises) {
  return new Promise((resolve) => {
    const results = [];
    let completed = 0;
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = { status: "fulfilled", value };
        })
        .catch(reason => {
          results[index] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results); // Always resolve
          }
        });
    });
  });
}

// EDGE CASES

console.log("\n=== EDGE CASES ===\n");

// Empty array
Promise.all([]).then(results => {
  console.log("Empty Promise.all:", results); // []
});

Promise.allSettled([]).then(results => {
  console.log("Empty Promise.allSettled:", results); // []
});

// Non-promise values
Promise.all([1, 2, "string"]).then(results => {
  console.log("Non-promise values in all():", results); // [1, 2, "string"]
});

Promise.allSettled([1, Promise.resolve(2)]).then(results => {
  console.log("Mixed in allSettled():");
  console.log(results);
  // [
  //   { status: "fulfilled", value: 1 },
  //   { status: "fulfilled", value: 2 }
  // ]
});

// Synchronous errors in promise constructor
Promise.allSettled([
  new Promise(() => {
    throw new Error("Sync error"); // Caught by allSettled
  })
])
  .then(results => {
    console.log("Sync error in allSettled:", results);
    // [{ status: "rejected", reason: Error }]
  });
```

---

### What is async/await and how does it simplify asynchronous code?

```javascript
// Async/await is syntactic sugar over promises
// Makes asynchronous code look synchronous
// Easier to read and understand

// BASIC SYNTAX

// Function must be declared with 'async'
async function myAsyncFunction() {
  // await pauses execution until promise resolves
  const result = await somePromise();
  return result;
}

// EXAMPLE 1: Simple async/await

function fetchUser(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ id, name: "John", age: 30 });
    }, 1000);
  });
}

// Without async/await (Promise style)
function getUserWithPromise(id) {
  return fetchUser(id)
    .then(user => {
      console.log("User:", user);
      return user;
    });
}

// With async/await (synchronous-looking)
async function getUserWithAsyncAwait(id) {
  console.log("Fetching user...");
  const user = await fetchUser(id);
  console.log("User:", user);
  return user;
}

// getUserWithAsyncAwait(1); // Much cleaner!

// EXAMPLE 2: Sequential operations

function fetchUserData(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ userId, name: "John" });
    }, 500);
  });
}

function fetchUserPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ id: 1, title: "Post 1" }]);
    }, 500);
  });
}

// Promise style (multiple chains)
function loadUserDataPromise(userId) {
  return fetchUserData(userId)
    .then(user => {
      return fetchUserPosts(user.userId)
        .then(posts => ({ user, posts }));
    });
}

// Async/await style (cleaner)
async function loadUserDataAsync(userId) {
  const user = await fetchUserData(userId);
  const posts = await fetchUserPosts(user.userId);
  return { user, posts };
}

// EXAMPLE 3: Error handling

// Promise style
function operationWithErrorPromise() {
  return riskyOperation()
    .then(result => {
      return processResult(result);
    })
    .catch(error => {
      console.error("Error:", error);
      // Handle error
      return null;
    });
}

// Async/await style (try/catch)
async function operationWithErrorAsync() {
  try {
    const result = await riskyOperation();
    const processed = await processResult(result);
    return processed;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

function riskyOperation() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      resolve("Success!");
    } else {
      reject(new Error("Failed!"));
    }
  });
}

function processResult(result) {
  return Promise.resolve(result.toUpperCase());
}

// EXAMPLE 4: Parallel operations

// Promise style
function loadAllDataPromise() {
  return Promise.all([
    fetchUserData(1),
    fetchUserPosts(1)
  ])
    .then(([user, posts]) => {
      return { user, posts };
    });
}

// Async/await style
async function loadAllDataAsync() {
  const [user, posts] = await Promise.all([
    fetchUserData(1),
    fetchUserPosts(1)
  ]);
  return { user, posts };
}

// ASYNC/AWAIT BENEFITS

console.log("\n=== ASYNC/AWAIT BENEFITS ===\n");

console.log("1. Looks like synchronous code");
console.log("2. Easier to understand flow");
console.log("3. Better error handling with try/catch");
console.log("4. Can use loops and conditionals naturally");
console.log("5. Debugging is easier (stack traces)");
console.log("6. More concise than promise chains");

// EXAMPLE 5: Complex flow with loops

// Promise style (awkward)
function loadMultipleUsersPromise(userIds) {
  const users = [];
  
  return userIds.reduce((promise, userId) => {
    return promise.then(() => {
      return fetchUserData(userId).then(user => {
        users.push(user);
      });
    });
  }, Promise.resolve())
    .then(() => users);
}

// Async/await style (natural)
async function loadMultipleUsersAsync(userIds) {
  const users = [];
  
  for (const userId of userIds) {
    const user = await fetchUserData(userId);
    users.push(user);
  }
  
  return users;
}

// Even better: with Promise.all (parallel)
async function loadMultipleUsersParallel(userIds) {
  const users = await Promise.all(
    userIds.map(id => fetchUserData(id))
  );
  return users;
}

// EXAMPLE 6: Conditional logic

async function getDataConditionally(userId) {
  try {
    const user = await fetchUserData(userId);
    
    if (user.age > 18) {
      const posts = await fetchUserPosts(userId);
      return { user, posts };
    } else {
      return { user, posts: null };
    }
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

// EXAMPLE 7: Retry logic

async function retryAsync(fn, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`Retry ${i + 1}/${maxRetries}`);
      // Optional: add delay
      await new Promise(r => setTimeout(r, 1000));
    }
  }
}

// Usage
async function fetchWithRetry() {
  const data = await retryAsync(() => fetchUserData(1), 3);
  return data;
}

// ASYNC/AWAIT RULES

console.log("\n=== ASYNC/AWAIT RULES ===\n");

console.log("1. 'await' can only be used in 'async' functions");
console.log("2. 'async' function returns a promise");
console.log("3. 'await' pauses execution until promise settles");
console.log("4. Exceptions in async function are caught by catch");
console.log("5. 'await' must be on a promise (or thenable)");

// Example of rules
async function demonstrateRules() {
  // Rule 2: async always returns promise
  const result = demonstrateRules(); // Promise
  
  try {
    // Rule 3: await pauses here
    const user = await fetchUserData(1);
    
    // Continues after promise resolves
    console.log(user);
  } catch (error) {
    // Rule 4: Exceptions caught here
    console.error(error);
  }
}

// Rule 1 violation:
// const user = await fetchUserData(1); // Error! Not in async function

// Proper:
async function proper() {
  const user = await fetchUserData(1); // OK
  return user;
}

// ASYNC/AWAIT WITH ARRAY METHODS

// Careful: forEach doesn't wait for async
async function problematicForEach() {
  const ids = [1, 2, 3];
  
  ids.forEach(async (id) => {
    const user = await fetchUserData(id); // Fires but doesn't wait
    console.log(user);
  });
  
  console.log("Done"); // Prints before users loaded!
}

// Better: Use for loop
async function correctSequential() {
  const ids = [1, 2, 3];
  
  for (const id of ids) {
    const user = await fetchUserData(id);
    console.log(user);
  }
  
  console.log("Done"); // Prints after all loaded
}

// Better: Use map with Promise.all
async function correctParallel() {
  const ids = [1, 2, 3];
  
  const users = await Promise.all(
    ids.map(id => fetchUserData(id))
  );
  
  users.forEach(user => console.log(user));
  console.log("Done");
}

// COMPARING STYLES

console.log("\n=== STYLE COMPARISON ===\n");

const example = "Fetch user, then posts, then comments";

console.log("Promise.then():");
console.log(`
fetchUserData(1)
  .then(user => fetchUserPosts(user.id))
  .then(posts => fetchComments(posts[0].id))
  .then(comments => console.log(comments))
  .catch(err => console.error(err));
`);

console.log("Async/await:");
console.log(`
async function getData() {
  try {
    const user = await fetchUserData(1);
    const posts = await fetchUserPosts(user.id);
    const comments = await fetchComments(posts[0].id);
    console.log(comments);
  } catch (err) {
    console.error(err);
  }
}
`);

// PERFORMANCE: Both are equivalent

async function asyncVersion() {
  const user = await fetchUserData(1); // 500ms
  const posts = await fetchUserPosts(user.id); // 500ms
  // Total: ~1000ms (sequential)
  return { user, posts };
}

// Can make parallel with Promise.all
async function parallelAsync() {
  const user = await fetchUserData(1);
  // Fetch posts without waiting
  const postsPromise = fetchUserPosts(user.id);
  // Do other work
  const posts = await postsPromise;
  // Total: ~500ms (parallel)
  return { user, posts };
}

// Even cleaner
async function parallelAsyncClean() {
  const [user, posts] = await Promise.all([
    fetchUserData(1),
    fetchUserPosts(1)
  ]);
  return { user, posts };
}

// TOP LEVEL AWAIT (ES2022+)

// You can now use await at top level in modules
// await fetchUserData(1);
// .then(user => console.log(user));

// SUMMARY

console.log("\n=== SUMMARY ===\n");
console.log("Async/await benefits:");
console.log("1. Cleaner, synchronous-looking code");
console.log("2. Better error handling (try/catch)");
console.log("3. Easier to use with loops");
console.log("4. More readable for complex flows");
console.log("5. Easier to debug (better stack traces)");
console.log("\nStill built on promises internally");
console.log("Use Promise.all for parallel operations");
console.log("Use try/catch for error handling");
console.log("Remember: async functions return promises");
```

---

### How do you handle errors in asynchronous operations?

```javascript
// ERROR HANDLING IN ASYNCHRONOUS CODE

// METHOD 1: Callbacks with Error-First Pattern

function readFileCallback(filename, callback) {
  setTimeout(() => {
    const success = Math.random() > 0.5;
    if (success) {
      callback(null, "File contents");
    } else {
      callback(new Error("File not found"), null);
    }
  }, 100);
}

// Callback: (error, result) - error first
readFileCallback("file.txt", (error, data) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Data:", data);
  }
});

// METHOD 2: Promises with .catch()

function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = Math.random() > 0.5;
      if (success) {
        resolve("File contents");
      } else {
        reject(new Error("File not found"));
      }
    }, 100);
  });
}

// Catch errors
readFilePromise("file.txt")
  .then(data => {
    console.log("Data:", data);
  })
  .catch(error => {
    console.error("Error:", error.message);
  });

// Catch can recover
readFilePromise("file.txt")
  .catch(error => {
    console.error("Error occurred, using default");
    return "Default data";
  })
  .then(data => {
    console.log("Data:", data);
  });

// METHOD 3: Async/Await with Try/Catch

async function readFileAsync(filename) {
  try {
    // Code that might throw
    const data = await readFilePromise(filename);
    console.log("Data:", data);
    return data;
  } catch (error) {
    // Error handling
    console.error("Error:", error.message);
    // Can rethrow or return default
    return null;
  } finally {
    // Always executes (cleanup)
    console.log("Finished");
  }
}

// readFileAsync("file.txt");

// DETAILED EXAMPLES

// Example 1: API request error handling

async function fetchUserWithValidation(userId) {
  try {
    // Network errors throw
    const response = await fetch(`/api/users/${userId}`);
    
    // Check HTTP status
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    // Parse errors throw
    const user = await response.json();
    
    // Validation errors throw
    if (!user.id) {
      throw new Error("Invalid user data");
    }
    
    return user;
  } catch (error) {
    // Unified error handling
    if (error instanceof TypeError) {
      console.error("Network error:", error.message);
    } else if (error instanceof SyntaxError) {
      console.error("Invalid JSON:", error.message);
    } else {
      console.error("Error:", error.message);
    }
    
    // Can throw to caller
    throw error;
  }
}

// Example 2: Multiple async operations

async function loadUserData(userId) {
  try {
    // Multiple awaits
    const user = await fetch(`/api/users/${userId}`).then(r => r.json());
    const posts = await fetch(`/api/posts?userId=${userId}`).then(r => r.json());
    const comments = await fetch(`/api/comments?userId=${userId}`).then(r => r.json());
    
    return { user, posts, comments };
  } catch (error) {
    console.error("Failed to load user data:", error);
    
    // Partial data fallback
    return {
      user: null,
      posts: [],
      comments: []
    };
  }
}

// Example 3: Selective error handling

async function processWithRecovery(data) {
  let processed = null;
  
  try {
    processed = await processData(data);
  } catch (error) {
    if (error.code === "TIMEOUT") {
      // Retry on timeout
      console.log("Timeout, retrying...");
      processed = await processData(data);
    } else if (error.code === "VALIDATION") {
      // Handle validation separately
      console.error("Invalid data:", error.message);
      processed = applyDefaults(data);
    } else {
      // Re-throw unknown errors
      throw error;
    }
  }
  
  return processed;
}

function processData(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!data) {
        const error = new Error("No data");
        error.code = "VALIDATION";
        reject(error);
      } else {
        resolve(data);
      }
    }, 100);
  });
}

function applyDefaults(data) {
  return { ...data, processed: true };
}

// Example 4: Promise.allSettled error handling

async function loadMultipleUsers(userIds) {
  const results = await Promise.allSettled(
    userIds.map(id => fetch(`/api/users/${id}`).then(r => r.json()))
  );
  
  const users = [];
  const errors = [];
  
  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      users.push(result.value);
    } else {
      errors.push({
        userId: userIds[index],
        error: result.reason
      });
    }
  });
  
  if (errors.length > 0) {
    console.error("Failed to load some users:", errors);
  }
  
  return users;
}

// Example 5: Retry with exponential backoff

async function retryWithBackoff(fn, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries - 1) {
        // Exponential backoff: 1s, 2s, 4s
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Attempt ${attempt + 1} failed, retrying in ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
}

// Usage
async function fetchWithRetry() {
  const data = await retryWithBackoff(
    () => fetch("/api/data").then(r => r.json()),
    3
  );
  return data;
}

// Example 6: Error monitoring/logging

class ErrorHandler {
  static async wrap(fn, context = {}) {
    try {
      return await fn();
    } catch (error) {
      // Log error
      console.error({
        message: error.message,
        stack: error.stack,
        context,
        timestamp: new Date()
      });
      
      // Optionally notify service
      // await reportError(error, context);
      
      // Re-throw or return default
      throw error;
    }
  }
}

// Usage
async function safeOperation() {
  return ErrorHandler.wrap(
    () => readFileAsync("file.txt"),
    { operation: "fileRead", file: "file.txt" }
  );
}

// COMMON ERROR TYPES

console.log("\n=== COMMON ERROR TYPES ===\n");

async function handleDifferentErrors() {
  try {
    // TypeError: Invalid operation
    const result = null.toString();
    
    // ReferenceError: Undefined variable
    // console.log(undefinedVar);
    
    // RangeError: Invalid range
    // Array(Infinity);
    
    // SyntaxError: Invalid syntax
    // JSON.parse("{invalid}");
  } catch (error) {
    if (error instanceof TypeError) {
      console.error("Type error:", error.message);
    } else if (error instanceof ReferenceError) {
      console.error("Reference error:", error.message);
    } else if (error instanceof RangeError) {
      console.error("Range error:", error.message);
    } else if (error instanceof SyntaxError) {
      console.error("Syntax error:", error.message);
    } else {
      console.error("Unknown error:", error);
    }
  }
}

// CUSTOM ERROR CLASSES

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

async function validateAndFetch(userId) {
  try {
    if (!userId || userId <= 0) {
      throw new ValidationError("Invalid user ID", "userId");
    }
    
    const response = await fetch(`/api/users/${userId}`);
    if (!response.ok) {
      throw new NetworkError(
        `Failed to fetch user: ${response.statusText}`,
        response.status
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error(`Validation error in ${error.field}: ${error.message}`);
    } else if (error instanceof NetworkError) {
      console.error(`Network error (${error.statusCode}): ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
    }
    
    throw error; // Re-throw for caller
  }
}

// BEST PRACTICES

console.log("\n=== BEST PRACTICES ===\n");

console.log("1. Always handle errors:");
console.log("   - .catch() for promises");
console.log("   - try/catch for async/await");

console.log("2. Use specific error handling:");
console.log("   - Check error types/codes");
console.log("   - Different handling for different errors");

console.log("3. Log errors properly:");
console.log("   - Include context and timestamp");
console.log("   - Don't expose sensitive data");

console.log("4. Provide meaningful feedback:");
console.log("   - User-friendly error messages");
console.log("   - Clear what went wrong");

console.log("5. Implement retry logic:");
console.log("   - For transient failures");
console.log("   - With exponential backoff");

console.log("6. Use finally for cleanup:");
console.log("   - Close connections");
console.log("   - Release resources");

// EXAMPLE: Complete error handling pattern

async function robustAsyncOperation(input) {
  let startTime;
  
  try {
    startTime = Date.now();
    
    // Input validation
    if (!input) {
      throw new ValidationError("Input is required", "input");
    }
    
    // Main operation
    const result = await performOperation(input);
    
    // Success logging
    console.log(`Operation completed in ${Date.now() - startTime}ms`);
    return result;
  } catch (error) {
    // Error handling
    const errorData = {
      error: error.message,
      type: error.constructor.name,
      duration: Date.now() - startTime,
      input: input
    };
    
    // Log error
    console.error("Operation failed:", errorData);
    
    // Determine if error is recoverable
    if (error instanceof ValidationError) {
      return { success: false, error: error.message };
    } else {
      throw error;
    }
  } finally {
    // Cleanup
    console.log("Cleanup completed");
  }
}

function performOperation(input) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (input.length > 0) {
        resolve(`Processed: ${input}`);
      } else {
        reject(new Error("Empty input"));
      }
    }, 100);
  });
}
```

---

### Explain the concept of a microtask queue.

```javascript
// MICROTASK QUEUE - High-priority task queue
// Executes before macrotask queue and before rendering

// Microtasks include:
// 1. Promise callbacks (.then, .catch, .finally)
// 2. queueMicrotask()
// 3. MutationObserver
// 4. Process.nextTick() (Node.js)

// BASIC EXAMPLE

console.log("=== Microtask Queue ===");
console.log("1. Start");

setTimeout(() => {
  console.log("4. Macrotask (setTimeout)");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("2. Microtask (Promise)");
  });

queueMicrotask(() => {
  console.log("3. Microtask (queueMicrotask)");
});

console.log("1. End");

// Output order:
// 1. Start
// 1. End
// 2. Microtask (Promise)
// 3. Microtask (queueMicrotask)
// 4. Macrotask (setTimeout)

// EXPLANATION:
// 1. Call stack runs first (synchronous code)
// 2. All microtasks execute
// 3. Then macrotasks execute one at a time

// EVENT LOOP PHASES

/*
┌─────────────────────────────┐
│ 1. Execute synchronous code  │
│    (Call Stack)              │
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│ 2. Execute all microtasks    │
│    (Microtask Queue)         │
│    - Promise.then/catch      │
│    - queueMicrotask          │
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│ 3. Render updates (if needed)│
└─────────────────────────────┘
           ↓
┌─────────────────────────────┐
│ 4. Execute one macrotask     │
│    (Macrotask Queue)         │
│    - setTimeout              │
│    - setInterval             │
└─────────────────────────────┘
           ↓
      Repeat from step 2
*/

// DETAILED EXAMPLE

console.log("\n=== Detailed Example ===");

console.log("Step 1: Sync code");

// Macrotasks
setTimeout(() => {
  console.log("Step 5: Macrotask 1");
  
  // Microtasks inside macrotask
  Promise.resolve().then(() => {
    console.log("Step 6: Microtask after macrotask");
  });
}, 0);

setTimeout(() => {
  console.log("Step 7: Macrotask 2");
}, 0);

// Microtasks
Promise.resolve()
  .then(() => {
    console.log("Step 2: Microtask 1");
    
    // Nested microtask
    return Promise.resolve();
  })
  .then(() => {
    console.log("Step 3: Microtask 2");
  });

queueMicrotask(() => {
  console.log("Step 4: queueMicrotask");
});

// More sync code
console.log("Step 1: Sync code (continued)");

// Output:
// Step 1: Sync code
// Step 1: Sync code (continued)
// Step 2: Microtask 1
// Step 3: Microtask 2
// Step 4: queueMicrotask
// Step 5: Macrotask 1
// Step 6: Microtask after macrotask
// Step 7: Macrotask 2

// MICROTASK vs MACROTASK

console.log("\n=== Microtask vs Macrotask ===");

console.log("MICROTASK:");
console.log("- Higher priority");
console.log("- Executes before macrotask");
console.log("- ALL microtasks execute before next macrotask");
console.log("- Promises, queueMicrotask");

console.log("\nMACROTASK:");
console.log("- Lower priority");
console.log("- Executes after microtask queue empties");
console.log("- One macrotask at a time");
console.log("- setTimeout, setInterval, I/O");

// PRACTICAL IMPLICATIONS

console.log("\n=== Practical Implications ===");

// Example 1: Processing data
async function processLargeDataset(items) {
  // Split processing into chunks to allow rendering
  for (let i = 0; i < items.length; i++) {
    await new Promise(resolve => {
      // setTimeout forces macrotask (allows render)
      setTimeout(() => {
        // Process one item
        processItem(items[i]);
        resolve();
      }, 0);
    });
  }
}

// Example 2: UI Updates
function updateUIResponsively(data) {
  // Use microtasks for synchronous UI updates
  Promise.resolve().then(() => {
    updateDOM(data);
  });
  
  // Use macrotask for animations/rendering
  setTimeout(() => {
    playAnimation();
  }, 0);
}

function processItem(item) {
  // Process...
}

function updateDOM(data) {
  // Update...
}

function playAnimation() {
  // Animate...
}

// Example 3: Batching updates
class UpdateBatcher {
  constructor() {
    this.updates = [];
    this.scheduled = false;
  }
  
  add(update) {
    this.updates.push(update);
    
    if (!this.scheduled) {
      this.scheduled = true;
      
      // Queue in microtask (batch before render)
      queueMicrotask(() => {
        this.flush();
      });
    }
  }
  
  flush() {
    // Process all updates at once
    this.updates.forEach(update => {
      console.log("Processing:", update);
    });
    this.updates = [];
    this.scheduled = false;
  }
}

const batcher = new UpdateBatcher();
batcher.add("Update 1");
batcher.add("Update 2");
batcher.add("Update 3");
// All three processed together in microtask

// MICROTASK STARVATION

console.log("\n=== Microtask Starvation ===");

// Too many microtasks can block rendering
async function tooManyMicrotasks() {
  for (let i = 0; i < 1000; i++) {
    await Promise.resolve(); // Microtask
  }
  // Rendering waits until all complete
}

// Better: Mix with macrotasks
async function responsiveMicrotasks() {
  for (let i = 0; i < 1000; i++) {
    if (i % 10 === 0) {
      // Occasionally yield to macrotask
      await new Promise(resolve => setTimeout(resolve, 0));
    } else {
      await Promise.resolve(); // Microtask
    }
  }
  // Rendering happens more frequently
}

// CUSTOM MICROTASK EXAMPLE

console.log("\n=== Custom Microtask Example ===");

class BatchProcessor {
  constructor() {
    this.queue = [];
    this.flushing = false;
  }
  
  process(fn) {
    this.queue.push(fn);
    this.scheduleFlush();
  }
  
  scheduleFlush() {
    if (!this.flushing) {
      this.flushing = true;
      
      // Use microtask for batching
      queueMicrotask(() => {
        this.flush();
      });
    }
  }
  
  flush() {
    console.log("Flushing", this.queue.length, "items");
    
    while (this.queue.length > 0) {
      const fn = this.queue.shift();
      fn();
    }
    
    this.flushing = false;
  }
}

const processor = new BatchProcessor();

// All batched in microtask
processor.process(() => console.log("Task 1"));
processor.process(() => console.log("Task 2"));
processor.process(() => console.log("Task 3"));

// Output:
// Flushing 3 items
// Task 1
// Task 2
// Task 3

// MICROTASK TIMING

console.log("\n=== Timing Characteristics ===");

async function measureMicrotaskTiming() {
  const start = performance.now();
  
  // Create many microtasks
  const promises = [];
  for (let i = 0; i < 1000; i++) {
    promises.push(Promise.resolve());
  }
  
  await Promise.all(promises);
  
  const duration = performance.now() - start;
  console.log(`1000 microtasks took ${duration.toFixed(2)}ms`);
}

// measureMicrotaskTiming();
// Typically very fast (< 1ms)

// BEST PRACTICES

console.log("\n=== Best Practices ===");

console.log("1. Use microtasks for:");
console.log("   - Batching updates");
console.log("   - Synchronous but deferred work");
console.log("   - High-priority tasks");

console.log("2. Use macrotasks for:");
console.log("   - I/O operations");
console.log("   - Animations/rendering");
console.log("   - Long-running computations");

console.log("3. Be aware of:");
console.log("   - Microtask starvation");
console.log("   - Microtasks run before rendering");
console.log("   - Each macrotask checks microtasks after");
```

---

### What is the difference between setTimeout(), setImmediate(), and process.nextTick()?

```javascript
// THREE WAYS TO DEFER EXECUTION

// setTimeout() - Schedules in macrotask queue
setTimeout(() => {
  console.log("setTimeout");
}, 0);

// setImmediate() - Node.js specific, macrotask queue
// (less common, after I/O)
// setImmediate(() => {
//   console.log("setImmediate");
// });

// process.nextTick() - Node.js specific, runs before microtask queue
// (most common in Node.js)
// process.nextTick(() => {
//   console.log("process.nextTick");
// });

// EXECUTION ORDER (Node.js)

console.log("\n=== Execution Order ===");

console.log("Script start");

setTimeout(() => {
  console.log("setTimeout 1");
}, 0);

setImmediate(() => {
  console.log("setImmediate");
});

process.nextTick(() => {
  console.log("process.nextTick 1");
});

Promise.resolve().then(() => {
  console.log("Promise");
});

process.nextTick(() => {
  console.log("process.nextTick 2");
});

console.log("Script end");

// Expected output:
// Script start
// Script end
// process.nextTick 1
// process.nextTick 2
// Promise
// setTimeout 1
// setImmediate

// PRIORITY ORDER

console.log("\n=== Priority Order (Node.js) ===");

const order = [
  "1. Call Stack (synchronous code)",
  "2. process.nextTick() - before microtasks",
  "3. Microtasks (Promise, queueMicrotask)",
  "4. Timers (setTimeout)",
  "5. setImmediate() - after I/O",
  "6. Repeat from process.nextTick()"
];

console.log(order.join("\n"));

// DETAILED COMPARISON

console.log("\n=== Comparison ===");

console.log("setTimeout():");
console.log("- Macrotask");
console.log("- Minimum delay ~4ms");
console.log("- Runs after microtasks");
console.log("- Available in browsers and Node.js");

console.log("setImmediate():");
console.log("- Macrotask (Node.js only)");
console.log("- Runs after I/O events");
console.log("- Not available in browsers");
console.log("- Between timers and I/O phases");

console.log("process.nextTick():");
console.log("- Not in event loop queue");
console.log("- Runs before microtask queue");
console.log("- Node.js only");
console.log("- No delay");

// EXAMPLE: setTimeout

console.log("\n=== setTimeout ===");

function timeoutExample() {
  console.log("Before setTimeout");
  
  setTimeout(() => {
    console.log("Inside setTimeout");
  }, 0);
  
  console.log("After setTimeout");
}

// timeoutExample();
// Before setTimeout
// After setTimeout
// Inside setTimeout

// EXAMPLE: setImmediate (Node.js)

console.log("\n=== setImmediate (Node.js only) ===");

function immediateExample() {
  console.log("Before setImmediate");
  
  setImmediate(() => {
    console.log("Inside setImmediate");
  });
  
  console.log("After setImmediate");
}

// immediateExample();
// Before setImmediate
// After setImmediate
// Inside setImmediate

// EXAMPLE: process.nextTick (Node.js)

console.log("\n=== process.nextTick (Node.js) ===");

function tickExample() {
  console.log("Before nextTick");
  
  process.nextTick(() => {
    console.log("Inside nextTick");
  });
  
  console.log("After nextTick");
}

// tickExample();
// Before nextTick
// After nextTick
// Inside nextTick

// PRACTICAL: Choosing the right one

console.log("\n=== When to use ===");

console.log("Use setTimeout when:");
console.log("- Need actual delay (ms)");
console.log("- Browser/Node.js compatibility");
console.log("- Animations or debouncing");
console.log("- Separate from current operation");

console.log("Use setImmediate when (Node.js):");
console.log("- After I/O operations");
console.log("- Breaking up long-running code");
console.log("- Node.js-specific code");

console.log("Use process.nextTick when (Node.js):");
console.log("- Error handling");
console.log("- Cleanup operations");
console.log("- High-priority deferred tasks");

// EXAMPLE 1: Error handling

console.log("\n=== Error Handling Pattern ===");

function processWithErrorHandling(data, callback) {
  // Validate synchronously
  if (!data) {
    // Defer error callback with nextTick
    process.nextTick(() => {
      callback(new Error("No data"));
    });
    return;
  }
  
  // Process asynchronously
  setTimeout(() => {
    try {
      const result = JSON.parse(data);
      process.nextTick(() => {
        callback(null, result);
      });
    } catch (error) {
      process.nextTick(() => {
        callback(error);
      });
    }
  }, 0);
}

// processWithErrorHandling('{"a":1}', (err, result) => {
//   if (err) console.error(err);
//   else console.log("Result:", result);
// });

// EXAMPLE 2: Breaking up CPU-intensive work

function processLargeDataset(items) {
  let index = 0;
  
  function processNext() {
    if (index >= items.length) return;
    
    // Process one item
    console.log("Processing:", items[index]);
    index++;
    
    // Continue in next tick
    setImmediate(processNext);
  }
  
  processNext();
}

// processLargeDataset([1, 2, 3, 4, 5]);

// EXAMPLE 3: Performance comparison

console.log("\n=== Performance ===");

function comparePerformance() {
  let callCount = 0;
  
  console.time("process.nextTick 1000 calls");
  for (let i = 0; i < 1000; i++) {
    process.nextTick(() => {
      callCount++;
    });
  }
  // Completes synchronously in event loop
  
  setTimeout(() => {
    console.timeEnd("process.nextTick 1000 calls");
    console.log("Completed:", callCount); // 1000
  }, 10);
  
  // nextTick is very fast (no actual delay)
}

// comparePerformance();

// EXAMPLE 4: setImmediate vs setTimeout

console.log("\n=== setImmediate vs setTimeout ===");

function compareTimers() {
  const start = Date.now();
  
  setTimeout(() => {
    const elapsed = Date.now() - start;
    console.log("setTimeout elapsed:", elapsed, "ms");
  }, 0);
  
  setImmediate(() => {
    const elapsed = Date.now() - start;
    console.log("setImmediate elapsed:", elapsed, "ms");
  });
}

// compareTimers();
// setTimeout is typically 4-10ms
// setImmediate is faster (runs sooner in event loop)

// REAL-WORLD EXAMPLE: Node.js Server

console.log("\n=== Real-World Example ===");

const fs = require("fs");

function handleRequest(req, res) {
  // Validate immediately
  const isValid = validateRequest(req);
  
  if (!isValid) {
    // Defer error response with nextTick
    process.nextTick(() => {
      res.statusCode = 400;
      res.end("Bad request");
    });
    return;
  }
  
  // Read file (I/O operation)
  fs.readFile("data.json", (err, data) => {
    if (err) {
      // Use nextTick for consistency
      process.nextTick(() => {
        res.statusCode = 500;
        res.end("Server error");
      });
      return;
    }
    
    // Process data
    const processed = processData(data);
    
    // Use setImmediate for expensive operations
    setImmediate(() => {
      const response = JSON.stringify(processed);
      res.end(response);
    });
  });
}

function validateRequest(req) {
  return true;
}

function processData(data) {
  return data;
}

// EVENT LOOP PHASES (Node.js)

console.log("\n=== Event Loop Phases ===");

const phases = [
  "1. timers",
  "   - setTimeout, setInterval callbacks",
  "",
  "2. pending callbacks",
  "   - Some I/O error callbacks",
  "",
  "3. idle, prepare",
  "   - Internal",
  "",
  "4. poll",
  "   - Retrieve new I/O events",
  "   - Blocking for more I/O",
  "",
  "5. check",
  "   - setImmediate callbacks",
  "",
  "6. close callbacks",
  "   - socket.close, etc.",
  "",
  "Between phases: process.nextTick()"
];

console.log(phases.join("\n"));

// SUMMARY

console.log("\n=== Summary ===");

console.log("setTimeout():");
console.log("- Most portable");
console.log("- Has minimum delay (~4ms)");
console.log("- Use for general delays");

console.log("setImmediate():");
console.log("- Node.js specific");
console.log("- After I/O");
console.log("- Breaking up work");

console.log("process.nextTick():");
console.log("- Node.js specific");
console.log("- Highest priority");
console.log("- Error handling, cleanup");

console.log("Execution order: process.nextTick > Microtasks > setTimeout > setImmediate");
```

---
## ES6+ Features

### What are template literals in JavaScript?

```javascript
// Template literals allow string interpolation and multi-line strings
// Use backticks (`) instead of quotes

// Basic usage
const name = "John";
const age = 30;

// Before (string concatenation)
const oldWay = "Hello, " + name + "! You are " + age + " years old.";

// With template literals
const newWay = `Hello, ${name}! You are ${age} years old.`;
console.log(newWay); // "Hello, John! You are 30 years old."

// EXPRESSION EVALUATION

const a = 5;
const b = 10;

console.log(`The sum of ${a} and ${b} is ${a + b}`); // "The sum of 5 and 10 is 15"

// Function calls in template literals
function greet(name) {
  return `Hello, ${name}`;
}

console.log(`${greet("Alice")}`); // "Hello, Alice"

// MULTI-LINE STRINGS

const multiLine = `
  This is a
  multi-line string
  without concatenation
`;

console.log(multiLine);

// HTML template
const html = `
  <div class="container">
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// NESTED TEMPLATE LITERALS

const user = { name: "John", age: 30 };
const template = `
  User: ${`${user.name} (${user.age})`}
`;

// TAGGED TEMPLATE LITERALS

function highlight(strings, ...values) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += `<mark>${values[i]}</mark>`;
    }
  }
  return result;
}

const emphasized = highlight`The user ${name} is ${age} years old`;
console.log(emphasized);
// "The user <mark>John</mark> is <mark>30</mark> years old"

// TAGGED TEMPLATE: Upper case
function upper(strings, ...values) {
  return strings
    .map((str, i) => str + (values[i] || "").toUpperCase())
    .join("");
}

console.log(upper`Hello ${name}!`); // "Hello JOHN!"

// ESCAPING

const escaped = `\`backticks\` can be escaped`;
console.log(escaped); // "`backticks` can be escaped"
```

### What is destructuring assignment in JavaScript?

(Already covered in Part 1 - Object and Array destructuring with detailed examples)

### What are default parameters in JavaScript?

(Already covered in Part 1)

### What are JavaScript modules?

```javascript
// Modules allow organizing code into separate files
// Export/import functionality

// MODULE: math.js
// export function add(a, b) {
//   return a + b;
// }
//
// export function subtract(a, b) {
//   return a - b;
// }
//
// export const PI = 3.14159;

// MODULE: app.js
// import { add, subtract, PI } from './math.js';
//
// console.log(add(5, 3)); // 8
// console.log(subtract(10, 4)); // 6
// console.log(PI); // 3.14159

// NAMED EXPORTS

// export const value1 = 10;
// export const value2 = 20;
// export function myFunc() { }

// import { value1, value2, myFunc } from './module.js';

// DEFAULT EXPORT

// export default function greeting(name) {
//   return `Hello, ${name}`;
// }

// import greeting from './greeting.js';
// greeting("John");

// MIX DEFAULT AND NAMED

// export default class User { }
// export const admin = new User();

// import User, { admin } from './user.js';

// ALIASING

// import { value1 as val1, value2 as val2 } from './module.js';

// import * as math from './math.js';
// math.add(5, 3);

// DYNAMIC IMPORT

// const module = await import('./module.js');
// module.functionName();

// BENEFITS

console.log("Module benefits:");
console.log("1. Code organization");
console.log("2. Reusability");
console.log("3. Namespace isolation");
console.log("4. Explicit dependencies");
console.log("5. Tree-shaking (removing unused code)");
```

### What are JavaScript generators?

```javascript
// Generators are functions that can pause and resume
// Use function* syntax and yield keyword

// BASIC GENERATOR

function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }

// ITERATING OVER GENERATOR

function* countTo(n) {
  for (let i = 1; i <= n; i++) {
    yield i;
  }
}

for (const num of countTo(5)) {
  console.log(num); // 1, 2, 3, 4, 5
}

// GENERATOR DELEGATION

function* generator1() {
  yield 1;
  yield 2;
}

function* generator2() {
  yield* generator1(); // Delegate to another generator
  yield 3;
}

for (const val of generator2()) {
  console.log(val); // 1, 2, 3
}

// BI-DIRECTIONAL COMMUNICATION

function* dialogue() {
  const greeting = yield "What is your name?";
  const question = yield `Hello, ${greeting}!`;
  console.log(`Nice to meet you too, ${question}`);
}

const conv = dialogue();
console.log(conv.next());              // "What is your name?"
console.log(conv.next("Alice"));       // "Hello, Alice!"
console.log(conv.next("Nice to meet you")); // Completes

// ASYNC PATTERNS

function* fetchData() {
  try {
    const response = yield fetch("/api/data");
    const data = yield response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// USE CASES

console.log("Generator use cases:");
console.log("1. Lazy evaluation");
console.log("2. Infinite sequences");
console.log("3. Async flow control");
console.log("4. Stateful iteration");
console.log("5. Producer-consumer patterns");

// EXAMPLE: Infinite sequence generator

function* infiniteSequence() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const infinite = infiniteSequence();
console.log(infinite.next().value); // 0
console.log(infinite.next().value); // 1
console.log(infinite.next().value); // 2

// EXAMPLE: Fibonacci generator

function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
for (let i = 0; i < 10; i++) {
  console.log(fib.next().value);
}
```

### What are generator functions?

(Same as above - generators are defined with function*)

### What are classes in JavaScript?

(Already covered in the Inheritance section above)

### What are Symbols used for in JavaScript?

```javascript
// Symbols are unique, immutable identifiers
// Created with Symbol()

// BASIC SYMBOL

const sym1 = Symbol();
const sym2 = Symbol();

console.log(sym1 === sym2); // false - each symbol is unique

// SYMBOLS WITH DESCRIPTION

const userId = Symbol("userId");
const userName = Symbol("userName");

console.log(userId.description); // "userId"

// USE CASE 1: Private object properties

const user = {
  name: "John",
  [Symbol("secret")]: "private data"
};

// Can't iterate over symbol properties
for (const key in user) {
  console.log(key); // Only "name"
}

// WELL-KNOWN SYMBOLS

// Symbol.iterator - Make object iterable
const iterable = {
  [Symbol.iterator]() {
    let count = 0;
    return {
      next: () => {
        count++;
        if (count <= 3) {
          return { value: count, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const val of iterable) {
  console.log(val); // 1, 2, 3
}

// Symbol.hasInstance - Control instanceof
class MyClass {
  static [Symbol.hasInstance](obj) {
    return obj && typeof obj === "object";
  }
}

console.log({} instanceof MyClass); // true

// Symbol.toPrimitive - Custom coercion
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 42;
    if (hint === "string") return "custom string";
    return true;
  }
};

console.log(+obj); // 42
console.log(String(obj)); // "custom string"

// USE CASES

console.log("Symbol use cases:");
console.log("1. Private properties");
console.log("2. Making objects iterable");
console.log("3. Custom behavior");
console.log("4. Avoiding property name collisions");
console.log("5. Metaprogramming");
```

### What are proxies in JavaScript used for?

```javascript
// Proxies intercept and customize operations on objects
// Created with new Proxy(target, handler)

// BASIC PROXY

const target = { name: "John", age: 30 };
const handler = {
  get(target, property) {
    console.log(`Getting ${property}`);
    return target[property];
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.name); // "Getting name" -> "John"

// VALIDATION

const personHandler = {
  set(target, property, value) {
    if (property === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    target[property] = value;
    return true;
  }
};

const person = new Proxy({}, personHandler);
person.age = 30; // OK
// person.age = "thirty"; // Error: Age must be a number

// COMPUTED PROPERTIES

const computedProxy = new Proxy({}, {
  get(target, property) {
    if (property === "double") {
      return (n) => n * 2;
    }
    return target[property];
  }
});

// computedProxy.double(5); // 10

// FUNCTION PROXY

function validate(...args) {
  return args.every(arg => typeof arg === "number");
}

const handler2 = {
  apply(target, thisArg, args) {
    console.log(`Calling with args:`, args);
    return target(...args);
  }
};

const validatingFunction = new Proxy(validate, handler2);
// validatingFunction(1, 2, 3); // true

// USE CASES

console.log("Proxy use cases:");
console.log("1. Validation");
console.log("2. Logging");
console.log("3. Performance optimization");
console.log("4. Computed properties");
console.log("5. Revocable proxies");
console.log("6. Metaprogramming");

// REVOCABLE PROXY

const { proxy: revokeProxy, revoke } = Proxy.revocable(
  { data: "secret" },
  {
    get(target, property) {
      return target[property];
    }
  }
);

console.log(revokeProxy.data); // "secret"
revoke(); // Disable proxy
// revokeProxy.data; // Error: Revoked
```

### What are iterators and generators in JavaScript?

```javascript
// ITERATORS - Objects with next() method that returns { value, done }

const iterator = {
  data: [1, 2, 3],
  index: 0,
  next() {
    if (this.index < this.data.length) {
      return {
        value: this.data[this.index++],
        done: false
      };
    }
    return { done: true };
  }
};

console.log(iterator.next()); // { value: 1, done: false }
console.log(iterator.next()); // { value: 2, done: false }
console.log(iterator.next()); // { value: 3, done: false }
console.log(iterator.next()); // { done: true }

// ITERABLE - Object with Symbol.iterator that returns iterator

const iterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    return {
      next: () => {
        if (index < this.data.length) {
          return {
            value: this.data[index++],
            done: false
          };
        }
        return { done: true };
      }
    };
  }
};

for (const val of iterable) {
  console.log(val); // 1, 2, 3
}

// GENERATORS (Automatic iterators)

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();
console.log(g.next()); // { value: 1, done: false }

// Generators are both iterators and iterables
for (const val of gen()) {
  console.log(val); // 1, 2, 3
}

// REAL-WORLD EXAMPLES

// Custom range iterator
function* range(start, end) {
  for (let i = start; i < end; i++) {
    yield i;
  }
}

for (const num of range(1, 5)) {
  console.log(num); // 1, 2, 3, 4
}

// Recursive tree traversal
function* treeWalker(node) {
  yield node.value;
  if (node.left) yield* treeWalker(node.left);
  if (node.right) yield* treeWalker(node.right);
}

const tree = {
  value: 1,
  left: { value: 2, left: null, right: null },
  right: { value: 3, left: null, right: null }
};

for (const val of treeWalker(tree)) {
  console.log(val); // 1, 2, 3
}
```

### Explain the difference between mutable and immutable objects.

```javascript
// MUTABLE - Can be changed after creation

const mutableArray = [1, 2, 3];
mutableArray[0] = 10; // Changed!
mutableArray.push(4); // Changed!
console.log(mutableArray); // [10, 2, 3, 4]

const mutableObj = { name: "John" };
mutableObj.name = "Jane"; // Changed!
mutableObj.age = 30; // Changed!
console.log(mutableObj); // { name: "Jane", age: 30 }

// IMMUTABLE - Cannot be changed after creation

const immutableNum = 42;
// Can't change a number

const immutableStr = "hello";
// Can't modify a string (strings are immutable)
const newStr = immutableStr.toUpperCase(); // Creates new string
console.log(immutableStr); // "hello" (unchanged)
console.log(newStr); // "HELLO" (new string)

// MAKING OBJECTS IMMUTABLE

// Method 1: Object.freeze()
const frozen = Object.freeze({ name: "John" });
// frozen.name = "Jane"; // Silent fail or error in strict mode

// Method 2: Deep freeze
function deepFreeze(obj) {
  Object.freeze(obj);
  Object.values(obj).forEach(value => {
    if (typeof value === "object" && value !== null) {
      deepFreeze(value);
    }
  });
  return obj;
}

const deepFrozen = deepFreeze({
  user: { name: "John" },
  hobbies: ["reading", "gaming"]
});

// IMMUTABLE PATTERNS

// Creating new objects instead of modifying
const user = { name: "John", age: 30 };

// Immutable update - create new object
const updatedUser = { ...user, age: 31 };
console.log(user.age); // 30 (unchanged)
console.log(updatedUser.age); // 31

// Immutable array operations
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // Creates new array
console.log(arr); // [1, 2, 3]
console.log(newArr); // [1, 2, 3, 4]

// Map and filter (immutable)
const mapped = arr.map(x => x * 2); // New array
const filtered = arr.filter(x => x > 1); // New array

// IMMUTABLE LIBRARIES

// Immer library
// const newState = produce(state, draft => {
//   draft.user.name = "Jane";
// });

// ADVANTAGES AND DISADVANTAGES

console.log("Mutable:");
console.log("+ Performance (modify in place)");
console.log("- Harder to track changes");
console.log("- Bugs from unintended modification");

console.log("Immutable:");
console.log("+ Predictable, easier to understand");
console.log("+ Better for debugging");
console.log("+ Good for React, Redux");
console.log("- More memory usage");
console.log("- Slightly slower");
```

### What is the difference between a Map object and a plain object in JavaScript?

(Already covered in Part 1 - detailed comparison)

### What are the differences between Map/Set and WeakMap/WeakSet?

(Already covered in Part 1 - detailed comparison)

### Why might you want to create static class members?

```javascript
// Static members belong to class itself, not instances

// USE CASES

// 1. Shared state across all instances
class Counter {
  static count = 0;
  
  constructor(name) {
    this.name = name;
    Counter.count++; // Increment shared counter
  }
  
  static getCount() {
    return Counter.count;
  }
}

const c1 = new Counter("c1");
const c2 = new Counter("c2");
console.log(Counter.getCount()); // 2

// 2. Utility functions
class MathUtils {
  static PI = 3.14159;
  
  static calculateArea(radius) {
    return this.PI * radius * radius;
  }
  
  static calculateVolume(radius) {
    return (4/3) * this.PI * Math.pow(radius, 3);
  }
}

console.log(MathUtils.calculateArea(5)); // Utility function

// 3. Factory methods
class Database {
  static instance = null;
  
  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance; // Singleton pattern
  }
}

const db1 = Database.getInstance();
const db2 = Database.getInstance();
console.log(db1 === db2); // true

// 4. Constants
class Config {
  static readonly PORT = 3000;
  static readonly HOST = "localhost";
  static readonly ENV = "production";
}

console.log(Config.PORT); // 3000

// 5. Validation
class Validator {
  static isEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  
  static isPhoneNumber(phone) {
    return /^\d{10}$/.test(phone);
  }
}

console.log(Validator.isEmail("john@example.com")); // true

// COMPARING STATIC vs INSTANCE

class User {
  static userCount = 0; // Static - shared
  
  name; // Instance - unique per object
  
  constructor(name) {
    this.name = name;
    User.userCount++; // Update shared counter
  }
  
  getName() { // Instance method
    return this.name;
  }
  
  static getTotalUsers() { // Static method
    return this.userCount;
  }
}

const u1 = new User("Alice");
const u2 = new User("Bob");

console.log(u1.getName()); // "Alice"
console.log(u2.getName()); // "Bob"
console.log(User.getTotalUsers()); // 2
console.log(User.userCount); // 2

// Static members are NOT accessible on instances
// console.log(u1.getTotalUsers); // undefined
// console.log(u1.userCount); // undefined

console.log("\n=== Benefits of Static Members ===");
console.log("1. Namespace organization");
console.log("2. Utility functions");
console.log("3. Singleton patterns");
console.log("4. Constants and config");
console.log("5. Factory methods");
console.log("6. Shared state");
console.log("7. Reduced memory usage (not duplicated per instance)");
```

### What are JavaScript object getters and setters for?

```javascript
// Getters and setters allow custom logic when accessing/setting properties

// BASIC GETTER

class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  // Getter - called like a property
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

const person = new Person("John", "Doe");
console.log(person.fullName); // "John Doe" (no parentheses!)

// BASIC SETTER

class Temperature {
  constructor(celsius) {
    this._celsius = celsius; // Convention: underscore for private
  }
  
  // Getter
  get celsius() {
    return this._celsius;
  }
  
  // Setter - called like assigning a property
  set celsius(value) {
    if (value < -273.15) {
      throw new Error("Temperature cannot be below -273.15°C");
    }
    this._celsius = value;
  }
  
  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  }
  
  set fahrenheit(value) {
    this.celsius = (value - 32) * 5/9;
  }
}

const temp = new Temperature(25);
console.log(temp.celsius); // 25
console.log(temp.fahrenheit); // 77
temp.fahrenheit = 86;
console.log(temp.celsius); // 30

// USE CASES

// 1. Validation
class BankAccount {
  constructor(balance) {
    this._balance = balance;
  }
  
  get balance() {
    return this._balance;
  }
  
  set balance(amount) {
    if (amount < 0) {
      throw new Error("Balance cannot be negative");
    }
    this._balance = amount;
  }
}

// 2. Computed properties
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  
  get area() {
    return this.width * this.height;
  }
  
  get perimeter() {
    return 2 * (this.width + this.height);
  }
}

const rect = new Rectangle(5, 10);
console.log(rect.area); // 50
console.log(rect.perimeter); // 30

// 3. Lazy loading
class UserProfile {
  constructor(userId) {
    this.userId = userId;
    this._profile = null;
    this._loaded = false;
  }
  
  get profile() {
    if (!this._loaded) {
      // Load profile on first access
      this._profile = this.loadProfile();
      this._loaded = true;
    }
    return this._profile;
  }
  
  loadProfile() {
    return { id: this.userId, name: "User" };
  }
}

// 4. Side effects
class Logger {
  constructor() {
    this._logs = [];
  }
  
  get logs() {
    return [...this._logs]; // Return copy
  }
  
  set logs(newLogs) {
    this._logs = newLogs;
    console.log("Logs updated");
  }
}

// 5. Data binding (Vue.js style)
class ReactiveData {
  constructor(initialValue) {
    this._value = initialValue;
    this.watchers = [];
  }
  
  get value() {
    return this._value;
  }
  
  set value(newValue) {
    if (this._value !== newValue) {
      this._value = newValue;
      // Notify watchers
      this.watchers.forEach(watcher => watcher(newValue));
    }
  }
  
  watch(callback) {
    this.watchers.push(callback);
  }
}

const data = new ReactiveData("initial");
data.watch(newValue => console.log("Changed to:", newValue));
data.value = "updated"; // "Changed to: updated"

// ADVANTAGES

console.log("\nAdvantages of getters/setters:");
console.log("1. Validation and error checking");
console.log("2. Computed properties");
console.log("3. Lazy loading");
console.log("4. Side effects on property access");
console.log("5. Encapsulation");
console.log("6. Readable syntax (property-like access)");

// DISADVANTAGES

console.log("\nDisadvantages:");
console.log("1. Performance overhead");
console.log("2. Hidden behavior (not obvious from usage)");
console.log("3. Harder to debug");
console.log("4. Can't use in JSON serialization");
```

### What are JavaScript object property flags and descriptors?

```javascript
// Property descriptors control how properties behave

// GETTING DESCRIPTOR

const obj = { name: "John" };
const descriptor = Object.getOwnPropertyDescriptor(obj, "name");
console.log(descriptor);
// {
//   value: "John",
//   writable: true,
//   enumerable: true,
//   configurable: true
// }

// DESCRIPTOR FLAGS

// 1. writable - Can property be changed?
const obj1 = {};
Object.defineProperty(obj1, "readonly", {
  value: "Cannot change",
  writable: false // Not writable
});

console.log(obj1.readonly); // "Cannot change"
// obj1.readonly = "Changed"; // Silent fail or error in strict mode

// 2. enumerable - Shows up in for...in and Object.keys?
const obj2 = {};
Object.defineProperty(obj2, "visible", {
  value: "Shows in enumeration",
  enumerable: true
});
Object.defineProperty(obj2, "hidden", {
  value: "Doesn't show",
  enumerable: false
});

console.log(Object.keys(obj2)); // ["visible"]
for (const key in obj2) {
  console.log(key); // Only "visible"
}

// 3. configurable - Can descriptor be changed or property deleted?
const obj3 = {};
Object.defineProperty(obj3, "locked", {
  value: "Fixed",
  configurable: false // Can't change descriptor
});

// This will throw error
// Object.defineProperty(obj3, "locked", {
//   writable: true // Error!
// });

// delete obj3.locked; // Error!

// DEFINE PROPERTIES

const obj4 = {};
Object.defineProperty(obj4, "prop1", {
  value: "value1",
  writable: true,
  enumerable: true,
  configurable: true
});

Object.defineProperty(obj4, "prop2", {
  value: "value2",
  writable: false,
  enumerable: true,
  configurable: false
});

// DEFINE MULTIPLE PROPERTIES

const obj5 = {};
Object.defineProperties(obj5, {
  prop1: {
    value: 100,
    writable: false
  },
  prop2: {
    value: 200,
    enumerable: false
  }
});

// GETTERS AND SETTERS WITH DESCRIPTORS

const obj6 = {};
Object.defineProperty(obj6, "computed", {
  get() {
    console.log("Getting computed");
    return "computed value";
  },
  set(value) {
    console.log("Setting computed to", value);
  },
  enumerable: true,
  configurable: true
});

console.log(obj6.computed); // "Getting computed" -> "computed value"
obj6.computed = "new value"; // "Setting computed to new value"

// PRACTICAL EXAMPLES

// 1. Immutable properties
const config = {};
Object.defineProperty(config, "API_KEY", {
  value: "secret-key",
  writable: false,
  enumerable: false,
  configurable: false
});

// 2. Hidden properties (not enumerable)
const user = { name: "John" };
Object.defineProperty(user, "_internalId", {
  value: 12345,
  enumerable: false
});

console.log(Object.keys(user)); // ["name"]
console.log(user._internalId); // 12345 (can still access)

// 3. Computed properties
const person = {
  firstName: "John",
  lastName: "Doe"
};

Object.defineProperty(person, "fullName", {
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  enumerable: true
});

console.log(person.fullName); // "John Doe"

// 4. Validation
const account = {};
Object.defineProperty(account, "balance", {
  value: 1000,
  writable: false,
  
  set(value) {
    if (value < 0) {
      throw new Error("Balance cannot be negative");
    }
  },
  get() {
    return this._balance;
  }
});

// DEFAULT DESCRIPTORS

console.log("\n=== Default Descriptor Values ===");
console.log("When creating property normally:");
console.log("writable: true");
console.log("enumerable: true");
console.log("configurable: true");

console.log("\nWhen using Object.defineProperty:");
console.log("writable: false");
console.log("enumerable: false");
console.log("configurable: false");
```

---

### How do you reliably determine whether an object is empty?

```javascript
// CHECKING IF OBJECT IS EMPTY

// Method 1: Object.keys()
const obj1 = { a: 1 };
const obj2 = {};

console.log(Object.keys(obj1).length === 0); // false
console.log(Object.keys(obj2).length === 0); // true

// Method 2: Object.entries()
console.log(Object.entries(obj2).length === 0); // true

// Method 3: for...in loop
function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

console.log(isEmpty({})); // true
console.log(isEmpty({ a: 1 })); // false

// Method 4: JSON.stringify()
console.log(JSON.stringify(obj2) === "{}"); // true

// EDGE CASES

// Objects with non-enumerable properties
const objWithNonEnum = {};
Object.defineProperty(objWithNonEnum, "hidden", {
  value: "not enumerable",
  enumerable: false
});

console.log(Object.keys(objWithNonEnum).length === 0); // true
console.log(Object.getOwnPropertyNames(objWithNonEnum).length === 0); // false

// Objects with symbols
const objWithSymbol = {};
const sym = Symbol("id");
objWithSymbol[sym] = "symbol value";

console.log(Object.keys(objWithSymbol).length === 0); // true
console.log(Object.getOwnPropertySymbols(objWithSymbol).length === 0); // false

// COMPREHENSIVE CHECK

function isReallyEmpty(obj) {
  return (
    Object.keys(obj).length === 0 &&
    Object.getOwnPropertyNames(obj).length === 0 &&
    Object.getOwnPropertySymbols(obj).length === 0
  );
}

console.log(isReallyEmpty({})); // true
console.log(isReallyEmpty(objWithSymbol)); // false

// BEST PRACTICE

function hasProperties(obj) {
  return Object.keys(obj).length > 0;
}

// Use based on requirements:
console.log("\n=== Choosing a method ===");
console.log("Object.keys() - Most common, enumerable properties only");
console.log("Object.getOwnPropertyNames() - Includes non-enumerable");
console.log("JSON.stringify() - Quick check but not reliable");
console.log("for...in - Classic but checks prototype too");
```

### What are the benefits of using a module bundler?

```javascript
// Module bundlers (Webpack, Vite, Rollup, etc.) combine modules into files

// BENEFITS

console.log("=== Benefits of Module Bundlers ===\n");

console.log("1. CODE SPLITTING");
console.log("   - Split code into chunks");
console.log("   - Load only needed code");
console.log("   - Improves initial load time\n");

console.log("2. MINIFICATION");
console.log("   - Removes whitespace and comments");
console.log("   - Shortens variable names");
console.log("   - Reduces file size\n");

console.log("3. ASSET HASHING");
console.log("   - Unique filenames for caching");
console.log("   - Bust cache when files change");
console.log("   - Improves performance\n");

console.log("4. TRANSPILATION");
console.log("   - Convert modern JS to ES5");
console.log("   - Browser compatibility");
console.log("   - Support for JSX, TypeScript\n");

console.log("5. TREE SHAKING");
console.log("   - Remove unused code");
console.log("   - Reduce bundle size");
console.log("   - Dead code elimination\n");

console.log("6. MODULE RESOLUTION");
console.log("   - Support CommonJS, ES6, AMD");
console.log("   - Resolve dependencies");
console.log("   - Handle circular dependencies\n");

console.log("7. HOT MODULE REPLACEMENT");
console.log("   - Update code without reload");
console.log("   - Faster development");
console.log("   - Preserve app state\n");

console.log("8. SOURCE MAPS");
console.log("   - Debug minified code");
console.log("   - Map to original files");
console.log("   - Development experience\n");

console.log("9. OPTIMIZATION");
console.log("   - Flatten module structure");
console.log("   - Combine small files");
console.log("   - Parallel downloads\n");

console.log("10. LOADERS");
console.log("   - Process different file types");
console.log("   - SASS to CSS");
console.log("   - Images to base64");
```

### Explain the concept of tree shaking in module bundling.

```javascript
// Tree shaking removes unused code during bundling

// EXAMPLE: Utility library

// math.js
// export function add(a, b) { return a + b; }
// export function subtract(a, b) { return a - b; }
// export function multiply(a, b) { return a * b; }
// export function divide(a, b) { return a / b; }

// app.js - Only imports what's used
// import { add, multiply } from './math.js';
// console.log(add(5, 3));
// console.log(multiply(5, 3));

// BUNDLER OUTPUT - Only includes used functions
// function add(a, b) { return a + b; }
// function multiply(a, b) { return a * b; }
// console.log(add(5, 3));
// console.log(multiply(5, 3));

// subtract() and divide() are NOT included (dead code)

// HOW IT WORKS

console.log("=== Tree Shaking Process ===\n");

console.log("1. STATIC ANALYSIS");
console.log("   - Analyze import/export statements");
console.log("   - Mark unused exports\n");

console.log("2. DEAD CODE ELIMINATION");
console.log("   - Remove unused variables");
console.log("   - Remove unused functions");
console.log("   - Remove unused imports\n");

console.log("3. MINIFICATION");
console.log("   - Further reduce size");
console.log("   - Remove more dead code\n");

// CONDITIONS FOR TREE SHAKING

console.log("=== Requirements for Tree Shaking ===\n");

console.log("1. Use ES6 modules (import/export)");
console.log("   - CommonJS (require) is dynamic");
console.log("   - Bundler can't analyze\n");

console.log("2. Use named exports");
console.log("   - export const func = () => {}");
console.log("   - Not: export default\n");

console.log("3. No side effects");
console.log("   - Code must be pure");
console.log("   - No top-level side effects\n");

console.log("4. ES6 module syntax");
console.log("   - 'import { x } from 'module'");
console.log("   - Not: require() or dynamic\n");

// SIDE EFFECTS EXAMPLE

// With side effects (won't be tree-shaken)
// file.js
// export const add = (a, b) => a + b;
// console.log("File loaded!"); // SIDE EFFECT

// app.js
// import { add } from './file.js'; // File gets loaded

// The entire module is included because of the side effect

// Marking no side effects in package.json
/*
{
  "sideEffects": false // Tell bundler: no side effects
}
*/

// Or specific files with side effects
/*
{
  "sideEffects": [
    "./src/index.css",
    "./src/globals.js"
  ]
}
*/

// PRACTICAL EXAMPLE

console.log("\n=== Practical Example ===\n");

console.log("Before tree shaking:");
console.log("lodash: ~70KB (all functions)");
console.log("app uses only: map, filter, reduce\n");

console.log("After tree shaking:");
console.log("bundle size: ~5KB (only used functions)\n");

console.log("Savings: 65KB (93% reduction!)");

// COMMON LIBRARIES

console.log("\n=== Tree Shaking Support ===\n");

console.log("Good tree shaking:");
console.log("- lodash-es (ES6 modules)");
console.log("- date-fns");
console.log("- @material-ui/core");
console.log("- Many modern libraries\n");

console.log("Poor tree shaking:");
console.log("- lodash (CommonJS)");
console.log("- Old libraries");
console.log("- Libraries with side effects\n");

// BUNDLER CONFIGURATION

console.log("=== Webpack Configuration ===\n");

console.log("webpack.config.js:");
console.log(`
module.exports = {
  mode: 'production', // Enables tree shaking
  entry: './src/index.js',
  output: {
    filename: 'bundle.js'
  },
  optimization: {
    usedExports: true, // Mark unused exports
    sideEffects: false // Assume no side effects
  }
};
`);

// ANALYZING BUNDLE

console.log("\n=== Tools to Analyze ===\n");

console.log("1. Webpack Bundle Analyzer");
console.log("   - Visual bundle breakdown");
console.log("   - Identify large modules\n");

console.log("2. source-map-explorer");
console.log("   - Source map analysis");
console.log("   - Inspect transpiled code\n");

console.log("3. bundlephobia.com");
console.log("   - Online package analysis");
console.log("   - Size estimates\n");
```

---

## Error Handling & Security

(Content continues with Error Handling, Security, and Debugging sections...)

---

### What is the purpose of the Error object in JavaScript?

```javascript
// The Error object represents runtime errors

// CREATING ERRORS

// Basic error
const error1 = new Error("Something went wrong");
console.log(error1.message); // "Something went wrong"
console.log(error1.stack); // Stack trace

// Error properties
const error2 = new Error("Custom error");
console.log(error2.name); // "Error"
console.log(error2.message); // "Custom error"
console.log(error2.stack); // Stack trace

// BUILT-IN ERROR TYPES

// TypeError
// const num = 5;
// num.map(x => x); // TypeError: num.map is not a function

// ReferenceError
// console.log(undefinedVar); // ReferenceError: undefinedVar is not defined

// SyntaxError (caught at parse time)
// const obj = { invalid }; // SyntaxError

// RangeError
// Array(Infinity); // RangeError: Invalid array length

// CUSTOM ERRORS

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

try {
  throw new ValidationError("Invalid input");
} catch (error) {
  console.log(error.name); // "ValidationError"
  console.log(error.message); // "Invalid input"
}

// ERROR HANDLING

try {
  // Code that might throw
  if (!someValue) {
    throw new Error("Value is required");
  }
} catch (error) {
  // Handle error
  console.error(error.message);
} finally {
  // Cleanup
  console.log("Finished");
}

// ERROR PROPERTIES

const err = new Error("Test error");
console.log({
  message: err.message,
  name: err.name,
  stack: err.stack, // Stack trace
  toString: err.toString() // "Error: Test error"
});
```

### What are the different types of errors in JavaScript?

```javascript
// BUILT-IN ERROR TYPES

console.log("=== Error Types ===\n");

// 1. Error - Generic
console.log("Error - Generic runtime error");
// throw new Error("Generic error");

// 2. TypeError - Wrong type
console.log("TypeError - Value is wrong type");
// const num = 5;
// num.toUpperCase(); // TypeError

// 3. ReferenceError - Variable not found
console.log("ReferenceError - Undefined variable");
// console.log(undefinedVar); // ReferenceError

// 4. SyntaxError - Invalid syntax
console.log("SyntaxError - Invalid code syntax");
// const obj = { invalid }; // SyntaxError (parse time)

// 5. RangeError - Invalid range
console.log("RangeError - Invalid array length");
// Array(Infinity); // RangeError

// 6. EvalError - eval() error (rarely used)
console.log("EvalError - eval() error\n");

// EXAMPLES

try {
  // TypeError
  const str = "hello";
  str.split(10); // OK - converts to string
  // But:
  str.split.call(123); // TypeError if no length property
} catch (e) {
  console.log("Caught:", e.name);
}

try {
  // ReferenceError
  // missing_var;
} catch (e) {
  console.log("Caught:", e.name);
}

try {
  // RangeError
  new Array(-1); // Invalid length
} catch (e) {
  console.log("Caught:", e.name);
}

// CATCHING SPECIFIC ERRORS

try {
  // Some operation
} catch (error) {
  if (error instanceof TypeError) {
    console.error("Type error:", error.message);
  } else if (error instanceof ReferenceError) {
    console.error("Reference error:", error.message);
  } else if (error instanceof RangeError) {
    console.error("Range error:", error.message);
  } else {
    console.error("Unknown error:", error.message);
  }
}

// CUSTOM ERROR TYPES

class NetworkError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthenticationError";
  }
}

try {
  throw new ValidationError("Email is required", "email");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`Validation error in ${error.field}: ${error.message}`);
  }
}
```

### How do you handle errors using try...catch blocks?

(Already covered in error handling section above)

### What is the purpose of the finally block?

```javascript
// Finally block always executes, regardless of success or error

// BASIC USAGE

try {
  console.log("Try block");
  // throw new Error("Error!");
} catch (error) {
  console.log("Catch block");
} finally {
  console.log("Finally block - always runs");
}

// Output:
// Try block
// Finally block - always runs

// WITH ERROR

try {
  console.log("Try block");
  throw new Error("Error!");
} catch (error) {
  console.log("Catch block");
} finally {
  console.log("Finally block - always runs");
}

// Output:
// Try block
// Catch block
// Finally block - always runs

// USE CASES

// 1. Resource cleanup
function processFile(filename) {
  let file;
  try {
    file = openFile(filename);
    const data = file.read();
    return data;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  } finally {
    if (file) {
      file.close(); // Always close, even on error
    }
  }
}

// 2. Database cleanup
async function queryDatabase(query) {
  let connection;
  try {
    connection = await connect();
    return await connection.query(query);
  } catch (error) {
    console.error("Query failed:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

// 3. Restore state
function withTransaction(callback) {
  const originalState = getState();
  try {
    return callback();
  } catch (error) {
    setState(originalState); // Rollback
    throw error;
  } finally {
    cleanup(); // Always cleanup
  }
}

// 4. Logging
async function trackOperation(operation) {
  const startTime = Date.now();
  try {
    return await operation();
  } finally {
    const duration = Date.now() - startTime;
    console.log(`Operation took ${duration}ms`);
  }
}

// FINALLY WITH RETURN

function testFinally() {
  try {
    console.log("Try");
    return "From try";
  } finally {
    console.log("Finally"); // Runs before return
  }
}

console.log(testFinally());
// Output:
// Try
// Finally
// From try

// Finally runs BEFORE the return statement executes!

// FINALLY WITH ERROR

function testFinallyError() {
  try {
    throw new Error("Error in try");
  } catch (error) {
    console.log("Caught:", error.message);
    throw new Error("Error in catch");
  } finally {
    console.log("Finally");
  }
}

try {
  testFinallyError();
} catch (error) {
  console.log("Final catch:", error.message);
}

// Output:
// Caught: Error in try
// Finally
// Final catch: Error in catch

// FINALLY CAN'T PREVENT ERROR PROPAGATION

function testFinallyPrevention() {
  try {
    throw new Error("Error");
  } finally {
    console.log("Finally");
    // Throwing here will replace original error
  }
}

try {
  testFinallyPrevention();
} catch (error) {
  console.log("Caught:", error.message);
}

// PROMISE EQUIVALENT

const promise = new Promise((resolve) => {
  try {
    resolve("Success");
  } finally {
    console.log("Finally in promise");
  }
})
  .finally(() => {
    console.log("Promise.finally()");
  });

promise.then(result => {
  console.log(result);
});

// Output:
// Finally in promise
// Promise.finally()
// Success
```

### How can you create custom error objects?

```javascript
// EXTENDING ERROR CLASS

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
    // Maintains proper stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

const error = new CustomError("Something went wrong");
console.log(error.name); // "CustomError"
console.log(error.message); // "Something went wrong"

// ADDING CUSTOM PROPERTIES

class ValidationError extends Error {
  constructor(message, field, value) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
    this.value = value;
    Error.captureStackTrace(this, this.constructor);
  }
  
  getDetails() {
    return `${this.field}: ${this.message} (received: ${this.value})`;
  }
}

try {
  throw new ValidationError("Must be a number", "age", "not a number");
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(error.getDetails());
  }
}

// SPECIALIZED ERROR CLASSES

class NetworkError extends Error {
  constructor(message, statusCode, url) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
    this.url = url;
    Error.captureStackTrace(this, this.constructor);
  }
  
  isClientError() {
    return this.statusCode >= 400 && this.statusCode < 500;
  }
  
  isServerError() {
    return this.statusCode >= 500;
  }
}

class DatabaseError extends Error {
  constructor(message, query, code) {
    super(message);
    this.name = "DatabaseError";
    this.query = query;
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

class AuthenticationError extends Error {
  constructor(message, reason) {
    super(message);
    this.name = "AuthenticationError";
    this.reason = reason;
    Error.captureStackTrace(this, this.constructor);
  }
}

// USING CUSTOM ERRORS

async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new NetworkError(
        `Failed to fetch user`,
        response.status,
        response.url
      );
    }
    
    return await response.json();
  } catch (error) {
    if (error instanceof NetworkError) {
      console.error(`Network error (${error.statusCode}): ${error.message}`);
    } else {
      console.error("Unknown error:", error);
    }
    throw error;
  }
}

// ERROR HIERARCHY

class AppError extends Error {
  constructor(message, code = "APP_ERROR") {
    super(message);
    this.name = "AppError";
    this.code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

class InvalidInputError extends AppError {
  constructor(message, field) {
    super(message, "INVALID_INPUT");
    this.field = field;
  }
}

class ResourceNotFoundError extends AppError {
  constructor(resource, id) {
    super(`${resource} with id ${id} not found`, "NOT_FOUND");
    this.resource = resource;
    this.id = id;
  }
}

// UTILITY: Error factory

const ErrorFactory = {
  validation: (field, message) => {
    return new ValidationError(message, field, undefined);
  },
  
  network: (status, message) => {
    return new NetworkError(message, status, undefined);
  },
  
  database: (message, query) => {
    return new DatabaseError(message, query, undefined);
  },
  
  authentication: (message) => {
    return new AuthenticationError(message, "unknown");
  }
};

// USAGE

try {
  throw ErrorFactory.validation("email", "Invalid email format");
} catch (error) {
  console.log(error.name, error.message);
}
```

---

