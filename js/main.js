// Écoute l'événement 'DOMContentLoaded' pour s'assurer que le contenu de la page est chargé avant d'exécuter les scripts.
window.addEventListener('DOMContentLoaded', (event) => {
  // Appelle des fonctions pour récupérer et afficher les films.
  fetchBestMovie();
  fetchTopRatedMovies();
  fetchTopRatedActionMovies();
  fetchTopRatedComedyMovies();
  fetchTopRatedDramaMovies();

  // Attache un gestionnaire d'événements à chaque conteneur de carrousel pour détecter les clics sur les images des films.
  document.querySelectorAll('.carousel-track-container').forEach(container => {
    container.addEventListener('click', event => {
      // Vérifie si l'élément cliqué ou l'un de ses parents est une image de film
      const imgElement = event.target.closest('.carousel-slide img');
      if (imgElement) {
        // Récupère l'ID du film et ouvre la modale pour afficher les détails du film.
        const movieId = imgElement.getAttribute('data-movie-id');
        openModal(movieId);
      }
    });
  });

  // Attache un gestionnaire d'événements à l'image du meilleur film pour ouvrir la modale lorsqu'elle est cliquée.
  document.getElementById('best-movie-img').addEventListener('click', () => {
    // Récupère l'ID du meilleur film stocké dans l'attribut du bouton et ouvre la modale.
    const bestMovieId = document.getElementById('best-movie-btn').getAttribute('data-movie-id');
    if (bestMovieId) {
        openModal(bestMovieId);
    }
  });

  // Attache un gestionnaire d'événements au bouton du meilleur film pour ouvrir la modale lorsqu'il est cliqué.
  document.getElementById('best-movie-btn').addEventListener('click', function() {
    const movieId = this.getAttribute('data-movie-id');
    openModal(movieId);
  });

  // Attache des gestionnaires d'événements aux boutons de fermeture de la modale pour masquer la modale lorsqu'ils sont cliqués.
  const closeModalButtons = document.querySelectorAll('.close-modal');
  closeModalButtons.forEach(button => {
      button.addEventListener('click', function() {
          const modal = document.getElementById('movie-modal');
          if (modal) {
              modal.style.display = 'none';
          }
      });
  });
});

// Configure les boutons de navigation du carrousel (précédent et suivant) pour chaque carrousel.
function setupCarouselButtons(carouselId, prevButtonClass, nextButtonClass) {
  // Sélectionne les boutons et attache des gestionnaires d'événements
  const nextButton = document.querySelector(nextButtonClass);
  const prevButton = document.querySelector(prevButtonClass);

  // Déplace le carrousel vers la droite lorsqu'on clique sur le bouton suivant.
  nextButton.addEventListener('click', () => {
    moveCarousel('next', carouselId);
  });

  // Déplace le carrousel vers la gauche lorsqu'on clique sur le bouton précédent.
  prevButton.addEventListener('click', () => {
    moveCarousel('prev', carouselId);
  });
}

// Déplace le carrousel dans une direction spécifiée (précédente ou suivante).
function moveCarousel(direction, carouselId) {
  // Sélectionne le carrousel en utilisant son identifiant et calcule la largeur d'une seule diapositive.
  const carouselTrack = document.querySelector(carouselId);
  const slideWidth = carouselTrack.querySelector('.carousel-slide').offsetWidth;

  // Calcule le nombre maximum d'index de diapositive en fonction du nombre d'éléments enfants moins le nombre de diapositives visibles à la fois.
  const maxSlideIndex = carouselTrack.childElementCount - 4; // 4 est le nombre de diapositives visibles en même temps.

  // Récupère l'index de la diapositive actuelle, avec une valeur par défaut de 0 si non défini.
  let currentSlideIndex = parseInt(carouselTrack.getAttribute('data-slide-index')) || 0;

  // Incrémente ou décrémente l'index de la diapositive en fonction de la direction, tout en s'assurant de rester dans les limites valides.
  if (direction === 'next' && currentSlideIndex < maxSlideIndex) {
    currentSlideIndex++;
  } else if (direction === 'prev' && currentSlideIndex > 0) {
    currentSlideIndex--;
  }

  // Met à jour l'attribut 'data-slide-index' du carrousel avec le nouvel index de diapositive.
  carouselTrack.setAttribute('data-slide-index', currentSlideIndex.toString());

  // Déplace le carrousel pour afficher la diapositive actuelle en utilisant une transformation CSS.
  carouselTrack.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}

// Cette fonction est appelée à la fin de fetchMovies pour initialiser les carrousels.
function initializeCarousel(carouselId) {
  // Configure les boutons de navigation du carrousel en fonction de son type (top-rated, action, comedy, drama).
  if (carouselId === '.carousel-track') {
    setupCarouselButtons(carouselId, '.top-rated-prev', '.top-rated-next'); // Configuration des boutons pour les films les mieux notés.
  } else if (carouselId === '.carousel-action-track') {
    setupCarouselButtons(carouselId, '.action-prev', '.action-next'); // Configuration des boutons pour les films d'action.
  } else if (carouselId === '.carousel-comedy-track') {
    setupCarouselButtons(carouselId, '.comedy-prev', '.comedy-next'); // Configuration des boutons pour les films comiques.
  } else if (carouselId === '.carousel-drama-track') {
    setupCarouselButtons(carouselId, '.drama-prev', '.drama-next'); // Configuration des boutons pour les films dramatiques.
  }
}
