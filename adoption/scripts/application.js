document.addEventListener('DOMContentLoaded', () => {
    // Get list of submitted applications from local storage
    const applications = JSON.parse(localStorage.getItem('adoptionApplications') || '[]');
    const applicationList = document.getElementById('application-list');
    if (applications.length === 0) {
        applicationList.innerHTML = '<p>No adoption applications submitted yet.</p>';
    } else {
        // Get pet details from pets.json for submitted applications
        fetch('pets.json')
            .then(response => response.json())
            .then(pets => {
                // Map pet IDs to their details for easy lookup
                const petDetailsMap = {};
                pets.forEach(pet => {
                    petDetailsMap[pet.id] = pet;
                });

                // Add pet details to each application
                applications.forEach(app => {
                    const pet = petDetailsMap[app.petId];
                    if (pet) {
                        app.petName = pet.name;
                        app.petBreed = pet.breed;
                        app.image = pet.image;
                    } else {
                        app.petName = 'Unknown';
                        app.petBreed = 'Unknown';
                        app.image = "placeholder.png";
                    }
                });

                // Display applications with pet details
                applicationList.innerHTML = applications.map((app, idx) => `
            <div class="application-card" data-index="${idx}">
                <img src="images/${app.image}" alt="${app.petName}" loading="lazy">
                <div class="application-details">
                    <h3>${app.petName} (${app.petBreed})</h3>
                    <p><strong>Applicant Name:</strong> ${app.name}</p>
                    <p><strong>Email:</strong> ${app.email}</p>
                    <p><strong>Phone:</strong> ${app.phone}</p>
                    <p><strong>Address:</strong> ${app.address}</p>
                    <p><strong>Pet ID:</strong> ${app.petId}</p>
                    <p><strong>Submitted on:</strong> ${new Date(app.timestamp).toLocaleString()}</p>
                </div>
                <div class="application-actions">
                    <a href="#" class="approve-btn" data-index="${idx}">Approve</a>
                    <a href="#" class="reject-btn" data-index="${idx}">Reject</a>
                </div>
            </div>
        `).join('');

            // Add event listeners for Approve/Reject
            applicationList.querySelectorAll('.approve-btn, .reject-btn').forEach(btn => {
                btn.addEventListener('click', function (e) {
                    e.preventDefault();
                    const index = parseInt(this.getAttribute('data-index'));
                    applications.splice(index, 1);
                    localStorage.setItem('adoptionApplications', JSON.stringify(applications));
                    // Remove the card from the DOM
                    this.closest('.application-card').remove();
                    // If no applications left, show message
                    if (applications.length === 0) {
                        applicationList.innerHTML = '<p>No adoption applications submitted yet.</p>';
                    }
                });
            });
        })
        .catch(error => console.error('Error loading pets:', error));
    }
});