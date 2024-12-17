class Milestone {
    constructor(name, targetDate) {
        this.id = Date.now().toString();
        this.name = name;
        this.targetDate = new Date(targetDate);
        this.completed = false;
        this.createdAt = new Date();
    }

    calculateProgress() {
        if (this.completed) return 100;
        
        const now = new Date();
        const total = this.targetDate - this.createdAt;
        const elapsed = now - this.createdAt;
        return Math.min(Math.max((elapsed / total) * 100, 0), 100);
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
} 