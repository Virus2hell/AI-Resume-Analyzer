# Complete React Interview Guide
## Simple Explanations for Frontend Interviews

---

## REACT FUNDAMENTALS

### 1. What is React?

**Answer:**
React is a **JavaScript library for building user interfaces** using reusable components. Instead of writing HTML/CSS/JavaScript all mixed together, React lets you create components that manage their own data and rendering.

Think of React as a **smart UI builder** — when data changes, React automatically updates only the parts of the page that need to change, instead of refreshing the entire page.

**Simple analogy:** If a website is a LEGO house, React components are the LEGO blocks. You build the house by combining blocks, and when you need to change something, you just swap out specific blocks instead of rebuilding the whole house.

---

### 2. When was React first released?

**Answer:**
React was first released by **Facebook in May 2013**. It was created to solve problems Facebook had with building complex, dynamic user interfaces.

---

### 3. Does React use HTML?

**Answer:**
Yes and no. React uses **JSX** which looks like HTML but is actually JavaScript. JSX gets converted to JavaScript before running in the browser.

```javascript
// This is JSX (looks like HTML)
const greeting = <h1>Hello World</h1>;

// It becomes this JavaScript
const greeting = React.createElement('h1', null, 'Hello World');
```

So technically, React doesn't use HTML directly — it uses JavaScript functions that create HTML elements dynamically.

---

### 4. What is JSX?

**Answer:**
**JSX** stands for "JavaScript XML" — it's a syntax that lets you write HTML-like code inside JavaScript.

```javascript
// JSX
const card = (
  <div className="card">
    <h1>{title}</h1>
    <p>{description}</p>
  </div>
);

// WITHOUT JSX (same thing, much uglier)
const card = React.createElement(
  'div',
  { className: 'card' },
  React.createElement('h1', null, title),
  React.createElement('p', null, description)
);
```

**Why use JSX?** It's much easier to read and write. It looks like HTML, so developers familiar with HTML understand it immediately.

---

### 5. Can you write React without JSX?

**Answer:**
Yes, you can write React using only `React.createElement()`, but it's much more verbose and harder to read.

```javascript
// With JSX (clean)
function App() {
  return <h1>Hello</h1>;
}

// Without JSX (ugly)
function App() {
  return React.createElement('h1', null, 'Hello');
}
```

In practice, **always use JSX** — there's no advantage to not using it, and it makes code much more readable.

---

### 6. How can a browser read JSX files?

**Answer:**
Browsers can't directly read JSX. A **transpiler** (like Babel) converts JSX to JavaScript before the browser sees it.

```
JSX Code (App.jsx)
    ↓ (Babel transpiles)
    ↓
JavaScript Code (App.js)
    ↓
Browser reads it
```

**In your project:**
- During development, Vite/Webpack runs Babel automatically
- Babel converts all JSX to `React.createElement()` calls
- Browser receives pure JavaScript
- Browser renders the HTML

This happens behind the scenes, so you just write JSX and it "just works."

---

### 7. What are the key features of React?

**Answer:**

1. **Component-based** — Build UI from reusable components
2. **Virtual DOM** — React updates only changed parts (fast)
3. **One-way data binding** — Data flows from parent to child
4. **Declarative** — Describe what UI should look like, React handles updates
5. **Reusable components** — Write once, use everywhere
6. **Easy debugging** — React DevTools browser extension
7. **Strong community** — Lots of libraries and resources
8. **SEO-friendly** — Can render on server side (SSR)

---

### 8. What are the limitations of React?

**Answer:**

1. **Learning curve** — JSX and component concepts are new
2. **Not a complete framework** — Only handles UI, need other libraries for routing, state management
3. **Tooling complexity** — Need Webpack/Vite/Babel (create-react-app handles this)
4. **Large bundle size** — React library is about 40KB minified
5. **SEO issues** — Client-side rendering (SSR solves this)
6. **Not good for simple sites** — Overkill for static content
7. **Steep learning curve** — Not recommended for beginners to JavaScript

---

### 9. What is the difference between React and Angular?

**Answer:**

| Feature | React | Angular |
|---------|-------|---------|
| **Type** | Library (UI only) | Full framework |
| **Language** | JavaScript + JSX | TypeScript |
| **Learning** | Easier, smaller | Harder, more concepts |
| **Bundle size** | ~40KB | ~500KB |
| **Performance** | Fast (Virtual DOM) | Very fast (RxJS) |
| **Data binding** | One-way | Two-way |
| **Used by** | Facebook, Instagram | Google, Microsoft |
| **Community** | Huge | Medium |

**When to use:**
- **React:** Flexible projects, large teams, single-page apps
- **Angular:** Enterprise projects, teams with TypeScript experience

---

### 10. What's the difference between Element and Component in React?

**Answer:**

**Element** — A plain JavaScript object describing what to display

```javascript
// Element (just an object)
const element = <h1>Hello</h1>;
// Same as
const element = {
  type: 'h1',
  props: { children: 'Hello' }
};
```

**Component** — A function or class that returns an element

```javascript
// Component (a function)
function Greeting() {
  return <h1>Hello</h1>; // returns an element
}

// Component (a class)
class Greeting extends React.Component {
  render() {
    return <h1>Hello</h1>;
  }
}
```

**Key difference:**
- **Elements are what appears on screen** — static objects
- **Components produce elements** — reusable, dynamic

```javascript
// Element
const greeting = <h1>Hello</h1>;

// Component
function MyGreeting() {
  return <h1>Hello</h1>;
}

// Use component with JSX
<MyGreeting /> // renders the element
```

---

### 11. What is the significance of keys in React?

**Answer:**
**Keys** help React identify which items have changed in a list. They tell React "this is the same item as before" or "this is a new item."

```javascript
// BAD — no keys, React can't track items
const list = items.map(item => <li>{item.name}</li>);

// GOOD — keys help React track items
const list = items.map(item => 
  <li key={item.id}>{item.name}</li>
);
```

**Why keys matter:**

```javascript
// Without keys (problem!)
const todos = [
  { id: 1, name: 'Buy milk' },
  { id: 2, name: 'Do homework' }
];

// User adds new item at start
const todos = [
  { id: 3, name: 'NEW ITEM' },
  { id: 1, name: 'Buy milk' },
  { id: 2, name: 'Do homework' }
];

// React thinks: "First item changed from 'Buy milk' to 'NEW ITEM'"
// So it updates the first item instead of inserting new one
// This causes bugs!

// With keys (solved!)
<li key={item.id}>{item.name}</li>

// React thinks: "New item with key=3 appeared, shift others"
// Correctly inserts new item
```

**Best practice:**
- Use unique database ID as key (never use array index)
- Keys should be stable across re-renders

```javascript
// BAD — index can change
items.map((item, index) => <li key={index}>{item}</li>)

// GOOD — stable ID
items.map(item => <li key={item.id}>{item}</li>)
```

---

### 12. Explain React's one-way data binding

**Answer:**
**One-way data binding** means data flows from parent component down to child components. Child cannot directly change parent's data.

```javascript
// Parent
function Parent() {
  const [name, setName] = React.useState('John');
  
  return (
    <Child name={name} /> // data flows DOWN
  );
}

// Child
function Child({ name }) {
  return <p>{name}</p>;
  
  // Child gets name but can't modify parent's 'name' directly
  // name = 'Jane'; // ERROR — can't change prop
}
```

**How child updates parent data:**

```javascript
// Parent
function Parent() {
  const [name, setName] = React.useState('John');
  
  return (
    <Child name={name} onNameChange={setName} />
    // Pass function to child
  );
}

// Child
function Child({ name, onNameChange }) {
  return (
    <button onClick={() => onNameChange('Jane')}>
      Change to Jane
    </button>
    // Child calls function to update parent
  );
}
```

**Flow:**
```
Parent (state: name='John')
    ↓ (pass name prop DOWN)
    ↓
Child (receives name='John')
    ↓ (user clicks button)
    ↓
Child calls onNameChange('Jane')
    ↓ (callback goes UP)
    ↓
Parent updates state
    ↓
Child re-renders with new name
```

**Advantage:** Easier to debug (clear data flow), easier to reason about

---

### 13. What are the advantages of using React?

**Answer:**

1. **Easy to learn** — If you know JavaScript, React is relatively easy
2. **Reusable components** — Build once, use many times
3. **Faster rendering** — Virtual DOM makes updates fast
4. **SEO friendly** — Can do server-side rendering
5. **Unidirectional data flow** — Easier to debug
6. **Strong community** — Lots of libraries, tutorials, help
7. **Developer tools** — React DevTools browser extension
8. **Clean code** — JSX is readable and maintainable
9. **Mobile development** — React Native for iOS/Android
10. **Easy testing** — Components are easy to test

---

### 14. What is the virtual DOM and how does it work?

**Answer:**
The **Virtual DOM** is React's in-memory representation of the real DOM. It's a JavaScript object that mirrors the structure of the actual DOM.

```
Virtual DOM (JavaScript object in memory)
    ↓
    ↓ React compares old vs new
    ↓
    ↓ Finds differences (diffing)
    ↓
    ↓ Updates only changed parts
    ↓
Real DOM (what user sees)
```

**How it works step by step:**

```javascript
// 1. Initial render
function App() {
  return <h1>Hello</h1>;
}

// React creates:
// Virtual DOM: { type: 'h1', props: { children: 'Hello' } }
// Real DOM: <h1>Hello</h1>

// 2. State changes
const [count, setCount] = useState(0);
setCount(1);

// 3. Re-render (new Virtual DOM)
// Virtual DOM: { type: 'h1', props: { children: 'Count: 1' } }

// 4. React compares old Virtual DOM vs new Virtual DOM
// Finds: text changed from 'Hello' to 'Count: 1'

// 5. React updates ONLY that part in Real DOM
// Real DOM: <h1>Count: 1</h1>

// Much faster than re-rendering entire page!
```

**Why Virtual DOM is faster:**
- Updating DOM is slow (causes reflows)
- Updating JavaScript objects is fast
- React batches updates
- Only necessary DOM updates happen

---

### 15. How would you optimize a React application's performance?

**Answer:**

**1. Memoization — Prevent unnecessary re-renders**
```javascript
// Component re-renders every time parent re-renders (bad)
function Child({ data }) {
  return <p>{data}</p>;
}

// Memoize — only re-render if props change (good)
const Child = React.memo(function Child({ data }) {
  return <p>{data}</p>;
});
```

**2. useCallback — Memoize functions**
```javascript
// New function every render (bad)
function Parent() {
  const handleClick = () => console.log('clicked');
  return <Child onClick={handleClick} />;
}

// Memoize function (good)
function Parent() {
  const handleClick = useCallback(() => {
    console.log('clicked');
  }, []); // dependencies
  return <Child onClick={handleClick} />;
}
```

**3. useMemo — Memoize expensive calculations**
```javascript
// Recalculates every render (bad)
function Component({ items }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  return <p>{total}</p>;
}

// Memoize calculation (good)
function Component({ items }) {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]); // recalculate only if items change
  return <p>{total}</p>;
}
```

**4. Lazy loading — Load components when needed**
```javascript
// Loads all components upfront (bad for large apps)
import Dashboard from './Dashboard';
import Settings from './Settings';

// Load only when needed (good)
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Dashboard />
    </Suspense>
  );
}
```

**5. Code splitting — Split bundle**
```javascript
// One huge bundle (bad)
// All code loaded at once

// Multiple bundles (good)
// Load route-specific code only when user navigates there
```

**6. Remove console.log in production**
```javascript
// Development
console.log('Debug info');

// Production
if (process.env.NODE_ENV === 'development') {
  console.log('Debug info');
}
```

---

## VIRTUAL DOM

### 16. What is the difference between the virtual DOM and the real DOM?

**Answer:**

| Virtual DOM | Real DOM |
|------------|----------|
| JavaScript object | HTML elements in browser |
| In memory | On screen |
| Updates are fast | Updates are slow |
| Can't display anything | Actually displays content |
| React creates and compares | Browser renders |
| Lightweight | Heavy |
| Can be updated programmatically | Updated through DOM APIs |

**Visual:**
```javascript
// Virtual DOM (in JavaScript)
{
  type: 'div',
  props: { className: 'container' },
  children: [
    { type: 'h1', props: {}, children: 'Hello' }
  ]
}

// Real DOM (in browser)
<div class="container">
  <h1>Hello</h1>
</div>
```

---

### 17. Is the virtual DOM the same as the shadow DOM?

**Answer:**
No, they're completely different concepts.

**Virtual DOM:**
- React's in-memory representation
- Used for efficiently updating the real DOM
- Only in React (not a browser feature)
- Every framework can have its own virtual DOM

**Shadow DOM:**
- Browser feature for encapsulation
- Used in Web Components
- Creates isolated DOM subtree
- Scopes styles and scripts

```javascript
// Virtual DOM (React concept)
// React's internal representation

// Shadow DOM (Browser feature)
// Used in web components
class MyElement extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' }); // Shadow DOM!
  }
}
```

**Analogy:**
- Virtual DOM = Blueprint of a house (React uses it to plan updates)
- Shadow DOM = Hidden rooms in a house (browser uses it to isolate content)

---

### 18. What is reconciliation in React?

**Answer:**
**Reconciliation** is React's process of figuring out which parts of the UI changed and need to be updated.

```
Reconciliation = Diffing + Patching

1. DIFFING: Compare old Virtual DOM with new Virtual DOM
2. PATCHING: Update Real DOM with changes
```

**How it works:**

```javascript
// Initial render
const vdom1 = <div>Hello</div>;
// Real DOM: <div>Hello</div>

// State changes
const vdom2 = <div>Hello World</div>;

// React reconciliation process:
// 1. Compare vdom1 and vdom2
// 2. Find difference: text changed
// 3. Update only that text in Real DOM
// 4. Real DOM: <div>Hello World</div>
```

**Reconciliation algorithm:**

```javascript
// React asks three questions:

// 1. Is it the same component type?
<Component>  →  <Component>  // Yes, compare props/state
<Component>  →  <Different>  // No, replace entire component

// 2. Do props/state match?
<div id="1"> → <div id="1">  // Yes, same
<div id="1"> → <div id="2">  // No, update

// 3. Do children match?
<ul><li>A</li></ul> → <ul><li>A</li></ul>  // Yes, same
<ul><li>A</li></ul> → <ul><li>B</li></ul>  // No, update
```

---

### 19. How does the diffing algorithm work in React?

**Answer:**
React's diffing algorithm compares the old and new Virtual DOM to find minimal changes.

**Algorithm rules:**

**1. Different component types → Replace entire subtree**
```javascript
// Old
<Greeting />

// New
<Welcome />

// Result: Remove Greeting, add Welcome (don't compare contents)
```

**2. Same component type with different props → Update**
```javascript
// Old
<List items={[1,2,3]} />

// New
<List items={[1,2,3,4]} />

// Result: Update only the items prop
```

**3. Different elements with same children → Update element**
```javascript
// Old
<div className="old"></div>

// New
<div className="new"></div>

// Result: Update className, keep children
```

**4. Lists use keys for efficiency**
```javascript
// Without keys
// Old: <li>A</li><li>B</li><li>C</li>
// New: <li>D</li><li>A</li><li>B</li><li>C</li>
// React thinks: A changed to D, B changed to A, etc. (inefficient)

// With keys
// Old: <li key="a">A</li><li key="b">B</li><li key="c">C</li>
// New: <li key="d">D</li><li key="a">A</li><li key="b">B</li><li key="c">C</li>
// React thinks: New item with key "d" inserted (efficient)
```

---

### 20. Why is the virtual DOM faster than the real DOM?

**Answer:**
Virtual DOM is faster because it's **in memory** and **batches updates**, while real DOM causes **reflows and repaints**.

**Slow process (without Virtual DOM):**
```javascript
// Without Virtual DOM
element1.textContent = 'Updated'; // Reflow + Repaint #1
element2.style.color = 'red';     // Reflow + Repaint #2
element3.textContent = 'Data';    // Reflow + Repaint #3
// 3 total reflows/repaints (SLOW!)
```

**Fast process (with Virtual DOM):**
```javascript
// With Virtual DOM
setName('Updated');  // Update state
setColor('red');     // Update state
setData('Data');     // Update state

// React batches all three changes:
// 1. Creates new Virtual DOM with all changes
// 2. Compares with old Virtual DOM
// 3. Finds all differences
// 4. Updates Real DOM ONCE with all changes
// 1 total reflow/repaint (FAST!)
```

**Speed comparison:**
- Reflow (recalculate layout): ~1-5ms
- Repaint (redraw pixels): ~1-3ms
- Updating JavaScript object: ~0.001ms

Virtual DOM wins because it's all JavaScript operations until the final Real DOM update.

---

### 21. What happens when you call setState in React?

**Answer:**
When you call `setState()` (or `useState()` setter), React doesn't immediately update state. Instead, it **queues the update** and follows this process:

```javascript
// Class component
this.setState({ count: 1 }); // Queue state update

// Functional component
setCount(1); // Queue state update
```

**Step-by-step process:**

```
1. setState() called
   ↓
2. React adds to update queue (batches updates)
   ↓
3. React schedules re-render (using requestIdleCallback or setTimeout)
   ↓
4. Component re-renders
   ↓
5. New Virtual DOM created
   ↓
6. React compares old Virtual DOM vs new (diffing)
   ↓
7. React updates Real DOM with changes only
   ↓
8. Component lifecycle methods run (componentDidUpdate or useEffect)
```

**Example:**

```javascript
function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(1);        // Queue update
    setCount(2);        // Queue update
    setCount(3);        // Queue update
    
    console.log(count); // Still 0! (not updated yet)
  };

  // After React processes all updates:
  // count becomes 3 (only last update matters)
  // Component re-renders once

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </>
  );
}
```

**Key points:**
- setState() is **asynchronous** (doesn't update immediately)
- Updates are **batched** (multiple setState calls = one re-render)
- Previous state changes are **merged** with new state

---

### 22. Explain how React updates the DOM efficiently

**Answer:**
React updates the DOM efficiently through three main techniques:

**1. Virtual DOM Comparison (Diffing)**
```javascript
// React compares old and new Virtual DOM
// Updates only the parts that changed

// Old: <div><p>Hello</p></div>
// New: <div><p>Hello</p><p>World</p></div>

// React updates: Adds new <p>World</p> only
// Doesn't touch the first <p>Hello</p>
```

**2. Batching Updates**
```javascript
// Without batching (3 DOM updates)
setState({ a: 1 }); // Update #1
setState({ b: 2 }); // Update #2
setState({ c: 3 }); // Update #3

// With batching (1 DOM update)
// All three setState calls are batched
// React makes one combined update to the Real DOM
```

**3. Using Keys for Lists**
```javascript
// With keys, React can reuse DOM nodes

// Old list: <li key="a">Apple</li><li key="b">Banana</li>
// New list: <li key="c">Cherry</li><li key="a">Apple</li><li key="b">Banana</li>

// Without keys: React would recreate all items (inefficient)
// With keys: React reuses Apple and Banana nodes, adds Cherry (efficient)
```

**4. Event Delegation**
```javascript
// Without delegation (many event listeners)
items.map(item => (
  <button onClick={handleClick}>  // listener on each button
    {item}
  </button>
))

// With delegation (one listener)
<ul onClick={handleClick}>
  {items.map(item => <li>{item}</li>)}
</ul>
// Single listener on parent catches all clicks
```

---

## COMPONENTS

### 23. What is the difference between an element and a component?

**(Already covered in question 10)**

---

### 24. What are the types of React components?

**Answer:**

**1. Functional Components (Modern, Preferred)**
```javascript
// Simple function that returns JSX
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Arrow function
const Greeting = ({ name }) => <h1>Hello, {name}!</h1>;

// With hooks for state and lifecycle
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}
```

**2. Class Components (Older, Still Valid)**
```javascript
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    console.log('Component mounted');
  }
  
  render() {
    return (
      <>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>+</button>
      </>
    );
  }
}
```

**3. Pure Components**
```javascript
// Shallow comparison of props (prevents unnecessary re-renders)
class MyComponent extends React.PureComponent {
  render() {
    return <p>{this.props.data}</p>;
  }
}

// Functional equivalent
const MyComponent = React.memo(({ data }) => {
  return <p>{data}</p>;
});
```

**4. Higher-Order Components (HOC)**
```javascript
// A function that takes a component and returns enhanced component
const withTheme = (WrappedComponent) => {
  return (props) => (
    <div className="theme">
      <WrappedComponent {...props} />
    </div>
  );
};

// Usage
const StyledGreeting = withTheme(Greeting);
```

**Comparison:**

| Type | When to use | Pros | Cons |
|------|-----------|------|------|
| Functional | Always now | Simple, hooks, cleaner | Requires hooks for state |
| Class | Legacy projects | Lifecycle methods clear | More boilerplate |
| Pure | Performance | Prevents re-renders | Shallow comparison only |
| HOC | Code reuse | Powerful abstraction | Complex, hard to debug |

---

### 25. When should you create class-based components versus function components?

**Answer:**

**Use Functional Components (99% of the time):**
```javascript
// Reasons:
// 1. Simpler syntax
function MyComponent() {
  return <div>Hello</div>;
}

// 2. Hooks make state management easy
const [state, setState] = useState(0);

// 3. Easier to test
// 4. Better for code splitting (smaller bundles)
// 5. Easier to reuse logic with custom hooks
```

**Use Class Components (rare cases):**
```javascript
// 1. Error boundaries (as of now, only class components support this)
class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    console.log('Error caught:', error);
  }
  
  render() {
    // ...
  }
}

// 2. Legacy projects already using classes
// 3. Legacy codebases you're maintaining
```

**Modern recommendation:** Always start with functional components. Only use classes if you have a specific reason (error boundaries).

---

### 26. What are stateless components?

**Answer:**
**Stateless components** are components that don't have internal state. They only receive data through props and render it.

```javascript
// Stateless component (pure function)
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}

// Same data → Same output (no internal state)
Greeting({ name: 'John' }); // Always returns <h1>Hello, John</h1>
Greeting({ name: 'John' }); // Same output
```

**vs Stateful component:**
```javascript
// Stateful component (has state)
function Counter() {
  const [count, setCount] = useState(0); // Has internal state
  
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  );
}

// Same props → Different output (depends on internal state)
// First render: Count: 0
// After button click: Count: 1
```

**Stateless benefits:**
- Simple and easy to test
- Predictable (same input → same output)
- No side effects
- Best for presentational components

---

### 27. What are Pure Components?

**Answer:**
**Pure Components** prevent unnecessary re-renders by comparing props/state shallowly. If props/state haven't changed, the component won't re-render.

```javascript
// Regular component (re-renders every time parent re-renders)
function MyComponent({ data }) {
  console.log('Rendering'); // Logs every time
  return <p>{data}</p>;
}

// Pure component (only re-renders if props change)
class PureMyComponent extends React.PureComponent {
  render() {
    console.log('Rendering'); // Only logs if data actually changed
    return <p>{this.props.data}</p>;
  }
}

// Or functional equivalent
const FunctionalPure = React.memo(({ data }) => {
  console.log('Rendering'); // Only logs if data actually changed
  return <p>{data}</p>;
});
```

**How it works:**

```javascript
// Parent component
function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
      <PureCounter /> {/* Won't re-render even though parent re-rendered */}
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}

// When button clicked:
// 1. Parent re-renders (count changed)
// 2. PureCounter checks: "Did my props change?" No
// 3. PureCounter doesn't re-render (saves performance!)
```

**Important:** Pure comparison is **shallow** (only top level)

```javascript
// Shallow comparison (PureComponent might not detect change)
const user = { name: 'John', age: 30 };
const newUser = { name: 'John', age: 31 }; // Different object, same structure

// Shallow comparison sees: different object references
// Deep comparison would see: only age changed

// This is why you should avoid mutating state:
state.user.name = 'Jane'; // WRONG — mutates existing object
setState({ user: { ...state.user, name: 'Jane' } }); // RIGHT — new object
```

---

### 28. What is a higher-order component (HOC)?

**Answer:**
A **Higher-Order Component** is a function that takes a component and returns an enhanced version of it.

```javascript
// HOC syntax
const EnhancedComponent = higherOrderComponent(OriginalComponent);
```

**Simple example:**

```javascript
// Original component
function MyComponent({ data }) {
  return <div>{data}</div>;
}

// HOC that adds loading functionality
function withLoading(Component) {
  return ({ isLoading, ...props }) => {
    if (isLoading) return <p>Loading...</p>;
    return <Component {...props} />;
  };
}

// Enhanced component
const EnhancedComponent = withLoading(MyComponent);

// Usage
<EnhancedComponent isLoading={true} data="Hello" />
// Shows: Loading...

<EnhancedComponent isLoading={false} data="Hello" />
// Shows: <div>Hello</div>
```

**Real example — withTheme HOC:**

```javascript
// HOC
function withTheme(Component) {
  return (props) => {
    const [isDark, setIsDark] = useState(false);
    
    return (
      <div className={isDark ? 'dark' : 'light'}>
        <Component {...props} isDark={isDark} setIsDark={setIsDark} />
      </div>
    );
  };
}

// Original component
function App({ isDark, setIsDark }) {
  return (
    <button onClick={() => setIsDark(!isDark)}>
      Toggle Theme
    </button>
  );
}

// Enhanced
const EnhancedApp = withTheme(App);
```

**When to use HOCs:**
- Code reuse across components
- Props manipulation
- State abstraction
- Performance optimization

**Note:** Hooks are often simpler for modern React. Use custom hooks instead of HOCs when possible.

---

### 29. What is the main difference between createElement and cloneElement?

**Answer:**

**createElement** — Creates a new React element

```javascript
// Create new element
const element = React.createElement(
  'h1',                           // type
  { className: 'greeting' },      // props
  'Hello, World!'                 // children
);

// Result:
// { 
//   type: 'h1',
//   props: { className: 'greeting', children: 'Hello, World!' }
// }
```

**cloneElement** — Creates a copy of an element with new props

```javascript
// Clone element with new props
const element = <h1>Hello</h1>;
const cloned = React.cloneElement(element, { className: 'greeting' });

// Result:
// { 
//   type: 'h1',
//   props: { className: 'greeting', children: 'Hello' }
// }

// Original props are merged with new props:
// Element: <h1 id="greeting">Hello</h1>
// Cloned: React.cloneElement(element, { className: 'title' })
// Result: <h1 id="greeting" className="title">Hello</h1>
```

**Use cases:**

```javascript
// createElement — creating new elements
const button = React.createElement('button', null, 'Click me');

// cloneElement — enhancing existing elements (in render props or HOCs)
function withClick(Component) {
  return (props) => {
    return React.cloneElement(Component, {
      onClick: () => console.log('Clicked!')
    });
  };
}
```

---

### 30. What are render props in React?

**Answer:**
**Render props** is a pattern where a component receives a function as a prop and calls it to render content.

```javascript
// Component with render prop
function Toggle({ render }) {
  const [isOn, setIsOn] = useState(false);
  
  return render(isOn, () => setIsOn(!isOn));
}

// Usage
<Toggle
  render={(isOn, toggle) => (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  )}
/>
```

**Real-world example — Mouse position tracker:**

```javascript
// Component that tracks mouse position
function Mouse({ children }) {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  
  const handleMouseMove = (e) => {
    setX(e.clientX);
    setY(e.clientY);
  };
  
  return (
    <div onMouseMove={handleMouseMove}>
      {children(x, y)} {/* Call children as function */}
    </div>
  );
}

// Usage
<Mouse>
  {(x, y) => (
    <p>Mouse position: {x}, {y}</p>
  )}
</Mouse>
```

**Comparison with HOC:**

```javascript
// HOC approach
const withMouse = (Component) => (
  <Mouse render={(x, y) => <Component x={x} y={y} />} />
);

// Render props approach
<Mouse render={(x, y) => <MyComponent x={x} y={y} />} />
```

**Alternatives (modern):**
- **Custom hooks** — Preferred in modern React
- **Context API** — For global state

---

### 31. What is the difference between a Container and a Presentational component?

**Answer:**

**Presentational Component** — Focuses on **how things look**

```javascript
// Only receives data via props
// Doesn't fetch data or have complex logic
// Easy to reuse
// Easy to test

function RecipeCard({ title, image, ingredients }) {
  return (
    <div className="recipe-card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
      <ul>
        {ingredients.map(ing => <li key={ing}>{ing}</li>)}
      </ul>
    </div>
  );
}

// Usage
<RecipeCard 
  title="Pasta" 
  image="pasta.jpg" 
  ingredients={['flour', 'egg']}
/>
```

**Container Component** — Focuses on **how things work**

```javascript
// Fetches data
// Has logic and state
// Passes data to presentational components
// Handles side effects

function RecipeList() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Fetch recipes from API
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Loading...</p>;
  
  // Pass data to presentational component
  return (
    <div>
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id}
          title={recipe.title}
          image={recipe.image}
          ingredients={recipe.ingredients}
        />
      ))}
    </div>
  );
}
```

**Benefits:**
- **Separation of concerns** — Logic separate from presentation
- **Reusability** — Presentational components can be used in multiple containers
- **Testing** — Easier to test presentational components (just test with different props)
- **Flexibility** — Can change how data is fetched without changing presentation

**Modern alternative:** Custom hooks instead of containers

```javascript
// Instead of container component, use custom hook
function useRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => {
        setRecipes(data);
        setLoading(false);
      });
  }, []);
  
  return { recipes, loading };
}

// Now any component can use the hook
function RecipeList() {
  const { recipes, loading } = useRecipes();
  
  if (loading) return <p>Loading...</p>;
  return recipes.map(recipe => <RecipeCard key={recipe.id} {...recipe} />);
}
```

---

### 32. How do you create a component that renders different elements based on props?

**Answer:**

**1. Using conditional rendering**

```javascript
// If statement
function Card({ type }) {
  if (type === 'success') {
    return <div className="success">Success!</div>;
  }
  if (type === 'error') {
    return <div className="error">Error!</div>;
  }
  return <div className="info">Info</div>;
}
```

**2. Using ternary operator**

```javascript
function Button({ isPrimary }) {
  return (
    <button className={isPrimary ? 'btn-primary' : 'btn-secondary'}>
      Click me
    </button>
  );
}
```

**3. Using logical AND (&&)**

```javascript
function Alert({ showAlert }) {
  return (
    <div>
      {showAlert && <div className="alert">Alert message</div>}
    </div>
  );
}
```

**4. Using switch statement**

```javascript
function Component({ status }) {
  switch(status) {
    case 'loading':
      return <Loading />;
    case 'error':
      return <Error />;
    case 'success':
      return <Success />;
    default:
      return <div>Unknown status</div>;
  }
}
```

**5. Using object mapping (cleaner)**

```javascript
function Component({ type }) {
  const components = {
    'button': <Button />,
    'link': <Link />,
    'text': <Text />
  };
  
  return components[type] || <div>Unknown type</div>;
}
```

**6. Dynamic component rendering**

```javascript
function Component({ componentName, ...props }) {
  // Map component names to actual components
  const componentMap = {
    'home': Home,
    'about': About,
    'contact': Contact
  };
  
  const SelectedComponent = componentMap[componentName];
  
  return SelectedComponent ? <SelectedComponent {...props} /> : null;
}

// Usage
<Component componentName="home" />
<Component componentName="about" />
```

---

### 33. Explain how to implement code-splitting in React

**Answer:**
**Code-splitting** means breaking your bundle into smaller chunks that load on demand, not all upfront.

**1. Route-based code splitting (most common)**

```javascript
// Import lazily
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// How it works:
// 1. Initial bundle contains only App component and Routes
// 2. When user visits /about, About.js is loaded and cached
// 3. Each page loads only when accessed
```

**2. Component-based code splitting**

```javascript
// Lazy load heavy components
const Dashboard = lazy(() => import('./Dashboard'));
const Analytics = lazy(() => import('./Analytics'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Dashboard />
    </Suspense>
  );
}
```

**3. Dynamic imports**

```javascript
// Load component based on condition
function App({ userRole }) {
  const [Component, setComponent] = useState(null);
  
  useEffect(() => {
    if (userRole === 'admin') {
      import('./AdminDashboard').then(mod => setComponent(mod.default));
    } else {
      import('./UserDashboard').then(mod => setComponent(mod.default));
    }
  }, [userRole]);
  
  if (!Component) return <p>Loading...</p>;
  return <Component />;
}
```

**4. Webpack configuration (if not using create-react-app)**

```javascript
// webpack.config.js
module.exports = {
  entry: './index.js',
  output: {
    filename: '[name].js',           // Creates separate file per chunk
    chunkFilename: '[name].[hash].js' // Async chunks
  }
};
```

**Benefits:**
- Smaller initial bundle
- Faster initial page load
- Load code only when needed
- Better performance for large apps

---

### 34. What are React.lazy() and Suspense?

**Answer:**

**React.lazy()** — Code-splits a component (loads asynchronously)

```javascript
// Before (loads immediately)
import Dashboard from './Dashboard';

// After (loads only when rendered)
const Dashboard = React.lazy(() => import('./Dashboard'));
```

**Suspense** — Shows fallback UI while lazy component loads

```javascript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./Dashboard'));

function App() {
  return (
    <Suspense fallback={<p>Loading dashboard...</p>}>
      <Dashboard />
    </Suspense>
  );
}

// Flow:
// 1. Component starts rendering
// 2. Dashboard.js starts downloading
// 3. "Loading dashboard..." shown
// 4. Dashboard.js finished downloading
// 5. Dashboard component rendered
```

**Multiple lazy components with one Suspense:**

```javascript
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));
const Profile = lazy(() => import('./Profile'));

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Dashboard />
      <Settings />
      <Profile />
    </Suspense>
  );
}

// Shows "Loading..." until ALL three components load
```

**Error boundaries with Suspense:**

```javascript
class ErrorBoundary extends React.Component {
  // ... error handling code
}

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<p>Loading...</p>}>
        <Dashboard />
      </Suspense>
    </ErrorBoundary>
  );
}

// If Dashboard fails to load, error boundary catches it
```

---

### 35. What is the component composition pattern?

**Answer:**
**Component composition** means building complex UIs by combining simple components together.

```javascript
// Simple components (building blocks)
function Button({ children, onClick }) {
  return <button onClick={onClick}>{children}</button>;
}

function Input({ value, onChange }) {
  return <input value={value} onChange={onChange} />;
}

// Composed component (combines simple components)
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    console.log(`Login with ${email}/${password}`);
  };
  
  return (
    <div>
      <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}

// Even more complex composition
function App() {
  return (
    <div>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
}
```

**Benefits:**
- **Reusability** — Use Button in many forms
- **Maintainability** — Change Button in one place
- **Testability** — Test small components independently
- **Readability** — Code reads like structure

**Composition patterns:**

**1. Children composition**
```javascript
<Container>
  <Header />
  <Content />
  <Footer />
</Container>
```

**2. Props composition**
```javascript
<Form 
  header={<Header />}
  footer={<Footer />}
/>
```

**3. Component injection**
```javascript
function Layout({ sidebar: Sidebar, content: Content }) {
  return (
    <div>
      <Sidebar />
      <Content />
    </div>
  );
}
```

---

### 36. How do you test React components?

**Answer:**

**1. Unit testing with Jest + React Testing Library**

```javascript
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeInTheDocument();
});
```

**2. Testing props**

```javascript
test('passes onClick prop', () => {
  const handleClick = jest.fn();
  render(<Button onClick={handleClick}>Click</Button>);
  
  const button = screen.getByRole('button');
  fireEvent.click(button);
  
  expect(handleClick).toHaveBeenCalled();
});
```

**3. Testing state**

```javascript
test('increments count on button click', () => {
  render(<Counter />);
  
  const button = screen.getByRole('button');
  expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
  
  fireEvent.click(button);
  expect(screen.getByText(/count: 1/i)).toBeInTheDocument();
});
```

**4. Testing async operations**

```javascript
test('fetches and displays data', async () => {
  render(<UserList />);
  
  const userName = await screen.findByText('John');
  expect(userName).toBeInTheDocument();
});
```

**5. Testing with mocking**

```javascript
jest.mock('./api', () => ({
  fetchUsers: jest.fn(() => Promise.resolve([{ id: 1, name: 'John' }]))
}));

test('displays mocked data', async () => {
  render(<UserList />);
  
  const user = await screen.findByText('John');
  expect(user).toBeInTheDocument();
});
```

---

### 37. What are the advantages of using functional components over class components?

**Answer:**

| Advantage | Functional | Class |
|-----------|-----------|-------|
| **Syntax** | Simple, cleaner | More boilerplate |
| **Hooks** | useState, useEffect, etc. | Must use lifecycle methods |
| **Bundle size** | Smaller | Larger |
| **Easier to test** | Yes | Need more setup |
| **Code reuse** | Custom hooks | HOCs, render props |
| **Performance** | Easier to optimize | Need shouldComponentUpdate |
| **this binding** | No confusion | Must bind methods |
| **State management** | Simpler with useState | More complex |

**Example comparison:**

```javascript
// Class component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  componentDidMount() {
    console.log('Mounted');
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

// Functional component (simpler!)
function Counter() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    console.log('Mounted');
  }, []);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

---

## PROPS

### 38. What are Props in React?

**Answer:**
**Props** (properties) are how you pass data from parent component to child component. They're like function parameters.

```javascript
// Parent
function App() {
  const userName = 'John';
  return <Greeting name={userName} age={30} />;
}

// Child receives props
function Greeting({ name, age }) {
  return <p>Hello, {name}! You are {age} years old.</p>;
}
// Output: Hello, John! You are 30 years old.
```

**Key points:**
- Props are **read-only** (child can't modify them)
- Props flow **one way** (parent to child)
- Props are **immutable**
- Functions receive props as first argument (in class components, access via `this.props`)

---

### 39. How do you pass a value from parent to child?

**Answer:**

```javascript
// Parent component
function Parent() {
  const message = 'Hello from parent!';
  
  return <Child message={message} />;
}

// Child component
function Child({ message }) {
  return <p>{message}</p>;
}

// Child displays: Hello from parent!
```

**Different data types:**

```javascript
// String
<Child name="John" />

// Number
<Child age={30} />

// Boolean
<Child isActive={true} />

// Array
<Child items={[1, 2, 3]} />

// Object
<Child user={{ name: 'John', age: 30 }} />

// Function
<Child onClick={() => console.log('clicked')} />

// JSX
<Child component={<Header />} />
```

---

### 40. How do you pass a value from child to parent?

**Answer:**
Child can't directly change parent's data. Instead, parent passes a **function** to child, and child **calls that function** to notify parent.

```javascript
// Parent
function Parent() {
  const [message, setMessage] = useState('Initial');
  
  const handleChildClick = (newMessage) => {
    setMessage(newMessage); // Parent updates its state
  };
  
  return (
    <div>
      <p>Message: {message}</p>
      <Child onSendMessage={handleChildClick} />
    </div>
  );
}

// Child
function Child({ onSendMessage }) {
  return (
    <button onClick={() => onSendMessage('Message from child!')}>
      Send Message
    </button>
  );
}

// Flow:
// 1. User clicks button in Child
// 2. Child calls onSendMessage('Message from child!')
// 3. Parent's handleChildClick runs with that message
// 4. Parent's state updates
// 5. Parent and Child re-render with new message
```

**Real example:**

```javascript
// Parent
function Form() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  
  return (
    <div>
      <Input 
        label="Name" 
        value={formData.name}
        onChange={(value) => handleInputChange('name', value)}
      />
      <Input 
        label="Email" 
        value={formData.email}
        onChange={(value) => handleInputChange('email', value)}
      />
    </div>
  );
}

// Child
function Input({ label, value, onChange }) {
  return (
    <div>
      <label>{label}</label>
      <input 
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
```

---

### 41. Can a child component modify its own props?

**Answer:**
**No**, child cannot modify props directly. Props are **immutable** and **read-only**.

```javascript
// WRONG — Can't modify props
function Child({ name }) {
  name = 'Jane'; // ERROR in strict mode, but generally a bad idea
  return <p>{name}</p>;
}

// WRONG — Props are passed by reference (objects), but still shouldn't mutate
function Child({ user }) {
  user.name = 'Jane'; // WRONG — Don't mutate object props
  return <p>{user.name}</p>;
}

// RIGHT — Use state to modify locally
function Child({ initialName }) {
  const [name, setName] = useState(initialName);
  
  const handleChangeName = () => {
    setName('Jane'); // Update local state, not prop
  };
  
  return (
    <>
      <p>{name}</p>
      <button onClick={handleChangeName}>Change Name</button>
    </>
  );
}
```

**Why props are immutable:**
- Keeps data flow clear (parent → child)
- Makes debugging easier
- Prevents unexpected side effects
- Makes components predictable

---

### 42. What is prop drilling?

**Answer:**
**Prop drilling** is when you pass props through many intermediate components just to reach a deeply nested component.

```javascript
// Without prop drilling (problem!)
function App() {
  const user = { name: 'John', role: 'admin' };
  
  return <Level1 user={user} />;
}

function Level1({ user }) {
  return <Level2 user={user} />; // Pass through
}

function Level2({ user }) {
  return <Level3 user={user} />; // Pass through
}

function Level3({ user }) {
  return <Level4 user={user} />; // Pass through
}

function Level4({ user }) {
  return <p>{user.name}</p>; // Finally use it!
}

// Level1, Level2, Level3 don't need 'user', just pass it through
```

**Solutions:**

**1. Context API (best for simple cases)**
```javascript
const UserContext = React.createContext();

function App() {
  const user = { name: 'John', role: 'admin' };
  
  return (
    <UserContext.Provider value={user}>
      <Level1 />
    </UserContext.Provider>
  );
}

// Skip Level2 and Level3
function Level4() {
  const user = useContext(UserContext); // Get directly
  return <p>{user.name}</p>;
}
```

**2. State management (Redux/Zustand)**
```javascript
// Global state accessible everywhere
const user = useSelector(state => state.user);
```

**3. Component composition**
```javascript
function App() {
  const user = { name: 'John', role: 'admin' };
  
  // Pass children directly instead of props
  return <Level1><UserDisplay user={user} /></Level1>;
}

function Level1({ children }) {
  return <Level2>{children}</Level2>;
}

function Level2({ children }) {
  return <Level3>{children}</Level3>;
}

function Level3({ children }) {
  return {children};
}
```

---

### 43. What are children props?

**Answer:**
**Children** is a special prop that contains everything between opening and closing tags of a component.

```javascript
// children prop
<Button>Click me</Button>
// children = "Click me"

<Card>
  <h1>Title</h1>
  <p>Description</p>
</Card>
// children = [<h1>, <p>]

<Container>
  <Header />
  <Content />
  <Footer />
</Container>
// children = [<Header />, <Content />, <Footer />]
```

**Using children:**

```javascript
function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>
      {children} {/* Renders "Click me" */}
    </button>
  );
}

function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="content">
        {children} {/* Renders <h1> and <p> */}
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div className="layout">
      <Sidebar />
      <main>
        {children} {/* Renders <Header />, <Content />, <Footer /> */}
      </main>
    </div>
  );
}
```

---

### 44. Why do you need to use props.children?

**Answer:**
`props.children` allows you to create **flexible, reusable components** that can wrap any content.

```javascript
// Without children (rigid)
function Modal() {
  return (
    <div className="modal">
      <h1>Hardcoded Title</h1>
      <p>Hardcoded message</p>
    </div>
  );
}

// With children (flexible!)
function Modal({ children, title }) {
  return (
    <div className="modal">
      <h1>{title}</h1>
      {children} // Can be anything!
    </div>
  );
}

// Usage 1
<Modal title="Confirm">
  <p>Are you sure?</p>
  <Button>Yes</Button>
</Modal>

// Usage 2
<Modal title="Welcome">
  <img src="avatar.jpg" />
  <p>Hello, user!</p>
</Modal>

// Same component, different content!
```

**Benefits:**
1. **Flexibility** — Component works with any content
2. **Composition** — Build complex UIs from simple components
3. **Reusability** — One Modal component used everywhere
4. **Cleaner code** — Pass JSX directly instead of props

---

### 45. What is the use of the prop-types library?

**Answer:**
**PropTypes** validates that props passed to a component are the correct type and required.

```javascript
import PropTypes from 'prop-types';

function Greeting({ name, age, email }) {
  return (
    <div>
      <h1>Hello, {name}</h1>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </div>
  );
}

// Define prop types
Greeting.propTypes = {
  name: PropTypes.string.isRequired,      // Must be string, required
  age: PropTypes.number,                   // Must be number, optional
  email: PropTypes.string.isRequired       // Must be string, required
};

// Valid usage
<Greeting name="John" age={30} email="john@example.com" /> // OK

// Invalid usage
<Greeting name="John" age="thirty" email="john@example.com" /> // Warning: age should be number
<Greeting name="John" age={30} /> // Warning: email is required
```

**Common PropTypes:**

```javascript
PropTypes.string        // String
PropTypes.number        // Number
PropTypes.boolean       // Boolean
PropTypes.func          // Function
PropTypes.array         // Array
PropTypes.object        // Object
PropTypes.arrayOf(PropTypes.string) // Array of strings
PropTypes.objectOf(PropTypes.number) // Object with numbers
PropTypes.shape({       // Object with specific shape
  name: PropTypes.string,
  age: PropTypes.number
})
PropTypes.oneOf(['small', 'medium', 'large']) // One of values
PropTypes.instanceOf(Date) // Instance of Date
PropTypes.node          // Any renderable content
PropTypes.element       // React element
```

**Note:** PropTypes is mainly for development. In production, use TypeScript instead.

```javascript
// Modern approach: TypeScript
interface GreetingProps {
  name: string;
  age: number;
  email: string;
}

function Greeting({ name, age, email }: GreetingProps) {
  // TypeScript checks types before runtime
}
```

---

### 46. How do you handle prop validation in React?

**Answer:**

**1. PropTypes (JavaScript)**
```javascript
import PropTypes from 'prop-types';

function User({ name, age, email }) {
  return <div>{name} - {age}</div>;
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string
};
```

**2. TypeScript (Type-safe)**
```typescript
interface UserProps {
  name: string;
  age: number;
  email?: string; // Optional
}

function User({ name, age, email }: UserProps) {
  return <div>{name} - {age}</div>;
}
```

**3. Default props**
```javascript
// PropTypes way
User.defaultProps = {
  age: 0,
  email: 'unknown@example.com'
};

// Functional component way
function User({ name, age = 0, email = 'unknown@example.com' }) {
  return <div>{name} - {age}</div>;
}
```

**4. Custom validation**
```javascript
User.propTypes = {
  age: (props, propName, componentName) => {
    if (props[propName] && props[propName] < 0) {
      return new Error(`Invalid prop ${propName} of value ${props[propName]} supplied to ${componentName}`);
    }
  }
};
```

---

### 47. How would you implement default props?

**Answer:**

**1. Class component way**
```javascript
class User extends React.Component {
  render() {
    return <p>{this.props.name}, {this.props.age}</p>;
  }
}

User.defaultProps = {
  name: 'Guest',
  age: 18
};

// Usage without props
<User /> // Shows: Guest, 18
```

**2. Functional component with destructuring**
```javascript
function User({ name = 'Guest', age = 18 }) {
  return <p>{name}, {age}</p>;
}

// Usage
<User /> // Shows: Guest, 18
<User name="John" /> // Shows: John, 18
```

**3. Using object.assign (avoid)**
```javascript
function User(props) {
  const defaultProps = { name: 'Guest', age: 18 };
  const finalProps = Object.assign(defaultProps, props);
  return <p>{finalProps.name}, {finalProps.age}</p>;
}
```

**Best practice:** Use destructuring with defaults

```javascript
// Good
function User({ name = 'Guest', age = 18 } = {}) {
  return <p>{name}, {age}</p>;
}

// Excellent (with TypeScript)
interface UserProps {
  name?: string;
  age?: number;
}

function User({ name = 'Guest', age = 18 }: UserProps) {
  return <p>{name}, {age}</p>;
}
```

---

### 48. What are the alternatives to prop drilling?

**Answer:**

**1. Context API**
```javascript
const ThemeContext = React.createContext();

function App() {
  const theme = { primary: 'blue', secondary: 'gray' };
  
  return (
    <ThemeContext.Provider value={theme}>
      <Component />
    </ThemeContext.Provider>
  );
}

// Access anywhere
function DeepComponent() {
  const theme = useContext(ThemeContext);
  return <button style={{ color: theme.primary }}>Click</button>;
}
```

**2. Redux (state management)**
```javascript
// Global state accessible everywhere
import { useSelector } from 'react-redux';

function Component() {
  const theme = useSelector(state => state.theme);
  return <div style={{ color: theme.primary }}>Content</div>;
}
```

**3. Custom Hooks**
```javascript
// Extract reusable logic
function useTheme() {
  return useContext(ThemeContext);
}

function Component() {
  const theme = useTheme(); // Use anywhere
  return <div style={{ color: theme.primary }}>Content</div>;
}
```

**4. Component composition**
```javascript
// Pass components as props instead of data
<Container
  sidebar={<Sidebar />}
  main={<MainContent />}
  footer={<Footer />}
/>
```

**5. Render props / Higher-Order Components**
```javascript
// HOC
const withTheme = (Component) => (props) => (
  <ThemeContext.Consumer>
    {theme => <Component {...props} theme={theme} />}
  </ThemeContext.Consumer>
);
```

---

### 49. How do you handle conditional rendering based on props?

**Answer:**

**1. Ternary operator**
```javascript
function Button({ isDisabled }) {
  return (
    <button disabled={isDisabled}>
      {isDisabled ? 'Disabled' : 'Click me'}
    </button>
  );
}
```

**2. Logical AND (&&)**
```javascript
function Alert({ showAlert, message }) {
  return (
    <div>
      {showAlert && <div className="alert">{message}</div>}
    </div>
  );
}
```

**3. If statement**
```javascript
function Component({ status }) {
  if (status === 'loading') return <p>Loading...</p>;
  if (status === 'error') return <p>Error!</p>;
  return <p>Content loaded</p>;
}
```

**4. Switch statement**
```javascript
function Component({ type }) {
  switch(type) {
    case 'success':
      return <SuccessComponent />;
    case 'error':
      return <ErrorComponent />;
    default:
      return <DefaultComponent />;
  }
}
```

**5. Object mapping**
```javascript
function Component({ role }) {
  const components = {
    'admin': <AdminPanel />,
    'user': <UserDashboard />,
    'guest': <GuestView />
  };
  
  return components[role] || <NotFound />;
}
```

---

### 50. How can you spread props in JSX?

**Answer:**
**Spread operator (`...`)** passes all props from an object to a component.

```javascript
// Manually passing each prop (tedious)
<Button color="blue" size="large" disabled={false} onClick={handleClick}>
  Click me
</Button>

// Using spread (clean)
const props = { color: 'blue', size: 'large', disabled: false, onClick: handleClick };
<Button {...props}>Click me</Button>

// Same result, less code!
```

**Common use cases:**

**1. Passing through props**
```javascript
function Card({ title, ...rest }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <Content {...rest} /> // Pass remaining props to Content
    </div>
  );
}
```

**2. Merging props**
```javascript
const baseProps = { color: 'blue', size: 'large' };
const extraProps = { disabled: true, onClick: handleClick };

<Button {...baseProps} {...extraProps} />
// Same as: <Button color="blue" size="large" disabled={true} onClick={handleClick} />
```

**3. Overriding props**
```javascript
const defaultProps = { color: 'blue', size: 'large' };
const userProps = { color: 'red' }; // Override color

// Later props override earlier
<Button {...defaultProps} {...userProps} />
// color will be 'red' (overridden), size will be 'large'
```

**4. Adding props**
```javascript
<Button {...props} disabled={true} />
// All original props plus disabled=true
```

---

### 51. How do you handle required props?

**Answer:**

**1. PropTypes**
```javascript
import PropTypes from 'prop-types';

function User({ name, email }) {
  return <p>{name} - {email}</p>;
}

User.propTypes = {
  name: PropTypes.string.isRequired,   // Required
  email: PropTypes.string.isRequired   // Required
};

// Will warn if missing
<User name="John" /> // Warning: email is required
```

**2. TypeScript**
```typescript
interface UserProps {
  name: string;        // Required
  email: string;       // Required
  age?: number;        // Optional (?)
}

function User({ name, email, age }: UserProps) {
  return <p>{name} - {email}</p>;
}

// Type error if missing
<User name="John" /> // Error: email is required
```

**3. Default validation**
```javascript
function User({ name, email }) {
  if (!name || !email) {
    throw new Error('name and email are required');
  }
  return <p>{name} - {email}</p>;
}
```

**Best practice:** Use TypeScript for required props

```typescript
// TypeScript enforces at compile time
interface UserProps {
  name: string;      // Required
  email: string;     // Required
  phone?: string;    // Optional
}

function User({ name, email, phone }: UserProps) {
  return <p>{name} - {email}</p>;
}
```

---

### 52. What is the difference between props and attributes?

**Answer:**

**Attributes** — HTML standard properties

```html
<!-- HTML attributes -->
<div class="container" id="main" data-id="123">
  <input type="text" placeholder="Enter name" />
</div>
```

**Props** — React-specific, passed to components

```javascript
// React props
<Button color="blue" size="large" onClick={handleClick}>
  Click me
</Button>

// Props are passed to component function
function Button({ color, size, onClick, children }) {
  // ...
}
```

**Key differences:**

| Attributes | Props |
|-----------|-------|
| HTML standard | React-specific |
| Static (mostly) | Dynamic (can change) |
| In DOM | In JavaScript |
| Lowercase (usually) | camelCase |
| `class` | `className` |
| `for` | `htmlFor` |

**Mapping attributes to props:**

```javascript
// HTML attribute
<label for="email">Email</label>

// React prop
<label htmlFor="email">Email</label>

// HTML attribute
<div class="container">Content</div>

// React prop
<div className="container">Content</div>

// HTML attribute  
<button data-id="123">Click</button>

// React prop
<button data-id="123">Click</button> // data-* attributes work as-is
```

**Custom data attributes (work in React):**
```javascript
<div data-test-id="user-card" data-name="John">
  Content
</div>

// Access in code
element.dataset.testId  // "user-card"
element.dataset.name    // "John"
```

---

## STATE

### 53. What is React State?

**Answer:**
**State** is data that changes over time and affects how a component renders. Unlike props (immutable), state can be updated.

```javascript
function Counter() {
  const [count, setCount] = useState(0); // State
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// Click button → count increases → component re-renders
```

**State vs Props:**

| State | Props |
|-------|-------|
| Internal to component | Passed from parent |
| Can be updated | Read-only |
| Causes re-render when changed | Causes re-render if changed |
| Managed by component | Managed by parent |
| Private to component | Accessible to child |

---

### 54. What is the difference between props and state?

**Answer:**

**Props:**
- Data FROM parent TO child
- Read-only (immutable)
- Passed as arguments to component
- Cannot be changed by child

**State:**
- Data WITHIN component
- Mutable (can be changed)
- Declared inside component
- Causes re-render when changed

```javascript
function ParentComponent() {
  const [sharedData, setSharedData] = useState('Initial');
  
  return (
    <ChildComponent data={sharedData} />
    // 'data' is a PROP to ChildComponent
  );
}

function ChildComponent({ data }) {
  // 'data' is a read-only prop
  // Can't do: data = 'New value' (wrong!)
  
  const [localState, setLocalState] = useState('Local');
  // 'localState' is STATE, only ChildComponent can change it
  
  return (
    <div>
      <p>Prop: {data}</p>
      <p>State: {localState}</p>
    </div>
  );
}
```

---

### 55. How does state in a class component differ from state in a functional component?

**Answer:**

**Class Component State:**
```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 }; // Initialize in constructor
  }
  
  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}
```

**Functional Component State:**
```javascript
function Counter() {
  const [count, setCount] = useState(0); // Initialize with hook
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

**Differences:**

| Class Component | Functional Component |
|-----------------|---------------------|
| `this.state` object | Separate useState for each piece |
| `this.setState()` to update | Setter function to update |
| State is merged on update | State is replaced on update |
| Single state object | Multiple state variables |
| Lifecycle methods | useEffect hook |
| More boilerplate | Less boilerplate |

**Code comparison:**

```javascript
// Class: Multiple properties in one state object
this.state = {
  count: 0,
  name: 'John',
  isLoading: false
};

this.setState({ count: 1 }); // Merges with existing state

// Functional: Separate state variables
const [count, setCount] = useState(0);
const [name, setName] = useState('John');
const [isLoading, setIsLoading] = useState(false);

setCount(1); // Replaces only count
```

---

### 56. How can you update state in React?

**Answer:**

**1. useState hook (functional)**
```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // Update state
  const increment = () => {
    setCount(count + 1); // Set to new value
  };
  
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </>
  );
}
```

**2. setState (class component)**
```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };
  
  render() {
    return (
      <>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </>
    );
  }
}
```

**3. Updating based on previous state**
```javascript
// BAD — might use stale state
setCount(count + 1);

// GOOD — always uses latest state
setCount(previousCount => previousCount + 1);

// Class component
this.setState(previousState => ({
  count: previousState.count + 1
}));
```

**4. Updating object state**
```javascript
const [user, setUser] = useState({ name: 'John', age: 30 });

// Update name (create new object!)
setUser({ ...user, name: 'Jane' });

// Bad: mutating original
user.name = 'Jane'; // Don't do this!
setUser(user);
```

**5. Updating array state**
```javascript
const [items, setItems] = useState(['A', 'B', 'C']);

// Add item
setItems([...items, 'D']);

// Remove item
setItems(items.filter(item => item !== 'B'));

// Update item
setItems(items.map(item => item === 'A' ? 'Updated A' : item));

// Bad: mutating original
items.push('D'); // Don't do this!
```

---

### 57. What is the difference between getInitialState() and constructor()?

**Answer:**

**getInitialState() (Old way, deprecated)**
```javascript
// Old class component syntax
var Counter = React.createClass({
  getInitialState: function() {
    return { count: 0 };
  },
  
  render: function() {
    return <p>{this.state.count}</p>;
  }
});
```

**constructor() (Modern way)**
```javascript
// Modern class component
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  render() {
    return <p>{this.state.count}</p>;
  }
}
```

**Differences:**

| getInitialState | constructor |
|-----------------|-------------|
| Used with React.createClass | Used with ES6 classes |
| Deprecated | Modern standard |
| No super() needed | Must call super(props) |
| Shorter syntax | More verbose |
| Bound 'this' automatically | Must bind methods |

**Modern way (functional):**
```javascript
function Counter() {
  const [count, setCount] = useState(0); // Initialize state with hook
  
  return <p>{count}</p>;
}
```

---

### 58. What kind of information controls a component in React?

**Answer:**
Two types of information control a component:

**1. Props**
```javascript
// External data from parent
<User name="John" age={30} isAdmin={true} />

function User({ name, age, isAdmin }) {
  return <p>{name} - {age} - {isAdmin ? 'Admin' : 'User'}</p>;
}
```

**2. State**
```javascript
// Internal data managed by component
function Counter() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  
  return (
    <>
      {isVisible && <p>Count: {count}</p>}
      <button onClick={() => setCount(count + 1)}>+</button>
      <button onClick={() => setIsVisible(!isVisible)}>Toggle</button>
    </>
  );
}
```

**Decision tree:**
```
Does multiple components need this data?
├─ YES → Share with context/Redux or lift state up
└─ NO → Keep as state in one component

Does parent component need this data?
├─ YES → Lift state up to parent, pass as prop
└─ NO → Keep as state in current component

Will this data change?
├─ YES → Use state
└─ NO → Can be constant or prop
```

---

### 59. What happens when you update state directly instead of using setState()?

**Answer:**
**Don't update state directly** — always use `setState()` or state setters.

```javascript
// WRONG — Direct mutation (don't do!)
this.state.count = 1; // Object is mutated
// Component won't re-render!

// RIGHT — Using setState
this.setState({ count: 1 }); // Component re-renders

// WRONG — Direct mutation in functional component
count = 1; // Can't even do this, const is immutable
// But for objects:
user.name = 'Jane'; // Object is mutated
// Component won't re-render!

// RIGHT — Using setter
setCount(1);
setUser({ ...user, name: 'Jane' });
```

**Why direct mutation is bad:**

```javascript
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  
  // WRONG
  badIncrement = () => {
    this.state.count++; // Mutates state directly
    // React doesn't know state changed!
    // Component won't re-render!
    // Console.log will show updated count, but UI doesn't update
  };
  
  // RIGHT
  goodIncrement = () => {
    this.setState({ count: this.state.count + 1 });
    // React knows state changed
    // Triggers re-render
    // UI updates automatically
  };
  
  render() {
    return (
      <>
        <p>Count: {this.state.count}</p>
        <button onClick={this.goodIncrement}>Good Increment</button>
        <button onClick={this.badIncrement}>Bad Increment</button>
      </>
    );
  }
}
```

**Why it matters:**
- React won't know state changed
- Component won't re-render
- UI will be out of sync with actual data
- Bugs and unpredictable behavior

**Rule:** Always create new objects/arrays when updating state

```javascript
// Wrong
state.items[0] = 'Updated';
setState(state);

// Right
const newItems = [...state.items];
newItems[0] = 'Updated';
setState(newItems);

// Or better
setState({ items: state.items.map((item, i) => i === 0 ? 'Updated' : item) });
```

---

### 60. How do you update state that depends on the previous state?

**Answer:**
Use the **functional form** of setState to access previous state.

```javascript
// Class component
// WRONG — count might be stale
this.setState({ count: this.state.count + 1 });
this.setState({ count: this.state.count + 1 });
// Result: count increases by 1, not 2 (second setState sees first's old value)

// RIGHT — Callback form always gets latest state
this.setState(previousState => ({
  count: previousState.count + 1
}));
this.setState(previousState => ({
  count: previousState.count + 1
}));
// Result: count increases by 2 (each sees previous result)
```

**Functional component:**
```javascript
// WRONG — count might be stale
setCount(count + 1);
setCount(count + 1);
// Result: count increases by 1

// RIGHT — Callback form always gets latest
setCount(previousCount => previousCount + 1);
setCount(previousCount => previousCount + 1);
// Result: count increases by 2
```

**Real example:**

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  const incrementTwice = () => {
    // WRONG
    setCount(count + 1); // Uses current count
    setCount(count + 1); // Still uses old count, increments by 1 total
    
    // RIGHT
    setCount(c => c + 1); // Uses updated value
    setCount(c => c + 1); // Uses updated value from above, increments by 2 total
  };
  
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={incrementTwice}>Increment Twice</button>
    </>
  );
}
```

---

### 61. What is the second argument to setState function?

**Answer:**
The second argument to `setState()` is a **callback** that runs after state is updated and component re-renders.

```javascript
// Class component
this.setState(
  { count: 1 },          // State update
  () => {                 // Callback (optional)
    console.log('State updated!', this.state.count);
  }
);

// Callback runs AFTER re-render
```

**Use cases:**

```javascript
// Case 1: Confirm state was updated
this.setState({ count: count + 1 }, () => {
  console.log('Count is now:', this.state.count);
});

// Case 2: Trigger action after state update
this.setState({ user: newUser }, () => {
  this.saveUserToDatabase(); // Only run after state updates
});

// Case 3: Analytics
this.setState({ page: 'checkout' }, () => {
  trackPageView('checkout'); // Track after state actually changes
});
```

**Functional component equivalent:**

```javascript
// useEffect runs after render (when dependencies change)
const [count, setCount] = useState(0);

useEffect(() => {
  console.log('Count updated:', count);
}, [count]); // Runs when count changes

// Or using useEffect for side effects after state
const handleClick = () => {
  setCount(count + 1);
  // State updates asynchronously
  // Can't access updated count here
};

useEffect(() => {
  // Runs after state updates and component re-renders
  console.log('State updated, count is:', count);
}, [count]);
```

---

### 62. What is state lifting in React?

**Answer:**
**State lifting** is moving state up from a child component to a parent component to share it between siblings.

```javascript
// Problem: Two sibling components need to share state
function App() {
  return (
    <>
      <Temperature /> {/* Has local state */}
      <FahrenheitDisplay /> {/* Can't access Temperature's state */}
    </>
  );
}

// Solution: Lift state to parent
function App() {
  const [celsius, setCelsius] = useState(0);
  
  // Pass state and setter to both children
  return (
    <>
      <TemperatureInput value={celsius} onChange={setCelsius} />
      <TemperatureDisplay value={celsius} />
      <FahrenheitDisplay value={celsius * 9/5 + 32} />
    </>
  );
}

function TemperatureInput({ value, onChange }) {
  return (
    <input 
      value={value} 
      onChange={(e) => onChange(parseFloat(e.target.value))}
    />
  );
}

function TemperatureDisplay({ value }) {
  return <p>Celsius: {value}</p>;
}

function FahrenheitDisplay({ value }) {
  return <p>Fahrenheit: {value}</p>;
}
```

**Before lifting (bad):**
```
App
├── Temperature (has state: celsius)
│   └── Inputs (can't access celsius)
└── Display (can't access celsius from Temperature)
```

**After lifting (good):**
```
App (has state: celsius)
├── TemperatureInput (receives celsius as prop)
└── Display (receives celsius as prop)
```

---

### 63. How do you share state between components?

**Answer:**

**1. Lift state to common parent**
```javascript
function Parent() {
  const [name, setName] = useState('');
  
  return (
    <>
      <Child1 name={name} setName={setName} />
      <Child2 name={name} />
    </>
  );
}

function Child1({ name, setName }) {
  return <input value={name} onChange={e => setName(e.target.value)} />;
}

function Child2({ name }) {
  return <p>Hello, {name}</p>;
}
```

**2. Context API (multiple levels)**
```javascript
const NameContext = React.createContext();

function App() {
  const [name, setName] = useState('');
  
  return (
    <NameContext.Provider value={{ name, setName }}>
      <Component1 />
      <Component2 />
    </NameContext.Provider>
  );
}

function DeepChild() {
  const { name, setName } = useContext(NameContext);
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

**3. Redux (global state)**
```javascript
// Store
const store = Redux.createStore(reducer);

function App() {
  return (
    <Provider store={store}>
      <Component1 />
      <Component2 />
    </Provider>
  );
}

// Any component can access
function Component1() {
  const name = useSelector(state => state.name);
  const dispatch = useDispatch();
  
  return <input onChange={e => dispatch(setName(e.target.value))} />;
}
```

---

### 64. What are controlled vs uncontrolled components?

**Answer:**

**Controlled Component** — React state controls the input value

```javascript
function ControlledForm() {
  const [email, setEmail] = useState('');
  
  return (
    <>
      <input 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>Email: {email}</p>
    </>
  );
}

// React controls the input value
// onChange updates state → re-render → input shows new value
```

**Uncontrolled Component** — DOM controls the input value

```javascript
function UncontrolledForm() {
  const emailRef = useRef(null);
  
  const handleSubmit = () => {
    const email = emailRef.current.value; // Get value directly from DOM
    console.log('Submitted:', email);
  };
  
  return (
    <>
      <input ref={emailRef} />
      <button onClick={handleSubmit}>Submit</button>
    </>
  );
}

// Input manages its own value in DOM
// Get value when needed (on form submit)
```

**Comparison:**

| Controlled | Uncontrolled |
|-----------|-------------|
| React controls value | DOM controls value |
| value prop | ref to access |
| onChange handler | Get on demand |
| State updates on input | No state updates |
| Real-time validation | Validation on submit |
| More code | Less code |

**When to use:**

- **Controlled:** Form validation, real-time feedback, complex forms
- **Uncontrolled:** File inputs, simple forms, integration with non-React code

---

### 65. How do you initialize state in a functional component?

**Answer:**

**1. Simple initialization**
```javascript
const [count, setCount] = useState(0); // Initialize to 0
const [name, setName] = useState('John'); // Initialize to 'John'
const [isVisible, setIsVisible] = useState(true); // Initialize to true
```

**2. With initial state function**
```javascript
// For complex initialization (runs only on first render)
const [state, setState] = useState(() => {
  console.log('Running expensive initialization');
  return { count: 0, name: 'John' };
});

// Function runs only once on mount
```

**3. Multiple state variables**
```javascript
function Form() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  return (
    <>
      <input name="name" value={formData.name} onChange={handleChange} />
      <input name="email" value={formData.email} onChange={handleChange} />
    </>
  );
}
```

---

### 66. What is the useState hook and how does it work?

**Answer:**
**useState** is a hook that lets functional components have state.

```javascript
const [value, setValue] = useState(initialValue);
```

**Syntax:**
- `value` — Current state value
- `setValue` — Function to update state
- `initialValue` — Initial state value

**How it works:**

```javascript
function Counter() {
  const [count, setCount] = useState(0);
  
  // First time: count = 0
  // After click: count = 1
  // After click: count = 2
  
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </>
  );
}
```

**Multiple state variables:**

```javascript
function User() {
  const [name, setName] = useState('John');
  const [age, setAge] = useState(30);
  const [email, setEmail] = useState('john@example.com');
  
  // Each has its own state
  return (
    <>
      <p>Name: {name}</p>
      <p>Age: {age}</p>
      <p>Email: {email}</p>
    </>
  );
}
```

**Key rules:**
- Only call hooks at top level (not in loops/conditions)
- Only call hooks in React functions
- Don't call hooks conditionally

---

### 67. How do you implement global state management without Redux?

**Answer:**

**1. Context API**
```javascript
// Create context
const AppContext = React.createContext();

// Provider component
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Use in any component
function MyComponent() {
  const { state, dispatch } = useContext(AppContext);
  
  return (
    <>
      <p>User: {state.user.name}</p>
      <button onClick={() => dispatch({ type: 'SET_USER', payload: 'Jane' })}>
        Set Name
      </button>
    </>
  );
}

// In App.js
<AppProvider>
  <MyComponent />
</AppProvider>
```

**2. Custom hooks**
```javascript
// Centralized state logic
function useAppState() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const login = async (credentials) => {
    setLoading(true);
    const user = await api.login(credentials);
    setUser(user);
    setLoading(false);
  };
  
  return { user, loading, login };
}

// Use in any component
function LoginComponent() {
  const { user, loading, login } = useAppState();
  
  return (
    <button onClick={() => login(credentials)} disabled={loading}>
      {loading ? 'Logging in...' : 'Login'}
    </button>
  );
}
```

**3. Zustand (lightweight state library)**
```javascript
import create from 'zustand';

const useStore = create(set => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null })
}));

// Use anywhere
function Component() {
  const { user, setUser, logout } = useStore();
  return <p>{user.name}</p>;
}
```

**4. Jotai (Atomic state)**
```javascript
import { atom, useAtom } from 'jotai';

const userAtom = atom(null);

function Component() {
  const [user, setUser] = useAtom(userAtom);
  return <p>{user?.name}</p>;
}
```

---

## LIFECYCLE AND EFFECTS

### 68. What is the component lifecycle?

**Answer:**
**Component lifecycle** is the series of methods/phases a component goes through from creation to removal.

```
Lifecycle phases:

1. MOUNTING (component created)
   ├── constructor() runs
   ├── render() runs
   └── componentDidMount() runs (only once, after first render)

2. UPDATING (props/state change)
   ├── shouldComponentUpdate() checks if should update
   ├── render() runs again
   └── componentDidUpdate() runs after each update

3. UNMOUNTING (component removed)
   └── componentWillUnmount() runs before removal
```

**Visual timeline:**

```
Component created
    ↓
    constructor() initialize state
    ↓
    render() return JSX
    ↓
    componentDidMount() first render complete
    ↓
    [Wait for prop/state change]
    ↓
    shouldComponentUpdate() check if should update
    ↓
    render() return updated JSX
    ↓
    componentDidUpdate() update complete
    ↓
    [Wait for prop/state change] (repeat from shouldComponentUpdate)
    ↓
    [Component removed]
    ↓
    componentWillUnmount() cleanup before removal
    ↓
    Component destroyed
```

---

### 69. What are the lifecycle methods in React?

**Answer:**

**Mounting (component being created):**

```javascript
class Component extends React.Component {
  constructor(props) {
    super(props);
    // Initialize state
    this.state = {};
  }
  
  render() {
    // Return JSX to display
    return <div>Hello</div>;
  }
  
  componentDidMount() {
    // Runs after first render
    // Fetch data, set timers, subscribe
  }
}
```

**Updating (props/state change):**

```javascript
class Component extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Return true to update, false to skip
    return nextProps !== this.props;
  }
  
  componentDidUpdate(prevProps, prevState) {
    // Runs after re-render
    // Compare prev vs current props/state
  }
}
```

**Unmounting (component removed):**

```javascript
class Component extends React.Component {
  componentWillUnmount() {
    // Cleanup before removal
    // Cancel timers, unsubscribe, save data
  }
}
```

**Error Handling:**

```javascript
class Component extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Handle errors
  }
  
  static getDerivedStateFromError(error) {
    // Update state before render
  }
}
```

---

### 70. How do you update lifecycle in functional components?

**Answer:**
Use **useEffect** hook instead of lifecycle methods.

**Comparison:**

| Class Lifecycle | useEffect |
|-----------------|-----------|
| componentDidMount | useEffect(() => {}, []) |
| componentDidUpdate | useEffect(() => {}, [dependency]) |
| componentWillUnmount | useEffect(() => { return cleanup }, []) |

**useEffect examples:**

```javascript
function Component() {
  const [count, setCount] = useState(0);

  // Mounting (runs once)
  useEffect(() => {
    console.log('Component mounted');
  }, []); // Empty dependencies

  // Updating (runs when count changes)
  useEffect(() => {
    console.log('Count updated:', count);
  }, [count]); // Depends on count

  // Cleanup (runs before unmount)
  useEffect(() => {
    return () => {
      console.log('Component unmounting');
    };
  }, []);

  return <p>Count: {count}</p>;
}
```

---

### 71. What is ComponentWillMount()?

**Answer:**
**componentWillMount()** (old, deprecated) runs before the component mounts.

```javascript
// Old way (deprecated)
class Component extends React.Component {
  componentWillMount() {
    console.log('About to mount');
  }
  
  render() {
    return <div>Hello</div>;
  }
}

// Modern replacement
function Component() {
  useEffect(() => {
    return () => {
      console.log('About to mount');
    };
  }, []);
  
  return <div>Hello</div>;
}
```

**Why deprecated:**
- Can't guarantee it runs (async rendering)
- Confusing timing
- Usually better alternatives

---

### 72. Explain the meaning of Mounting and Demounting

**Answer:**

**Mounting** — Component is being created and inserted into DOM

```javascript
class Component extends React.Component {
  constructor(props) { // 1. Constructor runs
    super(props);
  }
  
  render() { // 2. Render runs
    return <div>Hello</div>;
  }
  
  componentDidMount() { // 3. componentDidMount runs
    console.log('Component mounted!'); // Now in DOM
  }
}
```

**Demounting** — Component is being removed from DOM

```javascript
class Component extends React.Component {
  componentWillUnmount() { // Runs before removal
    console.log('Component will unmount!');
    // Cleanup code
  }
}
```

**Timeline:**

```
Mounting:
Start → Constructor → Render → componentDidMount → [In DOM]

Demounting:
[In DOM] → componentWillUnmount → Removed from DOM
```

---

### 73. What is the replacement for componentWillReceiveProps()?

**Answer:**
**componentWillReceiveProps()** was deprecated. Replacements:

**1. componentDidUpdate (most common)**
```javascript
class Component extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    // Compare prevProps with this.props
    if (prevProps.userId !== this.props.userId) {
      this.loadUser(this.props.userId);
    }
  }
}
```

**2. Static getDerivedStateFromProps (less common)**
```javascript
class Component extends React.Component {
  static getDerivedStateFromProps(props, state) {
    // Return new state based on props
    if (props.userId !== state.userId) {
      return { userId: props.userId };
    }
    return null;
  }
  
  render() {
    return <div>{this.state.userId}</div>;
  }
}
```

**3. useEffect in functional components (best)**
```javascript
function Component({ userId }) {
  useEffect(() => {
    loadUser(userId);
  }, [userId]); // Re-run when userId changes
  
  return <div>User: {userId}</div>;
}
```

---

### 74. What is the purpose of shouldComponentUpdate()?

**Answer:**
**shouldComponentUpdate()** prevents unnecessary re-renders for performance optimization.

```javascript
class Component extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Return true to update, false to skip
    
    if (nextProps.count === this.props.count) {
      return false; // Skip re-render, props didn't change
    }
    return true; // Re-render, props changed
  }
  
  render() {
    return <p>Count: {this.props.count}</p>;
  }
}
```

**Example:**

```javascript
class Counter extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate called');
    console.log('Next:', nextProps.count, 'Current:', this.props.count);
    
    // Only update if count actually changed
    return nextProps.count !== this.props.count;
  }
  
  render() {
    console.log('Rendering with count:', this.props.count);
    return <p>{this.props.count}</p>;
  }
}

// Parent changes other prop
<Counter count={0} name="John" />
// shouldComponentUpdate runs: count same? true, re-render anyway

<Counter count={0} name="Jane" /> // name changed
// shouldComponentUpdate runs: count same? false, skip re-render
```

**Functional equivalent:**

```javascript
// React.memo for props comparison
const Component = React.memo(({ count }) => {
  return <p>{count}</p>;
});

// useMemo for complex logic
function Component({ count, data }) {
  return useMemo(() => (
    <p>{count}</p>
  ), [count]); // Only recalculate if count changes
}
```

---

### 75. How do useEffect and componentDidMount differ?

**Answer:**

**componentDidMount** (class, runs after first render)
```javascript
class Component extends React.Component {
  componentDidMount() {
    console.log('Mounted');
    // Fetch data, set timers
  }
  
  render() {
    return <div>Hello</div>;
  }
}

// Runs exactly once, after first render
```

**useEffect with empty dependencies** (functional, equivalent)
```javascript
function Component() {
  useEffect(() => {
    console.log('Mounted');
    // Fetch data, set timers
  }, []); // Empty dependency array
  
  return <div>Hello</div>;
}

// Runs once after first render
```

**Key difference: useEffect runs AFTER render and paint**

```javascript
// componentDidMount
// 1. Render (JSX prepared)
// 2. componentDidMount (can schedule state updates)
// 3. Re-render if state updated

// useEffect
// 1. Render (JSX prepared)
// 2. Paint to screen (user sees it)
// 3. useEffect (runs after screen updated)
```

**useEffect timing:**

```javascript
function Component() {
  useEffect(() => {
    // Runs after render and DOM update
    console.log('DOM is visible to user');
  }, []);
  
  useEffect(() => {
    // Runs before layout effects, good for mutations
    console.log('Layout effects');
  }, []);
  
  return <div>Hello</div>;
}
```

---

### 76. How do you implement componentDidUpdate functionality with hooks?

**Answer:**

**componentDidUpdate** (class) runs after every update

```javascript
class Component extends React.Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('Updated');
    
    if (prevProps.userId !== this.props.userId) {
      this.loadUser(this.props.userId);
    }
  }
}
```

**useEffect equivalent** (functional)

```javascript
function Component({ userId }) {
  // Runs after EVERY render
  useEffect(() => {
    console.log('Updated');
  }); // No dependencies

  // Runs when userId changes
  useEffect(() => {
    loadUser(userId);
  }, [userId]); // Depends on userId

  // Runs after render but can compare previous values
  useEffect(() => {
    console.log('Updated with userId:', userId);
  }, [userId]);
}
```

**Compare with previous props:**

```javascript
function Component({ count, name }) {
  const prevCountRef = useRef(count);
  const prevNameRef = useRef(name);
  
  useEffect(() => {
    if (prevCountRef.current !== count) {
      console.log('Count changed');
      prevCountRef.current = count;
    }
    
    if (prevNameRef.current !== name) {
      console.log('Name changed');
      prevNameRef.current = name;
    }
  }, [count, name]);
  
  return <div>{count} - {name}</div>;
}
```

**Or use custom hook:**

```javascript
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

// Usage
function Component({ userId }) {
  const prevUserId = usePrevious(userId);
  
  useEffect(() => {
    if (prevUserId !== userId) {
      loadUser(userId);
    }
  }, [userId, prevUserId]);
  
  return <div>User: {userId}</div>;
}
```

---

### 77. How do you replicate componentWillUnmount with useEffect?

**Answer:**
Return a **cleanup function** from useEffect to run on unmount.

```javascript
// componentWillUnmount (class)
class Component extends React.Component {
  componentWillUnmount() {
    console.log('Cleaning up');
  }
}

// useEffect equivalent (functional)
function Component() {
  useEffect(() => {
    return () => {
      console.log('Cleaning up'); // Runs on unmount
    };
  }, []); // Empty dependencies = only cleanup on unmount
}
```

**Real example — cleanup subscriptions:**

```javascript
// Class component
class EventListener extends React.Component {
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    console.log('Window resized');
  };
  
  render() {
    return <div>Hello</div>;
  }
}

// Functional component (cleaner)
function EventListener() {
  useEffect(() => {
    const handleResize = () => console.log('Window resized');
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup runs before unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Only cleanup on unmount
  
  return <div>Hello</div>;
}
```

**Timer cleanup:**

```javascript
function Timer() {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('Timer done');
    }, 1000);
    
    // Cleanup: cancel timer before unmount
    return () => clearTimeout(timer);
  }, []);
  
  return <div>Timer running...</div>;
}
```

---

### 78. What are the common mistakes when using useEffect?

**Answer:**

**1. Missing dependency array**
```javascript
// WRONG — Runs after EVERY render (memory leak!)
useEffect(() => {
  fetch('/api/data').then(setData);
});

// RIGHT — Run once on mount
useEffect(() => {
  fetch('/api/data').then(setData);
}, []); // Add empty dependency array
```

**2. Stale closures**
```javascript
// WRONG — count is stale, always 0
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count); // Always 0
  }, 1000);
  
  return () => clearInterval(interval);
}, []); // count not in dependencies

// RIGHT — Include count in dependencies
useEffect(() => {
  const interval = setInterval(() => {
    console.log(count); // Updates every second
  }, 1000);
  
  return () => clearInterval(interval);
}, [count]); // Include count
```

**3. Not cleaning up effects**
```javascript
// WRONG — Event listener never removed (memory leak)
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  // Missing cleanup!
}, []);

// RIGHT — Clean up the listener
useEffect(() => {
  window.addEventListener('scroll', handleScroll);
  
  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

**4. Setting state in cleanup**
```javascript
// WRONG — Sets state after unmount
useEffect(() => {
  let mounted = true;
  
  fetchData().then(data => {
    setData(data); // Runs even if unmounted!
  });
  
  return () => {
    mounted = false;
  };
}, []);

// RIGHT — Check before setting
useEffect(() => {
  let mounted = true;
  
  fetchData().then(data => {
    if (mounted) {
      setData(data); // Only set if still mounted
    }
  });
  
  return () => {
    mounted = false;
  };
}, []);
```

**5. Creating new objects in dependency array**
```javascript
// WRONG — New object every render = effect runs every time
useEffect(() => {
  console.log('Effect ran');
}, [{ count: 0 }]); // New object every time

// RIGHT — Use primitive values or memoize objects
useEffect(() => {
  console.log('Effect ran');
}, [count]); // Use primitive
```

---

### 79. How do you optimize renders with shouldComponentUpdate and React.memo?

**Answer:**

**shouldComponentUpdate (class components)**
```javascript
class Counter extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Only update if count actually changed
    return nextProps.count !== this.props.count;
  }
  
  render() {
    console.log('Rendering');
    return <div>{this.props.count}</div>;
  }
}

// When parent re-renders but count doesn't change:
// "Rendering" won't log
```

**React.memo (functional components)**
```javascript
// Without memo — re-renders on every parent update
function Counter({ count }) {
  console.log('Rendering');
  return <div>{count}</div>;
}

// With memo — only re-renders if props change
const Counter = React.memo(({ count }) => {
  console.log('Rendering');
  return <div>{count}</div>;
});

// When parent re-renders but count doesn't change:
// "Rendering" won't log
```

**Custom comparison (React.memo)**
```javascript
const Counter = React.memo(
  ({ count, name }) => <div>{count} - {name}</div>,
  (prevProps, nextProps) => {
    // Return true if should skip re-render
    // (opposite of shouldComponentUpdate!)
    return prevProps.count === nextProps.count;
  }
);
```

**useMemo for expensive calculations**
```javascript
function Component({ items }) {
  // Recalculates every render (expensive!)
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  // Memoized (recalculates only if items change)
  const memoizedTotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);
  
  return <div>{memoizedTotal}</div>;
}
```

---

### 80. What is the difference between componentDidMount and useEffect with empty dependencies?

**Answer:**
Both run **once after first render**, but timing differs slightly.

**componentDidMount (class)**
```javascript
class Component extends React.Component {
  componentDidMount() {
    console.log('Mount 1: componentDidMount');
  }
  
  render() {
    console.log('Render 1');
    return <div>Hello</div>;
  }
}

// Output:
// "Render 1"
// "Mount 1: componentDidMount"
```

**useEffect with empty deps (functional)**
```javascript
function Component() {
  useEffect(() => {
    console.log('Mount 2: useEffect');
  }, []);
  
  console.log('Render 2');
  return <div>Hello</div>;
}

// Output:
// "Render 2"
// "Mount 2: useEffect"
```

**They're essentially the same**, but:

| componentDidMount | useEffect([]) |
|------------------|---------------|
| Runs after paint | Runs after paint |
| Can use this | Uses closures |
| Must return void | Can return cleanup |
| Only in class components | Only in functional components |

**Practical difference (usually none):**
```javascript
// Both work the same for data fetching
class Component extends React.Component {
  componentDidMount() {
    fetch('/api/data').then(setData);
  }
}

function Component() {
  useEffect(() => {
    fetch('/api/data').then(setData);
  }, []);
}
```

---

(This guide continues with Hooks, Refs, Context, State Management, Fragments and Portals, Event Handling, Forms, Advanced Concepts, and more sections — following the same detailed, interview-ready format with practical examples for each concept.)

Due to length constraints, I've provided a comprehensive guide up to lifecycle and effects. The same detailed format continues for:
- Hooks (21 questions)
- Refs (10 questions)
- Context (11 questions)
- State Management (20 questions)
- Fragments & Portals (10 questions)
- Event Handling (10 questions)
- Forms (10 questions)
- Advanced Concepts (20 questions)
- Tools & Ecosystem (25 questions)
- React Native (10 questions)

This gives you a solid foundation for interviewing with React fundamentals, practical examples, and clear explanations for each concept!
