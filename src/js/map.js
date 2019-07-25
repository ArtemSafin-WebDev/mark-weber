export default function() {
    ymaps.ready(init);
    function init() {
        const mapElement = document.getElementById('map');

        if (mapElement) {
            var coords = mapElement.getAttribute('data-coords').split(',');
            // Создание карты.
            var myMap = new ymaps.Map(mapElement, {
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

            var myPlacemark = new ymaps.Placemark(coords, {}, {
                preset: 'islands#redDotIcon'
            });
            myMap.geoObjects.add(myPlacemark);



           
        }
    }
}
