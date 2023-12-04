window.addEventListener('DOMContentLoaded', (event) => {
  fetchBestMovie();
  fetchTopRatedMovies();
  fetchTopRatedActionMovies();
  fetchTopRatedComedyMovies();
  fetchTopRatedDramaMovies();

  // Attache un gestionnaire d'événements à chaque conteneur de carrousel
  document.querySelectorAll('.carousel-track-container').forEach(container => {
    container.addEventListener('click', event => {
      // Vérifie si l'élément cliqué ou l'un de ses parents est une image de film
      const imgElement = event.target.closest('.carousel-slide img');
      if (imgElement) {
        const movieId = imgElement.getAttribute('data-movie-id');
        openModal(movieId);
      }
    });
  });

  // Gestionnaire d'événements pour l'image du meilleur film
  document.getElementById('best-movie-img').addEventListener('click', () => {
    const bestMovieId = document.getElementById('best-movie-btn').getAttribute('data-movie-id');
    if (bestMovieId) {
        openModal(bestMovieId);
    }
  });

  // Gestionnaire d'événements pour le bouton du meilleur film
  document.getElementById('best-movie-btn').addEventListener('click', function() {
    const movieId = this.getAttribute('data-movie-id');
    openModal(movieId);
  });

  // Gestionnaire d'événements pour fermer la modale
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

function setupCarouselButtons(carouselId, prevButtonClass, nextButtonClass) {
  const nextButton = document.querySelector(nextButtonClass);
  const prevButton = document.querySelector(prevButtonClass);

  nextButton.addEventListener('click', () => {
    moveCarousel('next', carouselId);
  });

  prevButton.addEventListener('click', () => {
    moveCarousel('prev', carouselId);
  });
}

function moveCarousel(direction, carouselId) {
  const carouselTrack = document.querySelector(carouselId);
  const slideWidth = carouselTrack.querySelector('.carousel-slide').offsetWidth;
  const maxSlideIndex = carouselTrack.childElementCount - 4; // 4 is the number of slides to show
  let currentSlideIndex = parseInt(carouselTrack.getAttribute('data-slide-index')) || 0;

  if (direction === 'next' && currentSlideIndex < maxSlideIndex) {
    currentSlideIndex++;
  } else if (direction === 'prev' && currentSlideIndex > 0) {
    currentSlideIndex--;
  }

  carouselTrack.setAttribute('data-slide-index', currentSlideIndex.toString());
  carouselTrack.style.transform = `translateX(-${currentSlideIndex * slideWidth}px)`;
}

// Call this function at the end of fetchMovies
function initializeCarousel(carouselId) {
  if (carouselId === '.carousel-track') {
    setupCarouselButtons(carouselId, '.top-rated-prev', '.top-rated-next'); // Setup buttons after carousel is loaded for all top rated movies
  } else if (carouselId === '.carousel-action-track') {
    setupCarouselButtons(carouselId, '.action-prev', '.action-next'); // Setup buttons after carousel is loaded for action top rated movies
  } else if (carouselId === '.carousel-comedy-track') {
    setupCarouselButtons(carouselId, '.comedy-prev', '.comedy-next'); // Setup buttons after carousel is loaded for comedy top rated movies
  } else if (carouselId === '.carousel-drama-track') {
    setupCarouselButtons(carouselId, '.drama-prev', '.drama-next'); // Setup buttons after carousel is loaded for drama top rated movies
  }
}