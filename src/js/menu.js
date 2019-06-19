import { debounce, throttle } from 'lodash';

export default function() {
    // Переменные

    const menu = document.querySelector('.js-menu');
    const burger = document.querySelector('.js-burger');
    const content = document.querySelector('.js-menu-content');
    let followModeOn = false;
    const submenuLinks = Array.from(document.querySelectorAll('.js-submenu-trigger'))
    
    // let trackingTriggered = false;

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
    }

    function hideMenu(event) {
        if (event) {
            event.preventDefault();
        }
        content.classList.remove('shown');
        burger.classList.remove('hidden');
        document.removeEventListener('click', outsideClickHandler);
    }

    function enterFollowMode() {
        followModeOn = true;
        hideMenu();
        content.addEventListener('mouseleave', hideMenu);
        fixMenu();
        // trackingTriggered = true;
    }

    function exitFollowMode() {
        followModeOn = false;
        showMenu();
        content.removeEventListener('mouseleave', hideMenu);
        unfixMenu();
        // if (!trackingTriggered) {
        //     showMenu();
        //     content.removeEventListener('mouseleave', hideMenu);
        // } else {
        //     return
        // }
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

    function showDropdown() {}

    function outsideClickHandler() {
        if (!menu.contains(event.target)) {
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
        }),
        300
    );

    // Отслеживание изменения ширины вьюпорта

    if (matchMedia) {
        const mq = window.matchMedia('(max-width: 1024px)');
        mq.addListener(WidthChange);
        WidthChange(mq);
    }

    function WidthChange(mq) {
        if (mq.matches) {
            hideMenu();
        } else {
            showMenu();
        }
    }
}
