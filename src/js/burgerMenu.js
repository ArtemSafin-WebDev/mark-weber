import { throttle } from 'lodash';
import detectIt from 'detect-it';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { TweenMax } from 'gsap/TweenMax';

export default function() {
    const menu = document.querySelector('.js-menu');

    if (menu) {
        // Переменные

        const burger = document.querySelector('.js-burger');
        const content = document.querySelector('.js-menu-content');
        const submenuLinks = Array.from(document.querySelectorAll('.js-submenu-trigger'));
       
        let menuShown = false;
        let menuFixed = false;
        let scrollBlocked = false;
        let initiallyShown = !window.matchMedia('(max-width: 1200px)').matches && menu.classList.contains('js-initially-shown');
        
        // Функции

        //// Функция обработки клика за пределами меню для его закрытия

        function outsideClickHandler(event) {
            if (!menu.contains(event.target) && event.target !== menu) {
                
                hideMenu();
            }
        }

        function mouseEnterHandler() {
            if (!menuShown) {
                showMenu();
                content.addEventListener('mouseleave', mouseLeaveHandler);
            }
        }

        function mouseLeaveHandler() {
            if (menuShown) {
                hideMenu();
                content.removeEventListener('mouseleave', mouseLeaveHandler);
            }
        }

        //// Функции показа и закрытия меню

        function showMenu() {
            if (!menuShown) {
                content.classList.add('shown');
                burger.classList.add('active');
                document.addEventListener('click', outsideClickHandler);
                menuShown = true;
                
                if (window.matchMedia('(max-width: 768px)').matches && !scrollBlocked) {
                    disableBodyScroll(content);
                    scrollBlocked = true;
                }
            }
        }

        function hideMenu() {
            if (menuShown) {
                content.classList.remove('shown');
                burger.classList.remove('active');
                document.removeEventListener('click', outsideClickHandler);
                menuShown = false;
                
                if (scrollBlocked) {
                    enableBodyScroll(content);
                    scrollBlocked = false;
                }
            }
        }

        //// Функции фиксации и отмены фиксации меню

        function fixMenu() {
            const viewportOffset = menu.getBoundingClientRect();
            const top = Math.trunc(viewportOffset.top + window.scrollY);
            const right = Math.trunc(document.documentElement.clientWidth - viewportOffset.left - menu.offsetWidth);
            menu.style.position = 'fixed';
            menu.style.top = `${top}px`;
            menu.style.right = `${right}px`;
            menu.style.left = 'auto';
            menu.style.bottom = 'auto';
            menuFixed = true;
        }

        function unfixMenu() {
            menu.style.position = '';
            menu.style.top = '';
            menu.style.right = '';
            menu.style.left = '';
            menu.style.bottom = '';
            menuFixed = false;
        }

        //// Функции открытия и закрытия аккордеонов меню

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

        // Код, выполняемый на старте

        //// Показываем меню на старте, если ширина экрана больше ноутбучной (чтобы меню на старте не закрывало контент на маленьких экранах)

        if (initiallyShown) {
            showMenu();
        }

        // Обработчики событий

        //// Открытие меню при клике на бургере

        burger.addEventListener('click', event => {
            event.preventDefault();
            if (!menuShown) {
                showMenu();
            } else {
                hideMenu();
            }
        });

        //// Клик на крестике закрытия

        // menuClose.addEventListener('click', event => {
        //     event.preventDefault();
        //     hideMenu();
        // });

        //// Обработчики событий для ссылок-аккордеонов

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
        });

        //// При наличии поддержки мыши навешиваем открытие ховерами

        if (detectIt.hasMouse) {
            burger.addEventListener('mouseenter', mouseEnterHandler);
        }

        //// Закрываем меню при клике на темной области на мобильниках

        function closeBorders(event) {
            if (this === event.target) {
                hideMenu();
            }
        }

        //// Прячем меню при ухода с мобильной ширины (на всякий случай)

        if (matchMedia) {
            const mq = window.matchMedia('(max-width: 768px)');
            mq.addListener(WidthChange);
            WidthChange(mq);
        }

        function WidthChange(mq) {
            if (!mq.matches) {
               
                content.removeEventListener('click', closeBorders);
            } else {
                content.addEventListener('click', closeBorders);
            }
        }

        //// Фиксация меню

        window.addEventListener(
            'scroll',
            throttle(function() {
                const scrollPos = Math.trunc(window.scrollY);
                if (scrollPos > 0) {
                    if (!menuFixed) {
                        fixMenu();
                    }
                    if (menuShown) {
                        hideMenu();
                    }
                } else if (scrollPos === 0) {
                    if (menuFixed) {
                        unfixMenu();
                    }
                    if (!menuShown && initiallyShown) {
                        showMenu();
                    }
                }
            }),
            300
        );
    }
}
