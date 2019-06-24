import { debounce, throttle } from 'lodash';
import { TweenMax } from 'gsap/TweenMax';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

export default function() {
    // Переменные

    const menu = document.querySelector('.js-menu');

    if (menu) {
        const burger = document.querySelector('.js-burger');
        const content = document.querySelector('.js-menu-content');
        let followModeOn = false;
        const submenuLinks = Array.from(document.querySelectorAll('.js-submenu-trigger'));
        let notShowWhenScrolledUp = false;
        const menuClose = document.querySelector('.js-menu-close-btn');
        let scrollBlocked = false;

        // Код выполняемый на старте

        if (Math.trunc(window.scrollY) > 0) {
            enterFollowMode();
        }

        // Функции

        function showMenu(event) {
            if (event) {
                event.preventDefault();
            }
            content.classList.add('shown');
            burger.classList.add('hidden');
            document.addEventListener('click', outsideClickHandler);
            if (window.matchMedia('(max-width: 768px)').matches && !scrollBlocked) {
                disableBodyScroll(content);
                scrollBlocked = true;
            }
        }

        function hideMenu(event) {
            if (event) {
                event.preventDefault();
            }
            content.classList.remove('shown');
            burger.classList.remove('hidden');
            document.removeEventListener('click', outsideClickHandler);
            if (scrollBlocked) {
                enableBodyScroll(content);
                scrollBlocked = false;
            }
        }

        function enterFollowMode() {
            followModeOn = true;
            hideMenu();
            content.addEventListener('mouseleave', hideMenu);
            fixMenu();
        }

        function exitFollowMode() {
            followModeOn = false;

            unfixMenu();
            if (!notShowWhenScrolledUp) {
                showMenu();
                content.removeEventListener('mouseleave', hideMenu);
            } else {
                return;
            }
        }

        function fixMenu() {
            console.log('Fix menu');
            const viewportOffset = menu.getBoundingClientRect();
            const top = viewportOffset.top + window.scrollY;
            const right = document.documentElement.clientWidth - viewportOffset.left - menu.offsetWidth;
            menu.style.position = 'fixed';
            menu.style.top = top + 'px';
            menu.style.right = right + 'px';
            menu.style.left = 'auto';
            menu.style.bottom = 'auto';
        }

        function unfixMenu() {
            menu.style.position = '';
            menu.style.top = '';
            menu.style.right = '';
            menu.style.left = '';
            menu.style.bottom = '';
        }

        function showDropdown(list) {
            const items = Array.from(list.querySelectorAll('li'));
            TweenMax.set(list, { clearProps: 'all' });
            TweenMax.set(items, { clearProps: 'all' });
            TweenMax.set(list, { height: 'auto' });
            TweenMax.from(list, 0.2, { height: 0 });
            TweenMax.staggerFrom(items, 0.5, { autoAlpha: 0, y: -20 }, 0.2);
        }

        function hideDropdown(list) {
            const items = Array.from(list.querySelectorAll('li'));
            TweenMax.to(items, 0.4, { autoAlpha: 0 });
            TweenMax.to(list, 0.2, { height: 0, delay: 0.4 });
        }

        function outsideClickHandler() {
            if (!menu.contains(event.target) && event.target !== menu) {
                content.classList.remove('shown');
                burger.classList.remove('hidden');
                hideMenu();
            } else {
                return;
            }
        }

        // Установка обработчиков событий

        burger.addEventListener('click', showMenu);
        burger.addEventListener('mouseenter', showMenu);
        menuClose.addEventListener('click', function(event) {
            event.preventDefault();
            hideMenu();
        });

        submenuLinks.forEach(link => {
            let listShown = false;
            const list = link.parentElement.querySelector('.js-submenu-list');
            link.addEventListener('click', event => {
                event.preventDefault();
                if (!listShown) {
                    showDropdown(list);
                    listShown = true;
                } else {
                    hideDropdown(list);
                    listShown = false;
                }
            });
            // link.addEventListener('mouseenter', event => {
            //     event.preventDefault();
            //     if (!listShown) {
            //         showDropdown(list);
            //         listShown = true;
            //     }
            // });
        });

        window.addEventListener(
            'scroll',
            throttle(function() {
                if (Math.trunc(window.scrollY) > 0) {
                    if (!followModeOn) {
                        enterFollowMode();
                    }
                } else {
                    if (followModeOn) {
                        exitFollowMode();
                    }
                }
            }),
            100
        );

        window.addEventListener(
            'resize',
            debounce(function() {
                if (followModeOn) {
                    exitFollowMode();
                }
                if (Math.trunc(window.scrollY) > 0) {
                    enterFollowMode();
                }
                if (!window.matchMedia('(max-width: 768px)').matches && scrollBlocked) {
                    enableBodyScroll(content);
                    scrollBlocked = false;
                }
            }),
            300
        );

        // Отслеживание изменения ширины вьюпорта

        if (matchMedia) {
            const mq = window.matchMedia('(max-width: 1200px)');
            mq.addListener(WidthChange);
            WidthChange(mq);
        }

        function WidthChange(mq) {
            if (mq.matches) {
                hideMenu();
                notShowWhenScrolledUp = true;
            } else {
                showMenu();
                notShowWhenScrolledUp = false;
            }
        }
    }
}
