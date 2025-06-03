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
              <img src="images/pet${petId}.jpg" alt="${pet.name}" loading="lazy">
              <div>
                <h2>${pet.name}</h2>
                <p><strong>Species:</strong> ${pet.species}</p>
                <p><strong>Breed:</strong> ${pet.breed}</p>
                <p><strong>Age:</strong> ${pet.age} years</p>
                <p><strong>Gender:</strong> ${pet.details.gender}</p>
                <p><strong>Size:</strong> ${pet.details.size}</p>
                <p><strong>Vaccinated:</strong> ${pet.details.vaccinated ? 'Yes' : 'No'}</p>
                <p><strong>Spayed/Neutered:</strong> ${pet.details.spayedNeutered ? 'Yes' : 'No'}</p>
                <p><strong>Temperament:</strong> ${pet.details.temperament}</p>
                <p>${pet.description}</p>
              </div>
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
