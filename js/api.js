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

const url = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score';
fetchMovies(url, '.carousel-track');
}

async function fetchMovies(url, carouselId) {
let movies = [];
try {
  while (movies.length < 7 && url) {
    const response = await fetch(url); // Récupère une page de films
    const data = await response.json(); // Convertit en JSON
    console.log('Récupération des données de films les mieux notés:', data);
    movies = movies.concat(data.results); // Ajoute les films au tableau
    url = data.next; // Met à jour l'URL pour la prochaine page
  }
  movies = movies.slice(1, 8); // Exclut le meilleur film déjà affiché
  displayMovies(movies, carouselId) // Appelle la fonction pour afficher les films
  initializeCarousel(carouselId); // Initialise le carrousel
} catch (error) {
  console.error('Erreur lors de la récupération des films les mieux notés:', error); // Gère les erreurs
}
}

function displayMovies(movies, carouselId) {

  const carouselTrack = document.querySelector(carouselId); // Sélection du Carousel pour l'injection du JS
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

  // Ajoute l'élément au carrousel
  carouselTrack.appendChild(movieElement);
  });
}

async function fetchTopRatedActionMovies() {
  const url = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action';
  fetchMovies(url, '.carousel-action-track');
}

async function fetchTopRatedComedyMovies() {
  const url = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&genre=Comedy';
  fetchMovies(url, '.carousel-comedy-track');
}
