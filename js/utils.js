const Utils = {
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    calculateDaysRemaining(targetDate) {
        const now = new Date();
        const target = new Date(targetDate);
        const diff = target - now;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    },

    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    saveToLocalStorage(key, data) {
        localStorage.setItem(key, JSON.stringify(data));
    },

    getFromLocalStorage(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
}; 