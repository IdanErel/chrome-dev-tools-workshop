/**
 * Sources Panel - Basic Exercise
 * ===============================
 * 
 * This file contains intentional bugs for you to debug using breakpoints.
 * Open DevTools (F12) → Sources panel → Find this file in the file tree.
 * 
 * BUGS TO FIND:
 * 1. Promise that both resolves AND rejects (should only do one!)
 * 2. Variable scope error - outOfScopeVariable is used outside its scope
 * 
 * LEARNING GOALS:
 * - Set breakpoints by clicking on line numbers
 * - Step through code using F10 (step over) and F11 (step into)
 * - Use the Scope panel to inspect variable values
 * - Understand the Call Stack panel
 * 
 * SUCCESS CRITERIA:
 * ✓ Clicking "Trigger Debug" should show "Success!" (not an error)
 * ✓ The processed data should display without ReferenceErrors
 */

// ===========================================
// Welcome message
// ===========================================
console.log('%c🔍 Sources Exercise - Welcome!', 'font-size: 18px; font-weight: bold; color: #2196F3;');
console.log('%c─────────────────────────────', 'color: #2196F3;');
console.log('');
console.log('To debug this code:');
console.log('  1. Open Sources panel (F12 → Sources)');
console.log('  2. Find script.js in the file tree');
console.log('  3. Click on a line number to set a breakpoint');
console.log('  4. Click "Trigger Debug" button to start');
console.log('');
console.log('%c─────────────────────────────', 'color: #2196F3;');

document.addEventListener("DOMContentLoaded", function() {
    const output = document.getElementById("output");

    // ===========================================
    // Async function that uses a faulty promise
    // ===========================================
    async function complexAsyncFunction() {
        let result = 0;
        try {
            /*
             * EXERCISE: Set a breakpoint on the line below (click line number)
             * Then click "Trigger Debug" and use:
             *   F10 - Step Over (execute line, move to next)
             *   F11 - Step Into (go inside the function)
             *   F8  - Continue (run until next breakpoint)
             */
            result = await faultyPromise();
            console.log("Result from async function:", result);
        } catch (error) {
            console.error("Error in async function:", error);
        }
        return result;
    }

    // ===========================================
    // BUG #1: Promise Logic Error
    // This promise tries to BOTH reject AND resolve!
    // ===========================================
    function faultyPromise() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                /*
                 * PROBLEM: A promise should either resolve OR reject, never both!
                 * Once a promise is rejected, resolve() has no effect, but
                 * this is still a logic error that will confuse developers.
                 * 
                 * CURRENT (buggy):
                 *   reject(new Error("...")); // This runs first
                 *   resolve("Success!");       // This is ignored
                 * 
                 * SOLUTION: Use conditional logic
                 *   const shouldSucceed = true; // or some condition
                 *   if (shouldSucceed) {
                 *       resolve("Success!");
                 *   } else {
                 *       reject(new Error("Failed!"));
                 *   }
                 */
                reject(new Error("This should have been rejected!")); // BUG: Logic error
                resolve("Success!"); // This line is ignored after reject
            }, 1000);
        });
    }

    // ===========================================
    // BUG #2: Variable Scope Error
    // A variable is used outside the scope where it was defined
    // ===========================================
    function triggerError() {
        // This variable is defined HERE, in triggerError's scope
        const outOfScopeVariable = "Some random data";
        let data = "Initial data";

        try {
            data = processData(data);
        } catch (e) {
            /*
             * If processData throws an error, we catch it here
             * and log it along with our local variable
             */
            console.error("Error processing data:", e, outOfScopeVariable);
        }

        output.textContent = "Processed Data: " + data;
    }

    function processData(input) {
        /*
         * PROBLEM: This function tries to use outOfScopeVariable,
         * but that variable is defined in triggerError(), not here!
         * 
         * JavaScript's scope rules mean this will throw a ReferenceError.
         * 
         * EXERCISE:
         * 1. Set a breakpoint on the return line below
         * 2. Click "Trigger Debug" 
         * 3. When paused, check the "Scope" panel on the right
         * 4. Notice that outOfScopeVariable is NOT in the scope!
         * 
         * SOLUTION: Either:
         * a) Pass the variable as a parameter:
         *    function processData(input, extraData) {
         *        return input.toUpperCase() + " " + extraData;
         *    }
         *    // In triggerError: processData(data, outOfScopeVariable)
         * 
         * b) Or define the variable in a shared scope
         */
        return input.toUpperCase() + " " + outOfScopeVariable; // BUG: ReferenceError!
    }

    // ===========================================
    // Event Handler
    // ===========================================
    document.getElementById("trigger-debug").addEventListener("click", () => {
        complexAsyncFunction().then(finalResult => {
            console.log("Final result:", finalResult);
            
            /*
             * The debugger statement is like an automatic breakpoint.
             * When DevTools is open, code will pause here.
             */
            debugger; // This pauses execution when DevTools is open
            
            triggerError();
        });
    });
});
