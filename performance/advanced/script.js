/**
 * Performance Panel - Advanced Exercise
 * 
 * This file contains intentional memory leaks for students to find
 * using the Memory panel, Heap Snapshots, and Allocation Timeline.
 * 
 * MEMORY LEAKS IN THIS FILE:
 * 1. Array that grows but items aren't properly released
 * 2. Detached DOM nodes still referenced
 * 3. Event listeners that are never removed
 * 4. Closures that capture large objects
 */

// ===========================================
// LEAK #1: Growing Array
// Items are added but not properly garbage collected
// ===========================================

/**
 * LeakyItem class - used to create objects that should be collected
 * Students can search for "LeakyItem" in heap snapshots
 */
class LeakyItem {
    constructor(id) {
        this.id = id;
        this.timestamp = Date.now();
        // Large data to make the leak more visible
        this.data = new Array(10000).fill(`Item ${id} data`);
    }
}

// This array grows and is never properly cleaned
const leakyItemsArray = [];

/*
 * MEMORY LEAK: Items are pushed but the array is never truly cleared
 * The "Clear Items" button sets length to 0, but the old items
 * might still be referenced elsewhere (in this case, we intentionally
 * keep a backup reference to demonstrate the leak)
 */
let itemsBackup = []; // PROBLEM: Keeps reference to "cleared" items

function addItems() {
    const count = 10;
    for (let i = 0; i < count; i++) {
        const item = new LeakyItem(leakyItemsArray.length + 1);
        leakyItemsArray.push(item);
        
        /*
         * MEMORY LEAK: Also storing in backup array
         * Even when we "clear" the main array, backup still holds references
         */
        itemsBackup.push(item); // PROBLEM: Duplicate reference
    }
    
    updateItemsUI();
    log(`Added ${count} items. Total: ${leakyItemsArray.length}`, 'success');
}

function clearItems() {
    const count = leakyItemsArray.length;
    
    /*
     * MEMORY LEAK: This clears the array but itemsBackup still holds references!
     * The LeakyItem objects won't be garbage collected.
     * 
     * FIX: Also clear the backup array
     * itemsBackup = [];
     */
    leakyItemsArray.length = 0;
    // itemsBackup = []; // UNCOMMENT THIS TO FIX THE LEAK
    
    updateItemsUI();
    log(`Cleared ${count} items from main array. But are they truly gone?`, 'warning');
    log(`(Hint: itemsBackup still has ${itemsBackup.length} references!)`, 'error');
}

function updateItemsUI() {
    document.getElementById('items-count').textContent = leakyItemsArray.length;
    document.getElementById('items-size').textContent = 
        Math.round((leakyItemsArray.length * 10000 * 8) / 1024) + ' KB';
    
    const container = document.getElementById('items-list');
    if (leakyItemsArray.length === 0) {
        container.innerHTML = '<div class="item">No items in main array...</div>';
    } else {
        container.innerHTML = leakyItemsArray.slice(-5).map(item => 
            `<div class="item">Item #${item.id} - ${new Date(item.timestamp).toLocaleTimeString()}</div>`
        ).join('');
    }
}

// ===========================================
// LEAK #2: Detached DOM Nodes
// DOM elements removed from page but still referenced
// ===========================================

/*
 * MEMORY LEAK: We store references to created cards
 * Even after removing cards from DOM, these references keep them in memory
 */
const cardReferences = []; // PROBLEM: Holds references to removed DOM nodes
let cardsCreated = 0;
let cardsRemoved = 0;

function createCards() {
    const container = document.getElementById('cards-container');
    const count = 5;
    
    for (let i = 0; i < count; i++) {
        cardsCreated++;
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = `Card #${cardsCreated}`;
        card.dataset.id = cardsCreated;
        
        container.appendChild(card);
        
        /*
         * MEMORY LEAK: Storing DOM reference in array
         * When we remove the card from DOM, this reference keeps it in memory
         * 
         * FIX: Don't store references, or clear them when removing
         */
        cardReferences.push(card); // PROBLEM: Keeps detached DOM nodes alive
    }
    
    updateCardsUI();
    log(`Created ${count} cards. References stored: ${cardReferences.length}`, 'success');
}

function removeCards() {
    const container = document.getElementById('cards-container');
    const cards = container.querySelectorAll('.card');
    const count = cards.length;
    
    cards.forEach(card => {
        card.remove();
        cardsRemoved++;
    });
    
    /*
     * MEMORY LEAK: We removed cards from DOM but cardReferences still holds them!
     * Search for "Detached" in heap snapshot to find these orphaned nodes.
     * 
     * FIX: Clear the references array
     * cardReferences.length = 0;
     */
    // cardReferences.length = 0; // UNCOMMENT THIS TO FIX THE LEAK
    
    updateCardsUI();
    log(`Removed ${count} cards from DOM. But references still exist!`, 'warning');
    log(`cardReferences.length = ${cardReferences.length} (detached nodes!)`, 'error');
}

function updateCardsUI() {
    document.getElementById('cards-count').textContent = cardsCreated;
    document.getElementById('cards-removed').textContent = cardsRemoved;
}

// ===========================================
// LEAK #3: Event Listeners
// Listeners added but never removed
// ===========================================

let listenersAdded = 0;
let listenersRemoved = 0;
const activeListeners = []; // For proper cleanup demonstration

function addListenerLeak() {
    const button = document.getElementById('test-button');
    
    /*
     * MEMORY LEAK: Adding anonymous listener that can never be removed
     * Each call adds a NEW listener without removing the old one
     * 
     * FIX: Store reference and remove before adding, or use AbortController
     */
    button.addEventListener('click', () => {
        // PROBLEM: Anonymous function - can't be removed!
        console.log('Leaky listener fired!', Date.now());
    });
    
    listenersAdded++;
    updateListenersUI();
    log(`Added anonymous listener #${listenersAdded}. Cannot be removed!`, 'error');
}

function addProperListener() {
    const button = document.getElementById('test-button');
    
    /*
     * GOOD PRACTICE: Using AbortController for easy cleanup
     * This allows removing the listener later
     */
    const controller = new AbortController();
    
    const handler = () => {
        console.log('Proper listener fired!', Date.now());
    };
    
    button.addEventListener('click', handler, { signal: controller.signal });
    
    // Store for later cleanup
    activeListeners.push({ controller, handler });
    
    listenersAdded++;
    updateListenersUI();
    log(`Added proper listener with AbortController. Can be cleaned up!`, 'success');
}

function cleanupListeners() {
    /*
     * FIX: Abort all controllers to remove listeners
     * This is the proper way to clean up event listeners
     */
    let cleaned = 0;
    activeListeners.forEach(({ controller }) => {
        controller.abort();
        cleaned++;
        listenersRemoved++;
    });
    activeListeners.length = 0;
    
    updateListenersUI();
    log(`Cleaned up ${cleaned} proper listeners. Leaky ones remain!`, 'warning');
}

function updateListenersUI() {
    document.getElementById('listener-count').textContent = listenersAdded;
    document.getElementById('listener-removed').textContent = listenersRemoved;
}

// ===========================================
// LEAK #4: Closures Holding Large Data
// Functions that capture large objects in their scope
// ===========================================

const closures = [];
let closureCount = 0;
let totalClosureSize = 0;

function createLeakyClosure() {
    /*
     * MEMORY LEAK: This closure captures 'hugeArray' in its scope
     * The array can never be garbage collected as long as the closure exists
     */
    const hugeArray = new Array(1000000).fill('x'); // ~1MB of data
    
    const leakyClosure = function() {
        // PROBLEM: This function keeps hugeArray alive forever
        return hugeArray.length;
    };
    
    closures.push(leakyClosure);
    closureCount++;
    totalClosureSize++;
    
    updateClosureUI();
    log(`Created leaky closure #${closureCount}. Captures 1MB array!`, 'error');
}

function createGoodClosure() {
    /*
     * FIX: Only capture what you actually need
     * Don't capture the entire array if you only need its length
     */
    const hugeArray = new Array(1000000).fill('x');
    const length = hugeArray.length; // Extract what we need
    // hugeArray is now eligible for garbage collection!
    
    const goodClosure = function() {
        // GOOD: Only captures the primitive 'length', not the array
        return length;
    };
    
    closures.push(goodClosure);
    closureCount++;
    // Note: doesn't increase totalClosureSize because no large data retained
    
    updateClosureUI();
    log(`Created efficient closure #${closureCount}. Array was released!`, 'success');
}

function updateClosureUI() {
    document.getElementById('closure-count').textContent = closureCount;
    document.getElementById('closure-size').textContent = totalClosureSize + ' MB';
}

// ===========================================
// Continuous Leak Simulation
// For Allocation Timeline demonstration
// ===========================================

let leakInterval = null;
const memoryBars = [];

function startContinuousLeak() {
    if (leakInterval) return;
    
    log('Starting continuous memory leak...', 'warning');
    
    leakInterval = setInterval(() => {
        // Create garbage that won't be collected
        const leak = {
            timestamp: Date.now(),
            data: new Array(100000).fill(Math.random())
        };
        
        // Add to an array so it's not collected
        if (!window.continuousLeaks) {
            window.continuousLeaks = [];
        }
        window.continuousLeaks.push(leak);
        
        // Update visualization
        updateMemoryVisualization();
    }, 500);
}

function stopContinuousLeak() {
    if (leakInterval) {
        clearInterval(leakInterval);
        leakInterval = null;
        log('Stopped continuous leak. But memory is still allocated!', 'warning');
        log(`Total leaked objects: ${window.continuousLeaks?.length || 0}`, 'error');
    }
}

function updateMemoryVisualization() {
    const viz = document.getElementById('memory-viz');
    const count = window.continuousLeaks?.length || 0;
    
    // Add a new bar
    const bar = document.createElement('div');
    bar.className = 'memory-bar';
    
    // Color based on leak severity
    if (count > 50) {
        bar.classList.add('critical');
    } else if (count > 20) {
        bar.classList.add('high');
    }
    
    // Height based on count
    bar.style.height = Math.min(count * 2, 50) + 'px';
    
    // Limit number of bars
    if (viz.children.length > 30) {
        viz.removeChild(viz.firstChild);
    }
    
    viz.appendChild(bar);
}

// ===========================================
// Utility Functions
// ===========================================

function log(message, type = 'info') {
    const container = document.getElementById('activity-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    container.appendChild(entry);
    container.scrollTop = container.scrollHeight;
    
    console.log(`[Memory Exercise] ${message}`);
}

function forceGC() {
    if (window.gc) {
        window.gc();
        log('Forced garbage collection (gc() is exposed)', 'success');
    } else {
        log('gc() not exposed. Run Chrome with --js-flags="--expose-gc"', 'warning');
    }
}

function clearLog() {
    document.getElementById('activity-log').innerHTML = 
        '<div class="log-entry">Log cleared...</div>';
}

// ===========================================
// Event Listeners Setup
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // Leak #1: Growing Array
    document.getElementById('add-items').addEventListener('click', addItems);
    document.getElementById('clear-items').addEventListener('click', clearItems);
    
    // Leak #2: Detached DOM
    document.getElementById('create-cards').addEventListener('click', createCards);
    document.getElementById('remove-cards').addEventListener('click', removeCards);
    
    // Leak #3: Event Listeners
    document.getElementById('add-listener').addEventListener('click', addListenerLeak);
    document.getElementById('proper-listener').addEventListener('click', addProperListener);
    document.getElementById('cleanup-listeners').addEventListener('click', cleanupListeners);
    
    // Leak #4: Closures
    document.getElementById('create-closure').addEventListener('click', createLeakyClosure);
    document.getElementById('create-good-closure').addEventListener('click', createGoodClosure);
    
    // Continuous leak
    document.getElementById('start-leak').addEventListener('click', startContinuousLeak);
    document.getElementById('stop-leak').addEventListener('click', stopContinuousLeak);
    
    // Utilities
    document.getElementById('force-gc').addEventListener('click', forceGC);
    document.getElementById('clear-log').addEventListener('click', clearLog);
    
    // Initialize memory visualization
    for (let i = 0; i < 10; i++) {
        const bar = document.createElement('div');
        bar.className = 'memory-bar';
        bar.style.height = '4px';
        document.getElementById('memory-viz').appendChild(bar);
    }
});

// ===========================================
// Console startup message
// ===========================================

console.log('%c🔍 Memory Leak Detective', 'font-size: 20px; font-weight: bold; color: #ff7b72;');
console.log('%c─────────────────────────────', 'color: #ff7b72;');
console.log('');
console.log('%cThis page contains intentional memory leaks!', 'font-weight: bold; color: #f85149;');
console.log('');
console.log('%cHow to find them:', 'font-weight: bold;');
console.log('');
console.log('1. Memory Panel → Take Heap Snapshot (baseline)');
console.log('2. Interact with the page (add items, create cards, etc.)');
console.log('3. Take another Heap Snapshot');
console.log('4. Compare snapshots: "Objects allocated between Snapshot 1 and 2"');
console.log('');
console.log('%cLeak types to find:', 'font-weight: bold;');
console.log('- LeakyItem objects (search in snapshot)');
console.log('- Detached DOM nodes (search "Detached")');
console.log('- Event listeners (use Performance Monitor)');
console.log('- Closure-retained arrays (check [[Scopes]] in snapshot)');
console.log('');
console.log('%c─────────────────────────────', 'color: #ff7b72;');

/*
 * ===========================================
 * SOLUTIONS SUMMARY
 * ===========================================
 * 
 * LEAK #1 - Growing Array:
 *   Problem: itemsBackup array keeps references even after clearing
 *   Solution: Also clear itemsBackup when clearing items
 *   Fix: Add "itemsBackup = [];" in clearItems()
 * 
 * LEAK #2 - Detached DOM:
 *   Problem: cardReferences array holds removed DOM nodes
 *   Solution: Clear cardReferences when removing cards
 *   Fix: Add "cardReferences.length = 0;" in removeCards()
 * 
 * LEAK #3 - Event Listeners:
 *   Problem: Anonymous listeners can't be removed
 *   Solution: Use named functions or AbortController
 *   Fix: Use the addProperListener() pattern with AbortController
 * 
 * LEAK #4 - Closures:
 *   Problem: Closure captures entire hugeArray
 *   Solution: Extract only needed values before creating closure
 *   Fix: Use createGoodClosure() pattern - capture length, not array
 */

