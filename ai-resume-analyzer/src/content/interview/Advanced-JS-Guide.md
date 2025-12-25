# JavaScript Interview Questions - Advanced Level Guide

## Table of Contents
1. [Performance and Optimization](#performance-and-optimization)
2. [Testing](#testing)
3. [Design Patterns](#design-patterns)
4. [Security](#security)
5. [Advanced Topics](#advanced-topics)

---

## Performance and Optimization

### What is tree shaking in JavaScript?

Tree shaking is a term used in module bundling to describe the process of removing unused code.

```javascript
// EXAMPLE: Utility Library

// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export function multiply(a, b) {
  return a * b; // This won't be used
}

export function divide(a, b) {
  return a / b; // This won't be used
}

// app.js - Only imports needed functions
import { add, subtract } from './math.js';

console.log(add(5, 3));
console.log(subtract(10, 4));

// BUNDLER OUTPUT (with tree shaking enabled)
// Only includes used functions:
// function add(a, b) { return a + b; }
// function subtract(a, b) { return a - b; }
// console.log(add(5, 3));
// console.log(subtract(10, 4));

// multiply() and divide() are NOT included (eliminated by tree shaking)

// HOW TREE SHAKING WORKS

console.log("=== Tree Shaking Process ===\n");

console.log("1. STATIC ANALYSIS");
console.log("   - Analyzer reads import/export statements");
console.log("   - Marks which exports are used\n");

console.log("2. MARK UNUSED");
console.log("   - All unused exports are marked\n");

console.log("3. DEAD CODE ELIMINATION");
console.log("   - Unused functions removed\n");

console.log("4. MINIFICATION");
console.log("   - Further optimization\n");

// CONDITIONS FOR TREE SHAKING

console.log("=== Requirements ===\n");

console.log("1. Use ES6 modules (import/export)");
console.log("   - Must use: import/export");
console.log("   - Not: require() or CommonJS\n");

console.log("2. Use named exports");
console.log("   export const func = () => {}");
console.log("   Not: export default\n");

console.log("3. No side effects");
console.log("   - Code must be pure");
console.log("   - No console.log() at top level");
console.log("   - No modifications to global objects\n");

console.log("4. Configure bundler");
console.log("   - Set mode: 'production'");
console.log("   - Enable usedExports\n");

// WEBPACK CONFIGURATION

const webpackConfig = {
  mode: 'production', // Enables tree shaking
  optimization: {
    usedExports: true, // Mark unused exports
    sideEffects: false // No side effects
  }
};

// PACKAGE.JSON CONFIGURATION

const packageJson = {
  "sideEffects": false, // Entire library has no side effects
  // OR specific files with side effects:
  // "sideEffects": ["./src/index.css", "./src/globals.js"]
};

// REAL-WORLD IMPACT

console.log("=== Impact on Bundle Size ===\n");

console.log("Before tree shaking:");
console.log("  lodash: ~70KB");
console.log("  Using: map, filter, reduce (3 functions)\n");

console.log("After tree shaking:");
console.log("  Only: ~5KB (3 functions)\n");

console.log("Savings: 65KB (93% reduction!)");
```

### What is the need for tree shaking?

```javascript
// PROBLEM: Bundle size is critical for performance

console.log("=== Why Tree Shaking Matters ===\n");

console.log("1. REDUCE BUNDLE SIZE");
console.log("   - Smaller JS files");
console.log("   - Faster downloads");
console.log("   - Better mobile performance\n");

console.log("2. IMPROVE LOAD TIME");
console.log("   - Less code to parse");
console.log("   - Less code to execute");
console.log("   - Faster app startup\n");

console.log("3. REDUCE MEMORY USAGE");
console.log("   - Less code in memory");
console.log("   - Better for low-end devices\n");

console.log("4. BETTER CACHING");
console.log("   - Smaller chunks");
console.log("   - Better cache hits\n");

// REAL STATISTICS

console.log("=== Performance Impact ===\n");

const metrics = {
  "Before optimization": {
    bundleSize: "250KB",
    loadTime: "2.5s",
    timeToInteractive: "4.2s"
  },
  "After tree shaking": {
    bundleSize: "85KB", // 66% reduction
    loadTime: "0.8s",
    timeToInteractive: "1.5s"
  }
};

console.log("Real-world example:", metrics);

// COMMON LIBRARIES WITH TREE SHAKING

console.log("\n=== Library Support ===\n");

console.log("Good tree shaking:");
console.log("  - lodash-es");
console.log("  - date-fns");
console.log("  - @material-ui/core");
console.log("  - React Router v6\n");

console.log("Bad tree shaking:");
console.log("  - lodash (CommonJS)");
console.log("  - Old libraries");
console.log("  - Libraries with side effects");
```

### How do you optimize JavaScript performance?

```javascript
// COMPREHENSIVE PERFORMANCE OPTIMIZATION GUIDE

console.log("=== JavaScript Performance Optimization ===\n");

// 1. MINIMIZE MAIN THREAD BLOCKING

// ❌ Bad: Long-running synchronous code
function slowLoop() {
  let sum = 0;
  for (let i = 0; i < 1000000000; i++) { // Very slow!
    sum += i;
  }
  return sum;
}

// ✅ Good: Break into chunks with requestAnimationFrame
function optimizedChunked(callback) {
  const chunkSize = 100000;
  let i = 0;
  
  function processChunk() {
    const end = Math.min(i + chunkSize, 1000000000);
    let sum = 0;
    
    for (; i < end; i++) {
      sum += i;
    }
    
    if (i < 1000000000) {
      requestAnimationFrame(processChunk);
    } else {
      callback(sum);
    }
  }
  
  processChunk();
}

// 2. USE WEB WORKERS FOR CPU-INTENSIVE TASKS

// Main thread
function computeHeavyTask(data) {
  const worker = new Worker('worker.js');
  
  return new Promise((resolve) => {
    worker.onmessage = (e) => {
      resolve(e.data);
      worker.terminate();
    };
    
    worker.postMessage(data);
  });
}

// worker.js
// self.onmessage = (e) => {
//   const result = heavyComputation(e.data);
//   self.postMessage(result);
// };

// 3. IMPLEMENT LAZY LOADING

// ❌ Bad: Load everything upfront
const largeArray = new Array(1000000).fill(0);

// ✅ Good: Load on demand
class LazyArray {
  constructor(size) {
    this.size = size;
    this.cache = new Map();
  }
  
  get(index) {
    if (!this.cache.has(index)) {
      // Load only when accessed
      this.cache.set(index, this.computeValue(index));
    }
    return this.cache.get(index);
  }
  
  computeValue(index) {
    // Expensive computation
    return Math.sqrt(index);
  }
}

// 4. DEBOUNCE AND THROTTLE EXPENSIVE OPERATIONS

// Debounce: Execute once after delay
function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

const optimizedSearch = debounce((query) => {
  console.log('Searching:', query);
}, 300);

// Throttle: Execute at most once per interval
function throttle(fn, interval) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= interval) {
      lastCall = now;
      fn(...args);
    }
  };
}

const optimizedScroll = throttle(() => {
  console.log('Handling scroll');
}, 100);

// 5. OPTIMIZE DOM MANIPULATION

// ❌ Bad: Many DOM updates (causes multiple reflows)
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  div.textContent = `Item ${i}`;
  document.body.appendChild(div); // Each append triggers reflow
}

// ✅ Good: Batch updates (single reflow)
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  div.textContent = `Item ${i}`;
  fragment.appendChild(div); // No reflow yet
}
document.body.appendChild(fragment); // Single reflow

// 6. USE VIRTUAL SCROLLING FOR LARGE LISTS

class VirtualList {
  constructor(items, containerHeight, itemHeight) {
    this.items = items;
    this.containerHeight = containerHeight;
    this.itemHeight = itemHeight;
    this.visibleItems = Math.ceil(containerHeight / itemHeight);
  }
  
  getVisibleItems(scrollTop) {
    const start = Math.floor(scrollTop / this.itemHeight);
    const end = Math.min(start + this.visibleItems, this.items.length);
    return this.items.slice(start, end);
  }
}

// 7. IMPLEMENT MEMOIZATION FOR EXPENSIVE CALCULATIONS

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

const expensiveCompute = memoize((n) => {
  // Simulate expensive computation
  let sum = 0;
  for (let i = 0; i < 100000000; i++) {
    sum += i;
  }
  return sum;
});

// 8. CODE SPLITTING AND LAZY LOADING MODULES

// Dynamic imports (lazy load modules)
async function loadFeature() {
  const module = await import('./feature.js');
  return module.featureFunction();
}

// 9. OPTIMIZE MEMORY USAGE

// ❌ Bad: Memory leaks
let globalArray = [];
setInterval(() => {
  globalArray.push(new Array(1000000)); // Grows indefinitely
}, 100);

// ✅ Good: Manage memory properly
const managedArray = [];
setInterval(() => {
  const chunk = new Array(10000);
  managedArray.push(chunk);
  
  // Clean up old entries
  if (managedArray.length > 100) {
    managedArray.shift();
  }
}, 100);

// 10. USE REQUEST IDLE CALLBACK FOR NON-CRITICAL WORK

if ('requestIdleCallback' in window) {
  requestIdleCallback(() => {
    // Non-critical work when browser is idle
    analyzeUserBehavior();
  });
} else {
  // Fallback
  setTimeout(() => analyzeUserBehavior(), 0);
}

function analyzeUserBehavior() {
  console.log('Analyzing behavior...');
}

console.log("\n=== Performance Optimization Checklist ===\n");

const checklist = [
  "✓ Minimize main thread blocking",
  "✓ Use Web Workers for CPU-intensive tasks",
  "✓ Implement lazy loading",
  "✓ Debounce/throttle expensive operations",
  "✓ Batch DOM updates",
  "✓ Use virtual scrolling for large lists",
  "✓ Implement memoization",
  "✓ Code splitting and dynamic imports",
  "✓ Manage memory leaks",
  "✓ Use requestIdleCallback",
  "✓ Tree shaking and dead code elimination",
  "✓ Minification and compression",
  "✓ Caching strategies",
  "✓ Image optimization",
  "✓ CDN usage"
];

checklist.forEach(item => console.log(item));
```

### What is the difference between debounce and throttle?

```javascript
// DEBOUNCE - Execute after delay stops
function debounce(fn, delay) {
  let timeoutId;
  
  return function(...args) {
    // Clear previous timer
    clearTimeout(timeoutId);
    
    // Set new timer
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// Use case: Search input
const debouncedSearch = debounce((query) => {
  console.log('Searching for:', query);
  // Make API call
}, 500);

// Simulate typing
// debouncedSearch('j'); // Not called
// debouncedSearch('ja'); // Not called
// debouncedSearch('java'); // Only this triggers after 500ms

// THROTTLE - Execute at most once per interval
function throttle(fn, interval) {
  let lastCall = 0;
  
  return function(...args) {
    const now = Date.now();
    
    if (now - lastCall >= interval) {
      lastCall = now;
      fn.apply(this, args);
    }
  };
}

// Use case: Scroll event
const throttledScroll = throttle(() => {
  console.log('Handling scroll');
}, 100);

// window.addEventListener('scroll', throttledScroll);

// COMPARISON TABLE

console.log("=== Debounce vs Throttle ===\n");

const comparison = {
  "Debounce": {
    "Execution": "After delay stops",
    "Use case": "Search, resize, input",
    "Calls": "Once after silence",
    "Timing": "Waits for inactivity"
  },
  "Throttle": {
    "Execution": "At regular intervals",
    "Use case": "Scroll, mousemove",
    "Calls": "Multiple times regularly",
    "Timing": "Fixed intervals"
  }
};

Object.entries(comparison).forEach(([name, props]) => {
  console.log(name + ":");
  Object.entries(props).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  console.log();
});

// VISUAL TIMELINE

console.log("=== Execution Timeline ===\n");

console.log("User action:     |-----|-----|-----|-----|-----|");
console.log("                 1  2  3  4  5  6  7  8  9 10\n");

console.log("Debounce (500ms):");
console.log("  Call:                                    |10");
console.log("  (waits for inactivity)\n");

console.log("Throttle (500ms):");
console.log("  Call:          |5         |10");
console.log("  (every 500ms)");

// PRACTICAL EXAMPLES

// Debounce: Auto-save while typing
function autoSave(content) {
  console.log('Saving:', content);
}

const debouncedAutoSave = debounce((content) => {
  autoSave(content);
}, 1000);

// Throttle: Track user activity
function trackActivity() {
  console.log('Activity tracked');
}

const throttledTrack = throttle(() => {
  trackActivity();
}, 5000); // Track at most once per 5 seconds

// COMBINED: Debounce + Throttle

function debounceWithThrottle(fn, delay, interval) {
  let timeoutId;
  let lastCall = 0;
  
  return function(...args) {
    const now = Date.now();
    
    // Throttle: Execute if interval passed
    if (now - lastCall >= interval) {
      lastCall = now;
      fn.apply(this, args);
      clearTimeout(timeoutId);
    } else {
      // Debounce: Otherwise wait for silence
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
  };
}
```

### What is the purpose of the requestAnimationFrame method?

```javascript
// requestAnimationFrame schedules code to run before next repaint

// BASIC USAGE
function animate() {
  // Update position
  box.style.left = box.offsetLeft + 1 + 'px';
  
  // Schedule next frame
  requestAnimationFrame(animate);
}

// requestAnimationFrame(animate);

// BENEFITS

console.log("=== requestAnimationFrame Benefits ===\n");

console.log("1. SYNCHRONIZED WITH BROWSER");
console.log("   - Runs before repaint");
console.log("   - Smooth 60fps animations\n");

console.log("2. AUTOMATIC FRAME RATE");
console.log("   - Matches display refresh rate");
console.log("   - 60Hz, 120Hz, or variable\n");

console.log("3. BATTERY EFFICIENT");
console.log("   - Pauses when tab invisible");
console.log("   - Reduces CPU/GPU usage\n");

console.log("4. BETTER PERFORMANCE");
console.log("   - No jank or tearing");
console.log("   - Smoother than setTimeout\n");

// COMPARISON: setTimeout vs requestAnimationFrame

// ❌ Using setTimeout (unreliable timing)
let x = 0;
setInterval(() => {
  x += 1;
  element.style.left = x + 'px';
}, 16); // Assumes ~60fps

// ✅ Using requestAnimationFrame (reliable)
let y = 0;
function animateWithRAF() {
  y += 1;
  element.style.left = y + 'px';
  requestAnimationFrame(animateWithRAF);
}
requestAnimationFrame(animateWithRAF);

// COMPLEX ANIMATION EXAMPLE

class Animator {
  constructor(element) {
    this.element = element;
    this.isRunning = false;
    this.animationId = null;
  }
  
  animate(targetValue, property, duration) {
    const startValue = parseFloat(this.element.style[property] || 0);
    const startTime = performance.now();
    
    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease-in-out cubic
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      const value = startValue + (targetValue - startValue) * eased;
      this.element.style[property] = value + 'px';
      
      if (progress < 1) {
        this.animationId = requestAnimationFrame(step);
      } else {
        this.isRunning = false;
      }
    };
    
    this.isRunning = true;
    this.animationId = requestAnimationFrame(step);
  }
  
  stop() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.isRunning = false;
    }
  }
}

// MULTIPLE ANIMATIONS

const animations = [];

function animateMultiple() {
  animations.forEach(({ element, update }) => {
    update();
  });
  
  requestAnimationFrame(animateMultiple);
}

requestAnimationFrame(animateMultiple);

// GAME LOOP PATTERN

class GameLoop {
  constructor() {
    this.lastTime = performance.now();
    this.running = true;
  }
  
  start() {
    requestAnimationFrame((currentTime) => this.update(currentTime));
  }
  
  update(currentTime) {
    const deltaTime = (currentTime - this.lastTime) / 1000;
    this.lastTime = currentTime;
    
    // Update game state
    this.handleInput();
    this.updateLogic(deltaTime);
    this.render();
    
    if (this.running) {
      requestAnimationFrame((time) => this.update(time));
    }
  }
  
  handleInput() { /* ... */ }
  updateLogic(deltaTime) { /* ... */ }
  render() { /* ... */ }
}

// CANCELLING ANIMATION

let animationId = requestAnimationFrame(() => {
  element.style.opacity = 1;
});

// Later, cancel it:
cancelAnimationFrame(animationId);

// PERFORMANCE MEASUREMENT

function measureAnimationPerformance() {
  let frames = 0;
  const startTime = performance.now();
  
  const measure = () => {
    frames++;
    
    const elapsed = performance.now() - startTime;
    if (elapsed >= 1000) {
      console.log(`FPS: ${frames}`);
      frames = 0;
      // startTime = performance.now(); // Reset for next second
    }
    
    requestAnimationFrame(measure);
  };
  
  requestAnimationFrame(measure);
}

// BEST PRACTICES

console.log("\n=== Best Practices ===\n");

console.log("1. Use for animations and visual updates");
console.log("2. Avoid heavy computations in callback");
console.log("3. Cancel animations when not needed");
console.log("4. Use performance.now() for timing");
console.log("5. Batch DOM updates");
console.log("6. Use for game loops");
console.log("7. Match animation timing with refresh rate");
```

### What are some common performance bottlenecks in JavaScript applications?

```javascript
// COMMON PERFORMANCE ISSUES AND SOLUTIONS

console.log("=== Common Performance Bottlenecks ===\n");

// 1. MEMORY LEAKS

console.log("1. MEMORY LEAKS\n");

// ❌ Problematic: Event listener leak
function setupListener() {
  const element = document.querySelector('#myElement');
  element.addEventListener('click', function() {
    console.log('Clicked');
  });
  // If element is removed, listener stays in memory
}

// ✅ Solution: Clean up listeners
class SafeListener {
  constructor(element, event, handler) {
    this.element = element;
    this.event = event;
    this.handler = handler;
    this.element.addEventListener(event, handler);
  }
  
  remove() {
    this.element.removeEventListener(this.event, this.handler);
  }
}

// 2. SYNCHRONOUS DOM OPERATIONS

console.log("2. SYNCHRONOUS DOM OPERATIONS\n");

// ❌ Problematic: Forced synchronous layouts
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  const height = div.offsetHeight; // Forces layout! (slow)
  document.body.appendChild(div);
}

// ✅ Solution: Batch DOM operations
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment); // Single layout

// 3. EXCESSIVE REFLOWS AND REPAINTS

console.log("3. EXCESSIVE REFLOWS AND REPAINTS\n");

// ❌ Problematic: Multiple style changes
element.style.width = '100px';  // Reflow
element.style.height = '100px'; // Reflow
element.style.margin = '10px';  // Reflow

// ✅ Solution: Batch style changes
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';
// Or use classes
element.classList.add('styled');

// 4. BLOCKING MAIN THREAD

console.log("4. BLOCKING MAIN THREAD\n");

// ❌ Problematic: Long-running synchronous code
function processLargeData(data) {
  let result = 0;
  for (let i = 0; i < 1000000000; i++) {
    result += data[i % data.length];
  } // Blocks for seconds!
  return result;
}

// ✅ Solution: Use Web Workers or break into chunks
async function processLargeDataAsync(data) {
  return new Promise((resolve) => {
    const worker = new Worker('processor.js');
    worker.onmessage = (e) => {
      resolve(e.data);
      worker.terminate();
    };
    worker.postMessage(data);
  });
}

// 5. INEFFICIENT LOOPS

console.log("5. INEFFICIENT LOOPS\n");

// ❌ Problematic: DOM query in loop
const items = document.querySelectorAll('.item');
for (let i = 0; i < items.length; i++) {
  const height = items.length; // Unnecessary, recalculated
  items[i].style.height = height + 'px';
}

// ✅ Solution: Cache values
const itemCount = items.length;
for (let i = 0; i < itemCount; i++) {
  items[i].style.height = itemCount + 'px';
}

// 6. LARGE BUNDLE SIZES

console.log("6. LARGE BUNDLE SIZES\n");

console.log("Problems:");
console.log("  - Slow downloads");
console.log("  - Slow parsing");
console.log("  - High memory usage\n");

console.log("Solutions:");
console.log("  - Code splitting");
console.log("  - Tree shaking");
console.log("  - Lazy loading");
console.log("  - Minification");

// 7. UNOPTIMIZED IMAGES

console.log("7. UNOPTIMIZED IMAGES\n");

// ❌ Problematic
const img = document.createElement('img');
img.src = 'large-uncompressed.png'; // 5MB

// ✅ Solution: Use modern formats and sizes
const optimizedImg = document.createElement('img');
optimizedImg.srcset = 'image-small.webp 480w, image-large.webp 1200w';
optimizedImg.src = 'image-fallback.jpg';

// 8. INEFFICIENT EVENT HANDLERS

console.log("8. INEFFICIENT EVENT HANDLERS\n");

// ❌ Problematic: Multiple listeners
for (let i = 0; i < 1000; i++) {
  const item = document.querySelector(`.item-${i}`);
  item.addEventListener('click', handleClick); // 1000 listeners!
}

// ✅ Solution: Event delegation
const list = document.querySelector('.list');
list.addEventListener('click', (e) => {
  if (e.target.matches('.item')) {
    handleClick(e);
  }
}); // Single listener

// 9. MISSING HARDWARE ACCELERATION

console.log("9. MISSING HARDWARE ACCELERATION\n");

// ❌ Problematic: Animating slow properties
element.style.left = x + 'px'; // Forces reflow

// ✅ Solution: Use transform (GPU accelerated)
element.style.transform = `translateX(${x}px)`;

// 10. NETWORK REQUEST PROBLEMS

console.log("10. NETWORK REQUEST PROBLEMS\n");

// ❌ Problematic: Waterfall requests
fetch('/api/user')
  .then(r => r.json())
  .then(user => fetch(`/api/posts/${user.id}`)) // Wait for first
  .then(r => r.json());

// ✅ Solution: Parallel requests
Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/config').then(r => r.json())
]);

// MONITORING PERFORMANCE

console.log("\n=== Performance Monitoring ===\n");

// Measure operation time
const startTime = performance.now();
expensiveOperation();
const duration = performance.now() - startTime;
console.log(`Operation took ${duration}ms`);

// Mark and measure with Performance API
performance.mark('operation-start');
expensiveOperation();
performance.mark('operation-end');
performance.measure('operation', 'operation-start', 'operation-end');

const measure = performance.getEntriesByName('operation')[0];
console.log(`Operation duration: ${measure.duration}ms`);

function expensiveOperation() {
  // Simulate work
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += i;
  }
}
```

### Explain the concept of debouncing and throttling.

(Already covered in detail above)

### How can you optimize DOM manipulation for better performance?

```javascript
// DOM MANIPULATION OPTIMIZATION STRATEGIES

console.log("=== Optimizing DOM Manipulation ===\n");

// 1. BATCH UPDATES WITH DOCUMENTFRAGMENT

// ❌ Slow: Individual appends
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  div.textContent = `Item ${i}`;
  document.body.appendChild(div); // Reflow each time!
}

// ✅ Fast: Batch with fragment
const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  div.textContent = `Item ${i}`;
  fragment.appendChild(div); // No reflow
}
document.body.appendChild(fragment); // Single reflow

// 2. USE innerHTML FOR BULK CONTENT

// ❌ Slow: Many appendChild calls
const parent = document.querySelector('#parent');
for (let i = 0; i < 100; i++) {
  const child = document.createElement('div');
  child.textContent = `Child ${i}`;
  parent.appendChild(child);
}

// ✅ Fast: Use innerHTML
let html = '';
for (let i = 0; i < 100; i++) {
  html += `<div>Child ${i}</div>`;
}
parent.innerHTML = html;

// 3. CACHE DOM REFERENCES

// ❌ Slow: Query repeatedly
for (let i = 0; i < 1000; i++) {
  document.querySelector('#element').style.opacity = i / 1000;
}

// ✅ Fast: Cache reference
const element = document.querySelector('#element');
for (let i = 0; i < 1000; i++) {
  element.style.opacity = i / 1000;
}

// 4. BATCH STYLE CHANGES

// ❌ Slow: Multiple style assignments
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';
element.style.padding = '5px';

// ✅ Fast: Use cssText
element.style.cssText = 'width: 100px; height: 100px; margin: 10px; padding: 5px;';

// Or use classes
element.classList.add('styled-class');

// 5. USE CLASSES FOR BULK STYLE CHANGES

// ✅ Best practice
const stylesheet = `
  .active {
    width: 100px;
    height: 100px;
    background: blue;
    transform: scale(1.2);
  }
`;

// Add class instead of individual styles
element.classList.add('active');

// 6. AVOID READING AND WRITING IN SEQUENCE

// ❌ Problematic: Forced layouts
for (let i = 0; i < 100; i++) {
  element.style.width = element.offsetWidth + 10 + 'px'; // Read then write!
}

// ✅ Better: Read once, write once
const width = element.offsetWidth;
element.style.width = (width + 10) + 'px';

// 7. VIRTUAL SCROLLING FOR LARGE LISTS

class VirtualScroller {
  constructor(container, items, itemHeight) {
    this.container = container;
    this.items = items;
    this.itemHeight = itemHeight;
    this.visibleCount = Math.ceil(container.clientHeight / itemHeight);
    this.scrollTop = 0;
    
    this.container.addEventListener('scroll', () => {
      this.scrollTop = this.container.scrollTop;
      this.render();
    });
    
    this.render();
  }
  
  render() {
    const startIndex = Math.floor(this.scrollTop / this.itemHeight);
    const endIndex = startIndex + this.visibleCount;
    
    const visibleItems = this.items.slice(startIndex, endIndex);
    const html = visibleItems
      .map((item, i) => {
        const top = (startIndex + i) * this.itemHeight;
        return `<div style="position: absolute; top: ${top}px;">${item}</div>`;
      })
      .join('');
    
    this.container.innerHTML = html;
  }
}

// 8. USE INNERTEXT INSTEAD OF TEXTCONTENT FOR READABILITY

// textContent: Gets all text
const text1 = element.textContent;

// innerText: Respects CSS visibility/display
const text2 = element.innerText;

// 9. CLONING FOR MULTIPLE SIMILAR ELEMENTS

// ❌ Slow: Create each element
for (let i = 0; i < 1000; i++) {
  const div = document.createElement('div');
  div.className = 'item';
  div.textContent = `Item ${i}`;
  document.body.appendChild(div);
}

// ✅ Fast: Clone template
const template = document.createElement('div');
template.className = 'item';

const fragment = document.createDocumentFragment();
for (let i = 0; i < 1000; i++) {
  const clone = template.cloneNode(true);
  clone.textContent = `Item ${i}`;
  fragment.appendChild(clone);
}
document.body.appendChild(fragment);

// 10. USE REQUESTANIMATIONFRAME FOR VISUAL UPDATES

// ❌ Not optimized
window.addEventListener('scroll', updateUI);

// ✅ Optimized: Throttle with RAF
let updateScheduled = false;
function onScroll() {
  if (!updateScheduled) {
    updateScheduled = true;
    requestAnimationFrame(() => {
      updateUI();
      updateScheduled = false;
    });
  }
}
window.addEventListener('scroll', onScroll);

function updateUI() {
  const scrollTop = window.scrollY;
  const visible = document.elementsFromPoint(
    window.innerWidth / 2,
    window.innerHeight / 2
  );
  // Update visible elements
}

// MEASUREMENT AND PROFILING

console.log("\n=== Measuring DOM Performance ===\n");

function measureDOMPerformance() {
  const start = performance.now();
  
  // Measure operation
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < 1000; i++) {
    const div = document.createElement('div');
    div.textContent = `Item ${i}`;
    fragment.appendChild(div);
  }
  document.body.appendChild(fragment);
  
  const duration = performance.now() - start;
  console.log(`DOM operation took ${duration.toFixed(2)}ms`);
}

// BEST PRACTICES CHECKLIST

console.log("=== DOM Optimization Checklist ===\n");

const checklist = [
  "✓ Use DocumentFragment for batch updates",
  "✓ Cache DOM references",
  "✓ Batch style changes",
  "✓ Use classes instead of inline styles",
  "✓ Avoid reading/writing DOM in loops",
  "✓ Use virtual scrolling for large lists",
  "✓ Use requestAnimationFrame for visual updates",
  "✓ Clone elements instead of creating new ones",
  "✓ Use event delegation",
  "✓ Remove unused DOM elements",
  "✓ Lazy load images",
  "✓ Use CSS animations over JavaScript"
];

checklist.forEach(item => console.log(item));
```

---

### What are some techniques for reducing reflows and repaints?

```javascript
// REFLOW AND REPAINT OPTIMIZATION

console.log("=== Reducing Reflows and Repaints ===\n");

console.log("REFLOW - Recalculates layout");
console.log("REPAINT - Redraws pixels\n");

// TRIGGERS OF REFLOW

console.log("Reflow triggers:");
const reflowTriggers = [
  "Reading: offsetHeight, offsetWidth, clientHeight",
  "Reading: scrollTop, scrollLeft",
  "Reading: getComputedStyle()",
  "Writing: element.style properties",
  "DOM changes: appendChild, removeChild",
  "Window resize",
  "Font changes"
];

reflowTriggers.forEach(t => console.log(`  - ${t}`));

// TRIGGERS OF REPAINT

console.log("\nRepaint triggers:");
const repaintTriggers = [
  "Color changes",
  "Background changes",
  "Visibility changes",
  "Box-shadow, text-shadow",
  "Opacity changes"
];

repaintTriggers.forEach(t => console.log(`  - ${t}`));

// 1. MINIMIZE LAYOUT THRASHING

// ❌ Bad: Read-Write-Read pattern
const heights = [];
for (let i = 0; i < 100; i++) {
  elements[i].style.height = baseHeight + 'px';
  heights.push(elements[i].offsetHeight); // Reflow!
  elements[i].style.height = baseHeight * 2 + 'px';
  heights.push(elements[i].offsetHeight); // Reflow!
}

// ✅ Good: Batch reads, then writes
const readHeights = [];
for (let i = 0; i < 100; i++) {
  readHeights.push(elements[i].offsetHeight);
}

for (let i = 0; i < 100; i++) {
  elements[i].style.height = (readHeights[i] * 2) + 'px';
}

// 2. USE TRANSFORMS INSTEAD OF POSITION

// ❌ Causes reflow
element.style.left = x + 'px';
element.style.top = y + 'px';

// ✅ GPU accelerated, no reflow
element.style.transform = `translate(${x}px, ${y}px)`;

// 3. HIDE, MODIFY, SHOW

// ❌ Multiple reflows
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';
element.style.padding = '5px';
// Multiple reflows during modifications

// ✅ Single reflow
element.style.display = 'none'; // Reflow (1)
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';
element.style.padding = '5px';
// No reflows during modifications
element.style.display = 'block'; // Reflow (2)

// 4. USE CSS CLASSES

// ❌ Individual style changes
element.style.color = 'red';
element.style.fontSize = '16px';
element.style.fontWeight = 'bold';

// ✅ Single class change
element.classList.add('highlighted');
// CSS:
// .highlighted { color: red; font-size: 16px; font-weight: bold; }

// 5. BATCH DOM OPERATIONS

// ❌ Multiple reflows
for (let i = 0; i < 100; i++) {
  document.body.appendChild(elements[i]); // Reflow each time
}

// ✅ Single reflow
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  fragment.appendChild(elements[i]);
}
document.body.appendChild(fragment);

// 6. DEBOUNCE RESIZE EVENTS

// ❌ Reflow on every pixel change
window.addEventListener('resize', () => {
  updateLayout();
});

// ✅ Debounce to batch reflows
const debouncedResize = debounce(() => {
  updateLayout();
}, 250);

window.addEventListener('resize', debouncedResize);

function debounce(fn, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// 7. PREVENT FORCED SYNCHRONOUS LAYOUTS

// ❌ Forced layout
function updateElements() {
  for (let i = 0; i < elements.length; i++) {
    const height = elements[i].offsetHeight; // Forces layout!
    elements[i].style.height = (height + 10) + 'px';
  }
}

// ✅ Use LayoutScheduler or RAF
function updateElementsOptimized() {
  requestAnimationFrame(() => {
    const heights = elements.map(e => e.offsetHeight); // Read all
    elements.forEach((e, i) => {
      e.style.height = (heights[i] + 10) + 'px'; // Write all
    });
  });
}

// 8. USE CSS CONTAINMENT

// ✅ Limit reflow scope with CSS
const styles = `
  .card {
    contain: layout style paint;
  }
`;
// Changes inside .card won't affect outside

// 9. VIRTUAL SCROLLING PREVENTS REFLOWS

class OptimizedScroller {
  constructor(container, items) {
    this.container = container;
    this.items = items;
    this.visible = [];
    
    container.addEventListener('scroll', () => {
      this.updateVisible();
    });
  }
  
  updateVisible() {
    // Only update visible items
    const scrollTop = this.container.scrollTop;
    const startIndex = Math.floor(scrollTop / 30); // 30px per item
    const endIndex = startIndex + 20; // Show 20 items
    
    if (this.startIndex !== startIndex) {
      this.startIndex = startIndex;
      this.render(startIndex, endIndex);
    }
  }
  
  render(start, end) {
    // Render only visible items (minimal reflows)
  }
}

// 10. PERFORMANCE MONITORING

console.log("\n=== Monitoring Reflows/Repaints ===\n");

// Using PerformanceObserver
if (window.PerformanceObserver) {
  try {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('Long task:', entry.duration);
      }
    });
    observer.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    console.log('Long task API not available');
  }
}

// Chrome DevTools: Rendering tab shows reflows/repaints
// Paint timing can be measured with performance.measure()

console.log("\n=== Best Practices ===\n");

const practices = [
  "✓ Batch DOM reads and writes",
  "✓ Use transform instead of position",
  "✓ Use classList instead of inline styles",
  "✓ Use DocumentFragment for bulk changes",
  "✓ Debounce resize/scroll events",
  "✓ Avoid reading layout properties in loops",
  "✓ Use CSS containment",
  "✓ Use virtual scrolling",
  "✓ Use requestAnimationFrame",
  "✓ Monitor with DevTools"
];

practices.forEach(p => console.log(p));
```

---

### Explain the concept of lazy loading and how it can improve performance.

```javascript
// LAZY LOADING - Load resources only when needed

console.log("=== Lazy Loading ===\n");

console.log("Benefits:");
console.log("  - Faster initial page load");
console.log("  - Reduced bandwidth usage");
console.log("  - Better user experience");
console.log("  - Improved Core Web Vitals\n");

// 1. LAZY LOAD IMAGES

// ❌ Eager loading: All images loaded upfront
const eagerImages = `
  <img src="image1.jpg" alt="Image 1">
  <img src="image2.jpg" alt="Image 2">
  <img src="image3.jpg" alt="Image 3">
`;

// ✅ Lazy loading: Images loaded when visible
const lazyImages = `
  <img loading="lazy" src="image1.jpg" alt="Image 1">
  <img loading="lazy" src="image2.jpg" alt="Image 2">
  <img loading="lazy" src="image3.jpg" alt="Image 3">
`;

// INTERSECTION OBSERVER FOR LAZY LOADING

const imageObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src; // Load image
      img.classList.add('loaded');
      imageObserver.unobserve(img);
    }
  });
});

// Observe all lazy images
document.querySelectorAll('img[data-src]').forEach(img => {
  imageObserver.observe(img);
});

// 2. LAZY LOAD COMPONENTS

// ❌ All components loaded upfront
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Reports from './components/Reports';

// ✅ Components loaded when route changes
const Dashboard = lazy(() => import('./components/Dashboard'));
const Analytics = lazy(() => import('./components/Analytics'));
const Reports = lazy(() => import('./components/Reports'));

function lazy(factory) {
  return function LazyComponent() {
    const [Component, setComponent] = React.useState(null);
    
    React.useEffect(() => {
      factory().then(module => {
        setComponent(() => module.default);
      });
    }, []);
    
    return Component ? <Component /> : <div>Loading...</div>;
  };
}

// 3. CODE SPLITTING WITH DYNAMIC IMPORTS

// ❌ One large bundle
const app = require('./app.js');

// ✅ Code splitting
async function loadFeature() {
  if (userNeedsFeature) {
    const feature = await import('./features/advanced.js');
    return feature.init();
  }
}

// 4. LAZY LOAD SCRIPTS

// ❌ Blocks page render
<script src="analytics.js"></script>

// ✅ Non-critical script loaded asynchronously
<script src="analytics.js" async></script>

// Or dynamically load
const script = document.createElement('script');
script.src = 'analytics.js';
script.async = true;
document.head.appendChild(script);

// 5. LAZY LOAD STYLESHEETS

// ❌ Blocks rendering
<link rel="stylesheet" href="styles.css">

// ✅ Load critical CSS inline, rest asynchronously
<style>
  /* Critical CSS inline */
</style>

<link rel="preload" href="styles.css" as="style">
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">

// 6. INFINITE SCROLL WITH LAZY LOADING

class InfiniteScroll {
  constructor(container) {
    this.container = container;
    this.page = 1;
    this.loading = false;
    
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.loading) {
        this.loadMore();
      }
    });
  }
  
  async loadMore() {
    this.loading = true;
    const response = await fetch(`/api/items?page=${this.page}`);
    const items = await response.json();
    
    items.forEach(item => {
      const el = document.createElement('div');
      el.textContent = item.title;
      this.container.appendChild(el);
    });
    
    this.page++;
    this.loading = false;
  }
  
  start() {
    const sentinel = document.createElement('div');
    this.container.appendChild(sentinel);
    this.observer.observe(sentinel);
  }
}

// 7. LAZY LOAD ROUTES

// React Router example
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

<Routes>
  <Route path="/" element={<Suspense fallback={<Loading />}><Home /></Suspense>} />
  <Route path="/about" element={<Suspense fallback={<Loading />}><About /></Suspense>} />
  <Route path="/contact" element={<Suspense fallback={<Loading />}><Contact /></Suspense>} />
</Routes>

// 8. PERFORMANCE METRICS

console.log("\n=== Performance Impact ===\n");

const metrics = {
  "Before lazy loading": {
    initialLoad: "3.5s",
    bundleSize: "500KB",
    timeToInteractive: "4.2s"
  },
  "After lazy loading": {
    initialLoad: "0.9s", // 74% faster
    bundleSize: "120KB", // 76% smaller
    timeToInteractive: "1.1s" // 74% faster
  }
};

Object.entries(metrics).forEach(([scenario, data]) => {
  console.log(scenario + ":");
  Object.entries(data).forEach(([metric, value]) => {
    console.log(`  ${metric}: ${value}`);
  });
  console.log();
});

// 9. MONITORING LAZY LOADS

function trackLazyLoad(element, name) {
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      const startTime = performance.now();
      
      loadElement().then(() => {
        const duration = performance.now() - startTime;
        analytics.track('lazy_load', {
          element: name,
          duration
        });
      });
      
      observer.unobserve(element);
    }
  });
  
  observer.observe(element);
}

async function loadElement() {
  // Simulate loading
  return new Promise(resolve => setTimeout(resolve, 100));
}

// 10. BEST PRACTICES

console.log("\n=== Lazy Loading Best Practices ===\n");

const bestPractices = [
  "✓ Use native lazy loading for images (loading='lazy')",
  "✓ Use Intersection Observer for custom lazy loading",
  "✓ Code split at route boundaries",
  "✓ Lazy load non-critical components",
  "✓ Show loading states",
  "✓ Monitor lazy load performance",
  "✓ Consider LCP (Largest Contentful Paint)",
  "✓ Preload critical resources",
  "✓ Use network-aware loading",
  "✓ Combine with other optimization techniques"
];

bestPractices.forEach(p => console.log(p));
```

---

### What are Web Workers and how can they be used to improve performance?

```javascript
// WEB WORKERS - Run JavaScript in background threads

console.log("=== Web Workers ===\n");

console.log("Benefits:");
console.log("  - Don't block main thread");
console.log("  - True parallel execution");
console.log("  - Better for CPU-intensive tasks");
console.log("  - Improved responsiveness\n");

// MAIN THREAD CODE

// Create worker
const worker = new Worker('worker.js');

// Send data to worker
const largeData = new Array(1000000).fill(0);
worker.postMessage({
  type: 'PROCESS',
  data: largeData
});

// Receive results from worker
worker.onmessage = (event) => {
  const result = event.data;
  console.log('Result from worker:', result);
  updateUI(result);
};

// Handle errors
worker.onerror = (error) => {
  console.error('Worker error:', error.message);
};

// Terminate when done
worker.terminate();

// WORKER FILE (worker.js)

/*
// Worker thread - separate from main thread
self.onmessage = (event) => {
  const { type, data } = event.data;
  
  if (type === 'PROCESS') {
    // CPU-intensive work here (doesn't block UI)
    const result = processLargeData(data);
    
    // Send result back to main thread
    self.postMessage(result);
  }
};

function processLargeData(data) {
  // Expensive computation
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i];
  }
  return sum;
}
*/

// PRACTICAL EXAMPLE: FIBONACCI WITH WORKER

class FibonacciWorker {
  constructor() {
    this.worker = new Worker('fibonacci-worker.js');
  }
  
  async calculate(n) {
    return new Promise((resolve, reject) => {
      this.worker.onmessage = (e) => resolve(e.data);
      this.worker.onerror = reject;
      this.worker.postMessage(n);
    });
  }
}

// Usage
const fib = new FibonacciWorker();
// fib.calculate(40).then(result => console.log(result));

// FIBONACCI WORKER (fibonacci-worker.js)

/*
self.onmessage = (event) => {
  const n = event.data;
  const result = fibonacci(n);
  self.postMessage(result);
};

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
*/

// SHARED WEB WORKER (Shared across tabs)

/*
// Main thread
const sharedWorker = new SharedWorker('shared-worker.js');
sharedWorker.port.start();
sharedWorker.port.postMessage('Hello');
sharedWorker.port.onmessage = (e) => {
  console.log('From worker:', e.data);
};

// Shared worker file
const ports = [];
self.onconnect = (event) => {
  const port = event.ports[0];
  ports.push(port);
  
  port.onmessage = (e) => {
    // Broadcast to all connected tabs
    ports.forEach(p => p.postMessage(e.data));
  };
  
  port.start();
};
*/

// TRANSFERABLE OBJECTS (Move ownership, not copy)

// ❌ Copy (slow for large data)
const buffer = new ArrayBuffer(1024 * 1024 * 10); // 10MB
worker.postMessage(buffer); // Copies 10MB!

// ✅ Transfer (move ownership)
const buffer = new ArrayBuffer(1024 * 1024 * 10);
worker.postMessage(buffer, [buffer]); // Transfers ownership
// buffer is now empty in main thread

// WORKER POOL FOR LOAD BALANCING

class WorkerPool {
  constructor(workerScript, poolSize = 4) {
    this.workers = [];
    this.taskQueue = [];
    this.activeWorkers = new Set();
    
    for (let i = 0; i < poolSize; i++) {
      const worker = new Worker(workerScript);
      worker.onmessage = (e) => this.handleResult(worker, e.data);
      worker.onerror = (error) => this.handleError(worker, error);
      this.workers.push(worker);
    }
  }
  
  async execute(task) {
    return new Promise((resolve, reject) => {
      const item = { task, resolve, reject };
      
      const availableWorker = this.workers.find(
        w => !this.activeWorkers.has(w)
      );
      
      if (availableWorker) {
        this.processTask(availableWorker, item);
      } else {
        this.taskQueue.push(item);
      }
    });
  }
  
  processTask(worker, item) {
    this.activeWorkers.add(worker);
    worker._taskItem = item;
    worker.postMessage(item.task);
  }
  
  handleResult(worker, result) {
    const item = worker._taskItem;
    item.resolve(result);
    this.activeWorkers.delete(worker);
    
    // Process next task
    if (this.taskQueue.length > 0) {
      const nextItem = this.taskQueue.shift();
      this.processTask(worker, nextItem);
    }
  }
  
  handleError(worker, error) {
    const item = worker._taskItem;
    item.reject(error);
    this.activeWorkers.delete(worker);
  }
  
  terminate() {
    this.workers.forEach(w => w.terminate());
  }
}

// Usage
const pool = new WorkerPool('task-worker.js', 4);
// pool.execute({ type: 'PROCESS', data: largeData });

// WORKER LIMITATIONS

console.log("\n=== Worker Limitations ===\n");

console.log("Workers CANNOT:");
console.log("  - Access DOM");
console.log("  - Access window object");
console.log("  - Access parent document");
console.log("  - Use alert() or confirm()");
console.log("  - Access parent scope directly\n");

console.log("Workers CAN:");
console.log("  - Use setTimeout/setInterval");
console.log("  - Use fetch/XMLHttpRequest");
console.log("  - Use WebSockets");
console.log("  - Access navigator object");
console.log("  - Load scripts with importScripts()");

// SERVICE WORKERS (Special type of web worker)

/*
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}

// Service worker enables:
// - Offline functionality
// - Background sync
// - Push notifications
// - Caching strategies
*/

// PERFORMANCE COMPARISON

console.log("\n=== Performance Metrics ===\n");

const comparison = {
  "Fibonacci(40) on Main Thread": "3.5s (blocks UI)",
  "Fibonacci(40) with Worker": "3.5s (doesn't block)",
  "Processing 10MB Main Thread": "800ms freeze",
  "Processing 10MB with Worker": "No freeze"
};

Object.entries(comparison).forEach(([scenario, result]) => {
  console.log(`${scenario}: ${result}`);
});

// BEST PRACTICES

console.log("\n=== Best Practices ===\n");

const practices = [
  "✓ Use for CPU-intensive tasks",
  "✓ Use for heavy computations",
  "✓ Don't create too many workers (use pool)",
  "✓ Use transferable objects for large data",
  "✓ Handle errors properly",
  "✓ Terminate workers when done",
  "✓ Monitor worker performance",
  "✓ Use SharedWorker for shared state",
  "✓ Consider startup overhead",
  "✓ Use for background tasks"
];

practices.forEach(p => console.log(p));
```

---

(Content continues with more performance optimization topics...)

### Explain the concept of caching and how it can be used to improve performance.

```javascript
// CACHING STRATEGIES FOR PERFORMANCE

console.log("=== Caching Strategies ===\n");

// 1. BROWSER CACHING

// ❌ No caching (server response)
Response {
  headers: {
    "Cache-Control": "no-cache"
  }
}

// ✅ With caching
Response {
  headers: {
    "Cache-Control": "public, max-age=3600" // Cache for 1 hour
  }
}

// 2. HTTP CACHING WITH HEADERS

const cacheHeaders = {
  "Cache-Control": "public, max-age=31536000", // 1 year (immutable)
  "ETag": '"abc123"', // Verify freshness
  "Last-Modified": "Wed, 01 Jan 2025 00:00:00 GMT"
};

// 3. MEMORY CACHING (Application Level)

class MemoryCache {
  constructor(maxSize = 100) {
    this.cache = new Map();
    this.maxSize = maxSize;
  }
  
  get(key) {
    const item = this.cache.get(key);
    if (item) {
      if (item.expiresAt && Date.now() > item.expiresAt) {
        this.cache.delete(key); // Expired
        return null;
      }
      item.hits++;
      item.lastAccess = Date.now();
      return item.value;
    }
    return null;
  }
  
  set(key, value, ttl = null) {
    if (this.cache.size >= this.maxSize) {
      // Evict least recently used
      const lru = Array.from(this.cache.entries())
        .sort((a, b) => a[1].lastAccess - b[1].lastAccess)[0];
      this.cache.delete(lru[0]);
    }
    
    this.cache.set(key, {
      value,
      expiresAt: ttl ? Date.now() + ttl : null,
      hits: 0,
      lastAccess: Date.now()
    });
  }
  
  clear() {
    this.cache.clear();
  }
}

const cache = new MemoryCache();
cache.set('user:1', { id: 1, name: 'John' }, 5 * 60 * 1000); // 5 min TTL
const user = cache.get('user:1');

// 4. MEMOIZATION (Function result caching)

function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Cache hit');
      return cache.get(key);
    }
    
    console.log('Cache miss');
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCompute = memoize((n) => {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += i;
  }
  return sum;
});

// 5. LOCAL STORAGE CACHING

class LocalStorageCache {
  set(key, value, ttl = null) {
    const item = {
      value,
      expiresAt: ttl ? Date.now() + ttl : null
    };
    localStorage.setItem(key, JSON.stringify(item));
  }
  
  get(key) {
    const item = JSON.parse(localStorage.getItem(key));
    if (!item) return null;
    
    if (item.expiresAt && Date.now() > item.expiresAt) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  }
}

const lsCache = new LocalStorageCache();
lsCache.set('user', { id: 1 }, 24 * 60 * 60 * 1000); // 24 hours

// 6. SERVICE WORKER CACHING

/*
// sw.js
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/script.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Cache first strategy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Cached
        }
        
        return fetch(event.request)
          .then(response => {
            const cache = caches.open(CACHE_NAME);
            cache.then(c => c.put(event.request, response.clone()));
            return response;
          });
      })
  );
});
*/

// 7. API RESPONSE CACHING

class APICache {
  constructor() {
    this.cache = new Map();
  }
  
  async fetch(url, options = {}) {
    const ttl = options.ttl || 5 * 60 * 1000; // 5 min default
    
    // Check cache
    const cached = this.cache.get(url);
    if (cached && Date.now() - cached.timestamp < ttl) {
      return cached.data;
    }
    
    // Fetch from API
    const response = await fetch(url);
    const data = await response.json();
    
    // Cache result
    this.cache.set(url, {
      data,
      timestamp: Date.now()
    });
    
    return data;
  }
}

const apiCache = new APICache();
// apiCache.fetch('/api/users', { ttl: 10 * 60 * 1000 });

// 8. INDEXED DB CACHING (Large data)

class IndexedDBCache {
  constructor(dbName) {
    this.dbName = dbName;
    this.db = null;
    this.init();
  }
  
  async init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        db.createObjectStore('cache', { keyPath: 'id' });
      };
    });
  }
  
  async set(key, value) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cache'], 'readwrite');
      const store = transaction.objectStore('cache');
      const request = store.put({ id: key, value });
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }
  
  async get(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction(['cache'], 'readonly');
      const store = transaction.objectStore('cache');
      const request = store.get(key);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        resolve(request.result?.value || null);
      };
    });
  }
}

// 9. CACHING STRATEGY PATTERNS

console.log("\n=== Caching Patterns ===\n");

// Cache First: Check cache, fall back to network
async function cacheFirst(request) {
  const cache = await caches.open('v1');
  const cached = await cache.match(request);
  if (cached) return cached;
  return fetch(request);
}

// Network First: Try network, fall back to cache
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open('v1');
    cache.put(request, response.clone());
    return response;
  } catch (e) {
    return caches.match(request);
  }
}

// Stale While Revalidate: Return cache, update in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open('v1');
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request).then(response => {
    cache.put(request, response.clone());
    return response;
  });
  
  return cached || fetchPromise;
}

// 10. CACHE INVALIDATION

class CacheManager {
  async invalidate(pattern) {
    const cacheNames = await caches.keys();
    
    for (const name of cacheNames) {
      const cache = await caches.open(name);
      const keys = await cache.keys();
      
      for (const request of keys) {
        if (request.url.match(pattern)) {
          await cache.delete(request);
        }
      }
    }
  }
  
  async clearAll() {
    const cacheNames = await caches.keys();
    return Promise.all(
      cacheNames.map(name => caches.delete(name))
    );
  }
}

// PERFORMANCE METRICS

console.log("\n=== Cache Performance Impact ===\n");

const metrics = {
  "Without caching": {
    "First load": "3.2s",
    "Subsequent load": "3.2s",
    "API calls": "100%"
  },
  "With caching": {
    "First load": "3.2s",
    "Subsequent load": "0.2s",
    "API calls": "5%"
  }
};

Object.entries(metrics).forEach(([scenario, data]) => {
  console.log(scenario + ":");
  Object.entries(data).forEach(([metric, value]) => {
    console.log(`  ${metric}: ${value}`);
  });
  console.log();
});
```

---

## Testing

### What are some tools that can be used to measure and analyze JavaScript performance?

```javascript
// PERFORMANCE ANALYSIS TOOLS

console.log("=== Performance Tools ===\n");

// 1. CHROME DEVTOOLS PERFORMANCE TAB

console.log("Chrome DevTools:");
console.log("  - Record and analyze user sessions");
console.log("  - Identify bottlenecks");
console.log("  - View frames, main thread activity");
console.log("  - JavaScript profiling\n");

// 2. PERFORMANCE API (Built-in)

// Measure custom operations
performance.mark('operation-start');
expensiveOperation();
performance.mark('operation-end');

performance.measure('operation', 'operation-start', 'operation-end');
const measure = performance.getEntriesByName('operation')[0];
console.log(`Operation took ${measure.duration}ms`);

function expensiveOperation() {
  let sum = 0;
  for (let i = 0; i < 100000000; i++) {
    sum += i;
  }
}

// 3. LIGHTHOUSE

/*
Run in Chrome DevTools:
  - Click Lighthouse tab
  - Select categories (Performance, Accessibility, SEO)
  - Run audit
  - Get scores and recommendations
  
Metrics measured:
  - First Contentful Paint (FCP)
  - Largest Contentful Paint (LCP)
  - Cumulative Layout Shift (CLS)
  - Time to Interactive (TTI)
  - Total Blocking Time (TBT)
*/

// 4. WEB VITALS LIBRARY

/*
npm install web-vitals

import {
  getCLS,
  getFID,
  getFCP,
  getLCP,
  getTTFB
} from 'web-vitals';

getCLS(console.log); // Cumulative Layout Shift
getFID(console.log); // First Input Delay
getFCP(console.log); // First Contentful Paint
getLCP(console.log); // Largest Contentful Paint
getTTFB(console.log); // Time to First Byte
*/

// 5. PERFORMANCE.NOW() FOR TIMING

const startTime = performance.now();
heavyTask();
const endTime = performance.now();
console.log(`Task took ${endTime - startTime}ms`);

function heavyTask() {
  let sum = 0;
  for (let i = 0; i < 50000000; i++) {
    sum += i;
  }
}

// 6. RESOURCETIMING API

const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log(`${resource.name}: ${resource.duration}ms`);
});

// 7. PAINT TIMING

const paintEntries = performance.getEntriesByType('paint');
paintEntries.forEach(entry => {
  console.log(`${entry.name}: ${entry.startTime}ms`);
});

// 8. LONG TASK API

/*
Detect tasks blocking main thread > 50ms

const observer = new PerformanceObserver(list => {
  for (const entry of list.getEntries()) {
    console.log('Long task:', entry.duration);
  }
});

observer.observe({ entryTypes: ['longtask'] });
*/

// 9. WEBPACK BUNDLE ANALYZER

/*
npm install --save-dev webpack-bundle-analyzer

In webpack.config.js:
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

plugins: [
  new BundleAnalyzerPlugin()
]

Shows interactive treemap of bundle contents
*/

// 10. SPEED TESTING TOOLS

console.log("\n=== Online Testing Tools ===\n");

const tools = [
  "PageSpeed Insights - Google's analysis",
  "GTmetrix - Detailed waterfall charts",
  "WebPageTest - Advanced testing",
  "Pingdom - Uptime monitoring",
  "Speedcurve - Continuous monitoring",
  "Sentry - Error tracking & performance"
];

tools.forEach(t => console.log(`  - ${t}`));

// 11. CUSTOM PERFORMANCE MONITORING

class PerformanceMonitor {
  constructor() {
    this.metrics = {};
  }
  
  mark(name) {
    this.metrics[name] = { start: performance.now() };
  }
  
  measure(name) {
    if (this.metrics[name]) {
      const duration = performance.now() - this.metrics[name].start;
      this.metrics[name].duration = duration;
      return duration;
    }
  }
  
  reportAll() {
    const report = {};
    Object.entries(this.metrics).forEach(([key, value]) => {
      report[key] = value.duration ? `${value.duration.toFixed(2)}ms` : 'Not completed';
    });
    return report;
  }
}

const monitor = new PerformanceMonitor();
monitor.mark('api-call');
// ... perform operation ...
const duration = monitor.measure('api-call');
console.log(monitor.reportAll());

// 12. MEMORY PROFILING

/*
Chrome DevTools Memory tab:
  - Take heap snapshots
  - Record heap allocations
  - Identify memory leaks
  - Monitor memory usage
  
In code:
if (performance.memory) {
  console.log(`Used: ${performance.memory.usedJSHeapSize}`);
  console.log(`Total: ${performance.memory.totalJSHeapSize}`);
}
*/

// 13. NETWORK TIMING

const networkResources = performance.getEntriesByType('resource');
networkResources.forEach(resource => {
  const timing = {
    name: resource.name,
    duration: resource.duration,
    size: resource.transferSize,
    cached: resource.transferSize === 0
  };
  console.log(timing);
});

// PERFORMANCE BUDGETS

console.log("\n=== Setting Performance Budgets ===\n");

const budget = {
  "JavaScript": "150KB",
  "CSS": "50KB",
  "Images": "300KB",
  "LCP": "2.5s",
  "FID": "100ms",
  "CLS": "0.1"
};

Object.entries(budget).forEach(([metric, limit]) => {
  console.log(`${metric}: ${limit}`);
});
```

### How can you optimize network requests for better performance?

```javascript
// NETWORK OPTIMIZATION STRATEGIES

console.log("=== Network Optimization ===\n");

// 1. REDUCE NUMBER OF REQUESTS

// ❌ Multiple separate requests
fetch('/api/user');
fetch('/api/posts');
fetch('/api/comments');
// 3 separate requests, waterfall effect

// ✅ Combine related endpoints
fetch('/api/data?include=user,posts,comments');

// Or use GraphQL (single request, exact data needed)
/*
query {
  user { id name }
  posts { id title }
  comments { id text }
}
*/

// 2. USE HTTP/2 SERVER PUSH

/*
// Server sends resources proactively
response.writeHead(200, {
  'Link': '</styles.css>; rel=preload; as=style'
});
*/

// Or in HTML
/*
<link rel="preload" href="styles.css" as="style">
*/

// 3. IMPLEMENT REQUEST BATCHING

class RequestBatcher {
  constructor(endpoint, batchSize = 10) {
    this.endpoint = endpoint;
    this.batchSize = batchSize;
    this.queue = [];
    this.batchTimeout = null;
  }
  
  async request(item) {
    return new Promise((resolve, reject) => {
      this.queue.push({ item, resolve, reject });
      
      if (this.queue.length >= this.batchSize) {
        this.flush();
      } else if (!this.batchTimeout) {
        this.batchTimeout = setTimeout(() => this.flush(), 100);
      }
    });
  }
  
  async flush() {
    if (this.queue.length === 0) return;
    
    const batch = this.queue.splice(0, this.batchSize);
    clearTimeout(this.batchTimeout);
    this.batchTimeout = null;
    
    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        body: JSON.stringify(batch.map(b => b.item))
      });
      
      const results = await response.json();
      batch.forEach((item, i) => {
        item.resolve(results[i]);
      });
    } catch (error) {
      batch.forEach(item => item.reject(error));
    }
  }
}

const batcher = new RequestBatcher('/api/batch');
// batcher.request({ id: 1 });

// 4. PARALLELIZE REQUESTS

// ❌ Sequential (slow)
const user = await fetch('/api/user').then(r => r.json());
const posts = await fetch(`/api/posts/${user.id}`).then(r => r.json());

// ✅ Parallel (fast)
const [user, posts] = await Promise.all([
  fetch('/api/user').then(r => r.json()),
  fetch('/api/posts/1').then(r => r.json())
]);

// 5. IMPLEMENT SMART CACHING

class SmartCache {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
  }
  
  async fetch(url, options = {}) {
    const ttl = options.ttl || 5 * 60 * 1000;
    
    // Return cached if valid
    if (this.cache.has(url)) {
      const { data, timestamp } = this.cache.get(url);
      if (Date.now() - timestamp < ttl) {
        return data;
      }
    }
    
    // Return pending if request in flight
    if (this.pendingRequests.has(url)) {
      return this.pendingRequests.get(url);
    }
    
    // Fetch and cache
    const promise = fetch(url)
      .then(r => r.json())
      .then(data => {
        this.cache.set(url, { data, timestamp: Date.now() });
        this.pendingRequests.delete(url);
        return data;
      });
    
    this.pendingRequests.set(url, promise);
    return promise;
  }
}

// 6. COMPRESS DATA

// ❌ Uncompressed (100KB)
const largeData = new Array(100000).fill(0);

// ✅ Compressed (server-side, 2KB)
/*
Server should include:
Content-Encoding: gzip
*/

// 7. MINIFY AND BUNDLE

console.log("Minification results:");
console.log("  Original: 50KB");
console.log("  Minified: 15KB");
console.log("  Gzipped: 4KB");

// 8. USE CDN

/*
Without CDN:
  US user: 50ms
  EU user: 200ms
  Asia user: 400ms

With CDN:
  All users: 50ms
*/

// 9. LAZY LOAD RESOURCES

// ❌ Load everything
const allScripts = ['script1.js', 'script2.js', 'script3.js'];
allScripts.forEach(src => {
  const script = document.createElement('script');
  script.src = src;
  document.body.appendChild(script);
});

// ✅ Load on demand
async function loadScriptOnDemand(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// 10. USE SERVICE WORKERS FOR OFFLINE

/*
Service workers enable:
  - Offline functionality
  - Smart caching
  - Background sync
  - Faster repeat visits
*/

// 11. IMPLEMENT RETRY LOGIC

class ResilientFetch {
  static async get(url, maxRetries = 3) {
    let lastError;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response;
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          // Exponential backoff
          const delay = Math.pow(2, i) * 1000;
          await new Promise(r => setTimeout(r, delay));
        }
      }
    }
    
    throw lastError;
  }
}

// 12. PREFETCH CRITICAL RESOURCES

/*
In HTML:
<link rel="prefetch" href="/api/data" as="fetch">
<link rel="preload" href="critical.js" as="script">
<link rel="dns-prefetch" href="//example.com">
<link rel="preconnect" href="//cdn.example.com">
*/

// NETWORK METRICS

console.log("\n=== Network Metrics ===\n");

const metrics = {
  "DNS Lookup": "100ms",
  "TCP Connection": "150ms",
  "TLS Handshake": "200ms",
  "Request": "50ms",
  "Response": "500ms",
  "Total": "1000ms"
};

Object.entries(metrics).forEach(([step, time]) => {
  console.log(`${step}: ${time}`);
});

// BEST PRACTICES CHECKLIST

console.log("\n=== Network Optimization Checklist ===\n");

const checklist = [
  "✓ Reduce number of requests",
  "✓ Minify and compress",
  "✓ Use CDN",
  "✓ Implement caching strategy",
  "✓ Lazy load resources",
  "✓ Parallelize requests",
  "✓ Use HTTP/2",
  "✓ Enable compression (gzip/brotli)",
  "✓ Implement retry logic",
  "✓ Use Service Workers",
  "✓ Prefetch critical resources",
  "✓ Monitor network performance"
];

checklist.forEach(item => console.log(item));
```

---

## Testing

(Continuing with Testing section in next part due to token limits)

### What are the different types of testing in software development?

```javascript
// TYPES OF TESTING

console.log("=== Types of Testing ===\n");

console.log("1. UNIT TESTING");
console.log("   - Test individual functions");
console.log("   - Fastest to run");
console.log("   - Most granular\n");

console.log("2. INTEGRATION TESTING");
console.log("   - Test multiple components together");
console.log("   - Slower than unit tests");
console.log("   - Tests interactions\n");

console.log("3. END-TO-END TESTING");
console.log("   - Test full user workflows");
console.log("   - Slowest to run");
console.log("   - Most realistic\n");

console.log("4. SMOKE TESTING");
console.log("   - Quick sanity check");
console.log("   - Test critical functionality");
console.log("   - Run before full test suite\n");

console.log("5. REGRESSION TESTING");
console.log("   - Ensure new changes don't break existing code");
console.log("   - Run after any change");
console.log("   - Comprehensive test coverage\n");

console.log("6. PERFORMANCE TESTING");
console.log("   - Measure speed and load capacity");
console.log("   - Identify bottlenecks");
console.log("   - Load and stress testing\n");

console.log("7. SECURITY TESTING");
console.log("   - Identify vulnerabilities");
console.log("   - Penetration testing");
console.log("   - Input validation testing\n");

console.log("8. ACCESSIBILITY TESTING");
console.log("   - Ensure usability for all users");
console.log("   - Keyboard navigation");
console.log("   - Screen reader compatibility\n");

// TEST PYRAMID

console.log("=== Test Pyramid ===\n");
console.log("        /\\");
console.log("       /  \\ E2E");
console.log("      /    \\");
console.log("     /------\\");
console.log("    /   Integration");
console.log("   /      /");
console.log("  /------/");
console.log(" /Unit    /");
console.log("/--------/");
console.log("\nWrite many unit tests");
console.log("Write fewer integration tests");
console.log("Write even fewer E2E tests");
```

---
### Explain the difference between unit testing, integration testing, and end-to-end testing.

```javascript
// UNIT TESTING - Test individual functions in isolation

// Function to test
function add(a, b) {
  return a + b;
}

// Unit test (using Jest)
describe('add function', () => {
  test('should add two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  test('should handle negative numbers', () => {
    expect(add(-2, 3)).toBe(1);
  });
  
  test('should handle zero', () => {
    expect(add(0, 5)).toBe(5);
  });
});

// INTEGRATION TESTING - Test multiple components together

class UserService {
  constructor(database) {
    this.db = database;
  }
  
  async getUser(id) {
    const user = await this.db.query('SELECT * FROM users WHERE id = ?', [id]);
    return user;
  }
}

// Integration test
describe('UserService with Database', () => {
  let db, service;
  
  beforeEach(() => {
    // Set up test database
    db = setupTestDatabase();
    service = new UserService(db);
  });
  
  test('should fetch user from database', async () => {
    // Insert test data
    await db.insert('users', { id: 1, name: 'John' });
    
    // Test integration
    const user = await service.getUser(1);
    expect(user.name).toBe('John');
  });
});

// END-TO-END TESTING - Test complete user workflows

describe('User Registration Flow', () => {
  test('should complete full registration', async () => {
    // Navigate to registration page
    await page.goto('http://localhost:3000/register');
    
    // Fill form
    await page.type('#email', 'user@example.com');
    await page.type('#password', 'password123');
    
    // Submit
    await page.click('#register-button');
    
    // Verify redirect
    await page.waitForNavigation();
    expect(page.url()).toContain('/dashboard');
    
    // Verify user is logged in
    const greeting = await page.$eval('#greeting', el => el.textContent);
    expect(greeting).toContain('Welcome');
  });
});

// COMPARISON

console.log("=== Testing Comparison ===\n");

const comparison = {
  "Unit Test": {
    "Scope": "Single function",
    "Speed": "Very fast (ms)",
    "Isolation": "Complete isolation",
    "Tools": "Jest, Mocha",
    "Effort": "Low",
    "Coverage": "High coverage possible"
  },
  "Integration Test": {
    "Scope": "Multiple components",
    "Speed": "Medium (seconds)",
    "Isolation": "Partial isolation",
    "Tools": "Jest, Mocha, Supertest",
    "Effort": "Medium",
    "Coverage": "Medium coverage"
  },
  "E2E Test": {
    "Scope": "Full user workflow",
    "Speed": "Slow (minutes)",
    "Isolation": "No isolation",
    "Tools": "Cypress, Playwright, Selenium",
    "Effort": "High",
    "Coverage": "Real-world scenarios"
  }
};

Object.entries(comparison).forEach(([type, props]) => {
  console.log(type + ":");
  Object.entries(props).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  console.log();
});

// TEST COVERAGE

console.log("=== Test Coverage Example ===\n");

function calculateDiscount(price, customer) {
  if (!customer) throw new Error('Customer required');
  if (customer.type === 'premium') return price * 0.9; // 10% off
  if (customer.type === 'vip') return price * 0.8; // 20% off
  return price;
}

// Comprehensive unit tests
describe('calculateDiscount', () => {
  test('no customer throws error', () => {
    expect(() => calculateDiscount(100, null)).toThrow();
  });
  
  test('regular customer no discount', () => {
    expect(calculateDiscount(100, { type: 'regular' })).toBe(100);
  });
  
  test('premium customer 10% discount', () => {
    expect(calculateDiscount(100, { type: 'premium' })).toBe(90);
  });
  
  test('vip customer 20% discount', () => {
    expect(calculateDiscount(100, { type: 'vip' })).toBe(80);
  });
});

// Coverage report would show:
// Statements: 100% (5/5)
// Branches: 100% (3/3)
// Functions: 100% (1/1)
// Lines: 100% (5/5)
```

### What are some popular JavaScript testing frameworks?

```javascript
// POPULAR TESTING FRAMEWORKS

console.log("=== JavaScript Testing Frameworks ===\n");

// 1. JEST (Most popular)

console.log("JEST:");
console.log("  - All-in-one testing framework");
console.log("  - Great for React");
console.log("  - Excellent documentation");
console.log("  - Built-in mocking\n");

/*
Installation: npm install --save-dev jest

package.json:
{
  "scripts": {
    "test": "jest"
  }
}

Example:
test('basic math', () => {
  expect(2 + 2).toBe(4);
});
*/

// 2. MOCHA

console.log("MOCHA:");
console.log("  - Flexible and lightweight");
console.log("  - Great test reporting");
console.log("  - Requires separate assertion library");
console.log("  - Popular for Node.js\n");

/*
Installation: npm install --save-dev mocha chai

Example:
describe('Math', () => {
  it('should add correctly', () => {
    expect(2 + 2).to.equal(4);
  });
});
*/

// 3. JASMINE

console.log("JASMINE:");
console.log("  - BDD-style testing");
console.log("  - Built-in assertions");
console.log("  - Good for Angular");
console.log("  - No external dependencies\n");

/*
describe('Suite', () => {
  it('spec', () => {
    expect(true).toBe(true);
  });
});
*/

// 4. VITEST

console.log("VITEST:");
console.log("  - Modern alternative to Jest");
console.log("  - Built on Vite");
console.log("  - Faster execution");
console.log("  - Great for Vue/Vite projects\n");

// 5. CYPRESS (E2E)

console.log("CYPRESS:");
console.log("  - Modern E2E testing");
console.log("  - Excellent developer experience");
console.log("  - Real browser testing");
console.log("  - Great debugging tools\n");

// 6. PLAYWRIGHT (E2E)

console.log("PLAYWRIGHT:");
console.log("  - Cross-browser testing");
console.log("  - Fast and reliable");
console.log("  - Multiple language support");
console.log("  - Good API\n");

// 7. SELENIUM (E2E)

console.log("SELENIUM:");
console.log("  - Industry standard");
console.log("  - Multi-language support");
console.log("  - Mature ecosystem");
console.log("  - Steeper learning curve\n");

// FRAMEWORK COMPARISON

const frameworks = {
  "Jest": { "Type": "Unit", "Speed": "Fast", "Setup": "Easy", "Best for": "React" },
  "Mocha": { "Type": "Unit", "Speed": "Fast", "Setup": "Medium", "Best for": "Node.js" },
  "Jasmine": { "Type": "Unit", "Speed": "Medium", "Setup": "Easy", "Best for": "Angular" },
  "Vitest": { "Type": "Unit", "Speed": "Very Fast", "Setup": "Easy", "Best for": "Vite projects" },
  "Cypress": { "Type": "E2E", "Speed": "Medium", "Setup": "Medium", "Best for": "Web apps" },
  "Playwright": { "Type": "E2E", "Speed": "Fast", "Setup": "Medium", "Best for": "Multi-browser" }
};

console.log("=== Framework Comparison ===\n");
Object.entries(frameworks).forEach(([name, props]) => {
  console.log(name + ":");
  Object.entries(props).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
  console.log();
});
```

### How do you write unit tests for JavaScript code?

```javascript
// WRITING EFFECTIVE UNIT TESTS

// 1. ARRANGE-ACT-ASSERT PATTERN

function multiply(a, b) {
  return a * b;
}

test('multiply two positive numbers', () => {
  // ARRANGE - Set up test data
  const a = 3;
  const b = 4;
  
  // ACT - Call function
  const result = multiply(a, b);
  
  // ASSERT - Verify result
  expect(result).toBe(12);
});

// 2. TESTING DIFFERENT SCENARIOS

function getGrade(score) {
  if (score >= 90) return 'A';
  if (score >= 80) return 'B';
  if (score >= 70) return 'C';
  if (score >= 60) return 'D';
  return 'F';
}

describe('getGrade', () => {
  // Test each branch
  test('returns A for score >= 90', () => {
    expect(getGrade(95)).toBe('A');
  });
  
  test('returns B for score >= 80', () => {
    expect(getGrade(85)).toBe('B');
  });
  
  test('returns C for score >= 70', () => {
    expect(getGrade(75)).toBe('C');
  });
  
  test('returns D for score >= 60', () => {
    expect(getGrade(65)).toBe('D');
  });
  
  test('returns F for score < 60', () => {
    expect(getGrade(55)).toBe('F');
  });
  
  // Test edge cases
  test('handles boundary at 90', () => {
    expect(getGrade(90)).toBe('A');
  });
  
  test('handles boundary at 60', () => {
    expect(getGrade(60)).toBe('D');
  });
});

// 3. TESTING EXCEPTIONS

function validateEmail(email) {
  if (!email.includes('@')) {
    throw new Error('Invalid email');
  }
  return true;
}

describe('validateEmail', () => {
  test('throws error for invalid email', () => {
    expect(() => {
      validateEmail('invalid');
    }).toThrow('Invalid email');
  });
  
  test('returns true for valid email', () => {
    expect(validateEmail('user@example.com')).toBe(true);
  });
});

// 4. TESTING ASYNC CODE

function fetchUser(id) {
  return fetch(`/api/users/${id}`)
    .then(r => r.json());
}

describe('fetchUser', () => {
  test('fetches user data', async () => {
    // Mock fetch
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ id: 1, name: 'John' })
      })
    );
    
    const user = await fetchUser(1);
    expect(user.name).toBe('John');
  });
});

// 5. MOCKING DEPENDENCIES

class EmailService {
  send(to, subject, body) {
    // Expensive operation
  }
}

class UserService {
  constructor(emailService) {
    this.emailService = emailService;
  }
  
  registerUser(email) {
    // Register logic
    this.emailService.send(email, 'Welcome', 'Welcome to our app');
  }
}

describe('UserService', () => {
  test('sends welcome email on registration', () => {
    const mockEmailService = {
      send: jest.fn()
    };
    
    const userService = new UserService(mockEmailService);
    userService.registerUser('user@example.com');
    
    expect(mockEmailService.send).toHaveBeenCalledWith(
      'user@example.com',
      'Welcome',
      'Welcome to our app'
    );
  });
});

// 6. TESTING ARROW FUNCTIONS

const calculateTotal = (items) =>
  items.reduce((sum, item) => sum + item.price, 0);

test('calculates total price', () => {
  const items = [
    { price: 10 },
    { price: 20 },
    { price: 30 }
  ];
  expect(calculateTotal(items)).toBe(60);
});

// 7. TESTING WITH BEFOREEACH/AFTEREACH

describe('Database operations', () => {
  let db;
  
  beforeEach(() => {
    // Setup before each test
    db = new Database(':memory:');
    db.exec('CREATE TABLE users (id INTEGER, name TEXT)');
  });
  
  afterEach(() => {
    // Cleanup after each test
    db.close();
  });
  
  test('can insert user', () => {
    db.run('INSERT INTO users VALUES (1, "John")');
    const user = db.get('SELECT * FROM users WHERE id = 1');
    expect(user.name).toBe('John');
  });
  
  test('can delete user', () => {
    db.run('INSERT INTO users VALUES (1, "John")');
    db.run('DELETE FROM users WHERE id = 1');
    const user = db.get('SELECT * FROM users WHERE id = 1');
    expect(user).toBeUndefined();
  });
});

// 8. SNAPSHOT TESTING

const renderComponent = (props) => {
  return {
    type: 'div',
    props: { className: 'component' },
    children: [
      { type: 'h1', children: props.title }
    ]
  };
};

test('renders correctly', () => {
  const component = renderComponent({ title: 'Hello' });
  expect(component).toMatchSnapshot();
  // Snapshot saved for future comparison
});

// 9. PARAMETRIZED TESTS

const testCases = [
  { input: 2, expected: 4 },
  { input: 3, expected: 9 },
  { input: 4, expected: 16 }
];

describe.each(testCases)('square of $input', ({ input, expected }) => {
  test('equals $expected', () => {
    expect(input * input).toBe(expected);
  });
});

// 10. BEST PRACTICES

console.log("\n=== Unit Testing Best Practices ===\n");

const practices = [
  "✓ Test one thing per test",
  "✓ Use clear, descriptive test names",
  "✓ Follow AAA pattern (Arrange, Act, Assert)",
  "✓ Test edge cases and boundaries",
  "✓ Don't test implementation details",
  "✓ Keep tests independent",
  "✓ Mock external dependencies",
  "✓ Aim for high code coverage",
  "✓ Keep tests fast",
  "✓ Use fixtures for test data"
];

practices.forEach(p => console.log(p));
```

---

## Design Patterns

### What are design patterns and why are they useful?

```javascript
// DESIGN PATTERNS - Reusable solutions to common problems

console.log("=== Design Patterns ===\n");

console.log("Benefits:");
console.log("  ✓ Tested solutions");
console.log("  ✓ Better code organization");
console.log("  ✓ Easier maintenance");
console.log("  ✓ Better communication");
console.log("  ✓ Faster development\n");

console.log("Pattern Categories:");
console.log("  1. Creational - Object creation");
console.log("  2. Structural - Object composition");
console.log("  3. Behavioral - Object interaction\n");

// CREATIONAL PATTERNS - How objects are created

console.log("=== Creational Patterns ===\n");

// 1. SINGLETON - One instance only
class Database {
  static instance = null;
  
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null;
    Database.instance = this;
  }
  
  connect() {
    this.connection = 'connected';
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true - Same instance

// 2. FACTORY - Create objects without specifying classes
class AnimalFactory {
  static createAnimal(type) {
    if (type === 'dog') {
      return new Dog();
    } else if (type === 'cat') {
      return new Cat();
    }
  }
}

class Dog {
  speak() { return 'Woof'; }
}

class Cat {
  speak() { return 'Meow'; }
}

const dog = AnimalFactory.createAnimal('dog');
const cat = AnimalFactory.createAnimal('cat');

// 3. BUILDER - Complex object construction
class HouseBuilder {
  constructor() {
    this.house = {};
  }
  
  addWalls() {
    this.house.walls = true;
    return this;
  }
  
  addRoof() {
    this.house.roof = true;
    return this;
  }
  
  addDoors() {
    this.house.doors = true;
    return this;
  }
  
  build() {
    return this.house;
  }
}

const house = new HouseBuilder()
  .addWalls()
  .addRoof()
  .addDoors()
  .build();

// STRUCTURAL PATTERNS - Compose objects

console.log("\n=== Structural Patterns ===\n");

// 4. ADAPTER - Convert incompatible interfaces
class OldAPI {
  getdata() { // Old method name
    return 'data';
  }
}

class APIAdapter {
  constructor(oldAPI) {
    this.oldAPI = oldAPI;
  }
  
  getData() { // New method name
    return this.oldAPI.getdata();
  }
}

const adapter = new APIAdapter(new OldAPI());
console.log(adapter.getData()); // Works with new interface

// 5. DECORATOR - Add behavior without modifying original
class Coffee {
  cost() { return 5; }
  description() { return 'Plain coffee'; }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() { return this.coffee.cost() + 2; }
  description() { return this.coffee.description() + ', Milk'; }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  
  cost() { return this.coffee.cost() + 1; }
  description() { return this.coffee.description() + ', Sugar'; }
}

let beverage = new Coffee();
beverage = new MilkDecorator(beverage);
beverage = new SugarDecorator(beverage);
console.log(beverage.cost()); // 8
console.log(beverage.description()); // Plain coffee, Milk, Sugar

// 6. FACADE - Simplified interface
class ComplexSubsystem {
  operation1() { return 'Op1'; }
  operation2() { return 'Op2'; }
  operation3() { return 'Op3'; }
}

class SimpleFacade {
  constructor() {
    this.subsystem = new ComplexSubsystem();
  }
  
  easyMethod() {
    return (
      this.subsystem.operation1() +
      this.subsystem.operation2() +
      this.subsystem.operation3()
    );
  }
}

const facade = new SimpleFacade();
console.log(facade.easyMethod()); // Op1Op2Op3

// BEHAVIORAL PATTERNS - Object interaction

console.log("\n=== Behavioral Patterns ===\n");

// 7. OBSERVER - Notify multiple listeners
class Subject {
  constructor() {
    this.observers = [];
  }
  
  attach(observer) {
    this.observers.push(observer);
  }
  
  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notify(data) {
    this.observers.forEach(observer => {
      observer.update(data);
    });
  }
}

class Observer {
  update(data) {
    console.log('Observer notified:', data);
  }
}

const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();
subject.attach(observer1);
subject.attach(observer2);
subject.notify('Hello'); // Both observers notified

// 8. STRATEGY - Interchangeable algorithms
class PaymentProcessor {
  constructor(strategy) {
    this.strategy = strategy;
  }
  
  process(amount) {
    return this.strategy.pay(amount);
  }
}

class CreditCardStrategy {
  pay(amount) {
    return `Paid ${amount} with credit card`;
  }
}

class PayPalStrategy {
  pay(amount) {
    return `Paid ${amount} with PayPal`;
  }
}

const processor = new PaymentProcessor(new CreditCardStrategy());
console.log(processor.process(100)); // Credit card payment

// 9. COMMAND - Encapsulate actions
class Light {
  on() { return 'Light on'; }
  off() { return 'Light off'; }
}

class TurnOnCommand {
  constructor(light) {
    this.light = light;
  }
  
  execute() {
    return this.light.on();
  }
}

class TurnOffCommand {
  constructor(light) {
    this.light = light;
  }
  
  execute() {
    return this.light.off();
  }
}

class RemoteControl {
  constructor() {
    this.command = null;
  }
  
  setCommand(command) {
    this.command = command;
  }
  
  executeCommand() {
    return this.command.execute();
  }
}

const light = new Light();
const remote = new RemoteControl();
remote.setCommand(new TurnOnCommand(light));
console.log(remote.executeCommand()); // Light on

// ANTI-PATTERNS - What NOT to do

console.log("\n=== Common Anti-Patterns ===\n");

console.log("1. CALLBACK HELL");
console.log("   - Nested callbacks");
console.log("   - Hard to read");
console.log("   - Hard to maintain\n");

console.log("2. GLOBAL VARIABLES");
console.log("   - Pollutes namespace");
console.log("   - Hard to track");
console.log("   - Causes side effects\n");

console.log("3. GOD OBJECTS");
console.log("   - Too many responsibilities");
console.log("   - Hard to test");
console.log("   - Violates SRP\n");

console.log("4. ANALYSIS PARALYSIS");
console.log("   - Trying every pattern");
console.log("   - Over-engineering");
console.log("   - Premature optimization");
```

### Explain the concept of the Singleton pattern.

```javascript
// SINGLETON PATTERN - Ensures single instance

console.log("=== Singleton Pattern ===\n");

// BASIC IMPLEMENTATION

class Logger {
  constructor() {
    if (Logger.instance) {
      return Logger.instance;
    }
    this.logs = [];
    Logger.instance = this;
  }
  
  log(message) {
    this.logs.push(message);
    console.log(message);
  }
  
  getLogs() {
    return this.logs;
  }
}

const logger1 = new Logger();
const logger2 = new Logger();
console.log(logger1 === logger2); // true - Same instance

logger1.log('First message');
logger2.log('Second message');
console.log(logger2.getLogs().length); // 2 - Both messages in same instance

// ALTERNATIVE: Using Module Pattern

const DatabaseConnection = (() => {
  let instance;
  
  function createConnection() {
    return {
      connect() { return 'Connected'; },
      disconnect() { return 'Disconnected'; }
    };
  }
  
  return {
    getInstance() {
      if (!instance) {
        instance = createConnection();
      }
      return instance;
    }
  };
})();

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();
console.log(db1 === db2); // true

// USE CASES

console.log("\n=== Singleton Use Cases ===\n");

// 1. DATABASE CONNECTION
class Database {
  static instance;
  
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
  
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.pool = [];
  }
  
  query(sql) {
    return `Executing: ${sql}`;
  }
}

// 2. CONFIGURATION/SETTINGS
class AppConfig {
  static instance;
  
  static getInstance() {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
  
  constructor() {
    this.settings = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
      debug: false
    };
  }
  
  get(key) {
    return this.settings[key];
  }
}

const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();
console.log(config1.get('apiUrl')); // Same config object

// 3. LOGGING SERVICE
class LoggingService {
  static instance;
  
  static getInstance() {
    if (!LoggingService.instance) {
      LoggingService.instance = new LoggingService();
    }
    return LoggingService.instance;
  }
  
  error(message) {
    console.error('[ERROR]', message);
  }
  
  info(message) {
    console.log('[INFO]', message);
  }
}

// 4. EVENT BUS/EMITTER
class EventBus {
  static instance;
  
  static getInstance() {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }
  
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(cb => cb(data));
    }
  }
}

// ADVANTAGES AND DISADVANTAGES

console.log("\n=== Singleton Pros and Cons ===\n");

console.log("Advantages:");
console.log("  ✓ Guarantees single instance");
console.log("  ✓ Global access point");
console.log("  ✓ Lazy initialization");
console.log("  ✓ Thread-safe (in some languages)\n");

console.log("Disadvantages:");
console.log("  ✗ Hides dependencies");
console.log("  ✗ Hard to test");
console.log("  ✗ Can mask design problems");
console.log("  ✗ Not suitable for concurrent access");
console.log("  ✗ May indicate tight coupling\n");

// TESTING SINGLETONS

console.log("=== Testing Singletons ===\n");

// Problem: Hard to test because of global state
class AppSettings {
  static instance;
  
  static getInstance() {
    if (!AppSettings.instance) {
      AppSettings.instance = new AppSettings();
    }
    return AppSettings.instance;
  }
  
  constructor() {
    this.values = {};
  }
  
  set(key, value) {
    this.values[key] = value;
  }
  
  get(key) {
    return this.values[key];
  }
}

// Solution: Provide reset for testing
AppSettings.reset = () => {
  AppSettings.instance = null;
};

test('singleton behavior', () => {
  AppSettings.reset(); // Clear state
  
  const settings1 = AppSettings.getInstance();
  settings1.set('theme', 'dark');
  
  const settings2 = AppSettings.getInstance();
  expect(settings2.get('theme')).toBe('dark');
});
```

### What is the Factory pattern and how is it used?

```javascript
// FACTORY PATTERN - Create objects without specifying exact classes

console.log("=== Factory Pattern ===\n");

// BASIC EXAMPLE

class Dog {
  constructor() {
    this.sound = 'Woof';
  }
  
  speak() {
    return this.sound;
  }
}

class Cat {
  constructor() {
    this.sound = 'Meow';
  }
  
  speak() {
    return this.sound;
  }
}

class Bird {
  constructor() {
    this.sound = 'Tweet';
  }
  
  speak() {
    return this.sound;
  }
}

// Simple Factory Function
function createAnimal(type) {
  switch(type) {
    case 'dog':
      return new Dog();
    case 'cat':
      return new Cat();
    case 'bird':
      return new Bird();
    default:
      throw new Error('Unknown animal');
  }
}

const dog = createAnimal('dog');
console.log(dog.speak()); // Woof

// FACTORY CLASS

class AnimalFactory {
  static create(type) {
    switch(type) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      default:
        throw new Error('Unknown animal');
    }
  }
}

const cat = AnimalFactory.create('cat');
console.log(cat.speak()); // Meow

// ABSTRACT FACTORY PATTERN

class DatabaseFactory {
  createConnection() {
    throw new Error('createConnection must be implemented');
  }
  
  createPool() {
    throw new Error('createPool must be implemented');
  }
}

class MySQLFactory extends DatabaseFactory {
  createConnection() {
    return new MySQLConnection();
  }
  
  createPool() {
    return new MySQLPool();
  }
}

class PostgreSQLFactory extends DatabaseFactory {
  createConnection() {
    return new PostgreSQLConnection();
  }
  
  createPool() {
    return new PostgreSQLPool();
  }
}

class MySQLConnection {
  query(sql) { return `MySQL: ${sql}`; }
}

class MySQLPool {
  getConnection() { return new MySQLConnection(); }
}

class PostgreSQLConnection {
  query(sql) { return `PostgreSQL: ${sql}`; }
}

class PostgreSQLPool {
  getConnection() { return new PostgreSQLConnection(); }
}

// Use based on configuration
const dbType = 'mysql'; // or 'postgresql'
let factory;

if (dbType === 'mysql') {
  factory = new MySQLFactory();
} else {
  factory = new PostgreSQLFactory();
}

const conn = factory.createConnection();
const pool = factory.createPool();

// USE CASES

console.log("\n=== Factory Pattern Use Cases ===\n");

// 1. HTTP CLIENT ADAPTERS
class HTTPFactory {
  static create(type) {
    if (type === 'browser') {
      return new FetchClient();
    } else if (type === 'node') {
      return new NodeHTTPClient();
    }
  }
}

// 2. PAYMENT PROCESSORS
class PaymentFactory {
  static create(method) {
    if (method === 'credit-card') {
      return new CreditCardProcessor();
    } else if (method === 'paypal') {
      return new PayPalProcessor();
    } else if (method === 'stripe') {
      return new StripeProcessor();
    }
  }
}

class CreditCardProcessor {
  process(amount) { return `Processing $${amount} via credit card`; }
}

class PayPalProcessor {
  process(amount) { return `Processing $${amount} via PayPal`; }
}

class StripeProcessor {
  process(amount) { return `Processing $${amount} via Stripe`; }
}

const paymentProcessor = PaymentFactory.create('stripe');
console.log(paymentProcessor.process(99.99));

// 3. LOGGER IMPLEMENTATIONS
class LoggerFactory {
  static create(type) {
    switch(type) {
      case 'console':
        return new ConsoleLogger();
      case 'file':
        return new FileLogger();
      case 'remote':
        return new RemoteLogger();
    }
  }
}

// BENEFITS OF FACTORY PATTERN

console.log("\n=== Factory Pattern Benefits ===\n");

console.log("✓ Loose coupling - Client doesn't know concrete classes");
console.log("✓ Easy to extend - Add new types without changing existing code");
console.log("✓ Centralized creation - Single point to modify");
console.log("✓ Consistent interface - All created objects have same interface");
console.log("✓ Easier testing - Can mock the factory\n");

// FACTORY VS CONSTRUCTOR

console.log("=== Factory vs Constructor ===\n");

console.log("Constructor:");
console.log("  new Dog() - Tightly coupled to Dog class\n");

console.log("Factory:");
console.log("  create('dog') - Decoupled, can change implementation\n");
```

(Content continues with more patterns...)

### Explain the Observer pattern and its use cases.

```javascript
// OBSERVER PATTERN - Notify multiple listeners of changes

console.log("=== Observer Pattern ===\n");

// BASIC IMPLEMENTATION

class Subject {
  constructor() {
    this.observers = [];
  }
  
  attach(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }
  
  detach(observer) {
    const index = this.observers.indexOf(observer);
    if (index > -1) {
      this.observers.splice(index, 1);
    }
  }
  
  notify(data) {
    this.observers.forEach(observer => {
      observer.update(data);
    });
  }
}

class Observer {
  update(data) {
    console.log('Observer received:', data);
  }
}

// Usage
const subject = new Subject();
const observer1 = new Observer();
const observer2 = new Observer();

subject.attach(observer1);
subject.attach(observer2);
subject.notify('Hello'); // Both observers notified

// REAL-WORLD EXAMPLE: EVENT EMITTER

class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
    }
  }
  
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(callback => callback(data));
    }
  }
}

// Usage
const emitter = new EventEmitter();

emitter.on('user-logged-in', (user) => {
  console.log(`${user.name} logged in`);
});

emitter.on('user-logged-in', (user) => {
  console.log(`Welcome email sent to ${user.email}`);
});

emitter.emit('user-logged-in', { name: 'John', email: 'john@example.com' });

// PRACTICAL EXAMPLE: BUTTON AND LISTENERS

class Button {
  constructor(label) {
    this.label = label;
    this.listeners = [];
  }
  
  onClick(callback) {
    this.listeners.push(callback);
  }
  
  click() {
    this.listeners.forEach(callback => callback());
  }
}

class Logger {
  logClick() {
    console.log('Button clicked');
  }
}

class Analytics {
  trackClick() {
    console.log('Click tracked');
  }
}

const button = new Button('Submit');
const logger = new Logger();
const analytics = new Analytics();

button.onClick(() => logger.logClick());
button.onClick(() => analytics.trackClick());
button.onClick(() => console.log('Form submitted'));

button.click(); // All callbacks executed

// USE CASES

console.log("\n=== Observer Pattern Use Cases ===\n");

console.log("1. USER INTERFACE UPDATES");
console.log("   - Button clicks");
console.log("   - Form submissions");
console.log("   - Value changes\n");

console.log("2. MODEL-VIEW BINDING");
console.log("   - Two-way data binding");
console.log("   - React hooks");
console.log("   - Vue reactivity\n");

console.log("3. REAL-TIME NOTIFICATIONS");
console.log("   - Chat applications");
console.log("   - Live updates");
console.log("   - Stock prices\n");

console.log("4. LOGGING AND MONITORING");
console.log("   - Error tracking");
console.log("   - Performance monitoring");
console.log("   - Audit logs\n");

// ADVANTAGES AND DISADVANTAGES

console.log("=== Observer Pattern Pros/Cons ===\n");

console.log("Advantages:");
console.log("  ✓ Loose coupling");
console.log("  ✓ Dynamic subscriptions");
console.log("  ✓ Supports one-to-many");
console.log("  ✓ Automatic notifications\n");

console.log("Disadvantages:");
console.log("  ✗ Complex debugging");
console.log("  ✗ Performance overhead");
console.log("  ✗ Memory leaks if not cleaned");
console.log("  ✗ Hard to track order of execution");
```

---

## Security

### Why is extending built-in JavaScript objects not a good idea?

```javascript
// DANGERS OF EXTENDING BUILT-IN OBJECTS

console.log("=== Extending Built-In Objects ===\n");

// ❌ BAD: Extending Array prototype
Array.prototype.first = function() {
  return this[0];
};

const arr = [1, 2, 3];
console.log(arr.first()); // Works, but...

// Problem 1: Breaks for...in loops
for (const prop in arr) {
  console.log(prop); // 0, 1, 2, first - Includes "first"!
}

// Problem 2: Conflicts with libraries
// Another library also extends Array.prototype.first differently

// Problem 3: When for...in is used with object iteration
const obj = { name: 'John' };
for (const key in obj) {
  console.log(key); // name, first - Includes "first" from Array!
}

// ❌ BAD: Extending Object prototype
Object.prototype.clone = function() {
  return JSON.parse(JSON.stringify(this));
};

const user = { id: 1, name: 'John' };
const cloned = user.clone();

// Causes issues everywhere:
JSON.stringify(user); // { "id": 1, "name": "John", "clone": ... } - Clone function included!

// ❌ BAD: Monkey-patching String
String.prototype.toTitleCase = function() {
  return this.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
};

const title = 'hello world'.toTitleCase();

// Problem: If built-in toTitleCase is added in future, conflict occurs!

console.log("\n=== Problems ===\n");

console.log("1. CONFLICTS WITH OTHER LIBRARIES");
console.log("   - Multiple libraries extend same object");
console.log("   - Last one wins (overwrites others)\n");

console.log("2. BREAKS ITERATION");
console.log("   - for...in includes new properties");
console.log("   - Object.keys might be affected");
console.log("   - Array methods confused\n");

console.log("3. FUTURE COMPATIBILITY");
console.log("   - Built-ins get new methods");
console.log("   - Your custom methods conflict");
console.log("   - Break existing code\n");

console.log("4. PERFORMANCE");
console.log("   - Slower method lookup");
console.log("   - More prototype chain traversal\n");

console.log("5. DEBUGGING DIFFICULTY");
console.log("   - Hard to find method sources");
console.log("   - Mixed with native methods\n");

// ✅ GOOD: Use utility functions instead

class ArrayUtils {
  static first(array) {
    return array[0];
  }
  
  static last(array) {
    return array[array.length - 1];
  }
  
  static flatten(array) {
    return array.reduce((acc, val) => 
      acc.concat(Array.isArray(val) ? ArrayUtils.flatten(val) : val), []
    );
  }
}

const myArray = [1, 2, 3];
console.log(ArrayUtils.first(myArray)); // 1
console.log(ArrayUtils.last(myArray)); // 3

// ✅ GOOD: Use wrapper classes

class MyArray {
  constructor(items) {
    this.items = items;
  }
  
  first() {
    return this.items[0];
  }
  
  last() {
    return this.items[this.items.length - 1];
  }
  
  map(fn) {
    return new MyArray(this.items.map(fn));
  }
}

const wrapped = new MyArray([1, 2, 3]);
console.log(wrapped.first()); // 1

// ✅ GOOD: Use helper functions

const first = (array) => array[0];
const last = (array) => array[array.length - 1];
const flatten = (array) => {
  return array.reduce((acc, val) =>
    acc.concat(Array.isArray(val) ? flatten(val) : val), []
  );
};

// ✅ GOOD: Use Symbol.iterator properly (if extending)

if (!Array.prototype.myCustomMethod) {
  Object.defineProperty(Array.prototype, 'myCustomMethod', {
    value: function() {
      return 'custom';
    },
    enumerable: false, // Won't show in for...in
    writable: true,
    configurable: true
  });
}

// SAFE ALTERNATIVES

console.log("\n=== Safe Alternatives ===\n");

// 1. Utility Functions/Modules
const stringUtils = {
  capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
  toTitleCase: (str) => str.split(' ').map(w => stringUtils.capitalize(w)).join(' ')
};

// 2. ES6 Classes/Composition
class SafeArray {
  constructor(items = []) {
    this.items = items;
  }
  
  first() { return this.items[0]; }
  last() { return this.items[this.items.length - 1]; }
}

// 3. Functional Programming
const compose = (fn1, fn2) => (x) => fn2(fn1(x));
const pipe = (fn1, fn2) => (x) => fn1(fn2(x));

// 4. Libraries with namespace
// lodash: _.first(array), _.last(array)
// Don't pollute global scope

// BEST PRACTICES

console.log("\n=== Best Practices ===\n");

console.log("✓ NEVER modify built-in objects");
console.log("✓ Use utility functions instead");
console.log("✓ Use ES6 classes and composition");
console.log("✓ Use namespace/modules");
console.log("✓ Use libraries wisely");
console.log("✓ If extending, use Object.defineProperty");
console.log("✓ Make properties non-enumerable");
console.log("✓ Document any extensions clearly");
```

(Content continues with more security topics...)

### What is Cross-Site Scripting (XSS) and how can you prevent it?

```javascript
// CROSS-SITE SCRIPTING (XSS) ATTACKS

console.log("=== XSS (Cross-Site Scripting) ===\n");

// XSS - Attacker injects malicious scripts into web application

console.log("Types of XSS:\n");

console.log("1. STORED XSS (Persistent)");
console.log("   - Malicious script stored in database");
console.log("   - Affects all users");
console.log("   - Example: Malicious comment saved\n");

console.log("2. REFLECTED XSS (Non-persistent)");
console.log("   - Malicious script in URL");
console.log("   - Only affects user clicking link");
console.log("   - Example: ?name=<script>alert('hacked')</script>\n");

console.log("3. DOM-BASED XSS");
console.log("   - Vulnerable client-side code");
console.log("   - No server interaction");
console.log("   - Example: innerHTML with unsanitized input\n");

// ❌ VULNERABLE CODE

// Stored XSS vulnerability
function saveComment(text) {
  // Dangerous: Stores raw user input
  const comment = `<div>${text}</div>`;
  database.save(comment);
}

// Later...
function displayComments() {
  // Dangerous: Renders HTML directly
  document.getElementById('comments').innerHTML = commentFromDatabase;
}

// Attack: saveComment('<img src=x onerror="steal_cookies()">');

// Reflected XSS vulnerability
function displayGreeting() {
  const name = new URLSearchParams(window.location.search).get('name');
  // Dangerous: Directly uses URL parameter
  document.getElementById('greeting').innerHTML = `Hello, ${name}!`;
}

// Attack: ?name=<script>alert('hacked')</script>

// DOM-based XSS vulnerability
function updateProfile(userData) {
  // Dangerous: Directly sets innerHTML
  document.getElementById('profile').innerHTML = userData.bio;
}

// ✅ PREVENTION 1: ESCAPE OUTPUT

function escapeHTML(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

function safeDisplayComment(comment) {
  const escaped = escapeHTML(comment.text);
  document.getElementById('comments').innerHTML = `<div>${escaped}</div>`;
}

// Or use textContent instead of innerHTML
function safeDisplay(text) {
  const div = document.createElement('div');
  div.textContent = text; // Safe - no HTML parsing
  document.body.appendChild(div);
}

// ✅ PREVENTION 2: USE TEXTCONTENT INSTEAD OF INNERHTML

// ❌ Dangerous
element.innerHTML = userInput;

// ✅ Safe
element.textContent = userInput;

// When you need HTML, use sanitization library
// ✅ Safe with DOMPurify
element.innerHTML = DOMPurify.sanitize(userInput);

// ✅ PREVENTION 3: INPUT VALIDATION

function validateInput(input, type) {
  if (type === 'email') {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
  }
  if (type === 'url') {
    try {
      new URL(input);
      return true;
    } catch {
      return false;
    }
  }
  return true;
}

// ✅ PREVENTION 4: CONTENT SECURITY POLICY (CSP)

// In HTTP header or meta tag:
/*
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' https://trusted.com;
  img-src 'self' data:;
  style-src 'self' 'unsafe-inline'
">
*/

// ✅ PREVENTION 5: USE FRAMEWORKS WITH XSS PROTECTION

// React - automatically escapes
function SafeComponent({ userInput }) {
  // React escapes this automatically
  return <div>{userInput}</div>;
}

// Vue - also escapes by default
// <div>{{ userInput }}</div> - Safe

// ✅ PREVENTION 6: SANITIZE USER INPUT

class InputSanitizer {
  static sanitizeText(text) {
    return text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }
  
  static sanitizeHTML(html) {
    // Use library like DOMPurify
    // const clean = DOMPurify.sanitize(html);
    // Or manually whitelist tags
    const allowed = ['p', 'br', 'strong', 'em'];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const remove = (node) => {
      if (!allowed.includes(node.nodeName.toLowerCase())) {
        node.parentNode.removeChild(node);
      } else {
        node.childNodes.forEach(remove);
      }
    };
    
    remove(doc.body);
    return doc.body.innerHTML;
  }
  
  static sanitizeURL(url) {
    // Only allow safe protocols
    const safe = ['http:', 'https:', 'mailto:'];
    try {
      const parsed = new URL(url);
      if (!safe.includes(parsed.protocol)) {
        return 'javascript:void(0)';
      }
      return url;
    } catch {
      return 'javascript:void(0)';
    }
  }
}

// ✅ PREVENTION 7: USE TRUSTED HTML LIBRARY

/*
DOMPurify usage:
const clean = DOMPurify.sanitize(userInput);
element.innerHTML = clean;

Other options:
- xss library
- sanitize-html
- bleach (Python, but concept)
*/

// BEST PRACTICES

console.log("\n=== XSS Prevention Best Practices ===\n");

const practices = [
  "✓ Always escape output",
  "✓ Use textContent instead of innerHTML",
  "✓ Validate and sanitize input",
  "✓ Use Content Security Policy",
  "✓ Use framework protections (React, Vue)",
  "✓ Never use eval()",
  "✓ Never use innerHTML with user data",
  "✓ Use trusted libraries (DOMPurify)",
  "✓ Keep dependencies updated",
  "✓ Security headers (X-XSS-Protection)",
  "✓ Education and code reviews",
  "✓ Regular security testing"
];

practices.forEach(p => console.log(p));

// EXAMPLE: SECURE COMMENT SYSTEM

class SecureCommentSystem {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
  }
  
  addComment(author, text) {
    // Validate
    if (!author || !text) return false;
    
    // Sanitize
    const safeAuthor = InputSanitizer.sanitizeText(author);
    const safeText = InputSanitizer.sanitizeText(text);
    
    // Create element safely
    const comment = document.createElement('div');
    comment.className = 'comment';
    comment.textContent = `${safeAuthor}: ${safeText}`;
    
    this.container.appendChild(comment);
    return true;
  }
  
  renderComments(comments) {
    this.container.innerHTML = ''; // Clear
    comments.forEach(comment => {
      this.addComment(comment.author, comment.text);
    });
  }
}
```

---
### Explain the concept of Cross-Site Request Forgery (CSRF) and its mitigation techniques.

```javascript
// CROSS-SITE REQUEST FORGERY (CSRF)

console.log("=== CSRF (Cross-Site Request Forgery) ===\n");

console.log("How CSRF Works:");
console.log("1. User logs into bank.com");
console.log("2. User visits malicious-site.com");
console.log("3. Malicious site sends request to bank.com");
console.log("4. User's browser sends cookies automatically");
console.log("5. Bank transfers money (thinks it's legitimate request)\n");

// VULNERABLE CODE

/*
Server endpoint (bank.com):
POST /transfer
{
  amount: 1000,
  toAccount: "attacker@evil.com"
}

HTML on malicious-site.com:
<img src="bank.com/transfer?amount=1000&toAccount=attacker">
OR
<form action="bank.com/transfer" method="POST">
  <input type="hidden" name="amount" value="1000">
  <input type="hidden" name="toAccount" value="attacker">
</form>
<script>document.forms[0].submit();</script>
*/

// ✅ MITIGATION 1: CSRF TOKENS

class CSRFTokenManager {
  constructor() {
    this.tokens = new Map();
  }
  
  generateToken(userId) {
    // Generate unique token
    const token = Math.random().toString(36).substr(2) + Date.now();
    this.tokens.set(token, userId);
    return token;
  }
  
  validateToken(token, userId) {
    return this.tokens.get(token) === userId;
  }
  
  invalidateToken(token) {
    this.tokens.delete(token);
  }
}

// Server implementation
/*
// Generate token for form
app.get('/form', (req, res) => {
  const token = csrfTokenManager.generateToken(req.user.id);
  res.send(`<form method="POST" action="/transfer">
    <input type="hidden" name="csrf_token" value="${token}">
    <input type="number" name="amount">
    <button type="submit">Transfer</button>
  </form>`);
});

// Verify token on submission
app.post('/transfer', (req, res) => {
  const token = req.body.csrf_token;
  if (!csrfTokenManager.validateToken(token, req.user.id)) {
    return res.status(403).send('CSRF token invalid');
  }
  
  // Process transfer
  csrfTokenManager.invalidateToken(token);
  res.send('Transfer successful');
});
*/

// ✅ MITIGATION 2: SAME-SITE COOKIES

/*
HTTP Header:
Set-Cookie: sessionid=abc123; SameSite=Strict

Modes:
- Strict: Cookie never sent with cross-site requests
- Lax: Cookie sent with safe methods (GET) but not POST
- None: Cookie always sent (must use Secure)

Best practice for auth cookies:
Set-Cookie: sessionid=abc123; SameSite=Strict; Secure; HttpOnly
*/

// ✅ MITIGATION 3: ORIGIN/REFERER HEADER CHECK

class CSRFHeaderValidator {
  constructor(allowedOrigins) {
    this.allowedOrigins = allowedOrigins;
  }
  
  isValidRequest(origin, referer) {
    // Check Origin header
    if (origin && !this.allowedOrigins.includes(origin)) {
      return false;
    }
    
    // Check Referer header
    if (referer) {
      try {
        const refererOrigin = new URL(referer).origin;
        if (!this.allowedOrigins.includes(refererOrigin)) {
          return false;
        }
      } catch {
        return false;
      }
    }
    
    return true;
  }
}

// ✅ MITIGATION 4: DOUBLE-SUBMIT COOKIES

class DoubleSubmitCookie {
  generateToken() {
    return Math.random().toString(36).substr(2);
  }
  
  validateRequest(cookieToken, bodyToken) {
    // Both tokens must match
    return cookieToken === bodyToken;
  }
}

// Server implementation
/*
// Set CSRF token in cookie and form
const token = doubleSubmitCookie.generateToken();
res.setHeader('Set-Cookie', `csrf_token=${token}`);
res.send(`<form method="POST">
  <input type="hidden" name="csrf_token" value="${token}">
  ...
</form>`);

// Verify on submission
const cookieToken = req.cookies.csrf_token;
const bodyToken = req.body.csrf_token;
if (!doubleSubmitCookie.validateRequest(cookieToken, bodyToken)) {
  return res.status(403).send('CSRF validation failed');
}
*/

// ✅ MITIGATION 5: CUSTOM HEADERS

/*
Client automatically adds header to requests:
X-CSRF-Token: token-value

Server checks for this header:
if (!req.headers['x-csrf-token']) {
  return res.status(403).send('Missing CSRF header');
}

Benefits:
- Browsers don't auto-add custom headers in cross-origin requests
- Only JavaScript can add it
- Only from same origin
*/

// ✅ MITIGATION 6: USER INTERACTION/RE-AUTHENTICATION

class ReauthenticationHandler {
  requiresReauth(action) {
    // Sensitive actions require re-authentication
    return ['transfer', 'delete-account', 'change-password'].includes(action);
  }
  
  requestReauth() {
    // Show password prompt
    // Verify before proceeding
  }
}

// ✅ MITIGATION 7: CORS POLICY

/*
Server sets CORS headers:
Access-Control-Allow-Origin: https://trusted.com
Access-Control-Allow-Methods: GET, POST
Access-Control-Allow-Credentials: true

Cross-origin POST requests fail without proper headers
*/

// COMPREHENSIVE CSRF PROTECTION

class CSRFProtection {
  constructor(tokenSecret) {
    this.tokenSecret = tokenSecret;
  }
  
  // Generate secure token
  generateToken(sessionId) {
    const crypto = require('crypto');
    const token = crypto.randomBytes(32).toString('hex');
    const hash = crypto.createHmac('sha256', this.tokenSecret)
      .update(sessionId + token)
      .digest('hex');
    return { token, hash };
  }
  
  // Verify token
  verifyToken(sessionId, token, hash) {
    const crypto = require('crypto');
    const computed = crypto.createHmac('sha256', this.tokenSecret)
      .update(sessionId + token)
      .digest('hex');
    return computed === hash;
  }
}

// BEST PRACTICES

console.log("\n=== CSRF Prevention Checklist ===\n");

const checklist = [
  "✓ Use CSRF tokens for state-changing operations",
  "✓ Use SameSite cookies (Strict or Lax)",
  "✓ Validate Origin and Referer headers",
  "✓ Use HTTPS/secure cookies",
  "✓ Implement custom headers (X-CSRF-Token)",
  "✓ Require re-authentication for sensitive actions",
  "✓ Use CORS properly",
  "✓ Never trust client-side validation alone",
  "✓ Regular security audits",
  "✓ Keep frameworks updated",
  "✓ Educate users about risks",
  "✓ Monitor for suspicious patterns"
];

checklist.forEach(item => console.log(item));
```

---

### How can you prevent SQL injection vulnerabilities in JavaScript applications?

```javascript
// SQL INJECTION VULNERABILITY

console.log("=== SQL Injection Prevention ===\n");

// ❌ VULNERABLE CODE

// Server-side (Node.js with MySQL)
/*
app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
  // DANGEROUS: Direct concatenation
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
  database.query(query, (err, results) => {
    if (results.length > 0) {
      res.send('Login successful');
    }
  });
});

Attack: 
username = ' OR '1'='1
password = ' OR '1'='1
Result: SELECT * FROM users WHERE username = '' OR '1'='1' AND password = '' OR '1'='1'
This returns ALL users!

Another attack:
username = '; DROP TABLE users; --
Result: Multiple statements executed - table deleted!
*/

// ✅ PREVENTION 1: PARAMETERIZED QUERIES (Prepared Statements)

class SecureDatabaseAccess {
  // Using prepared statements
  async getUser(username, password) {
    // Placeholders (?) prevent injection
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    
    // Parameters passed separately
    const results = await database.query(query, [username, password]);
    return results;
  }
  
  // With async/await
  async getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const results = await database.query(query, [email]);
    return results[0];
  }
}

// ✅ PREVENTION 2: ORM (Object-Relational Mapping)

/*
Sequelize (Node.js):
const user = await User.findOne({
  where: { username: req.body.username }
});

Mongoose (MongoDB):
const user = await User.findOne({ username: req.body.username });

Django ORM (Python):
user = User.objects.filter(username=request.POST['username']).first()

These automatically escape queries!
*/

// ✅ PREVENTION 3: INPUT VALIDATION

class InputValidator {
  // Whitelist approach
  static validateUsername(username) {
    // Only alphanumeric and underscores, 3-20 chars
    const regex = /^[a-zA-Z0-9_]{3,20}$/;
    return regex.test(username);
  }
  
  static validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  static validateID(id) {
    return Number.isInteger(id) && id > 0;
  }
  
  static validatePassword(password) {
    // At least 8 chars, letter, number, special
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  }
}

// ✅ PREVENTION 4: LEAST PRIVILEGE

/*
Database user with minimal permissions:

SELECT user (for queries):
CREATE USER 'app_select'@'localhost' IDENTIFIED BY 'password';
GRANT SELECT ON mydb.* TO 'app_select'@'localhost';

INSERT user (for inserts):
CREATE USER 'app_insert'@'localhost' IDENTIFIED BY 'password';
GRANT INSERT ON mydb.* TO 'app_insert'@'localhost';

Never use root/admin accounts!
*/

// ✅ PREVENTION 5: ESCAPING

class DatabaseEscaper {
  // Manual escaping as last resort
  static escapeSQLString(str) {
    return str
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/\0/g, '\\0')
      .replace(/\n/g, '\\n')
      .replace(/\r/g, '\\r')
      .replace(/\x1a/g, '\\Z');
  }
  
  // Better: Use library
  static escapeQuery(query, values) {
    // Use mysql.escape or similar
    return query.replace(/\?/g, () => mysql.escape(values.shift()));
  }
}

// SECURE IMPLEMENTATION EXAMPLE

class SecureUserService {
  constructor(database) {
    this.db = database;
  }
  
  async authenticateUser(username, password) {
    // 1. Validate input
    if (!InputValidator.validateUsername(username)) {
      throw new Error('Invalid username format');
    }
    
    // 2. Use parameterized query
    const query = 'SELECT id, password_hash FROM users WHERE username = ?';
    const results = await this.db.query(query, [username]);
    
    if (results.length === 0) {
      throw new Error('User not found');
    }
    
    // 3. Compare hashed passwords (never store plain text!)
    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }
    
    return user;
  }
  
  async createUser(username, email, password) {
    // 1. Validate all inputs
    if (!InputValidator.validateUsername(username)) {
      throw new Error('Invalid username');
    }
    if (!InputValidator.validateEmail(email)) {
      throw new Error('Invalid email');
    }
    if (!InputValidator.validatePassword(password)) {
      throw new Error('Weak password');
    }
    
    // 2. Check for duplicates using parameterized query
    const existing = await this.db.query(
      'SELECT id FROM users WHERE username = ? OR email = ?',
      [username, email]
    );
    
    if (existing.length > 0) {
      throw new Error('Username or email already exists');
    }
    
    // 3. Hash password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // 4. Insert with parameterized query
    const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    const result = await this.db.query(query, [username, email, passwordHash]);
    
    return { id: result.insertId, username, email };
  }
}

// TESTING FOR SQL INJECTION

console.log("\n=== Testing for SQL Injection ===\n");

const injectionTests = [
  "' OR '1'='1",
  "'; DROP TABLE users; --",
  "admin'--",
  "' OR 1=1--",
  "' UNION SELECT * FROM users--",
  "1' ORDER BY 10--",
  "' AND (SELECT * FROM users)='",
  "' UNION ALL SELECT NULL,NULL,NULL--"
];

console.log("Common injection patterns to test:");
injectionTests.forEach((test, i) => {
  console.log(`${i + 1}. ${test}`);
});

// BEST PRACTICES

console.log("\n=== SQL Injection Prevention Checklist ===\n");

const checklist = [
  "✓ Always use parameterized queries",
  "✓ Use prepared statements",
  "✓ Use ORM libraries",
  "✓ Validate and sanitize input",
  "✓ Use whitelist validation",
  "✓ Apply least privilege principle",
  "✓ Hash passwords with bcrypt/argon2",
  "✓ Never store plain text passwords",
  "✓ Use HTTPS for data transmission",
  "✓ Keep dependencies updated",
  "✓ Use Web Application Firewall (WAF)",
  "✓ Regular security testing",
  "✓ Code review process"
];

checklist.forEach(item => console.log(item));
```

### What are some best practices for handling sensitive data in JavaScript?

```javascript
// HANDLING SENSITIVE DATA SECURELY

console.log("=== Handling Sensitive Data ===\n");

// ❌ BAD: Storing secrets in code

const API_KEY = 'sk_live_51234567890'; // EXPOSED!
const DATABASE_URL = 'mysql://user:pass@localhost/db'; // EXPOSED!

// ❌ BAD: Storing in localStorage

localStorage.setItem('apiKey', apiKey); // Accessible to JavaScript!
localStorage.setItem('token', token); // XSS can steal!

// ✅ GOOD: Environment variables

/*
.env file (NEVER commit to git):
API_KEY=sk_live_51234567890
DATABASE_URL=mysql://user:pass@localhost/db
JWT_SECRET=your-secret-key

In code:
const apiKey = process.env.API_KEY;

Add to .gitignore:
.env
.env.local
.env.*.local
*/

// ✅ GOOD: Secure storage of authentication tokens

class SecureTokenStorage {
  // Store in httpOnly cookie (secure and not accessible to JS)
  static storeToken(token) {
    // Server sets this, not JavaScript!
    // Set-Cookie: auth_token=xyz; HttpOnly; Secure; SameSite=Strict
  }
  
  // If must store in JS, use sessionStorage (cleared on tab close)
  static storeSessionToken(token) {
    sessionStorage.setItem('auth_token', token);
    // Better than localStorage (which persists)
  }
  
  // Never use localStorage for sensitive data
  // ❌ localStorage.setItem('auth_token', token);
  
  // Retrieve token
  static getToken() {
    // Token automatically sent in cookies by browser
    // Or retrieve from sessionStorage
    return sessionStorage.getItem('auth_token');
  }
  
  // Clear token
  static clearToken() {
    sessionStorage.removeItem('auth_token');
  }
}

// ✅ GOOD: Password handling

class PasswordSecurity {
  // Client-side hashing (additional layer)
  static async hashPassword(password) {
    // Use crypto-js or TweetNaCl
    // const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    // Never transmit plain password
  }
  
  // Server-side hashing (required)
  static async serverHashPassword(password) {
    // Use bcrypt
    // const hash = await bcrypt.hash(password, 10);
  }
  
  // Never store plain passwords
  // ❌ database.save({ password: userPassword });
  
  // Never log passwords
  // ❌ console.log('User logged in with password:', password);
  
  // Always use HTTPS
  // Only send passwords over encrypted connections
}

// ✅ GOOD: API Key management

class APIKeyManagement {
  // Never store API keys in client-side code
  static getAPIKey() {
    // ❌ return 'sk_live_12345'; // Exposed!
    
    // ✅ Backend provides temporary token
    return fetch('/api/auth/token')
      .then(r => r.json())
      .then(data => data.tempToken);
  }
  
  // Use backend proxy for API calls
  static async makeSecureAPICall(endpoint, data) {
    // Client calls your backend
    const response = await fetch('/api/proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ endpoint, data })
    });
    
    // Backend calls external API with stored key
    return response.json();
  }
}

// ✅ GOOD: PII (Personally Identifiable Information) protection

class PIIProtection {
  // Never transmit PII in URLs
  // ❌ GET /user?ssn=123-45-6789
  // ✓ GET /user (with auth)
  
  // Encrypt sensitive data
  static async encryptSSN(ssn) {
    // Use TweetNaCl or crypto-js
    // Encrypt before sending
  }
  
  // Mask in logs
  static maskPII(data) {
    return {
      email: data.email.replace(/(.{2})(.*)(@.*)/, '$1***$3'),
      phone: data.phone.replace(/(\d{3})\d{3}(\d{4})/, '$1***$2'),
      ssn: data.ssn.replace(/\d{5}(\d{4})/, '****$1'),
      creditCard: data.creditCard.replace(/\d(?=\d{4})/g, '*')
    };
  }
  
  // Never store full credit card numbers
  // Use tokenization services (Stripe, PayPal)
}

// ✅ GOOD: Data encryption

class DataEncryption {
  // Use Web Crypto API
  static async encryptData(data, key) {
    const encoder = new TextEncoder();
    const algorithm = {
      name: 'AES-GCM',
      iv: crypto.getRandomValues(new Uint8Array(12))
    };
    
    const encryptedData = await crypto.subtle.encrypt(
      algorithm,
      key,
      encoder.encode(data)
    );
    
    return encryptedData;
  }
  
  // Decrypt data
  static async decryptData(encryptedData, key, iv) {
    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedData
    );
    
    return new TextDecoder().decode(decrypted);
  }
}

// ✅ GOOD: Secure HTTP communication

class SecureHTTP {
  // Always use HTTPS
  // ❌ http://api.example.com
  // ✓ https://api.example.com
  
  static makeSecureRequest(url, options = {}) {
    // Must use HTTPS
    if (!url.startsWith('https://')) {
      throw new Error('HTTPS required');
    }
    
    // Include security headers
    return fetch(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...options.headers
      },
      credentials: 'include', // Send cookies
      ...options
    });
  }
  
  // Use subresource integrity for CDN resources
  // <script src="https://cdn.example.com/lib.js" 
  //         integrity="sha384-..."></script>
}

// ✅ GOOD: Audit logging

class AuditLog {
  static log(action, user, details, sensitive = false) {
    const logEntry = {
      timestamp: new Date(),
      action,
      userId: user.id, // Not sensitive
      details: sensitive ? this.maskDetails(details) : details,
      ipAddress: this.maskIP(details.ipAddress),
      userAgent: details.userAgent
    };
    
    // Send to secure logging service
    this.sendToLoggingService(logEntry);
  }
  
  static maskDetails(details) {
    // Never log passwords, tokens, keys
    const masked = { ...details };
    delete masked.password;
    delete masked.token;
    delete masked.apiKey;
    return masked;
  }
  
  static maskIP(ip) {
    // Mask last octet
    return ip.replace(/(\d+)$/, 'xxx');
  }
}

// BEST PRACTICES

console.log("\n=== Sensitive Data Best Practices ===\n");

const bestPractices = [
  "✓ Use environment variables for secrets",
  "✓ Never commit secrets to version control",
  "✓ Use .gitignore for .env files",
  "✓ Store tokens in httpOnly cookies",
  "✓ Use HTTPS for all communication",
  "✓ Encrypt sensitive data in transit and at rest",
  "✓ Hash passwords with bcrypt/argon2",
  "✓ Mask PII in logs",
  "✓ Use backend proxy for API calls",
  "✓ Implement rate limiting",
  "✓ Use secrets management tools (Vault, AWS Secrets)",
  "✓ Regular security audits",
  "✓ Employee training on data handling",
  "✓ Compliance (GDPR, CCPA, etc.)"
];

bestPractices.forEach(p => console.log(p));
```

---

## Advanced Topics

### Explain the same-origin policy with regards to JavaScript.

```javascript
// SAME-ORIGIN POLICY (SOP)

console.log("=== Same-Origin Policy ===\n");

console.log("Origin = Protocol + Domain + Port\n");

console.log("Examples:");
console.log("  https://example.com");
console.log("  https://example.com:443 (implicit port)");
console.log("  https://subdomain.example.com");
console.log("  http://example.com (different protocol)\n");

// SAME ORIGIN COMPARISONS

const examples = [
  { url1: "https://example.com/page1", url2: "https://example.com/page2", same: true },
  { url1: "https://example.com:443/page", url2: "https://example.com/page", same: true },
  { url1: "https://example.com", url2: "https://example.com:8443", same: false },
  { url1: "https://example.com", url2: "http://example.com", same: false },
  { url1: "https://sub.example.com", url2: "https://example.com", same: false },
  { url1: "https://example.com", url2: "https://another.com", same: false }
];

console.log("Same-Origin Examples:");
examples.forEach(ex => {
  console.log(`${ex.url1}`);
  console.log(`${ex.url2}`);
  console.log(`Same origin: ${ex.same}\n`);
});

// WHAT SOP PROTECTS

console.log("=== SOP Protections ===\n");

console.log("Protected by SOP:");
console.log("  - localStorage/sessionStorage");
console.log("  - Cookies (mostly)");
console.log("  - XMLHttpRequest");
console.log("  - Fetch API");
console.log("  - DOM access");
console.log("  - IndexedDB");
console.log("  - Web Workers\n");

console.log("NOT protected by SOP:");
console.log("  - <img> tags");
console.log("  - <script> tags");
console.log("  - <link> tags (stylesheets)");
console.log("  - <iframe> (partially)");
console.log("  - WebSockets\n");

// ❌ BLOCKED: Cross-origin fetch

/*
Page: https://example.com
fetch('https://api.another.com/data')
  .then(r => r.json())
  .catch(err => console.log('CORS error!'));

Error: Access to XMLHttpRequest has been blocked by CORS policy
*/

// ✅ ALLOWED: Cross-origin image

/*
Page: https://example.com
<img src="https://api.another.com/image.jpg">
// Works! No CORS needed
*/

// ✅ SOLUTION: CORS (Cross-Origin Resource Sharing)

class CORSConfiguration {
  // Server configuration
  static configureServer() {
    // Express.js example
    /*
    const cors = require('cors');
    
    // Allow all origins (development only!)
    app.use(cors());
    
    // Specific origins
    app.use(cors({
      origin: ['https://example.com', 'https://app.example.com'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      allowedHeaders: ['Content-Type', 'Authorization']
    }));
    */
  }
  
  // Client request
  static makeCorseRequest() {
    // Browsers automatically add Origin header
    fetch('https://api.another.com/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Browser adds: Origin: https://example.com
      },
      body: JSON.stringify({ data: 'test' })
    })
    .then(r => r.json())
    .catch(err => console.error('CORS error:', err));
  }
}

// ✅ SOLUTION: JSONP (Legacy)

class JSONPCrossOrigin {
  static loadData(url, callback) {
    // Create script tag dynamically
    const script = document.createElement('script');
    
    // Callback function name
    window.jsonpCallback = callback;
    
    // Add to URL
    script.src = `${url}?callback=jsonpCallback`;
    
    document.head.appendChild(script);
    
    // Server responds: jsonpCallback({ data: 'value' })
  }
}

// ✅ SOLUTION: Proxy

class ProxyApproach {
  // Client talks to same-origin proxy
  static async fetchData(endpoint) {
    return fetch(`/api/proxy?url=${endpoint}`)
      .then(r => r.json());
  }
  
  // Server proxy:
  /*
  app.get('/api/proxy', async (req, res) => {
    const url = req.query.url;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // Send back to client
  });
  */
}

// DOCUMENT.DOMAIN

console.log("\n=== document.domain ===\n");

console.log("Can relax SOP between subdomains:");
console.log("  Page A: sub1.example.com");
console.log("  Page B: sub2.example.com\n");

console.log("In both pages:");
console.log("  document.domain = 'example.com';\n");

console.log("Now they can access each other!");
console.log("  // In iframe or other window\n");

// POSTMESSAGE: CROSS-ORIGIN COMMUNICATION

class PostMessageCommunication {
  // Page A (https://a.com)
  static sendMessage() {
    const iframe = document.querySelector('iframe');
    iframe.contentWindow.postMessage(
      { message: 'Hello' },
      'https://b.com' // Only b.com can receive
    );
  }
  
  // Page B (https://b.com) - in iframe
  static receiveMessage() {
    window.addEventListener('message', (event) => {
      // Verify origin
      if (event.origin !== 'https://a.com') {
        return; // Ignore unknown origin
      }
      
      console.log('Received:', event.data);
      
      // Send reply
      event.source.postMessage(
        { reply: 'Hello back' },
        event.origin
      );
    });
  }
}

// BEST PRACTICES

console.log("=== SOP Best Practices ===\n");

const practices = [
  "✓ Understand SOP limitations",
  "✓ Properly configure CORS",
  "✓ Use specific origins, not '*'",
  "✓ Validate Origin header",
  "✓ Use credentials: 'include' carefully",
  "✓ Implement server-side CORS validation",
  "✓ Use subresource integrity for CDN",
  "✓ Implement proper authentication",
  "✓ Regular security testing",
  "✓ Monitor for unauthorized access"
];

practices.forEach(p => console.log(p));
```

---

### What is 'use strict' in JavaScript for?

```javascript
// 'USE STRICT' - Strict parsing and error handling

console.log("=== 'use strict' ===\n");

// GLOBAL STRICT MODE

'use strict';

// All code below is in strict mode

// 1. PREVENTS IMPLICIT GLOBALS

// ❌ Without strict mode
function oldWay() {
  x = 3.14; // Creates global variable!
}

// ✓ With strict mode
function newWay() {
  // x = 3.14; // ReferenceError: x is not defined
  const x = 3.14; // Must declare
}

// 2. PREVENTS DELETING PROPERTIES

// ❌ Without strict mode
const obj = { name: 'John' };
delete obj.name; // Works but shouldn't

// ✓ With strict mode
// delete obj.name; // TypeError

// 3. FUNCTION STRICT MODE

function strictFunction() {
  'use strict';
  
  // Only this function is strict
  // y = 5; // ReferenceError
}

function normalFunction() {
  // Not strict
  y = 5; // Would create global
}

// 4. DISALLOWS OCTAL SYNTAX

// ❌ Without strict mode
const octal = 010; // Octal number (8 in decimal)

// ✓ With strict mode
// const octal = 010; // SyntaxError

// Use numeric separators instead
const decimal = 0o10; // Correct octal syntax

// 5. FORBIDS DUPLICATE PROPERTY NAMES

// ❌ Without strict mode
const duplicate = {
  name: 'John',
  name: 'Jane' // Last one wins, silently
};

// ✓ With strict mode
// const duplicate = {
//   name: 'John',
//   name: 'Jane' // SyntaxError
// };

// 6. MAKES EVAL SAFER

// ❌ Without strict mode
eval('var x = 10'); // x is global
console.log(x); // 10

// ✓ With strict mode
eval('var x = 10'); // x is local to eval
// console.log(x); // ReferenceError

// 7. THIS IS UNDEFINED

class StrictExample {
  method() {
    'use strict';
    // console.log(this); // undefined (not global)
  }
}

// 8. ARGUMENTS CHANGES

function argumentsExample(a) {
  'use strict';
  
  arguments[0] = 10;
  // a is still original value (not affected by arguments changes)
  console.log(a); // Original value
}

// 9. FORBIDS WITH STATEMENT

// ❌ Without strict mode
// with (obj) {
//   x = 10;
// }

// ✓ With strict mode - SyntaxError

// 10. STRICTER EVAL

function strictEval() {
  'use strict';
  
  eval('var localVar = 123');
  // localVar is only in eval scope
  // console.log(localVar); // ReferenceError
}

// FEATURES CHANGED IN STRICT MODE

console.log("\n=== Changes in Strict Mode ===\n");

const changes = {
  "Implicit globals": "Not allowed",
  "Variable deletion": "Error",
  "Octal literals": "Syntax error",
  "Duplicate properties": "Syntax error",
  "Eval scoping": "Safer",
  "This value": "Undefined in functions",
  "Arguments binding": "Decoupled from params",
  "With statement": "Forbidden",
  "eval() name": "Can't be used as variable",
  "Future reserved words": "Protected"
};

Object.entries(changes).forEach(([feature, behavior]) => {
  console.log(`${feature}: ${behavior}`);
});

// BEST PRACTICES

console.log("\n=== Strict Mode Best Practices ===\n");

console.log("✓ Use 'use strict' at function level");
console.log("✓ Use 'use strict' in modules (ES6)");
console.log("✓ Modern tools (bundlers, linters) enforce it");
console.log("✓ Classes and modules are strict by default");
console.log("✓ Encourages better coding practices");
console.log("✓ No performance penalty");
console.log("✓ Always declare variables");
console.log("✓ Use const/let, not var");
```

### How does JavaScript garbage collection work?

```javascript
// GARBAGE COLLECTION IN JAVASCRIPT

console.log("=== JavaScript Garbage Collection ===\n");

// Mark-and-Sweep Algorithm (most common)

console.log("How it works:");
console.log("1. Mark phase - Mark all reachable objects");
console.log("2. Sweep phase - Delete unreachable objects");
console.log("3. Compact phase - Defragment memory\n");

// EXAMPLE

let obj1 = { name: 'John' };
let obj2 = { name: 'Jane' };

// Both reachable (marked)
console.log(obj1.name); // John
console.log(obj2.name); // Jane

obj1 = null; // obj1 no longer referenced
// Next GC cycle: obj1 will be swept

// MEMORY REFERENCES

console.log("\n=== Memory References ===\n");

// Strong references - Prevent GC
let user = { id: 1 };
let userRef = user; // Strong reference
user = null;
// Still in memory because userRef exists
console.log(userRef.id); // 1

// WeakMap and WeakSet - Allow GC

const weakMap = new WeakMap();

let obj = { id: 1 };
weakMap.set(obj, 'metadata');

console.log(weakMap.has(obj)); // true

// obj = null;
// weakMap automatically removes entry when obj is GC'd
// console.log(weakMap.has(obj)); // false

// MEMORY LEAKS

console.log("\n=== Common Memory Leaks ===\n");

// 1. FORGOTTEN TIMERS

// ❌ Memory leak
function setupLeak() {
  const largeData = new Array(100000).fill('data');
  
  setInterval(() => {
    console.log(largeData.length); // Keeps largeData alive
  }, 1000); // Never cleared!
}

// ✓ Fixed
function setupCorrect() {
  const largeData = new Array(100000).fill('data');
  
  const timerId = setInterval(() => {
    console.log(largeData.length);
  }, 1000);
  
  // Later: Clear when done
  // clearInterval(timerId);
}

// 2. EVENT LISTENERS

// ❌ Memory leak
class Component {
  constructor(element) {
    this.element = element;
    this.element.addEventListener('click', this.onClick.bind(this));
  }
  
  onClick() {
    console.log('Clicked');
  }
  
  // Component never garbage collected
}

// ✓ Fixed
class ComponentFixed {
  constructor(element) {
    this.element = element;
    this.handleClick = this.onClick.bind(this);
    this.element.addEventListener('click', this.handleClick);
  }
  
  onClick() {
    console.log('Clicked');
  }
  
  destroy() {
    this.element.removeEventListener('click', this.handleClick);
  }
}

// 3. CLOSURES

// ❌ Memory leak
function createClosureLeak() {
  const largeArray = new Array(100000).fill('data');
  
  return () => {
    return largeArray.length; // Closure keeps largeArray alive forever
  };
}

// ✓ Fixed - Only keep what you need
function createClosureFixed() {
  const largeArray = new Array(100000).fill('data');
  const length = largeArray.length;
  
  return () => {
    return length; // Only length is needed
  };
}

// 4. GLOBAL VARIABLES

// ❌ Memory leak
function globalLeak() {
  globalVar = { data: 'big data' }; // Global forever
}

// ✓ Fixed
function globalFixed() {
  const localVar = { data: 'big data' }; // Garbage collected when out of scope
}

// 5. CIRCULAR REFERENCES (Less of an issue in modern engines)

class Node {
  constructor() {
    this.prev = null;
    this.next = null;
  }
}

// ❌ Circular reference
const node1 = new Node();
const node2 = new Node();
node1.next = node2;
node2.prev = node1; // Circular

// Modern GC handles this, but old engines struggled

// MONITORING MEMORY

console.log("\n=== Memory Monitoring ===\n");

// Performance API
if (performance.memory) {
  console.log('Used JS Heap:', performance.memory.usedJSHeapSize);
  console.log('Total JS Heap:', performance.memory.totalJSHeapSize);
  console.log('Heap Limit:', performance.memory.jsHeapSizeLimit);
}

// Chrome DevTools
console.log("\nChrome DevTools Memory tab:");
console.log("  - Take heap snapshots");
console.log("  - Record heap allocations");
console.log("  - Identify memory leaks");
console.log("  - Monitor over time");

// GC GENERATION HYPOTHESIS

console.log("\n=== Generational GC ===\n");

console.log("V8 Engine (Chrome) uses:");
console.log("  Young generation - Objects created recently");
console.log("  Old generation - Objects that survived multiple GC cycles\n");

console.log("Benefits:");
console.log("  - Young objects GC'd more frequently");
console.log("  - Old objects GC'd less often");
console.log("  - Better performance");

// BEST PRACTICES

console.log("\n=== Memory Management Best Practices ===\n");

const practices = [
  "✓ Clear timers/intervals",
  "✓ Remove event listeners",
  "✓ Avoid circular references",
  "✓ Use const/let (proper scope)",
  "✓ Use WeakMap/WeakSet for cache",
  "✓ Avoid global variables",
  "✓ Monitor memory in DevTools",
  "✓ Profile regularly",
  "✓ Clean up in destructors",
  "✓ Be careful with closures",
  "✓ Don't keep large data longer than needed",
  "✓ Avoid memory leaks in SPAs"
];

practices.forEach(p => console.log(p));
```

---

### What tools and techniques do you use for debugging JavaScript code?

```javascript
// DEBUGGING JAVASCRIPT

console.log("=== JavaScript Debugging Tools ===\n");

// 1. CONSOLE METHODS

console.log("Basic logging");
console.warn("Warning message");
console.error("Error message");
console.info("Information");

// Table output
const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];
console.table(users);

// Groups
console.group('User Info');
console.log('Name: John');
console.log('Age: 30');
console.groupEnd();

// Timing
console.time('operation');
for (let i = 0; i < 1000000; i++) {}
console.timeEnd('operation');

// Assertions
console.assert(1 + 1 === 2, 'Math broken!');

// 2. DEBUGGER STATEMENT

function debugMe() {
  const x = 5;
  debugger; // Execution pauses here in DevTools
  return x * 2;
}

// 3. BROWSER DEVTOOLS

console.log("\nChrome DevTools:");
console.log("  - Sources tab - Set breakpoints");
console.log("  - Step over/into code");
console.log("  - Watch expressions");
console.log("  - Call stack inspection");
console.log("  - Console evaluation");

// 4. BREAKPOINT TYPES

class BreakpointTypes {
  // Line breakpoint
  method1() {
    const x = 1; // Set breakpoint here
    return x;
  }
  
  // Conditional breakpoint
  method2(value) {
    if (value > 100) { // Set breakpoint, condition: value > 100
      return value;
    }
  }
  
  // DOM breakpoint
  setupDOMBreakpoint() {
    const element = document.querySelector('#button');
    // Right-click > Break on > subtree modifications
  }
  
  // Event listener breakpoint
  setupEventBreakpoint() {
    // DevTools > Events > Click
    document.addEventListener('click', () => {
      // Breaks on any click
    });
  }
}

// 5. ERROR HANDLING AND LOGGING

class ErrorHandler {
  static setup() {
    // Catch unhandled errors
    window.addEventListener('error', (event) => {
      console.error('Error caught:', event.error);
      this.reportError(event.error);
    });
    
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled rejection:', event.reason);
      this.reportError(event.reason);
    });
  }
  
  static reportError(error) {
    // Send to logging service (Sentry, LogRocket, etc.)
    if (window.Sentry) {
      Sentry.captureException(error);
    }
  }
}

// 6. SOURCE MAPS

console.log("\nSource Maps:");
console.log("  - Map minified code to source");
console.log("  - Debug original code in DevTools");
console.log("  - Production debugging");

// In build process:
// webpack: devtool: 'source-map'
// TypeScript: sourceMap: true

// 7. NETWORK DEBUGGING

class NetworkDebug {
  static analyzeRequests() {
    // DevTools > Network tab
    // - Monitor all requests
    // - Check response times
    // - Inspect headers
    // - Throttle for testing
  }
  
  static monitorFetch() {
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
      const start = performance.now();
      return originalFetch.apply(this, args)
        .then(response => {
          const duration = performance.now() - start;
          console.log(`Fetch ${args[0]}: ${duration}ms`);
          return response;
        });
    };
  }
}

// 8. PERFORMANCE PROFILING

class PerformanceDebug {
  static profileFunction() {
    performance.mark('operation-start');
    
    expensiveOperation();
    
    performance.mark('operation-end');
    performance.measure('operation', 'operation-start', 'operation-end');
    
    const measure = performance.getEntriesByName('operation')[0];
    console.log(`Operation took ${measure.duration}ms`);
  }
  
  static analyzePerformance() {
    // DevTools > Performance tab
    // - Record runtime performance
    // - Analyze flame graphs
    // - Identify bottlenecks
    // - Check FCP, LCP, etc.
  }
}

function expensiveOperation() {
  let sum = 0;
  for (let i = 0; i < 100000000; i++) {
    sum += i;
  }
}

// 9. LOGGING LIBRARIES

console.log("\nLogging Libraries:");
console.log("  - winston - Comprehensive logging");
console.log("  - bunyan - JSON logging");
console.log("  - pino - Fast logger");
console.log("  - debug - Simple debugging");

// 10. ERROR TRACKING SERVICES

console.log("\nError Tracking:");
console.log("  - Sentry - Error/performance monitoring");
console.log("  - LogRocket - Session replay");
console.log("  - Rollbar - Real-time monitoring");
console.log("  - New Relic - APM");
console.log("  - Datadog - Full observability");

// DEBUGGING WORKFLOW

console.log("\n=== Debugging Workflow ===\n");

const workflow = [
  "1. Reproduce the issue",
  "2. Enable DevTools",
  "3. Set breakpoints",
  "4. Step through code",
  "5. Inspect variables",
  "6. Check console logs",
  "7. Review call stack",
  "8. Use conditional breakpoints",
  "9. Check network requests",
  "10. Profile if needed"
];

workflow.forEach(step => console.log(step));

// BEST PRACTICES

console.log("\n=== Debugging Best Practices ===\n");

const practices = [
  "✓ Use meaningful variable names",
  "✓ Add comments to complex logic",
  "✓ Use console.assert() for conditions",
  "✓ Create reproducible test cases",
  "✓ Use source maps in production",
  "✓ Monitor errors with tracking service",
  "✓ Use error boundaries (React)",
  "✓ Log important events",
  "✓ Use debugger for complex issues",
  "✓ Keep DevTools profiler handy"
];

practices.forEach(p => console.log(p));
```

---

