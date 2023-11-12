import Splide from "@splidejs/splide";
// import '@splidejs/splide/css/core';

new Splide( '#image-carousel', {
  type       : 'fade',
  autoplay   : true,
  rewind     : true,
} ).mount();

new Splide( '#card-carousel', {
  perPage    : 3,
  breakpoints: {
    640: {
      perPage: 1,
    },
  },
  type       : 'loop',
  autoplay   : true,
  arrows     : false,
  perMove    : 1,
  pagination : false,
} ).mount();