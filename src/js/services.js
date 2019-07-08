import { TweenMax, Power0 } from 'gsap/TweenMax';

export default function() {
    const services = document.querySelector('.services');

    if (services) {
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

        console.log('activeLink', activeLink);
        console.log('activeLinkIndex', activeLinkIndex);

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
                // newActiveDescriptionSlide.classList.add('active');
                activeDescriptionSlide = newActiveDescriptionSlide;
                // previousActiveDescriptionSlide.classList.remove('active');
                if (oldActiveLinkIndex && oldActiveLinkIndex > index) {
                    if (!window.matchMedia('(max-width: 768px)').matches) {
                        // Направление вверх

                        newActiveDescriptionSlide.classList.add('active');
                        previousActiveDescriptionSlide.classList.remove('active');

                        //// Анимируем активный слайд
                        TweenMax.from(newActiveDescriptionSlide, 0.2, { y: newActiveDescriptionSlide.offsetHeight, ease: Power0.easeNone, clearProps: 'all' });

                        //// Анимируем предыдущий активный слайд
                        TweenMax.to(previousActiveDescriptionSlide, 0.2, { y: -1 * newActiveDescriptionSlide.offsetHeight, ease: Power0.easeNone, clearProps: 'all' });
                    } else {
                        // На мобильной ширине появление аккордеонами

                        newActiveDescriptionSlide.classList.add('active');
                        previousActiveDescriptionSlide.classList.remove('active');

                        //// Раскрываем аккоредоном новый слайд

                        TweenMax.set(newActiveDescriptionSlide, { clearProps: 'all' });
                        TweenMax.set(newActiveDescriptionSlide, { height: 'auto' });
                        TweenMax.from(newActiveDescriptionSlide, 0.2, { height: 0 });

                        //// Закрываем аккордеоном старый слайд

                        TweenMax.to(previousActiveDescriptionSlide, 0.2, { height: 0 });
                    }
                } else {
                    if (!window.matchMedia('(max-width: 768px)').matches) {
                        // Направление вниз

                        newActiveDescriptionSlide.classList.add('active');
                        previousActiveDescriptionSlide.classList.remove('active');

                        //// Анимируем активный слайд
                        TweenMax.from(newActiveDescriptionSlide, 0.2, { y: -1 * newActiveDescriptionSlide.offsetHeight, ease: Power0.easeNone, clearProps: 'all' });

                        //// Анимируем предыдущий активный слайд
                        TweenMax.to(previousActiveDescriptionSlide, 0.2, { y: newActiveDescriptionSlide.offsetHeight, ease: Power0.easeNone, clearProps: 'all' });
                    } else {
                        // На мобильной ширине появление аккордеонами

                        newActiveDescriptionSlide.classList.add('active');
                        previousActiveDescriptionSlide.classList.remove('active');

                        //// Раскрываем аккоредоном новый слайд

                        TweenMax.set(newActiveDescriptionSlide, { clearProps: 'all' });
                        TweenMax.set(newActiveDescriptionSlide, { height: 'auto' });
                        TweenMax.from(newActiveDescriptionSlide, 0.2, { height: 0 });

                        //// Закрываем аккордеоном старый слайд

                        TweenMax.to(previousActiveDescriptionSlide, 0.2, { height: 0 });
                    }
                }
            }
        };

        setActiveDescriptionSlides(activeLinkIndex);

        const setActiveLink = (element, index) => {
            const previousActiveLink = activeLink;
            const newActiveLink = element;
            previousActiveLink.classList.remove('active');
            newActiveLink.classList.add('active');
            activeLink = newActiveLink;
            oldActiveLinkIndex = activeLinkIndex;
            activeLinkIndex = index;
            setActiveDescriptionSlides(activeLinkIndex);
        };

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
