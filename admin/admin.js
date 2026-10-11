// Admin Panel JavaScript

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardStats();
    loadEvents();
    loadRegistrations();
    setupEventForm();
    setupImportBackup();
});

// Show Section
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Add active to clicked nav item
    event.currentTarget.classList.add('active');
}

// Load Dashboard Stats
function loadDashboardStats() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    
    const activeEvents = events.filter(e => new Date(e.date) >= new Date()).length;
    const totalRevenue = registrations.reduce((sum, reg) => {
        const event = events.find(e => e.id === reg.eventId);
        return sum + (event ? event.price : 0);
    }, 0);
    
    document.getElementById('totalEvents').textContent = events.length;
    document.getElementById('totalRegistrations').textContent = registrations.length;
    document.getElementById('activeEvents').textContent = activeEvents;
    document.getElementById('totalRevenue').textContent = '₹' + totalRevenue.toLocaleString();
    
    // Load recent registrations
    loadRecentRegistrations();
}

// Load Recent Registrations
function loadRecentRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const tbody = document.querySelector('#recentRegistrationsTable tbody');
    
    if (registrations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="no-data">No registrations yet</td></tr>';
        return;
    }
    
    const recent = registrations.slice(-5).reverse();
    tbody.innerHTML = recent.map(reg => {
        const event = events.find(e => e.id === reg.eventId);
        return `
            <tr>
                <td>${reg.name}</td>
                <td>${reg.email}</td>
                <td>${event ? event.name : 'N/A'}</td>
                <td>${new Date(reg.date).toLocaleDateString()}</td>
                <td><span class="status-badge status-confirmed">Confirmed</span></td>
            </tr>
        `;
    }).join('');
}

// Setup Event Form
function setupEventForm() {
    const form = document.getElementById('addEventForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const event = {
            id: Date.now().toString(),
            name: document.getElementById('eventName').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value,
            price: parseInt(document.getElementById('eventPrice').value),
            capacity: parseInt(document.getElementById('eventCapacity').value),
            category: document.getElementById('eventCategory').value,
            image: document.getElementById('eventImage').value || '../gallery image 1.jpg',
            registered: 0,
            createdAt: new Date().toISOString()
        };
        
        // Get existing events
        const events = JSON.parse(localStorage.getItem('events')) || [];
        events.push(event);
        localStorage.setItem('events', JSON.stringify(events));
        
        // Show success message
        alert('Event created successfully!');
        
        // Reset form
        form.reset();
        
        // Reload events
        loadEvents();
        loadDashboardStats();
        
        // Switch to events section
        showSection('events');
    });
}

// Load Events
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const grid = document.getElementById('eventsGrid');
    
    if (events.length === 0) {
        grid.innerHTML = '<p class="no-data">No events created yet. Click "Add New Event" to get started!</p>';
        return;
    }
    
    grid.innerHTML = events.map(event => `
        <div class="event-card">
            <img src="${event.image}" alt="${event.name}" class="event-image" onerror="this.src='../gallery image 1.jpg'">
            <div class="event-content">
                <h3 class="event-title">${event.name}</h3>
                <div class="event-meta">
                    <span>📅 ${new Date(event.date).toLocaleDateString()} at ${event.time}</span>
                    <span>📍 ${event.location}</span>
                    <span>💰 ₹${event.price}</span>
                    <span>👥 ${event.registered || 0} / ${event.capacity} registered</span>
                    <span>🏷️ ${event.category}</span>
                </div>
                <div class="event-actions">
                    <button class="btn-edit" onclick="editEvent('${event.id}')">Edit</button>
                    <button class="btn-delete" onclick="deleteEvent('${event.id}')">Delete</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Update filter dropdown
    updateEventFilter(events);
}

// Delete Event
function deleteEvent(eventId) {
    if (!confirm('Are you sure you want to delete this event?')) {
        return;
    }
    
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events = events.filter(e => e.id !== eventId);
    localStorage.setItem('events', JSON.stringify(events));
    
    loadEvents();
    loadDashboardStats();
    alert('Event deleted successfully!');
}

// Edit Event (Basic implementation)
function editEvent(eventId) {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const event = events.find(e => e.id === eventId);
    
    if (!event) return;
    
    // Fill form with event data
    document.getElementById('eventName').value = event.name;
    document.getElementById('eventDate').value = event.date;
    document.getElementById('eventTime').value = event.time;
    document.getElementById('eventLocation').value = event.location;
    document.getElementById('eventDescription').value = event.description;
    document.getElementById('eventPrice').value = event.price;
    document.getElementById('eventCapacity').value = event.capacity;
    document.getElementById('eventCategory').value = event.category;
    document.getElementById('eventImage').value = event.image;
    
    // Delete old event (will be recreated on submit)
    deleteEvent(eventId);
    
    // Switch to add event section
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    document.getElementById('add-event').classList.add('active');
}

// Load Registrations
function loadRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const tbody = document.querySelector('#registrationsTable tbody');
    
    if (registrations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="no-data">No registrations found</td></tr>';
        return;
    }
    
    tbody.innerHTML = registrations.map((reg, index) => {
        const event = events.find(e => e.id === reg.eventId);
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${reg.name}</td>
                <td>${reg.email}</td>
                <td>${reg.phone || 'N/A'}</td>
                <td>${event ? event.name : 'N/A'}</td>
                <td>${new Date(reg.date).toLocaleDateString()}</td>
                <td><span class="status-badge status-confirmed">Confirmed</span></td>
                <td>
                    <button class="btn-delete" onclick="deleteRegistration('${reg.id}')">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
}

// Delete Registration
function deleteRegistration(regId) {
    if (!confirm('Are you sure you want to delete this registration?')) {
        return;
    }
    
    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations = registrations.filter(r => r.id !== regId);
    localStorage.setItem('registrations', JSON.stringify(registrations));
    
    loadRegistrations();
    loadDashboardStats();
    alert('Registration deleted successfully!');
}

// Update Event Filter
function updateEventFilter(events) {
    const filter = document.getElementById('filterEvent');
    filter.innerHTML = '<option value="">All Events</option>' + 
        events.map(e => `<option value="${e.id}">${e.name}</option>`).join('');
}

// Export Registrations as CSV
function exportRegistrations() {
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];
    
    if (registrations.length === 0) {
        alert('No registrations to export!');
        return;
    }
    
    let csv = 'ID,Name,Email,Phone,Event,Date,Status\n';
    
    registrations.forEach((reg, index) => {
        const event = events.find(e => e.id === reg.eventId);
        csv += `${index + 1},"${reg.name}","${reg.email}","${reg.phone || 'N/A'}","${event ? event.name : 'N/A'}","${new Date(reg.date).toLocaleDateString()}","Confirmed"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Clear All Data
function clearAllData() {
    if (!confirm('Are you sure? This will delete ALL events and registrations permanently!')) {
        return;
    }
    
    if (!confirm('This action cannot be undone. Are you absolutely sure?')) {
        return;
    }
    
    localStorage.removeItem('events');
    localStorage.removeItem('registrations');
    
    loadDashboardStats();
    loadEvents();
    loadRegistrations();
    
    alert('All data has been cleared!');
}

// Export Backup
function exportBackup() {
    const data = {
        events: JSON.parse(localStorage.getItem('events')) || [],
        registrations: JSON.parse(localStorage.getItem('registrations')) || [],
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ignite_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    
    alert('Backup exported successfully!');
}

// Setup Import Backup
function setupImportBackup() {
    document.getElementById('importFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(event) {
            try {
                const data = JSON.parse(event.target.result);
                
                if (!data.events || !data.registrations) {
                    alert('Invalid backup file!');
                    return;
                }
                
                if (confirm('This will replace all current data. Continue?')) {
                    localStorage.setItem('events', JSON.stringify(data.events));
                    localStorage.setItem('registrations', JSON.stringify(data.registrations));
                    
                    loadDashboardStats();
                    loadEvents();
                    loadRegistrations();
                    
                    alert('Backup imported successfully!');
                }
            } catch (error) {
                alert('Error reading backup file!');
            }
        };
        reader.readAsText(file);
    });
}

// Search Registrations
document.getElementById('searchRegistrations')?.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#registrationsTable tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(searchTerm) ? '' : 'none';
    });
});

// Filter Registrations by Event
document.getElementById('filterEvent')?.addEventListener('change', function(e) {
    const eventId = e.target.value;
    const registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const tbody = document.querySelector('#registrationsTable tbody');
    
    let filtered = eventId ? registrations.filter(r => r.eventId === eventId) : registrations;
    
    if (filtered.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="no-data">No registrations found</td></tr>';
        return;
    }
    
    tbody.innerHTML = filtered.map((reg, index) => {
        const event = events.find(e => e.id === reg.eventId);
        return `
            <tr>
                <td>${index + 1}</td>
                <td>${reg.name}</td>
                <td>${reg.email}</td>
                <td>${reg.phone || 'N/A'}</td>
                <td>${event ? event.name : 'N/A'}</td>
                <td>${new Date(reg.date).toLocaleDateString()}</td>
                <td><span class="status-badge status-confirmed">Confirmed</span></td>
                <td>
                    <button class="btn-delete" onclick="deleteRegistration('${reg.id}')">Delete</button>
                </td>
            </tr>
        `;
    }).join('');
});
