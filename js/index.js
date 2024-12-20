import { displayGames, displayGameDetails } from './ui.js';

const API_KEY = '5464a69fcfmshebc03758e671032p16b6dfjsn42c446c7a5a3';
const API_HOST = 'free-to-play-games-database.p.rapidapi.com';
const API_URL = 'https://free-to-play-games-database.p.rapidapi.com/api/games';

// Event Handlers
function addCloseDetailsEvent() {
    document.querySelector('.btn-close-details').addEventListener('click', function() {
        document.querySelector("main").classList.remove("d-none");
        document.querySelector(".Details_Games").classList.add("d-none");
    });
}

function addCategoryEvents() {
    const links = document.querySelectorAll(".nav-link");
    for(let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(e) {
            for(let i = 0; i < links.length; i++) {
                links[i].classList.remove('active');
            }
            e.target.classList.add('active');
            const selectedCategory = e.target.getAttribute('data-category');
            if (selectedCategory) {
                document.getElementById("rowGames").innerHTML =`
                    <div class="text-center">
                        <span class="loader"></span>
                    </div>`;
                getData(selectedCategory);
            }
        });
    }
}

//API Functions
function getData(category) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    fetch(`${API_URL}?category=${category}`, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            displayGames(data, getGameDetails);
        })
        .catch(function(error) {
            console.error('Error fetching games:', error);
            document.getElementById("rowGames").innerHTML = `
                <div class="alert alert-danger">
                    Error loading game details. Please try again later.
                </div>
            `;
        });
}

function getGameDetails(gameId) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log("Game Details:", data);
            displayGameDetails(data);
        })
        .catch(function(error) {
            console.error('Error fetching game details:', error);
            document.getElementById("rowDetails").innerHTML = `
                <div class="alert alert-danger">
                    Error loading game details. Please try again later.
                </div>
            `;
        });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 170) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Initialize
function init() {
    addCategoryEvents();
    addCloseDetailsEvent();
    getData('mmorpg');
}
init();
