class Card {
    constructor(title, deadline, color, milestones = []) {
        this.id = Date.now().toString();
        this.title = title;
        this.deadline = new Date(deadline);
        this.color = color;
        this.milestones = milestones;
        this.createdAt = new Date();
    }

    calculateProgress() {
        const now = new Date();
        const total = this.deadline - this.createdAt;
        const elapsed = now - this.createdAt;
        return Math.min(Math.max((elapsed / total) * 100, 0), 100);
    }

    render() {
        const progress = this.calculateProgress();
        const card = document.createElement('div');
        card.className = 'card';
        card.id = `card-${this.id}`;
        
        card.innerHTML = `
            <div class="card-header" style="border-color: ${this.color}">
                <h3>${this.title}</h3>
                <div class="progress-circle" style="--progress: ${progress}%">
                    <div class="progress-circle-inner">
                        <span>${Math.round(progress)}%</span>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <p>Deadline: ${this.deadline.toLocaleDateString()}</p>
                <div class="milestones-list">
                    ${this.renderMilestones()}
                </div>
            </div>
            <div class="card-footer">
                <button onclick="editCard('${this.id}')" class="btn-edit">Edit</button>
                <button onclick="deleteCard('${this.id}')" class="btn-delete">Delete</button>
            </div>
        `;

        return card;
    }

    renderMilestones() {
        return this.milestones
            .map(milestone => `
                <div class="milestone">
                    <span>${milestone.name}</span>
                    <div class="milestone-progress">
                        <div class="progress-bar" style="width: ${milestone.calculateProgress()}%"></div>
                    </div>
                </div>
            `)
            .join('');
    }
} 