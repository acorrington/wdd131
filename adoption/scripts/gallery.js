document.addEventListener('DOMContentLoaded', () => {
    let allPets = [];
    let currentPage = 1;
    const petsPerPage = 6;

    // Get current page from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    if (pageParam) {
        currentPage = parseInt(pageParam) || 1;
    }

    fetch('pets.json')
        .then(response => response.json())
        .then(pets => {
            allPets = pets;
            displayPets(currentPage);
            setupPagination();
        })
        .catch(error => console.error('Error loading pets:', error));

    function displayPets(page) {
        const gallery = document.getElementById('pet-gallery');
        gallery.innerHTML = ''; // Clear existing content

        const startIndex = (page - 1) * petsPerPage;
        const endIndex = startIndex + petsPerPage;
        const petsToShow = allPets.slice(startIndex, endIndex);

        petsToShow.forEach(pet => {
            const petCard = document.createElement('div');
            petCard.classList.add('pet-card');
            petCard.innerHTML = `
                <img src="images/pet${pet.id}.jpg" alt="${pet.name}" loading="lazy">
                <h3>${pet.name}</h3>
                <p>${pet.breed} - ${pet.age} years old</p>
                <a href="details.html?id=${pet.id}">Learn More</a>
            `;
            gallery.appendChild(petCard);
        });
    }

    function setupPagination() {
        const totalPages = Math.ceil(allPets.length / petsPerPage);
        const paginationContainer = document.getElementById('pagination') || createPaginationContainer();
        
        paginationContainer.innerHTML = '';

        // Previous button
        if (currentPage > 1) {
            const prevLink = document.createElement('a');
            prevLink.href = `?page=${currentPage - 1}`;
            prevLink.textContent = '<< Previous';
            prevLink.classList.add('pagination-link', 'prev-link');
            prevLink.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToPage(currentPage - 1);
            });
            paginationContainer.appendChild(prevLink);
        }

        // Page info
        const pageInfo = document.createElement('span');
        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
        pageInfo.classList.add('page-info');
        paginationContainer.appendChild(pageInfo);

        // Next button
        if (currentPage < totalPages) {
            const nextLink = document.createElement('a');
            nextLink.href = `?page=${currentPage + 1}`;
            nextLink.textContent = 'Next >>';
            nextLink.classList.add('pagination-link', 'next-link');
            nextLink.addEventListener('click', (e) => {
                e.preventDefault();
                navigateToPage(currentPage + 1);
            });
            paginationContainer.appendChild(nextLink);
        }
    }

    function createPaginationContainer() {
        const container = document.createElement('div');
        container.id = 'pagination';
        container.classList.add('pagination-container');
        
        // Insert after the gallery
        const gallery = document.getElementById('pet-gallery');
        gallery.parentNode.insertBefore(container, gallery.nextSibling);
        
        return container;
    }

    function navigateToPage(page) {
        currentPage = page;
        displayPets(currentPage);
        setupPagination();
        
        // Update URL without reloading page
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('page', page);
        window.history.pushState({}, '', newUrl);
        
        // Scroll to the very top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
});

