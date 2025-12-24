# Console Panel - Advanced Exercise

## Objective
Master advanced Console features including Live Expressions, the Console Utilities API, and real-time state monitoring.

---

## What You'll Learn
- **Live Expressions** to watch variables update in real-time
- **Console Utilities API** (`$0`, `$_`, `$$()`, `monitor()`, `getEventListeners()`, etc.)
- Using `queryObjects()` to find all instances of a class in memory
- Debugging closures and scope with `console.dir()`
- Monitoring function calls and events

---

## The Scenario
You're debugging a shopping cart application. The cart has issues with:
1. State not updating correctly
2. Event listeners piling up (memory leak)
3. Mysterious function calls you need to trace
4. Closure scope issues

---

## Tasks

### 1. Set Up Live Expressions
- Open `index.html` in your browser
- Open DevTools → Console panel
- Click the **eye icon** (👁️) at the top of the Console to create a Live Expression
- Add these expressions to monitor in real-time:
  ```javascript
  cart.items.length
  cart.total
  document.querySelectorAll('.cart-item').length
  ```
- Add items to the cart and watch the Live Expressions update automatically

### 2. Use Console Utilities API
Try these commands in the Console:

```javascript
// $0 - Currently selected element in Elements panel
// First, click on an element in Elements panel, then:
$0                          // Returns the selected element
$0.textContent              // Get its text
$0.classList                // Get its classes

// $_ - Last evaluated expression result
2 + 2                       // Returns 4
$_ * 10                     // Returns 40 (uses previous result)

// $$() - Shorthand for document.querySelectorAll()
$$('.product')              // Returns all products
$$('.product').length       // Count products

// copy() - Copy any object to clipboard
copy(cart.items)            // Now paste in a text editor

// clear() - Clear the console
clear()
```

### 3. Monitor Function Calls with `monitor()`
- In the Console, run:
  ```javascript
  monitor(cart.addItem)
  ```
- Now add items to the cart using the buttons
- Watch the Console log every call to `addItem` with its arguments
- To stop monitoring:
  ```javascript
  unmonitor(cart.addItem)
  ```

### 4. Find Event Listeners with `getEventListeners()`
- Click the "Add Many Listeners" button multiple times
- Select one of the product buttons in the Elements panel
- In the Console, run:
  ```javascript
  getEventListeners($0)
  ```
- Notice how many click listeners are attached (this is a memory leak!)
- The button should only have 1 listener, but it has many

### 5. Inspect All Instances with `queryObjects()`
- The cart uses a `CartItem` class for each item
- To find ALL `CartItem` instances in memory:
  ```javascript
  queryObjects(CartItem)
  ```
- Add some items, then run `queryObjects(CartItem)` again
- This is useful for detecting if old objects are being retained (memory leaks)

### 6. Debug Closures with `console.dir()`
- There's a function `createDiscountCalculator()` that creates a closure
- Run in Console:
  ```javascript
  const calc = createDiscountCalculator(0.2);
  console.dir(calc);
  ```
- Expand the result and look at `[[Scopes]]`
- You can see the closed-over variables (`discountRate: 0.2`)
- Try:
  ```javascript
  calc(100)  // Should return 80 (20% off)
  ```

### 7. Monitor Events on an Element
- Run:
  ```javascript
  monitorEvents(document.getElementById('cart-container'), 'click')
  ```
- Click around the cart area
- Watch all click events get logged with full event details
- Stop with:
  ```javascript
  unmonitorEvents(document.getElementById('cart-container'))
  ```

### 8. Debug the Total Calculation Bug
- Add several items to the cart
- Notice the total seems wrong
- Use Live Expressions and `monitor()` to trace the issue
- The bug is in how the total is calculated (hint: check the `calculateTotal` method)

---

## Console Utilities API Reference

| Command | Description |
|---------|-------------|
| `$0` | Currently selected element in Elements panel |
| `$1` - `$4` | Previously selected elements |
| `$_` | Result of last evaluated expression |
| `$(selector)` | Shorthand for `document.querySelector()` |
| `$$(selector)` | Shorthand for `document.querySelectorAll()` |
| `$x(xpath)` | Select elements by XPath |
| `copy(object)` | Copy object to clipboard as JSON |
| `clear()` | Clear console |
| `dir(object)` | Display object properties (alias for console.dir) |
| `monitor(fn)` | Log when function is called |
| `unmonitor(fn)` | Stop monitoring function |
| `monitorEvents(el, [events])` | Log events on element |
| `unmonitorEvents(el)` | Stop monitoring events |
| `getEventListeners(el)` | Get all event listeners on element |
| `queryObjects(Constructor)` | Find all instances of a class |
| `keys(object)` | Shorthand for Object.keys() |
| `values(object)` | Shorthand for Object.values() |

---

## Tips
- Live Expressions update in real-time without cluttering the Console
- `monitor()` is great for understanding when and how functions are called
- `getEventListeners()` is essential for finding event listener leaks
- `queryObjects()` helps identify memory leaks by finding retained objects

---

## Solution
See the comments in `script.js` marked with `/* BUG: */` and `/* SOLUTION: */` for the fixes.

