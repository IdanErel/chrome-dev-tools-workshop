/**
 * Console Panel - Basic Exercise
 * ==============================
 * 
 * This file contains intentional bugs for you to find using the Console panel.
 * Open DevTools (F12 or Cmd+Option+I) → Console tab to see errors and debug.
 * 
 * BUGS TO FIND:
 * 1. Unhandled promise rejection in faultyAsyncFunction
 * 2. Incorrect calculation in the reduce function (sum is negative!)
 * 3. Call to a non-existent function (currently commented out)
 * 
 * LEARNING GOALS:
 * - View console.log output and understand variable values
 * - Identify JavaScript errors in the Console
 * - Handle async errors with try/catch or .catch()
 * - Fix logical errors by inspecting values
 * 
 * SUCCESS CRITERIA:
 * ✓ The sum should be 15 (1+2+3+4+5), not -15
 * ✓ Clicking "Start Async Task" should NOT show an unhandled rejection
 * ✓ You should see "Async task completed" or a caught error message
 */

// ===========================================
// Welcome message - you'll see this in Console!
// ===========================================
console.log('%c🔧 Console Exercise - Welcome!', 'font-size: 18px; font-weight: bold; color: #4CAF50;');
console.log('%c─────────────────────────────', 'color: #4CAF50;');
console.log('');
console.log('Open the Sources panel to see this code and find the bugs!');
console.log('');
console.log('%cThings to check:', 'font-weight: bold;');
console.log('  1. Is the "Calculated sum" correct? (should be 15)');
console.log('  2. Click "Start Async Task" - do you see an error?');
console.log('');
console.log('%c─────────────────────────────', 'color: #4CAF50;');

document.addEventListener("DOMContentLoaded", function() {
    // ===========================================
    // Basic console.log examples
    // These demonstrate how to log different data types
    // ===========================================
    const number = 10;
    console.log("The number is: " + number);
    
    const object = { name: "John", age: 30 };
    console.log("The object is: ", object);
    // TIP: Click the arrow next to the object in Console to expand it!

    // ===========================================
    // BUG #1: Unhandled Promise Rejection
    // This async function throws an error but nothing catches it
    // ===========================================
    async function faultyAsyncFunction() {
        /*
         * PROBLEM: This function throws an error, but when called,
         * the error isn't being caught properly.
         * 
         * SOLUTION: The caller needs to use .catch() or try/catch
         */
        throw new Error("Something went wrong in the async function!");
    }

    // This button triggers the faulty async function
    document.getElementById('start-task').addEventListener('click', () => {
        faultyAsyncFunction()
            .then(() => console.log("Async task completed."))
            .catch(() => console.log('Unhandled Error'));
        
        /*
         * CURRENT STATE: The .catch() above now handles the error.
         * 
         * EXERCISE: Try removing the .catch() line and see what happens
         * in the Console - you'll see an "Unhandled Promise Rejection"!
         * 
         * BETTER SOLUTION: Show a user-friendly message
         * .catch((error) => {
         *     console.error('Task failed:', error.message);
         *     alert('The task failed. Please try again.');
         * });
         */
    });

    // ===========================================
    // BUG #2: Incorrect Function Call (commented out)
    // Uncomment the line below to see a ReferenceError
    // ===========================================
    // nonExistentFunction(); // PROBLEM: This function doesn't exist!
    
    /*
     * EXERCISE: Uncomment the line above, then:
     * 1. Reload the page
     * 2. Look at the Console - you'll see a ReferenceError
     * 3. Click the file:line link to jump to the error location
     */

    // ===========================================
    // BUG #3: Incorrect Calculation
    // The sum is being calculated wrong!
    // ===========================================
    const numbers = [1, 2, 3, 4, 5];
    
    /*
     * PROBLEM: The reduce function uses MINUS (-) instead of PLUS (+)
     * This gives us -15 instead of 15!
     * 
     * Current: acc - num (0-1-2-3-4-5 = -15)
     * Should be: acc + num (0+1+2+3+4+5 = 15)
     */
    let sum = numbers.reduce((acc, num) => acc - num, 0); // BUG: Should be acc + num
    
    console.log("Calculated sum:", sum);
    console.log("Expected sum: 15");
    
    if (sum !== 15) {
        console.error("❌ Bug found! The sum calculation is incorrect.");
        console.log("Hint: Check the reduce function - is it adding or subtracting?");
    }
    
    /*
     * SOLUTION:
     * let sum = numbers.reduce((acc, num) => acc + num, 0);
     */
});
