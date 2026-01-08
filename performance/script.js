/**
 * Performance Panel - Basic Exercise
 * ===================================
 * 
 * This file contains INTENTIONAL performance problems for you to identify
 * using the Performance panel. The issues make the page unresponsive!
 * 
 * PERFORMANCE ISSUES:
 * 1. Event loop blocking - A huge loop freezes the UI
 * 2. DOM reflow thrashing - Adding 100,000 elements one by one
 * 
 * LEARNING GOALS:
 * - Record a performance profile
 * - Identify blocking code in the flame chart
 * - Understand why DOM operations are slow
 * - Learn optimization techniques
 * 
 * SUCCESS CRITERIA:
 * ✓ You can identify the blocking code in the flame chart
 * ✓ You understand why the UI freezes
 * ✓ You can apply the solutions to make the code faster
 */

// ===========================================
// Welcome message
// ===========================================
console.log('%c⚡ Performance Exercise - Welcome!', 'font-size: 18px; font-weight: bold; color: #E91E63;');
console.log('%c─────────────────────────────────', 'color: #E91E63;');
console.log('');
console.log('%c⚠️ WARNING: This code intentionally freezes the page!', 'color: #f44336; font-weight: bold;');
console.log('');
console.log('To analyze the performance:');
console.log('  1. Open DevTools → Performance panel');
console.log('  2. Click the record button (⚫)');
console.log('  3. Click "Start Test" button');
console.log('  4. Wait for it to complete, then stop recording');
console.log('  5. Analyze the flame chart');
console.log('');
console.log('Before clicking "Start Test":');
console.log('  - Try hovering over buttons and typing in the input');
console.log('  - Notice how responsive the page is');
console.log('');
console.log('During the test:');
console.log('  - Try the same interactions');
console.log('  - Notice the page is completely frozen!');
console.log('');
console.log('%c─────────────────────────────────', 'color: #E91E63;');

document.getElementById('start-test').addEventListener('click', () => {
    const startTime = performance.now();
    console.log('Starting performance test...');
    console.log('(The page will freeze - this is intentional!)');

    // ===========================================
    // PROBLEM #1: Blocking the Event Loop
    // ===========================================
    /*
     * PROBLEM: This loop runs 500 MILLION iterations on the main thread!
     * JavaScript is single-threaded, so while this runs:
     *   - No UI updates can happen
     *   - No user interactions are processed
     *   - The page appears completely frozen
     * 
     * In the Performance panel's flame chart, you'll see a HUGE
     * yellow block labeled "Script" - that's this loop!
     */
    for (let i = 0; i < 500000000; i++) {
        // Complex computation that blocks the UI thread
        // Each iteration is fast, but 500M of them takes seconds!
    }

    const dynamicContent = document.getElementById('dynamic-content');

    // ===========================================
    // PROBLEM #2: DOM Reflow Thrashing
    // ===========================================
    /*
     * PROBLEM: Each appendChild() forces the browser to:
     *   1. Add the element to the DOM tree
     *   2. Recalculate styles
     *   3. Recalculate layout (reflow)
     *   4. Repaint the screen
     * 
     * Doing this 100,000 times is extremely slow!
     * 
     * In the Performance panel, you'll see many purple "Layout" 
     * events in the flame chart.
     */
    for (let i = 0; i < 100000; i++) {
        const newElement = document.createElement('p');
        newElement.textContent = `Paragraph ${i}`;
        dynamicContent.appendChild(newElement); // SLOW: Triggers reflow each time!
    }

    const endTime = performance.now();
    console.log(`Test completed in ${(endTime - startTime).toFixed(0)} milliseconds.`);
    console.log('Check the Performance panel to see the flame chart!');
});

/*
 * ===========================================
 * SOLUTION #1: Break Up Long Tasks
 * ===========================================
 * 
 * Instead of one huge loop, break it into chunks with setTimeout.
 * This lets the browser handle UI updates between chunks.
 * 
 * function runHeavyComputation() {
 *     let i = 0;
 *     const chunkSize = 1000000; // Process 1M iterations per chunk
 *     
 *     function computeChunk() {
 *         const end = Math.min(i + chunkSize, 500000000);
 *         
 *         for (; i < end; i++) {
 *             // Perform computation
 *         }
 *         
 *         if (i < 500000000) {
 *             // Schedule next chunk, allowing UI to update
 *             setTimeout(computeChunk, 0);
 *         } else {
 *             console.log("Computation completed.");
 *         }
 *     }
 *     
 *     computeChunk();
 * }
 * 
 * EVEN BETTER: Use a Web Worker for heavy computation!
 * Web Workers run on a separate thread and don't block the UI.
 */

/*
 * ===========================================
 * SOLUTION #2: Batch DOM Updates
 * ===========================================
 * 
 * Use DocumentFragment to batch all DOM operations into one.
 * The browser only reflows ONCE when the fragment is appended!
 * 
 * const fragment = document.createDocumentFragment();
 * 
 * for (let i = 0; i < 100000; i++) {
 *     const newElement = document.createElement('p');
 *     newElement.textContent = `Paragraph ${i}`;
 *     fragment.appendChild(newElement); // No reflow yet!
 * }
 * 
 * dynamicContent.appendChild(fragment); // ONE reflow for all elements!
 * 
 * This is MUCH faster because:
 *   - DocumentFragment is not part of the active DOM
 *   - No styles or layout are calculated until final append
 *   - Only one reflow happens at the end
 */

/*
 * ===========================================
 * WHAT TO LOOK FOR IN PERFORMANCE PANEL
 * ===========================================
 * 
 * 1. FLAME CHART (Main thread):
 *    - Yellow = JavaScript execution
 *    - Purple = Layout/Reflow
 *    - Green = Paint
 *    - Large yellow blocks = blocking code!
 * 
 * 2. BOTTOM-UP / CALL TREE:
 *    - Shows which functions took the most time
 *    - "Self Time" = time in the function itself
 *    - "Total Time" = including called functions
 * 
 * 3. SUMMARY:
 *    - Pie chart showing time breakdown
 *    - Scripting, Rendering, Painting, etc.
 * 
 * 4. RED INDICATORS:
 *    - Red corners on the flame chart = dropped frames
 *    - This means the UI was janky/unresponsive
 */
