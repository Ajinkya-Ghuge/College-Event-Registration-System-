"use strict";
class EventManager {
    constructor() {
        this.events = [
            {
                id: 1,
                title: "Debate Competition",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
                tags: ["#debate", "#innovation", "#speaking", "#english"],
                date: "20 Feb 2025",
                time: "10:00",
            },
            {
                id: 2,
                title: "Debate Competition",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
                tags: ["#debate", "#innovation", "#speaking", "#english"],
                date: "21 Feb 2025",
                time: "Offline",
            },
            {
                id: 3,
                title: "Debate Competition",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
                tags: ["#debate", "#innovation", "#speaking", "#english"],
                date: "22 Feb 2025",
                time: "Online",
            },
            {
                id: 4,
                title: "Debate Competition",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
                tags: ["#debate", "#innovation", "#speaking", "#english"],
                date: "20 Feb 2025",
                time: "10:00",
            },
            {
                id: 5,
                title: "Debate Competition",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
                tags: ["#debate", "#innovation", "#speaking", "#english"],
                date: "20 Feb 2025",
                time: "Offline",
            },
            {
                id: 6,
                title: "Debate Competition",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
                tags: ["#debate", "#innovation", "#speaking", "#english"],
                date: "20 Feb 2025",
                time: "10:00",
            },
            {
                id: 7,
                title: "Debate Competition",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
                tags: ["#debate", "#innovation", "#speaking", "#english"],
                date: "20 Feb 2025",
                time: "10:00",
            },
            {
                id: 8,
                title: "Debate Competition",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
                tags: ["#debate", "#innovation", "#speaking", "#english"],
                date: "20 Feb 2025",
                time: "10:00",
            },
            {
                id: 9,
                title: "Debate Competition",
                image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=300&fit=crop",
                tags: ["#debate", "#innovation", "#speaking", "#english"],
                date: "20 Feb 2025",
                time: "10:00",
            }
        ];
    }
    createEventCard(event) {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <img src="${event.image}" alt="${event.title}" class="event-image">
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                <div class="event-tags">
                    ${event.tags.map(tag => `<span class="event-tag">${tag}</span>`).join('')}
                </div>
                <div class="event-details">
                    <div class="event-detail">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 8V6h14v2H5z"/>
                        </svg>
                        <span>${event.date}</span>
                    </div>
                    <div class="event-detail">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
                        </svg>
                        <span>${event.time}</span>
                    </div>
                </div>
                <button class="register-btn" data-event-id="${event.id}">Register Now</button>
            </div>
        `;
        return card;
    }
    handleRegistration(eventId) {
        const event = this.events.find(e => e.id === eventId);
        if (event) {
            // Redirect to registration page
            window.location.href = '../registration/index.html';
        }
    }
    init() {
        const eventsGrid = document.getElementById('eventsGrid');
        if (!eventsGrid)
            return;
        this.events.forEach(event => {
            const card = this.createEventCard(event);
            eventsGrid.appendChild(card);
        });
        // Add event listeners for registration buttons
        eventsGrid.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('register-btn')) {
                const eventId = parseInt(target.getAttribute('data-event-id') || '0');
                this.handleRegistration(eventId);
            }
        });
    }
}
// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const eventManager = new EventManager();
    eventManager.init();
});
