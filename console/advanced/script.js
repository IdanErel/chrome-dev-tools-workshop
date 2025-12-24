/**
 * Console Panel - Advanced Exercise
 * 
 * This file contains intentional bugs and scenarios for students to debug
 * using advanced Console features like Live Expressions, monitor(),
 * getEventListeners(), and queryObjects().
 */

// ===========================================
// CartItem Class - for queryObjects() exercise
// ===========================================
class CartItem {
    constructor(name, price, quantity = 1) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.id = Date.now() + Math.random();
    }
}

// ===========================================
// Shopping Cart Object
// Students will monitor this with Live Expressions
// ===========================================
const cart = {
    items: [],

    /**
     * Add an item to the cart
     * Students will use monitor(cart.addItem) to trace calls
     */
    addItem(name, price) {
        // Check if item already exists
        const existingItem = this.items.find(item => item.name === name);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            // Create new CartItem instance
            // Students can find these with queryObjects(CartItem)
            const newItem = new CartItem(name, parseFloat(price));
            this.items.push(newItem);
        }

        this.render();
        this.calculateTotal();
    },

    /**
     * Remove an item from the cart
     */
    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.render();
        this.calculateTotal();
    },

    /**
     * Calculate and display the total
     * 
     * BUG: The total calculation has an error!
     * Students should use Live Expressions and monitor() to find it
     */
    calculateTotal() {
        /*
         * BUG: Using 'reduce' incorrectly - not accounting for quantity!
         * Each item can have quantity > 1, but we only count price once
         */
        this.total = this.items.reduce((sum, item) => {
            return sum + item.price; // PROBLEM: Should be item.price * item.quantity
        }, 0);
        
        /* 
         * SOLUTION:
         * this.total = this.items.reduce((sum, item) => {
         *     return sum + (item.price * item.quantity);
         * }, 0);
         */

        document.getElementById('cart-total').textContent = `$${this.total.toFixed(2)}`;
    },

    /**
     * Render cart items to the DOM
     */
    render() {
        const container = document.getElementById('cart-container');

        if (this.items.length === 0) {
            container.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
            return;
        }

        container.innerHTML = this.items.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <span>${item.name} (x${item.quantity})</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    },

    /**
     * Clear all items from cart
     */
    clear() {
        this.items = [];
        this.total = 0;
        this.render();
        document.getElementById('cart-total').textContent = '$0.00';
    }
};

// Make cart globally accessible for Console exercises
window.cart = cart;

// ===========================================
// Closure Example for console.dir() exercise
// ===========================================

/**
 * Creates a discount calculator with a closure
 * Students will use console.dir() to inspect the [[Scopes]]
 * 
 * @param {number} discountRate - Discount percentage (0.2 = 20% off)
 * @returns {function} Calculator function
 */
function createDiscountCalculator(discountRate) {
    // This variable is "closed over" - students can see it in [[Scopes]]
    const rate = discountRate;
    const createdAt = new Date().toISOString();
    let usageCount = 0;

    return function calculateDiscount(originalPrice) {
        usageCount++; // Tracks how many times the closure was used
        console.log(`Discount calculator used ${usageCount} time(s)`);
        return originalPrice * (1 - rate);
    };
}

// Make globally accessible
window.createDiscountCalculator = createDiscountCalculator;

// ===========================================
// Event Listener Setup
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    // Add click handlers to all "Add to Cart" buttons
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const name = e.target.dataset.name;
            const price = e.target.dataset.price;
            cart.addItem(name, price);
        });
    });

    // Clear cart button
    document.getElementById('clear-cart').addEventListener('click', () => {
        cart.clear();
    });

    // Test closure button
    document.getElementById('test-closure').addEventListener('click', () => {
        const calc = createDiscountCalculator(0.15);
        console.log('Created discount calculator with 15% rate');
        console.log('Try: console.dir(calc) to see the closure scope');
        console.log('Then call: calc(100) to get discounted price');
        window.testCalc = calc; // Make accessible in console
    });

    // ===========================================
    // Memory Leak Simulation
    // This button adds duplicate event listeners (a common bug)
    // Students will use getEventListeners($0) to find them
    // ===========================================
    document.getElementById('add-listeners').addEventListener('click', () => {
        /*
         * BUG: This adds NEW listeners every time the button is clicked
         * without removing old ones. This is a memory leak!
         * 
         * Students should:
         * 1. Click this button multiple times
         * 2. Select a .add-btn in Elements panel
         * 3. Run: getEventListeners($0)
         * 4. See the growing list of click handlers
         */
        document.querySelectorAll('.add-btn').forEach(button => {
            // PROBLEM: Adding listeners without checking if they exist
            button.addEventListener('click', () => {
                console.log('Extra listener fired!');
            });
        });

        console.warn('Added more event listeners! Use getEventListeners($0) on a button to see the leak.');
        
        /*
         * SOLUTION: Use a flag or remove listener before adding
         * 
         * Option 1: Use { once: true } for one-time listeners
         * button.addEventListener('click', handler, { once: true });
         * 
         * Option 2: Store and remove previous listener
         * if (button._extraListener) {
         *     button.removeEventListener('click', button._extraListener);
         * }
         * button._extraListener = () => console.log('Extra listener fired!');
         * button.addEventListener('click', button._extraListener);
         * 
         * Option 3: Use AbortController
         * const controller = new AbortController();
         * button.addEventListener('click', handler, { signal: controller.signal });
         * // Later: controller.abort() removes the listener
         */
    });
});

// ===========================================
// Console Tips - Run these in the Console!
// ===========================================

console.log('%c🛒 Shopping Cart Debug Exercise', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%c────────────────────────────────', 'color: #667eea;');
console.log('');
console.log('%cTry these commands:', 'font-weight: bold;');
console.log('');
console.log('  %c1. Live Expressions (click 👁️ icon):', 'color: #333;');
console.log('     cart.items.length');
console.log('     cart.total');
console.log('');
console.log('  %c2. Monitor function calls:', 'color: #333;');
console.log('     monitor(cart.addItem)');
console.log('     // Then add items and watch the console');
console.log('');
console.log('  %c3. Find all CartItem instances:', 'color: #333;');
console.log('     queryObjects(CartItem)');
console.log('');
console.log('  %c4. Check event listeners (select element first):', 'color: #333;');
console.log('     getEventListeners($0)');
console.log('');
console.log('  %c5. Inspect closure scope:', 'color: #333;');
console.log('     const calc = createDiscountCalculator(0.2)');
console.log('     console.dir(calc)');
console.log('');
console.log('%c────────────────────────────────', 'color: #667eea;');

/*
 * ===========================================
 * SOLUTIONS SUMMARY
 * ===========================================
 * 
 * Bug #1 - calculateTotal():
 *   Problem: Not multiplying price by quantity
 *   Solution: return sum + (item.price * item.quantity)
 * 
 * Bug #2 - Event Listener Leak:
 *   Problem: "Add Many Listeners" keeps adding handlers
 *   Solution: Use AbortController, { once: true }, or track/remove listeners
 * 
 * How to Debug:
 *   - Use Live Expressions to watch cart.total vs expected value
 *   - Use monitor(cart.calculateTotal) to see when it's called
 *   - Use getEventListeners($0) to see listener accumulation
 *   - Use queryObjects(CartItem) to track object count
 */

