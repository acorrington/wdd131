const nav = document.querySelector('nav');

const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
});

const navLinks = document.querySelectorAll('.nav-link');
console.log(navLinks);
navLinks.forEach(navLink => {
    navLink.addEventListener('click', () => {
        if (nav.classList.contains('active')) {
            nav.classList.toggle('active');
        }
    });
});

const temples = [
    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    {
        templeName: "Salt Lake City Utah",
        location: "Salt Lake City, Utah, United States",
        dedicated: "1893, April, 6",
        area: 382207,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669.jpg"
    },
    {
        templeName: "Provo City Center Utah",
        location: "Provo, Utah, United States",
        dedicated: "2016, March, 20",
        area: 85084,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/provo-city-center-temple/provo-city-center-temple-56386-main.jpg"
    },
    {
        templeName: "Rome Italy",
        location: "Rome, Italy",
        dedicated: "2019, March, 10",
        area: 41010,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
    },
    {
        templeName: "Tucson Arizona",
        location: "Tucson, Arizona, United States",
        dedicated: "2017, August, 13",
        area: 38216,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/tucson-arizona-temple/tucson-arizona-temple-8384-main.jpg"
    },
    {
        templeName: "Fort Collins Colorado",
        location: "Fort Collins, Colorado, United States",
        dedicated: "2016, October, 16",
        area: 42000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/fort-collins-colorado-temple/fort-collins-colorado-temple-50577-main.jpg"
    },
    {
        templeName: "Lisbon Portugal",
        location: "Lisbon, Portugal",
        dedicated: "2019, September, 15",
        area: 23730,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/lisbon-portugal-temple/lisbon-portugal-temple-6315-main.jpg"
    },
    {
        templeName: "San Diego California",
        location: "San Diego, California, United States",
        dedicated: "1993, June, 25",
        area: 72000,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/san-diego-california-temple/san-diego-california-temple-9060-main.jpg"
    },
    {
        templeName: "Anchorage Alaska",
        location: "Anchorage, Alaska, United States",
        dedicated: "1998, December, 29",
        area: 11937,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/anchorage-alaska-temple/anchorage-alaska-temple-57454-main.jpg"
    },
    {
        templeName: "Baton Rouge Louisiana",
        location: "Baton Rouge, Louisiana, United States",
        dedicated: "2019, November, 17",
        area: 10890,
        imageUrl:
            "https://churchofjesuschristtemples.org/assets/img/temples/baton-rouge-louisiana-temple/baton-rouge-louisiana-temple-7146-main.jpg"
    }
];

document.addEventListener('DOMContentLoaded', function () {
    displayTemplesByHashtag();
});

window.addEventListener('hashchange', function (event) {
    const url = new URL(window.location.href);
    let hashtag = url.hash;
    if (hashtag.startsWith('#')) {
        hashtag = hashtag.substring(1); // Remove the '#' character
    }
    displayTemplesByHashtag(hashtag);
});

function displayTemplesByHashtag(hashtag) {
    let filteredTemples = []
    let templListTitle = document.getElementById('temple-list-title');

    switch (hashtag) {
        case 'old':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year <= 1900;
            });

            templListTitle.textContent = 'Old Temples (Before 1900)';
            break;
        case 'new':
            filteredTemples = temples.filter(temple => {
                const year = parseInt(temple.dedicated.split(',')[0]);
                return year >= 2000;
            });

            templListTitle.textContent = 'New Temples (After 2000)';
            break;
        case 'large':
            filteredTemples = temples.filter(temple => temple.area >= 90000);
            templListTitle.textContent = 'Large Temples (Area > 90,000 sq ft)';
            break;
        case 'small':
            filteredTemples = temples.filter(temple => temple.area <= 10000);
            templListTitle.textContent = 'Small Temples (Area < 10,000 sq ft)';
            break;
        default:
            filteredTemples = temples; // No filter applied, show all temples
            templListTitle.textContent = 'All Temples';
            break;
    }

    displayTemples(filteredTemples);
}

// Function to display all temples
function displayTemples(temples = []) {
    const templeList = document.getElementById('temple-list');
    templeList.innerHTML = ''; // Clear existing content
    temples.forEach(temple => {
        const templeCard = createTempleCard(temple);
        templeList.appendChild(templeCard);
    });
}

// Function to create a temple card
function createTempleCard(temple) {
    const card = document.createElement('div');
    card.className = 'temple-card';

    const img = document.createElement('img');
    img.src = temple.imageUrl;
    img.alt = `${temple.templeName} Temple`;
    img.className = 'temple-image';
    img.loading = 'lazy';

    const name = document.createElement('h2');
    name.textContent = temple.templeName;

    const location = document.createElement('p');
    location.textContent = `Location: ${temple.location}`;

    const dedicated = document.createElement('p');
    dedicated.textContent = `Dedicated: ${temple.dedicated}`;

    const area = document.createElement('p');
    area.textContent = `Area: ${temple.area} sq ft`;

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);

    return card;
}





