interface TeamMember {
    name: string;
    role: string;
    image: string;
}

interface TeamSection {
    title: string;
    members: TeamMember[];
}

class TeamManager {
    private teams: TeamSection[] = [
        {
            title: 'Faculty Mentors',
            members: [
                { name: 'Dr. Dipa Dharmadhikari', role: 'Professor CSE', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'The Core',
            members: [
                { name: 'President', role: 'Core Team', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'President', role: 'Core Team', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Technical Team',
            members: [
                { name: 'Member', role: 'Technical', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Technical', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Technical', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Design Team',
            members: [
                { name: 'Member', role: 'Design', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Design', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Design', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Event Team',
            members: [
                { name: 'Member', role: 'Events', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Events', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Events', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Finance Team',
            members: [
                { name: 'Member', role: 'Finance', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Finance', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Finance', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Support Team',
            members: [
                { name: 'Member', role: 'Support', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Support', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Support', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Media Team',
            members: [
                { name: 'Member', role: 'Media', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Media', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Media', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Web Dev Team',
            members: [
                { name: 'Member', role: 'Web Dev', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Web Dev', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Web Dev', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Social media Team',
            members: [
                { name: 'Member', role: 'Social Media', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Social Media', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Social Media', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Marketing Team',
            members: [
                { name: 'Member', role: 'Marketing', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Marketing', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Marketing', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        },
        {
            title: 'Content Team',
            members: [
                { name: 'Member', role: 'Content', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Content', image: '../Untitled66_20240112123845 1@3x.png' },
                { name: 'Member', role: 'Content', image: '../Untitled66_20240112123845 1@3x.png' }
            ]
        }
    ];

    private executives: TeamMember[] = [
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' },
        { name: 'Executive', role: 'Team Member', image: '../Untitled66_20240112123845 1@3x.png' }
    ];

    constructor() {
        this.init();
    }

    private init(): void {
        this.renderTeams();
        this.renderExecutives();
    }

    private createMemberCard(member: TeamMember, isLarge: boolean = false): HTMLElement {
        const card = document.createElement('div');
        card.className = isLarge ? 'team-card large' : 'team-card';
        
        card.innerHTML = `
            <div class="card-image">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="card-info">
                <h3 class="member-name">${member.name}</h3>
                <p class="member-role">${member.role}</p>
            </div>
        `;

        return card;
    }

    private renderTeams(): void {
        const teamsContainer = document.getElementById('teamsContainer');
        if (!teamsContainer) return;

        this.teams.forEach((team, index) => {
            const section = document.createElement('div');
            section.className = 'team-section';

            // Special styling for Faculty Mentors and The Core
            if (index === 0) {
                // Faculty Mentors - single large card centered
                section.innerHTML = `
                    <h2 class="section-title">Faculty <span class="highlight">Mentors</span></h2>
                    <div class="team-grid single">
                        ${team.members.map(member => this.createMemberCard(member, true).outerHTML).join('')}
                    </div>
                `;
            } else if (index === 1) {
                // The Core - 2 cards centered
                section.innerHTML = `
                    <h2 class="section-title">The <span class="highlight">Core</span></h2>
                    <div class="team-grid core">
                        ${team.members.map(member => this.createMemberCard(member, false).outerHTML).join('')}
                    </div>
                `;
            } else {
                // Regular teams - 3 cards per row
                section.innerHTML = `
                    <h2 class="section-title">${team.title}</h2>
                    <div class="team-grid">
                        ${team.members.map(member => this.createMemberCard(member, false).outerHTML).join('')}
                    </div>
                `;
            }

            teamsContainer.appendChild(section);
        });
    }

    private renderExecutives(): void {
        const executivesContainer = document.getElementById('executivesGrid');
        if (!executivesContainer) return;

        this.executives.forEach(member => {
            const card = this.createMemberCard(member, false);
            executivesContainer.appendChild(card);
        });
    }
}

// Initialize the team manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TeamManager();
});
