window.addEventListener('DOMContentLoaded', (event) => {
  fetchBestMovie();
  fetchTopRatedMovies();
  fetchTopRatedActionMovies();
});

function setupCarouselButtons() {
  const nextButton = document.querySelector('.next-btn');
  const prevButton = document.querySelector('.prev-btn');

  nextButton.addEventListener('click', () => {
    moveCarousel('next');
  });

  prevButton.addEventListener('click', () => {
    moveCarousel('prev');
  });
}

function moveCarousel(direction) {
  const carouselTrack = document.querySelector('.carousel-track');
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

// Call this function at the end of fetchTopRatedMovies
function initializeCarousel() {
  setupCarouselButtons(); // Setup buttons after carousel is loaded
}
