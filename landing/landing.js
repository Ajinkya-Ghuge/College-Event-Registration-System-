"use strict";
class LandingPage {
    constructor() {
        this.teamMembers = [
            { name: "John Doe", role: "President", photo: "../Untitled66_20240112123845 1@3x.png" },
            { name: "Jane Smith", role: "Vice President", photo: "../Untitled66_20240112123845 1@3x.png" },
            { name: "Mike Johnson", role: "Technical Head", photo: "../Untitled66_20240112123845 1@3x.png" },
            { name: "Sarah Williams", role: "Event Coordinator", photo: "../Untitled66_20240112123845 1@3x.png" }
        ];
        this.faculty = [
            { name: "Dr. Dipa Dharmadhikari", role: "Professor CSE", photo: "../Untitled66_20240112123845 1@3x.png" },
            { name: "Dr. Rajesh Kumar", role: "Associate Professor", photo: "../Untitled66_20240112123845 1@3x.png" }
        ];
        this.snapshots = [
            "../gallery image 1.jpg",
            "../gallery image 2.jpg",
            "../gallery image 3.jpg"
        ];
        this.initiatives = [
            {
                title: "Tech Workshops",
                description: "Regular workshops on latest technologies and industry trends.",
                image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop"
            },
            {
                title: "Hackathons",
                description: "Competitive coding events to showcase innovation and problem-solving skills.",
                image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop"
            },
            {
                title: "Community Events",
                description: "Social gatherings and networking opportunities for students.",
                image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=300&fit=crop"
            }
        ];
    }
    renderTeam() {
        const teamGrid = document.getElementById('teamGrid');
        if (!teamGrid)
            return;
        this.teamMembers.forEach(member => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `
                <img src="${member.photo}" alt="${member.name}" class="team-photo">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
            `;
            teamGrid.appendChild(card);
        });
    }
    renderFaculty() {
        const facultyGrid = document.getElementById('facultyGrid');
        if (!facultyGrid)
            return;
        this.faculty.forEach(member => {
            const card = document.createElement('div');
            card.className = 'faculty-card';
            card.innerHTML = `
                <img src="${member.photo}" alt="${member.name}" class="faculty-photo">
                <h3>${member.name}</h3>
                <p>${member.role}</p>
            `;
            facultyGrid.appendChild(card);
        });
    }
    renderSnapshots() {
        const snapshotsGrid = document.getElementById('snapshotsGrid');
        if (!snapshotsGrid)
            return;
        this.snapshots.forEach(image => {
            const card = document.createElement('div');
            card.className = 'snapshot-card';
            card.innerHTML = `<img src="${image}" alt="Snapshot">`;
            snapshotsGrid.appendChild(card);
        });
    }
    renderInitiatives() {
        const initiativesGrid = document.getElementById('initiativesGrid');
        if (!initiativesGrid)
            return;
        this.initiatives.forEach(initiative => {
            const card = document.createElement('div');
            card.className = 'initiative-card';
            card.innerHTML = `
                <img src="${initiative.image}" alt="${initiative.title}" class="initiative-image">
                <div class="initiative-content">
                    <h3>${initiative.title}</h3>
                    <p>${initiative.description}</p>
                    <button class="btn btn-primary">Learn More</button>
                </div>
            `;
            initiativesGrid.appendChild(card);
        });
    }
    setupContactForm() {
        const form = document.getElementById('contactForm');
        if (!form)
            return;
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
        });
    }
    init() {
        this.renderTeam();
        this.renderFaculty();
        this.renderSnapshots();
        this.renderInitiatives();
        this.setupContactForm();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const landingPage = new LandingPage();
    landingPage.init();
});
