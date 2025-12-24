/**
 * Sources Panel - Advanced Exercise
 * 
 * This file contains scenarios for practicing advanced debugging:
 * - Conditional Breakpoints
 * - Logpoints
 * - XHR/Fetch Breakpoints
 * - Event Listener Breakpoints
 * - DOM Breakpoints
 * - Blackboxing (see utils.js)
 */

// ===========================================
// User Data Store
// ===========================================
let users = [];
let processedCount = 0;

// ===========================================
// Simulated API
// ===========================================

/**
 * Fetch users from "API"
 * Use XHR Breakpoints panel to pause when this endpoint is called
 */
async function fetchUsers() {
    log('Fetching users from API...');
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Return mock data
    return [
        { id: 1, name: 'Alice Johnson', role: 'user', score: 85 },
        { id: 2, name: 'Bob Smith', role: 'admin', score: 120 },
        { id: 3, name: 'Charlie Brown', role: 'user', score: 65 },
        { id: 4, name: 'Diana Prince', role: 'admin', score: 95 },
        { id: 5, name: 'Error User', role: 'user', score: -10 }, // Problematic user
        { id: 6, name: 'Frank Castle', role: 'user', score: 150 },
        { id: 7, name: 'Grace Hopper', role: 'admin', score: 200 },
        { id: 11, name: 'Admin Eleven', role: 'admin', score: 180 }, // Bug: admin with id > 10
        { id: 12, name: 'Admin Twelve', role: 'admin', score: 190 }, // Bug: admin with id > 10
    ];
}

/**
 * Simulated failing API call
 * Use to test XHR breakpoints for error scenarios
 */
async function fetchUsersFailing() {
    log('Attempting to fetch from failing endpoint...');
    
    await new Promise(resolve => setTimeout(resolve, 300));
    
    throw new Error('API Error: Endpoint /api/users/fail not found');
}

// ===========================================
// User Processing Functions
// ===========================================

/**
 * Process a single user
 * 
 * EXERCISE: Set a conditional breakpoint here with conditions like:
 *   user.id === 5
 *   user.role === 'admin'
 *   user.score > 100
 *   user.name.includes('Error')
 */
function processUser(user) {
    // Line 67: Great place for a conditional breakpoint!
    log(`Processing user: ${user.name}`);
    
    // Use Utils library (try blackboxing utils.js to skip over this)
    const clonedUser = Utils.deepClone(user);
    
    // Calculate bonus based on role and score
    clonedUser.bonus = calculateBonus(clonedUser);
    clonedUser.processed = true;
    clonedUser.processedAt = new Date().toISOString();
    
    return clonedUser;
}

/**
 * Calculate bonus for a user
 * 
 * EXERCISE: Add logpoints here to log values without pausing
 * Example logpoint: "Calculating bonus for", user.name, "score:", user.score
 * 
 * BUG: Admin users with ID > 10 get incorrect bonus calculation!
 */
function calculateBonus(user) {
    let bonus = 0;
    
    // Base bonus from score
    bonus = user.score * 0.1;
    
    // Role multiplier
    if (user.role === 'admin') {
        /*
         * BUG: This condition has a logic error!
         * It should apply 2x multiplier to ALL admins,
         * but accidentally excludes admins with id > 10
         */
        if (user.id < 10) { // PROBLEM: Excludes admin IDs >= 10
            bonus *= 2;
        }
        // SOLUTION: Remove the id check entirely, or change to:
        // bonus *= 2; // Apply to all admins regardless of ID
    }
    
    // Penalty for negative scores
    if (user.score < 0) {
        bonus = 0;
        log(`Warning: User ${user.name} has negative score!`);
    }
    
    return bonus;
}

/**
 * Process all users
 */
async function processAllUsers() {
    log('Processing all users...');
    processedCount = 0;
    
    for (const user of users) {
        if (!user.processed) {
            const processed = processUser(user);
            // Update in array
            const index = users.findIndex(u => u.id === user.id);
            users[index] = processed;
            processedCount++;
        }
    }
    
    log(`Processed ${processedCount} users`);
    renderUsers();
}

// ===========================================
// UI Functions
// ===========================================

/**
 * Render users to the DOM
 * 
 * EXERCISE: Set a DOM breakpoint on #user-list with "subtree modifications"
 * to pause whenever this function modifies the list
 */
function renderUsers() {
    const container = document.getElementById('user-list');
    
    if (users.length === 0) {
        container.innerHTML = '<p style="color: #666;">No users loaded</p>';
        return;
    }
    
    // This modification will trigger DOM breakpoints
    container.innerHTML = users.map(user => `
        <div class="user-item ${user.role === 'admin' ? 'admin' : ''} ${user.score < 0 ? 'error' : ''}">
            <div class="user-info">
                <span class="user-name">${user.name}</span>
                <span class="user-role">${user.role} | Score: ${user.score}</span>
            </div>
            <span class="user-bonus">${user.processed ? Utils.formatCurrency(user.bonus) : 'Not processed'}</span>
        </div>
    `).join('');
}

/**
 * Log to the output panel
 */
function log(message) {
    const output = document.getElementById('output');
    const timestamp = new Date().toLocaleTimeString();
    output.textContent += `[${timestamp}] ${message}\n`;
    output.scrollTop = output.scrollHeight;
    console.log(message);
}

/**
 * Clear the output panel
 */
function clearOutput() {
    document.getElementById('output').textContent = '';
}

// ===========================================
// Event Handlers
// ===========================================

document.addEventListener('DOMContentLoaded', () => {
    
    // Load Users button
    document.getElementById('load-users').addEventListener('click', async () => {
        try {
            clearOutput();
            users = await fetchUsers();
            log(`Loaded ${users.length} users`);
            renderUsers();
        } catch (error) {
            log(`Error: ${error.message}`);
        }
    });
    
    // Process All button
    document.getElementById('process-all').addEventListener('click', () => {
        if (users.length === 0) {
            log('No users to process. Load users first.');
            return;
        }
        processAllUsers();
    });
    
    // Clear button
    document.getElementById('clear-users').addEventListener('click', () => {
        users = [];
        processedCount = 0;
        clearOutput();
        renderUsers();
        log('Cleared all users');
    });
    
    // Search input (for keydown event breakpoints)
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('keydown', (e) => {
        // Line 211: Set Event Listener Breakpoint → Keyboard → keydown
        console.log('Key pressed:', e.key);
    });
    
    // Search button
    document.getElementById('search-btn').addEventListener('click', () => {
        const query = searchInput.value.toLowerCase();
        const filtered = users.filter(u => 
            u.name.toLowerCase().includes(query)
        );
        log(`Found ${filtered.length} users matching "${query}"`);
    });
    
    // Secret Action button
    // EXERCISE: Use Event Listener Breakpoints → Mouse → click
    // to find this handler without knowing where it is!
    document.getElementById('secret-action').addEventListener('click', () => {
        // This is the secret handler you need to find!
        performSecretAction();
    });
    
    // Trigger Error button
    document.getElementById('trigger-error').addEventListener('click', async () => {
        try {
            await fetchUsersFailing();
        } catch (error) {
            log(`Caught error: ${error.message}`);
        }
    });
    
    // Modify DOM button (for DOM breakpoints)
    document.getElementById('modify-dom').addEventListener('click', () => {
        const list = document.getElementById('user-list');
        const div = document.createElement('div');
        div.className = 'user-item';
        div.innerHTML = `
            <div class="user-info">
                <span class="user-name">Dynamically Added</span>
                <span class="user-role">DOM modification test</span>
            </div>
            <span class="user-bonus">$0.00</span>
        `;
        list.appendChild(div);
        log('Added element to DOM (should trigger DOM breakpoint)');
    });
    
    // Form submission
    document.getElementById('add-user-form').addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const newUser = {
            id: users.length + 100,
            name: formData.get('name'),
            role: formData.get('role'),
            score: parseInt(formData.get('score'), 10)
        };
        
        users.push(newUser);
        log(`Added new user: ${newUser.name}`);
        renderUsers();
        e.target.reset();
    });
});

/**
 * Secret function that students need to find using Event Listener Breakpoints
 */
function performSecretAction() {
    log('🎉 You found the secret action!');
    log('Great job using Event Listener Breakpoints!');
    
    // Add some visual feedback
    const btn = document.getElementById('secret-action');
    btn.style.background = 'linear-gradient(135deg, #00d9ff 0%, #00ff88 100%)';
    setTimeout(() => {
        btn.style.background = '';
    }, 1000);
}

// ===========================================
// Console startup message
// ===========================================
console.log('%c🔍 Sources Panel Advanced Exercise', 'font-size: 18px; font-weight: bold; color: #00d9ff;');
console.log('%c──────────────────────────────────', 'color: #00d9ff;');
console.log('');
console.log('%cDebugging Techniques to Practice:', 'font-weight: bold;');
console.log('');
console.log('1. Conditional Breakpoints: processUser function (line ~67)');
console.log('2. Logpoints: calculateBonus function');
console.log('3. XHR Breakpoints: Add "users" as URL pattern');
console.log('4. Event Listener Breakpoints: Mouse → click');
console.log('5. DOM Breakpoints: #user-list → subtree modifications');
console.log('6. Blackboxing: Right-click utils.js → Add to ignore list');
console.log('');
console.log('%c──────────────────────────────────', 'color: #00d9ff;');

/*
 * ===========================================
 * SOLUTIONS SUMMARY
 * ===========================================
 * 
 * Bug Location: calculateBonus function
 * 
 * Problem: 
 *   Admin users with ID >= 10 don't get the 2x bonus multiplier
 *   because of the condition: if (user.id < 10)
 * 
 * How to Find:
 *   1. Set conditional breakpoint: user.role === 'admin' && user.id > 10
 *   2. Click "Process All"
 *   3. Observe that bonus calculation skips the 2x multiplier
 *   
 * Solution:
 *   Remove the ID check, change:
 *     if (user.id < 10) { bonus *= 2; }
 *   To:
 *     bonus *= 2;
 *   
 *   The admin bonus should apply to ALL admins regardless of their ID.
 */

