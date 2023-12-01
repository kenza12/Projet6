window.addEventListener('DOMContentLoaded', (event) => {
  fetchBestMovie();
  fetchTopRatedMovies();
  fetchTopRatedActionMovies();
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
  }
}