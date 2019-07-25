export default function() {
    ymaps.ready(init);
    function init() {
        const mapElement = document.getElementById('map');

        if (mapElement) {
            var centerCoords = mapElement.getAttribute('data-center').split(',');
            // Создание карты.
            var myMap = new ymaps.Map(mapElement, {
                // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
                // Чтобы не определять координаты центра карты вручную,
                // воспользуйтесь инструментом Определение координат.
                center: [55.7963747695804,49.13755903372952],
                // Уровень масштабирования. Допустимые значения:
                // от 0 (весь мир) до 19.
                zoom: 17,
                controls: []
            });

            var myPlacemark = new ymaps.Placemark([55.7963747695804, 49.13755903372952], {}, {
                preset: 'islands#redDotIcon'
            });
            myMap.geoObjects.add(myPlacemark);



           
        }
    }
}
