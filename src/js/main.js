// import "core-js/stable";
// import "regenerator-runtime/runtime";

import objectFitImages from 'object-fit-images';
import detectIt from 'detect-it';
import servicesSlider from './servicesSlider';
import menu from './menu';
import blogSlider from './blogSlider';


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
    }

    // Слайдер услуг 

    servicesSlider();

    // Меню

    menu();

    // Слайдер блога

    blogSlider();
});
