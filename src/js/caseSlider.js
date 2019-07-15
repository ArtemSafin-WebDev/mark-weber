import Swiper from 'swiper/dist/js/swiper.js';

export default function() {
    const caseSliderItems = Array.from(document.querySelectorAll('.js-case-details-image-slider'));

    caseSliderItems.forEach(item => {
        const sliderContainer = item.querySelector('.swiper-container');

        const caseSlider = new Swiper(sliderContainer, {
            slidesPerView: 'auto',
            spaceBetween: 30,
            breakpoints: {
                568: {
                    spaceBetween: 20
                }
            }
        });
    });
}
