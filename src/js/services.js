import { TweenMax, Power0 } from 'gsap/TweenMax';

export default function() {
    const services = document.querySelector('.services');

    if (services) {
        //// Устанавливаем высоту слайдера услуг на реальную высоту экрана устройства (хак для мобилок)

        function setSliderMinHeight() {
            services.style.minHeight = document.documentElement.clientHeight + 'px';
        }

        function removeSliderMinHeight() {
            services.style.minHeight = '';
        }

        function checkWidthAndSetHeight() {
            if (window.matchMedia('(max-width: 768px)').matches) {
                setSliderMinHeight();
            } else {
                removeSliderMinHeight();
            }
        }

        checkWidthAndSetHeight();

        //// Ссылки-переключатели

        const navigationLinks = Array.from(document.querySelectorAll('.js-services-navigation-link'));

        //// Определяется изначально активная ссылка по наличию класса .active, в ином случае изначально активной ссылкой считается первая

        let activeLink =
            navigationLinks.find(element => {
                if (element.classList.contains('active')) {
                    return element;
                } else {
                    return false;
                }
            }) || navigationLinks[0];

        let activeLinkIndex = navigationLinks.indexOf(activeLink);
        let oldActiveLinkIndex = null;

        navigationLinks.forEach(link => {
            if (link === activeLink) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        //// Устанавливаем изначально активные слайды

        const descriptionSlides = Array.from(document.querySelectorAll('.js-services-description-slide'));
        let activeDescriptionSlide = null;

        const slidesTransitionHandler = function() {
            const self = this;
            self.style.cssText = '';
            self.removeEventListener('transitionend', slidesTransitionHandler);
        };

        const setActiveDescriptionSlides = index => {
            if (!activeDescriptionSlide) {
                descriptionSlides.forEach((slide, slideIndex) => {
                    if (slideIndex === index) {
                        slide.classList.add('active');
                        activeDescriptionSlide = slide;
                    } else {
                        slide.classList.remove('active');
                    }
                });
            } else {
                const previousActiveDescriptionSlide = activeDescriptionSlide;
                const newActiveDescriptionSlide = descriptionSlides[index];
                console.log(previousActiveDescriptionSlide);
                console.log(newActiveDescriptionSlide);

                activeDescriptionSlide = newActiveDescriptionSlide;
                if (!window.matchMedia('(max-width: 768px)').matches) {
                    if (oldActiveLinkIndex && oldActiveLinkIndex > index) {
                        // Направление вверх

                        newActiveDescriptionSlide.classList.add('active');
                        previousActiveDescriptionSlide.classList.remove('active');
                        TweenMax.set(newActiveDescriptionSlide, { clearProps: 'all' });
                        TweenMax.set(previousActiveDescriptionSlide, { clearProps: 'all' });

                        //// Анимируем активный слайд
                        TweenMax.from(newActiveDescriptionSlide, 0.2, { y: newActiveDescriptionSlide.offsetHeight, ease: Power0.easeNone, clearProps: 'all' });

                        //// Анимируем предыдущий активный слайд
                        TweenMax.to(previousActiveDescriptionSlide, 0.2, { y: -1 * newActiveDescriptionSlide.offsetHeight, ease: Power0.easeNone, clearProps: 'all' });
                    } else {
                        // Направление вниз

                        newActiveDescriptionSlide.classList.add('active');
                        previousActiveDescriptionSlide.classList.remove('active');
                        TweenMax.set(newActiveDescriptionSlide, { clearProps: 'all' });
                        TweenMax.set(previousActiveDescriptionSlide, { clearProps: 'all' });

                        //// Анимируем активный слайд
                        TweenMax.from(newActiveDescriptionSlide, 0.2, { y: -1 * newActiveDescriptionSlide.offsetHeight, ease: Power0.easeNone, clearProps: 'all' });

                        //// Анимируем предыдущий активный слайд
                        TweenMax.to(previousActiveDescriptionSlide, 0.2, { y: newActiveDescriptionSlide.offsetHeight, ease: Power0.easeNone, clearProps: 'all' });
                    }
                } else {
                    // На мобильной ширине появление аккордеонами

                    newActiveDescriptionSlide.classList.add('active');
                    previousActiveDescriptionSlide.classList.remove('active');

                    //// Раскрываем аккоредоном новый слайд

                    TweenMax.set(newActiveDescriptionSlide, { clearProps: 'all' });
                    TweenMax.set(newActiveDescriptionSlide, { height: 'auto' });
                    TweenMax.from(newActiveDescriptionSlide, 0.2, { height: 0 });

                    //// Закрываем аккордеоном старый слайд

                    TweenMax.set(previousActiveDescriptionSlide, { height: 'auto' });
                    TweenMax.to(previousActiveDescriptionSlide, 0.2, { height: 0 });
                }
            }
        };

        //// Видео слайды

        const videoSlides = Array.from(document.querySelectorAll('.js-services-video-slide'));
        let activeVideoSlide = null;

        const setActiveVideoSlides = index => {
            if (!activeVideoSlide) {
                videoSlides.forEach((slide, slideIndex) => {
                    if (slideIndex === index) {
                        slide.classList.add('active');
                    } else {
                        slide.classList.remove('active');
                    }
                });
            } else {
                const previousVideoSlide = activeVideoSlide;
                const newVideoSlide = videoSlides[index];
                previousVideoSlide.classList.remove('active');
                newVideoSlide.classList.add('active');
                activeVideoSlide = newVideoSlide;
            }
        };

        setActiveDescriptionSlides(activeLinkIndex);
        setActiveVideoSlides(activeLinkIndex);

        const setActiveLink = (element, index) => {
            const previousActiveLink = activeLink;
            const newActiveLink = element;
            previousActiveLink.classList.remove('active');
            newActiveLink.classList.add('active');
            activeLink = newActiveLink;
            oldActiveLinkIndex = activeLinkIndex;
            activeLinkIndex = index;
            setActiveDescriptionSlides(activeLinkIndex);
            setActiveVideoSlides(activeLinkIndex);
        };

        const prevButton = document.querySelector('.js-services-prev');
        const nextButton = document.querySelector('.js-services-next');

        prevButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (activeLinkIndex > 0) {
                const link = navigationLinks[activeLinkIndex - 1];
                const index = navigationLinks.indexOf(link);
                setActiveLink(link, index);
            } else {
                const link = navigationLinks[navigationLinks.length - 1];
                const index = navigationLinks.length - 1;
                setActiveLink(link, index);
            }
        });

        nextButton.addEventListener('click', function(event) {
            event.preventDefault();
            if (activeLinkIndex + 1 < navigationLinks.length) {
                const link = navigationLinks[activeLinkIndex + 1];
                const index = navigationLinks.indexOf(link);
                setActiveLink(link, index);
            } else {
                const link = navigationLinks[0];
                const index = 0;
                setActiveLink(link, index);
            }
        });

        navigationLinks.forEach((link, index) => {
            link.addEventListener('click', event => {
                event.preventDefault();
                if (link === activeLink) {
                    return false;
                }
                setActiveLink(link, index);
            });
        });
    }
}
