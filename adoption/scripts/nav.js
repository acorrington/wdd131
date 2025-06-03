document.addEventListener('DOMContentLoaded', () => {
    const hamburgerButton = document.querySelector('.hamburger-button');
    const navList = document.querySelector('.nav-list');

    hamburgerButton.addEventListener('click', () => {
        navList.classList.toggle('open');
        const isExpanded = navList.classList.contains('open');
        hamburgerButton.setAttribute('aria-expanded', isExpanded);
        hamburgerButton.querySelector('.hamburger-icon').textContent = isExpanded ? '✖' : '☰';
    });

    // Close the menu when a nav link is clicked
    navList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            navList.classList.remove('open');
            hamburgerButton.setAttribute('aria-expanded', 'false');
            hamburgerButton.querySelector('.hamburger-icon').textContent = '☰';
        }
    });
});