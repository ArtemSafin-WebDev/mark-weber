export default function() {
    const inlineVideos = Array.from(document.querySelectorAll('.js-case-video'));
    console.log('Модуль с видео подключен')
    inlineVideos.forEach(video => {
        const link = video.querySelector('.js-case-video-link')
        const wrapper = link.parentElement;
        const url = link.getAttribute('href');
        let ID;
        let iframe;


        function parseYoutubeURL(url){
            const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
            const match = url.match(regExp);
            return (match && match[1].length==11) ? match[1] : false;
        }

        if (url) {
            ID = parseYoutubeURL(url);
            console.log(ID)

            if (ID) {
                iframe = document.createElement('iframe');
                iframe.setAttribute('allowfullscreen', '');
                iframe.setAttribute('src', `https://www.youtube.com/embed/${ID}?rel=0&showinfo=0&autoplay=1`);
            }
        }


        link.addEventListener('click', function(event) {
            event.preventDefault();
            link.remove();
            wrapper.appendChild(iframe);
        })

    })
}