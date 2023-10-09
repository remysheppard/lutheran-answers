let slideIndex = 0;
let timer;
const slides = document.getElementsByClassName("mySlides");
const prevButton = document.querySelector("#prevButton"); // Replace with the actual ID of your previous button
const nextButton = document.querySelector("#nextButton"); // Replace with the actual ID of your next button

// Initialize the slideshow
showSlides();

// Function to start the slideshow
function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].style.display = "flex";
  timer = setTimeout(showSlides, 5500);
}

// Add event listeners to pause and resume the slideshow on mouse enter and leave
let carouselContainer = document.querySelector(".slideshow-container"); // Replace with the actual ID of your carousel container

carouselContainer.addEventListener("mouseenter", pauseSlideshow);
carouselContainer.addEventListener("mouseleave", resumeSlideshow);

// Function to pause the slideshow
function pauseSlideshow() {
  clearTimeout(timer);
}

// Function to resume the slideshow
function resumeSlideshow() {
  timer = setTimeout(showSlides, 5500);
}

// Add event listeners for next and previous buttons
prevButton.addEventListener("click", () => {
  changeSlide(-1);
});

nextButton.addEventListener("click", () => {
  changeSlide(1);
});

// Function to change the slide
function changeSlide(direction) {
  slideIndex += direction;
  if (slideIndex < 1) {
    slideIndex = slides.length;
  } else if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}