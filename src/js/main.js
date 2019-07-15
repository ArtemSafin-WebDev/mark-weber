// import "core-js/stable";
// import "regenerator-runtime/runtime";

import objectFitImages from 'object-fit-images';
import detectIt from 'detect-it';
// import servicesSlider from './servicesSlider';
import services from './services';
import blogSlider from './blogSlider';
import inputMask from './inputMask';
import burgerMenu from './burgerMenu';
import caseSlider from './caseSlider';
import caseTopBlockVideo from './caseTopBlockVideo';
import inlineYoutubeVideo from './inlineYoutubeVideo';
import formValidation from './formValidation';

document.addEventListener('DOMContentLoaded', function() {
    // Полифилл .contains для IE 11

    if (!SVGElement.prototype.contains) {
        SVGElement.prototype.contains = HTMLDivElement.prototype.contains;
    }

    // Полифилл для CSS свойства ObjectFit (заполнение контейнера изображением)
    objectFitImages();

    // Определение тач устройств

    if (detectIt.hasTouch) {
        document.body.classList.remove('no-touch');
        document.body.classList.add('touch');

        function appendStyle(styles) {
            var css = document.createElement('style');
            css.type = 'text/css';

            if (css.styleSheet) css.styleSheet.cssText = styles;
            else css.appendChild(document.createTextNode(styles));

            document.getElementsByTagName('head')[0].appendChild(css);
        }

        var styles = '* {cursor: pointer; }';

        window.onload = function() {
            appendStyle(styles);
        };
    }

    // Слайдер услуг

    // servicesSlider();

    services();

    // Меню

    // menu();

    burgerMenu();

    // Слайдер блога

    blogSlider();

    // Маска ввода

    inputMask();

    // Слайдер с изображениями проекта

    caseSlider();

    // Видео в верхнем блоке кейсов

    caseTopBlockVideo();

    // Инлайновые видео с YT

    inlineYoutubeVideo();

    // Валидация форм

    formValidation();
});
