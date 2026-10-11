var MainPageManager = /** @class */ (function () {
    function MainPageManager() {
        this.teamMembers = [
            { name: 'President', role: 'Core Team' },
            { name: 'President', role: 'Core Team' },
            { name: 'President', role: 'Core Team' },
            { name: 'President', role: 'Core Team' }
        ];
        this.faculty = [
            { name: 'Dr. Dipa Dharmadhikari', role: 'Professor CSE' },
            { name: 'Dr. Dipa Dharmadhikari', role: 'Professor CSE' }
        ];
        this.snapshots = [
            '../gallery image 3.jpg',
            '../gallery image 4.jpg',
            '../gallery image 5.jpg'
        ];
        this.initiatives = [
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
        this.init();
    }
    MainPageManager.prototype.init = function () {
        this.renderTeam();
        this.renderFaculty();
        this.renderSnapshots();
        this.renderInitiatives();
        this.setupContactForm();
    };
    MainPageManager.prototype.renderTeam = function () {
        var grid = document.getElementById('teamGrid');
        if (!grid)
            return;
        this.teamMembers.forEach(function (member) {
            var card = document.createElement('div');
            card.className = 'team-card';
            card.innerHTML = "\n                <div class=\"team-image\">\n                    <img src=\"../Untitled66_20240112123845 1@3x.png\" alt=\"".concat(member.name, "\">\n                </div>\n                <div class=\"team-info\">\n                    <h3 class=\"team-name\">").concat(member.name, "</h3>\n                    <p class=\"team-role\">").concat(member.role, "</p>\n                </div>\n            ");
            grid.appendChild(card);
        });
    };
    MainPageManager.prototype.renderFaculty = function () {
        var grid = document.getElementById('facultyGrid');
        if (!grid)
            return;
        this.faculty.forEach(function (member) {
            var card = document.createElement('div');
            card.className = 'faculty-card';
            card.innerHTML = "\n                <div class=\"faculty-image\">\n                    <img src=\"../Untitled66_20240112123845 1@3x.png\" alt=\"".concat(member.name, "\">\n                </div>\n                <div class=\"faculty-info\">\n                    <h3>").concat(member.name, "</h3>\n                    <p>").concat(member.role, "</p>\n                </div>\n            ");
            grid.appendChild(card);
        });
    };
    MainPageManager.prototype.renderSnapshots = function () {
        var grid = document.getElementById('snapshotsGrid');
        if (!grid)
            return;
        this.snapshots.forEach(function (src) {
            var item = document.createElement('div');
            item.className = 'snapshot-item';
            item.innerHTML = "<img src=\"".concat(src, "\" alt=\"Snapshot\">");
            grid.appendChild(item);
        });
    };
    MainPageManager.prototype.renderInitiatives = function () {
        var grid = document.getElementById('initiativesGrid');
        if (!grid)
            return;
        this.initiatives.forEach(function (init) {
            var card = document.createElement('div');
            card.className = 'initiative-card';
            card.innerHTML = "\n                <div class=\"initiative-image\">\n                    <img src=\"".concat(init.image, "\" alt=\"").concat(init.title, "\">\n                </div>\n                <div class=\"initiative-content\">\n                    <h3>").concat(init.title, "</h3>\n                    <p>").concat(init.desc, "</p>\n                </div>\n            ");
            grid.appendChild(card);
        });
    };
    MainPageManager.prototype.setupContactForm = function () {
        var form = document.getElementById('contactForm');
        if (!form)
            return;
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you! We will get back to you soon.');
            form.reset();
        });
    };
    return MainPageManager;
}());
document.addEventListener('DOMContentLoaded', function () {
    new MainPageManager();
});
