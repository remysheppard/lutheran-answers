import Splide from "@splidejs/splide";
// import '@splidejs/splide/css/core';

new Splide( '#image-carousel', {
  type       : 'fade',
  autoplay   : true,
  rewind     : true,
} ).mount();