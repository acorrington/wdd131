document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const petId = urlParams.get('id');

    fetch('pets.json')
        .then(response => response.json())
        .then(pets => {
            const pet = pets.find(p => p.id === parseInt(petId));
            if (pet) {
                const petDetails = document.getElementById('pet-details');
                petDetails.innerHTML = `
            <div class="pet-details-container">
                <img src="images/${pet.hero}" alt="${pet.name}" loading="lazy">
                <h2>${pet.name}</h2>
                <table class="pet-info-table">
                    <tr>
                        <th>Species</th>
                        <td>${pet.species}</td>
                    </tr>
                    <tr>
                        <th>Breed</th>
                        <td>${pet.breed}</td>
                    </tr>
                    <tr>
                        <th>Age</th>
                        <td>${pet.age} years</td>
                    </tr>
                    <tr>
                        <th>Gender</th>
                        <td>${pet.details.gender}</td>
                    </tr>
                    <tr>
                        <th>Size</th>
                        <td>${pet.details.size}</td>
                    </tr>
                    <tr>
                        <th>Vaccinated</th>
                        <td>${pet.details.spayedNeutered ? 'Yes' : 'No'}/td>
                    </tr>
                    <tr>
                        <th>Spayed/Neutered</th>
                        <td>${pet.details.spayedNeutered ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <th>Temperament</th>
                        <td>${pet.details.temperament}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>${pet.description}</td>
                    </tr>
                </table>
            </div>             
          `;
            } else {
                document.getElementById('pet-details').innerHTML = '<p>Pet not found.</p>';
            }
        })
        .catch(error => console.error('Error loading pet details:', error));

    const form = document.getElementById('adoption-form');
    const confirmation = document.getElementById('confirmation');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const adoptionData = {
            petId: petId,
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            timestamp: new Date().toISOString()
        };

        // Get existing applications or create empty array
        const existingApplications = JSON.parse(localStorage.getItem('adoptionApplications') || '[]');
        
        // Add new application to the array
        existingApplications.push(adoptionData);
        
        // Save updated array back to localStorage
        localStorage.setItem('adoptionApplications', JSON.stringify(existingApplications));

        confirmation.textContent = 'Thank you for your application! We will contact you soon.';
        confirmation.classList.remove('hidden');
        form.reset();
    });
});
