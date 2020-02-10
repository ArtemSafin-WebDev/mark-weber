import Swiper from 'swiper';

export default function() {
    const reviewsSliders = Array.from(document.querySelectorAll('.js-reviews-slider'));

    reviewsSliders.forEach(slider => {
        const container = slider.querySelector('.swiper-container');
        new Swiper(container, {
            watchOverflow: true,
            slidesPerView: 4,
            spaceBetween: 35,
            navigation: {
                nextEl: slider.querySelector('.reviews-slider__arrow-btn--next'),
                prevEl: slider.querySelector('.reviews-slider__arrow-btn--prev')
            },
            breakpoints: {
                1440: {
                    spaceBetween: 30
                },
                1200: {
                    spaceBetween: 25
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20
                },
                800: {
                    slidesPerView: 2
                },
                568: {
                    slidesPerView: 'auto',
                    spaceBetween: 15
                }
            }
        });
    });
}
