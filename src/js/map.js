
import detectIt from 'detect-it';

export default function() {
    ymaps.ready(init);
    function init() {
        const mapElement = document.getElementById('map');

        if (mapElement) {
            const coords = mapElement.getAttribute('data-coords').split(',');
            // Создание карты.
            const myMap = new ymaps.Map(mapElement, {
                // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
                // Чтобы не определять координаты центра карты вручную,
                // воспользуйтесь инструментом Определение координат.
                center: coords,
                // Уровень масштабирования. Допустимые значения:
                // от 0 (весь мир) до 19.
                zoom: 17,
                controls: []
            });

            myMap.behaviors.disable('scrollZoom');

            if (detectIt.hasTouch) {
                myMap.behaviors.disable('drag');
            }

            const myPlacemark = new ymaps.Placemark(coords, {}, {
                preset: 'islands#redDotIcon'
            });
            myMap.geoObjects.add(myPlacemark);

            const zoomControl = new ymaps.control.ZoomControl({
                options: {
                    position: {
                        right: 20,
                        top: 20
                    }
                }
            });
    
            myMap.controls.add(zoomControl);

           
        }
    }
}
