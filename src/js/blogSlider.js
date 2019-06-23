import Swiper from 'swiper/dist/js/swiper.js'

export default function() {
    new Swiper(document.querySelector('.js-blog-slider'), {
        slidesPerView: 'auto',
        spaceBetween: 30
    })
}