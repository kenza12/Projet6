async function fetchBestMovie() {
    /**
   * Récupère les informations du meilleur film en se basant sur le score IMDb.
   * La fonction fait une requête API pour obtenir une liste de films, considère le premier film comme le meilleur,
   * et appelle une autre fonction pour obtenir plus de détails sur ce film.
   * Gère également les erreurs de réseau et de réponse.
   */
  try {
    // Récupère la première page des films triés par score IMDb
    const response = await fetch('http://localhost:8000/api/v1/titles/?sort_by=-imdb_score');
    if (!response.ok) {
      throw new Error('Network response was not ok.'); // Lance une erreur si la réponse du réseau n'est pas correcte
    }
    const data = await response.json(); // Convertit la réponse en JSON
    console.log('Récupération des données de films:', data);
    const bestMovie = data.results[0]; // Sélectionne le premier film, considéré comme le meilleur
    fetchMovieDetails(bestMovie.id); // Appel à une autre fonction pour obtenir les détails du meilleur film
  } catch (error) {
    console.error('Erreur lors de la récupération du meilleur film:', error); // Gère les erreurs potentielles
  }
}

async function fetchMovieDetails(movieId) {
  /**
   * Récupère et affiche les détails d'un film spécifique en utilisant son ID.
   * La fonction fait une requête API pour obtenir les détails complets du film,
   * puis appelle une fonction d'affichage pour présenter ces détails dans l'UI.
   * Gère les erreurs potentielles liées à la requête API.
   *
   * param {number} movieId - L'identifiant unique du film dont on souhaite obtenir les détails.
   */
  try {
    const response = await fetch(`http://localhost:8000/api/v1/titles/${movieId}`); // Récupère les détails du film via l'ID
    const movieDetails = await response.json(); // Convertit la réponse en JSON
    console.log('Détails du meilleur film:', movieDetails);
    displayBestMovie(movieDetails); // Appelle une fonction pour afficher les détails du film
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du film:', error); // Gère les erreurs
  }
}

function displayBestMovie(movie) {
/**
 * Affiche les détails du meilleur film dans l'interface utilisateur.
 * Met à jour les éléments du DOM avec les informations du film, telles que l'image, le titre, le résumé, etc.
 * Gère également l'événement de clic pour un bouton, si présent.
 *
 * param {Object} movie - Un objet contenant les détails du film à afficher.
 */
  // Sélectionne les éléments du DOM pour l'affichage
  const imgElement = document.getElementById('best-movie-img');
  const titleElement = document.getElementById('best-movie-title');
  const summaryElement = document.getElementById('best-movie-summary');
  const buttonElement = document.getElementById('best-movie-btn');

  // Met à jour les éléments du DOM avec les données du film
  imgElement.src = movie.image_url;
  imgElement.alt = `Image de ${movie.title}`;
  titleElement.textContent = movie.title;
  summaryElement.textContent = movie.description ? movie.description : 'Résumé non disponible';
  
  buttonElement.onclick = function() {
    // Gestionnaire d'événement pour le clic sur le bouton (exemple de redirection ou ouverture d'un modal)
  };
  
  // Affiche les éléments avec les informations du film
  imgElement.style.display = 'block';
  titleElement.style.display = 'block';
  summaryElement.style.display = 'block';
  buttonElement.style.display = 'block';
}






async function fetchTopRatedMovies() {
/**
 * Récupère une liste des films les mieux notés et les affiche.
 * Fait des requêtes API successives pour récupérer une liste de films jusqu'à atteindre un nombre spécifique.
 * Exclut le meilleur film déjà affiché et initialise le carrousel pour afficher ces films.
 * Gère également les erreurs de requête API.
 */

  let topRatedMovies = [];
  let url = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
  try {
    while (topRatedMovies.length < 7 && url) {
      const response = await fetch(url); // Récupère une page de films
      const data = await response.json(); // Convertit en JSON
      console.log('Récupération des données de films les mieux notés:', data);
      topRatedMovies = topRatedMovies.concat(data.results); // Ajoute les films au tableau
      url = data.next; // Met à jour l'URL pour la prochaine page
    }
    topRatedMovies = topRatedMovies.slice(1, 8); // Exclut le meilleur film déjà affiché
    displayTopRatedMovies(topRatedMovies); // Appelle la fonction pour afficher les films
    initializeCarousel(); // Initialise le carrousel
  } catch (error) {
    console.error('Erreur lors de la récupération des films les mieux notés:', error); // Gère les erreurs
  }
}


function displayTopRatedMovies(movies) {
/**
 * Affiche les films les mieux notés dans un carrousel.
 * Crée et ajoute des éléments du DOM pour chaque film dans le carrousel.
 * Utilise des images et des titres pour représenter chaque film.
 *
 * param {Array} movies - Un tableau d'objets film, chacun contenant des informations sur un film.
 */

  const carouselTrack = document.querySelector('.carousel-track'); // Sélection du Carousel
  carouselTrack.innerHTML = ''; // Nettoie le contenu actuel du carrousel

  // Création dynamique de contenu: boucle sur chaque film de l'objet movie dans le tableau movies
  movies.forEach((movie, index) => {
    console.log(`Affichage du film: ${movie.title}`);
    const movieElement = document.createElement('li'); // Crée un élément pour chaque film
    movieElement.classList.add('carousel-slide'); // Ajoute la classe pour le style

    // injection du contenu HTML
    movieElement.innerHTML = `
      <img src="${movie.image_url}" alt="${movie.title}" class="movie-image">
      <h4>${movie.title}</h4>
    `;

    carouselTrack.appendChild(movieElement); // Ajoute l'élément au carrousel
  });
}


function initializeCarousel() {
/**
 * Initialise le carrousel des films avec des boutons de navigation.
 * Ajoute des écouteurs d'événements sur les boutons précédent et suivant pour permettre la navigation dans le carrousel.
 * Gère l'index de la diapositive actuelle pour la navigation dans le carrousel.
 */

  const carouselTrack = document.querySelector('.carousel-track');
  const prevButton = document.querySelector('.prev-btn');
  const nextButton = document.querySelector('.next-btn');
  let currentSlideIndex = 0;

  carouselTrack.setAttribute('data-slide-index', currentSlideIndex); // Initialise l'index de la diapositive

  nextButton.addEventListener('click', () => {
    moveCarousel(carouselTrack, 'next'); // Ajoute un écouteur d'événement pour le bouton suivant
  });

  prevButton.addEventListener('click', () => {
    moveCarousel(carouselTrack, 'prev'); // Ajoute un écouteur d'événement pour le bouton précédent
  });
  console.log('Initialisation du carrousel avec les boutons de navigation.');
}


function moveCarousel(carouselTrack, direction) {
/**
 * Gère le déplacement du carrousel de films dans une direction spécifiée.
 * Calcule la nouvelle position du carrousel en fonction de la direction et de l'index de la diapositive actuelle.
 * Met à jour l'attribut de l'index de la diapositive et applique une transformation CSS pour le défilement.
 *
 * param {Element} carouselTrack - L'élément du DOM représentant la piste du carrousel.
 * param {string} direction - La direction du déplacement ('next' ou 'prev').
 */

const slide = carouselTrack.querySelector('.carousel-slide');
const slideWidth = slide.offsetWidth; // Largeur d'une diapositive
const slideMarginRight = parseInt(window.getComputedStyle(slide).marginRight); // Marge droite d'une diapositive

const moveWidth = slideWidth + slideMarginRight; // Inclut la marge dans le calcul de déplacement

const maxSlideIndex = carouselTrack.childElementCount - 4; // Calcule l'index maximum pour le défilement
let currentSlideIndex = parseInt(carouselTrack.getAttribute('data-slide-index')) || 0; // Obtient l'index actuel

if (direction === 'next' && currentSlideIndex < maxSlideIndex) {
  currentSlideIndex++; // Incrémente l'index pour le défilement suivant
} else if (direction === 'prev' && currentSlideIndex > 0) {
  currentSlideIndex--; // Décrémente l'index pour le défilement précédent
}

carouselTrack.setAttribute('data-slide-index', currentSlideIndex.toString()); // Met à jour l'index de la diapositive
carouselTrack.style.transform = `translateX(-${currentSlideIndex * moveWidth}px)`; // Applique la transformation pour le défilement
}







async function fetchTopRatedActionMovies() {
    let topRatedActionMovies = [];
    let url = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action';
    try {
        while (topRatedActionMovies.length < 7 && url) {
            const response = await fetch(url);
            const data = await response.json();
            topRatedActionMovies = topRatedActionMovies.concat(data.results);
            url = data.next;
        }
        topRatedActionMovies = topRatedActionMovies.slice(0, 7);
        displayTopRatedMovies(topRatedActionMovies, 'action-carousel-track');
    } catch (error) {
        console.error('Erreur lors de la récupération des films d\'action les mieux notés:', error);
    }
}

