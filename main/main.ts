class MainPageManager {
    private teamMembers = [
        { name: 'President', role: 'Core Team' },
        { name: 'President', role: 'Core Team' },
        { name: 'President', role: 'Core Team' },
        { name: 'President', role: 'Core Team' }
    ];

    private faculty = [
        { name: 'Dr. Dipa Dharmadhikari', role: 'Professor CSE' },
        { name: 'Dr. Dipa Dharmadhikari', role: 'Professor CSE' }
    ];

    private snapshots = [
        '../gallery image 3.jpg',
        '../gallery image 4.jpg',
        '../gallery image 5.jpg'
    ];

    private initiatives = [
        { 
            image: '../gallary image 1.jpg', 
            title: 'Workshop Series', 
            desc: 'Regular technical workshops to enhance skills and knowledge.' 
        },
        { 
            image: '../gallery image 2.jpg', 
            title: 'Hackathons', 
            desc: 'Competitive coding events for innovation and creativity.' 
        },
        { 
            image: '../gallery image 3.jpg', 
            title: 'Community Events', 
            desc: 'Social and networking events to build connections.' 
        }
    ];

    constructor() {
        this.init();
    }

    private init(): void {
        this.renderTeam();
        this.renderFaculty();
        this.renderSnapshots();
        this.renderInitiatives();
        this.setupContactForm();
    }

    private renderTeam(): void {
        const grid = document.getElementById('teamGrid');
        if (!grid) return;

        this.teamMembers.forEach(member => {
            const card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = `
                <div class="team-image">
                    <img src="../Untitled66_20240112123845 1@3x.png" alt="${member.name}">
                </div>
                <div class="team-info">
                    <h3 class="team-name">${member.name}</h3>
                    <p class="team-role">${member.role}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    private renderFaculty(): void {
        const grid = document.getElementById('facultyGrid');
        if (!grid) return;

        this.faculty.forEach(member => {
            const card = document.createElement('div');
            card.className = 'faculty-card';
            card.innerHTML = `
                <div class="faculty-image">
                    <img src="../Untitled66_20240112123845 1@3x.png" alt="${member.name}">
                </div>
                <div class="faculty-info">
                    <h3>${member.name}</h3>
                    <p>${member.role}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    private renderSnapshots(): void {
        const grid = document.getElementById('snapshotsGrid');
        if (!grid) return;

        this.snapshots.forEach(src => {
            const item = document.createElement('div');
            item.className = 'snapshot-item';
            item.innerHTML = `<img src="${src}" alt="Snapshot">`;
            grid.appendChild(item);
        });
    }

    private renderInitiatives(): void {
        const grid = document.getElementById('initiativesGrid');
        if (!grid) return;

        this.initiatives.forEach(init => {
            const card = document.createElement('div');
            card.className = 'initiative-card';
            card.innerHTML = `
                <div class="initiative-image">
                    <img src="${init.image}" alt="${init.title}">
                </div>
                <div class="initiative-content">
                    <h3>${init.title}</h3>
                    <p>${init.desc}</p>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    private setupContactForm(): void {
        const form = document.getElementById('contactForm') as HTMLFormElement;
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you! We will get back to you soon.');
            form.reset();
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new MainPageManager();
});
