/**
 * UTILITY LIBRARY (Simulated Third-Party Code)
 * 
 * This file simulates a third-party library that you would typically
 * want to "blackbox" when debugging - meaning the debugger will skip
 * over these functions when stepping through code.
 * 
 * EXERCISE: 
 * 1. Right-click this file in Sources panel
 * 2. Select "Add script to ignore list" (or "Blackbox script")
 * 3. Now stepping through code will skip over these functions
 */

// Simulated library namespace
const Utils = {
    /**
     * Format a number as currency
     * When debugging, you don't want to step INTO this function
     */
    formatCurrency(amount) {
        // Lots of internal logic you don't care about when debugging
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        });
        return formatter.format(amount);
    },

    /**
     * Deep clone an object
     * Another utility function to skip over
     */
    deepClone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        if (Array.isArray(obj)) {
            return obj.map(item => Utils.deepClone(item));
        }
        const cloned = {};
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                cloned[key] = Utils.deepClone(obj[key]);
            }
        }
        return cloned;
    },

    /**
     * Debounce a function
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Generate a unique ID
     */
    generateId() {
        return 'id_' + Math.random().toString(36).substr(2, 9);
    },

    /**
     * Validate email format
     */
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    /**
     * Format a date
     */
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    /**
     * Calculate percentage
     */
    calculatePercentage(value, total) {
        if (total === 0) return 0;
        return Math.round((value / total) * 100);
    },

    /**
     * Truncate text with ellipsis
     */
    truncate(text, maxLength) {
        if (text.length <= maxLength) return text;
        return text.slice(0, maxLength - 3) + '...';
    }
};

// Make globally available
window.Utils = Utils;

console.log('%c📦 Utils library loaded (try blackboxing this file!)', 'color: #888;');

