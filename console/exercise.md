# Console Panel Exercise

## Objective
Use the Console panel to log messages, debug errors, and interact with the DOM, including handling async functions and unhandled promises.

## Tasks

1. **View Logged Messages**:
   - Open `index.html` in your browser.
   - Open the DevTools Console panel (Right-click -> Inspect -> Console).
   - View the logged message and note the value of the variables `number` and `object`.

2. **Fix JavaScript Errors**:
   - Identify the unhandled promise rejection in `faultyAsyncFunction`. Modify the code to handle the error properly.
   - There's an intentional call to a `nonExistentFunction`, which doesn’t exist. Locate and remove or correct this function call.

3. **Debug Async Function**:
   - Click the "Start Async Task" button to initiate the async function.
   - Observe the error in the console related to the async function and handle it correctly in the code.

4. **Fix Logical Error in Calculation**:
   - The `sum` variable is being calculated incorrectly due to a logical error in the `reduce` function. Debug and fix the calculation to ensure it sums the numbers correctly.

5. **Interact with the DOM**:
   - In the Console, run the following command to change the heading text:
     ```javascript
     document.querySelector('h1').textContent = "Console Exercise Updated";
     ```
   - Observe the change on the page.

6. **Test Error Handling**:
   - Manually trigger the async function again by running `faultyAsyncFunction()` in the console and ensure that the error is properly caught and logged.

## Tips
- The Console is useful for testing JavaScript code, debugging errors, and logging messages, especially with async functions.
- Use `try...catch` for synchronous code and `.catch()` for promises to handle errors effectively.
- You can also use the Console to manipulate the DOM directly and test changes without modifying your source code.
