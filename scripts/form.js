const products = [
    {
        id: "fc-1888",
        name: "flux capacitor",
        averagerating: 4.5
    },
    {
        id: "fc-2050",
        name: "power laces",
        averagerating: 4.7
    },
    {
        id: "fs-1987",
        name: "time circuits",
        averagerating: 3.5
    },
    {
        id: "ac-2000",
        name: "low voltage reactor",
        averagerating: 3.9
    },
    {
        id: "jj-1969",
        name: "warp equalizer",
        averagerating: 5.0
    }
];

document.addEventListener('DOMContentLoaded', () => {
    products.forEach(product => {
        const productOption = document.createElement('option');
        productOption.value = product.id;
        productOption.textContent = `${product.name}`;
        document.getElementById('product').appendChild(productOption);
    });

    const form = document.getElementById('reviewForm');
    const starRating = document.querySelector('.star-rating');

    form.addEventListener('submit', (e) => {
        const selectedRating = document.querySelector('input[name="stars"]:checked');

        if (!selectedRating) {
            e.preventDefault(); // Prevent form submission

            // Remove any existing error message
            const existingError = document.querySelector('.rating-error');
            if (existingError) {
                existingError.remove();
            }

            // Create and display error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'rating-error';
            errorMessage.textContent = 'Please select a star rating before submitting.';
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '0.9rem';
            errorMessage.style.marginTop = '0.5rem';

            // Insert error message after star rating
            starRating.parentNode.insertBefore(errorMessage, starRating.nextSibling);

            // Scroll to the error
            errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Remove error message when user selects a rating
    document.querySelectorAll('input[name="stars"]').forEach(input => {
        input.addEventListener('change', () => {
            const errorMessage = document.querySelector('.rating-error');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
    });
});