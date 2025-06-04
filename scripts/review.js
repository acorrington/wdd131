document.addEventListener('DOMContentLoaded', () => {
    let reviewCount = Number(JSON.parse(localStorage.getItem('review-count') || '0'));
    reviewCount++;
    const reviewCountElement = document.getElementById('review-count');
    reviewCountElement.textContent = reviewCount;
    localStorage.setItem('review-count', JSON.stringify(reviewCount));  
});