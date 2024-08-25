# Sources Panel Exercise

## Objective
Use the Sources panel to debug complex JavaScript issues, including async functions, breakpoints, stepping through code, and fixing variable scope errors.

## Tasks

1. **Set a Breakpoint in Async Function**:
   - Open `index.html` in your browser.
   - Open the DevTools Sources panel (Right-click -> Inspect -> Sources).
   - Locate `script.js` in the file explorer.
   - Set a breakpoint inside the `complexAsyncFunction` before the `await faultyPromise()` line.

2. **Step Through Code**:
   - Reload the page and click the "Trigger Debug" button to initiate the async function.
   - Step through the code to see how the async function progresses, especially focusing on how the promise resolves.
   - Identify the logic error in `faultyPromise` where it incorrectly resolves and rejects.

3. **Fix Promise Handling**:
   - Notice that the `faultyPromise` function is trying to both resolve and reject. Correct this logic so that only one outcome occurs.

4. **Debug Variable Scope Issue**:
   - In the `processData` function, there’s an undefined variable being used. Set a breakpoint here and step through to observe the scope and fix the issue.

5. **Modify and Test**:
   - After fixing the issues, test the code by clicking the "Trigger Debug" button again and ensuring that the output is correct.

6. **Test Error Handling**:
   - Modify the `faultyPromise` to ensure it properly rejects and handle the rejection in the `complexAsyncFunction`. Verify that the correct error is caught and logged.

## Tips
- Use breakpoints effectively in async functions and callbacks to understand how your code is executed.
- Pay attention to variable scopes, especially in nested functions and asynchronous code.
- Use the "Call Stack" and "Watch" panels to monitor how variables change as you step through the code.
