class App {
    constructor() {
        this.cards = [];
        this.initializeElements();
        this.attachEventListeners();
        this.loadCardsFromStorage();
    }

    initializeElements() {
        this.addCardBtn = document.getElementById('addCardBtn');
        this.addCardModal = document.getElementById('addCardModal');
        this.addCardForm = document.getElementById('addCardForm');
        this.cardsContainer = document.getElementById('cardsContainer');
        this.addMilestoneBtn = document.getElementById('addMilestoneBtn');
        this.milestonesContainer = document.getElementById('milestonesContainer');
        this.cancelAddCardBtn = document.getElementById('cancelAddCard');
    }

    attachEventListeners() {
        this.addCardBtn.addEventListener('click', () => this.showModal());
        this.cancelAddCardBtn.addEventListener('click', () => this.hideModal());
        this.addCardForm.addEventListener('submit', (e) => this.handleAddCard(e));
        this.addMilestoneBtn.addEventListener('click', () => this.addMilestoneInput());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === this.addCardModal) {
                this.hideModal();
            }
        });
    }

    showModal() {
        this.addCardModal.style.display = 'block';
        this.milestonesContainer.innerHTML = '';
        this.addMilestoneInput(); // Add first milestone input by default
    }

    hideModal() {
        this.addCardModal.style.display = 'none';
        this.addCardForm.reset();
    }

    addMilestoneInput() {
        const milestoneDiv = document.createElement('div');
        milestoneDiv.className = 'milestone-input';
        milestoneDiv.innerHTML = `
            <input type="text" class="milestone-name" placeholder="Milestone name" required>
            <input type="date" class="milestone-date" required>
            <button type="button" class="btn btn-danger remove-milestone">×</button>
        `;

        milestoneDiv.querySelector('.remove-milestone').addEventListener('click', () => {
            milestoneDiv.remove();
        });

        this.milestonesContainer.appendChild(milestoneDiv);
    }

    handleAddCard(e) {
        e.preventDefault();

        const title = document.getElementById('cardTitle').value;
        const deadline = document.getElementById('cardDeadline').value;
        const color = document.getElementById('cardColor').value;

        const milestones = Array.from(this.milestonesContainer.getElementsByClassName('milestone-input'))
            .map(input => {
                return new Milestone(
                    input.querySelector('.milestone-name').value,
                    input.querySelector('.milestone-date').value
                );
            });

        const card = new Card(title, deadline, color, milestones);
        this.cards.push(card);
        this.renderCards();
        this.saveCards();
        this.hideModal();
    }

    renderCards() {
        this.cardsContainer.innerHTML = '';
        this.cards.forEach(card => {
            this.cardsContainer.appendChild(card.render());
        });
    }

    deleteCard(cardId) {
        this.cards = this.cards.filter(card => card.id !== cardId);
        this.renderCards();
        this.saveCards();
    }

    editCard(cardId) {
        // Implementation for editing cards
        console.log('Edit card:', cardId);
    }

    saveCards() {
        Utils.saveToLocalStorage('cards', this.cards);
    }

    loadCardsFromStorage() {
        const savedCards = Utils.getFromLocalStorage('cards');
        if (savedCards) {
            this.cards = savedCards.map(cardData => {
                const card = new Card(
                    cardData.title,
                    cardData.deadline,
                    cardData.color,
                    cardData.milestones.map(m => new Milestone(m.name, m.targetDate))
                );
                return card;
            });
            this.renderCards();
        }
    }
}

// Initialize the application
window.addEventListener('DOMContentLoaded', () => {
    window.app = new App();
});

// Global functions for card actions
window.deleteCard = (cardId) => window.app.deleteCard(cardId);
window.editCard = (cardId) => window.app.editCard(cardId);