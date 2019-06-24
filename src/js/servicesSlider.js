import { debounce } from 'lodash';

export default function() {
    // Переменные
    const services = document.querySelector('.services');

    if (services) {
        const navigationLinks = Array.from(document.querySelectorAll('.js-services-navigation-link'));
        let activeLink = navigationLinks[0];
        let activeLinkIndex = 0;
        activeLink.parentElement.classList.add('active');

        const descriptionSlides = Array.from(document.querySelectorAll('.js-services-description-slide'));

        let activeDescriptionSlide = descriptionSlides[0];
        activeDescriptionSlide.classList.add('active');

        const videosSlides = Array.from(document.querySelectorAll('.js-services-video-slide'));
        let activeVideoSlide = videosSlides[0];

        const prevButton = document.querySelector('.js-services-prev');
        const nextButton = document.querySelector('.js-services-next');

        // Функции

        function setVideoSlide(index) {
            activeVideoSlide.classList.remove('active');
            activeVideoSlide = videosSlides[index];
            activeVideoSlide.classList.add('active');
        }

        function transitionHandler() {
            this.classList.remove('previously-active');
            this.removeEventListener('transitionend', transitionHandler);
        }

        function changeSlide(index) {
            const previousSlide = activeDescriptionSlide;
            previousSlide.classList.remove('active');
            previousSlide.classList.add('previously-active');
            previousSlide.addEventListener('transitionend', transitionHandler);
            activeDescriptionSlide = descriptionSlides[index];
            activeDescriptionSlide.classList.add('active');
        }

        function setActiveLink(link, index) {
            if (activeLink) {
                activeLink.parentElement.classList.remove('active');
            }
            activeLink = link;
            link.parentElement.classList.add('active');
            if (activeLinkIndex === index) {
                return;
            } else {
                activeLinkIndex = index;
                changeSlide(index);
                setVideoSlide(index);
            }
        }

        function nextActiveLink() {
            if (activeLinkIndex + 1 < navigationLinks.length) {
                const link = navigationLinks[activeLinkIndex + 1];
                const index = navigationLinks.indexOf(link);
                setActiveLink(link, index);
            } else {
                const link = navigationLinks[0];
                const index = 0;
                setActiveLink(link, index);
            }
        }

        function prevActiveLink() {
            if (activeLinkIndex > 0) {
                const link = navigationLinks[activeLinkIndex - 1];
                const index = navigationLinks.indexOf(link);
                setActiveLink(link, index);
            } else {
                const link = navigationLinks[navigationLinks.length - 1];
                const index = navigationLinks.length - 1;
                setActiveLink(link, index);
            }
        }

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

        // Установка обработчиков событий

        navigationLinks.forEach((link, index) => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                setActiveLink(link, index);
            });
        });

        nextButton.addEventListener('click', function(event) {
            event.preventDefault();
            nextActiveLink();
        });
        prevButton.addEventListener('click', function(event) {
            event.preventDefault();
            prevActiveLink();
        });

        checkWidthAndSetHeight();

        window.addEventListener('resize', debounce(checkWidthAndSetHeight, 300));
    }
}
